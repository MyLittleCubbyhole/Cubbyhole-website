angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {}
        ,   prototype = {};

        prototype.addCallback = function(type, callback, context) {
            if(annyang)
                annyang.addCallback(type, callback, context);
        }

        prototype.set = function(commandName, callback) {
            commands[ConfigFactory[commandName]] = callback;
        };

        prototype.submitCommands = function() {
            if(annyang) {
                annyang.removeAll();
                annyang.debug();
                annyang.addCommands(commands);
            }
        };

        prototype.start = function() {
            prototype.submitCommands();
            if(annyang)
                annyang.start();
        };

        prototype.stop = function() {
            if(annyang)
                annyang.abort();
        };

        return prototype;
    }]);