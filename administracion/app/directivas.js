(function(){
	'use strict';
	angular.module('Directivas', [])

	.directive('navBar', function(){
		return {
			restrict: 'C',
			templateUrl: 'views/directives/navBar.html',
			controller: 'navBarCtrl'
		};
	})

	.directive('aDisabled', function() {
	    return {
	        compile: function(tElement, tAttrs, transclude) {
	            //Disable ngClick
	            tAttrs["ngClick"] = "!("+tAttrs["aDisabled"]+") && ("+tAttrs["ngClick"]+")";

	            //return a link function
	            return function (scope, iElement, iAttrs) {

	                //Toggle "disabled" to class when aDisabled becomes true
	                scope.$watch(iAttrs["aDisabled"], function(newValue) {
	                    if (newValue !== undefined) {
	                        iElement.toggleClass("disabled", newValue);
	                    }
	                });

	                //Disable href on click
	                iElement.on("click", function(e) {
	                    if (scope.$eval(iAttrs["aDisabled"])) {
	                        e.preventDefault();
	                    }
	                });
	            };
	        }
	    };
	})


	.directive('backToBack', ['$window', function($window) {
	  return function link(scope, element) {
	    element.on('click', function(event) {
	      //$location.hash('');
	      $window.history.back();
	      //scope.$apply($anchorScroll);
	    });
	  };
	}])

	.directive('backToForward', ['$window', function($window) {
	  return function link(scope, element) {
	    element.on('click', function(event) {
	      $window.history.forward();
	    });
	  };
	}]);


})();