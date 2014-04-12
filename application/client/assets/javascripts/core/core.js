var cubbyHole = angular.module('CubbyHole', ['WaiterUpAndDown', 'Filemanager', 'restangular', 'ngRoute']);

cubbyHole.constant('baseUrl', 'http://127.0.0.1:5152/api/');

cubbyHole.config(['baseUrl', 'RestangularProvider', '$routeProvider', '$locationProvider', function(baseUrl, RestangularProvider, $routeProvider, $locationProvider) {

    RestangularProvider.setBaseUrl(baseUrl);

    $routeProvider.when('/home', {
        templateUrl: '/partials/home'
    })
    .when('/browse', {
        templateUrl: '/partials/filemanager',
        controller: 'fileController'
    })
    .when('/plans', {
        templateUrl: '/partials/plans'
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


var socketIO = io.connect('http://127.0.0.1:5150/')
,   socket = socketIO.socket.of('/cubbyhole');

var $node = $('#box');
var file;
$node.on('dragenter', doNothing);
$node.on('dragover', doNothing);
$node.text('pret pour upload');
$node.on('drop', function(e){
    e.originalEvent.preventDefault();
    file = e.originalEvent.dataTransfer.files[0];

    fileReader = new FileReader(); 
    fileReader.onload = function(evnt){
        var data = evnt.target.result
        socket.emit('upload', {data: data, name: file.name});
    }
    socket.emit('upload_init', { 'name' : file.name, 'size' : file.size, type: file.type });
}); 

socket.on('upload_next', function (data){
    console.log(data['percent']);
    var chunk = data['chunk'] * 524288;
    var newFile;
    newFile = file.slice(chunk, chunk + Math.min(524288, (file.size - chunk)));
    fileReader.readAsBinaryString(newFile);
});


socket.on('upload_done', function (data){
    console.log('upload done');
});

function doNothing (e){
    e.preventDefault();
    e.stopPropagation();
}