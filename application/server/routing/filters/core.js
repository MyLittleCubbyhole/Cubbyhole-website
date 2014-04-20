var filters = {}
, http = require(global.paths.server + '/features/tools/http/core');

filters.tokenInterceptor = function(request, response, next) {
    var query = request.query;

    var token = query.token || 0;
    token = encodeURIComponent(token);

    if(token) {
        http.checkToken(token, function(result) {
            if(result == 200)
                next();
            else
                response.redirect('/authentication#/login');
        });
    } else {
        response.redirect('/authentication#/login');
    }
};

module.exports = filters;