angular.module('Tools').
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
			console.error('upload stopped - ' + data.error);
			if(files[data.id].context.entity.toString() === 'File') {
				files[data.id].context.entity.todelete = true;
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

			/**
			 * add a new upload action
			 * @param {integer} id   upload id
			 * @param {Object} file File
			 */
			prototype.add = function(id, file) {
				files[id] = { data: file, context: { $local: $local, $scope: $scope, controller: controller, entity: entity } };
			};

			return prototype;
		};
	}]);