var fs = require('fs');
var navigation 	= { get: {}, post: {}, put: {}, delete: {} }
,	options	= {
		headers: { title: 'Accueil', description: 'CubbyHole' }
	,	fonts: {}
	,	javascripts: { libraries: '../partials/ejs/javascripts/libraries.ejs', features: '../partials/ejs/javascripts/features.ejs' }
	,	content: {}
	,	footer: {}
	};

/********************************[    GET   ]********************************/

navigation.get.index = function(request, response) {
	response.render('index', options);
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

module.exports = navigation;