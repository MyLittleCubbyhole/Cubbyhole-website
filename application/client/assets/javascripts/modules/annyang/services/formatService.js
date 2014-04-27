angular.module('Annyang').
	service('AnnyangFormatService', function(){

        var commands = {'bonjour': function() {console.log('passage')}}
        ,   prototype = {};

        prototype.base = function(string) {
            return string.toLowerCase();
        };

        prototype.purals = function(string) {
        	if(string.slice(-1) == 's')
        		string = string.slice(0, -1);
        	return string;
        }

        prototype.email = function(string) {
        	
        }

        return prototype;
    });