angular.module('Tools').
    filter('ItemSizeFilter', ['FormatSizeService', function(FormatSizeService) {
        return function(input) {
            return FormatSizeService.format(input);
        };
    }]);