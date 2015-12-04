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

<<<<<<< HEAD
  .filter('tipoCategoria', function(){
    return function(input){
      var estados = ["", "Bien de Capital", "Insumo", "Servicio"];
      return estados[input];
    };
  })
=======
>>>>>>> administracion
  .controller('HomeController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      //console.log($route.current.activetab);
      $route.current.activetab ? $scope.$route = $route : null
    }])
  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($route.current);
     $scope.$route = $route;
  }])
  .controller('VacunasController',['$scope', '$http', function($scope, $http){
<<<<<<< HEAD
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
    $scope.callback = function (latitude, longitude){
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
    };
    /*************************
    *
    *************************/
    $scope.getPosition();
=======
    //
  }])
  .controller('CentrosController',['$scope', '$http', function($scope, $http){
    //
>>>>>>> administracion
  }])
  .controller('AcercaController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('LoginController',['$scope', '$http', function($scope, $http){
<<<<<<< HEAD
    //
  }]);
=======
      $scope.loginProcess = function(){
        window.location="/minsa/administracion";
      };
  }])

>>>>>>> administracion

})();