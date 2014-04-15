angular.module('FileManager').
	factory('UploaderFactory', ['WebsocketFactory', function(WebsocketFactory){

		var files = {}
		,	socket = WebsocketFactory();

		socket.on('upload_next', function(data){
			files[data.id].context.$local.progress = Math.floor(data['percent']) + '%';
			files[data.id].context.$scope.$apply();

			var chunk = data['chunk'] * 524288
			,	part = files[data.id].data.slice(chunk, chunk + Math.min(524288, (files[data.id].data.size - chunk)));

			files[data.id].context.controller.fileReader.readAsBinaryString(part);
		});


		socket.on('upload_done', function(data){
			files[data.id].context.$local.progress = '100%';
			files[data.id].context.$scope.$apply();
			delete files[data.id];
		});

		return function($scope, context) {
			context = context || {};

			if(!$scope)
				throw 'a scope must be defined ';

			var prototype = {}
			,	$node = context.node || {}
			,	$local = context.local || {}
			,	controller = context.controller || {};
			
			var prototype = {};

			prototype.add = function(id, file) {
				files[id] = { data: file, context: { $local: $local, $scope: $scope, controller: controller } };
			}

			return prototype;
		};
	}])