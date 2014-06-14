angular.module('Annyang').
	service('AnnyangFormatService', function(){

        var prototype = {};

        prototype.base = function(string) {
            return string.toLowerCase();
        };


        /**
         * remove the last char of the string when it's a "s"
         * @param  {string} string string
         */
        prototype.plurals = function(string) {
        	if(string.slice(-1) == 's')
        		string = string.slice(0, -1);
        	return string;
        }

        /**
         * remove all accent in a string
         * @param  {string} string string
         */
        prototype.accents = function(string) {
            return prototype.base(string)
            .replace(/\s/g,'')
            .replace(/[àáâãäå]/g,'a')
            .replace(/æ/g,'ae')
            .replace(/ç/g,'c')
            .replace(/[èéêë]/g,'e')
            .replace(/[ìíîï]/g,'i')
            .replace(/ñ/g,'n')
            .replace(/[òóôõö]/g,'o')
            .replace(/œ/g,'oe')
            .replace(/[ùúûü]/g,'u')
            .replace(/[ýÿ]/g,'y');
        }

        /**
         * remove all special character from a string
         * @param  {string} string string
         */
        prototype.specialChars = function(string) {
            return prototype.base(string)
            .replace(/-/g,'')
            .replace(/_/g,'')
            .replace(/'/g,'')
            .replace(/"/g,'');
        }

        /**
         * remove the extension of the string
         * @param  {string} string string
         */
        prototype.removeExtension = function(string) {

            var itemName = string.split(".");
            var extension = '';
            if(itemName.length !== 1 && (itemName[0] !== "" || itemName.length !== 2) )
                extension = itemName.pop();
            return nameOnly = itemName.join('.');
        }

        /**
         * call all formatting method
         * @param  {string} string string
         */
        prototype.baseFormat = function(string) {
            return prototype.specialChars(prototype.accents(prototype.plurals(prototype.base(string))));
        }

        return prototype;
    });