var fs = require('fs')
,	_ = require('lodash')
,	navigation 	= { get: {}, post: {}, put: {}, delete: {}, redirect: {} }
,   http = require(global.paths.server + '/features/tools/http/core')
,   config = require(global.paths.server + '/config/core').get()
,	options	= {
		environment: global.environment,
		angular: {}, headers: {}, fonts: {}, content: {}, footer: {},
		javascripts: {
			libraries: '../partials/ejs/javascripts/libraries.ejs',
			features: '../partials/ejs/javascripts/features.ejs',
			core: ''
		}
	};

var formRegisterUrl = config['webservice'].protocol + '//'
    + config['webservice'].host + ':'
    + config['webservice'].port
    + '/api/users?redirect='
    + encodeURIComponent(config['web'].protocol + '//'
    + config['web'].host + ':'
    + config['web'].port + '/home#login');

/********************************[    GET   ]********************************/

navigation.get.index = function(request, response) {
	options.angular = { module: 'CubbyHome', controller: 'CubbyHomeController'};
	options.headers = { title: 'Index', description: 'Cubbyhole - Index' };
	options.javascripts.core = '../partials/ejs/javascripts/core/home.ejs';
    options.formRegisterUrl = formRegisterUrl;
	response.render('home', options);
}

navigation.get.activation = function(request, response) {
	var query = request.query;

    var token = query.token || 0;
    token = encodeURIComponent(token);

    if(token) {
        http.activation(token, function(result) {
            if(result == 200) {
                response.redirect('/home#/confirmation');
            }
            else
                response.redirect('/');
        });
    } else
        response.redirect('/');
}

navigation.get.account = function(request, response) {
    options.angular = { module: 'Account', controller: 'AccountController' };
    options.headers = { title: 'Account Management', description: 'Cubbyhole - Account Management' };
    options.javascripts.core = '../partials/ejs/javascripts/core/account.ejs';
    response.render('account', options);
}

navigation.get.filemanager = function(request, response) {
	options.angular = { module: 'CubbyHole', controller: 'CubbyHoleController' };
	options.headers = { title: 'File Manager', description: 'Cubbyhole - File Manager' };
	options.javascripts.core = '../partials/ejs/javascripts/core/filemanager.ejs';
	response.render('fileManager', options);
}

navigation.get.shared = function(request, response) {
    options.angular = { module: 'Sharing', controller: 'SharingController' };
    options.headers = { title: 'Shared file', description: 'Cubbyhole - Shared File' };
    options.javascripts.core = '../partials/ejs/javascripts/core/shared.ejs';
    response.render('shared', options);
}

navigation.get.admin = function(request, response) {
    options.angular = { module: 'Administration', controller: 'AdministrationController' };
    options.headers = { title: 'Administration', description: 'Cubbyhole - Administration' };
    options.javascripts.core = '../partials/ejs/javascripts/core/admin.ejs';
    response.render('admin', options);
}

navigation.get.partial = function(request, response) {
	var path = 'partials/ejs/' + request.params[0] + '.ejs';
	var fullpath = global.paths.views + '/' + path;
	path = fs.existsSync(fullpath) ? path : '404.ejs';
	response.render(path);
}

navigation.get.template = function(request, response) {
	var path = 'partials/angular/' + request.params[0] + '.ejs';
	var fullpath = global.paths.views + '/' + path;
	path = fs.existsSync(fullpath) ? path : '404.ejs';
	response.render(path);
}

/********************************[   POST   ]********************************/
/********************************[   PUT    ]********************************/
/********************************[  DELETE  ]********************************/
/********************************[  DELETE  ]********************************/

navigation.redirect.home = function(request, response) {
	response.redirect('/home');
}

module.exports = navigation;