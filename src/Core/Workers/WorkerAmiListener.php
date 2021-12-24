<?php
/*
 * MikoPBX - free phone system for small business
 * Copyright (C) 2017-2020 Alexey Portnov and Nikolay Beketov
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 */

namespace MikoPBX\Core\Workers;
require_once 'Globals.php';

use MikoPBX\Core\System\{BeanstalkClient, Util};
use MikoPBX\Core\Asterisk\AsteriskManager;
use Pheanstalk\Contract\PheanstalkInterface;
use Throwable;

class WorkerAmiListener extends WorkerBase
{
    protected BeanstalkClient $client;
    protected bool $saveDebugEvents = false;
    protected AsteriskManager $am;

    /**
     * Установка фильтра
     *
     * @return array
     */
    private function setFilter(): array
    {
        $params = ['Operation' => 'Add', 'Filter' => 'Event: UserEvent'];

        return $this->am->sendRequestTimeout('Filter', $params);
    }

    /**
     * Старт работы листнера.
     *
     * @param $argv
     */
    public function start($argv): void
    {
        $this->saveDebugEvents = $this->di->getShared('config')->path('eventsLogDatabase.debugMode');

        $this->client = new BeanstalkClient(WorkerCallEvents::class);
        $this->am     = Util::getAstManager();
        $this->setFilter();

        $this->am->addEventHandler("userevent", [$this, "callback"]);
        while ($this->needRestart === false) {
            $result = $this->am->waitUserEvent(true);
            if ($result === []) {
                // Нужен реконнект.
                usleep(100000);
                $this->am = Util::getAstManager();
                $this->setFilter();
            }
        }
    }

    /**
     * Функция обработки оповещений.
     *
     * @param $parameters
     */
    public function callback($parameters): void
    {
        if ($this->replyOnPingRequest($parameters)){
           return;
        }

        if ('CdrConnector' !== $parameters['UserEvent']) {
            return;
        }

        $result = base64_decode($parameters['AgiData']);
        $this->actionSendToBeanstalk($result);
    }

    /**
     * Отправка данных на сервер очередей.
     *
     * @param string $result - данные в ормате json для отправки.
     */
    private function actionSendToBeanstalk(string $result): void
    {
        $message_is_sent = false;
        $error           = '';
        for ($i = 1; $i <= 10; $i++) {
            try {
                $result_send = $this->client->publish($result, null, PheanstalkInterface::DEFAULT_PRIORITY, 0, 600);
                if ($result_send === false) {
                    $this->client->reconnect();
                }
                $message_is_sent = ($result_send !== false);
                if ($message_is_sent === true) {
                    // Проверка
                    break;
                }
            } catch (Throwable $e) {
                $this->client = new BeanstalkClient(WorkerCallEvents::class);
                $error        = $e->getMessage();
            }
        }

        if ($message_is_sent === false) {
            Util::sysLogMsg(__METHOD__, "Error send data to queue. " . $error, LOG_ERR);
        }
        if($this->saveDebugEvents){
            // Логируем оповещение.
            Util::logMsgDb('WorkerCallEvents::class', json_decode($result, true));
        }
    }

}


// Start worker process
WorkerAmiListener::startWorker($argv??null);