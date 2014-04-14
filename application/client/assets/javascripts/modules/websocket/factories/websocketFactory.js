angular.module('Websocket').
	factory('WebsocketFactory', ['webserviceUrl', 'socketRoom', function(webserviceUrl, socketRoom) {

		var socketIO = {}
		,	socket;

		var init = function() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				socketIO = io.connect(webserviceUrl)
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + webserviceUrl);
			}
			else
				console.error('io not defined - problem with webservice');
		};

		return function() {
			!socket && init();
			return socket;
		};
	}]);