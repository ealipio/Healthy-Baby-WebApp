(function(){

'use strict';

var app = angular.module('eissonApp', [
  'ngRoute',
  'ngAnimate',
  'angular-loading-bar',
  'ui.materialize',
  'Controllers']);

    app.config(['$routeProvider', 'cfpLoadingBarProvider',function($routeProvider, cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeSpinner   = true;
      cfpLoadingBarProvider.latencyThreshold = 1;

      $routeProvider.

        when('/vacunas', {
          templateUrl: 'views/crear-vacuna.html',
          caseInsensitiveMatch: true,
          controller: 'VacunasController',
          activetab: 'vacunas'
        }).
        when('/consultar', {
          templateUrl: 'views/consultar.html',
          caseInsensitiveMatch: true,
          controller: 'ConsultarController',
          activetab: 'Consultar'
        }).
        when('/vacunar-nino', {
          templateUrl: 'views/vacunar-nino.html',
          caseInsensitiveMatch: true,
          controller: 'VacunarNinoController',
          activetab: 'vacunar'
          }).
        when('/adicional/:id', {
          templateUrl: 'views/info-adicional.html',
          caseInsensitiveMatch: true,
          controller: 'InfoAdicionalController',
          activetab: 'vacunar'
        }).
        otherwise({
          redirectTo: '/vacunar-nino'
        });

      }]);

})();