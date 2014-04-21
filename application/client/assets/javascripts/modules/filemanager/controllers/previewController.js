angular.module('FileManager').
    controller('PreviewController', ['$scope', 'apiUrl', 'UserFactory', 'AuthenticationFactory', 'Restangular', function($scope, apiUrl, UserFactory, AuthenticationFactory, restangular) {
        var $local = $scope.Preview = {};

        $local.getRessourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0]) {
                url = apiUrl + 'download/' + UserFactory($scope).get().ID + $scope.FileManager.currentPath + $scope.FileManager.selectedItems[0].name;
                url = AuthenticationFactory.request({ url: url }).url + "&run";

                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);