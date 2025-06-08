"use strict";

/*
 * MikoPBX - free phone system for small business
 * Copyright © 2017-2023 Alexey Portnov and Nikolay Beketov
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

/* global PbxApi, globalTranslate */

/**
 * This module encapsulates a collection of functions related to Call queues.
 *
 * @module Call queues
 */
var DialplanApplicationsAPI = {
  /**
   * Deletes the dialplan application record with its dependent tables.
   *
   * @param {string} id - id of deleting dialplan application record.
   * @param {function} callback - The callback function to handle the API response.
   */
  deleteRecord: function deleteRecord(id, callback) {
    $.api({
      url: PbxApi.dialplanApplicationsDeleteRecord,
      on: 'now',
      method: 'POST',
      data: {
        id: id
      },
      successTest: PbxApi.successTest,
      onSuccess: function onSuccess(response) {
        callback(response);
      },
      onFailure: function onFailure(response) {
        callback(response);
      },
      onError: function onError() {
        callback(false);
      }
    });
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9QYnhBUEkvZGlhbHBsYW5BcHBsaWNhdGlvbnNBUEkuanMiXSwibmFtZXMiOlsiRGlhbHBsYW5BcHBsaWNhdGlvbnNBUEkiLCJkZWxldGVSZWNvcmQiLCJpZCIsImNhbGxiYWNrIiwiJCIsImFwaSIsInVybCIsIlBieEFwaSIsImRpYWxwbGFuQXBwbGljYXRpb25zRGVsZXRlUmVjb3JkIiwib24iLCJtZXRob2QiLCJkYXRhIiwic3VjY2Vzc1Rlc3QiLCJvblN1Y2Nlc3MiLCJyZXNwb25zZSIsIm9uRmFpbHVyZSIsIm9uRXJyb3IiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBTUEsdUJBQXVCLEdBQUU7QUFDM0I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLFlBUDJCLHdCQU9kQyxFQVBjLEVBT1ZDLFFBUFUsRUFPQTtBQUN2QkMsSUFBQUEsQ0FBQyxDQUFDQyxHQUFGLENBQU07QUFDRkMsTUFBQUEsR0FBRyxFQUFFQyxNQUFNLENBQUNDLGdDQURWO0FBRUZDLE1BQUFBLEVBQUUsRUFBRSxLQUZGO0FBR0ZDLE1BQUFBLE1BQU0sRUFBRSxNQUhOO0FBSUZDLE1BQUFBLElBQUksRUFBRTtBQUFDVCxRQUFBQSxFQUFFLEVBQUZBO0FBQUQsT0FKSjtBQUtGVSxNQUFBQSxXQUFXLEVBQUVMLE1BQU0sQ0FBQ0ssV0FMbEI7QUFNRkMsTUFBQUEsU0FORSxxQkFNUUMsUUFOUixFQU1rQjtBQUNoQlgsUUFBQUEsUUFBUSxDQUFDVyxRQUFELENBQVI7QUFDSCxPQVJDO0FBU0ZDLE1BQUFBLFNBVEUscUJBU1FELFFBVFIsRUFTa0I7QUFDaEJYLFFBQUFBLFFBQVEsQ0FBQ1csUUFBRCxDQUFSO0FBQ0gsT0FYQztBQVlGRSxNQUFBQSxPQVpFLHFCQVlRO0FBQ05iLFFBQUFBLFFBQVEsQ0FBQyxLQUFELENBQVI7QUFDSDtBQWRDLEtBQU47QUFnQkg7QUF4QjBCLENBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIE1pa29QQlggLSBmcmVlIHBob25lIHN5c3RlbSBmb3Igc21hbGwgYnVzaW5lc3NcbiAqIENvcHlyaWdodCDCqSAyMDE3LTIwMjMgQWxleGV5IFBvcnRub3YgYW5kIE5pa29sYXkgQmVrZXRvdlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS5cbiAqIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cblxuLyogZ2xvYmFsIFBieEFwaSwgZ2xvYmFsVHJhbnNsYXRlICovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgZW5jYXBzdWxhdGVzIGEgY29sbGVjdGlvbiBvZiBmdW5jdGlvbnMgcmVsYXRlZCB0byBDYWxsIHF1ZXVlcy5cbiAqXG4gKiBAbW9kdWxlIENhbGwgcXVldWVzXG4gKi9cblxuY29uc3QgRGlhbHBsYW5BcHBsaWNhdGlvbnNBUEk9IHtcbiAgICAvKipcbiAgICAgKiBEZWxldGVzIHRoZSBkaWFscGxhbiBhcHBsaWNhdGlvbiByZWNvcmQgd2l0aCBpdHMgZGVwZW5kZW50IHRhYmxlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIGlkIG9mIGRlbGV0aW5nIGRpYWxwbGFuIGFwcGxpY2F0aW9uIHJlY29yZC5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIEFQSSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBkZWxldGVSZWNvcmQoaWQsIGNhbGxiYWNrKSB7XG4gICAgICAgICQuYXBpKHtcbiAgICAgICAgICAgIHVybDogUGJ4QXBpLmRpYWxwbGFuQXBwbGljYXRpb25zRGVsZXRlUmVjb3JkLFxuICAgICAgICAgICAgb246ICdub3cnLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7aWR9LFxuICAgICAgICAgICAgc3VjY2Vzc1Rlc3Q6IFBieEFwaS5zdWNjZXNzVGVzdCxcbiAgICAgICAgICAgIG9uU3VjY2VzcyhyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkZhaWx1cmUocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXNwb25zZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FcnJvcigpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxufSJdfQ==