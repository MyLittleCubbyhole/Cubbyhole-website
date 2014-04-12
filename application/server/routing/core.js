var routing
,	navigation = require(global.paths.server + '/routing/routes/navigation')
,   webservice = require(global.paths.server + '/routing/routes/webservice')
,   routing = {};

routing.init = function(app) {

    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);
    app.get(/^\/api\/browse\/([0-9]+)$/, webservice.get.redirect);
    app.get(/^\/api\/browse\/([0-9]+)\/(\/?.+)*/, webservice.get.redirect);
    app.get(/^\/api\/download\/([0-9]+)\/(\/?.+)+/, webservice.get.redirect);
    app.get(/^\/(\/?.+)*/, navigation.get.index);

    app.post(/^\/api\/browse\/([0-9]+)$/, webservice.post.redirect);
    app.post(/^\/api\/browse\/([0-9]+)(\/?.+)*\/$/, webservice.post.redirect);

    app.put(/^\/api\/browse\/([0-9]+)\/(\/?.+)+/, webservice.put.redirect);

    app.delete(/^\/api\/browse\/([0-9]+)\/(\/*.+)+/, webservice.delete.redirect);


};

module.exports = routing;