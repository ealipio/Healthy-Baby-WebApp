/**
 * List Controller
 * @version v0.2.2 - 2015-04-23 * @link http://csluni.org
 * @author Eisson Alipio <eisson.alipio@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
  'use strict';

  angular.module('Controllers', ['uiGmapgoogle-maps'])

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
    console.log($route.current);
     $scope.$route = $route;
  }])


.controller('CentrosController',['$rootScope', '$scope', '$timeout', '$log', 'uiGmapGoogleMapApi', '$http',
  function ($rootScope, $scope, $timeout, $log, GoogleMapApi, $http) {

    $scope.init = function(){
      
        $http.post ('api/getCentros.php')
        .success(function(data) {
                $scope.data = data;
                console.log($scope.data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
        });

    };


  var latituden;
  var longitudn;
  var imagen_user = '/minsa/img/user.png';
  var imagen_posta = '/minsa/img/posta.png';



   $scope.load= function(){

     //when the API is really ready and loaded play w/ the scope
    GoogleMapApi.then(function (map) {
          if (navigator.geolocation) {


   navigator.geolocation.getCurrentPosition(function(position) {
      
        latituden = position.coords.latitude;
        longitudn = position.coords.longitude;
        console.log(latituden,longitudn);
    $scope.map = {
      center: {
        latitude: latituden,
        longitude: longitudn
      },
      pan: true,
      zoom: 13,
      refresh: true,
      events: {},
      bounds: {}

    };


$scope.mimapa=true;
console.log($scope.map);

 
 

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
        }
      ];
$scope.dist_rela=9999999;
$scope.min=9999999;
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
    $scope.tipo = $scope.data[i-1]["tipo"];
    $scope.ubica = $scope.data[i-1]["direccion"];
    $scope.resp = $scope.data[i-1]["resp"];

  console.log($scope.min);
}

}



      $scope.map.markerEvents = {
        click: function (gMarker, eventName, model, latLngArgs) {
          var id = model.idKey || model.id;
          $("#cercano").empty();
          $scope.nombre = $scope.data[id]["nombre"];
          $scope.tipo = $scope.data[id]["tipo"];
          $scope.ubica = $scope.data[id]["direccion"];
          $scope.resp = $scope.data[id]["resp"];

        
         
         
        }
      }
    



    })}

   
    });

   };
   $scope.init();
   $scope.load();
     

  }])

  .controller('VacunasController',['$scope', '$http', function($scope, $http){
    // aqui
  }])

  .controller('AcercaController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('LoginController',['$scope', '$http', function($scope, $http){
      $scope.loginProcess = function(){
        window.location="/minsa/administracion";
      };
  }])

})();