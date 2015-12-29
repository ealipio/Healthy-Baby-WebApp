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

    $scope.nino = {tipo:3, numero:1000999595};
    $scope.buscarNino = function(nino){
      delete $scope.nino_error;
      delete $scope.nino_ws;
      $http.get('../api/wsByNumero.php?numero='+ nino.numero ).success(function(data) {
            $scope.nino_ws = data;
            console.log($scope.nino_ws);
            var year = $scope.nino_ws.FecNac.substr(0,4);
            var month = $scope.nino_ws.FecNac.substr(4,2);
            var day = $scope.nino_ws.FecNac.substr(6,2);
            $scope.nino_ws.FecNac = year+"-"+month+"-"+day;
            $scope.getVacunas();
        }).error(function(data) { alert("Lo lamento, ocurrio un problema consultando el webservice.")});
    };
  }])
  .controller('VacunarNinoController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.nino = {tipo:3, numero:1000999595};
    $(".js-example-basic-multiple").select2();

    $http.post ('api/getCentros.php')
            .success(function(data) {
                    $scope.Centros = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });


    $scope.getVacunas=function() {
      $http.post ('api/getVacunas.php', { FecNac: $scope.nino_ws.FecNac, NuCnv: $scope.nino_ws.NuCnv })
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
      /*$http({method:'POST',url: 'api/webservice.php?nro_documento='+nino.numero, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log(response);
          if(response.error){
            $scope.nino_error = response;
          } else{
            //
            $scope.nino_ws = response;
            $scope.getVacunas();
          }
      });*/
   $http.post ('../api/ws.php', { id : nino } )
        .success(function(data) {
            $scope.nino_ws = data;
            console.log($scope.nino_ws);
            var year = $scope.nino_ws.FecNac.substr(0,4)
            var month = $scope.nino_ws.FecNac.substr(4,2)
            var day = $scope.nino_ws.FecNac.substr(6,2)
            $scope.nino_ws.FecNac = year+"-"+month+"-"+day

            $scope.getVacunas();
        })
        .error(function(data) {
          alert("error")
                console.log('Error: ' + data);
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

      $scope.nuevaVacuna.dosis.id_nino=$scope.nino_ws.NuCnv;
    };

    $scope.saveVacuna = function(){
      if($scope.nuevaVacuna.dosis.centro_salud){
        $http({method:'POST',url: 'api/crear_vacuna.php', data: $scope.nuevaVacuna.dosis, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            //alert(response);
        });

        $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
      }else{alert("Ingrese el centro de salud");}
    };
      $scope.mostraradicional = function(){
   $scope.adicional={};
      $('ul.tabs').tabs('select_tab', 'info-adicional');
      $scope.adicional.id_nino=$scope.nino_ws.NuCnv;

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