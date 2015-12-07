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

  .filter('tipoCategoria', function(){
    return function(input){
      var estados = ["", "Bien de Capital", "Insumo", "Servicio"];
      return estados[input];
    };
  })

.filter('estadoFilter', function(){
  return function(id){
    var estados = ['Inactivo', 'Activo'];
      return estados[id];
    };
  })
  .controller('TabsController',['$scope', '$route','$http', function($scope, $route, $http){
    console.log($route.current);
     $scope.$route = $route;
  }])

  //#########################################################
  // USUARIOS
  //#########################################################

  .controller('UsuariosController',['$scope', '$http', '$route', function ($scope, $http, $route) {
      
      $scope.init = function(){
        document.title = "Usuarios";
        //console.log($route.current.activetab);
        $route.current.activetab ? $scope.$route = $route : null

        $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.usuarios = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

      }
      $scope.delUsuario = function( codigo, index ) {
        if ( confirm("¿Está seguro que desea eliminar la usurio seleccionado?") ) {
            $scope.usuarios.usuarios.splice(index,1);
            $http.post('api/delUsuario.php', { id: codigo } )
              .success(function(data) {
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }

      }
      

      $scope.init();
    }])
  
  .controller('NuevoUsuarioController',['$scope', '$http', function($scope, $http){
    $scope.usuario = {};
    $scope.usuario.perfiles1 = [];
    $scope.init = function(){
        document.title = "Crear Usuarios";
      
        //console.log($route.current.activetab);

        $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.usuarios = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

      }
    $scope.registro_usuario = function(us){
        us.perfiles = [];
        $.each(us.perfil,function(i,v){

        var elemento = {"id_perfil": i};
            us.perfiles.push(elemento);
        })

        //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
        $http.post('api/guardarUsuario.php', {usuario :us})
          .success(function(response) {
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
           })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
          });


      }
      $scope.agregar_perfil = function(pf){
      console.log(pf);
      //console.log($scope.tmp.perfiles);
      //, "id_perfil": ds.id_perfil
          var elemento = {"nombre_perfil": pf.perfil.nombre_perfil, "id_perfil": pf.perfil.id_perfil};
          console.log(elemento);
        $scope.usuario.perfiles1.push(elemento);
        //$scope.pe.nombre_perfil = "";
      }

      $scope.deletePerfil = function(i){ $scope.usuario.perfiles1.splice(i,1); }
    $scope.init();
  }])
  
    .controller('EditarUsuarioController',['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
        $scope.init = function(){
          var id = $routeParams.id;
          console.log(id);
          
          $http.post('api/getUsuarios_by_id.php', {username :id})
          .success(function(response) {
              $scope.us=response.usuarios;
              $scope.pf=response.perfil;
              $scope.perfiles=response.perfiles;
              console.log(response);

           })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
          });
        }
        $scope.editar_usuario = function(us,p){
          console.log(us,p);

          //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
          $http.post('api/editarUsuario.php', {usuario :us, perfiles :p})
            .success(function(response) {
              location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
             })
            .error(function(data) {
              console.log('Error: ' + data);
              alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
            });

        }
      $scope.init();
   }])

  //#########################################################
  // VACUNAS
  //#########################################################


  .controller('VacunasController',['$scope', '$http', '$route', function ($scope, $http, $route) {
    $scope.init = function(){
        document.title = "Vacunas";
        //console.log($route.current.activetab);
        $route.current.activetab ? $scope.$route = $route : null

        $http.post ('api/getVacunas.php')
            .success(function(data) {
                    $scope.vacunas = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

      }
      $scope.delVacuna = function( codigo, index ) {
        if ( confirm("¿Está seguro que desea eliminar la vacuna seleccionada?") ) {
            $scope.usuarios.usuarios.splice(index,1);
            $http.post('api/delVacuna.php', { id: codigo } )
              .success(function(data) {
                console.log(data);
              })
              .error(function(data) {
                console.log('Error: ' + data);
                alert("no succes");
              });
        }
      }

      $scope.init();
  }])

  .controller('NuevaVacunaController',['$scope', '$http', function($scope, $http){
    $scope.vacunas={};
    $scope.vacunas.dosis=[];
   
    $scope.registro_vacuna = function(va, ds){
      console.log(va);
      console.log(ds);
        
        //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
        $http.post('api/guardarVacuna.php', {vacuna :va, dosis: ds})
          .success(function(response) {
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/vacunas";
           })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
          });
      }

      $scope.agregar_dosis = function(ds){
      console.log(ds);
          var elemento = {"nombre_dosis":ds.nombre_dosis,"meses":ds.meses};
        $scope.vacunas.dosis.push(elemento);
        $scope.ds.nombre_dosis="";
        $scope.ds.meses="";
      }

      $scope.deleteDosis = function(i){ $scope.vacunas.dosis.splice(i,1); }
      
  }])

  .controller('EditarVacunaController',['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
        $scope.init = function(){
          var id = $routeParams.id;
          console.log(id);
          
          $http.post('api/getVacunas_by_id.php', {id_vacuna :id})
          .success(function(response) {
              $scope.va=response.vacunas;
              $scope.dosis=response.dosis;
              console.log(response.vacunas);

           })
          .error(function(data) {
            console.log('Error: ' + data);
            alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
          });
        }

        $scope.agregar_dosis = function(ds){
          console.log(ds);
              var elemento = {"nombre_dosis":ds.nombre_dosis,"meses":ds.meses,"nuevo":1};
            $scope.dosis.push(elemento);
            $scope.ds.nombre_dosis="";
            $scope.ds.meses="";
          }

        $scope.editar_vacuna = function(us,p){
          console.log(us,p);

          //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
          $http.post('api/editarVacuna.php', {vacuna :us, dosis :p})
            .success(function(response) {
              location.href=location.protocol+"//"+location.hostname+location.pathname+"#/vacunas";
             })
            .error(function(data) {
              console.log('Error: ' + data);
              alert("Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.");
            });

        }
      $scope.init();
   }])
  //#########################################################
  // Admin
  //#########################################################

  .controller('AdminController',['$scope', '$http', function($scope, $http){
    //
  }])

})();