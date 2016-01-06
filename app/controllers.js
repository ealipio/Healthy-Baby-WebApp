
window.map="";
/**
 * List Controller
 * @version v0.2.2 - 2015-04-23 * @link http://csluni.org
 * @author Eisson Alipio <eisson.alipio@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
  'use strict';

  angular.module('Controllers', ['uiGmapgoogle-maps'])

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

  .filter('negativo', function(){
  return function(id){
    var valor= id*(-1);

      return valor;
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
  .filter('filterNoData', function(){
    return function(input){
      if(input == null){
        var retorno = "No data";
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
        var retorno = "No administrado";
      }
      else if(input==1){
        var retorno = "Administrado";
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

  
  .controller('ConsultarController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.finalizar=true;
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      $scope.nino = {tipo:3, numero:1000999595};
      $scope.subs = {};
      $scope.subs.correo="";
      //$scope.consulta = {paterno:'', materno:'',tipo: "1", dni: '', nacimiento: ''};

      $route.current.activetab ? $scope.$route = $route : null;
      /*
      $scope.consultar = function(nene){
        //console.log(nene);
        $http({method:'POST',url: 'api/consultar.php',data:$.param({data: nene}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            console.log(response);
            //$scope.respuesta = response;
        });
      };
      */

    $scope.getVacunas=function() {
      $http({method:'POST',url: 'api/getVacunas.php', data: $.param({data:$scope.nino_ws}),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        $scope.vacunas = response;
        console.log(response);
      });
    }

    $scope.buscarNino = function(nino){
      $scope.ninoActual=nino["numero"];
      $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
      delete $scope.nino_error;
      delete $scope.nino_ws;
      $http.get('api/wsByNumero.php?numero='+ nino.numero ).success(function(data) {
          if(data.success){
            $scope.nino_ws = data.success;
            console.log($scope.nino_ws);
            var year = $scope.nino_ws.FecNac.substr(0,4);
            var month = $scope.nino_ws.FecNac.substr(4,2);
            var day = $scope.nino_ws.FecNac.substr(6,2);
            $scope.nino_ws.FecNac = year+"-"+month+"-"+day;

            $scope.getVacunas();
            $scope.getCorreos();
          }
          else{
            alert(data.error);
          }

        }).error(function(data) { 
          Materialize.toast('Error, ocurrio un problema consultando el webservice.', 4000);
          $scope.finalizar=false;
        });

    };

    $scope.suscribirse = function(data){
        console.log(data.correo);
        if(data.correo.length>0){
          $http.post ('api/guardarSuscripcion.php', { id_nino: $scope.nino_ws.NuCnv, correo: data.correo })
            .success(function(response) {
                console.log(response);
                $scope.correos.push({'email': data.correo});
                $scope.subs.correo="";
              })
            .error(function(data) {
                    console.log('Error: ' + response);
            });
        }
    };

    $scope.getCorreos=function() {

      $http.post ('api/getCorreos.php', { NuCnv: $scope.nino_ws.NuCnv })
          .success(function(data) {
                  $scope.correos = data;
                  console.log(data);
              })
          .error(function(data) {
                  console.log('Error: ' + data);
          });
    };

     $scope.recargar=function() {
      
    //location.href=location.protocol+"//"+location.hostname+location.pathname+"#/consultar";
    window.location.reload(true);
    };

     $scope.tablaVacunacion=function() {
   $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
     $('html,body').animate({
                scrollTop: $("#vistaInfo").offset().top
                }, 1000);
    };
    
    $scope.infoAdicional=function() {
     $('ul.tabs').tabs('select_tab', 'info-adicional');
       $('html,body').animate({
                scrollTop: $("#vistaInfo").offset().top
                }, 1000);
     $http.post ('api/getInfoAdicional.php', { NuCnv: $scope.ninoActual })
          .success(function(data) {
                  $scope.InfoAdicional = data;
                  console.log(data);
              })
          .error(function(data) {
                  console.log('Error: ' + data);
          });
    };


    }])

  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    //console.log($route.current);
     $scope.$route = $route;
  }])


