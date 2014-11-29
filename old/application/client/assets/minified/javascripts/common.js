angular.module('Config', []);;angular.module('Config').
	//*/
	constant('apiUrl', 'http://127.0.0.1:5150/api/').
    constant('websocketUrl', 'http://127.0.0.1:5150').
    /*/
	constant('apiUrl', 'https://api.trouducube.com/api/').
	constant('websocketUrl', 'https://api.trouducube.com').
	/*
	constant('apiUrl', 'http://www.pillowrc.com/api/').
    constant('websocketUrl', 'http://www.pillowrc.com:80').
    //*/
	constant('socketRoom', '/cubbyhole');;angular.module('Config').
    factory('CountryFactory', function() {

        var countries = [{"name":"Afghanistan","code":"AF"},{"name":"Åland Islands","code":"AX"},{"name":"Albania","code":"AL"},{"name":"Algeria","code":"DZ"},{"name":"American Samoa","code":"AS"},{"name":"AndorrA","code":"AD"},{"name":"Angola","code":"AO"},{"name":"Anguilla","code":"AI"},{"name":"Antarctica","code":"AQ"},{"name":"Antigua and Barbuda","code":"AG"},{"name":"Argentina","code":"AR"},{"name":"Armenia","code":"AM"},{"name":"Aruba","code":"AW"},{"name":"Australia","code":"AU"},{"name":"Austria","code":"AT"},{"name":"Azerbaijan","code":"AZ"},{"name":"Bahamas","code":"BS"},{"name":"Bahrain","code":"BH"},{"name":"Bangladesh","code":"BD"},{"name":"Barbados","code":"BB"},{"name":"Belarus","code":"BY"},{"name":"Belgium","code":"BE"},{"name":"Belize","code":"BZ"},{"name":"Benin","code":"BJ"},{"name":"Bermuda","code":"BM"},{"name":"Bhutan","code":"BT"},{"name":"Bolivia","code":"BO"},{"name":"Bosnia and Herzegovina","code":"BA"},{"name":"Botswana","code":"BW"},{"name":"Bouvet Island","code":"BV"},{"name":"Brazil","code":"BR"},{"name":"British Indian Ocean Territory","code":"IO"},{"name":"Brunei Darussalam","code":"BN"},{"name":"Bulgaria","code":"BG"},{"name":"Burkina Faso","code":"BF"},{"name":"Burundi","code":"BI"},{"name":"Cambodia","code":"KH"},{"name":"Cameroon","code":"CM"},{"name":"Canada","code":"CA"},{"name":"Cape Verde","code":"CV"},{"name":"Cayman Islands","code":"KY"},{"name":"Central African Republic","code":"CF"},{"name":"Chad","code":"TD"},{"name":"Chile","code":"CL"},{"name":"China","code":"CN"},{"name":"Christmas Island","code":"CX"},{"name":"Cocos (Keeling) Islands","code":"CC"},{"name":"Colombia","code":"CO"},{"name":"Comoros","code":"KM"},{"name":"Congo","code":"CG"},{"name":"Congo, The Democratic Republic of the","code":"CD"},{"name":"Cook Islands","code":"CK"},{"name":"Costa Rica","code":"CR"},{"name":"Cote D\"Ivoire","code":"CI"},{"name":"Croatia","code":"HR"},{"name":"Cuba","code":"CU"},{"name":"Cyprus","code":"CY"},{"name":"Czech Republic","code":"CZ"},{"name":"Denmark","code":"DK"},{"name":"Djibouti","code":"DJ"},{"name":"Dominica","code":"DM"},{"name":"Dominican Republic","code":"DO"},{"name":"Ecuador","code":"EC"},{"name":"Egypt","code":"EG"},{"name":"El Salvador","code":"SV"},{"name":"Equatorial Guinea","code":"GQ"},{"name":"Eritrea","code":"ER"},{"name":"Estonia","code":"EE"},{"name":"Ethiopia","code":"ET"},{"name":"Falkland Islands (Malvinas)","code":"FK"},{"name":"Faroe Islands","code":"FO"},{"name":"Fiji","code":"FJ"},{"name":"Finland","code":"FI"},{"name":"France","code":"FR"},{"name":"French Guiana","code":"GF"},{"name":"French Polynesia","code":"PF"},{"name":"French Southern Territories","code":"TF"},{"name":"Gabon","code":"GA"},{"name":"Gambia","code":"GM"},{"name":"Georgia","code":"GE"},{"name":"Germany","code":"DE"},{"name":"Ghana","code":"GH"},{"name":"Gibraltar","code":"GI"},{"name":"Greece","code":"GR"},{"name":"Greenland","code":"GL"},{"name":"Grenada","code":"GD"},{"name":"Guadeloupe","code":"GP"},{"name":"Guam","code":"GU"},{"name":"Guatemala","code":"GT"},{"name":"Guernsey","code":"GG"},{"name":"Guinea","code":"GN"},{"name":"Guinea-Bissau","code":"GW"},{"name":"Guyana","code":"GY"},{"name":"Haiti","code":"HT"},{"name":"Heard Island and Mcdonald Islands","code":"HM"},{"name":"Holy See (Vatican City State)","code":"VA"},{"name":"Honduras","code":"HN"},{"name":"Hong Kong","code":"HK"},{"name":"Hungary","code":"HU"},{"name":"Iceland","code":"IS"},{"name":"India","code":"IN"},{"name":"Indonesia","code":"ID"},{"name":"Iran, Islamic Republic Of","code":"IR"},{"name":"Iraq","code":"IQ"},{"name":"Ireland","code":"IE"},{"name":"Isle of Man","code":"IM"},{"name":"Israel","code":"IL"},{"name":"Italy","code":"IT"},{"name":"Jamaica","code":"JM"},{"name":"Japan","code":"JP"},{"name":"Jersey","code":"JE"},{"name":"Jordan","code":"JO"},{"name":"Kazakhstan","code":"KZ"},{"name":"Kenya","code":"KE"},{"name":"Kiribati","code":"KI"},{"name":"Korea, Democratic People\"S Republic of","code":"KP"},{"name":"Korea, Republic of","code":"KR"},{"name":"Kuwait","code":"KW"},{"name":"Kyrgyzstan","code":"KG"},{"name":"Lao People\"S Democratic Republic","code":"LA"},{"name":"Latvia","code":"LV"},{"name":"Lebanon","code":"LB"},{"name":"Lesotho","code":"LS"},{"name":"Liberia","code":"LR"},{"name":"Libyan Arab Jamahiriya","code":"LY"},{"name":"Liechtenstein","code":"LI"},{"name":"Lithuania","code":"LT"},{"name":"Luxembourg","code":"LU"},{"name":"Macao","code":"MO"},{"name":"Macedonia, The Former Yugoslav Republic of","code":"MK"},{"name":"Madagascar","code":"MG"},{"name":"Malawi","code":"MW"},{"name":"Malaysia","code":"MY"},{"name":"Maldives","code":"MV"},{"name":"Mali","code":"ML"},{"name":"Malta","code":"MT"},{"name":"Marshall Islands","code":"MH"},{"name":"Martinique","code":"MQ"},{"name":"Mauritania","code":"MR"},{"name":"Mauritius","code":"MU"},{"name":"Mayotte","code":"YT"},{"name":"Mexico","code":"MX"},{"name":"Micronesia, Federated States of","code":"FM"},{"name":"Moldova, Republic of","code":"MD"},{"name":"Monaco","code":"MC"},{"name":"Mongolia","code":"MN"},{"name":"Montserrat","code":"MS"},{"name":"Morocco","code":"MA"},{"name":"Mozambique","code":"MZ"},{"name":"Myanmar","code":"MM"},{"name":"Namibia","code":"NA"},{"name":"Nauru","code":"NR"},{"name":"Nepal","code":"NP"},{"name":"Netherlands","code":"NL"},{"name":"Netherlands Antilles","code":"AN"},{"name":"New Caledonia","code":"NC"},{"name":"New Zealand","code":"NZ"},{"name":"Nicaragua","code":"NI"},{"name":"Niger","code":"NE"},{"name":"Nigeria","code":"NG"},{"name":"Niue","code":"NU"},{"name":"Norfolk Island","code":"NF"},{"name":"Northern Mariana Islands","code":"MP"},{"name":"Norway","code":"NO"},{"name":"Oman","code":"OM"},{"name":"Pakistan","code":"PK"},{"name":"Palau","code":"PW"},{"name":"Palestinian Territory, Occupied","code":"PS"},{"name":"Panama","code":"PA"},{"name":"Papua New Guinea","code":"PG"},{"name":"Paraguay","code":"PY"},{"name":"Peru","code":"PE"},{"name":"Philippines","code":"PH"},{"name":"Pitcairn","code":"PN"},{"name":"Poland","code":"PL"},{"name":"Portugal","code":"PT"},{"name":"Puerto Rico","code":"PR"},{"name":"Qatar","code":"QA"},{"name":"Reunion","code":"RE"},{"name":"Romania","code":"RO"},{"name":"Russian Federation","code":"RU"},{"name":"RWANDA","code":"RW"},{"name":"Saint Helena","code":"SH"},{"name":"Saint Kitts and Nevis","code":"KN"},{"name":"Saint Lucia","code":"LC"},{"name":"Saint Pierre and Miquelon","code":"PM"},{"name":"Saint Vincent and the Grenadines","code":"VC"},{"name":"Samoa","code":"WS"},{"name":"San Marino","code":"SM"},{"name":"Sao Tome and Principe","code":"ST"},{"name":"Saudi Arabia","code":"SA"},{"name":"Senegal","code":"SN"},{"name":"Serbia and Montenegro","code":"CS"},{"name":"Seychelles","code":"SC"},{"name":"Sierra Leone","code":"SL"},{"name":"Singapore","code":"SG"},{"name":"Slovakia","code":"SK"},{"name":"Slovenia","code":"SI"},{"name":"Solomon Islands","code":"SB"},{"name":"Somalia","code":"SO"},{"name":"South Africa","code":"ZA"},{"name":"South Georgia and the South Sandwich Islands","code":"GS"},{"name":"Spain","code":"ES"},{"name":"Sri Lanka","code":"LK"},{"name":"Sudan","code":"SD"},{"name":"Suriname","code":"SR"},{"name":"Svalbard and Jan Mayen","code":"SJ"},{"name":"Swaziland","code":"SZ"},{"name":"Sweden","code":"SE"},{"name":"Switzerland","code":"CH"},{"name":"Syrian Arab Republic","code":"SY"},{"name":"Taiwan, Province of China","code":"TW"},{"name":"Tajikistan","code":"TJ"},{"name":"Tanzania, United Republic of","code":"TZ"},{"name":"Thailand","code":"TH"},{"name":"Timor-Leste","code":"TL"},{"name":"Togo","code":"TG"},{"name":"Tokelau","code":"TK"},{"name":"Tonga","code":"TO"},{"name":"Trinidad and Tobago","code":"TT"},{"name":"Tunisia","code":"TN"},{"name":"Turkey","code":"TR"},{"name":"Turkmenistan","code":"TM"},{"name":"Turks and Caicos Islands","code":"TC"},{"name":"Tuvalu","code":"TV"},{"name":"Uganda","code":"UG"},{"name":"Ukraine","code":"UA"},{"name":"United Arab Emirates","code":"AE"},{"name":"United Kingdom","code":"GB"},{"name":"United States","code":"US"},{"name":"United States Minor Outlying Islands","code":"UM"},{"name":"Uruguay","code":"UY"},{"name":"Uzbekistan","code":"UZ"},{"name":"Vanuatu","code":"VU"},{"name":"Venezuela","code":"VE"},{"name":"Viet Nam","code":"VN"},{"name":"Virgin Islands, British","code":"VG"},{"name":"Virgin Islands, U.S.","code":"VI"},{"name":"Wallis and Futuna","code":"WF"},{"name":"Western Sahara","code":"EH"},{"name":"Yemen","code":"YE"},{"name":"Zambia","code":"ZM"},{"name":"Zimbabwe","code":"ZW"}];

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            /**
             * get a country thank to it id
             * @param  {integer} id country id
             * @return {object}    Country
             */
            prototype.get = function(id) {
                var results;

                id = id.toUpperCase();
                results = countries.filter(function(entry) {
                    return entry.code.toUpperCase().indexOf(id) !== -1;
                });
                return results[0];
            };

            /**
             * get a country thank to it name
             * @param  {string} name country name
             * @return {object}    Country
             */
            prototype.getByName = function(name) {
                var results;

                name = name.toUpperCase();
                results = countries.filter(function(entry) {
                    return entry.name.toUpperCase().indexOf(name) !== -1;
                });
                return results[0];
            };

            /**
             * list all countries
             * @return {array} countries
             */
            prototype.list = function() {
                return countries;
            };

            return prototype;
        };

    });
