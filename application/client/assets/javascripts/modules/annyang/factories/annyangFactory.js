angular.module('Annyang').
    factory('AnnyangFactory', function() {

        var commands = {};


        /**
         * mutualisation de service
         * les parametres de context sont placés dans le premier appel
         * on peut ainsi attaquer un scope annexe a partir d'un appel local
         *
         * ex: fileExtension($scope, {local: $local, controller: self}).maMethode('parameters', {une config})
         *
         * @param  {$scope} scope   angular scope
         * @param  {object} context [OPTIONAL] specification du context - peut contenir refs vers $local, $node et controller
         */
        return function($scope, context) {
            context = context || {};

            if(!$scope)
                throw 'a scope must be defined ';

            var prototype = {}
            ,   $node = context.node || {}
            ,   $local = context.local || {}
            ,   controller = context.controller || {};

            prototype.set = function(commandName, callback) {
                commands[commandName] = callback;
            }

            prototype.submitCommand = function() {
                annyang.removeAll();
                annyang.addCommand(commands);
            }

            prototype.start = function() {
                annyang.start();
            }

            prototype.stop = function() {
                annyang.abort();
            }

            return prototype;

        };
    });