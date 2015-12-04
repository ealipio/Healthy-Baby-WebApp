(function(){

'use strict';

angular.module('Fabricas', ['ngResource'])

  .factory('usuarioF', [ '$http', function ($http) {
    var session = {}, ldap = {};
    return {
      setUser: function(usuario) {session = usuario;},
      setldap: function(userdata) {ldap = userdata;},
      getldap: function() {return ldap;},
      getUser: function() {return session;}
    };
  }])

  .factory('reunionF', [
    '$http',
    function ($http) {
      return $http.get('backend/api/index.php/reunion');
  }]);
})();