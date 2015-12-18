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


.controller('CentrosController',['$rootScope', '$scope', '$timeout', '$log', 'uiGmapGoogleMapApi', '$http',
  function ($rootScope, $scope, $timeout, $log, GoogleMapApi, $http) {
    $scope.init = function(){
        $http.post ('api/getCentros.php')
        .success(function(data) {
                $scope.data = data;
               console.log($scope.data);
               $scope.load();
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    };

  var latituden;
  var longitudn;
  var imagen_user = '../minsa/img/user.png';
  var imagen_posta = '../minsa/img/centros.png';

  $scope.dist_rela=9999999;
  $scope.min=9999999;


   $scope.load= function(){
     //when the API is really ready and loaded play w/ the scope
      GoogleMapApi.then(function (map) {

          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                latituden = position.coords.latitude;
                longitudn = position.coords.longitude;
               //console.log(latituden,longitudn);
                $scope.printPosition();
                $scope.printMarkers();

              }, function() {
                   latituden = -12.045865;
                   longitudn = -77.030562;

                  $scope.printPosition();
                  $scope.printMarkers();
                });
               }

          else{
            latituden = -12.045865;
            longitudn = -77.030562;

            $scope.printPosition();
            $scope.printMarkers();
          }
    });
   };
   $scope.init();


   $scope.printPosition= function(){
       $scope.map = {

      center: {
        latitude: latituden,
        longitude: longitudn
      },
      pan: true,
      zoom: 15,
      refresh: true,
      events: {},
      bounds: {}

    };
    $scope.mimapa=true;
    //console.log($scope.map);
        $scope.map.markers = [
        {
          id: "user",
          location: {
            latitude: latituden,
            longitude: longitudn
          },
          options: {
            title: 'Mi ubicacion',
            icon: imagen_user,
            animation: google.maps.Animation.DROP
          },
          showWindow: true
        }];
   };
 $scope.printMarkers= function(){
  for( var i=1;i<$scope.data.length+1;i++){
    $scope.map.markers[i] = {
          id: i-1,
            location: {
              latitude:  $scope.data[i-1].latitud,
              longitude: $scope.data[i-1].longitud
            },
            options: {
              title: $scope.data[i-1].tipo+" : "+$scope.data[i-1].nombre,
              icon: imagen_posta,
              animation: google.maps.Animation.DROP
            }
          
    }
      $scope.dist_rela=Math.sqrt(Math.pow((latituden-$scope.data[i-1].latitud),2)+Math.pow((longitudn-$scope.data[i-1].longitud),2));
      if($scope.dist_rela<$scope.min){
        $scope.min = $scope.dist_rela;

        $scope.nombre = $scope.data[i-1]["nombre"];
        $scope.telefono = $scope.data[i-1]["telefono"];
        $scope.horario = $scope.data[i-1]["horario"];
        $scope.ubica2 = ", "+$scope.data[i-1]["distrito"]+", "+$scope.data[i-1]["provincia"]+", "+$scope.data[i-1]["departamento"];
        $scope.tipo = $scope.data[i-1]["tipo"];
        $scope.ubica = $scope.data[i-1]["direccion"];

        $scope.resp = $scope.data[i-1]["resp"];
        //console.log($scope.min);
      }
  }
      $scope.map.markerEvents = {
        click: function (gMarker, eventName, model, latLngArgs) {

          var id = model.idKey || model.id;
          $("#cercano").empty();

            $scope.nombre = $scope.data[id]["nombre"];
            $scope.telefono = $scope.data[id]["telefono"];
            $scope.horario = $scope.data[id]["horario"];
            $scope.ubica2 = ", "+$scope.data[id]["distrito"]+", "+$scope.data[id]["provincia"]+", "+$scope.data[id]["departamento"];
            $scope.tipo = $scope.data[id]["tipo"];
            $scope.ubica = $scope.data[id]["direccion"];
            $scope.resp = $scope.data[id]["resp"];



            var infowindow = new google.maps.InfoWindow({
                content: "asdasdasdasd"
              });
            
                infowindow.open(map, $scope.map.markers[id+1]);
              
        }
      }
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

  .controller('MapixController',['$scope', '$http', function($scope, $http){
 
 $scope.handleLocationError = function(browserHasGeolocation, infoWindow, pos){    
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

//function initMap() {
  $scope.initMap = function(){
  var pos;
  
  var infoWindow = new google.maps.InfoWindow({map: map});
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
      infoWindow.setPosition(pos);
      map.setCenter(pos);

      var GeoMarker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: user });
$scope.printMarkers();
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
               $scope.initMap();
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });
    };
    var beachMarker =[];
    var user = "img/user.png";
    var centroimg = "img/centros.png";
    var geoLatitude ;
    var geoLongitude;
     $scope.dist_rela=9999999;
  $scope.min=9999999;

$scope.init();

$scope.printMarkers = function(){
   for( var i=0;i<$scope.data.length;i++){
        beachMarker[i] = new google.maps.Marker({
           position: {lat: parseFloat($scope.data[i].latitud), lng: parseFloat($scope.data[i].longitud)},
            map: map,
            icon: centroimg,
            animation: google.maps.Animation.DROP,
            title: $scope.data[i].nombre
  });
        beachMarker[i].addListener('click', function() {
          var infowindow = new google.maps.InfoWindow({
    content: "olaaaaaaa"
  });
   infowindow.open(map, beachMarker[i]);
  });

         $scope.dist_rela=Math.sqrt(Math.pow((geoLatitude-$scope.data[i].latitud),2)+Math.pow((geoLongitude-$scope.data[i].longitud),2));
      if($scope.dist_rela<$scope.min){
        $scope.min = $scope.dist_rela;

        $scope.nombre = $scope.data[i]["nombre"];
        $scope.telefono = $scope.data[i]["telefono"];
        $scope.horario = $scope.data[i]["horario"];
        $scope.ubica2 = ", "+$scope.data[i]["distrito"]+", "+$scope.data[i]["provincia"]+", "+$scope.data[i]["departamento"];
        $scope.tipo = $scope.data[i]["tipo"];
        $scope.ubica = $scope.data[i]["direccion"];

        $scope.resp = $scope.data[i]["resp"];
        //console.log($scope.min);

      }
   }
};

$scope.evento_marker = function(i){
  alert("ola");


};
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

