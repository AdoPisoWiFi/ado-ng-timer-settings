(function () {
'use strict';

  var App = angular.module('ado.timer-settings', [
    'ado.seconds-format',
    'ado.save-config-btn',
    'ado.timer-settings.tpls'
  ]);

  App.component('adoTimerSettings', {
    controller: 'AdoTimerSettingsCtrl',
    templateUrl: './timer-settings.html',
    bindings: {
      device: '<'
    }
  });

  App.controller('AdoTimerSettingsCtrl', [
    '$scope',
    '$rootScope',
    'adoConfigService',
    function ($scope, $rootScope, adoConfigService) {

      var $ctrl = this;

      $ctrl.$onInit = function() {

        $ctrl.device = $ctrl.device || {};

        var model_pins = {
          raspberry_pi_3: [3, 7, 11],
          espressobin_armbian: [451, 467]
        };

        $ctrl.config = {};
        $ctrl.settings = {};

        adoConfigService.get({id: $ctrl.device.id})
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
          return adoConfigService.update({timer: timer}, {id: $ctrl.device.id})
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

      };

    }]);

})();

