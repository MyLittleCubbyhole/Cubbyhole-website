angular.module('CubbyHome', ['Authentication', 'restangular']);;angular.module('CubbyHome').
	config(['apiUrl', 'RestangularProvider', '$sceDelegateProvider', function(apiUrl, restangular, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);;angular.module('CubbyHome').
	controller('CubbyHomeController', ['$scope', '$location', 'PlanFactory', 'UserFactory', 'apiUrl', function($scope, $location, PlanFactory, UserFactory, apiUrl) {
		var $local = $scope.CubbyHome = {};

        $local.plans = [];
        $local.adminPhotos = [];
        for(var i = 1; i <= 5; i++)
            $local.adminPhotos.push({'background-image': 'url("' + apiUrl + 'download/1/userPhotos/adminPhoto' + i +'.jpg")'});

        $local.showModalRegister = false;
        $local.showModalLogin = false;
        $local.showModalConfirmation = false;

        $local.planUrl = '/account?token=';

        /**
         * LISTENER - triggered when the user is updated
         */
        $scope.$watch(UserFactory($scope).get(), function() {
            $local.planUrl += UserFactory($scope).get().token + '#/plans?planId=';
        });

        /**
         * LISTENER - hide modal when called
         */
        $scope.$on('hide', function() {
            $local.showModalLogin = false;
            $local.showModalRegister = false;
            $local.showModalConfirmation = false;
        });

        /**
         * show the register modal
         */
        $local.showRegisterModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalLogin = false;
            $local.showModalRegister = true;
            $local.showModalConfirmation = false;
        }

        /**
         * show login modal
         */
        $local.showLoginModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = true;
            $local.showModalConfirmation = false;
        }

        /**
         * show confirmation modal
         */
        $local.showConfirmationModal = function() {
            $scope.Overlay.activated = true;
            $local.showModalRegister = false;
            $local.showModalLogin = false;
            $local.showModalConfirmation = true;
        }

        if($location.path() == '/login')
            $local.showLoginModal();

        if($location.path() == '/register')
            $local.showRegisterModal();

        if($location.path() == '/confirmation')
            $local.showConfirmationModal();

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;
            for(var i = 0; i < $local.plans.length; i++)
                $local.plans[i].photoUrl = {'background-image': 'url("' + $local.plans[i].photoUrl + '")'};
        });

		$scope.toString = function() {
			return 'CubbyHome';
		}
	}]);;angular.module('CubbyHome').
    factory('PlanFactory', ['Restangular', 'UserFactory', '$http', 'apiUrl', function(restangular, UserFactory, $http, apiUrl){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $local = context.local || {}

            /**
             * get the current active plan from the database
             * @param  {Function} callback 
             */
            prototype.getActualPlan = function(callback) {
                restangular.one('users').one(UserFactory($scope).get().id + '/plan').get().then(function(plan) {
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
                            dateEnd: plan.dateend,
                            photoUrl: apiUrl + 'download/1/admin/' + plan.photo + '?token=' + UserFactory($scope).get().token + '&run',
                            photo: plan.photo
                        };
                    }
                    callback.call(this, (planToReturn ? null : 'no current plan'), (planToReturn ? planToReturn : null));
                }, function(error) { callback.call(this, 'no current plan', null); console.error(error); });
            };

            /**
             * get all plan from database
             * @param  {Function} callback 
             */
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
                                available: plans[i].available,
                                photoUrl: apiUrl + 'download/1/admin/' + plans[i].photo + '?token=' + UserFactory($scope).get().token + '&run',
                                photo: plans[i].photo
                            });
                    callback.call(this, (plansToReturn ? null : 'no plan found'), (plansToReturn ? plansToReturn : null));
                }, function(error) { callback.call(this, 'no plan found', null); console.error(error); });
            };

            /**
             * create a new plan in database
             * @param  {Object} plan Plan
             */
            prototype.create = function(plan) {

                plan.uploadBandwidth = parseInt(plan.uploadBandwidth, 10);
                plan.downloadBandwidth = parseInt(plan.downloadBandwidth, 10);
                $http.post(apiUrl + 'plans', plan).
                success(function(data, status, headers, config) {
                    $local.unselect();
                    data.photoUrl = apiUrl + 'download/1/admin/' + data.photo + '?token=' + UserFactory($scope).get().token + '&run',
                    data.photo = data.photo
                    $local.plans.push(data.plan)
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            }

            /**
             * update the current plan
             * @param  {Object}   plan     Plan
             * @param  {Function} callback 
             */
            prototype.edit = function(plan, callback) {

                plan.uploadBandwidth = parseInt(plan.uploadBandwidth, 10);
                plan.downloadBandwidth = parseInt(plan.downloadBandwidth, 10);
                $http.put(apiUrl + 'plans/'+plan.id, plan).
                success(function(data, status, headers, config) {
                    $local.unselect();
                    callback && callback();
                }).
                error(function(data, status, headers, config) {
                    console.error(data);
                });
            }

            /**
             * remove the plan
             * @param  {integer}   id       plan id
             * @param  {Function} callback 
             */
            prototype.delete = function(id, callback) {
                $http.delete(apiUrl + 'plans/'+id).
                success(function(data, status, headers, config) {
                    callback && callback();
                }).
                error(function(data, status, headers, config) {});
            }

            /**
             * get all plan images
             * @param  {Function} callback 
             */
            prototype.getAllimages = function(callback) {
                $http.get(apiUrl + 'plans/images').
                success(function(data, status, headers, config) {

                    for(var i in data)
                        data[i] = { url: apiUrl + 'download/1/admin/' + data[i] + '?token=' + UserFactory($scope).get().token + '&run', name: data[i] };

                    callback && callback(null,data);
                }).
                error(function(data, status, headers, config) {
                    callback && callback(data);
                });
            }

            return prototype;
        };
    }]);