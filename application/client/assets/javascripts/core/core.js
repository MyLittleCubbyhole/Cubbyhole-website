var cubbyHole = angular.module('CubbyHole', ['WaiterUpAndDown', 'Filemanager', 'restangular', 'ngRoute']);

cubbyHole.constant('baseUrl', 'http://localhost:800/api/');

cubbyHole.config(['baseUrl', 'RestangularProvider', '$routeProvider', '$locationProvider', function(baseUrl, RestangularProvider, $routeProvider, $locationProvider) {

    RestangularProvider.setBaseUrl(baseUrl);

    $routeProvider.when('/home', {
        templateUrl: '/partials/home'
    })
    .when('/browse', {
        templateUrl: '/partials/filemanager',
        controller: 'fileController'
    })
    .when('/samples', {
        templateUrl: '/partials/sample'
    })
    .otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(true);
}]);

cubbyHole.factory('UserService', function() {
    return {
        id : '0'
    };
});

cubbyHole.controller('fileController', ['$scope', '$routeParams', 'UserService', 'Restangular', function($scope, $routeParams, UserService, Restangular) {

    var $local = $scope.fileController = {};

    var browse = Restangular.one('browse').one(UserService.id + '/');

    $local.path = $routeParams.path;
    $local.files = [];

    var filesUrl = browse;
    if($routeParams.path !== undefined && $routeParams.path !== "") {
        var path = $routeParams.path;
        if(path.slice(-1) != '/') {
           path = path + "/";
        }
        filesUrl = filesUrl.one(path);
    }

    filesUrl.getList().then(function(files) {
        $local.files = files;
    }, function(response) {
        console.log(response);
    });

}]);
