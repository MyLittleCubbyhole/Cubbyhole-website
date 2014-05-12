angular.module('FileManager').
    controller('PreviewController', ['$scope', '$location', 'apiUrl', 'AuthenticationFactory', 'UserFactory', 'Restangular', function($scope, $location, apiUrl, AuthenticationFactory, UserFactory, restangular) {
        var $local = $scope.Preview = {};
        $local.totalSize = 0;

        if($location.$$absUrl.indexOf('/shared/') == -1) {
            UserFactory($scope).getUsedSizeStorage(function(error, data) {
                $local.totalSize = data;
            });
        }
        $local.getRessourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0] && $scope.FileManager.previewActivated) {
                if($scope.FileManager.selectedItems[0].token) {
                    url = apiUrl + 'download/shared/' + $scope.FileManager.selectedItems[0].token + '?run';
                }
                else {
                    url = ($scope.FileManager.selectedItems[0].category != 'text' ? $scope.FileManager.selectedItems[0].download(true) + "&run" : $scope.FileManager.selectedItems[0].download(true, true) + '?run');
                }

                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);