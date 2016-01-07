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

.filter('DosisVacunas', function(){
  return function(id){
    console.log(id);

    //var estados = ['Inactivo', 'Activo'];
      return id;
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
        $scope.elementos = 10;
        //console.log($route.current.activetab);
        $route.current.activetab ? $scope.$route = $route : null

        $http.post ('api/getUsuarios.php')
            .success(function(data) {
                    $scope.usuarios = data;
                    console.log(data);
                    $scope.usuarios_pag = $scope.usuarios.usuarios.slice(0,$scope.elementos);
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

      $scope.changePage = function( page ) {
          var ini = (page-1) * $scope.elementos;
          var fin = page*$scope.elementos;
          $scope.usuarios_pag = $scope.usuarios.usuarios.slice(ini,fin);
          console.log($scope.usuarios_pag);
      }
     

      $scope.init();
    }])
  
  .controller('NuevoUsuarioController',['$scope', '$http', function($scope, $http){
    $scope.usuario = {};
    $scope.usuario.perfiles1 = [];
    $scope.myRegex = /^[a-zA-Z0-9]*$/;
    $(".js-example-basic-multiple").select2();

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

        $http.post ('api/getCentros.php')
            .success(function(data) {
                    $scope.Centros = data;
                    console.log(data);
                })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

      }

    $scope.registro_usuario = function(us){
      console.log(us);
      if(us.perfil){
        if(us.perfil[1]){
          if(us.perfil){
            us.perfiles = [];
            $.each(us.perfil,function(i,v){
          
            var elemento = {"id_perfil": i};
            console.log(elemento);
                us.perfiles.push(elemento);
            })
          }

          var listaNombres = us.nombres.split(/\d/);
          $.each(listaNombres, function( index, value ) {
            us.nombres=""+value;
          });
          var listaApepa = us.apellido_paterno.split(/\d/);
          $.each(listaApepa, function( index, value ) {
            us.apellido_paterno=""+value;
          });
          var listaApema = us.apellido_materno.split(/\d/);
          $.each(listaApema, function( index, value ) {
            us.apellido_materno=""+value;
          });
         
      console.log(us);
          //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
          $http.post('api/guardarUsuario.php', {usuario :us})
            .success(function(response) {
              location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
             })
            .error(function(data) {
              console.log('Error: ' + data);
              Materialize.toast('Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.', 3000);
            });
        }
        else{
        if(us.centro_salud){
          if(us.perfil){
            us.perfiles = [];
            $.each(us.perfil,function(i,v){
          
            var elemento = {"id_perfil": i};
                us.perfiles.push(elemento);
            })
          }
          var listaNombres = us.nombres.split(/\d/);
          $.each(listaNombres, function( index, value ) {
            us.nombres=""+value;
          });
          var listaApepa = us.apellido_paterno.split(/\d/);
          $.each(listaApepa, function( index, value ) {
            us.apellido_paterno=""+value;
          });
          var listaApema = us.apellido_materno.split(/\d/);
          $.each(listaApema, function( index, value ) {
            us.apellido_materno=""+value;
          });
          //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
          $http.post('api/guardarUsuario.php', {usuario :us})
            .success(function(response) {
              location.href=location.protocol+"//"+location.hostname+location.pathname+"#/usuarios";
             })
            .error(function(data) {
              console.log('Error: ' + data);
              Materialize.toast('Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.', 3000);
            });
        } else{
          Materialize.toast('Ingrese el Centro de Salud', 3000);}}
      }else{
        Materialize.toast('Debe seleccionar al menos un perfil para el usuario', 3000);
      }
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
    $scope.hide=false;
      $scope.deletePerfil = function(i){ $scope.usuario.perfiles1.splice(i,1); }
     $scope.ejecutar = function(){ 
      if($("#1").is(':checked')){
      $scope.hide=true;
    }
    else{
      $scope.hide=false;
    }
    }


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
            Materialize.toast('Se encontró un error al intentar editar el nuevo usuario. Favor contactarse con el administrador del sistema.', 3000);
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
              Materialize.toast('Se encontró un error al intentar editar el nuevo usuario. Favor contactarse con el administrador del sistema.', 3000);
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
        $scope.elementos=5;

        //console.log($route.current.activetab);
        $route.current.activetab ? $scope.$route = $route : null

        $http.post ('api/getVacunas.php')
            .success(function(data) {
                    $scope.vacunas = data;
                    console.log(data);
                    $scope.vacunas_pag = $scope.vacunas.vacunas.slice(0,$scope.elementos);
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

      $scope.changePage = function( page ) {
          var ini = (page-1) * $scope.elementos;
          var fin = page*$scope.elementos;
          $scope.vacunas_pag = $scope.vacunas.vacunas.slice(ini,fin);
          console.log($scope.vacunas_pag);
      }

      $scope.init();
  }])

  .controller('NuevaVacunaController',['$scope', '$http', function($scope, $http){
    $scope.vacunas={};
    $scope.vacunas.dosis=[];
   
    $scope.registro_vacuna = function(va, ds){
      //console.log(va);
      //console.log(ds);
        
        //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
        $http.post('api/guardarVacuna.php', {vacuna :va, dosis: ds})
          .success(function(response) {
            location.href=location.protocol+"//"+location.hostname+location.pathname+"#/vacunas";
           })
          .error(function(data) {
            console.log('Error: ' + data);
            Materialize.toast('Se encontró un error al intentar crear una nueva vacuna. Favor contactarse con el administrador del sistema.', 3000);
          });
      }

      $scope.agregar_dosis = function(ds){
      console.log(ds);
        if(ds){
          if(ds.nombre_dosis){
            var elemento = {"nombre_dosis":ds.nombre_dosis,"meses":ds.meses};
            $scope.vacunas.dosis.push(elemento);
            $scope.ds.nombre_dosis="";
            $scope.ds.meses="";
          }
          else{
            Materialize.toast('Favor de completar todos los campos de la dosis.', 3000);
          }
        }
        else{
          Materialize.toast('Favor de completar todos los campos de la dosis.', 3000);
        }
      }

      $scope.deleteDosis = function(i){ $scope.vacunas.dosis.splice(i,1); }
      
  }])

  .controller('EditarVacunaController',['$scope', '$http', '$routeParams',function($scope, $http, $routeParams){
        $scope.init = function(){
          var id = $routeParams.id;
          console.log(id);
          $scope.del_dosis=[];

          $http.post('api/getVacunas_by_id.php', {id_vacuna :id})
          .success(function(response) {
              $scope.va=response.vacunas;
              $scope.dosis=response.dosis;
           })
          .error(function(data) {
            console.log('Error: ' + data);
            Materialize.toast('Se encontró un error al intentar buscar la vacuna.', 3000);
          });
        }

        $scope.agregar_dosis = function(ds){
          if(ds){
            if(ds.nombre_dosis && ds.meses){
                var elemento = {"nombre_dosis":ds.nombre_dosis,"meses":ds.meses,"nuevo":1};
                $scope.dosis.push(elemento);
                $scope.ds.nombre_dosis="";
                $scope.ds.meses="";
                console.log($scope.dosis);
              }
            else{
              Materialize.toast('Favor de completar todos los campos de la dosis.', 3000);
            }
          }
          else{
            Materialize.toast('Favor de completar todos los campos de la dosis.', 3000);
          }
        }

        $scope.editar_vacuna = function(us,p){
          console.log(us,p);
          console.log($scope.del_dosis);
          //$http({method:'POST', url: 'api/guardarUsuario.php', data: $.param({"usuario": us}), headers :{ 'Content-Type': 'application/x-www-form-urlencoded' }})
          $http.post('api/editarVacuna.php', {vacuna: us, dosis: p, del_dosis: $scope.del_dosis})
            .success(function(response) {
              location.href=location.protocol+"//"+location.hostname+location.pathname+"#/vacunas";
             })
            .error(function(data) {
              console.log('Error: ' + data);
              Materialize.toast('Se encontró un error al intentar crear un nuevo usuario. Favor contactarse con el administrador del sistema.', 3000);
            });
        }
        $scope.deleteDosis = function(i){
            var elemento = $scope.dosis[i];
            elemento.nuevo=2;
            $scope.del_dosis.push(elemento);
            $scope.dosis.splice(i,1);
        }
      $scope.init();
   }])
  //#########################################################
  // Admin
  //#########################################################

  .controller('AdminController',['$scope', '$http', function($scope, $http){
    //
  }])
  .controller('logoutController',['$scope', '$route','$http', function($scope, $route, $http){

    $scope.salir = function(){
     $http.post('api/logout.php')
        .success(function(data) {
                console.log(data);
            })
        .error(function(data) {
                console.log('Error: ' + data);
                 //alert("no succes");
        });
      };
  }])

})();