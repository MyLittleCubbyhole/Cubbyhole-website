angular.module('Websocket').
	factory('WebsocketFactory', ['websocketUrl', 'socketRoom', function(url, socketRoom) {

		var socketIO = {}
		,	socket;

		function init() {
			console.info('connection to websocket server...');
			if(typeof io != 'undefined') {
				socketIO = io.connect(url);
				socket = socketIO.socket.of(socketRoom);
				console.info('socket connected at ' + url);

				authenticate();
			}
			else {
				console.error('io not defined - problem with webservice');
			}
		};

        function authenticate() {
			var user = localStorage.getItem('user');
			if(!user)
				user = sessionStorage.getItem('user');

            if(socket && user)
                socket.emit('socket-authentication', { token: JSON.parse(user).token });
        }

		return function() {
			!socket && init();
			return socket;
		};
	}]);