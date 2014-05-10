var fs = require('fs')
,	_ = require('lodash')
,	navigation 	= { get: {}, post: {}, put: {}, delete: {}, redirect: {} }
,   http = require(global.paths.server + '/features/tools/http/core')
,	options	= {
		angular: {}, headers: {}, fonts: {}, content: {}, footer: {},
		javascripts: {
			libraries: '../partials/ejs/javascripts/libraries.ejs',
			features: '../partials/ejs/javascripts/features.ejs',
			core: ''
		}
	};

/********************************[    GET   ]********************************/

navigation.get.index = function(request, response) {
	options.angular = { module: 'CubbyHome', controller: 'CubbyHomeController'};
	options.headers = { title: 'Accueil', description: 'Cubbyhole' };
	options.javascripts.core = '../partials/ejs/javascripts/core/home.ejs';
	response.render('home', options);
}

navigation.get.activation = function(request, response) {
	var query = request.query;

    var token = query.token || 0;
    token = encodeURIComponent(token);

    if(token) {
        http.activation(token, function(result) {
            if(result == 200) {
                response.redirect('/authentication#/confirmation');
            }
            else
                response.redirect('/');
        });
    } else
        response.redirect('/');
}

navigation.get.authentication = function(request, response) {
	options.angular = { module: 'Authentication', controller: 'AuthenticationController' };
	options.headers = { title: 'Authentification', description: 'Cubbyhole' };
	options.javascripts.core = '../partials/ejs/javascripts/core/authentication.ejs';
	response.render('authentication', options);
}

navigation.get.account = function(request, response) {
    options.angular = { module: 'Account', controller: 'AccountController' };
    options.headers = { title: 'Gestionnaire de compte', description: 'Cubbyhole' };
    options.javascripts.core = '../partials/ejs/javascripts/core/account.ejs';
    response.render('account', options);
}

navigation.get.filemanager = function(request, response) {
	options.angular = { module: 'CubbyHole', controller: 'CubbyHoleController' };
	options.headers = { title: 'Gestionnaire de fichier', description: 'Cubbyhole' };
	options.javascripts.core = '../partials/ejs/javascripts/core/filemanager.ejs';
	response.render('fileManager', options);
}

navigation.get.shared = function(request, response) {
    options.angular = { module: 'Sharing', controller: 'SharingController' };
    options.headers = { title: 'Fichier partagé', description: 'Cubbyhole' };
    options.javascripts.core = '../partials/ejs/javascripts/core/shared.ejs';
    response.render('shared', options);
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