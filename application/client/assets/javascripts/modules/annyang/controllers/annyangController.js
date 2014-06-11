angular.module('Annyang').
    controller('AnnyangController', ['$scope', 'AnnyangService', function($scope, AnnyangService) {
        var $local = $scope.Annyang = {};

        $local.started = false;

        $local.activated = true;

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