angular.module('FileManager').
    directive('modal', [function() {
        return {
            scope: true,
            controller: function($scope) {
                var $local = $scope._modal = {}
                ,   self = this;

                $local.close = function() {
                    $scope.Overlay.clickout();
                    $scope.FileManager.urlSharing = null;
                    $local.folderSharing = false;
                }

                $scope.toString = function() {
                    return '_modal';
                }
            },
            require: 'modal',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._modal;

                $local.node = $node;
            }
        };
    }]);