.controller('CentrosController',['$scope', '$http', function($scope, $http){

  $scope.first=true;
      var markers =[];
    var infoWindow;
    var user = "img/user.png";
    var centroimg = "img/centros.png";
    var geoLatitude ;
    var geoLongitude;
    $scope.dist_rela=9999999;
    $scope.min=9999999;

    $scope.handleLocationError = function(browserHasGeolocation, infoWindow, pos){
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

//function initMap() {
    $scope.initMap = function(data){
        var pos;

      //var infoWindow = new google.maps.InfoWindow({map: map});
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           geoLatitude = position.coords.latitude;
           geoLongitude = position.coords.longitude

             map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: geoLatitude, lng: geoLongitude},
              zoom: 15
            });
           pos = {
            lat: geoLatitude,
            lng: geoLongitude
          };
          //infoWindow.setPosition(pos);
          map.setCenter(pos);

          var GeoMarker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: user
           });
          $scope.cercano = {};


          $.each(data , function( index, value ) {
              $scope.printMarkers(map, value);
              //console.log(parseFloat(value.latitud));
              $scope.dist_rela=Math.sqrt(Math.pow((geoLatitude-value.latitud),2)+Math.pow((geoLongitude-value.longitud),2));

              if($scope.dist_rela<$scope.min && $scope.first==true){

                $scope.min = $scope.dist_rela;
                $scope.cercano.nombre = value.nombre;
                $scope.cercano.telefono = value.telefono;
                $scope.cercano.horario = value.horario;
                $scope.cercano.ubica2 = ", "+value.distrito+", "+value.provincia+", "+value.departamento;
                $scope.cercano.tipo = value.tipo;
                $scope.cercano.ubica = value.direccion;
                $scope.cercano.resp = value.resp;
              }
          });

        }, function() { $scope.handleLocationError(true, infoWindow, map.getCenter()); });
      } else {
        // Browser doesn't support Geolocation
        $scope.handleLocationError(false, infoWindow, map.getCenter());

      }
    }

     $scope.init = function(){
        $http.post ('api/getCentros.php')
        .success(function(data) {
            $scope.data = data;
            console.log($scope.data);
            $scope.initMap(data);

        })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    };

    $scope.init();

    $scope.printMarkers = function(map, data){
      var beachMarker;
      beachMarker = new google.maps.Marker({
           position: {lat: parseFloat(data.latitud), lng: parseFloat(data.longitud)},
            map: map,
            icon: centroimg,
            animation: google.maps.Animation.DROP,
            title: $scope.data.nombre
      });
      markers.push(beachMarker); // add marker to array

      beachMarker.addListener('click', function() {

        $scope.first=false;

         if (infoWindow !== void 0) {
              infoWindow.close();
         }

         infoWindow = new google.maps.InfoWindow({
            content: "<div id='up'><div id='up_right'><table style='font-size: 0.95em;'><tbody><tr><td>"+data.tipo+"</td></tr><tr>"+
            "<td><b>"+data.nombre+"</b></td></tr></table></div><div id='up_left'><img src='img/centros_big.png'/></div></div>"+"<hr>"+"<table style='font-size: 0.875em;'><tr><td><i class='fa fa-map-marker fa-1x'></i></td><td>"+data.direccion+", "+data.distrito+", "+data.provincia+", "+data.departamento+"</td>"+
          "</tr><tr><td><i class='fa fa-phone fa-1.5x'></i></td><td>"+data.telefono+"</td></tr><tr><td><i class='fa fa-clock-o fa-1x'></i></td><td>"+data.horario+"</td>"+
          "</tr><tr><td><i class='fa fa-user fa-1x'></i></td><td>"+data.resp+"</td></tr></tbody></table>",
          maxHeight: 400,
          maxWidth: 300
         });
                $scope.cercano.nombre = data.nombre;
                $scope.cercano.telefono = data.telefono;
                $scope.cercano.horario = data.horario;
                $scope.cercano.ubica2 = ", "+data.distrito+", "+data.provincia+", "+data.departamento;
                $scope.cercano.tipo = data.tipo;
                $scope.cercano.ubica = data.direccion;
                $scope.cercano.resp = data.resp;

         if (infoWindow) {
//           alert('entró');
             infoWindow.close();
          }
           infoWindow.open(map, beachMarker);
      });

      $scope.dist_rela=Math.sqrt(Math.pow((geoLatitude-$scope.data.latitud),2)+Math.pow((geoLongitude-$scope.data.longitud),2));
   };

  }])

  .controller('VacunasController',['$scope', '$http', '$route', function ($scope, $http, $route) {
      $scope.init = function(){
        document.title = "Vacunas";
        //console.log($route.current.activetab);
        $route.current.activetab ? $scope.$route = $route : null

        $http.post ('administracion/api/getVacunas.php')
            .success(function(data) {
                    $scope.vacunas = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

      }

      $scope.init();
  }])

  .controller('AcercaController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('lostpasswordController',['$scope', '$http', function($scope, $http){
     $scope.exito = function(){
      $scope.envioExitoso=true;

     };
  }])

  .controller('changePasswordController',['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
     $scope.changepass={};
     $scope.changepass.usuario = $routeParams.id;
     
      $scope.ChangePassword = function(login){
         $http({method:'POST',url: 'api/changePass.php', data:$.param(login), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            if(response){
              location.href= '#login';
              Materialize.toast('Contraseña modificada exitosamente', 3000);
            }
            else{
              Materialize.toast('Error, Ingrese los datos correctos', 3000);
            }
            
         });
      };
  }])

  .controller('LoginController',['$scope', '$http', function($scope, $http){
      $scope.login = {};
    $scope.loginProcess = function(login){
      console.log('login', login);
      $http({method:'POST',url: 'api/login.php', data:$.param(login), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        console.log('response', response);
        if(response.login == 0){
          Materialize.toast('Error, el usuario y contraseña ingresados no concuerdan', 3000);
        } else if(response.login == "ok"){
          if(login.usuario==login.password){
            location.href= '#/changepassword/'+ login.usuario;
          }else{
            if(response.perfiles[0].id_perfil==1){
                location.href= 'administracion/#/';
            }
            else if(response.perfiles[0].id_perfil==2){
                location.href= 'vacunas/#/';
            }
            else if(response.perfiles[0].id_perfil==2){
                location.href= 'vacunas/index.html';
            }
          }
          //location.href= 'administracion/index.html';
        }
      });
    };
  }])

})();
