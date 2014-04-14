var fs = require('fs')
,	_ = require('lodash')
,	navigation 	= { get: {}, post: {}, put: {}, delete: {}, redirect: {} }
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
	response.render('index', options);
}

navigation.get.filemanager = function(request, response) {
	options.angular = { module: 'CubbyHole', controller: 'CubbyHoleController' };
	options.headers = { title: 'Gestionnaire de fichier', description: 'Cubbyhole' };
	options.javascripts.core = '../partials/ejs/javascripts/core/filemanager.ejs';
	response.render('fileManager', options);
}

navigation.get.partial = function(request, response) {
	var path = 'partials/angular/' + request.params[0] + '.ejs';
	var fullpath = global.paths.views + '/' + path;
	path = fs.existsSync(fullpath) ? path : '404.ejs';
	response.render(path);
}

navigation.get.template = function(request, response) {
	var path = 'templates/' + request.params[0] + '.ejs';
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