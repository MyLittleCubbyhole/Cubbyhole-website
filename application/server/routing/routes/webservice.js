var tools = require(global.paths.server + '/features/tools/http/core')
,   webservice  = { get: {}, post: {}, put: {}, delete: {} };

/********************************[    GET   ]********************************/

webservice.get.redirect = function(request, response) {
    tools.redirect(request, response);
};

/********************************[   POST   ]********************************/

webservice.post.redirect = function(request, response) {
    tools.redirect(request, response);
};

/********************************[   PUT    ]********************************/

webservice.put.redirect = function(request, response) {
    tools.redirect(request, response);
};

/********************************[  DELETE  ]********************************/

webservice.delete.redirect = function(request, response) {
    tools.redirect(request, response);
};

module.exports = webservice;