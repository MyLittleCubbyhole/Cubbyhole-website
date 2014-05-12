angular.module('Websocket').
	factory('WebsocketFactory', ['websocketUrl', 'socketRoom', function(url, socketRoom) {

		var socketIO = {}
		,	socket;

		var init = function() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				socketIO = io.connect(url);
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + url);
			}
			else {
				console.error('io not defined - problem with webservice');
			}
		};

		return function() {
			!socket && init();
			return socket;
		};
	}]);