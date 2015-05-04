'use strict';

/**
 * @ngdoc function
 * @name polizasAngularAppApp.controller:PolizasPolizasAgregarAfianzadoModalCtrl
 * @description
 * # PolizasPolizasAgregarAfianzadoModalCtrl
 * Controller of the polizasAngularAppApp
 */
angular.module('polizasAngularAppApp')
  .controller('PolizasAgregarAfianzadoModalCtrl', function ($scope, $modalInstance, params) {

  	$scope.afianzado = {};
  	
  	$scope.agregar = function () {
  		if(!$scope.disabled()) {
  			$modalInstance.close($scope.afianzado);
  		}
  	};

  	$scope.disabled = function() {
  		return !($scope.afianzado.ApellidoMaterno && $scope.afianzado.ApellidoPaterno && $scope.afianzado.Nombre);
  	};

  	$scope.cancelar = function () {
  		$modalInstance.dismiss($scope.afianzado);
  	};

  });