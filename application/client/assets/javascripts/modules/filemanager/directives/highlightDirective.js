angular.module('FileManager').
    directive('highlight', function(){
        return {
            scope: true,
            restrict: 'A',
            require: 'highlight',
            controller: function($scope) {

            },
            link: function($scope, $node, attributes, self) {
                hljs.highlightBlock($node.children()[0]);
            }
        };
    });