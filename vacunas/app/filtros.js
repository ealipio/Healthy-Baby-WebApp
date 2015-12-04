(function(){
	'use strict';
	angular.module('Filtos', [])

	.filter('status', function(){
		return function(input){
			var status = new Array("---------", "En Sala", "Visitado", "Cargando");
			return status[input];
		};
	})

	.filter('sala', function(){
		return function(input){
			var status = new Array("", "MSO Miraflores", "COSB", "RSO Trujillo", "RSO Arequipa", "RSO Huancayo");
			return status[input];
		};
	})

	.filter('apertura', function(){
		return function(input){
			var status = new Array("-------------", "O&M CORE", "VIGILANCIA", "Cargando");
			return status[input];
		};
	})

	.filter('personal', function(){
	return function(id){
		var tipos = ['Ejecutor','POC','Soporte','BabySitting', 'POC Llaves', 'PMO', 'Ejecutor Responsable', 'Prevencionista de Riesgo'];
			return tipos[id];
		};
	})

	.filter('validacion', function(){
		return function(input){
			var status = new Array("pendiente", "aprobado", "rechazado", "Cargando", "N/A");
			return status[input];
		};
	});

})();