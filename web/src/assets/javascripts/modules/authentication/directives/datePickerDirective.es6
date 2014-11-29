angular.module('Authentication').
    directive('datePicker', [function() {
        return {
            scope: true,
            controller: ['$scope', function($scope) {
                var $local = $scope._datePicker = {}
                ,   self = this;

                $scope.toString = function() {
                    return '_datePicker';
                };
            }],
            require: 'datePicker',
            restrict: 'A',
            link: function($scope, $node, attributes, self) {
                var $local = $scope._datePicker;

                $node.datepicker({
                    dateFormat: 'dd/mm/yy',
                    minDate: null,
                    maxDate: new Date(),
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '-70:+0',
                    prevText: '<i class="icon-chevron-left"></i>',
                    nextText: '<i class="icon-chevron-right"></i>'
                });
            }
        };
    }]);