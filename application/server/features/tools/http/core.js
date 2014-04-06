var fs = require('fs')
,   $http = require('http')
,   config = require(global.paths.server + '/config/core').get()
,   http = {};

http.redirect = function(request, response) {
    var error = null;
    var options = {
        host: config.webservice.host,
        port: config.webservice.port,
        path: request.path,
        method: request.method,
        headers: request.headers
    };

    var req = $http.request(options, function(res) {
        res.on('data', function (chunk) { response.write(chunk, "binary"); });
        res.on('end', function() { response.end(); });
    });

    req.on('error', function(err) { response.send(err); });
    if(request.headers['content-length'] !== undefined) { req.write(JSON.stringify(request.body)); }
    req.end();
};

module.exports = http;