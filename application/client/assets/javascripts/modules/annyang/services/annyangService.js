angular.module('Annyang').
    service('AnnyangService', ['ConfigFactory', function(ConfigFactory){

        var commands = {}
        ,   prototype = {};

        /**
         * add a new callback to the annyang command
         * @param {string}   type     method
         * @param {Function} callback 
         * @param {string}   context  annyang context
         */
        prototype.addCallback = function(type, callback, context) {
            if(annyang)
                annyang.addCallback(type, callback, context);
        }

        /**
         * set a specific command and add to it a new callback
         * @param {string}   commandName command
         * @param {Function} callback    
         */
        prototype.set = function(commandName, callback) {
            commands[ConfigFactory[commandName]] = callback;
        };

        /**
         * submit all commands
         */
        prototype.submitCommands = function() {
            if(annyang) {
                annyang.removeAll();
                annyang.debug();
                annyang.addCommands(commands);
            }
        };

        /**
         * start annyang service
         */
        prototype.start = function() {
            prototype.submitCommands();
            if(annyang)
                annyang.start();
        };

        /**
         * stop annyang service
         */
        prototype.stop = function() {
            if(annyang)
                annyang.abort();
        };

        return prototype;
    }]);