;angular.module('Websocket', []);;angular.module('Websocket').
	factory('WebsocketFactory', ['websocketUrl', 'socketRoom', function(url, socketRoom) {

		var socketIO = {}
		,	socket;

		/**
		 * initialize the websocket connection
		 */
		function init() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				socketIO = io.connect(url);
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + url);

				socket.on('socket-authentication', function() {
					authenticate(); 
				})
			}
			else {
				console.error('io not defined - problem with webservice');
			}
		};

		/**
		 * authenticate the user to the websocket rooms
		 */
        function authenticate() {
			var user = localStorage.getItem('user');
			if(!user)
				user = sessionStorage.getItem('user');

            if(socket && user)
                socket.emit('socket-authentication', { token: JSON.parse(user).token });
        }

		return function() {
			!socket && init();
			return socket;
		};
	}]);;angular.module('Tools', ['Websocket', 'ui.select2']);;angular.module('Tools').
	factory('UploaderFactory', ['WebsocketFactory', function(WebsocketFactory){

		var files = {}
		,	socket = WebsocketFactory();

		/**
		 * LISTENER - send the next packet to the webservice
		 * @param  {Object} data upload item information
		 */
		socket.on('upload_next', function(data) {
			files[data.id].context.entity.size = Number(data.percent);
			files[data.id].data.sizeAdded += parseInt(data['chunkSize'], 10);

			files[data.id].context.$scope.$apply();
			var chunk = data['chunk'] * 524288
			,	part = files[data.id].data.slice(chunk, chunk + Math.min(524288, (files[data.id].data.size - chunk)));

			files[data.id].context.controller.fileReaders[data.id].readAsBinaryString(part);
		});

		/**
		 * LISTENER - called when the upload is done
		 * update the linked item informations
		 * @param  {Object} data information
		 */
		socket.on('upload_done', function(data){
			var file = files[data.id];

			file.data.sizeAdded += parseInt(data['chunkSize'], 10);
			file.context.entity.size = file.data.sizeAdded;
			file.context.entity._id = data._id;
			file.context.entity.unselectable = false;
			file.context.entity.inupload = false;
			file.context.$scope.$apply();

			if(data.name)
				file.context.controller.updatePhoto(data.name);

			delete files[data.id];
		});

		/**
		 * LISTENER - called when the upload is stopped
		 * undo all action in order to cancel the download
		 * @param  {Object} data item informations
		 */
		socket.on('upload_stopped', function(data){
			console.error("upload stopped - " + data.error);
			if(files[data.id].context.entity.toString() == 'File') {
				files[data.id].context.entity.todelete = true
				files[data.id].context.entity.remove();
			}
			else
				files[data.id].context.entity.size -= files[data.id].data.sizeAdded;

			if(files[data.id].context.$scope.FileManager)
				files[data.id].context.$scope.FileManager.addError('File not uploaded', data.error);

			files[data.id].context.$scope.$apply();
		});

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	entity = context.entity || {}
			,	controller = context.controller || {};

			var prototype = {};

			/**
			 * add a new upload action
			 * @param {integer} id   upload id
			 * @param {Object} file File
			 */
			prototype.add = function(id, file) {
				files[id] = { data: file, context: { $local: $local, $scope: $scope, controller: controller, entity: entity } };
			}

			return prototype;
		};
	}]);angular.module('Tools').
	service('ClassService', function(){
		/**
		 * Prototypal inheritence
		 * @param  {Object} parent 
		 * @param  {Object} child  
		 */
		this.extend = 	function(parent, child){
			child.prototype = new parent();
			child.constructor = child;
		}
	});;angular.module('Tools').
    service('FormatSizeService', function() {
        this.format = function(input, ceil) {
            var out = "";
            var size = parseInt(input, 10);

            if(isNaN(size)) return "";

            var unit = ["B","KB","MB","GB","TB"];
            var i = 0;
            while (size >= 1024) {
                i++;
                size = size/1024;
            };

            if(size == 0)
                out = 0;
            else {
                out = size.toFixed(2);
                out.slice(-1) == "0" ? out = out.slice(0, -1) : out;
                out.slice(-1) == "0" ? out = out.slice(0, -2) : out;
                if(ceil)
                    out = Math.round(parseFloat(out, 10));
            };

            out += ' ' + unit[i];

            return out;
        };

    });;angular.module('Tools').
	service('HarlemService', function(){

		var prototype = {}
		,	actions = ['im_drunk','im_baked', '', 'im_trippin','im_blown', 'im_first'];


		prototype.doFirst = function() {
			angular.element('.first-harlem').addClass(actions[5]);
		};

		prototype.doFull = function() {
			var nodes = angular.element('.mw-harlem_shake_me');
			nodes.each(function() {
				angular.element(this).addClass(actions[Math.floor(Math.random()*5)]);
			})
		};
		
		prototype.stop = function() {
			var nodes = angular.element('.mw-harlem_shake_me');
			nodes.each(function() {
				for(var i in actions)
					angular.element(this).removeClass(actions[i]);
			})
		};

		return prototype;
	});angular.module('Tools').
	directive('ngRightClick', function($parse) {
		return function(scope, element, attrs) {
			var fn = $parse(attrs.ngRightClick);
			element.bind('contextmenu', function(event) {
				scope.$apply(function() {
					event.preventDefault();
					fn(scope, {$event:event});
				});
			});
		};
	});;angular.module('Tools').
	directive('boxalert', ['$timeout','$parse', function($timeout, $parse){
		return {
			scope: true,
			require: 'boxalert',
			restrict: 'A',
			template:
				'<article class="alert {{alert.type}}" ng-repeat="alert in _boxalert.alerts">'
			+	    '<h1>{{alert.title}}</h1>'
			+	    '<h5>{{alert.subtitle}}</h5>'
			+	    '<i class="icon-times" ng-click="_boxalert.close(alert.index);"></i>'
			+	'</article>',
			controller: function($scope) {
				var $local = $scope._boxalert = {}
				,	self = this;
				$local.alerts = {};

				/**
				 * close the selected alert
				 * @param  {integer} index index alert
				 */
				$local.close = function(index) {
					if(!$local.alerts[index])
						return false;

					$timeout.cancel($local.alerts[index].promise);
					delete $local.alerts[index];
				}

				$scope.toString = function() {
					return '_boxalert';
				}
			},
			link: function($scope, $node, attributes) {
				if(!attributes.boxalert)
					throw 'a model must be defined';

				var $local = $scope._boxalert
				,	i = 0
				,	older = 1
				,	length = 0
				,	timer = attributes.boxtimer || 3000;

				/**
				 * add a new alert to the array
				 * @param  {Object} alert Alert
				 */
				$parse(attributes.boxalert).assign($scope, function(alert) {
					var index = ++i;
					length++;


					if(length>3) {
						var nbCondamned = length - 3
						,	k = older;

						while(--nbCondamned>=0) {
							$timeout.cancel($local.alerts[k].promise);
							delete $local.alerts[k];
							k++;
							older = older < k ? k : older;
							length--;
						}

					}

					alert = _.extend(alert, { promise: null, index: index });

					$local.alerts[index] = alert;
					pop(index);
				})

				/**
				 * start the alert deletion
				 * @param  {integer} index alert index
				 */
				function pop(index) {
					$local.alerts[index].promise = $timeout(function() { 
						older = older < index+1 ? index+1 : older;
						delete $local.alerts[index];
						length--;
					}, timer);
				}

			}
		};
	}]);;angular.module('Tools').
    directive('ngAutoFocus', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                $node.focus();
            }
        };
    });;angular.module('Tools').
	directive('progressBar', ['$parse', function($parse){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value | numeraljs:"0.00 b"}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				$local.value = $scope.FileManager.selectedItems[0].size;

				var total = $scope.Preview.totalSize
				,	percent = Math.round($local.value)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#2c2c2c'
				,	barColor = attributes.bgColor || '#52d11a'
				,	color = attributes.color || '#474747';

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				/**
				 * update the total size
				 */
				$scope.$watch('Preview.totalSize', function() {
					total = $scope.Preview.totalSize;
				})

				/**
				 * update the current value of the progress bar
				 */
				$scope.$watch('FileManager.selectedItems', function() {
					$local.value = $scope.FileManager.selectedItems[0].size;
					percent = Math.round($local.value)*100 / Math.round(total);
					$node.find('.progress-bar-value').css({
						'width': percent+'%',
						'background-color': barColor
					});
				})


				$scope.toString = function() {
					return '_loadingBar';
				}
			}
		};
	}]);;angular.module('Tools').
	directive('progressBarPlan', ['$parse', function($parse){
		return {
			scope: true,
			restrict: 'E',
			replace: true,
			template: 	'<section class="progress-bar">'
					+	'<section class="value">{{_loadingBar.value}}</section>'
					+	'<section class="progress-bar-value"></section>'
					+	'</section>',
			link: function($scope, $node, attributes) {
				var $local = $scope._loadingBar = {};

				var dateStart = new Date($scope.Account.currentPlan.dateStart).getTime();
				var dateEnd = new Date($scope.Account.currentPlan.dateEnd).getTime();

				var total = dateEnd - dateStart
				,	remaining = dateEnd - new Date().getTime()
				,	percent = Math.round(remaining)*100 / Math.round(total)
				,	bgColor = attributes.bgColor || '#919191'
				,	barColor = attributes.bgColor || '#73c820'
				,	color = attributes.color || '#4B4B4B';

				var date = new Date(remaining);
				$local.value = '';
				if(date.getMonth() || date.getYear() - 70)
					$local.value += (date.getMonth() + (date.getYear() - 70) * 12) + 'M - ';
				if(date.getDate() - 1)
					$local.value += (date.getDate() - 1) + 'D - ';
				$local.value += new Date(remaining).getHours() + 'h'

				$node.css('background-color', bgColor);
				$node.find('.value').css('color', color);

				/**
				 * LISTENER - triggered when a plan is loaded
				 */
				$scope.$watch('Account.currentPlan', function() {
					if($scope.Account.currentPlan.id != 1) {
						var dateStart = new Date($scope.Account.currentPlan.dateStart).getTime();
						var dateEnd = new Date($scope.Account.currentPlan.dateEnd).getTime();
						total = dateEnd - dateStart;
						remaining = dateEnd - new Date().getTime();
						percent = Math.round(remaining)*100 / Math.round(total);

						var date = new Date(remaining);
						$local.value = '';
						if(date.getMonth() || date.getYear() - 70)
							$local.value += (date.getMonth() + (date.getYear() - 70) * 12) + 'M - ';
						if(date.getDate() - 1)
							$local.value += (date.getDate() - 1) + 'D - ';
						$local.value += new Date(remaining).getHours() + 'h'

						$node.find('.progress-bar-value').css({
							'width': percent+'%',
							'background-color': barColor
						});
					} else {
						$node.find('.progress-bar-value').css({
							'width': '100%',
							'background-color': barColor
						});
						$local.value = 'unlimited';
					}

				})

				$scope.toString = function() {
					return '_loadingBar';
				}
			}
		};
	}]);;angular.module('Tools').
	directive('scrollBar', function(){
		return {
			scope: true,
			restrict: 'A',
			link: function($scope, $node, attributes) {			
				$node.mCustomScrollbar({
					theme: attributes.theme || 'light',
					scrollEasing:"easeOutCirc",  
					mouseWheel:"auto",   
					autoDraggerLength:true,   
					advanced:{  
						updateOnBrowserResize:true,   
						updateOnContentResize:true   
					}
				});
			}
		};
	});;angular.module('Tools').
    directive('modal', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                /**
                 * close the current modal
                 */
                $local.close = function() {
                    $scope.Overlay.clickout();
                    if($scope.FileManager) {
                        $scope.FileManager.urlSharing = null;
                        $scope.FileManager.folderSharing = false;
                    }
                    if($scope.Register)
                        $scope.Register.showModal = false;
                }

                $scope.toString = function() {
                    return '_modal';
                }
            },
            require: 'modal',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._modal;

                $local.node = $node;
            }
        };
    }]);;angular.module('Tools').
	directive('formFileUpload', ['$compile', 'WebsocketFactory', 'UserFactory', 'UploaderFactory', function($compile, WebsocketFactory, UserFactory, UploaderFactory){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._formFileUpload = {}
				,	self = this;

				self.template = '';
				self.$input = null;
				self.$target = null;
				self.fileReaders = {};
				self.files = {};
				self.path;

				/**
				 * read image and add it as a background image
				 * @param  {Object} file File
				 */
				self.readImage = function(file) {
					var fileReaders = new FileReader();
					fileReaders.onload = function(event){
						self.$target.css({ "background-image":"url("+ event.target.result +")" });
						self.$target.addClass('form-file-preview');
					}
                    fileReaders.readAsDataURL(file);
				}

				/**
				 * update the user photo
				 * @param  {string} photo photo name
				 */
				self.updatePhoto = function(photo) {
					var user = UserFactory($scope).get();
					user.photo = photo;
					UserFactory($scope).set(user);

					var session = false;
					user = localStorage.getItem('user');
					if(!user) {
						user = sessionStorage.getItem('user');
						local = true
					}

					if(user) {
						user = JSON.parse(user);
						user.photo = photo;
						if(session)
                            sessionStorage.setItem('user', JSON.stringify(user));
                        else
                            localStorage.setItem('user', JSON.stringify(user));
					}

				}

				$scope.toString = function() {
					return '_formFileUpload';
				}
			},
			require: 'formFileUpload',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._formFileUpload
				,	formFileModel = attributes.formFileModel || ''
				, 	formFileName = attributes.formFileName || ''
				,	$parent = $node.parent()
				,	socket = WebsocketFactory();

				self.template = $compile('<input type="file" name="'+(formFileName ? formFileName : 'form-file-upload')+'" ng-model="'+ formFileModel +'" style="display:none;"/>')($scope);

				self.$input = angular.element(self.template).appendTo($parent);
				self.$target = angular.element(attributes.formFileUpload);

				$node.bind('click', function() {
					self.$input.click();
				});

				/**
				 * upload the loaded image
				 * @param  {Object} event Event
				 */
				self.$input.bind('change', function(event) {
					self.$target && self.readImage(event.target.files[0]);

					if(typeof attributes.formFileActiveUpload !== 'undefined') {

						var id = (Math.random() + '').replace('0.', '');
						self.files[id] = event.target.files[0];
						self.files[id].sizeAdded = 0;
						self.fileReaders[id] = new FileReader();

						var formFile = {
							id: id,
							name: self.files[id].name,
							size: self.files[id].size,
							type: self.files[id].type,
							token: UserFactory($scope).get().token,
							uploadPhoto: true
						};
						UploaderFactory($scope, {local: $local, controller: self, entity: formFile}).add(id, self.files[id]);

						self.fileReaders[id].onload = function(event){

							var data = event.target.result
							socket.emit('upload', { data: data, name: self.files[id].name, id: id });
						}

						socket.emit('upload_init', formFile);
					}
				});
			}
		};
	}]);;
