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
  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($route.current);
     $scope.$route = $route;
  }])

  .controller('VacunasController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    //
  }])
  .controller('ConsultarController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.nino = {tipo:1};
    $scope.buscarNino = function(nino){
      console.log(nino);
      alert('Estamos consultando el webservice por favor espere');
      // consumir el webservice con esa info
/*
      $http({method:'POST',url: 'api/guardar.php',data:$.param({data: data}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log(response);
          $scope.respuesta = response;
      });
*/
    };
  }])
  .controller('VacunarNinoController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.nino = {tipo:1};
    $scope.buscarNino = function(nino){
      console.log(nino);
      alert('Estamos consultando el webservice por favor espere');
      // consumir el webservice con esa info
/*
      $http({method:'POST',url: 'api/guardar.php',data:$.param({data: data}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log(response);
          $scope.respuesta = response;
      });
*/
    };
  }]);

})();