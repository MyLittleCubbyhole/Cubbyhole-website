var routing
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,   filters = require(global.paths.server + '/routing/filters/core')
,   routing = {};

routing.init = function(app) {

    app.get('/', navigation.redirect.home);
    app.get('/home', navigation.get.index);
    app.get('/activation', navigation.get.activation);
    app.get('/account', filters.tokenInterceptor, navigation.get.account);
    app.get('/manager', filters.tokenInterceptor, navigation.get.filemanager);
    app.get('/admin', filters.adminInterceptor, navigation.get.admin);
    app.get(/^\/shared\/(.+)+/, navigation.get.shared);
    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);

    app.post('/account', filters.tokenInterceptor, navigation.post.account);
};

module.exports = routing;