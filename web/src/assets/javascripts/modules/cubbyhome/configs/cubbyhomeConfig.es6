angular.module('CubbyHome').
	config(['apiUrl', 'RestangularProvider', '$sceDelegateProvider', function(apiUrl, restangular, $sceDelegateProvider) {

		restangular.setBaseUrl(apiUrl);

        $sceDelegateProvider.resourceUrlWhitelist([
           'self',
           apiUrl + '**'
        ]);
    }]);