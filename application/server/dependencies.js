var dependencies;

dependencies = function(app, server) {

	require('./routing/core')(server, app);

}

module.exports = dependencies;