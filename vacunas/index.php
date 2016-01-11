<?php
session_start();

if(!isset($_SESSION['id_perfil'][0]['id_perfil'])){
     header('location:..');
}
else{
    if($_SESSION['id_perfil'][0]['id_perfil']>=4){
        header('location:..');
    }
}
?><!DOCTYPE html>
<html lang="es">
<head>
    <title>MINSA</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">
    <link rel="stylesheet" href="/vendor/materialize/css/materialize.min.css">
    <link rel="stylesheet" href="/vendor/angular/angular-loading-bar/loading-bar.min.css">
    <link rel="shortcut icon" type="image/png" href="../img/favicon.png"/>
    <link rel="stylesheet" href="css/style.css">
    <link href="/vendor/select2/dist/css/select2.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="http://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet" type="text/css">
</head>
<body ng-app="eissonApp">
    <main>
        <header class="navbar-fixed">
            <ul id="menuUsuario" class="dropdown-content">
              <li><a href="#/nueva_contrasena">Cambiar Contraseña</a></li>
              <li class="divider"></li>
              <li><a href="../#/" ng-click="salir()">Salir</a></li>
            </ul>

            <nav class="cyan" role="navigation">
            <div class="nav-wrapper container">
                <a href="#/" class="brand-logo white-text">Minsa</a>
                <a id="logo-container" class="hide-on-med-and-down navbar-brand white-text" href="#/">
                    <img class="img-responsive center" src="../img/logo.png" style="top: 5px;position: relative;" alt="MINSA" height="80%">
                </a>

                  <ul class="right hide-on-med-and-down" ng-controller='TabsController'>
                    <li ng-class="{active: $route.current.activetab == 'vacunar'}" ><a href="#/vacunar-nino">Vacunar</a></li>
                    <?php

                  if($_SESSION['id_perfil'][0]['id_perfil']==1 || $_SESSION['id_perfil'][0]['id_perfil']==2){
                  echo "<li><a href='../administracion'>Módulo de Administración</a></li>" ;
                    }?>
                    <li ng-class="{active: $route.current.activetab == 'salir'}" ng-controller="logoutController">
                            <a class="dropdown-button" href="#!" data-activates="menuUsuario">
                                <i class="material-icons left">perm_identity</i> <?php echo $_SESSION['nombres']." ".$_SESSION['ape_pat'];?>
                                <i class="material-icons right">arrow_drop_down</i>
                            </a>
                    </li>
                  </ul>

                  <ul id="nav-mobile" class="side-nav" ng-controller='TabsController'>
                    <li ng-class="{active: $route.current.activetab == 'vacunar'}" ><a href="#/vacunar-nino">Vacunar</a></li>
                    <?php

                  if($_SESSION['id_perfil'][0]['id_perfil']==1 || $_SESSION['id_perfil'][0]['id_perfil']==2){
                  echo "<li><a href='../administracion'>Módulo de Administración</a></li>" ;
                    }?>
                    <li ng-class="{active: $route.current.activetab == 'salir'}" ng-controller="logoutController"><a href="../#/" ng-click="salir()">Salir</a></li>
                  </ul>

                  <a href="#" data-activates="nav-mobile"
                  class="button-collapse top-nav white-text"
                  data-sidenav="left"
                  data-closeonclick="true">
                  <i class="mdi-navigation-menu"></i></a>

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

    <script src="/vendor/jquery-2.1.4.min.js"></script>
    <!-- angular -->
    <script src="/vendor/angular/1.3.15/angular.min.js"></script>
    <script src="/vendor/angular/1.3.15/angular-animate.min.js"></script>
    <script src="/vendor/angular/1.3.15/angular-resource.min.js"></script>
    <script src="/vendor/angular/1.3.15/angular-route.min.js"></script>

    <script src='/vendor/angular/1.3.15/i18n/angular-locale_es-pe.js'></script>
    <script src="/vendor/moment.min.js"></script>
    <script src="/vendor/angular/angular-moment.min.js"></script>
    <script src="/vendor/angular/angular-loading-bar/loading-bar.min.js"></script>

    <script src="/vendor/materialize/js/materialize.min.js"></script>
    <script src="/vendor/angular/angular-materialize/angular-materialize.js"></script>
    <script src="/vendor/angular/ui-select/dist/select.js"></script>
    <script src="/vendor/select2/dist/js/select2.min.js"></script>
        <script src="/vendor/angular/ui-validate/validate.min.js"></script>
    <!-- App -->
    <script src="app/app.js"></script>
    <script src="app/controllers.js"></script>
</body>
</html>