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

  .filter('tipoCategoria', function(){
    return function(input){
      var estados = ["", "Bien de Capital", "Insumo", "Servicio"];
      return estados[input];
    };
  })
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
    //
  }]);

})();