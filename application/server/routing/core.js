var routing
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,   routing = {};

routing.init = function(app) {

    app.get('/', navigation.redirect.home);
    app.get('/home', navigation.get.index);
    app.get('/authentication', navigation.get.authentication);
    app.get('/manager', navigation.get.filemanager);
    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);

};

module.exports = routing;