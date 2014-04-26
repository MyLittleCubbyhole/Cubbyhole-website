angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {'bonjour': function() {console.log('passage')}}
        ,   prototype = {};

        prototype.set = function(commandName, callback) {
            commands[ConfigFactory[commandName]] = callback;
        };

        prototype.submitCommands = function() {
            annyang.removeAll();
            annyang.debug();
            annyang.addCommands(commands);
        };

        prototype.start = function() {
            prototype.submitCommands();
            annyang.start();
        };

        prototype.stop = function() {
            annyang.abort();
        };

        return prototype;
    }]);