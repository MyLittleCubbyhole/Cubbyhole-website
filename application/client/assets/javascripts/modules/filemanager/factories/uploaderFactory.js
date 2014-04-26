angular.module('FileManager').
	factory('UploaderFactory', ['WebsocketFactory', function(WebsocketFactory){

		var files = {}
		,	socket = WebsocketFactory();

		socket.on('upload_next', function(data) {
			// console.log(data);
			// files[data.id].context.$local.progress = Math.floor(data['percent']) + '%';
			// files[data.id].context.$scope.$apply();
			// console.log(Math.floor(data['percent']) + '%');
			files[data.id].context.entity.size += data['size'];
			files[data.id].context.$scope.$apply();
			// console.log(files[data.id].context.$node)
			var chunk = data['chunk'] * 524288
			,	part = files[data.id].data.slice(chunk, chunk + Math.min(524288, (files[data.id].data.size - chunk)));

			files[data.id].context.controller.fileReaders[data.id].readAsBinaryString(part);
		});


		socket.on('upload_done', function(data){
			var file = files[data.id];
			// file.context.$local.progress = '100%';
			// file.context.$scope.$apply();
			// file.context.$scope.FileManager.refresh();
			files[data.id].context.entity.size += data['size'];
			files[data.id].context.$scope.$apply();
			// console.log(files[data.id].context.$node)


			delete files[data.id];
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