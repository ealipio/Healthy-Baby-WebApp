// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularMoment','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//vacunarlo-ya
  .state('app.vacunarlo-ya', {
    cache:false,
    url: '/vacunarlo-ya',
    views: {
      'menuContent': {
        templateUrl: 'templates/vacunarlo-ya.html',
        controller: 'VacunarloYaController'
      }
    }
  })

  .state('app.adicional', {
    cache:false,
    url: '/adicional',
    views: {
      'menuContent': {
        templateUrl: 'templates/adicional.html',
        controller: 'AdicionalController'
      }
    }
  })

  .state('app.resultados', {
    url: '/resultados',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/resultados.html',
        controller: 'ResultadosController'
      }
    }
  })
  .state('app.alertas', {
    url: '/alertas',
    views: {
      'menuContent': {
        templateUrl: 'templates/alertas.html'
      }
    }
  })
  .state('app.profesional-vacunar', {
    url: '/profesional-vacunar',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/profesional-vacunar.html',
        controller: 'ProfesionalVacunarController'
      }
    }
  })
  .state('app.profesional-buscar', {
    url: '/profesional-buscar',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/profesional-buscar.html',
        controller: 'ProfesionalBuscarController'
      }
    }
  })
  .state('app.buscar', {
    url: '/buscar',
    views: {
      'menuContent': {
        templateUrl: 'templates/buscar.html',
        controller: 'BuscarController'
      }
    }
  })
  .state('app.vacunas', {
    url: '/vacunas',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/vacunas.html',
        controller: 'VacunasController'
      }
    }
  })
  .state('app.vacuna', {
    url: '/vacuna/:vacunaID',
    views: {
      'menuContent': {
        templateUrl: 'templates/vacuna.html',
        controller: 'VacunaController'
      }
    }
  })
  .state('app.centros', {
    url: '/centros',
    views: {
      'menuContent': {
        templateUrl: 'templates/centros.html'
      }
    }
  })


  .state('app.logeo', {
      url: '/logeo',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/logeo.html',
          controller: 'LogeoController'
        }
      }
    })
    .state('app.principal', {
      url: '/principal',
      views: {
        'menuContent': {
          templateUrl: 'templates/principal.html',
          controller: 'PrincipalController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/principal');
});
