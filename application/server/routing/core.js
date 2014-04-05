var routing
,	navigation	= require('./routes/navigation')
,   webservice  = require('./routes/webservice');

routing = function(app) {

    app.get(/^\/api\/browse\/([0-9]+)$/, webservice.get.redirect);
    app.get(/^\/api\/browse\/([0-9]+)\/(\/?.+)*/, webservice.get.redirect);
    app.get(/^\/api\/download\/([0-9]+)\/(\/?.+)+/, webservice.get.redirect);
    app.post(/^\/api\/browse\/([0-9]+)$/, webservice.post.redirect);
    app.post(/^\/api\/browse\/([0-9]+)(\/?.+)*\/$/, webservice.post.redirect);
    app.put(/^\/api\/browse\/([0-9]+)\/(\/?.+)+/, webservice.put.redirect);
    app.delete(/^\/api\/browse\/([0-9]+)\/(\/*.+)+/, webservice.delete.redirect);

    app.get(/partials\/(.+)/, navigation.get.partial);
    app.get(/templates\/(.+)/, navigation.get.template);

    app.get(/^\/(\/?.+)*/, navigation.get.index);

};

module.exports = routing;