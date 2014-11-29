angular.module('Sharing').
    controller('SharingController', ['$scope', '$window', 'Restangular', 'apiUrl', function($scope, $window, restangular, apiUrl) {
        var $local = $scope.Sharing = {};

        $local.file = {};

        $local.token = $window.location.pathname.split('/')[2];

        $local.showPreview = false;

        /**
         * get a file from the webservice
         */
        $local.getFile = function() {
            if(!$local.file.name && $local.token) {
                var shared = restangular.one('shared');
                shared.customGET($local.token).then(function(file) {
                    if(file && file[0] && file[0].name) {
                        $local.file = file[0];
                        $local.file.token = $local.token;
                        $scope.$broadcast('select_file', $local.file);
                    }
                    else
                        window.location = window.location.origin;
                }, function(error) {
                    window.location = window.location.origin;
                    console.error(error);
                });
            } else
               window.location = window.location.origin;
        }

        $local.getFile();

        /**
         * download
         */
        $local.download = function() {
            if($local.file && $local.token) {
                $window.location = apiUrl + 'download/shared/' + $local.token;
            }
        }

        /**
         * unable or disable that's a question
         */
        $local.preview = function() {
            $local.showPreview = !$local.showPreview;
        }

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);