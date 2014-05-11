  /*jslint node: true */
/*global ZeroClipboard */
'use strict';

angular.module('ngClipboard', []).
  provider('ngClip', function() {
    var self = this;
    this.path = '/flash/ZeroClipboard.swf';
    return {
      setPath: function(newPath) {
       self.path = newPath;
      },
      $get: function() {
        return {
          path: self.path
        };
      }
    };
  }).
  run(['ngClip', function(ngClip) {
    ZeroClipboard.config({
      moviePath: ngClip.path,
      trustedDomains: ["*"],
      allowScriptAccess: "always",
      forceHandCursor: true
    });
  }]).
  directive('clipCopy', ['ngClip', '$window', function (ngClip, $window) {
    return {
      scope: {
        clipCopy: '&',
        clipClick: '&'
      },
      restrict: 'A',
      link: function (scope, element, attrs) {
        var clip = new ZeroClipboard(element)
        ,   clipAnimation = attrs.clipAnimation || 'clipAnimation'
        ,   clipTimer = parseFloat(attrs.clipTimer) || 200
        ,   clipTarget = attrs.clipClassTarget ? element.find('.'+attrs.clipClassTarget) : element
        ,   timer = null;
        if (attrs.clipCopy == "") {
          scope.clipCopy = function(scope) {
            return element[0].previousElementSibling.innerText;
          };
        }
        clip.on( 'load', function(client) {

          var onDataRequested = function (client) {
            $window.clearTimeout(timer);
            clipTarget.addClass(clipAnimation);
            timer = $window.setTimeout(function() {
              console.log('stop')
              clipTarget.removeClass(clipAnimation);
            }, clipTimer)

            client.setText(scope.$eval(scope.clipCopy));
            if (angular.isDefined(attrs.clipClick)) {
              scope.$apply(scope.clipClick);
            }
          };
          client.on('dataRequested', onDataRequested);

          scope.$on('$destroy', function() {
            client.off('dataRequested', onDataRequested);
            client.unclip(element);
          });
        });
      }
    };
  }]);