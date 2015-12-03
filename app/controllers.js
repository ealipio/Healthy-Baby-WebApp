/**
 * List Controller
 * @version v0.2.2 - 2015-04-23 * @link http://csluni.org
 * @author Eisson Alipio <eisson.alipio@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function(){
  'use strict';

  angular.module('Controllers', ['uiGmapgoogle-maps'])

  .filter('tipoCategoria', function(){
    return function(input){
      var estados = ["", "Bien de Capital", "Insumo", "Servicio"];
      return estados[input];
    };
  })
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


.controller('CentrosController',['$rootScope', '$scope', '$timeout', '$log', 'uiGmapGoogleMapApi',
  function ($rootScope, $scope, $timeout, $log, GoogleMapApi) {

    $scope.map = {
      center: {
        latitude: 53.406754,
        longitude: -2.158843
      },
      pan: true,
      zoom: 5,
      refresh: false,
      events: {},
      bounds: {}
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
      ];
      $scope.map.markerEvents = {
        dblclick: function (gMarker, eventName, model, latLngArgs) {
          var id = model.idKey || model.id;
          alert("Marker double clicked! Model: " + id);
        }
      }
      $timeout(function () {
        $scope.map.markers[0].latitude = 53.416754;
        $scope.map.markers[0].longitude = -2.148843;

        _.range(10).forEach(function (i) {
          $scope.map.markers.push({
            id: i + 1,
            location: {
              latitude: $scope.map.markers[0].latitude + 1 * i,
              longitude: $scope.map.markers[0].longitude + 1 * i
            },
            options: {
              title: 'Marker2'
            },
            showWindow: false
          })
        });
      }, 1000);
    });
  }])

  .controller('VacunasController',['$scope', '$http', function($scope, $http){
    // aqui
  }])

  .controller('AcercaController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('LoginController',['$scope', '$http', function($scope, $http){
    //
  }]);

})();