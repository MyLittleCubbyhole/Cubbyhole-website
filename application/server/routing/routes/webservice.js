var fs = require('fs');
var http = require('http');
var webservice  = { get: {}, post: {}, put: {}, delete: {} };

/********************************[    GET   ]********************************/

webservice.get.redirect = function(request, response) {
    webservice.simpleRedirect(request, response);
};

/********************************[   POST   ]********************************/

webservice.post.redirect = function(request, response) {
    webservice.simpleRedirect(request, response);
};

/********************************[   PUT    ]********************************/

webservice.put.redirect = function(request, response) {
    webservice.simpleRedirect(request, response);
};

/********************************[  DELETE  ]********************************/

webservice.delete.redirect = function(request, response) {
    webservice.simpleRedirect(request, response);
};


webservice.simpleRedirect = function(request, response) {
    var error = null;

    var options = {
        host: 'localhost',
        port: '900',
        path: request.path,
        method: request.method,
        headers: request.headers
    };

    var req = http.request(options, function(res) {

        res.on('data', function (chunk) {
            response.write(chunk, "binary");
        });

        res.on('end', function() {
            response.end();
        });
    });

    req.on('error', function(err) {
        response.send(err);
    });

    if(request.headers['content-length'] !== undefined) {
        req.write(JSON.stringify(request.body));
    }

    req.end();
};

module.exports = webservice;