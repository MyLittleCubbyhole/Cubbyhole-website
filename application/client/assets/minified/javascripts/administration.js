angular.module('CubbyHome', ['Authentication', 'restangular']);;angular.module('CubbyHome').
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
    }]);;angular.module('Administration', ['ngRoute', 'Tools', 'CubbyHome', 'Grumpy-ui']);;angular.module('Administration').
	config(['apiUrl', 'RestangularProvider','$locationProvider', '$routeProvider', '$httpProvider', function(apiUrl, restangular, $location, $routeProvider, $httpProvider) {

        //angular navigation
        restangular.setBaseUrl(apiUrl);
        $routeProvider
        .when('/users', {
            templateUrl: '/templates/admin/users',
            controller: 'UserAdministrationController'
        })
        .when('/plans', {
            templateUrl: '/templates/admin/plans',
            controller: 'PlanAdministrationController'
        })
        .otherwise({ redirectTo: '/users' });
        $httpProvider.interceptors.push('AuthenticationFactory');

		$location.html5Mode(false);

	}]);;angular.module('Administration').
	controller('AdministrationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.Administration = {};

		/**
		 * navigate to the targeted path
		 * @param  {string} target path
		 */
		$local.goto = function(target) {
			$location.path('/' + target);
			console.log(target)
		}

		$scope.toString = function() {
			return 'Administration';
		}
	}]);angular.module('Administration').
	controller('PlanAdministrationController', ['$scope', 'PlanFactory', function($scope, PlanFactory) {
		var $local = $scope.PlanAdministration = {};
		$local.selectedPlan = {};
		$local.plans = [];
        $local.planImages = [];

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;
        });

        PlanFactory($scope).getAllimages(function(error, images) {
            $local.planImages = [];
            if(!error)
            for(var i in images)
                $local.planImages.push({
                    style:{'background-image': 'url("' +  images[i].url + '")'},
                    name: images[i].name
                });
        })

        /**
         * select a plan
         * @param  {Object} plan Plan
         */
        $local.selectPlan = function(plan) {
            plan.selected = true;
            $local.selectedPlan = {
                id: plan.id,
                price: plan.price,
                name: plan.name,
                photoUrl: plan.photoUrl,
                style: {'background-image': 'url("' +  plan.photoUrl + '")'},
                description: plan.description,
                storage: plan.storage,
                photo: plan.photo,
                duration: plan.duration,
                downloadBandwidth: plan.downloadBandwidth,
                uploadBandwidth: plan.uploadBandwidth,
                quota: plan.quota
            };
        }

        /**
         * unselect a plan
         */
        $local.unselect = function() {
            $local.selectedPlan = {};
            for(var i = 0; i < $local.plans.length; i++) {
                $local.plans[i].selected = false;
                $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                $local.plans[i].duration = 1;
            }
        }

        /**
         * create a new plan
         */
        $local.createPlan = function() {
            $local.unselect();
            var photoName = ''
            ,   photoUrl = '';
            if($local.planImages[0]) {
                photoName = $local.planImages[0].name;
                photoUrl = $local.planImages[0].photoUrl;
            }
            $local.selectedPlan = {
                id: Math.round(Math.random()*1000000),
                price: 0,
                name: 'NEW',
                photo: photoName,
                photoUrl: photoUrl,
                description: 'DESCRIPTION',
                storage: 0,
                duration: 1,
                downloadBandwidth: 0,
                uploadBandwidth: 0,
                quota: 0,
                new: true
            };
        }

        /**
         * delete a plan
         * @param  {Object} $event Angular event
         * @param  {integer} index  index
         */
        $local.delete = function($event, index) {
            $event.stopPropagation();
            $event.preventDefault();
            PlanFactory($scope, {local: $local}).delete($local.plans[index].id, function() {
                PlanFactory($scope).getAllPlans(function(error, plans) {
                    $local.plans = plans;
                });
            });
        }

        /**
         * create or update the current plan in database
         * @param  {Boolean} isValid form validity
         */
        $local.save = function(isValid) {
            if(isValid)
                if($local.selectedPlan.new)
                    PlanFactory($scope, {local: $local}).create($local.selectedPlan)
                else
                    PlanFactory($scope, {local: $local}).edit($local.selectedPlan, function() {
                        PlanFactory($scope).getAllPlans(function(error, plans) {
                            $local.plans = plans;
                        });
                    })
        }

		$scope.toString = function() {
			return 'PlanAdministration';
		}
	}]);angular.module('Administration').
	controller('UserAdministrationController', ['$scope', 'UserFactory', 'apiUrl', '$timeout', function($scope, UserFactory, apiUrl, $timeout) {
		var $local = $scope.UserAdministration = {}
		,	timer = null;
		$local.user = UserFactory($scope).get();
		$local.user.role = $local.user.roleid == 2? 'ADMINISTRATOR': 'USER';
		$local.users = new Array();
		UserFactory($scope).all(init, {});

		$local.filter = {
			user: false,
			admin: false
		}

		/**
		 * apply filter and searh in the database
		 */
		$local.apply = function() {
			$timeout.cancel(timer);

			var options = { role: false, email: false};

			options.role = ($local.filter.user || $local.filter.admin) && !( !!$local.filter.admin && !!$local.filter.user ) ? ( $local.filter.user ? 1 : 2 ) : false;

			options.email = $local.filter.search && $local.filter.search.length > 3 ? $local.filter.search : false;

			timer = $timeout(function() {
				$local.users.splice(0);
				UserFactory($scope).all(init, options);
			}, 200);
		}
		
		/**
		 * update role of an user
		 * @param  {Object} user User
		 */
		$local.applyRole = function(user) {
			if(user.roleid == 2)
				UserFactory($scope).promote(user);
			else
				UserFactory($scope).demote(user);
		}

		/**
		 * initialize the user list
		 * @param  {Function} error	callback
		 * @param  {Function} data  callback
		 */
		function init(error, data) {
			if(!error)
				$local.users = data;

			for(var i = 0; i<$local.users.length; i++)
				$local.users[i].image = apiUrl + 'download/1/userPhotos/' + $local.users[i].photo + '?token=' + $local.user.token + '&run';
		}

		$scope.toString = function() {
			return 'UserAdministration';
		}
	}])