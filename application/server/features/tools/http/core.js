var http = {}
,   $http    = require('http')
,   config = require(global.paths.server + '/config/core').get();

http.checkToken = function(token, callback) {

    var options = {
        host: config['webservice'].host,
        port: config['webservice'].port,
        path: '/api/checkToken?token=' + token,
        method: 'GET'
    };

    var req = $http.request(options, function(res) {
        callback(res.statusCode);
        res.on('data', function (chunk) {});
        res.on('end', function() {});
    });

    req.on('error', function(err) { console.log(err); });

    req.end();
};

http.activation = function(token, callback) {

    var options = {
        host: config['webservice'].host,
        port: config['webservice'].port,
        path: '/api/activation?token=' + token,
        method: 'GET'
    };

    var req = $http.request(options, function(res) {
        callback(res.statusCode);
        res.on('data', function (chunk) {});
        res.on('end', function() {});
    });

    req.on('error', function(err) { console.log(err); });

    req.end();
};

module.exports = http;