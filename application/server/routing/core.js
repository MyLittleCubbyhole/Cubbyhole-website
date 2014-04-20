var routing
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,   filters = require(global.paths.server + '/routing/filters/core')
,   routing = {};

routing.init = function(app) {

    app.get('/', navigation.redirect.home);
    app.get('/home', navigation.get.index);
    app.get('/activation', navigation.get.activation);
    app.get('/authentication', navigation.get.authentication);
    app.get('/manager', filters.tokenInterceptor, navigation.get.filemanager);
    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);

};

module.exports = routing;