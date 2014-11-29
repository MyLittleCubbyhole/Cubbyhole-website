angular.module('Tools').
    filter('numeraljs', function () {
        return function (input, format) {
            if (input == null || input == 0 || format == null)
                return input;
            if (format === '')
                return '';

            return numeral(input).format(format);
        };
    });