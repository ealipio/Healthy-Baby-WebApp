
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
        var retorno = "-";
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
        var retorno = "No Entregado ";
      }
      else if(input==1){
        var retorno = "Entregado ";
      }
      
      return retorno;
    };
  })
  .filter('juntoAslash', function(){
    return function(input){
      if(input){
          var year = input.substr(0,4);
          var meses = input.substr(4,2);
          var dias = input.substr(6,2);
          var retorno= dias+"/"+meses+"/"+year;
            return retorno;}
      else{return 0;}
    };
  })
  .filter('edadOrdenada', function(){
    return function(input){
   if(input){
       /*var year = (input/365).toFixed();
       var meses = ((input%365).toFixed()/30).toFixed();
       var dias= ((input%365).toFixed()%30);*/

      var year = Math.floor((input/365));
       var meses = Math.floor(((input%365).toFixed()/30));
       var dias= Math.floor(((input%365).toFixed()%30));

       ///alert(((input%365).toFixed()/30).toFixed());
       if(year==0){
          if(meses==0){
            var retorno = dias+" dias";
               }
               else if(meses==1){
            var retorno = meses+" mes y "+dias+" dias";
               }
               else{
                var retorno = meses+" meses y "+dias+" dias";
               }
        }
        else if(year==1){
          if(meses==0){
            var retorno = year+" año y "+ dias+" dias";
           }
           else if(meses==1){
              var retorno = year+" año, "+meses+" mes y "+dias+" dias";
           }
             else{
                var retorno = year+" año, "+meses+" meses y "+dias+" dias";
             }
       }
       else{
             if(meses==0){
            var retorno = year+" años y "+ dias+" dias";
               }
               else if(meses==1){
            var retorno = year+" años, "+meses+" mes y "+dias+" dias";
               }
               else{
                var retorno = year+" años, "+meses+" meses y "+dias+" dias";
               }
       }
          return retorno;
    }

      else {return 0;}
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
    //$scope.showNino_ws=true;
    //$scope.finalizar=true;
    document.title = "Consultar";
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      $scope.nino = {tipo:'', numero:''};
      $scope.subs = {};
      $scope.subs.correo="";
      //$scope.consulta = {paterno:'', materno:'',tipo: "1", dni: '', nacimiento: ''};

      $route.current.activetab ? $scope.$route = $route : null;

    $scope.getVacunas=function() {
      $http({method:'POST',url: 'api/getVacunas.php', data: $.param({data:$scope.nino_ws}),headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        $scope.vacunas = response;
        console.log(response);
        $scope.showNinos=true;
      });
    }

    $scope.VerNino = function(nino, index){
      //$(".table-hover")[index].css("background":"yellow");

          $scope.showNinos=true;
          $scope.nino_ws = nino;

          var year = nino.FecNac.substr(0,4);
          var month = nino.FecNac.substr(4,2);
          var day = nino.FecNac.substr(6,2);
          $scope.nino_ws.FechaNac = year+"-"+month+"-"+day;

          $scope.showNino_ws=true;
          $scope.getVacunas();
          $scope.getCorreos();
    };


    $scope.buscarNino = function(nino){
      $scope.showNinos=true;
      $scope.showNino_ws=false;
      $scope.ninoActual=nino["numero"];
      $('ul.tabs').tabs('select_tab', 'tabla-vacunacion');
      delete $scope.nino_error;
      delete $scope.nino_ws;

     // console.log(nino["tipo"]);
      if(nino["tipo"]==1 && nino.numero!='' && nino.numero>0){

        //consultar desde WS minsa
        //$http.get('api/wsByNumero.php?numero='+ nino.numero ).success(function(data) {

        //consultar desde esdeporvida 
        $http.get('api/ws1.php?numero='+ nino.numero ).success(function(data) {
            console.log(data);
           if(data.success){
              $scope.nino_ws = data.success;
              console.log($scope.nino_ws);
              var year = $scope.nino_ws.FecNac.substr(0,4);
              var month = $scope.nino_ws.FecNac.substr(4,2);
              var day = $scope.nino_ws.FecNac.substr(6,2);
              $scope.nino_ws.FechaNac = year+"-"+month+"-"+day;
              $scope.getVacunas();
              $scope.getCorreos();
            }
              else { Materialize.toast(data.error, 4000); }

          }).error(function(data) {
            Materialize.toast('Error, ocurrio un problema consultando el webservice.', 4000);
            $scope.finalizar=false;
        });
        }
          else if (nino["tipo"]==2 && nino.numero!='' && nino.numero>0){
                $http.post ('api/getNinoByDni.php', { id_nino: nino["numero"] })
                    .success(function(data) {
                        if(data.success) {
                          $scope.nino_ws = data.success;
                          console.log($scope.nino_ws);
                          $scope.nino_ws.NuCnv = $scope.nino_ws.nro_documento;
                          $scope.nino_ws.FechaNac = $scope.nino_ws.fecha_nac;

                          console.log($scope.nino_ws);
                          $scope.getVacunas();
                          $scope.getCorreos();

                        } else { Materialize.toast(data.error, 4000); }
                    })
                    .error(function(data) {
                            console.log('Error: ' + response);
                    });
                 $scope.finalizar=false;
          }
          else if (nino["tipo"]==3 && nino.numero!='' && nino.numero>0){
            console.log(nino);
               //$http.get('../api/wsByDniMadre.php?numero='+ nino.numero ).success(function(data) {
             $http.get('api/wsByDniMadre_2.php?numero='+ nino.numero ).success(function(data) {
               if(data.success){
                  if(data.success.length){

                    $scope.ninos_mama = data.success;
                    console.log($scope.ninos_mama);
                    $scope.showNinos=false;
                    $scope.showNino_ws=true;
                    //$.each($scope.nino_ws , function( index, value ) {
                  }else{
                    $scope.ninos_mama = [{'0':''}];
                    $scope.ninos_mama[0] = data.success;
                    console.log(data.success);
                    $scope.showNinos=false;
                    $scope.showNino_ws=true;
                  }
                }
                else{
                  Materialize.toast(data.error, 4000);
                }

            }).error(function(data) {
              Materialize.toast('Error, ocurrio un problema consultando el webservice.', 4000);
              $scope.finalizar=false;
            });
          }
          else{
              Materialize.toast('Por favor complete todos los datos.', 4000);
          }

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
  .controller('registrarController',['$scope','$http', function($scope, $http){
    //console.log($route.current);
    $scope.registrarNino = function(us){
      console.log(us);
         $http.post ('api/guardarNino.php', { us: us })
          .success(function(data) {
                  $scope.guardarNino = data;
                  console.log(data);
                  if(data==" ya existe"){
                    Materialize.toast('Ese niño ya se encuentra registrado compruebelo en Consultar', 3000);
                    location.href=location.protocol+"//"+location.hostname+location.pathname+"#/consultar";
                  }
                  else{
                   Materialize.toast('Registro de Niño Exitoso.', 3000);
                   location.href=location.protocol+"//"+location.hostname+location.pathname+"#/consultar";
                   }
              })
          .error(function(data) {
                  console.log('Error: ' + data);
          });
     }
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
                $scope.cercano.latitud = value.latitud;
                $scope.cercano.longitud = value.longitud;
              }
          });



        $scope.first=false;

          infoWindow = new google.maps.InfoWindow({
            content: "<div id='up'><div id='up_right'><table style='font-size: 0.95em;'><tbody><tr><td>"+$scope.cercano.tipo+"</td></tr><tr>"+
            "<td><b>"+$scope.cercano.nombre+"</b></td></tr></table></div><div id='up_left'><img src='img/centros_big.png'/></div></div>"+"<hr>"+"<table style='font-size: 0.875em;'><tr><td><i class='fa fa-map-marker fa-1x'></i></td><td>"+$scope.cercano.ubica+", "+$scope.cercano.ubica2+"</td>"+
          "</tr><tr><td><i class='fa fa-phone fa-1.5x'></i></td><td>"+$scope.cercano.telefono+"</td></tr><tr><td><i class='fa fa-clock-o fa-1x'></i></td><td>"+$scope.cercano.horario+"</td>"+
          "</tr><tr><td><i class='fa fa-user fa-1x'></i></td><td>"+$scope.cercano.resp+"</td></tr></tbody></table><p>Centro Mas Cercano</p>",
          maxHeight: 400,
          maxWidth: 300
         });

var beachMarker2 = new google.maps.Marker({
    position: {lat: parseFloat($scope.cercano.latitud), lng: parseFloat($scope.cercano.longitud)},
    map: map,
    icon: centroimg
    
  });
infoWindow.open(map, beachMarker2);

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
            if(response.success){
              location.href= '#login';
              Materialize.toast('Contraseña modificada exitosamente', 3000);
            }
            else{
              Materialize.toast(response.error, 3000);
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
            if(response.perfiles[0].id_perfil==1 || response.perfiles[0].id_perfil==2){
                location.href= 'administracion/#/';
            }
            else if(response.perfiles[0].id_perfil==2){
                location.href= 'vacunas/#/';
            }
            else if(response.perfiles[0].id_perfil==3){
                location.href= 'vacunas/#/';
            }
          }
          //location.href= 'administracion/index.html';
        }
      });
    };
  }])

})();
