
angular.module('Tools').
    directive('shapeOver', function(){
        return {
            scope: {},
            restrict: 'A',
            link: function($scope, $node) {
                var speed = 300
                ,   easing = mina.backout;

                var s = Snap( $node.find( 'svg' )[0] )
                ,   path = s.select( 'path' )
                ,   pathConfig = {
                        from : path.attr( 'd' ),
                        to : $node.data()['pathHover']
                    };


                $node.bind( 'mouseenter', function() {
                    path.animate( { 'path' : pathConfig.to }, speed, easing );
                } );

                $node.bind( 'mouseleave', function() {
                    path.animate( { 'path' : pathConfig.from }, speed, easing );
                } );
            }
        };
    });