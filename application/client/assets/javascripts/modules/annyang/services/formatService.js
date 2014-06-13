angular.module('Annyang').
	service('AnnyangFormatService', function(){

        var prototype = {};

        prototype.base = function(string) {
            return string.toLowerCase();
        };

        prototype.purals = function(string) {
        	if(string.slice(-1) == 's')
        		string = string.slice(0, -1);
        	return string;        }


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

        prototype.specialChars = function(string) {
            return prototype.base(string)
            .replace(/-/g,'')
            .replace(/_/g,'')
            .replace(/'/g,'')
            .replace(/"/g,'');
        }

        prototype.removeExtension = function(string) {

            var itemName = string.split(".");
            var extension = '';
            if(itemName.length !== 1 && (itemName[0] !== "" || itemName.length !== 2) )
                extension = itemName.pop();
            return nameOnly = itemName.join('.');
        }

        prototype.baseFormat = function(string) {
            return prototype.specialChars(prototype.accents(prototype.purals(prototype.base(string))));
        }

        prototype.email = function(string) {

        }

        return prototype;
    });