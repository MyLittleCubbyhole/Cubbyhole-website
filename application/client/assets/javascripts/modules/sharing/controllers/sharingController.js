angular.module('Sharing').
    controller('SharingController', ['$scope', '$window', 'Restangular', 'apiUrl', function($scope, $window, restangular, apiUrl) {
        var $local = $scope.Sharing = {};

        $local.file = {};

        $local.token = $window.location.pathname.split('/')[2];

        $local.getFile = function() {
            if(!$local.file.name && $local.token) {
                var shared = restangular.one('shared').one($local.token);
                shared.getList().then(function(file) {
                    $local.file = file[0];
                }, function(error) { console.error(error); });
            }
        }

        $local.getFile();

        $local.getRessourceUrl = function() {
            return $local.token ? apiUrl + 'download/shared/' + $local.token + '?run' : '';
        };

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);