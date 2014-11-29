angular.module('Account').
    controller('AccountController', ['$scope', 'PlanFactory', 'FormatSizeService', 'UserFactory', function($scope, PlanFactory, FormatSizeService, UserFactory) {
        var $local = $scope.Account = {};

        $local.currentPlan = {};

        $local.user = UserFactory($scope).get();

        /**
         * LISTENER - triggered when the User is loaded
         */
        $scope.$watch(UserFactory($scope).get(), function() {
            PlanFactory($scope).getActualPlan(function(error, plan) {
                if (!error && plan) {
                    $local.currentPlan = plan;
                    $scope.$broadcast('plan_updated');
                }
            });
        });

        $scope.toString = function() {
            return 'Account';
        };
    }]);