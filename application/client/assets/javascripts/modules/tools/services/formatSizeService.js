angular.module('Tools').
    service('FormatSizeService', function() {
        this.format = function(input, ceil) {
            var out = "";
            var size = parseInt(input, 10);

            if(isNaN(size)) return "";

            var unit = ["oct","Ko","Mo","Go","To"];
            var i = 0;
            while (size >= 1024) {
                i++;
                size = size/1024;
            };

            if(size == 0)
                out = 0;
            else {
                out = size.toFixed(2);
                out.slice(-1) == "0" ? out = out.slice(0, -1) : out;
                out.slice(-1) == "0" ? out = out.slice(0, -2) : out;
                if(ceil)
                    out = Math.round(parseFloat(out, 10));
            };

            out += ' ' + unit[i];

            return out;
        };

    });