angular.module('starter.controllers', [])

  .filter('sexoFilter', function(){
    return function(input){
      var sexo = "Masculino";
      if(input == "F"){
        sexo = "Femenino";
      }
      return sexo;
    };
  })

  .filter('negativo', function(){
  return function(id){
    var valor= id*(-1);

      return valor;
    };
  })


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PrincipalController', function($scope, $stateParams) {})
.controller('VacunaController', function($scope, $stateParams, $http) {
  console.log('stateParams');
  $scope.getVacuna = function(id) {
    $http(
      {
        method:'GET',
        url: 'http://esdeporvida.com/projects/minsa/api/android/getVacuna.php?id=' + id,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).success(function(response) {
          $scope.vacuna = response;
    });
  };
  $scope.getVacuna($stateParams.vacunaID);
})
.controller('VacunasController', function($scope, $stateParams, $rootScope, $http) {
  console.log('VacunasController');
    $scope.getVacunas=function() {
      $http({method:'GET',url: 'http://esdeporvida.com/projects/minsa/api/android/getVacunas.php', headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        $scope.vacunas = response;
      });
    };
    $scope.getVacunas();
})
.controller('ResultadosDetailController', function($scope, $stateParams) { })


.controller('ResultadosController', function($scope, $location,$rootScope, $http, $ionicLoading) {
  console.log('ResultadosController ');
  $scope.getChildVacunas = function () {
    console.log('ResultadosController > getChildVacunas');
    $ionicLoading.show({content: 'Buscando...', showBackdrop: true });
    $http({
      method:'POST',
      url: 'http://esdeporvida.com/projects/minsa/api/android/getVacunasA.php',
      data: $.param({data:$rootScope.nino_ws}),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
      console.log('ResultadosController > getChildVacunas : success > response', response);
      $scope.vacunas = response;
      $ionicLoading.hide();
    });
  };

  $scope.checkData = function () {
    if (!$rootScope.nino_ws) {
      $location.path('/app/buscar').replace();
    } else{
      $scope.getChildVacunas();
    }
  };
  $scope.checkData();
})


/*
.controller('ResultadosController', function($scope, $stateParams, $location, $rootScope) {
  $scope.nino_ws = $rootScope.nino_ws;
  $scope.vacunas = $rootScope.vacunas;
  $scope.correos = $rootScope.correos;
  $scope.data = {"tipo": "dni", "numero": 12345678, "paterno": "Castillo", "materno":"garcia", "nacimiento":"22/05/2015"};
  $scope.calendario = function(numero){
    $location.path('/app/playlists/'+numero).replace();
  };
})*/

.controller('BuscarController', function($scope, $stateParams, $location, $http, $ionicLoading, $rootScope) {
  $scope.showTable=false;
  $scope.neneData = {"tipo":"3", "numero":42579084};


  $scope.buscarNeneByCNV = function() {


    if($scope.neneData.tipo == "1"){
        console.log('BuscarController > buscarNeneByCNV');
        $scope.loading = $ionicLoading.show({content: 'Buscando...', showBackdrop: true });
          $http(
            {method:'GET',
            url: 'http://esdeporvida.com/projects/minsa/api/wsByNumero.php?numero='+$scope.neneData.numero,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
              console.log('BuscarController > buscarNeneByCNV : done');
              delete $rootScope.nino_ws;
              if( response.success){
                console.log('BuscarController > buscarNeneByCNV : done : if');
                $ionicLoading.hide();
                $rootScope.nino_ws        = response.success;
                $rootScope.nino_ws.FecNac = $rootScope.nino_ws.FecNac.substr(0,4) + "-" + $rootScope.nino_ws.FecNac.substr(4,2) + "-" + $rootScope.nino_ws.FecNac.substr(6,2);
                console.log('BuscarController > buscarNeneByCNV : done : if : response', response);
                console.log('BuscarController > buscarNeneByCNV : done : if : $rootScope.nino_ws', $rootScope.nino_ws);
                $location.path('/app/resultados').replace();
              } else{
                $ionicLoading.hide();
                console.log('BuscarController > buscarNeneByCNV : done : else');
                alert("Lo lamento, " + response.error);
              }
          }).error(function() {
              alert('Lo lamento, el servidor no esta respondiendo. por favor intentelo mas tarde.');
              $ionicLoading.hide();
          });
    }

       else {
        console.log('BuscarController > buscarNeneByCNV');
        $scope.loading = $ionicLoading.show({content: 'Buscando...', showBackdrop: true });
          $http(
            {method:'GET',
            url: 'http://esdeporvida.com/projects/minsa/api/wsByDniMadre.php?numero='+$scope.neneData.numero,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
              console.log('BuscarController > buscarNeneByCNV : done');
              delete $rootScope.nino_ws;
              if( response.success){
     
    // var  response = {"success":[{"NuCnv":"1000805566","UbiDomMad":"140137","Sexo":"F","Peso":"2550","Talla":"46 ","FecNac":"20150709","LugNac":"01","UbiNac":"140101","AtePor":"02","TipPar":"01","ConPar":"01","DurEmb":"38","Fin":"02"},{"NuCnv":"1000131212","UbiDomMad":"140137","Sexo":"F","Peso":"2514","Talla":"47 ","FecNac":"20130423","LugNac":"01","UbiNac":"140101","AtePor":"01","TipPar":"01","ConPar":"01","DurEmb":"37","Fin":"01"}]}
                console.log('BuscarController > buscarNeneByCNV : done : if');
                //$ionicLoading.hide();

                $rootScope.ninos_ws        = response.success;
          
                $scope.showTable=true;
                console.log('BuscarController > buscarNeneByCNV : done : if : response', response);
                console.log('BuscarController > buscarNeneByCNV : done : if : $rootScope.nino_ws', $rootScope.nino_ws);
               // $location.path('/app/resultados').replace();


              } else{
                $ionicLoading.hide();
                console.log('BuscarController > buscarNeneByCNV : done : else');
                alert("Lo lamento, " + response.error);
              }
          }).error(function() {
              alert('Lo lamento, el servidor no esta respondiendo. por favor intentelo mas tarde.');
              $ionicLoading.hide();
          });

    }

  };


  $scope.selecNino = function(index) {
      $rootScope.nino_ws = $rootScope.ninos_ws[index];
      $ionicLoading.hide();
      $location.path('/app/resultados').replace();

  }
  

})

.controller('AdicionalController', function($scope, $filter, $location, $rootScope, $http, $ionicLoading, $ionicPopup) {
  console.log('AdicionalController');
  $scope.vacunarNene = function(){
    console.log('AdicionalController > vacunarNene');
    $scope.nino_ws.fecha_medicion_ = $filter("date")($scope.nino_ws.fecha_medicion, 'yyyy-MM-dd');
    $ionicLoading.show({content: 'Registrando Informacion Adicional...', showBackdrop: true });
    $http({
      method:'POST',
      url: 'http://esdeporvida.com/projects/minsa/api/android/adicional.php',
      data: $.param({nino_ws:$scope.nino_ws, usuario:$scope.usuario }),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
      $ionicLoading.hide();
      $ionicPopup.alert({ title: 'Listo!', template: 'La informacion Adicional fue registrada exitosamente.' });
      $location.path('/app/buscar').replace();
    }).error(function() {
        $ionicLoading.hide();
        $ionicPopup.alert({ title: 'Error!', template: 'El servidor no responde, por favor intentelo mas tarde.' });
    });
  };

  $scope.checkUser = function(){
    if (!$rootScope.usuario) {
      $location.path('/app/logeo').replace();
    } else{
      $scope.nino_ws = $rootScope.nino_ws;
      $scope.nino_ws.fecha_medicion = new Date();
    }
  };
  $scope.checkUser();
})

.controller('VacunarloYaController', function($scope, $filter, $location, $rootScope, $http, $ionicLoading, $ionicPopup) {
  console.log('VacunarloYaController');

  $scope.vacunarNene = function() {
    $scope.item.fecha_vacunacion_ = $filter("date")($scope.item.fecha_vacunacion, 'yyyy-MM-dd');
    $ionicLoading.show({content: 'Registrando al chamaco...', showBackdrop: true });
    $http({
      method:'POST',
      url: 'http://esdeporvida.com/projects/minsa/api/android/vacunarNene.php',
      data: $.param({item:$scope.item, nino_ws:$scope.nino_ws, usuario:$scope.usuario }),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
      $ionicLoading.hide();
      $ionicPopup.alert({ title: 'Vacunado!', template: 'El niño fue vacunado exitosamente' });
      console.log($scope.item);
      $location.path('/app/profesional-buscar').replace();
    }).error(function() {
        $ionicLoading.hide();
        $ionicPopup.alert({ title: 'Error!', template: 'El servidor no responde, por favor intentelo mas tarde.' });
    });
  };

  $scope.checkUser = function(){
    if (!$rootScope.usuario) {
      $location.path('/app/logeo').replace()
    } else{
      $scope.item    = $rootScope.item;
      $scope.nino_ws = $rootScope.nino_ws;
      $scope.usuario = $rootScope.usuario;
      // set current date(yyyy,mm,dd)
      //$scope.item.fecha_vacunacion = moment();
      //$scope.item.fecha_vacunacion = new Date(2016, 01, 11);
      $scope.item.fecha_vacunacion = new Date();
      //$scope.item.fecha_vacunacion = ( new Date() ).toISOString().split("T")[0];
      //console.log(( new Date() ).toISOString().split("T")[0]); : 2016-01-11
    }
  };
  $scope.checkUser();
})

.controller('ProfesionalVacunarController', function($scope, $stateParams, $location, $rootScope, $http, $ionicLoading,  $ionicPopup) {
  console.log('ProfesionalVacunarController ');
  //$ionicPopup.alert({ title: 'Error!', template: 'Sorry something went wrong' });
  $scope.getChildVacunas = function () {
    //console.log('ProfesionalVacunarController > getChildVacunas');
    $ionicLoading.show({content: 'Buscando...', showBackdrop: true });
    $http({method:'POST',url: 'http://esdeporvida.com/projects/minsa/api/android/getVacunasA.php', data: $.param({data:$rootScope.nino_ws}), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
      console.log('ProfesionalVacunarController > getChildVacunas : success > response', response);
      $scope.vacunas = response;
      $ionicLoading.hide();
    });
  };

  $scope.vacunarloYa = function (item) {
    $rootScope.item = item;
    $location.path('/app/vacunarlo-ya').replace();
  };

  $scope.adicional = function () {
    $location.path('/app/adicional').replace();
  };

  $scope.checkData = function () {
    if (!$rootScope.nino_ws) {
      $location.path('/app/profesional-buscar').replace();
    } else{
      $scope.getChildVacunas();
    }
  };
  $scope.checkData();
})

.controller('ProfesionalBuscarController', function($scope, $stateParams, $location, $http, $ionicLoading, $rootScope) {
 
  console.log('ProfesionalBuscarController > $rootScope.usuario', $rootScope.usuario);
  $scope.neneData = {"numero":1000999595};
  $scope.buscarNeneByCNV = function() {
  
    console.log('ProfesionalBuscarController > buscarNeneByCNV');
    $scope.loading = $ionicLoading.show({content: 'Buscando...', showBackdrop: true });
      $http(
        {method:'GET',
        url: 'http://esdeporvida.com/projects/minsa/api/wsByNumero.php?numero='+$scope.neneData.numero,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
          console.log('ProfesionalBuscarController > buscarNeneByCNV : done');
          delete $rootScope.nino_ws;
          if( response.success){
            console.log('ProfesionalBuscarController > buscarNeneByCNV : done : if');
            $ionicLoading.hide();
            $rootScope.nino_ws        = response.success;
            $rootScope.nino_ws.FecNac = $rootScope.nino_ws.FecNac.substr(0,4) + "-" + $rootScope.nino_ws.FecNac.substr(4,2) + "-" + $rootScope.nino_ws.FecNac.substr(6,2);
            console.log('ProfesionalBuscarController > buscarNeneByCNV : done : if : response', response);
            console.log('ProfesionalBuscarController > buscarNeneByCNV : done : if : $rootScope.nino_ws', $rootScope.nino_ws);
            $location.path('/app/profesional-vacunar').replace();
          } else{
            console.log('ProfesionalBuscarController > buscarNeneByCNV : done : else');
            alert("Lo lamento, " + response.error);
            $ionicLoading.hide();
          }
      }).error(function() {
          alert('Lo lamento, el servidor no esta respondiendo. por favor intentelo mas tarde.');
          $ionicLoading.hide();
      });
  };

  $scope.checkUser = function () {
    if (!$rootScope.usuario)  $location.path('/app/logeo').replace();
  }

  $scope.checkUser();

})
.controller('LogeoController', function($scope, $state, $http, $ionicLoading, $location, $rootScope, $ionicPopup) {
  console.log('LogeoController');
  if (!$rootScope.usuario) {
    console.log('LogeoController > if');
    $scope.loginData = {};
    $scope.doLogin = function() {
      if( $scope.loginData.username && $scope.loginData.password ) {
        $scope.loading = $ionicLoading.show({content: 'Iniciando sesion...', showBackdrop: true });
        $http({method:'POST',url: 'http://esdeporvida.com/projects/minsa/api/android/login.php', data:$.param($scope.loginData), headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
            $ionicLoading.hide();
            if(response.success){
              $rootScope.usuario = response.success;
              //$ionicPopup.alert({ title: 'Bienvenido', template: 'Bienvenido ' + response.success.nombres });
              $location.path('/app/profesional-buscar').replace();
            }
            if (response.error) {
              $ionicPopup.alert({ title: 'Error', template: response.error });
              //alert(response.error);
            }
        }).error(function(){
          $ionicLoading.hide();
          $ionicPopup.alert({ title: 'Error Server', template: 'Lo lamento, el servidor no responde, por favor intentelo mas tarde.' });
        });
      } else{
        $ionicPopup.alert({ title: 'Campos Vacios', template: 'Por favor completa todos los campos para iniciar sesion.' });
      }
    };
  } else{
    console.log('LogeoController > else');
    //$location.path('/app/profesional-buscar').replace();
    $state.go('app.profesional-buscar');
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
  $scope.playlistId = $stateParams.playlistId;
});