angular.module('Authentication').
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
    }]);