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
  .filter('juntoAslash', function(){
    return function(input){
    var year = input.substr(0,4);
    var meses = input.substr(4,2);
    var dias = input.substr(6,2);
    var retorno= dias+"/"+meses+"/"+year;
      return retorno;
    };
  })
 .filter('primeraMayuscula', function(){
    return function(input){

      if(input == null){
        var retorno = "-";
      }
      else{
    var primera = input.substr(0,1);
    var porcion = input.substring(1);
    primera = primera.toUpperCase();
    var retorno= primera+porcion;
      return retorno;}
    };
  })


  .filter('documento', function(){
    return function(input){
      var documento = ["", "DNI", "CUI"];
      return documento[input];
    };
  })
    .filter('filterNoData', function(){
    return function(input){
      if(input == null){
        var retorno = "-";
      }
      else{
        var retorno = input;
      }
      return retorno;
    };
  })
 .filter('filterNutrientes', function(){
    return function(input){
      if(input==0){
        var retorno = "No Entregado";
      }
      else if(input==1){
        var retorno = "Entregado";
      }
      
      return retorno;
    };
  })
  
 .filter('filterFecha', function(){
    return function(input){
      if(input<12){
        var retorno = input.toString()+" meses";
      }
      else{
        var years = Math.floor(input/12);
        var resto = input%12;
        if(resto==0){
          if(years==1){
            var retorno = years.toString()+" año";}
            else{
          var retorno = years.toString()+" años";}
        }
        else{
          if(years==1){
            var retorno = years.toString()+" año y "+resto.toString()+" meses";}
            else{
          var retorno = years.toString()+" años  y "+resto.toString()+" meses";}
        }
      }

      return retorno;
    };
  })

 .filter('edadOrdenada', function(){
    return function(input){
   if(input){
       /*var year = (input/365).toFixed();
       var meses = ((input%365).toFixed()/30).toFixed();
       var dias= ((input%365).toFixed()%30);*/

      var year = Math.floor((input/365));
       var meses = Math.floor(((input%365).toFixed()/30));
       var dias= Math.floor(((input%365).toFixed()%30));

       ///alert(((input%365).toFixed()/30).toFixed());
       if(year==0){
          if(meses==0){
            var retorno = dias+" días";
               }
               else if(meses==1){
            var retorno = meses+" mes y "+dias+" días";
               }
               else{
                var retorno = meses+" meses y "+dias+" días";
               }
        }
        else if(year==1){
          if(meses==0){
            var retorno = year+" año y "+ dias+" días";
           }
           else if(meses==1){
              var retorno = year+" año, "+meses+" mes y "+dias+" días";
           }
             else{
                var retorno = year+" año, "+meses+" meses y "+dias+" días";
             }
       }
       else{
             if(meses==0){
            var retorno = year+" años y "+ dias+" días";
               }
               else if(meses==1){
            var retorno = year+" años, "+meses+" mes y "+dias+" días";
               }
               else{
                var retorno = year+" años, "+meses+" meses y "+dias+" días";
               }
       }
          return retorno;
    }

      else {return 0;}
    };
  })
  .filter('sexoFilter', function(){
    return function(input){
      var sexo = "Masculino";
      if(input == "F"){
        sexo = "Femenino";
      }
      return sexo;
    };
  })

  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
     $scope.$route = $route;
  }])

  .controller('VacunasController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    //
  }])
    .controller('nueva_contrasenaController',['$scope', '$http', function($scope, $http){
    
    $scope.update = function(user){
      if(user.nuevaContra==user.contraActual){
           Materialize.toast('La nueva contraseña debe ser diferente', 3000);
      }
      else{
         $http.post('api/nuevaContra.php', {datos :user})
          .success(function(data) {
              //$scope.cambioContra=data;
              //console.log(data);
              if(data.success){
                Materialize.toast('Contraseña actualizada exitosamente', 3000);
                location.href=location.protocol+"//"+location.hostname+location.pathname+"#/vacunar-nino";
              }
              else {
                Materialize.toast(data.error, 3000);
                //location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
              }
           })
            .error(function(data) {
              //console.log('Error: ' + data);
            });
      }    
    };
    
  }])

  .controller('VacunarNinoController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.nino = {tipo:'', numero:''};
    $http.post ('api/getCentros.php').success(function(data) { $scope.Centros = data; });
    
    $scope.getVacunas=function() {
      $http({method:'POST',url: 'api/getVacunas.php', data: $.param({data:$scope.nino_ws}),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        $scope.vacunas = response;
        //console.log($scope.vacunas);
      });
    };
    $scope.VerNino = function(nino, index){
          $scope.showNinos=true;
          $scope.nino_ws = nino;

          var year = nino.FecNac.substr(0,4);
          var month = nino.FecNac.substr(4,2);
          var day = nino.FecNac.substr(6,2);
          $scope.nino_ws.FechaNac = year+"-"+month+"-"+day;

          //console.log($scope.nino_ws);

          $scope.showNino_ws=true;
          $scope.getVacunas();
    };

    $scope.buscarNino = function(nino){
      $scope.nino2=nino;
      $scope.showNinos=true;
      $scope.showNino_ws=false;

      delete $scope.nino_error;
      delete $scope.nino_ws;
      //consultar desde WS minsa
      //$http.get('../api/wsByNumero.php?numero='+ nino.numero ).success(function(data) {

      //consultar desde esdeporvida 

      if(nino["tipo"]==1 && nino.numero!='' && nino.numero>0){

      $http.get('../api/ws1.php?numero='+ nino.numero ).success(function(data) {
        if(data.success) {
            $scope.nino_ws = data.success;
            //console.log($scope.nino_ws);
            
            var year = $scope.nino_ws.FecNac.substr(0,4);
            var month = $scope.nino_ws.FecNac.substr(4,2);
            var day = $scope.nino_ws.FecNac.substr(6,2);          
            $scope.nino_ws.FechaNac = year+"-"+month+"-"+day;

            $scope.getVacunas();
          } else { Materialize.toast(data.error, 4000); }
        });}
       else if (nino["tipo"]==2 && nino.numero!='' && nino.numero>0){
                $http.post ('api/getNinoByDni.php', { id_nino: nino["numero"] })
                .success(function(data) {
                    if(data.success) {
                      $scope.nino_ws = data.success;
                      //console.log(data.success);
                      $scope.nino_ws.NuCnv = $scope.nino_ws.nro_documento;
                      $scope.nino_ws.FechaNac = $scope.nino_ws.fecha_nac;
                      $scope.nino_ws.Sexo = $scope.nino_ws.sexo;

                      $scope.getVacunas();
                    } else { Materialize.toast(data.error, 4000); }
                  })
                  .error(function(data) {
                          //console.log('Error: ' + response);
                  });
          }
          else if (nino["tipo"]==3 && nino.numero!='' && nino.numero>0){
             //$http.get('../api/wsByDniMadre.php?numero='+ nino.numero ).success(function(data) {
             $http.get('../api/wsByDniMadre_2.php?numero='+ nino.numero ).success(function(data) { 
               if(data.success){
                  if(data.success.length){

                    $scope.ninos_mama = data.success;
                    //console.log($scope.ninos_mama);
                    $scope.showNinos=false;
                    $scope.showNino_ws=true;
                  }else{

                    $scope.ninos_mama = [{'0':''}];
                    $scope.ninos_mama[0] = data.success;
                    //console.log(data.success);
                    $scope.showNinos=false;
                    $scope.showNino_ws=true;
                  }
                }
                else{
                  Materialize.toast(data.error, 4000);
                }

            }).error(function(data) {
              Materialize.toast('Error, ocurrio un problema consultando el webservice.', 4000);
              $scope.finalizar=false;
            });
          } else{
              Materialize.toast('Por favor complete todos los datos.', 4000);
          }
    };

    $scope.realizarRegistro = function(nene){
      //console.log(nene);
      $http({method:'POST',url: 'api/realizar-registro.php', data: $.param({data:nene}),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) { });
    };

    $scope.crear_vacuna = function(dosis, vacuna){
      var d = new Date();
      $scope.nuevaVacuna ={};
      $('ul.tabs').tabs('select_tab', 'crear-vacuna');

      
      $scope.nuevaVacuna.dosis = dosis;
      $scope.nuevaVacuna.vacuna = vacuna;
      $scope.nuevaVacuna.dosis.fecha_vacunacion=d;
      $scope.nuevaVacuna.dosis.id_nino=$scope.nino_ws.NuCnv;
      $scope.getCentroUsuario();
    };

    $scope.saveVacuna = function(){
      if($scope.nuevaVacuna.dosis.centro_salud){
        $http({method:'POST',url: 'api/crear_vacuna.php', data: $scope.nuevaVacuna.dosis, headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          //
        });
        $scope.buscarNino($scope.nino2);
        $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
      }else{Materialize.toast('Error, Ingrese el centro de salud.', 3000);}
    };
      $scope.mostraradicional = function(){
        var d = new Date();
        $scope.adicional={};
        $('ul.tabs').tabs('select_tab', 'info-adicional');
        $scope.adicional.id_nino=$scope.nino_ws.NuCnv;
        $scope.adicional.fecha_medicion = d;
    };
      $scope.cancel = function(){
      $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
    };

   $scope.getCentroUsuario = function(){
      $http.post ('api/getCentroUsuario.php')
          .success(function(data) {
                  $scope.nuevaVacuna.dosis.centro_salud = data[0]["centro_salud"];
                  ////console.log(data[0]["centro_salud"]);
              })
          .error(function(data) {
                  //console.log('Error: ' + data);
          });
    };

 $scope.verInfoAdicional = function(){
      $('ul.tabs').tabs('select_tab', 'ver-info-adicional');
       $('html,body').animate({
                scrollTop: $("#vistaInfo").offset().top
                }, 1000);
      $http.post ('../api/getInfoAdicional.php', { NuCnv: $scope.nino_ws.NuCnv })
          .success(function(data) {
                  $scope.InfoAdicional = data;
                  ////console.log(data);
              })
          .error(function(data) {
                  //console.log('Error: ' + data);
          });

    };
    $scope.tablaVacunacion=function() {
       $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
         $('html,body').animate({
              scrollTop: $("#vistaInfo").offset().top
          }, 1000);
    };

      $scope.saveadicional = function(adicional) {
       $http.post('api/addAdicional.php', { datos:adicional } ).success(function(data) { $('ul.tabs').tabs('select_tab', 'tabla-vacunacion'); });
     };
  }])
  .controller('InfoAdicionalController',['$scope', '$route','$http', function($scope, $route, $http){  }])
  .controller('logoutController',['$scope', '$route','$http', function($scope, $route, $http) {$scope.salir = function(){ $http.post('api/logout.php').success(function(data) { }).error(function(data) { }); };  }]);

})();