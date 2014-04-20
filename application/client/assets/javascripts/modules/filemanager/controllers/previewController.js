angular.module('FileManager').
    controller('PreviewController', ['$scope', 'apiUrl', 'UserFactory', 'AuthenticationFactory', function($scope, apiUrl, UserFactory, AuthenticationFactory) {
        var $local = $scope.Preview = {};

        $local.getRessourceUrl = function() {

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0]) {
                var url = apiUrl + 'download/' + UserFactory($scope).get().ID + $scope.FileManager.currentPath + $scope.FileManager.selectedItems[0].name;
                url = AuthenticationFactory.request({ url: url }).url + "&run";

                return url;
            }

            return "";
        }

        $scope.toString = function() {
            return 'Preview';
        };
    }])