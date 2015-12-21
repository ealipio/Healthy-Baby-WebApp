
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
  .controller('ConsultarController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      $scope.nino = {tipo:1, numero:10360934};
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
      
      $http.post ('api/getVacunas.php', { fecha_nacimiento: $scope.nino_ws.fecha_nac, id_nino: $scope.nino_ws.nro_documento })
          .success(function(data) {
                  $scope.vacunas = data;
                  console.log(data);
              })
          .error(function(data) {
                  console.log('Error: ' + data);
          });
    };

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
            $scope.getCorreos();
            
          }
      });
    };

    $scope.suscribirse = function(data){
        console.log(data.correo);
        if(data.correo.length>0){
          $http.post ('api/guardarSuscripcion.php', { id_nino: $scope.nino_ws.nro_documento, correo: data.correo })
            .success(function(data) {
                console.log(data);
                $scope.correos.push({'email': data.email});
              })
            .error(function(data) {
                    console.log('Error: ' + data);
            });
        }
    };

    $scope.getCorreos=function() {
      
      $http.post ('api/getCorreos.php', { id_nino: $scope.nino_ws.nro_documento })
          .success(function(data) {
                  $scope.correos = data;
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

          $.each(data , function( index, value ) {
              $scope.printMarkers(map, value);
              //console.log(parseFloat(value.latitud));
              $scope.dist_rela=Math.sqrt(Math.pow((geoLatitude-value.latitud),2)+Math.pow((geoLongitude-value.longitud),2));
            
              if($scope.dist_rela<$scope.min && $scope.first==true){
                console.log(value.resp);
                $scope.min = $scope.dist_rela;
                $scope.nombre = value.nombre;
                $scope.telefono = value.telefono;
                $scope.horario = value.horario;
                $scope.ubica2 = ", "+value.distrito+", "+value.provincia+", "+value.departamento;
                $scope.tipo = value.tipo;
                $scope.ubica = value.direccion;
                $scope.resp = value.resp;
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
         if ($scope.infoWindow !== void 0) {
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
         if (infoWindow) {
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


  .controller('LoginController',['$scope', '$http', function($scope, $http){
      $scope.login = {};
    $scope.loginProcess = function(login){
      console.log('login', login);
      $http({method:'POST',url: 'api/login.php', data:$.param(login), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        console.log('response', response);
        if(response.login == 0){
          alert("Error, el usuario y contraseña ingresados no concuerdan");
        } else if(response.login == "ok"){
            if(response.perfiles[0].id_perfil==1){
                location.href= 'administracion/#/';
            }
            else if(response.perfiles[0].id_perfil==2){
                location.href= 'vacunas/#/';
            }
          //location.href= 'administracion/index.html';
        }
      });
    };
  }])

})();
