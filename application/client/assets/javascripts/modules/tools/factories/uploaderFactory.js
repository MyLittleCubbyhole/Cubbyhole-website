angular.module('Tools').
	factory('UploaderFactory', ['WebsocketFactory', function(WebsocketFactory){

		var files = {}
		,	socket = WebsocketFactory();

		socket.on('upload_next', function(data) {
			files[data.id].context.entity.size += data['chunkSize'];
			files[data.id].data.sizeAdded += parseInt(data['chunkSize'], 10);
			files[data.id].context.$scope.$apply();
			var chunk = data['chunk'] * 524288
			,	part = files[data.id].data.slice(chunk, chunk + Math.min(524288, (files[data.id].data.size - chunk)));

			files[data.id].context.controller.fileReaders[data.id].readAsBinaryString(part);
		});


		socket.on('upload_done', function(data){
			var file = files[data.id];
			file.context.entity.size += data['chunkSize'];
			file.data.sizeAdded += parseInt(data['chunkSize'], 10);
			file.context.entity._id = data._id;
			file.context.entity.unselectable = false;
			file.context.$scope.$apply();

			delete files[data.id];
		});

		socket.on('upload_stopped', function(data){
			console.error("upload stopped - " + data.error);
			if(files[data.id].context.entity.toString() == 'File')
				files[data.id].context.entity.remove();
			else
				files[data.id].context.entity.size -= files[data.id].data.sizeAdded;

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

			prototype.add = function(id, file) {
				files[id] = { data: file, context: { $local: $local, $scope: $scope, controller: controller, entity: entity } };
			}

			return prototype;
		};
	}])