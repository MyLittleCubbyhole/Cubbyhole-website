angular.module('FileManager').
    controller('PreviewController', ['$scope', 'apiUrl', 'UserFactory', 'AuthenticationFactory', 'Restangular', function($scope, apiUrl, UserFactory, AuthenticationFactory, restangular) {
        var $local = $scope.Preview = {};

        $local.getRessourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0] && $scope.FileManager.previewActivated) {
                // if($scope.FileManager.selectedItems[0].token) {
                //     url = apiUrl + 'download/shared/' + $scope.FileManager.selectedItems[0].token + '?run';
                // }
                // else {
                //     url = apiUrl + 'download/' + UserFactory($scope).get().id + $scope.FileManager.currentPath + $scope.FileManager.selectedItems[0].name;
                //     url = AuthenticationFactory.request({ url: url }).url + "&run";
                // }
                url = $scope.FileManager.selectedItems[0].download(true) + "&run";
                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);