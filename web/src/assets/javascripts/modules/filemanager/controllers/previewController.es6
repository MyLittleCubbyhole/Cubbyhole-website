angular.module('FileManager').
    controller('PreviewController', ['$scope', '$location', 'apiUrl', 'AuthenticationFactory', 'UserFactory', 'Restangular', '$http', '$sce', function($scope, $location, apiUrl, AuthenticationFactory, UserFactory, restangular, $http, $sce) {
        var $local = $scope.Preview = {};
        $local.totalSize = 0;

        $local.resourceContent = '';

        if($location.$$absUrl.indexOf('/shared/') == -1) {
            UserFactory($scope).getUsedSizeStorage(function(error, data) {
                $local.totalSize = data;
            });
        }

        /**
         * LISTENER - get information of the selected item in order to display them in the preview view
         */
        $scope.$watch('FileManager.selectedItems', function() {
            if($scope.FileManager.selectedItems.length > 0 && $scope.FileManager.selectedItems[0].category == 'text') {
                $local.resourceContent = '';
                $local.getResourceContent();
            }
        });

        /**
         * generate the resource url
         * @return {string} url
         */
        $local.getResourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0] && $scope.FileManager.previewActivated) {
                if($scope.FileManager.selectedItems[0].token) {
                    url = apiUrl + 'download/shared/' + $scope.FileManager.selectedItems[0].token + '?run';
                }
                else {
                    url = $scope.FileManager.selectedItems[0].category != 'text' ? $scope.FileManager.selectedItems[0].download(true) + '&run' : $scope.FileManager.selectedItems[0].download(true, true) + '?run';
                }

                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        /**
         * get the informations item thanks to the resource url
         */
        $local.getResourceContent = function() {
            var url = $local.getResourceUrl();
            if(url && url.length > 0)
                $http.get(url, {headers: {'Content-Type': undefined}}).success(function(content) {
                    $local.resourceContent = content;
                });
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);