angular.module('Tools').
    directive('shapeOver', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                var speed = 300
                ,   easing = mina.backout;

                var s = Snap( $node.find( 'svg' )[0] )
                ,   path = s.select( 'path' )
                ,   pathConfig = {
                        from : path.attr( 'd' ),
                        to : $node.data()['pathHover']
                    };


                $node.bind( 'mouseenter', function() {
                    path.animate( { 'path' : pathConfig.to }, speed, easing );
                } );

                $node.bind( 'mouseleave', function() {
                    path.animate( { 'path' : pathConfig.from }, speed, easing );
                } );
            }
        };
    });;angular.module('Tools').
    filter('numeraljs', function () {
        return function (input, format) {
            if (input == null || input == 0 || format == null)
                return input;
            if (format === '')
                return '';

            return numeral(input).format(format);
        };
    });;angular.module('Tools').
		filter('orMultiple',['$filter',function ($filter) {
		return function (items, keyObj) {
			var filterObj = {
				data:items,
				filteredData:[],
				applyFilter : function(obj,key){
					var fData = [];
					if(this.filteredData.length == 0)
						this.filteredData = this.data;
					if(obj){
						var fObj = {};
						if(!angular.isArray(obj)){
							fObj[key] = obj;
							fData = fData.concat($filter('filter')(this.filteredData,fObj));
						}else if(angular.isArray(obj)){
							if(obj.length > 0){	
								for(var i=0;i<obj.length;i++){
									if(angular.isDefined(obj[i])){
										fObj[key] = obj[i];
										fData = fData.concat($filter('filter')(this.filteredData,fObj));	
									}
								}
								
							}										
						}									
						if(fData.length > 0){
							this.filteredData = fData;
						}
					}
				}
			};

			if(keyObj){
				angular.forEach(keyObj,function(obj,key){
					filterObj.applyFilter(obj,key);
				});			
			}
			
			return filterObj.filteredData;
		}
	}]);;angular.module('Breadcrumb', []);;angular.module('Breadcrumb').
	controller('BreadcrumbController', ['$scope', 'ItemFactory', function($scope, ItemFactory){
		var $local = $scope.Breadcrumb = {};

		$local.path = ['/'];

		$scope.$watch('FileManager.currentPath', function() {
			$local.path = [];
			$local.path = $scope.FileManager.pathItems;
		})

		/**
		 * update breadcrumb and load the folder
		 * @param  {integer} index item index
		 */
		$local.load = function(index) {
			var item = $local.path[index].item;
			
			for(var i =$scope.FileManager.pathItems.length; i>index; i--)
				$scope.FileManager.pathItems.pop();

			$scope.FileManager.preview(false);
			ItemFactory($scope, {local: $scope.FileManager}).load(item);
		}

		$scope.toString = function() {
			return 'Breadcrumb';
		}
	}]);angular.module('Authentication', ['Config', 'Navigation', 'Overlay', 'ngRoute', 'Tools', 'Annyang']);;angular.module('Authentication').
	controller('AuthenticationController', ['$scope', 'UserFactory', 'apiUrl', function($scope, UserFactory, apiUrl) {
		var $local = $scope.Authentication = {};

		var user = localStorage.getItem('user');
		if(!user)
			user = sessionStorage.getItem('user');

		if(user)
			user = JSON.parse(user);
		else
			user = {};

		UserFactory($scope).set(user);

		$local.stylePhoto = {};

		if(user.photo && user.photo != 'null')
			$local.stylePhoto = {'background-image': 'url(' + apiUrl + 'download/1/userPhotos/' + user.photo + '?token=' + user.token + '&run)'};

		$local.user = user;
		$local.authenticated = false;

		$local.opened = false;

		$scope.$on('hide', function() {
			$local.opened = false;
		});

		/**
		 * open the user modal
		 */
		$local.open = function() {
			$local.opened = !$local.opened;
			$scope.Overlay.activated = true;
		};

		/**
		 * disconnect the current user
		 */
		$local.logout = function() {
			UserFactory($scope).logout();
		};

		$scope.toString = function() {
			return 'Authentication';
		};
	}]);angular.module('Authentication').
    controller('LoginController', ['$scope', '$location', 'apiUrl', 'UserFactory', function($scope, $location, apiUrl, UserFactory) {
        var $local = $scope.Login = {};

        $local.isFormSubmited = false;

        $local.formUrl = apiUrl + 'auth';

        $local.user = {};

        $local.rememberMe = true;

        $local.errorLogin = false;

        /**
         * authenticate the user 
         * @param  {Boolean} isValid form validity
         */
        $local.authenticate = function(isValid) {
            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            $local.isFormSubmited = true;
            if(isValid) {
                UserFactory($scope).login($local.user, $local.rememberMe, function(error) {
                    if(error)
                        $local.errorLogin = true;
                    else
                       $local.errorLogin = false;
                });
            }
        };

        $scope.toString = function() {
            return 'Login';
        };
    }]);;angular.module('Authentication').
    controller('RegisterController', ['$scope', '$location', 'CountryFactory', 'UserFactory', 'apiUrl', function($scope, $location, CountryFactory, UserFactory, apiUrl) {
        var $local = $scope.Register = {};

        $local.isFormSubmited = false;
        $local.errorPasswordMatch = false;

        $local.user = {countryCode: "0"};

        $local.urlRegister = apiUrl + 'users';

        $local.errorRegister = $location.$$url.indexOf('?error') > -1 ? true : false;

        $local.countries = CountryFactory($scope).list();

        /**
         * save the new user in database
         * @param  {Boolean} isValid form validity
         */
        $local.save = function(isValid) {
            $local.isFormSubmited = true;
            if(isValid) {
                if($local.user.password === $local.user.password2) {
                    $local.errorPasswordMatch = false;

                    angular.element('[name=countryCode]').val(CountryFactory($scope).getByName($local.user.country).code);

                    angular.element('#form-register').submit();
                } else
                    $local.errorPasswordMatch = true;
            }
        };

        $scope.toString = function() {
            return 'Registration';
        };
    }]);;angular.module('Authentication').
    factory('UserFactory', ['$window', '$http', 'apiUrl', function($window, $http, apiUrl){

        var _user = {};

        return function($scope) {

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {};

            /**
             * get the current setted user
             * @return {Object} User
             */
            prototype.get = function() {
                return _user;
            };

            /**
             * set the current User
             * @param {Object} user user
             */
            prototype.set = function(user) {
                angular.extend(_user, user);
            };

            /**
             * create a new User
             * @param  {Object}   user     User
             * @param  {Function} callback 
             */
            prototype.createUser = function(user, callback) {
                $http.post(apiUrl + 'users', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.id) {
                        callback.call(this, null);
                        //$window.location = $window.location.protocol + "//" + $window.location.host + "/home#/login";
                    }
                    else
                        callback.call(this, 'registration failed');
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'registration failed');
                    console.error(data);
                });
            };

            /**
             * update the user
             * @param  {Object}   user     User
             * @param  {Function} callback 
             */
            prototype.updateUser = function(user, callback) {
                var userLocal = prototype.get();
                $http.put(apiUrl + 'users/' + userLocal.id, user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.id) {
                        callback.call(this, null);
                    }
                    else
                        callback.call(this, 'update failed');
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'update failed');
                    console.error(data);
                });
            };

            /**
             * get all user from database
             * @param  {Function} callback 
             * @param  {Object}   options  filters
             */
            prototype.all = function(callback, options) {
                options = options || {};
                var limit = options.limit || 100
                ,   offset = options.offset || 0
                ,   filters = '';

                filters +=  !!options.role ? '&role=' + options.role : '';
                filters +=  !!options.email ? '&email=' + options.email : '';

                $http.get(apiUrl + 'users?offset=' + offset + '&limit=' + limit + filters).
                success(function(data) {
                    if(data.length>0) {
                        callback.call(this, '', data);
                    } else {    
                        callback.call(this, 'authentication failed');
                    }
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'get users failed');
                    console.error(data);
                });
            }

            /**
             * authenticate the user and save it in session/local storage
             * @param  {Object}   user       User
             * @param  {Boolean}   rememberMe 
             * @param  {Function} callback   
             */
            prototype.login = function(user, rememberMe, callback) {
                $http.post(apiUrl + 'auth', user).
                success(function(data, status, headers, config) {
                    if(data && data.user && data.user.token) {
                        prototype.set(data.user);
                        if(rememberMe)
                            localStorage.setItem('user', JSON.stringify(data.user));
                        else
                            sessionStorage.setItem('user', JSON.stringify(data.user));

                        callback.call(this, null);

                        $window.location = $window.location.protocol + "//" + $window.location.host + "/manager?token=" + data.user.token;
                    } else {
                        callback.call(this, 'authentication failed');
                    }
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            };

            /**
             * promote a user as an administrator
             * @param  {Object} user User
             */
            prototype.promote = function(user) {
                $http.put(apiUrl + 'users/'+ user.id + '/promote').
                success(function(data) {
                    console.log(data)
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            }

            /**
             * demote an administrator as a simple user
             * @param  {Object} user User
             */
            prototype.demote = function(user) {
                $http.put(apiUrl + 'users/'+ user.id + '/demote').
                success(function(data) {
                    console.log(data)
                }).
                error(function(data, status, headers, config) {
                    callback.call(this, 'authentication failed');
                    console.error(data);
                });
            }

            /**
             * disconnect the user and remove it from the local/session storage
             */
            prototype.logout = function() {
                var user = prototype.get();
                if(user.token) {
                    $http.get(apiUrl + 'logout').
                    success(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                    }).
                    error(function(data, status, headers, config) {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        $window.location.reload();
                        console.error(data);
                    });
                }
            };

            /**
             * get the user historic
             * @param  {Function} callback 
             */
            prototype.historic = function(callback) {
                var user = prototype.get();
                $http.get(apiUrl + 'users/'+user.id+'/historic').
                success(callback).
                error(function(data, status, headers, config) {
                    console.error(status, data);
                });
            }

            /**
             * get the used storage size
             * @param  {Function} callback 
             */
            prototype.getUsedSizeStorage = function(callback) {
                var user = prototype.get();
                if(user !== undefined && user.id) {
                    $http.get(apiUrl + 'browse/' + user.id + '/size').success(function(sizes) {
                        var size = 0;
                        if(sizes && sizes.length > 0)
                            for(var i = 0; i < sizes.length; i++)
                                size += parseInt(sizes[i].size, 10);
                        callback.call(this, (size>0 ? null : 'no sizes'), size);
                    }).error(function(error) {
                        callback.call(this, 'no sizes', null);
                        console.error(error);
                    });
                } else {
                    callback.call(this, 'no sizes', null);
                }
            }


            return prototype;
        };
    }]);;angular.module('Authentication').
    factory('AuthenticationFactory', ['$window', '$q', function($window, $q) {
        return {
            request: function(config) {

                config.url += config.url.indexOf('?') > -1 ? '&' : '?';

                config.url += "token=";

                var user = localStorage.getItem('user');
                if(!user)
                    user = sessionStorage.getItem('user');
                if(user)
                    config.url += JSON.parse(user).token || "";

                return config || $q.when(config);
            },
            responseError: function(response) {
                if (response.status === 401) {
                    //$window.location = $window.location.protocol + "//" + $window.location.host + "/authentication#/login";
                }
                return response || $q.when(response);
            }
        };
    }]);;angular.module('Authentication').
    directive('datePicker', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._datePicker = {}
                ,   self = this;

                $scope.toString = function() {
                    return '_datePicker';
                };
            },
            require: 'datePicker',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._datePicker;

                $node.datepicker({
                    dateFormat: 'dd/mm/yy',
                    minDate: null,
                    maxDate: new Date(),
                    changeMonth: true,
                    changeYear: true,
                    yearRange: "-70:+0",
                    prevText: '<i class="icon-chevron-left"></i>',
                    nextText: '<i class="icon-chevron-right"></i>'
                });
            }
        };
    }]);;angular.module('FileManager', ['Tools', 'Websocket', 'Authentication', 'ngClipboard', 'Annyang']);;angular.module('FileManager').
	provider('ItemProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			lastUpdate: null,
			size: '',
			owner: '',
			ownerId: '',
			shared: false,
			editMode: false,
			newItem: false,
			_id: -1
		};

		this.$get = ['UserFactory', function(UserFactory) {

			var Item = function(options) {

				this.options = {};
				_.extend(this.options, _default, options);
				this.name = this.options.name;
				this.path = this.options.path;
				this.category = this.options.category;
				this.icon = this.options.icon;
				this.scope = this.options.scope;
				this._node = null;
				this.node = this.options.node;
				this.lastUpdate = this.options.lastUpdate;
				this.lastUpdateName = this.options.lastUpdateName;
				this.size = this.options.size;
				this.creator = this.options.creator;
				this.creatorId = this.options.creatorId;
				this.ownerId = this.options.ownerId;
				this.downloads = this.options.downloads || 0;
				this.shared = typeof this.options.shared !== 'undefined' && this.options.shared === true;
				this.editMode = typeof this.options.editMode !== 'undefined' && this.options.editMode === true;
				this.newItem = typeof this.options.newItem !== 'undefined' && this.options.newItem === true;
				this._id = this.options._id || -1;
				this.unselectable = typeof this.options.unselectable !== 'undefined' && this.options.unselectable === true;
				this.special = typeof this.options.special !== 'undefined' && this.options.special === true;
				this.inupload = typeof this.options.inupload !== 'undefined' && this.options.inupload === true;

				options && this.init();
			};

			/**
			 * Must be overriden
			 * initialize the item
			 */
			Item.prototype.init = function() { throw 'init method must be overrided'; };


			/**
			 * Must be overriden
			 * download the current item
			 */
			Item.prototype.download = function() { throw 'download method must be overrided'; };


			/**
			 * Must be overriden
			 * get the path of the current item
			 */
			Item.prototype.getPath = function() { throw 'getPath method must be overrided'; };


			/**
			 * Must be overriden
			 * get the full path of the current item
			 */
			Item.prototype.getFullPath = function() { throw 'getFullPath method must be overrided'; };

			Object.defineProperties(Item.prototype, {
				'node' : {
					get : function() {
						return this._node;
					},
					set : function(node) {
						this._node = angular.element(node);
					}
				}
			});

			return Item;
		}];
	});angular.module('FileManager').
	provider('FolderProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null,
			unselectable: false
		};

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', 'AuthenticationFactory', function(Class, Item, $window, apiUrl, userFactory, AuthenticationFactory) {

			var Folder = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);

				this.unselectable = params.unselectable || false;
			};

			Class.extend(Item, Folder);

			/**
			 * OVERRIDEN
			 */
			Folder.prototype.init = function() {};
			
			/**
			 * OVERRIDEN
			 */
			Folder.prototype.download = function(dumpOnly) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();
				url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			/**
			 * OVERRIDEN
			 */
			Folder.prototype.getPath = function() {
				var path = this.path;
				// if(this._id == '. .') {
				// 	var paths = path.split('/');
				// 	path = '';
				// 	for(var i = 0; i < paths.length - 2; i++)
				// 		path += paths[i] + '/';
				// }
				// else
				if(this._id != '.' && this._id != '. .') {
					path += this.name + '/';
				}

				return path;
			}

			/**
			 * OVERRIDEN
			 */
			Folder.prototype.getFullPath = function() {
				return this.getPath();
			}

			Folder.prototype.toString = function() {
				return 'Folder';
			}

			return Folder
		}];
	});angular.module('FileManager').
	provider('FileProvider', function(){

		var _default = {
			name: 'unknow',
			path: '/',
			icon: '',
			category: '',
			scope: null,
			node: null
		};

		this.$get = ['ClassService', 'ItemProvider', '$window', 'apiUrl', 'UserFactory', 'AuthenticationFactory', function(Class, Item, $window, apiUrl, UserFactory, AuthenticationFactory) {

			var File = function(options) {
				var params = {};
				_.extend(params, _default, options);
				Item.call(this, params);
			};

			Class.extend(Item, File);

			File.prototype.init = function() {};

			/**
			 * OVERRIDEN
			 */
			File.prototype.download = function(dumpOnly, withoutToken) {
				var url = apiUrl + 'download/' + this.ownerId + this.getFullPath();

				if(!withoutToken)
					url = AuthenticationFactory.request({ url: url }).url;

				if(!dumpOnly)
					$window.location = url;

				return url;
			};

			/**
			 * OVERRIDEN
			 */
			File.prototype.remove = function() {
				this.node.remove();
			}

			/**
			 * OVERRIDEN
			 */
			File.prototype.getPath = function() {
				return this.path;
			}

			/**
			 * OVERRIDEN
			 */
			File.prototype.getFullPath = function() {
				return this.path + this.name;
			}

			File.prototype.toString = function() {
				return 'File';
			};

			return File
		}]
	});angular.module('FileManager').
	factory('FileExtensionFactory', function() {

		/**
		 * service mutualizing
		 * the context paramters are placed in the first calling
		 * in this way, we can use a distant scope from a local calling
		 *
		 * ex: fileExtension($scope, {local: $local, controller: self}).maMethode('parameters', {une config})
		 *
		 * @param  {$scope} scope   angular scope
		 * @param  {object} context [OPTIONAL] context specification - can contains refs to $local, $node and controller
		 */
		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			/**
			 * get the file extension
			 * @param  {string} filename 
			 */
			prototype.getExtension = function(filename) {
				var extension = (/(?:\.([^.]+))?$/).exec(filename)[1];
				extension = extension || '';
				return extension.toLowerCase();
			}

			/**
			 * detect the file type and return it
			 * @param  {Object} file 
			 */
			prototype.detection = function(file) {

				file.icon = "icon-file-css";

				if(file.type == "folder") {
					file.icon = "icon-folder";
					file.category = "folder";
				}
				else {

					var extension = prototype.getExtension(file.name);

					switch(extension) {
						// ARCHIVES
						case "zip": case "zipx": case "rar": case "7z": case "apk":
						case "cab": case "sfx": case "ar": case "tar": case "bz2":
						case "tgz": case "jar":
							file.icon = "icon-file-zip";
							file.category = "archive";
						break;
						// IMAGES
						case "jpg": case "jpeg": case "tif": case "bmp": case "gif":
						case "png": case "svg": case "ico":
							file.icon = "icon-image";
							file.category = "image";
						break;
						case "psd":
							file.icon = "icon-psd";
							file.category = "psd";
						break;
						case "ai":
							file.icon = "icon-ai";
							file.category = "ai";
						break;
						// AUDIO
						case "mp3":  case "wav": case "m3u": case "m4a": case "mid": case "mpa":
						case "wma": case "flac": case "aif": case "aifc": case "aiff":
						case "aac": case "swa": case "mid": case "cda":
							file.icon = "icon-music";
							file.category = "audio";
						break;
						// VIDEOS
						case "wmv": case "avi": case "mpg": case "mpeg": case "mov":
						case "3gp": case "dat": case "flv": case "m4v": case "mp4":
						case "ogg": case "mkv": case "vob": case "divx": case "xvid":
						case "webm":
							file.icon = "icon-film";
							file.category = "video";
						break;
						// CODE
						case "js": case "html": case "htm": case "xhtml": case "css":
						case "jsp": case "php": case "java": case "xml": case "c":
						case "cpp": case "h": case "hpp": case "cs": case "xaml":
						case "py": case "asm": case "asp": case "aspx": case "lua":
						case "pl": case "ps1": case "rb": case "vbs": case "lisp":
						case "vb":case "json":
							file.icon = "icon-file-xml";
							file.category = "text";
						break;
						// DISKS
						case "iso": case "dmg": case "img": case "cdi": case "c2d":
							file.icon = "icon-file";
							file.category = "disk image";
						break;
						// EXE
						case "exe": case "bat": case "sh":
							file.icon = "icon-cog2";
							file.category = "executable";
						break;
						// DOCS
						case "pdf":
							file.icon = "icon-file-pdf";
							file.category = "pdf";
						break;
						case "doc": case "docx": case "docm": case "dot": case "dotx":
						case "odt": case "ott":
							file.icon = "icon-file-word";
							file.category = "word";
						break;
						case "pps": case "ppt": case "pptx": case "odp": case "otp":
							file.icon = "icon-file-powerpoint";
							file.category = "presentation";
						break;
						case "xls": case "xlsx": case "csv": case "ods": case "ots":
							file.icon = "icon-file-excel";
							file.category = "calculation";
						break;
						case "txt":
							file.icon = "icon-file-text";
							file.category = "text";
						break;
						default:
							file.icon = "icon-file";
							file.category = "file";
						break;
					}


				}
			};

			return prototype;

		};
	});;angular.module('FileManager').
	factory('ItemFactory', ['FileProvider', 'FolderProvider', 'FileExtensionFactory', 'Restangular', 'UserFactory', 'AnnyangFormatService', function(File, Folder, ExtensionFactory, restangular, UserFactory, AnnyangFormatService){

		var _items = [];

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};

			/**
			 * load data item
			 * @param  {Object} item Item
			 */
			prototype.load = function(item) {

				var ownerId = item && typeof item == 'object' ? item.ownerId : false
				,	path = item && typeof item == 'object' ? item.getFullPath() : item ? item : '';
				if(item && typeof item == 'object' && item._id != '.') {
					if(item._id != '. .')
						$scope.FileManager.pathItems.push({
							name: item.name,
							item: item
						});
					else
						$scope.FileManager.pathItems.pop();
				}

				if(UserFactory($scope).get().id) {
					ownerId = ownerId || UserFactory($scope).get().id;


					$scope.FileManager.folderOwner = ownerId;

					var browse = restangular.one('browse').one(ownerId + '/');

					path = path || '';
					if(path.slice(-1) != '/')
						path += '/';

					if(path == '/' && (!item || (item._id != '. .' &&  item._id != '.')))
						$scope.FileManager.pathItems = new Array({
							name: 'Files',
							item: '/'
						});

					var browsePath = browse.one(path.substring(1));

					browsePath.getList().then(function(items) {
						$scope.FileManager.currentPath = path;

						_items.splice(0);
						$local.items.splice(0);
						_items = [];
						$local.items = [];

						addFileNavigation();

						var options;
						for(var i = 0; i<items.length; i++) {
							options = {
								_id : items[i]._id,
								name: items[i].name,
								path: items[i].path,
								type: items[i].type,
								ownerId: items[i].ownerId,
								creatorId: items[i].creatorId || items[i].ownerId,
	                			creator: items[i].creator,
								size: items[i]._id.substring(1) == '/Shared'? '' : items[i].size,
								lastUpdate: items[i].lastUpdate,
								lastUpdateName: items[i].lastUpdateName,
								shared: items[i].shared,
								downloads: items[i].downloads
							};

							if(options._id.substring(1) == '/Shared') {
								options.unselectable = true;
								options.special = true;
							}

							prototype.add(options);
						}

					}, function(error) { console.error(error); });
				}
			}

			/**
			 * get the id by its id
			 * @param  {integer} id 
			 */
			prototype.get = function(id) {
				return _items[id];
			}

			/**
			 * get all loaded items
			 */
			prototype.getAll = function() {
				return _items;
			}

			/**
			 * delete an item and re synchronize
			 * @param  {integer}   itemId   
			 * @param  {Function} callback 
			 */
			prototype.clean = function(itemId, callback) {
				for(var i=0; i<_items.length; i++)
					if(_items[i]._id == itemId) {
						_items.splice(i, 1);
						i--;
					}

				prototype.synchronize();
			}

			/**
			 * create a new folder in database
			 * @param  {Object} item folder informations
			 */
			prototype.createFolder = function(item) {

				var browse = restangular.one('browse').one($scope.FileManager.folderOwner + '/')
				,	path = $local.currentPath != '/' ? $local.currentPath.substring(1) : '';

				path = path.indexOf('Shared') != 0 ? path : path.slice(7);

				browse.post(path, { name: item.name }).then(function(data) {
					item.newItem = false;
					item._id = item.ownerId + item.path + item.name;

					if(!!data.information && data.information.indexOf('error') > -1) {
						prototype.clean(item._id);
					  	$local.addError('Folder not created', data.information);
					}
				}, function(error) {
					prototype.clean(item._id);
					console.error(error);
				});
			}

			/**
			 * delete the selected item
			 * @param  {Object} item Item
			 */
			prototype.delete = function(item) {
				var browse = restangular.one('browse').one(item.ownerId.toString()+item.getFullPath()).remove().then(function(data) {
					if(!!data.information && data.information.indexOf('error') > -1)
            			$local.addError('Item not deleted', data.information);
            		else
						prototype.clean(item._id);

				}, function(error) {

					console.error(error);
				});
			}

			/**
			 * copy & paste the selected item
			 * @param  {Object} source 
			 * @param  {Object} target 
			 */
			prototype.copy = function(source, target) {

				var copy = restangular.one('copy').one(source.ownerId.toString());

				copy.post(source.getFullPath().substring(1), { path: target.ownerId + target.path }).then(function(data) {
					if(data.information && data.information.indexOf('error') == -1) {
						var witness = false;
						for(var i=0; i<_items.length; i++)
							if(_items[i]._id == data.params.fullPath) {
								witness = true;
								break;
							}

						if(!witness) {
							options = {
								_id : data.params.fullPath,
								name: data.params.newName,
								path: target.path,
								type: target.options.type,
								ownerId: data.params.creatorId,
								creator: data.params.creator,
								size: target.options.size,
								lastUpdate: new Date(),
								lastUpdateName: data.params.creator,
								shared: false,
								downloads: 0
							};
							prototype.add(options);
						}
            			//$local.addInfo(target.options.type[0].toUpperCase() + target.options.type.slice(1) + ' pasted', 'The ' + target.options.type + ' ' + data.params.newName + ' has been pasted');
					} else
						$local.addError(target.options.type[0].toUpperCase() + target.options.type.slice(1) + ' not copied', data.information);

				}, function(error) { console.error(error); });
			}

			/**
			 * move an item into the selected target
			 * @param  {Object} source 
			 * @param  {Object} target 
			 */
			prototype.move = function(source, target) {

				var move = restangular.one('move').one(target.ownerId.toString());

				move.post(source.getFullPath().substring(1), { path: target.ownerId + target.getFullPath() }).then(function(data) {
					if(!data.information || data.information.indexOf('error') > -1)
						$local.addError('Item not moved', data.information);
					else
						prototype.clean(source._id);
				}, function(error) { console.error(error); });
			}

			/**
			 * rename an item
			 * @param  {string}   fullpath 
			 * @param  {string}   newName  
			 * @param  {Function} callback 
			 */
			prototype.rename = function(fullpath, newName, callback) {
				restangular.one('browse').one(fullpath).customPUT({name: newName}).then(function(data) {
					if(!data.information || data.information.indexOf('error') > -1)
						$local.addError('Item not renamed', data.information);
				}, function(error) { console.error(error); });
			}

			/**
			 * check if a name already exist
			 * @param  {string} name      
			 * @param  {boolean} vocalMode 
			 */
			prototype.checkNameExists = function(name, vocalMode) {
				vocalMode = typeof vocalMode !== 'undefined' && vocalMode === true;
				var exists = false;
				for(var i = 0; i < _items.length; i++) {
					var actualName = _items[i].name;

					if(vocalMode) {
						actualName = AnnyangFormatService.baseFormat(actualName);
						name = AnnyangFormatService.baseFormat(name);
					}

					if(actualName == name) {
						exists = true;
						break;
					}
				}

				return exists;
			}

			/**
			 * share publicly an item
			 * @param  {Object}   item     
			 * @param  {Function} callback 
			 */
			prototype.shareFile = function(item, callback) {
				var share = restangular.one('share');

				share.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.token)
						callback.call(this, null, result.token);
					else
						callback.call(this, 'sharing failed');
				}, function(error) {
					callback.call(this, 'sharing failed');
					console.error(error);
				});
			}

			/**
			 * unshare an item
			 * @param  {Object}   item     
			 * @param  {Function} callback 
			 */
			prototype.unshareFile = function(item, callback) {
				var unshare = restangular.one('unshare');

				unshare.one(item.ownerId + item.getFullPath()).get().then(function(result) {
					if(result && result.information)
						callback.call(this, null, result.information);
					else
						callback.call(this, 'unsharing failed');
				}, function(error) {
					callback.call(this, 'unsharing failed');
					console.error(error);
				});
			}

			/**
			 * synchronize the filemanager items array and the local item
			 */
			prototype.synchronize = function() {
				$local.items.splice(0);
				$local.items = [];

				for(var i =0; i<_items.length; i++) {
					$local.items.push(_items[i]);
				}
			}

			/**
			 * add a new item to the items array
			 * @param {Object}   options  
			 * @param {Function} callback 
			 */
			prototype.add = function(options, callback) {
				var item;
				ExtensionFactory($scope).detection(options);

				options.scope = $scope;
				switch(options.type) {
					case 'file':
						item = new File(options);
					break;
					case 'folder':
						item = new Folder(options);
					break;
					default:
						throw 'unknow item type';
					break;
				}
				_items.push(item);
				options.path = item.getPath();
				$local && $local.items.push(item);
				callback && callback.call(this);
				return item;
			}

			/**
			 * remove all items to delete
			 */
			prototype.cleanToDelete = function() {
				for(var i = _items.length -1; i>= 0; i--) {
					if(_items[i].todelete) {
						_items.splice(i, 1);
						$local && $local.items && $local.items.splice(i, 1);
					}
				}
			}

			/**
			 * add . and .. files
			 */
			function addFileNavigation() {
				var index = $scope.FileManager.pathItems.length-1
				,	path
				,	ownerId = $scope.FileManager.folderOwner;

				path = $scope.FileManager.pathItems[index] && typeof $scope.FileManager.pathItems[index].item != 'string' ?
					$scope.FileManager.pathItems[index].item.getFullPath() :
					$scope.FileManager.pathItems[index].item;
				prototype.add({
					_id: '.',
					name: ' . ',
					path:  path,
					type: 'folder',
					owner: '',
					ownerId: ownerId,
					size: '',
					unselectable: true,
					special: true
				});
				if($scope.FileManager.currentPath != '/' /*&& $scope.FileManager.currentPath != '/Shared/'*/) {
					path = $scope.FileManager.pathItems[index-1] && typeof $scope.FileManager.pathItems[index-1].item != 'string' ?
						$scope.FileManager.pathItems[index-1].item.getFullPath() :
						$scope.FileManager.pathItems[index-1].item;

					//if(path != '/Shared/')
						prototype.add({
							_id: '. .',
							name: '. .',
							path: path,
							type: 'folder',
							owner: '',
							ownerId: path == '/Shared/' ? UserFactory($scope).get().id : ownerId,
							size: '',
							unselectable: true,
							special: true
						});
				}
			}

			return prototype;
		};
	}]);;angular.module('FileManager').
    factory('SharingFactory', ['Restangular', function(restangular){

        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $node = context.node || {}
            ,   $local = context.local || {}
            ,   entity = context.entity || {}
            ,   controller = context.controller || {};

            var prototype = {};

            /**
             * get shared users
             * @param  {string}   path     
             * @param  {Function} callback 
             */
            prototype.getSharedUsers = function(path, callback) {
                restangular.one('users').one('shared').one(path).get().then(function(data) {
                    if(data && !data.information) {
                        var users = [];
                        for(var i = 0; i < data.length; i++)
                            users.push({
                                email: data[i].email,
                                right: data[i].right,
                                photo: data[i].photo,
                                firstname: data[i].firstname,
                                lastname: data[i].lastname
                            })
                        callback.call(this, null, users);
                    } else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, 'no users found', null)
                    console.error(error);
                });
            }

            /**
             * get shared user by mail
             * @param  {string}   email    
             * @param  {Function} callback 
             */
            prototype.getByEmail = function(email, callback) {
                restangular.one('users').one(email).get().then(function(data) {
                    if(data && data.id)
                        callback.call(this, null, data)
                    else
                        callback.call(this, data.information, false)
                }, function(error) {
                    callback.call(this, data.information, false)
                    console.error(error);
                });
            }

            /**
             * share something
             * @param  {string}   path     
             * @param  {string}   target   
             * @param  {string}   right    
             * @param  {Function} callback 
             */
            prototype.share = function(path, target, right, callback) {
                restangular.one('share').post(path, {'target': target, 'right': right}).then(function(data) {
                    if(data.information == 'folder shared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            /**
             * unshare something
             * @param  {string}   path     
             * @param  {string}   target   
             * @param  {Function} callback 
             */
            prototype.unshare = function(path, target, callback) {
                restangular.one('unshare').post(path, {'target': target}).then(function(data) {
                    if(data.information == 'folder unshared')
                        callback.call(this, null, data.params)
                    else
                        callback.call(this, data.information, null)
                }, function(error) {
                    callback.call(this, data.information, null)
                    console.error(error);
                });
            }

            return prototype;
        };
    }]);var toto;
angular.module('FileManager').
	controller('FileManagerController', ['$scope', '$window', '$location', 'FileProvider', 'FolderProvider', 'apiUrl', 'ItemFactory', 'UserFactory', 'SharingFactory', 'FileExtensionFactory', 'AnnyangService', 'AnnyangFormatService', 'WebsocketFactory', 'HarlemService', function($scope, $window, $location, File, Folder, apiUrl, ItemFactory, UserFactory, SharingFactory, ExtensionFactory, AnnyangService, AnnyangFormatService, WebsocketFactory, HarlemService) {
		var $local = $scope.FileManager = {};

        $local.draggedItem = null;

        $local.user = {};

        /**
         * LISTNER - update the local user when a new user is loaded
         */
        $scope.$watch(UserFactory($scope).get(), function() {
            $local.user = UserFactory($scope).get();
        })

        $local.currentPath = '/';
		$local.folderOwner = -1;
		$local.previewActivated = false;
		$local.previewItem = null;
        $local.pathItems = [];

        /**
         * OVERRIDE BY THE BOXALERT DIRECTIVE
         */
        $local.alert = function() { /*overriden by boxalert directive*/ }

        /**
         * call the alert method in order to create an info alert
         * @param {string} title    
         * @param {string} subtitle 
         */
        $local.addInfo = function(title, subtitle) {
            $local.alert({
                type: 'info',
                title: title,
                subtitle: subtitle
            });
        }

        /**
         * call the alert method in order to create an error alert
         * @param {string} title    
         * @param {string} subtitle 
         */
        $local.addError = function(title, subtitle) {
            $local.alert({
                type: 'error',
                title: title,
                subtitle: subtitle
            });
        }

        $local.itemsToCopy = [];

		$local.selectedItems = [];
		$local.items = [];

        $local.urlSharing = null;
        $local.folderSharing = false;

        if($location.$$absUrl.indexOf('/shared/') == -1) {
    		ItemFactory($scope, {local: $local}).load();
        }

        var socket = WebsocketFactory();

        /**
         * LISTENER - create an item when a new folder is created by someone in the current directory
         * @param  {Object} data folder information
         */
        socket.on('create_folder', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.path ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('Folder created', 'The folder ' + data.name + ' has been created');
            $scope.$apply();

            if(lastItem == data.path || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(parseInt(data.ownerId, 10) == parseInt($local.items[i].ownerId, 10) && $local.items[i].name == data.name) {
                        witness = true;
                        break;
                    }
                if(!witness)
                    ItemFactory($scope, {local: $local}).add({
                        _id: data.fullPath,
                        name: data.name,
                        owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                        ownerId: parseInt(data.ownerId,10),
                        creator: data.creatorName,
                        size : 0,
                        type: 'folder',
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); })
            }
        })

        /**
         * LISTENER - create an item when a new file is created by someone in the current directory
         * @param  {Object} data file information
         */
        socket.on('create_file', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.logicPath ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('File created', 'The file ' + data.name + ' has been created');
            $scope.$apply();

            if(lastItem == data.logicPath || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(parseInt(data.owner, 10) == parseInt($local.items[i].ownerId, 10) && $local.items[i].name == data.name) {
                        witness = true;
                        break;
                    }
                if(!witness)
                    ItemFactory($scope, {local: $local}).add({
                        _id: data.fullPath,
                        name: data.name,
                        owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                        ownerId: parseInt(data.owner,10),
                        creator: data.creatorName,
                        size : data.size,
                        type: 'file',
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); })
            }
        })

        /**
         * LISTENER - delete an item when someone delete it in the current directory
         * @param  {Object} data item information
         */
        socket.on('delete', function(data) {
            $local.addInfo('Item deleted', 'The item ' + data.fullPath.substring(data.fullPath.lastIndexOf('/') + 1) + ' has been deleted');
            ItemFactory($scope, {local: $local}).clean(data.fullPath);
            $scope.$apply();
        })

        /**
         * LISTENER - rename an item when someone rename it
         * @param  {Object} data item information
         */
        socket.on('rename', function(data) {
            $local.addInfo('Item renamed', 'The item ' + data.currentName + ' has been renamed');
            $scope.$apply();

            var items = ItemFactory($scope, {local: $local}).getAll();
            for(var i=0; i<items.length; i++)
                if(items[i]._id == data.fullPath) {
                    items[i]._id = items[i]._id.substring(0, items[i]._id.lastIndexOf('/') + 1) + data.newName;
                    items[i].name = data.newName;
                    ItemFactory($scope, {local: $local}).synchronize();
                    break;
                }

            $scope.$apply();
        })

        /**
         * LISTENER - create an alert when someont copy/paste an item 
         * remove the source and create the item into the new position
         * @param  {Object} data item information
         */
        socket.on('copy', function(data) {
            var lastItem = $local.pathItems[$local.pathItems.length-1].item
            ,   path = lastItem == data.targetPath ? '' : data.fullPath.slice(0, data.fullPath.lastIndexOf('/'))
            ,   witness = false;

            $local.addInfo('Item ' + (data.move ? 'moved' : 'copied'), 'The item ' + data.newName + ' has been ' + (data.move ? 'moved' : 'copied'));
            $scope.$apply();

            if(lastItem == data.targetPath || lastItem._id == path) {
                for(var i = 0; i<$local.items.length; i++)
                    if(data.fullPath == $local.items[i]._id) {
                        witness = true;
                        break;
                    }
                if(!witness)
                    ItemFactory($scope, {local: $local}).add({
                        _id: data.fullPath,
                        name: data.newName,
                        owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                        ownerId: parseInt(data.ownerId,10),
                        creator: data.creator,
                        size : data.size,
                        type: data.type,
                        path: path.substring(path.indexOf('/')) + '/',
                        lastUpdate: new Date(),
                        unselectable: false,
                        todelete: false,
                        inupload: false
                    }, function() { $scope.$apply(); })
            }
            if(data.move) {
                ItemFactory($scope, {local: $local}).clean(data.baseFullPath);
                $scope.$apply();
            }
        })

        /**
         * LISTENER - call all items and unselect them
         */
		$scope.$on('unselect_all', function() {
			$local.selectedItems = [];
			$scope.$broadcast('unselect');
		})

        /**
         * LISTENER - add the selected file to the selected item array
         * active the preview
         * @param  {Object} scope Angular scope
         * @param  {Object} file  file informations
         */
        $scope.$on('select_file', function(scope, file) {
            ExtensionFactory($scope).detection(file);
            $local.selectedItems.push(file);
            $local.previewActivated = true;
        })

        /**
         * LISTENER - hide the sharing modal when called
         */
        $scope.$on('hide', function() {
            $local.urlSharing = null;
            $local.folderSharing = false;
        });

        /**
         * create a new folder
         * @param  {string}   name     folder name
         * @param  {Function} callback 
         */
		$local.createFolder = function(name, callback) {
            var options = {
                owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
                ownerId: $local.folderOwner,
                creatorId: UserFactory($scope).get().id,
                size : 0,
                type: 'folder',
                path: $local.currentPath,
                newItem: true,
                lastUpdate: new Date(),
                creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname
            }

            if($local.currentPath == '/Shared/') {
                $local.addError('Folder not created', 'You can\'t create a folder into the Shared folder');
                return true;
            }

            options.name = name ? name : ''
            options.editMode = name ? false : true;

            if((name && !ItemFactory($scope, {local: $local}).checkNameExists(name, true)) || !name) {
                var item = ItemFactory($scope, {local: $local}).add(options, callback);

                if(name)
                    ItemFactory($scope, {local: $local}).createFolder(item);
            }
		};

        /**
         * delete an item from the current directory
         * @param  {string} name 
         */
		$local.delete = function(name) {
            var items = name ? [] : $local.selectedItems;

            if($local.currentPath == '/Shared/') {
                $local.addError('Folder not deleted', 'You can\'t delete a shared folder');
                return true;
            }

            if(name)
                for(var i = 0; i<$local.items.length; i++)
                    if(AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(name))
                        items.push($local.items[i]);

            for(var i = 0; i<items.length; i++)
                ItemFactory($scope, {local: $local}).delete(items[i]);

            $local.preview(false);

		}

        /**
         * rename an item
         */
        $local.rename = function() {

            if($local.currentPath == '/Shared/') {
                $local.addError('Item not renamed', 'You can\'t rename an item into the Shared folder');
                return true;
            }

            var canceled = false;
            for(var i = 0; i < $local.selectedItems.length; i++)
                if($local.selectedItems[i].editMode) {
                    $scope.$broadcast('cancel_edit');
                    canceled = true;
                    break;
                }

            !canceled && $scope.$broadcast('rename_item');
        }

        /**
         * download an item
         */
		$local.download = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File')
                $local.selectedItems[0].download();
            else if($local.selectedItems.length > 0)
                $scope.$broadcast('start_post_download');
        };

        /**
         * refresh the current directory
         */
        $local.refresh = function() {
            ItemFactory($scope, {local: $local}).load( $local.pathItems.length>1 ? $local.pathItems.pop().item : null );
            $local.preview(false);
        };

        /**
         * copy the selected items
         */
        $local.copy = function() {
            if($local.selectedItems.length >= 1) {
                $local.itemsToCopy.slice(0);
                $local.itemsToCopy = [];
                $local.itemsToCopy = $local.selectedItems;
                if($local.selectedItems.length == 1)
                    $local.addInfo($local.itemsToCopy[0].options.type[0].toUpperCase() + $local.itemsToCopy[0].options.type.slice(1) + ' copied', 'The ' + $local.itemsToCopy[0].options.type + ' ' + $local.itemsToCopy[0].name + ' has been copied');
                else
                    $local.addInfo('Items copied', 'Some items have been copied');
            }
        };

        /**
         * paste the copied item
         */
        $local.paste = function() {

            if($local.currentPath == '/Shared/') {
                $local.addError('Items not copied', 'You can\'t paste items into the Shared folder');
                return true;
            }

            var lastItem = $local.pathItems[$local.pathItems.length-1].item;

            if($local.itemsToCopy.length >= 1) {
                for(var i = 0; i < $local.itemsToCopy.length; i++) {
                    var newItem = null;
                    if($local.itemsToCopy[i].toString() == 'Folder')
                        newItem = new Folder($local.itemsToCopy[i].options);
                    else
                        newItem = new File($local.itemsToCopy[i].options);

                    if(lastItem != "/") {
                        newItem.path = lastItem._id.substring(lastItem._id.indexOf('/')) + '/';
                        newItem.ownerId = lastItem.ownerId;
                    }
                    else {
                        newItem.path = lastItem;
                        newItem.ownerId = UserFactory($scope).get().id;
                    }

                    ItemFactory($scope, {local: $local}).copy($local.itemsToCopy[i], newItem);
                }
                $local.itemsToCopy.slice(0);
                $local.itemsToCopy = [];
            }
        };

        /**
         * active the preview item
         * @param  {Boolean} force force the preview activation
         */
        $local.preview = function(force) {
            $local.previewActivated = typeof force !== 'undefined' ? force : $local.selectedItems.length == 1;

            if($local.previewActivated && $local.selectedItems && $local.selectedItems[0] && $local.selectedItems[0].category == 'folder') {
                SharingFactory($scope, {local: $local}).getSharedUsers($local.selectedItems[0]._id + '/', function(error, data) {
                    if(!error && data) {
                        $local.selectedItems[0].usersWebserviceSharing = [];
                        $local.selectedItems[0].usersActualSharing = [];
                        _.merge($local.selectedItems[0].usersWebserviceSharing, data);

                        for(var i = 0; i < $local.selectedItems[0].usersWebserviceSharing.length; i++)
                            if($local.selectedItems[0].usersWebserviceSharing[i].photo && $local.selectedItems[0].usersWebserviceSharing[i].photo != 'null')
                                $local.selectedItems[0].usersWebserviceSharing[i].photo = apiUrl + 'download/1/userPhotos/' + $local.selectedItems[0].usersWebserviceSharing[i].photo + '?token=' + UserFactory($scope).get().token + '&run';
                            else
                                $local.selectedItems[0].usersWebserviceSharing[i].photo = '';

                        _.merge($local.selectedItems[0].usersActualSharing, $local.selectedItems[0].usersWebserviceSharing);
                    } else {
                        $local.selectedItems[0].usersWebserviceSharing = [];
                        $local.selectedItems[0].usersActualSharing = [];
                    }
                    $local.selectedItems[0].usersToRemove = [];
                });
            }
        }

        /**
         * delete an item from the items array
         * @param  {integer} itemId item id
         */
        $local.deleteItem = function(itemId) {
            $local.items.splice(itemId, 1);
        }

        /**
         * disable the preview
         */
        $local.cancelPreview = function() {
            $local.previewActivated = false;
        }

        /**
         * share an item
         * case file: create a public link
         * case folder: share to the selected users the selected folder
         */
        $local.shareItem = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).shareFile($local.selectedItems[0], function(error, token) {
                    if(!error && token) {
                        $local.urlSharing = $window.location.protocol + '//' + $window.location.host + '/shared/' + token;
                        $local.selectedItems[0].shared = true;
                        $scope.$emit('enable_overlay');
                    } else
                        console.error(error);
                });
            } else if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'Folder') {
                $scope.$broadcast('enable_overlay_sharing');
                $local.folderSharing = true;
                $scope.$emit('enable_overlay');
            }
        }

        /**
         * unshare a public file
         */
        $local.unshareFile = function() {
            if($local.selectedItems.length == 1 && $local.selectedItems[0].toString() == 'File') {
                ItemFactory($scope, {local: $local}).unshareFile($local.selectedItems[0], function(error, information) {
                    if(!error && information) {
                        $local.selectedItems[0].shared = false;
                        $local.addInfo('File unshared', 'The file ' + $local.selectedItems[0].name + ' has been unshared');
                    } else {
                        console.error(error);
                        $local.addError('File unshared', 'The file has not been unshared');
                    }
                });
            }
        }

        /**
         * VOCAL - rename callback
         * @param  {string} oldName 
         * @param  {string} newName 
         * @param  {Boolean} like
         */
        $local.renameVocal = function(oldName, newName, like) {
            if(!ItemFactory($scope, {local: $local}).checkNameExists(newName, true)) {
                var item = null
                for(var i = 0; i < $local.items.length; i++)
                    if((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(oldName)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)).indexOf(AnnyangFormatService.baseFormat(oldName)) > -1)) {
                        item = $local.items[i];
                        break;
                    }

                if(item) {
                    var extension = (/(?:\.([^.]+))?$/).exec(item.name)[1];
                    extension = extension || '';
                    ItemFactory($scope, {local: $local}).rename(item.ownerId.toString() + item.getFullPath(), newName + '.' + extension);
                    item.name = newName + '.' + extension;
                }
            }
        }

        /**
         * VOCAL - download callback
         * @param  {string} name 
         * @param  {Boolean} like 
         */
        $local.downloadVocal = function(name, like) {
            var found = false;
            for(var i = 0; i < $local.items.length; i++)
                if((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)) == AnnyangFormatService.baseFormat(name)) || (like && name != '' && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.items[i].name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)) {
                    $local.selectedItems.push($local.items[i]);
                    found = true;
                }

            $scope.$apply();
            $local.download();

            if(found) {
                $local.selectedItems = [];
                $scope.$apply();
            }
        }

        /**
         * VOCAL - set the open folder like method
         * @param  {string} name 
         */
        AnnyangService.set('open_folder_like', function(name) {
            $scope.$broadcast('open_folder', name, true);
        });

        /**
         * VOCAL - set the open folder method 
         * @param  {string} name 
         */
        AnnyangService.set('open_folder', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        /**
         * VOCAL - set an alternative open folder method
         * @param  {string} name 
         */
        AnnyangService.set('open_folder_alternative', function(name) {
            $scope.$broadcast('open_folder', name);
        });

        /**
         * VOCAL - set the open parent folder method
         */
        AnnyangService.set('open_parent_folder', function() {
            $scope.$broadcast('open_parent_folder');
        });

        /**
         * VOCAL - set an alternative of the open parent folder method
         */
        AnnyangService.set('open_parent_folder_alternative', function() {
            $scope.$broadcast('open_parent_folder');
        });

        /**
         * VOCAL - set the download file like method
         * @param  {string} name 
         */
        AnnyangService.set('download_file_like', function(name) {
            $local.downloadVocal(name, true, true);
        });

        /**
         * VOCAL - set the download file method
         * @param  {string} name 
         */
        AnnyangService.set('download_file', function(name) {
            $local.downloadVocal(name, true);
        });

        /**
         * VOCAL - set the preview item like method
         * @param  {string} name 
         */
        AnnyangService.set('preview_item_like', function(name) {
            $scope.$broadcast('preview_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the preview item method
         * @param  {string} name 
         */
        AnnyangService.set('preview_item', function(name) {
            $scope.$broadcast('preview_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select file like method
         * @param  {string} name 
         */
        AnnyangService.set('select_file_like', function(name) {
             $scope.$broadcast('select_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select all method
         * @param  {string} name 
         */
        AnnyangService.set('select_all', function(name) {
             $scope.$broadcast('select', function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the select file method
         * @param  {string} name 
         */
        AnnyangService.set('select_file', function(name) {
             $scope.$broadcast('select_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect file like method
         * @param  {string} name 
         */
        AnnyangService.set('unselect_file_like', function(name) {
             $scope.$broadcast('unselect_item', name, true, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect all method
         */
        AnnyangService.set('unselect_all', function() {
            $scope.$broadcast('unselect', function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the unselect file method
         * @param  {string} name 
         */
        AnnyangService.set('unselect_file', function(name) {
             $scope.$broadcast('unselect_item', name, false, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the create folder method
         * @param  {string} name 
         */
        AnnyangService.set('create_folder', function(name) {
            $local.createFolder(name, function() { $scope.$apply(); });
        });

        /**
         * VOCAL - set the delete item method
         * @param  {string} name 
         */
        AnnyangService.set('delete_item', function(name) {
            $local.delete(name);
        });

        /**
         * VOCAL - set the rename item like mthod
         * @param  {string} oldName 
         * @param  {string} newName 
         */
        AnnyangService.set('rename_item_like', function(oldName, newName) {
            $local.renameVocal(oldName, newName, true);
        });

        /**
         * VOCAL - set the rename method
         * @param  {string} oldName 
         * @param  {string} newName 
         */
        AnnyangService.set('rename_item', function(oldName, newName) {
            $local.renameVocal(oldName, newName);
        });

        /**
         * VOCAL - set the copy method
         * @param  {string} oldName 
         * @param  {string} newName 
         */
        AnnyangService.set('copy', function(oldName, newName) {
            $local.copy();
            $local.selectedItems = [];
            $scope.$apply();
        });

        /**
         * VOCAL - set the paste method
         * @param  {string} oldName 
         * @param  {string} newName 
         */
        AnnyangService.set('paste', function(oldName, newName) {
            $local.paste();
        });

        /**
         * VOCAL - set the refresh method
         * @param  {string} name 
         */
        AnnyangService.set('refresh', function(name) {
            $local.refresh();
        });

        /**
         * VOCAL - set the harlem shake full method
         * @param  {string} name 
         */
        AnnyangService.set('harlem_shake_full', function(name) {
            HarlemService.doFull();
            setTimeout(function(){
                HarlemService.stop();
            }, 15000);
        });

        /**
         * VOCAL - set an alternative of the harlem shake full method
         * @param  {string} name 
         */
        AnnyangService.set('harlem_shake_full_alternative', function(name) {
            HarlemService.doFull();
            setTimeout(function(){
                HarlemService.stop();
            }, 15000);
        });

        /**
         * VOCAL - set the harlem shake first method
         * @param  {string} name 
         */
        AnnyangService.set('harlem_shake_first', function(name) {
            HarlemService.doFirst();
        });

        /**
         * VOCAL - sert an alternative of the harlem shake first method
         * @param  {string} name 
         */
        AnnyangService.set('harlem_shake_first_alternative', function(name) {
            HarlemService.doFirst();
        });

		$scope.toString = function() {
			return 'FileManager';
		};
	}]);angular.module('FileManager').
    controller('PreviewController', ['$scope', '$location', 'apiUrl', 'AuthenticationFactory', 'UserFactory', 'Restangular', '$http', '$sce', function($scope, $location, apiUrl, AuthenticationFactory, UserFactory, restangular, $http, $sce) {
        var $local = $scope.Preview = {};
        $local.totalSize = 0;

        $local.resourceContent = '';

        if($location.$$absUrl.indexOf('/shared/') == -1) {
            UserFactory($scope).getUsedSizeStorage(function(error, data) {
                $local.totalSize = data;
            });
        }

        /**
         * LISTENER - get information of the selected item in order to display them in the preview view
         */
        $scope.$watch('FileManager.selectedItems', function() {
            if($scope.FileManager.selectedItems.length > 0 && $scope.FileManager.selectedItems[0].category == 'text') {
                $local.resourceContent = '';
                $local.getResourceContent();
            }
        });

        /**
         * generate the resource url
         * @return {string} url
         */
        $local.getResourceUrl = function() {

            var url = "";

            if($scope.FileManager.selectedItems && $scope.FileManager.selectedItems[0] && $scope.FileManager.previewActivated) {
                if($scope.FileManager.selectedItems[0].token) {
                    url = apiUrl + 'download/shared/' + $scope.FileManager.selectedItems[0].token + '?run';
                }
                else {
                    url = $scope.FileManager.selectedItems[0].category != 'text' ? $scope.FileManager.selectedItems[0].download(true) + '&run' : $scope.FileManager.selectedItems[0].download(true, true) + '?run';
                }

                if($scope.FileManager.selectedItems[0].category == 'pdf')
                    url += "&nostream";
            }

            return url;
        };

        /**
         * get the informations item thanks to the resource url
         */
        $local.getResourceContent = function() {
            var url = $local.getResourceUrl();
            if(url && url.length > 0)
                $http.get(url, {headers: {'Content-Type': undefined}}).success(function(content) {
                    $local.resourceContent = content;
                });
        };

        $scope.toString = function() {
            return 'Preview';
        };
    }]);;angular.module('FileManager').
    controller('SharingController', ['$scope', 'apiUrl', 'UserFactory', 'SharingFactory', function($scope, apiUrl, UserFactory, SharingFactory) {
        var $local = $scope.Sharing = {};

        $local.email = "";
        $local.shared = false;

        /**
         * LISTENER - hide the sharing modal
         */
        $scope.$on('hide', function() {
            if(!$local.shared && $scope.FileManager.selectedItems[0]) {
                $scope.FileManager.selectedItems[0].usersToRemove = [];
                $scope.FileManager.selectedItems[0].usersActualSharing = [];
                _.merge($scope.FileManager.selectedItems[0].usersActualSharing, $scope.FileManager.selectedItems[0].usersWebserviceSharing);
            }
        });

        /**
         * add a user to the sharing list
         * @param {Object} event Event
         */
        $local.addUser = function(event) {
            if((!event || event.keyCode == 13) && ($local.email !== undefined && $local.email !== '')) {
                var present = false;
                for(var i = 0; i < $scope.FileManager.selectedItems[0].usersActualSharing.length; i++)
                    if($scope.FileManager.selectedItems[0].usersActualSharing[i].email == $local.email)
                        present = true;

                if(!present)
                    SharingFactory($scope, {local: $local}).getByEmail($local.email, function(error, user) {
                        if(!error && user) {
                            var userData = {
                                email: $local.email,
                                right: 'R'
                            };
                            if(user.photo && user.photo != 'null')
                                userData.photo = apiUrl + 'download/1/userPhotos/' + user.photo + '?token=' + UserFactory($scope).get().token + '&run';
                            $scope.FileManager.selectedItems[0].usersActualSharing.push(userData);
                        }

                        $local.email = "";
                    });
                else
                    $local.email = "";
            }
        }

        /**
         * update the sharing of the selected item
         */
        $local.share = function() {
            if($scope.FileManager.selectedItems[0]) {
                var path = $scope.FileManager.selectedItems[0]._id + '/'
                ,   length = $scope.FileManager.selectedItems[0].usersToRemove.length;

                var callback = function() {
                    for(var i = 0; i < $scope.FileManager.selectedItems[0].usersActualSharing.length; i++) {
                        var updateOrCreate = true;
                        for(var j = 0; j < $scope.FileManager.selectedItems[0].usersWebserviceSharing.length; j++) {
                            if($scope.FileManager.selectedItems[0].usersActualSharing[i].email == $scope.FileManager.selectedItems[0].usersWebserviceSharing[j].email && $scope.FileManager.selectedItems[0].usersActualSharing[i].right == $scope.FileManager.selectedItems[0].usersWebserviceSharing[j].right)
                                updateOrCreate = false;
                        }

                        if(updateOrCreate)
                            SharingFactory($scope, {local: $local}).share(path, $scope.FileManager.selectedItems[0].usersActualSharing[i].email, $scope.FileManager.selectedItems[0].usersActualSharing[i].right, function(error, data) {
                                if(error && !data) {
                                    console.error(error);
                                    $scope.FileManager.addError('Folder not shared', error);
                                }
                                else
                                    $scope.FileManager.addInfo('Folder shared', 'Folder shared with ' + data.targetEmail);
                            })
                    }
                    $scope.FileManager.selectedItems[0].usersToRemove = [];
                    $scope.FileManager.selectedItems[0].usersWebserviceSharing = [];
                    _.merge($scope.FileManager.selectedItems[0].usersWebserviceSharing, $scope.FileManager.selectedItems[0].usersActualSharing);
                    $local.shared = true;
                }

                if(length>0)
                    for(var i = 0 ; i < $scope.FileManager.selectedItems[0].usersToRemove.length; i++) {
                        var userToRevove = $scope.FileManager.selectedItems[0].usersToRemove[i];
                        SharingFactory($scope, {local: $local}).unshare(path, userToRevove.email, function(error, data) {
                            if(error && !data) {
                                console.error(error);
                                $scope.FileManager.addError('Folder not unshared', error);
                            }
                            else
                                $scope.FileManager.addInfo('Folder unshared', 'Folder unshared with ' + data.targetEmail);

                            var index = $scope.FileManager.selectedItems[0].usersWebserviceSharing.indexOf(userToRevove);
                            if(index > -1)
                                $scope.FileManager.selectedItems[0].usersWebserviceSharing.slice(index, 1);
                            --length <= 0 && callback();
                        })
                    }
                else
                    callback();

            }
        }

        /**
         * remove a user from the current sharing item
         * @param  {Object} user User
         */
        $local.remove = function(user) {
            $scope.FileManager.selectedItems[0].usersToRemove.push(user);
            var index = $scope.FileManager.selectedItems[0].usersActualSharing.indexOf(user);
            if(index > -1)
                $scope.FileManager.selectedItems[0].usersActualSharing.splice(index, 1);
        }

        $scope.toString = function() {
            return 'Sharing';
        };
    }]);;angular.module('FileManager').
	directive('fileUploader', ['WebsocketFactory', 'UserFactory', 'ItemFactory', 'UploaderFactory', function(WebsocketFactory, UserFactory, ItemFactory, UploaderFactory){
		return {
			scope: true,
			require: 'fileUploader',
			restrict: 'A',
			controller: function($scope) {
				var $local = $scope._fileUploader = {}
				,	self = this;

				$local.progress = '';

				self.fileReaders = {};
				self.files = {};
				self.path;

				/**
				 * no operation function
				 * similar to angular.noop
				 * @param  {Object} event Event
				 */
				self.noop = function(event) {
					event.preventDefault();
					event.stopPropagation();
				}

				$scope.toString = function() {
					return '_fileUploader';
				}
			},
			link: function($scope, $node, attributes, self) {
				var $local = $scope._fileUploader
				,	socket = WebsocketFactory();

				self.path = attributes.filePath;

				$node.on('dragenter', self.noop);
				$node.on('dragleave', self.noop);
				$node.on('dragover', self.noop);

				/**
				 * LISTENER - store the dragged item in order to use it later
				 * @param  {Object} event
				 */
				$node.on('dragstart', function(event) {
					$scope.FileManager.draggedItem = null;
					if($scope._item.item._id != '.' && $scope._item.item._id != '. .')// && $scope._item.item._id.substring(1) != '/Shared')
						$scope.FileManager.draggedItem = $scope._item.item;
				});

				/**
				 * LISTENER - start the upload or move of the dragged item
				 * @param  {Object} event
				 */
				$node.on('drop', function(event){
					event.originalEvent.preventDefault();

					var source = $scope.FileManager.draggedItem
					,	target = $scope._item.item;
					if($scope._item.item._id.substring($scope._item.item._id.indexOf('/')) == '/Shared') {
						$scope.FileManager.addError('Item not moved', 'You can\'t move an item into the Shared folder');
						$scope.$apply();
						return true;
					}
					if($scope.FileManager.currentPath.substring(1) == 'Shared/') {
						$scope.FileManager.addError('File not uploaded', 'You can\'t upload a file into the Shared folder');
						$scope.$apply();
						return true;
					}

					if(target
					&& source
					&& target.getFullPath() != source.getFullPath()
					&& target.toString('Folder')
					&& target._id != '.') {
						$scope.FileManager.selectedItems = [];
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).move(source, target);
						if(target._id != '. .')
							target.size += parseInt(source.size, 10);
					}

					if(event.originalEvent.dataTransfer.files.length <= 0)
						return true;

					for(var i = 0; i<event.originalEvent.dataTransfer.files.length; i++) {
						var file = event.originalEvent.dataTransfer.files[i]
						init(file);
					}

				});

				/**
				 * init a new upload
				 * @param  {Object} file
				 */
				function init(file) {
					var id = Math.random().toString().replace('0.', '');

					self.fileReaders[id] = new FileReader();
					self.files[id] = file;
					self.files[id].sizeAdded = 0;

					var ownerId = $scope._item.item.toString() == 'Folder' ? $scope._item.item.ownerId : $scope.FileManager.folderOwner;
					var newItem = self.path == $scope.FileManager.currentPath ? ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: ownerId,
                		creatorId: UserFactory($scope).get().id,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						size : 0,
						type: 'file',
						path: self.path,
						lastUpdate: new Date(),
						unselectable: true,
						todelete: false,
						inupload: true
					}, function() { $scope.$apply(); }) : $scope._item.item;

					ItemFactory($scope, {local: $scope.FileManager}).cleanToDelete();

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){
						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name, id: id });
					}

					socket.emit('upload_init', {
						id: id,
						owner: ownerId,
						name : self.files[id].name,
						size : self.files[id].size,
						type: self.files[id].type,
						path: self.path,
						token: UserFactory($scope).get().token
					});
				}
			}
		};
	}]);;angular.module('FileManager').
	directive('item', ['ItemFactory', 'AnnyangFormatService', function(ItemFactory, AnnyangFormatService){
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._item = {}
				,	self = this;

				$local.item = {};
				$local.oldName = "";
				$local.selected = false;

				/**
				 * LISTENER - unselect the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {Function} callback 
				 */
				$scope.$on('unselect', function(scope, callback) {
					$local.selected = false;
					callback && callback.call(this);
				})

				/**
				 * LISTENER - VOCAL - start the preview item 
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {Boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('preview_item', function(scope, name, like, callback) {
					if(name && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.preview({ctrlKey : false});

					callback && callback.call(this);
				})

				/**
				 * LISTENER - rename the current item
				 */
				$scope.$on('rename_item', function() {
					$local.rename();
				})

				/**
				 * LISTENER - select the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {Function} callback 
				 */
				$scope.$on('select', function(scope, callback) {
					$local.select({ctrlKey : true});
					callback && callback.call(this);
				})

				/**
				 * LISTENER - VOCAL - select the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {Boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('select_item', function(scope, name, like, callback) {
					if(name && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.select({ctrlKey : true});

					callback && callback.call(this);
				})

				/**
				 * LISTENER - unselect the current item
				 * @param  {Object}   scope    Angular scope
				 * @param  {string}   name     
				 * @param  {boolean}   like     
				 * @param  {Function} callback 
				 */
				$scope.$on('unselect_item', function(scope, name, like, callback) {
					if(name && $local.selected && ((!like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.removeExtension(AnnyangFormatService.baseFormat($local.item.name)).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.select({ctrlKey : true});

					callback && callback.call(this);
				})

				/**
				 * LISTENER - cancel the edit mode
				 */
				$scope.$on('cancel_edit', function() {
					$local.cancelEdit();
				})

				/**
				 * LISTENER - open the selected folder
				 * @param  {Object} scope Angular scope
				 * @param  {string} name  
				 * @param  {boolean} like  
				 */
				$scope.$on('open_folder', function(scope, name, like) {
					if(name && ((!like && AnnyangFormatService.baseFormat($local.item.name) == AnnyangFormatService.baseFormat(name)) || (like && AnnyangFormatService.baseFormat($local.item.name).indexOf(AnnyangFormatService.baseFormat(name)) > -1)))
						$local.open();
				});

				/**
				 * LISTENER - open the selected parent folder
				 * @param  {Object} scope Angular scope
				 * @param  {string} name  
				 * @param  {boolean} like  
				 */
				$scope.$on('open_parent_folder', function() {
					if($local.item._id == '. .')
						$local.open();
				});

				/**
				 * open the current item
				 */
				$local.open = function() {
					if($local.item.category != 'folder')
						$local.download()
					else {
						$scope.FileManager.preview(false);
						ItemFactory($scope, {local: $scope.FileManager}).load($local.item);
						// ItemFactory($scope, {local: $scope.FileManager}).load($local.item.getFullPath(), $local.item.ownerId);
					}
				};

				/**
				 * rename the current item
				 */
				$local.rename = function() {
					if($local.selected) {
						$scope.FileManager.cancelPreview();
						$local.item.editMode = true;
						$local.oldName = $local.item.name;
					}
				};

				/**
				 * cancel the edit mode
				 */
				$local.cancelEdit = function() {
					$local.item.editMode = false;
					$local.item.name = $local.oldName;

					if($local.item.newItem)
						ItemFactory($scope, {local: $scope.FileManager}).clean(-1);
				};

				/**
				 * check the name validity before update or create folder
				 * @param  {Object} event Event
				 */
				$local.validEdit = function(event) {
					var keyCode = event ? event.keyCode : -1;
					if(keyCode == 13 || keyCode == -1) {
						$local.item.editMode = false;
						var newName = $local.item.name;
						$local.item.name = $local.oldName;
						var fullpath = $local.item.ownerId.toString() + $local.item.getFullPath();
						if(newName != '' && newName.indexOf('/') == -1 && newName.indexOf('\\') == -1) {

							if(!ItemFactory($scope, {local: $scope.FileManager}).checkNameExists(newName)) {
								$local.item.name = newName;
								if(!$local.item.newItem)
									ItemFactory($scope, {local: $scope.FileManager}).rename(fullpath, newName);
								else
									ItemFactory($scope, {local: $scope.FileManager}).createFolder($local.item);
							}
							else
								$local.cancelEdit();
						} else
							$local.cancelEdit();
					}
				};

				/**
				 * select the current event
				 * @param  {Object} $event Angular event
				 */
				$local.select = function($event) {
					if($local.item.unselectable === true)
						return true;

					$scope.FileManager.preview(false);

					var witness = $local.selected;
					if(!$event.ctrlKey)
						$scope.$emit('unselect_all');

					$local.selected = !witness;

					if($local.selected)
						$scope.FileManager.selectedItems.push($local.item);
					else
						for(var i = 0; i<$scope.FileManager.selectedItems.length; i++)
							if($scope.FileManager.selectedItems[i].name == $local.item.name) {
								$scope.FileManager.selectedItems.splice(i,1);
								break;
							}
				};

				/**
				 * start the preview of the current item
				 * @param  {Object} $event Angular event
				 */
				$local.preview = function($event) {
					$local.select($event);
					if(!$local.item.editMode)
						$scope.FileManager.preview();
				};

				/**
				 * download the current item
				 * @param  {string} name 
				 */
				$local.download = function(name) {
					$local.item.download();
				};

				$scope.toString = function() {
					return '_item';
				};
			},
			require: 'item',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._item;
				self.itemId = attributes.itemId;
				$local.item = ItemFactory($scope).get(attributes.itemId);
				$local.item.node = $node;

			}
		};
	}]);;angular.module('FileManager').
	directive('buttonUploader', ['WebsocketFactory', 'UserFactory', 'UploaderFactory', 'ItemFactory', function(WebsocketFactory, UserFactory, UploaderFactory, ItemFactory) {
		return {
			scope: true,
			controller: function($scope) {
				var $local = $scope._buttonUploader = {}
				,	self = this;

				self.path;
				self.fileReaders = {};
				self.files = {};

				/**
				 * select a file in order to upload it later
				 */
				$local.selectFile = function() {
					self.$template.click();
				}

				$scope.toString = function() {
					return '_buttonUploader';
				}
			},
			require: 'buttonUploader',
			restrict: 'A',
			link: function($scope, $node, attributes, self) {
				var $local = $scope._buttonUploader
				,	socket = WebsocketFactory();

				self.$template = $node.parent().find('[type=file]');

				/**
				 * load the selected file
				 * @param  {Event} event 
				 */
				self.$template[0].addEventListener('change', function(event){
					var id = (Math.random() + '').replace('0.', '');
					self.path = $scope.FileManager.currentPath;
					self.files[id] = event.target.files[0];
					self.files[id].sizeAdded = 0;
					self.fileReaders[id] = new FileReader();
					if(self.path.substring(1) == 'Shared/') {
						$scope.FileManager.addError('File not uploaded', 'You can\'t upload a file into the Shared folder');
						$scope.$apply();
						return true;
					}
					var newItem = ItemFactory($scope, {local: $scope.FileManager}).add({
						name: self.files[id].name,
						owner: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						ownerId: $scope.FileManager.folderOwner,
						creator: UserFactory($scope).get().firstname + ' ' + UserFactory($scope).get().lastname,
						size : 0,
                		creatorId: UserFactory($scope).get().id,
						type: 'file',
						path: self.path,
						lastUpdate: new Date(),
						unselectable: true,
						todelete: false,
						inupload: true
					}, function() { $scope.$apply(); })

					ItemFactory($scope, {local: $scope.FileManager}).cleanToDelete();

					UploaderFactory($scope, {local: $local, controller: self, entity: newItem}).add(id, self.files[id]);

					self.fileReaders[id].onload = function(event){

						var data = event.target.result
						socket.emit('upload', { data: data, name: self.files[id].name, id: id });
					}

					/**
					 * LISTENER - init the current upload
					 */
					socket.emit('upload_init', {
						id: id,
						owner: $scope.FileManager.folderOwner,
						name: self.files[id].name,
						size: self.files[id].size,
						type: self.files[id].type,
						path: self.path,
						token: UserFactory($scope).get().token
					});
				});
			}
		};
	}]);;angular.module('FileManager').
    directive('highlight', function(){
        return {
            scope: true,
            restrict: 'A',
            require: 'highlight',
            controller: function($scope) {
                var $local = $scope._highlight = {};

            },
            link: function($scope, $node, attributes, self) {
                var $local = $scope._highlight;
                $local.node = $node;

                if(!attributes.highlight)
                    throw 'An highlight resource must be defined';

                /**
                 * LISTENER - called when the highlight method is updated
                 * @param  {Object} data 
                 */
                $scope.$watch(attributes.highlight, function(data) {
                    var pre = angular.element('<pre>');
                    if(typeof data == 'object')
                        pre.text(JSON.stringify(data));
                    else
                        pre.text(data);

                    hljs.highlightBlock(pre[0]);
                    $node.html(pre);
                });
            }
        };
    });;angular.module('FileManager').
	directive('formPostDownloader', function() {
		return {
			scope: true,
			restrict: 'E',
			controller: ['$scope', 'apiUrl', 'UserFactory', function($scope, apiUrl, UserFactory){
				var $local = $scope._formPostDownloader = {}
				,	iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
				,	android = navigator.userAgent.toLowerCase().match(/android/g) ? true : false;

				$local.url = apiUrl + 'download/' +UserFactory($scope).get().id+ '/?token=' + UserFactory($scope).get().token;
				$local.target = iOS || android ? '_blank' : 'downloadFrame';

				/**
				 * LISTENER - start the downloads
				 */
				$scope.$on('start_post_download', function() {
					$local.download();
				})

				$scope.toString = function() {
					return '_formPostDownloader';
				}
			}],
			template:
				'<form target={{_formPostDownloader.target}} action="{{_formPostDownloader.url}}" method="POST" form-post-downloader >'
			+		'<input type="text" name={{index}} value={{item.getFullPath()}} ng-repeat="(index, item) in FileManager.selectedItems track by $index">'
			+	'</form>',
			replace: true,
			link: function($scope, $node, attributes) {
				var $local = $scope._formPostDownloader
				,	template = '<iframe name="downloadFrame" id="downloadIFrame" style="display: none;" src="" />';

				/**
				 * download items thanks to the form post download
				 */
				$local.download = function() {
					angular.element('#downloadIFrame').remove();
					angular.element('body').append(template);
					$node.submit();
				}
			}
		};
	});;angular.module('Navigation', ['duScroll']);;angular.module('Navigation').
	controller('NavigationController', ['$scope', '$window', '$location', 'UserFactory', '$document', function($scope, $window, $location, UserFactory, $document){
		var $local = $scope.Navigation = {};

		/**
		 * navigate to the selected path
		 * @param  {string} path      
		 * @param  {Object} container node
		 */
		$local.goto = function(path, container) {
			path += (path == '/manager' && UserFactory($scope).get()) ? "?token=" + UserFactory($scope).get().token : "";
			var pathView = path.slice(0, path.indexOf("#"));
			var pathAngular = path.slice(path.indexOf("#"));
			// console.log(path)
			if(path.indexOf("/account") > -1 || path.indexOf("/admin") > -1)
				path = pathView + "?token=" + UserFactory($scope).get().token + pathAngular;
			// console.log(pathAngular)

			if(path.indexOf("/home") > -1 &&  $window.location.pathname == '/home') {

				$location.path('/'+pathAngular.substring(1));
				var target = angular.element(pathAngular)
				,	container = container ? angular.element(container) : $document;
				if(target.length>0) {
					// console.log($location)
					$local.scrollTo(target, container);
				}
				else
					container.scrollTop(0, 1000);
			}
			else
				$window.location = path;
		};

		$local.isSelected = function(pathname, anchor) {
			anchor = anchor || '/';
			return $location.$$path == anchor && $window.location.pathname == pathname;
		}

		/**
		 * scroll to the anchor
		 * @param  {Object} $node      angular node
		 * @param  {node} $container angular node
		 */
		$local.scrollTo = function($node, $container) {
			$container = $container || $document
			$container.scrollToElement($node, 0, 1000).then(function() {
				console && console.log('You just scrolled to the top!');
			});
		}


		$local.isOnShared = function() {
			return ($location.$$absUrl.indexOf("/shared/") > -1);
		}

		$local.isOnManager = function() {
			return ($location.$$absUrl.indexOf("/manager") > -1);
		}

		if($window.location.pathname == '/home' && $location.$$path.length>0)
			$local.goto('/home#' + $location.$$path.substring(1), '#bloc-container')

		$scope.toString = function() {
			return 'Navigation';
		}
	}]);angular.module('Overlay', []);;angular.module('Overlay').
	controller('OverlayController', ['$scope', function($scope){
		var $local = $scope.Overlay = {};

		$local.activated = false;

		/**
		 * LISTENER - active the overlay
		 */
		$scope.$on('enable_overlay', function() { $local.activated = true; });

		/**
		 * disabled the overlay and all the modals
		 */
		$local.clickout = function() {
			$local.activated = false;
			$scope.$broadcast('hide');
		}

		$scope.toString = function() {
			return 'Overlay';
		}
	}]);angular.module('Annyang', []);;angular.module('Annyang').
    config(function() {

    	if(annyang)
        	annyang.setLanguage('fr-FR');

    });;angular.module('Annyang').
    controller('AnnyangController', ['$scope', 'AnnyangService', '$timeout', function($scope, AnnyangService, $timeout) {
        var $local = $scope.Annyang = {};

        $local.started = false;

        $local.start = false;
        $local.end = false;
        $local.error = false;
        $local.success = false;

        $local.activated = true;

        AnnyangService.addCallback('start', function() {
            $local.start = true;
            $local.end = false;
            $local.error = false;
            $local.success = false;
            $scope.$apply();
        });
        AnnyangService.addCallback('end', function() {
            $local.start = false;
            $local.end = true;
            $local.error = false;
            $local.success = false;
            $scope.$apply();
        });
        AnnyangService.addCallback('resultMatch', function() {
            $local.error = false;
            $local.success = true;
            $scope.$apply();
            $timeout(function() {
                $local.success = false;
                $scope.$apply();
            }, 1500);
        });
        AnnyangService.addCallback('resultNoMatch', function() {
            $local.error = true;
            $local.success = false;
            $scope.$apply();
            $timeout(function() {
                $local.error = false;
                $scope.$apply();
            }, 1500);
        });

        /**
         * Annyang managment
         * start if stopped 
         * stop if started
         * @return {[type]} [description]
         */
        $local.startStop = function() {
            if($local.started)
                AnnyangService.stop();
            else
                AnnyangService.start();

            $local.started = !$local.started;
        };

        $scope.toString = function() {
            return 'Annyang';
        };
    }]);;angular.module('Annyang').
    factory('ConfigFactory', function() {

        return {

            'open_folder_like': 'open like *term',
            'open_folder': 'open (folder) *term',
            'open_folder_alternative': 'go into (folder) *term',
            'open_parent_folder': 'go back',
            'open_parent_folder_alternative': 'previous',

            'download_file_like': 'download like *term',
            'download_file': 'download (folder) (file) *term',

            'preview_item_like': 'preview like *term',
            'preview_item': 'preview (folder) (file) *term',

            'select_file_like': 'select like *term',
            'select_all': 'select all',
            'select_file': 'select (folder) (file) *term',

            'unselect_file_like': 'unselect like *term',
            'unselect_all': 'unselect all',
            'unselect_file': 'unselect (folder) (file) *term',

            'create_folder': 'create (folder) *term',

            'delete_item': 'delete (folder) (file) *term',

            'rename_item_like': 'rename like *term to *term',
            'rename_item': 'rename (folder) (file) *term to *term',

            'copy': 'copy',
            'paste': 'paste',

            'refresh': 'refresh',

            'harlem_shake_full': '*term please say goodbye',
            'harlem_shake_full_alternative': '*term please say goodbye',
            'harlem_shake_first' : '*term say goodbye',
            'harlem_shake_first_alternative' : '*term say goodbye'


            /*'open_folder_like': 'ouvrir un dossier qui contient *term',
            'open_folder_like_alternative': 'ouvrir un dossier contenant *term',
            'open_folder': 'ouvrir (le) (dossier) *term',
            'open_parent_folder': 'ouvrir le dossier parent',
            'open_parent_folder_alternative': 'précédent',
            'open_parent_folder_alternative2': 'revenir en arrière',
            'open_parent_folder_alternative3': 'retour',


            'download_file_like': 'télécharger un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative': 'télécharger un (dossier) (fichier) contenant *term',
            'download_file_like_alternative2': 'téléchargé un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative3': 'téléchargé un (dossier) (fichier) contenant *term',
            'download_file_like_alternative4': 'téléchargez un (dossier) (fichier) qui contient *term',
            'download_file_like_alternative5': 'téléchargez un (dossier) (fichier) contenant *term',
            'download_file': 'télécharger (le) (dossier) (fichier) *term',
            'download_file_alternative': 'téléchargé (le) (dossier) (fichier) *term',
            'download_file_alternative2': 'téléchargez (le) (dossier) (fichier) *term',


            'preview_item_like': 'prévisualiser un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative': 'prévisualiser un (dossier) (fichier) contenant *term',
            'preview_item_like_alternative2': 'prévisualisé un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative3': 'prévisualisé un (dossier) (fichier) contenant *term',
            'preview_item_like_alternative4': 'prévisualisez un (dossier) (fichier) qui contient *term',
            'preview_item_like_alternative5': 'prévisualisez un (dossier) (fichier) contenant *term',
            'preview_item': 'prévisualiser (le) (dossier) (fichier) *term',
            'preview_item_alternative': 'prévisualisé (le) (dossier) (fichier) *term',
            'preview_item_alternative2': 'prévisualisez (le) (dossier) (fichier) *term',
            'preview_item_alternative3': 'aperçu *term',


            'select_file_like': 'sélectionner un dossier qui contient *term',
            'select_file_like_alternative': 'sélectionner un fichier qui contient *term',
            'select_file_like_alternative2': 'sélectionner un dossier contenant *term',
            'select_file_like_alternative3': 'sélectionner un fichier contenant *term',
            'select_file_like_alternative4': 'sélectionné un dossier  qui contient *term',
            'select_file_like_alternative5': 'sélectionné un fichier qui contient *term',
            'select_file_like_alternative6': 'sélectionné un dossier contenant *term',
            'select_file_like_alternative7': 'sélectionné un fichier contenant *term',
            'select_file_like_alternative8': 'sélectionnez un dossier qui contient *term',
            'select_file_like_alternative9': 'sélectionnez un fichier qui contient *term',
            'select_file_like_alternative10': 'sélectionnez un dossier contenant *term',
            'select_file_like_alternative11': 'sélectionnez un fichier contenant *term',

            'select_files_like': 'sélectionner les dossier(s) qui contiennent *term',
            'select_files_like_alternative': 'sélectionner les fichier(s) qui contiennent *term',
            'select_files_like_alternative2': 'sélectionner les dossier(s) contenant *term',
            'select_files_like_alternative3': 'sélectionner les fichier(s) contenant *term',
            'select_files_like_alternative4': 'sélectionné les dossier(s) qui contiennent *term',
            'select_files_like_alternative5': 'sélectionné les fichier(s) qui contiennent *term',
            'select_files_like_alternative6': 'sélectionné les dossier(s) contenant *term',
            'select_files_like_alternative7': 'sélectionné les fichier(s) contenant *term',
            'select_files_like_alternative8': 'sélectionnez les dossier(s) qui contiennent *term',
            'select_files_like_alternative9': 'sélectionnez les fichier(s) qui contiennent *term',
            'select_files_like_alternative10': 'sélectionnez les dossier(s) contenant *term',
            'select_files_like_alternative11': 'sélectionnez les fichier(s) contenant *term',

            'select_file': 'sélectionner (le) (dossier) (fichier) *term',
            'select_file_alternative': 'sélectionné (le) (dossier) (fichier) *term',
            'select_file_alternative2': 'sélectionnez (le) (dossier) (fichier) *term',

            'unselect_file_like': 'désélectionner un dossier qui contient *term',
            'unselect_file_like_alternative': 'désélectionner un fichier qui contient *term',
            'unselect_file_like_alternative2': 'désélectionner un dossier contenant *term',
            'unselect_file_like_alternative3': 'désélectionner un fichier contenant *term',
            'unselect_file_like_alternative4': 'désélectionné un dossier qui contient *term',
            'unselect_file_like_alternative5': 'désélectionné un fichier qui contient *term',
            'unselect_file_like_alternative6': 'désélectionné un dossier contenant *term',
            'unselect_file_like_alternative7': 'désélectionné un fichier contenant *term',
            'unselect_file_like_alternative8': 'désélectionnez un dossier qui contient *term',
            'unselect_file_like_alternative9': 'désélectionnez un fichier qui contient *term',
            'unselect_file_like_alternative10': 'désélectionnez un dossier contenant *term',
            'unselect_file_like_alternative11': 'désélectionnez un fichier contenant *term',

            'unselect_files_like': 'désélectionner les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative': 'désélectionner les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative2': 'désélectionner les dossier(s) contenant *term',
            'unselect_files_like_alternative3': 'désélectionner les fichier(s) contenant *term',
            'unselect_files_like_alternative4': 'désélectionné les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative5': 'désélectionné les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative6': 'désélectionné les dossier(s) contenant *term',
            'unselect_files_like_alternative7': 'désélectionné les fichier(s) contenant *term',
            'unselect_files_like_alternative8': 'désélectionnez les dossier(s) qui contiennent *term',
            'unselect_files_like_alternative9': 'désélectionnez les fichier(s) qui contiennent *term',
            'unselect_files_like_alternative10': 'désélectionnez les dossier(s) contenant *term',
            'unselect_files_like_alternative11': 'désélectionnez les fichier(s) contenant *term',

            'unselect_file': 'désélectionner (le) (dossier) (fichier) *term',
            'unselect_file_alternative': 'désélectionné (le) (dossier) (fichier) *term',
            'unselect_file_alternative2': 'désélectionnez (le) (dossier) (fichier) *term',


            'create_folder': 'créer (le) (un) (dossier) *term',
            'create_folder_alternative': 'creer (le) (un) (dossier) *term',
            'create_folder_alternative2': 'cree (le) (un) (dossier) *term',
            'create_folder_alternative3': 'créez (le) (un) (dossier) *term',


            'delete_item': 'supprimer (le) (dossier) (fichier) *term',
            'delete_item_alternative': 'supprimé (le) (dossier) (fichier) *term',
            'delete_item_alternative2': 'supprimez (le) (dossier) (fichier) *term',


            'rename_item_like': 'renommer un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative': 'renommer un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative2': 'éditer un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative3': 'éditer un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative4': 'édité un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative5': 'édité un (dossier) (fichier) contenant *term en *term',
            'rename_item_like_alternative6': 'éditez un (dossier) (fichier) qui contient *term en *term',
            'rename_item_like_alternative7': 'éditez un (dossier) (fichier) contenant *term en *term',
            'rename_item': 'renommer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative': 'éditer (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative2': 'édité (le) (dossier) (fichier) *term en *term',
            'rename_item_alternative3': 'éditez (le) (dossier) (fichier) *term en *term',

            'refresh': 'rafraîchir'*/
        }
    });;angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {}
        ,   prototype = {};

        /**
         * add a new callback to the annyang command
         * @param {string}   type     method
         * @param {Function} callback 
         * @param {string}   context  annyang context
         */
        prototype.addCallback = function(type, callback, context) {
            if(annyang)
                annyang.addCallback(type, callback, context);
        }

        /**
         * set a specific command and add to it a new callback
         * @param {string}   commandName command
         * @param {Function} callback    
         */
        prototype.set = function(commandName, callback) {
            commands[ConfigFactory[commandName]] = callback;
        };

        /**
         * submit all commands
         */
        prototype.submitCommands = function() {
            if(annyang) {
                annyang.removeAll();
                annyang.debug();
                annyang.addCommands(commands);
            }
        };

        /**
         * start annyang service
         */
        prototype.start = function() {
            prototype.submitCommands();
            if(annyang)
                annyang.start();
        };

        /**
         * stop annyang service
         */
        prototype.stop = function() {
            if(annyang)
                annyang.abort();
        };

        return prototype;
    }]);;angular.module('Annyang').
	service('AnnyangFormatService', function(){

        var prototype = {};

        prototype.base = function(string) {
            return string.toLowerCase();
        };


        /**
         * remove the last char of the string when it's a "s"
         * @param  {string} string string
         */
        prototype.plurals = function(string) {
        	if(string.slice(-1) == 's')
        		string = string.slice(0, -1);
        	return string;
        }

        /**
         * remove all accent in a string
         * @param  {string} string string
         */
        prototype.accents = function(string) {
            return prototype.base(string)
            .replace(/\s/g,'')
            .replace(/[àáâãäå]/g,'a')
            .replace(/æ/g,'ae')
            .replace(/ç/g,'c')
            .replace(/[èéêë]/g,'e')
            .replace(/[ìíîï]/g,'i')
            .replace(/ñ/g,'n')
            .replace(/[òóôõö]/g,'o')
            .replace(/œ/g,'oe')
            .replace(/[ùúûü]/g,'u')
            .replace(/[ýÿ]/g,'y');
        }

        /**
         * remove all special character from a string
         * @param  {string} string string
         */
        prototype.specialChars = function(string) {
            return prototype.base(string)
            .replace(/-/g,'')
            .replace(/_/g,'')
            .replace(/'/g,'')
            .replace(/"/g,'');
        }

        /**
         * remove the extension of the string
         * @param  {string} string string
         */
        prototype.removeExtension = function(string) {

            var itemName = string.split(".");
            var extension = '';
            if(itemName.length !== 1 && (itemName[0] !== "" || itemName.length !== 2) )
                extension = itemName.pop();
            return nameOnly = itemName.join('.');
        }

        /**
         * call all formatting method
         * @param  {string} string string
         */
        prototype.baseFormat = function(string) {
            return prototype.specialChars(prototype.accents(prototype.plurals(prototype.base(string))));
        }

        return prototype;
    });