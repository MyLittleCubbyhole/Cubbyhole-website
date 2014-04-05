angular.module('Filemanager').
    directive('file', ['$parse', 'extension', function($parse, extension) {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: '/templates/file',
            replace: true,
            require: 'file',
            controller: function($scope) {
                var self = this;
                var $local = $scope._file = {};
            },
            link: function($scope, $node, attributes, self) {

                var $local = $scope._file;
                $local.file = $parse(attributes.file)($scope);

                extension.detect($local);
            }
        };
    }]);