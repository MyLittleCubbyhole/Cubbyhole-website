angular.module('FileManager').
    filter('ItemSizeFilter', function() {
        return function(input) {
            var out = "";
            var size = parseInt(input);
            if (isNaN(size)) return "";
            var unit = ["oct","Ko","Mo","Go","To"];
            var i = 0;
            while (size >= 1024) {
                i++;
                size = size/1024;
            }
            out = (size==0?0:size.toFixed(2) )+ ' ' + unit[i];
            return out;
        }
    });