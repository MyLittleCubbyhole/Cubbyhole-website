angular.module('Account').
    directive('donutchart', ['DonutChartProvider', '$parse', '$window', function(DonutChart, $parse, $window) {
        return {
            scope: true,
            restrict: 'E',
            controller: ['$scope', function($scope){
                var $local = $scope._donutChart = {};

                $local.sizeAvailable = '';
                $local.sizeText = '';

                $local.chart = new DonutChart({});

                $scope.toString = function() {
                    return '_donutChart';
                }
            }],
            template:
                '<section>'
            +       '<highchart config="_donutChart.chart"></highchart>'
            +       '<article class="leftPanel">'
            +           '<article class="topPanel">'
            +               '<article class="chart-label-primary google-font">'
            +                   '{{_donutChart.sizeAvailable}}'
            +                   '<article class="chart-label-secondary google-font">{{_donutChart.sizeText}}</article>'
            +               '</article>'
            +           '</article>'
            +       '</article>'
            +   '</section>',
            replace: true,
            link: function($scope, $node, attributes) {
                var $local = $scope._donutChart;

                $local.sizeAvailable = attributes.sizeAvailable;
                $local.sizeText = attributes.sizeText;
                $local.chart.series[0].name = 'Taille';
                $local.chart.series[0].data = $parse(attributes.data)($scope);
                $local.chart.title.text = attributes.title;
                $local.chart.subtitle.text = attributes.subtitle;

                angular.element($window).trigger('resize');

            }
        };
    }]);