angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {}
        ,   prototype = {};

        prototype.set = function(commandName, callback) {
            if(!annyang)
                return true;
            
            commands[ConfigFactory[commandName]] = callback;
        };

        prototype.submitCommands = function() {

            if(!annyang)
                return true;
            
            annyang.removeAll();
            annyang.debug();
            annyang.addCommands(commands);
        };

        prototype.start = function() {

            if(!annyang)
                return true;
            
            prototype.submitCommands();
            annyang.start();
        };

        prototype.stop = function() {

            if(!annyang)
                return true;
            
            annyang.abort();
        };

        return prototype;
    }]);