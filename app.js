var path    = require('path')
,   express = require('express')
,   http    = require('http')
,   app     = express()
,   server  = http.createServer(app)
,   environment = ( typeof process.argv[2] != 'undefined' ? process.argv[2] : 'dev')
,   link = {'prod':'config-prod.json', 'dev':'config-dev.json'};

global.configFile = typeof link[environment] != 'undefined' ? link[environment] : link['dev'];
global.paths = { app: __dirname, server: __dirname + '/application/server', views: __dirname + '/application/client/views/' };

module.exports = { app: app, server: server };

app.configure(function(){
    app.engine('ejs', require('ejs-locals'));
    app.set('views', global.paths.views);
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.static(path.join(__dirname, '/application/client/assets')));
});

app.configure('production', function () {
    app.use(express.errorHandler({ dumpExceptions: false, showStack: false }));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var config = require(global.paths.server + '/config/core').init();
require(global.paths.server + '/dependencies')(server, app);

if (!module.parent)
    server.listen(config['node_config'].port, function () {
        console.log('WebApp server listening on port %d in %s mode - [%s]', this.address().port, app.settings.env, environment);
    });