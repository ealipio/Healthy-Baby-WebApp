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

  .filter('negativo', function(){
  return function(id){
    var valor= id*(-1);

      return valor;
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
    $route.current.activetab ? $scope.$route = $route : null
    
    $scope.nino = {tipo:1, numero:10360934};
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
    $scope.nino = {tipo:1, numero:10360934};
    
    $scope.getVacunas=function() {
      $http.post ('api/getVacunas.php', { fecha_nacimiento: $scope.nino_ws.fecha_nac, id_nino: $scope.nino_ws.nro_documento })
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

    $scope.realizarRegistro = function(nene){
      console.log(nene);
      $http({method:'POST',url: 'api/realizar-registro.php', data: $.param({data:nene}),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          //console.log(response);
      });
    };

    $scope.crear_vacuna = function(dosis, vacuna){
      $scope.nuevaVacuna ={};
      $('ul.tabs').tabs('select_tab', 'crear-vacuna');
      $scope.nuevaVacuna.dosis = dosis;
      $scope.nuevaVacuna.vacuna = vacuna;
      
      $scope.nuevaVacuna.dosis.id_nino=$scope.nino_ws.nro_documento;
    };

    $scope.saveVacuna = function(){
      
      //console.log($scope.nuevaVacuna.dosis);

      $http({method:'POST',url: 'api/crear_vacuna.php', data: $scope.nuevaVacuna.dosis, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          //alert(response);
      });

      $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');

    };
      $scope.mostraradicional = function(){
   $scope.adicional={};
      $('ul.tabs').tabs('select_tab', 'info-adicional');
      $scope.adicional.id_nino=$scope.nino_ws.nro_documento;
      
    };
      $scope.cancel = function(){
      $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
     
    };

      $scope.saveadicional =function(adicional){

      console.log(adicional);

       $http.post('api/addAdicional.php', { datos:adicional } )
        .success(function(data) {
                console.log(data);
                   $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
            })
        .error(function(data) {
                console.log('Error: ' + data);
                 alert("no succes");
        });
     };

  }])

  .controller('InfoAdicionalController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($routeParams);
    
  }])

  .controller('logoutController',['$scope', '$route','$http', function($scope, $route, $http){

    $scope.salir = function(){
         $http.post('api/logout.php')
            .success(function(data) {
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
                     //alert("no succes");
            });
          };
  }])

;

})();