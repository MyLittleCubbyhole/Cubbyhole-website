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

        $scope.$watch('FileManager.selectedItems', function() {
            $local.resourceContent = '';
            $local.getresourceContent();
        });

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

        $local.getresourceContent = function() {
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