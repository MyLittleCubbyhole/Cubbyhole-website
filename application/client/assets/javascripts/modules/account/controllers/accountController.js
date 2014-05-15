angular.module('Account').
    controller('AccountController', ['$scope', 'DataChartFactory', 'FormatSizeService', 'UserFactory', function($scope, DataChartFactory, FormatSizeService, UserFactory) {
        var $local = $scope.Account = {};

        $local.currentPlan = {};

        $local.user = UserFactory($scope).get();

        $scope.$watch(UserFactory($scope).get(), function() {
            DataChartFactory($scope).getActualPlan(function(error, plan) {
                if (!error && plan) {
                    $local.currentPlan = plan;
                    $scope.$broadcast('plan_updated');
                }
            });
        });

        $scope.toString = function() {
            return 'Account';
        };
    }])