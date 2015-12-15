(function(){

'use strict';

var app = angular.module('eissonApp', [
  'ngRoute',
  'ngAnimate',
  'angular-loading-bar',
  'ui.materialize',
  'angularMoment',
  'Controllers',
  'uiGmapgoogle-maps']);



    app.config(['$routeProvider', 'cfpLoadingBarProvider' , function($routeProvider, cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeSpinner   = true;
      cfpLoadingBarProvider.latencyThreshold = 1;


      $routeProvider.
        when('/consultar', {
          templateUrl: 'views/consultar.html',
          caseInsensitiveMatch: true,
          controller: 'ConsultarController',
          activetab: 'consultar'
        }).
        when('/vacunas', {
          templateUrl: 'views/vacunas.html',
          caseInsensitiveMatch: true,
          controller: 'VacunasController',
          activetab: 'vacunas'
        }).
        when('/centros', {
          templateUrl: 'views/centros.html',
          caseInsensitiveMatch: true,
          controller: 'CentrosController',
          activetab: 'centros'
        }).
        when('/acerca', {
          templateUrl: 'views/acerca.html',
          caseInsensitiveMatch: true,
          controller: 'AcercaController',
          activetab: 'acerca'
        }).
        when('/login', {
          templateUrl: 'views/login.html',
          caseInsensitiveMatch: true,
          controller: 'LoginController',
          activetab: 'login'
        }).
        otherwise({
          redirectTo: '/acerca'
        });

      }])
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          //    key: 'your api key',
          v: '3.17',
          libraries: 'weather,geometry,visualization'
      });
  });

})();