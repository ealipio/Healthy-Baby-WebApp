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
//        $http({method:'POST',url: 'api/consultar.php',data:$.param({data: nene}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
  //          console.log(response);
    //    });
      };
  }])

  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($route.current);
     $scope.$route = $route;
  }])

  .controller('VacunasController',['$scope', '$http', function($scope, $http){
    // aqui
  }])
  .controller('CentrosController',['$scope', '$http', function($scope, $http){
    $scope.getPosition = function () {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log(position);
          $scope.callback(position.coords.latitude, position.coords.longitude);
        });
      } else {
        console.log('no soporta Geolocation');
      }
    };
    //when the API is really ready and loaded play w/ the scope
    GoogleMapApi.then(function (map) {
      $scope.map.markers = [
        {
          id: 1,
          location: {
            latitude: 53.406754,
            longitude: -2.158843
          },
          options: {
            title: 'Marker1'
          },
          showWindow: false
        }

        var map = new google.maps.Map(mapCanvas, mapOptions);
    };
    /*************************
    *
    *************************/
    $scope.getPosition();
    //
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