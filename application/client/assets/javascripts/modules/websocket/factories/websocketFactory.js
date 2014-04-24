angular.module('Websocket').
	factory('WebsocketFactory', ['apiUrl', 'socketRoom', function(apiUrl, socketRoom) {

		var socketIO = {}
		,	socket;

		var init = function() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				console.log(apiUrl);
				socketIO = io.connect(apiUrl);
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + apiUrl);
			}
			else
				console.error('io not defined - problem with webservice');
		};

		return function() {
			!socket && init();
			return socket;
		};
	}]);