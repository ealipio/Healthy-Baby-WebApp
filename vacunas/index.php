<?php
session_start();

if(!isset($_SESSION['id_perfil'][0]['id_perfil'])){  
     header('location:..');
}
else{
    if($_SESSION['id_perfil'][0]['id_perfil']==3){
        header('location:..');
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <title>MINSA</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.8.0/loading-bar.min.css">
    <link rel="shortcut icon" type="image/png" href="../img/favicon.png"/>
    <link rel="stylesheet" href="css/style.css">
</head>
<body ng-app="eissonApp">
    <main>
        <header>
            <nav class="cyan darken-2" role="navigation">
            <div class="nav-wrapper container">
                <a id="logo-container" class="navbar-brand white-text" href="#/">
                    <img class="img-responsive center" src="../img/logo.png" style="top: 5px;position: relative;" alt="MINSA" height="80%">
                </a>
                  <ul class="right hide-on-med-and-down" ng-controller='TabsController'>                
                    <li ng-class="{active: $route.current.activetab == 'consultar'}" ><a href="#/">Consultar</a></li>
                    <!-- <li ng-class="{active: $route.current.activetab == 'vacunas'}" ><a href="#/vacunas">Vacunas x Niño</a></li> -->
                    <li ng-class="{active: $route.current.activetab == 'vacunar'}" ><a href="#/vacunar-nino">Vacunar</a></li>
                    <?php 
                  
                  if($_SESSION['id_perfil'][0]['id_perfil']==1){
                  echo "<li><a href='../administracion'>Módulo de Administración</a></li>" ;
                    }?>
                    <li ng-class="{active: $route.current.activetab == 'salir'}" ng-controller="logoutController"><a href="../#/" ng-click="salir()">Salir</a></li>
                  </ul>
            </div>
            </nav>
        </header>

        <div class="container" id="container">
            <div class="ng-view"></div>
        </div>
    </main>

    <footer class="page-footer blue-grey darken-2">
      <div class="container" style="background: url(../img/footer-peru.jpg) no-repeat 100% 100%;">
        <div class="row">
          <div class="col l12 s12">
            <h5 class="white-text">Ministerio de Salud</h5>
            <p class="grey-text text-lighten-4">
              Av. Salaverry 801 Jesús María Lima / Per&uacute;Atenci&oacute;n: Lunes a Viernes 8.30 a.m. a 4.30 p.m.<br>Central Telefónica (51-1) 315-6600  <br>  webmaster@minsa.gob.pe
            </p>
          </div>
        </div>
      </div>
      <div class="footer-copyright" style="background: #000;">
        <div class="container">Made by <a class="yellow-text text-darken-4" href="http://mindtec.pe">Mindtec</a></div>
      </div>
    </footer>


    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <!-- angular -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-animate.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-resource.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-route.min.js"></script>
    <script src='https://code.angularjs.org/1.3.15/i18n/angular-locale_es-pe.js'></script>
    <script src="https://cdn.jsdelivr.net/momentjs/2.10.6/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/angular.moment/1.0.0-beta.3/angular-moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.8.0/loading-bar.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.1/js/materialize.min.js"></script>
    <script src="/vendor/angular/angular-materialize/angular-materialize.js"></script>
    <script src="/vendor/angular/ui-select/dist/select.js"></script>
    <!-- App -->
    <script src="app/app.js"></script>
    <script src="app/controllers.js"></script>
</body>
</html>