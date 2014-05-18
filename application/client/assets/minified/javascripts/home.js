angular.module('CubbyHome', ['Authentication', 'restangular']);;angular.module('CubbyHome').
	config(['apiUrl', 'RestangularProvider', '$sceDelegateProvider', function(apiUrl, restangular, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);;angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', '$location', 'PlanFactory', 'UserFactory', function($scope, $location, PlanFactory, UserFactory) {
		var $local = $scope.CubbyHome = {};

        $local.plans = [];

        $local.showModalRegister = false;
        $local.showModalLogin = false;
        $local.showModalConfirmation = false;

        $local.planUrl = '/account?token=';
        $scope.$watch(UserFactory($scope).get(), function() {
            $local.planUrl += UserFactory($scope).get().token + '#/plans?planId=';
        });

        $scope.$on('hide', function() {
            $local.showModalLogin = false;
            $local.showModalRegister = false;
            $local.showModalConfirmation = false;
        });

        $local.showRegisterModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalLogin = false;
            $local.showModalRegister = true;
            $local.showModalConfirmation = false;
        }

        $local.showLoginModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = true;
            $local.showModalConfirmation = false;
        }

        $local.showConfirmationModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = false;
            $local.showModalConfirmation = true;
        }

        if($location.path() == '/login') {
            $local.showLoginModal();
        }

        if($location.path() == '/register') {
            $local.showRegisterModal();
        }

        if($location.path() == '/confirmation') {
            $local.showConfirmationModal();
        }

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans =plans;
        });

		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);;angular.module('CubbyHome').
    factory('PlanFactory', ['Restangular', 'UserFactory', function(restangular, userFactory){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.getActualPlan = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/plan').get().then(function(plan) {
                    var planToReturn = null;
                    if(plan && plan.id) {
                        planToReturn = {
                            id: plan.id,
                            photo: plan.photo,
                            price: plan.price,
                            name: plan.name,
                            description: plan.description,
                            storage: parseInt(plan.storage, 10),
                            duration: parseInt(plan.duration, 10),
                            uploadBandwidth: parseInt(plan.uploadbandwidth, 10),
                            downloadBandwidth: parseInt(plan.downloadbandwidth, 10),
                            quota: parseInt(plan.quota, 10),
                            available: plan.available,
                            dateStart: plan.datestart,
                            dateEnd: plan.dateend
                        };
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            };

            prototype.getAllPlans = function(callback) {
                restangular.one('plans').getList().then(function(plans) {
                    var plansToReturn = [];
                    if(plans)
                        for(var i = 0; i < plans.length; i++)
                            plansToReturn.push({
                                id: plans[i].id,
                                photo: plans[i].photo,
                                price: plans[i].price,
                                name: plans[i].name,
                                description: plans[i].description,
                                storage: parseInt(plans[i].storage, 10),
                                duration: parseInt(plans[i].duration, 10),
                                uploadBandwidth: parseInt(plans[i].uploadbandwidth, 10),
                                downloadBandwidth: parseInt(plans[i].downloadbandwidth, 10),
                                quota: parseInt(plans[i].quota, 10),
                                available: plans[i].available
                            });
                    callback.call(this, (plansToReturn ? null : 'no plan found'), (plansToReturn ? plansToReturn : null));
                }, function(error) { callback.call(this, 'no plan found', null); console.error(error); });
            };

            return prototype;
        };
    }]);