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
        when('/editar_usuario/:id', {
          templateUrl: 'views/editar_usuario.html',
          caseInsensitiveMatch: true,
          controller: 'EditarUsuarioController',
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
        when('/nueva_contrasena', {
          templateUrl: 'views/nueva_contrasena.html',
          caseInsensitiveMatch: true,
          controller: 'nueva_contrasenaController'
        }).
        when('/editar_vacuna/:id', {
          templateUrl: 'views/editar_vacuna.html',
          caseInsensitiveMatch: true,
          controller: 'EditarVacunaController',
          activetab: 'vacunas'
        }).

        
        
        otherwise({
          redirectTo: '/'
        });

      }]);

})();