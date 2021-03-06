angular.module('FileManager').
    directive('highlight', function(){
        return {
            scope: true,
            restrict: 'A',
            require: 'highlight',
            controller: ['$scope', function($scope) {
                var $local = $scope._highlight = {};

            }],
            link: function($scope, $node, attributes, self) {
                var $local = $scope._highlight;
                $local.node = $node;

                if(!attributes.highlight)
                    throw 'An highlight resource must be defined';

                /**
                 * LISTENER - called when the highlight method is updated
                 * @param  {Object} data 
                 */
                $scope.$watch(attributes.highlight, function(data) {
                    var pre = angular.element('<pre>');
                    if(typeof data == 'object')
                        pre.text(JSON.stringify(data));
                    else
                        pre.text(data);

                    hljs.highlightBlock(pre[0]);
                    $node.html(pre);
                });
            }
        };
    });