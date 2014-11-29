var dependencies;

dependencies = function(server, app) {

	require(global.paths.server + '/routing/core').init(app);
}

module.exports = dependencies;