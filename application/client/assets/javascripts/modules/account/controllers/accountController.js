angular.module('Account').
    controller('AccountController', ['$scope', function($scope) {
        var $local = $scope.Account = {};

        $scope.toString = function() {
            return 'Account';
        };
    }])