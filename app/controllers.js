/**
 * List Controller
 * @version v0.2.2 - 2015-04-23 * @link http://csluni.org
 * @author Eisson Alipio <eisson.alipio@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
  'use strict';

  angular
  .module('Controllers', [])

  .controller('HomeController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      //console.log($route.current.activetab);
      $route.current.activetab ? $scope.$route = $route : null
    }])
  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($route.current);
     $scope.$route = $route;
  }])
  .controller('VacunasController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('CentrosController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('AcercaController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('LoginController',['$scope', '$http', function($scope, $http){
      $scope.loginProcess = function(){
        window.location="/minsa/administracion";
      };
  }])


})();