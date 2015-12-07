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
  .filter('estadoFilter', function(){
  return function(id){
    var estados = ['Inactivo', 'Activo'];
      return estados[id];
    };
  })

  .filter('documento', function(){
    return function(input){
      var documento = ["", "DNI", "CUI"];
      return documento[input];
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
      delete $scope.nino_error;
      delete $scope.nino_ws;
      if(nino.numero){
        //alert('Estamos consultando el webservice por favor espere');
      } else {
        alert('Por favor complete todos los campos.');
      }
      // consumir el webservice con esa info
      //http://localhost/minsa/vacunas/api/webservice.php?nro_documento=10360934
      $http({method:'POST',url: 'api/webservice.php?nro_documento='+nino.numero, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log(response);
          if(response.error){
            $scope.nino_error = response;
          } else{
            //
            $scope.nino_ws = response;
          }
      });
    };
  }])
  .controller('VacunarNinoController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.nino = {tipo:1};
    $scope.getVacunas=function() {
      $http.post ('api/getVacunas.php')
            .success(function(data) {
                    $scope.vacunas = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
    }

    $scope.buscarNino = function(nino){
      delete $scope.nino_error;
      delete $scope.nino_ws;
      if(nino.numero){
        //alert('Estamos consultando el webservice por favor espere');
      } else {
        alert('Por favor complete todos los campos.');
      }
      // consumir el webservice con esa info
      //http://localhost/minsa/vacunas/api/webservice.php?nro_documento=10360934
      $http({method:'POST',url: 'api/webservice.php?nro_documento='+nino.numero, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log(response);
          if(response.error){
            $scope.nino_error = response;
          } else{
            //
            $scope.nino_ws = response;
            $scope.getVacunas();
          }
      });
    };
  }]);

})();