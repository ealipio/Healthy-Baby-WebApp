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
        
        when('/', {
          templateUrl: 'views/usuarios.html',
          caseInsensitiveMatch: true,
          controller: 'UsuariosController',
          activetab: 'usuarios'
        }).
        when('/nuevo_usuario', {
          templateUrl: 'views/nuevo_usuario.html',
          caseInsensitiveMatch: true,
          controller: 'NuevoUsuarioController',
          activetab: 'usuarios'
        }).
        when('/vacunas', {
          templateUrl: 'views/vacunas.html',
          caseInsensitiveMatch: true,
          controller: 'VacunasController',
          activetab: 'vacunas'
        }).
        when('/nueva_vacuna', {
          templateUrl: 'views/nueva_vacuna.html',
          caseInsensitiveMatch: true,
          controller: 'NuevaVacunaController',
          activetab: 'vacunas'
        }).

        
        
        otherwise({
          redirectTo: '/'
        });

      }]);

})();