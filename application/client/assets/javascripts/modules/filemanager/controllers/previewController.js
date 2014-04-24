angular.module('FileManager').
    controller('PreviewController', ['$scope', 'apiUrl', 'UserFactory', 'AuthenticationFactory', 'Restangular', function($scope, apiUrl, UserFactory, AuthenticationFactory, restangular) {
        var $local = $scope.Preview = {};

        $local.getRessourceUrl = function() {

            var url = "";

            if($scope.FileManager.previewItem && $scope.FileManager.previewItem) {
                url = apiUrl + 'download/' + UserFactory($scope).get().id + $scope.FileManager.currentPath + $scope.FileManager.previewItem.name;
                url = AuthenticationFactory.request({ url: url }).url + "&run";

                if($scope.FileManager.previewItem.category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);