angular.module('ado.timer-settings.tpls', []).run(['$templateCache', function($templateCache) {$templateCache.put('/timer-settings.html','\n\n<h4>Rates</h4>\n\n<a class="btn btn-sm btn-primary" ng-click="$ctrl.newCredit()">\n  <i class="fa fa-plus"></i>\n  Add New Rate\n</a>\n\n<table class="table">\n  <thead>\n    <tr>\n      <th>\n        <span class="hidden-xs hidden-sm">Pulses</span>\n        <span class="hidden-md hidden-lg">Pulses/Amount</span>\n      </th>\n      <th class="hidden-xs hidden-sm">Amount</th>\n      <th>Time</th>\n      <th>Action</th>\n    </tr>\n  </thead>\n  <tbody>\n\n    <tr ng-repeat="t in $ctrl.settings.timer" class="editable-row">\n      <td>\n        <span editable-number="t.pulse" e-name="pulse" e-form="rowform" e-required e-class="form-control">\n          {{ t.pulse }}\n        </span>\n      </td>\n      <td class="hidden-xs hidden-sm">\n        <span ng-show="$ctrl.inserted == t">(amount = pulses)</span>\n        <span ng-show="$ctrl.inserted != t">\n          {{ t.pulse | number:2 }}\n        </span>\n      </td>\n      <td class="select-td" ng-class="{\'text-danger\': !t.minutes || t.credits <= 0}">\n        <span editable-number="t.minutes" e-name="minutes" e-form="rowform" e-class="form-control" e-required>\n          {{ t.minutes * 60 | datetimeToNow:\'short\' }}\n        </span>\n        <span class="help-block" ng-if="rowform.$visible">(input in minutes)</span>\n      </td>\n      <td>\n        <form editable-form name="rowform" ng-show="rowform.$visible" class="form-buttons form-inline" onbeforesave="$ctrl.updateTimer($index, $data)" oncancel="onCancel(i, t)" shown="$ctrl.inserted == t">\n          <button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary editable-table-button btn-xs">\n            Save\n          </button>\n          <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default editable-table-button btn-xs">\n            Cancel\n          </button>\n        </form>\n        <div class="buttons" ng-show="!rowform.$visible">\n          <button class="btn btn-primary editable-table-button btn-xs" ng-click="rowform.$show()">Edit</button>\n          <button class="btn btn-danger editable-table-button btn-xs" ng-click="$ctrl.removeCredit($index)">Delete</button>\n        </div>\n      </td>\n    </tr>\n\n  </tbody>\n</table>\n\n<hr>\n\n<form name="timerForm">\n  <div class="row">\n\n    <div class="col-md-6">\n\n      <h4>Pause Time Settings</h4>\n\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="allow_pause" ng-model="$ctrl.settings.allow_pause">\n          <span>\n            Allow users to pause time?\n          </span>\n        </label>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.allow_pause_time.$invalid, \'has-success\': timerForm.allow_pause_time.$valid && timerForm.allow_pause_time.$touched}">\n        <label>\n          Allow pause if user\'s time is less than <mark>{{$ctrl.allow_pause_time}}</mark> hour(s)?\n        </label>\n        <input type="number" min="1" class="form-control" ng-model="$ctrl.allow_pause_time" name="allow_pause_time" required>\n        <span class="help-block" ng-if="timerForm.allow_pause_time.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.allow_pause_time.$error.min">Minimum of 1 hour</span>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.allow_pause_validity.$invalid, \'has-success\': timerForm.allow_pause_validity.$valid && timerForm.allow_pause_validity.$touched}">\n        <label>Pause Time Validity (in hours)</label>\n        <input type="number" min="1" class="form-control" ng-model="$ctrl.allow_pause_validity" name="allow_pause_validity" required>\n        <span class="help-block" ng-if="timerForm.allow_pause_validity.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.allow_pause_validity.$error.min">Minimum of 1 hour</span>\n      </div>\n\n      <div class="checkbox">\n        <label class="custom-checkbox">\n          <input type="checkbox" name="auto_continue_time" ng-model="$ctrl.settings.auto_continue_time">\n          <span>\n            Automatically continue users timer after reboot/shutdown?\n          </span>\n        </label>\n      </div>\n\n      <hr>\n\n      <h4>Counter Settings</h4>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.waiting.$invalid, \'has-success\': timerForm.waiting.$valid && timerForm.waiting.$touched}">\n        <label>How many seconds to wait for customer to pay?</label>\n        <input type="number" min="5" class="form-control" ng-model="$ctrl.settings.counter_timer" name="waiting" required>\n        <span class="help-block" ng-if="timerForm.waiting.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.waiting.$error.min">Minimum of 5 seconds</span>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.max_payment_retries.$invalid, \'has-success\': timerForm.max_payment_retries.$valid && timerForm.max_payment_retries.$touched}">\n        <label>How many insert coin retries to allow before suspending user?</label>\n        <input type="number" min="1" class="form-control" ng-model="$ctrl.settings.max_payment_retries" name="max_payment_retries" required>\n        <span class="help-block" ng-if="timerForm.max_payment_retries.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.max_payment_retries.$error.min">Minimum of 1</span>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.wait_payment_seconds.$invalid, \'has-success\': timerForm.wait_payment_seconds.$valid && timerForm.wait_payment_seconds.$touched}">\n        <label>How many minutes to suspend user after max insert coin retries reached?</label>\n        <input type="number" min="1" class="form-control" ng-model="$ctrl.wait_payment_seconds" name="wait_payment_seconds" required>\n        <span class="help-block" ng-if="timerForm.wait_payment_seconds.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.wait_payment_seconds.$error.min">Minimum of 1</span>\n      </div>\n\n    </div>\n\n    <div class="col-md-6">\n\n      <h4>Coinslot Wiring Settings</h4>\n\n      <div ng-show="$ctrl.settings.hardware.model == \'raspberry_pi_3\'" class="form-group" ng-class="{\'has-error\' : timerForm.sensor.$invalid, \'has-success\': timerForm.sensor.$valid && timerForm.sensor.$dirty}">\n        <label>Coinslot Sensor Version</label>\n        <select class="form-control" ng-options="v as v for v in [1,2]" ng-model="$ctrl.settings.coinslot_sensor_version" name="sensor" required>\n        </select>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.coinslot_gpio_pin.$invalid, \'has-success\': timerForm.coinslot_gpio_pin.$valid && timerForm.coinslot_gpio_pin.$touched}">\n        <label>GPIO Pin for coin/white wire</label>\n        <select name="coinslot_gpio_pin" class="form-control" ng-model="$ctrl.settings.coinslot_gpio_pin" ng-options="pin as pin for pin in $ctrl.pins" required></select>\n        <span gpio-pin-numbering class="help-block"><a>CLICK HERE TO SHOW GPIO NUMBERING ON THE BOARD</a></span>\n      </div>\n      <hr>\n      <h4>Relay Settings</h4>\n\n      <div class="radio">\n        <label>\n          <input type="radio" name="active" ng-model="$ctrl.settings.coinslot_relay_active_low" ng-value="true">\n          Relay module is active low\n        </label>\n      </div>\n\n      <div class="radio">\n        <label>\n          <input type="radio" name="active" ng-model="$ctrl.settings.coinslot_relay_active_low" ng-value="false">\n          Relay module is active high\n        </label>\n      </div>\n\n      <div class="form-group" ng-class="{\'has-error\' : timerForm.delay.$invalid, \'has-success\': timerForm.delay.$valid && timerForm.delay.$dirty}">\n        <label>Coinslot Relay Delay (in seconds)</label>\n        <input type="number" min="0" class="form-control" ng-model="$ctrl.settings.coinslot_relay_delay" name="delay" required>\n        <span class="help-block" ng-if="timerForm.delay.$error.required">Required.</span>\n        <span class="help-block" ng-if="timerForm.delay.$error.min">Minimum of 0 seconds</span>\n      </div>\n\n    </div>\n\n  </div>\n\n  <hr>\n\n  <save-config-btn config="{\n  coinslot_relay_active_low: $ctrl.settings.coinslot_relay_active_low,\n  coinslot_sensor_version: $ctrl.settings.coinslot_sensor_version,\n  coinslot_gpio_pin: $ctrl.settings.coinslot_gpio_pin,\n  coinslot_relay_delay: $ctrl.settings.coinslot_relay_delay,\n  allow_pause_time: $ctrl.allow_pause_time*60*60,\n  allow_pause_validity: $ctrl.allow_pause_validity*60*60,\n  auto_continue_time: $ctrl.settings.auto_continue_time,\n  counter_timer: $ctrl.settings.counter_timer,\n  max_payment_retries: $ctrl.settings.max_payment_retries,\n  wait_payment_seconds: $ctrl.wait_payment_seconds * 60,\n  allow_pause: $ctrl.settings.allow_pause\n  }" ng-disabled="timerForm.$invalid || timerForm.$pristine">Save Changes</save-config-btn>\n\n</form>\n\n<hr>\n<p>\nCoinslot not working? <a href="http://adopisowifi.com/articles/fix-coinslot-not-working/" target="_blank">Try these solutions.</a>\n</p>\n');}]);
(function () {
'use strict';

  var App = angular.module('ado.timer-settings', [
    'ado.save-config-btn',
    'ado.timer-settings.tpls'
  ]);

  App.component('adoTimerSettings', {
    controller: 'AdoTimerSettingsCtrl',
    templateUrl: 'app/components/timer-settings/src/timer-settings.html'
  });

  App.controller('AdoTimerSettingsCtrl', [
    '$scope',
    '$rootScope',
    'adoConfigService',
    function ($scope, $rootScope, adoConfigService) {

      var $ctrl = this;

      var model_pins = {
        raspberry_pi_3: [3, 7, 11],
        espressobin_armbian: [451, 467]
      };

      $ctrl.config = {};
      $ctrl.settings = {};

      adoConfigService.get()
        .then(function (res) {
          return parseScopeConfig(res);
        });

      function parseScopeConfig(res) {
        $ctrl.config = res.data;
        $ctrl.settings = angular.copy(res.data);
        $ctrl.wait_payment_seconds = res.data.wait_payment_seconds / 60;
        $ctrl.allow_pause_validity = res.data.allow_pause_validity / (60*60);
        $ctrl.allow_pause_time = res.data.allow_pause_time / (60*60);
        $ctrl.pins = model_pins[res.data.hardware.model];
      }

      function update(timer) {
        timer = timer.filter(function (t) {
          return t.pulse > 0 && t.minutes > 0;
        })
          .map(function(t) {
            t.credits = t.pulse;
            return t;
          });
        return adoConfigService.update({timer: timer})
          .then(function (res) {
            parseScopeConfig(res);
            return true;
          });
      }

      $ctrl.onCancel = function (i, t) {
        $ctrl.settings.timer = $ctrl.settings.timer.filter(function (t) {
          return t.pulse > 0 && t.minutes > 0;
        });
      };

      $ctrl.updateTimer = function (i, t) {
        var timer = angular.copy($ctrl.settings.timer);
        timer[i] = angular.extend(timer[i], t);
        return update(timer);
      };

      $ctrl.newCredit = function () {
        $ctrl.inserted = {
          pulse: 1,
          credits: 0,
          minutes: 0
        };
        $ctrl.settings.timer.push($ctrl.inserted);
      };

      $ctrl.removeCredit = function (index) {
        if (window.confirm('Are you sure?')) {
          var timer = angular.copy($ctrl.settings.timer);
          timer.splice(index, 1);
          return update(timer);
        }
      };

    }]);

})();

