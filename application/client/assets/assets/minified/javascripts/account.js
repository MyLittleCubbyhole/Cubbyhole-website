angular.module('CubbyHole', ['FileManager', 'Authentication', 'restangular', 'Breadcrumb']);
;angular.module('CubbyHole').
	config(['apiUrl', 'RestangularProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', function(apiUrl, restangular, $location, $httpProvider, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);
		$location.html5Mode(false);

        $httpProvider.interceptors.push('AuthenticationFactory');

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);;angular.module('CubbyHole').
	controller('CubbyHoleController', ['$scope', function($scope) {
		var $local = $scope.CubbyHole = {};


		$scope.toString = function() {
			return 'CubbyHole';
		}
	}]);;angular.module('CubbyHome', ['Authentication', 'restangular']);;angular.module('CubbyHome').
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
    factory('PlanFactory', ['Restangular', 'UserFactory', '$http', 'apiUrl', function(restangular, UserFactory, $http, apiUrl){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $local = context.local || {}

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

            prototype.delete = function(id, callback) {
                $http.delete(apiUrl + 'plans/'+id).
                success(function(data, status, headers, config) {
                    callback && callback();
                }).
                error(function(data, status, headers, config) {});
            }

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
    }]);;angular.module('Account', ['CubbyHole', 'CubbyHome', 'highcharts-ng']);;angular.module('Account').
	config(['$locationProvider', '$routeProvider', '$httpProvider', function($location, $routeProvider, $httpProvider) {

        $routeProvider
        .when('/config', {
            templateUrl: '/templates/account/configuration',
            controller: 'ConfigurationController'
        })
        .when('/infos', {
            templateUrl: '/templates/account/information',
            controller: 'InformationsController'
        })
        .when('/timeline', {
            templateUrl: '/templates/account/timeline',
            controller: 'TimelineController'
        })
        .when('/plans', {
            templateUrl: '/templates/account/plans',
            controller: 'PlansController'
        })
        .otherwise({ redirectTo: '/config' });

		$location.html5Mode(false);

	}]);;angular.module('Account').
    controller('AccountController', ['$scope', 'PlanFactory', 'FormatSizeService', 'UserFactory', function($scope, PlanFactory, FormatSizeService, UserFactory) {
        var $local = $scope.Account = {};

        $local.currentPlan = {};

        $local.user = UserFactory($scope).get();

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
    }]);angular.module('Account').
	controller('AccountNavigationController', ['$scope', '$location', function($scope, $location){
		var $local = $scope.AccountNavigation = {};

		$local.goto = function(target) {
			$location.path('/' + target);
		}

		$scope.toString = function() {
			return 'AccountNavigation';
		}
	}]);angular.module('Account').
	controller('ConfigurationController', ['$scope', 'CountryFactory', 'apiUrl', 'UserFactory', function($scope, CountryFactory, apiUrl, UserFactory){
		var $local = $scope.Configuration = {};

        $local.isFormSubmited = false;
        $local.errorNewPasswordMatch = false;

        $local.user = {};

        $local.errorUpdate = false;
        $local.updateSuccess = false;

        $local.countries = CountryFactory($scope).list();

        var birthdate = new Date($scope.Account.user.birthdate).getDate() + '/' + (new Date($scope.Account.user.birthdate).getMonth() + 1) + '/' + new Date($scope.Account.user.birthdate).getFullYear();

        $local.user = {
            email: $scope.Account.user.email,
            firstname: $scope.Account.user.firstname,
            lastname: $scope.Account.user.lastname,
            birthdate: birthdate,
            country: $scope.Account.user.country,
            photo: $scope.Account.user.photo
        };

        if($scope.Account.user.photo && $scope.Account.user.photo != 'null')
            $local.stylePhoto = {'background-image': 'url(' + apiUrl + 'download/1/userPhotos/' + $scope.Account.user.photo + '?token=' + $scope.Account.user.token + '&run)'};

        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if(($local.user.newPassword === undefined || $local.user.newPassword === '') || ($local.user.newPassword !== undefined && $local.user.newPassword !== '' && $local.user.newPassword == $local.user.newPassword2)) {
                    $local.errorNewPasswordMatch = false;

                    delete($local.user.newPassword2);

                    $local.user.countryCode = CountryFactory($scope).getByName($local.user.country).code;

                    UserFactory($scope).updateUser($local.user, function(error) {
                        if(error)
                            $local.errorUpdate = true;
                        else {
                            $local.updateSuccess = true;
                            $local.errorUpdate = false;
                            delete($local.user.password);
                            delete($local.user.newPassword);
                            delete($local.user.newPassword2);
                            $local.isFormSubmited = false;
                            $scope.form.password.$dirty = false;
                            $scope.form.password.$invalid = false;
                        }
                    });
                } else {
                    $local.errorNewPasswordMatch = true;
                }
            }
        };

		$scope.toString = function() {
			return 'Configuration';
		}
	}]);angular.module('Account').
    controller('InformationsController', ['$scope', 'DonutChartProvider', 'DataChartFactory', 'FormatSizeService', function($scope, DonutChart, DataChartFactory, FormatSizeService) {
        var $local = $scope.Informations = {};

        $local.charts = [];

        function updateElements() {
            $local.charts = [];

            DataChartFactory($scope).getSizeUsed(function(error, sizes) {
                var availableSize = 1
                ,   usedSpace = 0
                ,   data = null
                ,   videos = 0
                ,   images = 0
                ,   musiques = 0
                ,   documents = 0
                ,   others = 0;

                if(!error && sizes) {
                    for(var i = 0; i < sizes.length; i++) {
                        if(sizes[i]._id.indexOf("video") > -1)
                            videos += sizes[i].size;
                        else if(sizes[i]._id.indexOf("image") > -1)
                             images += sizes[i].size;
                        else if(sizes[i]._id.indexOf("audio") > -1)
                             musiques += sizes[i].size;
                        else if(sizes[i]._id.indexOf("document") > -1 || sizes[i]._id.indexOf("pdf") > -1)
                             documents += sizes[i].size;
                        else
                             others += sizes[i].size;

                        usedSpace += sizes[i].size;
                    }
                    availableSize = $scope.Account.currentPlan.storage - usedSpace;
                }

                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.storage, true),
                    textSize: 'LIBRE',
                    data: [
                        {
                            name: 'Disponible',
                            y: parseInt(availableSize, 10),
                            size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.storage),
                            color: '#ffffff'
                        }
                    ],
                    title: 'STOCKAGE UTILISE',
                    subtitle: $scope.Account.currentPlan.storage ? FormatSizeService.format($scope.Account.currentPlan.storage) + ' total' : ''
                });

                if(videos)
                   $local.charts[0].data.push(
                        {
                            name: 'Vidéos',
                            y: parseInt(videos, 10),
                            size: FormatSizeService.format(videos),
                            color: '#75c8ef'
                        }
                   );
                if(images)
                   $local.charts[0].data.push(
                        {
                            name: 'Images',
                            y: parseInt(images, 10),
                            size: FormatSizeService.format(images),
                            color: '#ffcb2d'
                        }
                   );
                if(musiques)
                   $local.charts[0].data.push(
                        {
                            name: 'Musiques',
                            y: parseInt(musiques, 10),
                            size: FormatSizeService.format(musiques),
                            color: '#ff5a5a'
                        }
                   );
                if(documents)
                   $local.charts[0].data.push(
                        {
                            name: 'Documents',
                            y: parseInt(documents, 10),
                            size: FormatSizeService.format(documents),
                            color: '#52d11a'
                        }
                   );
                if(others)
                   $local.charts[0].data.push(
                        {
                            name: 'Autre',
                            y: parseInt(others, 10),
                            size: FormatSizeService.format(others),
                            color: '#B175EF'
                        }
                   );

            })

            DataChartFactory($scope).getCurrentQuota(function(error, quota) {
                var availableSize = 1;
                if(!error && quota) {
                    availableSize = $scope.Account.currentPlan.quota - quota.quotaUsed;
                }
                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.quota, true),
                    textSize: 'DISPO',
                    data: [],
                    title: 'QUOTA DE PARTAGE',
                    subtitle: $scope.Account.currentPlan.quota ? FormatSizeService.format($scope.Account.currentPlan.quota) + ' total' : ''
                });

                if(quota)
                    $local.charts[1].data.push({
                        name: 'Utilisé',
                        y: quota.quotaUsed,
                        size: FormatSizeService.format(quota.quotaUsed),
                        color: '#40a7fd'
                    })

                $local.charts[1].data.push({
                    name: 'Disponible',
                    y: availableSize,
                    size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.quota),
                    color: '#ffffff'
                })
            })
        }

        if(!$scope.Account.currentPlan)
            $scope.$on('plan_updated', function() {
                updateElements();
            });
        else
            updateElements();

        $scope.toString = function() {
            return 'Informations';
        };
    }]);angular.module('Account').
	controller('TimelineController', ['$scope', 'UserFactory', function($scope, UserFactory){
		var $local = $scope.Timeline = {};

		UserFactory($scope).historic(function(data) {
			var witness = true;
			for(var i = 0; i<data.length; i++) {
				data[i].date = new Date(data[i].date);
				data[i].message = data[i].owner;
				data[i].message += data[i].owner == 'You' ? ' have ' : ' has ';
				witness = true;
				switch(data[i].action) {
					case 'delete': 
						data[i].icon = 'icon-times';
						data[i].message += 'deleted "'+ data[i].name +'"';
					break;
					case 'create':
						data[i].icon = 'icon-cloud-upload';
						data[i].message += (data[i].itemType == 'folder' ? 'created ' : 'uploaded ') + '"'+ data[i].name +'" in ' + data[i].fullPath.substring(1,data[i].fullPath.lastIndexOf('/')) + '/' ;
					break;
					case 'share':
						data[i].icon = 'icon-link';
						data[i].message += 'shared "/'+ data[i].fullPath.split('/').pop() + '" with ';
						if(data[i].targetOwner == 'You' && data[i].name != 'Public')
							data[i].message +=  'you';
						else
							data[i].message += '"'+ data[i].name +'"';
					break;
					case 'unshare':
						data[i].icon = 'icon-link';
						data[i].message += 'stoped the sharing of "/'+ data[i].fullPath.split('/').pop() + '" with you ';
					break;
					case 'rename':
						data[i].icon = 'icon-pencil';
						data[i].message += 'renamed "'+ data[i].fullPath.split('/').pop() + '" to "'+ data[i].name +'"';
					break;
					case 'move':
						data[i].icon = 'icon-chevron-right';
						data[i].message += 'moved "'+ data[i].name + '" in '+ data[i].fullPath;
					break;
				}
			}
			$local.events = data;
		});

		$scope.toString = function() {
			return 'Timeline';
		}
	}]);angular.module('Account').
	controller('PlansController', ['$scope', '$location', 'apiUrl', 'PlanFactory', function($scope, $location, apiUrl, PlanFactory){
		var $local = $scope.Plans = {};

        $local.selectedPlan = {};
        $local.plans = [];

        $local.select2Options = {
             minimumResultsForSearch: -1
        };

        PlanFactory($scope).getAllPlans(function(error, plans) {
            $local.plans = plans;

            if($location.$$search.planId)
                for(var i = 0; i < $local.plans.length; i++)
                    if($local.plans[i].id == $location.$$search.planId)
                        $local.selectPlan($local.plans[i]);
        });

        $local.selectPlan = function(plan) {
            plan.selected = true;
            $local.selectedPlan = {
                id: plan.id,
                price: plan.price,
                name: 'Plan ' + plan.name,
                description: plan.description,
                storage: plan.storage,
                duration: plan.duration,
                uploadBandwidth: plan.uploadBandwidth,
                downloadBandwidth: plan.downloadBandwidth,
                quota: plan.quota
            };
        }

        $local.changeDuration = function() {
            for(var i = 0; i < $local.plans.length; i++) {
                if($local.plans[i].selected) {
                    $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                    $local.plans[i].duration = $local.selectedPlan.duration;
                    $local.plans[i].price = $local.plans[i].price * $local.plans[i].duration;
                }
            }
        }

        $local.unselect = function() {
            $local.selectedPlan = {};
            for(var i = 0; i < $local.plans.length; i++) {
                $local.plans[i].selected = false;
                $local.plans[i].price = $local.plans[i].price / $local.plans[i].duration;
                $local.plans[i].duration = 1;
            }
        }

		$scope.toString = function() {
			return 'Plans';
		};
	}]);;angular.module('Account').
    provider('DonutChartProvider', function() {

        var _default = {
            options: {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent',
                    events: {
                        load: function() {
                            setTimeout(function(){$(window).trigger('resize')}, 00);
                        }
                    }
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true,
                        startAngle: 120,
                        borderWidth: 0,
                        tooltip: {
                            pointFormat: '<b>{point.size}<b>'
                        }
                    }
                },
                legend: {
                    align: 'center',
                    enabled: true
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '',
                data: null,
                size: '110%',
                innerSize: '70%'
            }],
            title: {
                text: '',
                margin: 10,
                style: {
                    'font-size': '22px',
                    'font-family': '"Open Sans", sans-serif'
                }
            },
            subtitle: {
                text: '',
                style: {
                    'font-size': '17px',
                    'font-family': '"Open Sans", sans-serif',
                    'margin-bottom': '5px'
                }
            },

            loading: false
        };

        this.$get = function() {

            var DonutChart = function(options) {

                this.opts = {};
                _.merge(this.opts, _default, options);
                this.options = this.opts.options;
                this.series = this.opts.series;
                this.title = this.opts.title;
                this.subtitle = this.opts.subtitle;
                this.loading = this.opts.loading;
                this.tooltip = this.opts.tooltip;
            };

            Object.defineProperties(DonutChart.prototype, {
                'node' : {
                    get : function() {
                        return this._node;
                    },
                    set : function(node) {
                        this._node = angular.element(node);
                    }
                }
            });

            return DonutChart;
        };
    });angular.module('Account').
    factory('DataChartFactory', ['Restangular', 'UserFactory', 'FormatSizeService', function(restangular, userFactory, FormatSizeService){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            prototype.getSizeUsed = function(callback) {
                restangular.one('browse').one(userFactory($scope).get().id + '/size').get().then(function(sizes) {
                    var sizesToReturn = null;
                    if(sizes && sizes.length > 0) {
                        sizesToReturn = [];
                        for(var i = 0; i < sizes.length; i++) {
                            sizesToReturn.push({
                                _id: sizes[i]._id,
                                size: parseInt(sizes[i].size, 10)
                            });
                        }
                    }
                    callback.call(this, (sizesToReturn ? null : 'no sizes'), (sizesToReturn ? sizesToReturn : null));
                }, function(error) { callback.call(this, 'no sizes', null); console.error(error); });
            }

            prototype.getCurrentQuota = function(callback) {
                restangular.one('users').one(userFactory($scope).get().id + '/quota').get().then(function(quota) {
                    var quotaToReturn = null;
                    if(quota && quota.quotaused) {
                        quotaToReturn = {
                            day: quota.day,
                            quotaUsed: parseInt(quota.quotaused, 10)
                        }
                    }
                    callback.call(this, (quotaToReturn ? null : 'no current quota'), (quotaToReturn ? quotaToReturn : null));
                }, function(error) { callback.call(this, 'no current quota', null); console.error(error); });
            }

            return prototype;
        };
    }]);;angular.module('Account').
    directive('donutchart', ['DonutChartProvider', '$parse', '$window', function(DonutChart, $parse, $window) {
        return {
            scope: true,
            restrict: 'E',
            controller: ['$scope', function($scope){
                var $local = $scope._donutChart = {};

                $local.sizeAvailable = '';
                $local.sizeText = '';

                $local.chart = new DonutChart({});

                $scope.toString = function() {
                    return '_donutChart';
                }
            }],
            template:
                '<section>'
            +       '<highchart config="_donutChart.chart"></highchart>'
            +       '<article class="leftPanel">'
            +           '<article class="topPanel">'
            +               '<article class="chart-label-primary google-font">'
            +                   '{{_donutChart.sizeAvailable}}'
            +                   '<article class="chart-label-secondary google-font">{{_donutChart.sizeText}}</article>'
            +               '</article>'
            +           '</article>'
            +       '</article>'
            +   '</section>',
            replace: true,
            link: function($scope, $node, attributes) {
                var $local = $scope._donutChart;

                $local.sizeAvailable = attributes.sizeAvailable;
                $local.sizeText = attributes.sizeText;
                $local.chart.series[0].name = 'Taille';
                $local.chart.series[0].data = $parse(attributes.data)($scope);
                $local.chart.title.text = attributes.title;
                $local.chart.subtitle.text = attributes.subtitle;

                angular.element($window).trigger('resize');

            }
        };
    }]);