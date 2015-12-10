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

  .controller('ConsultarController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      $scope.consulta = {paterno:'', materno:'',tipo: "1", dni: '', nacimiento: ''};

      $route.current.activetab ? $scope.$route = $route : null;
      $scope.consultar = function(nene){
        //console.log(nene);
        $http({method:'POST',url: 'api/consultar.php',data:$.param({data: nene}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            console.log(response);
            //$scope.respuesta = response;
        });
      };
    }])

  .controller('CrearVacunaController',['$scope', '$route','$http', function($scope, $route, $http){
    //console.log($route.current);
    //saveVacuna
    $scope.vacuna = {};
      $scope.saveVacuna = function(vacuna){
        console.log(vacuna);
        $http({method:'POST',url: 'api/crear-vacuna.php',data:$.param({data: vacuna}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            console.log(response);
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
  var imagen_posta = '../minsa/img/posta.png';

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
          showWindow: false
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
            },
            showWindow: false
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
                location.href= 'vacunas/#/consultar';
            }
          //location.href= 'administracion/index.html';
        }
      });
    };
  }])

})();