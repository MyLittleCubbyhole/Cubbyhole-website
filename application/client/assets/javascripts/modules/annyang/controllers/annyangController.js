angular.module('Annyang').
    controller('AnnyangController', ['$scope', 'AnnyangService', '$timeout', function($scope, AnnyangService, $timeout) {
        var $local = $scope.Annyang = {};

        $local.started = false;

        $local.start = false;
        $local.end = false;
        $local.error = false;
        $local.success = false;

        $local.activated = true;

        AnnyangService.addCallback('start', function() {
            $local.start = true;
            $local.end = false;
            $local.error = false;
            $local.success = false;
            $scope.$apply();
        });
        AnnyangService.addCallback('end', function() {
            $local.start = false;
            $local.end = true;
            $local.error = false;
            $local.success = false;
            $scope.$apply();
        });
        AnnyangService.addCallback('resultMatch', function() {
            $local.error = false;
            $local.success = true;
            $scope.$apply();
            $timeout(function() {
                $local.success = false;
                $scope.$apply();
            }, 1500);
        });
        AnnyangService.addCallback('resultNoMatch', function() {
            $local.error = true;
            $local.success = false;
            $scope.$apply();
            $timeout(function() {
                $local.error = false;
                $scope.$apply();
            }, 1500);
        });

        /**
         * Annyang managment
         * start if stopped 
         * stop if started
         * @return {[type]} [description]
         */
        $local.startStop = function() {
            if($local.started)
                AnnyangService.stop();
            else
                AnnyangService.start();

            $local.started = !$local.started;
        };

        $scope.toString = function() {
            return 'Annyang';
        };
    }]);