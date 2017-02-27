'use strict';

/**
 * @ngdoc service
 * @name sistemaPolizasPgApp.ingresos.service
 * @description
 * # ingresos.service
 * Service in the sistemaPolizasPgApp.
 */
angular.module('sistemaPolizasPgApp')
  .service('IngresosService', function ($http, api, toaster, $localStorage) {
  	var url = api + 'ingresos/';
  	var service = {};

    service.error = function(a, status, c, d) {
      toaster.pop('error', 'Error', 'Ocurrio un error ' + status);
      console.log(a);
      console.log(status);
      console.log(c);
      console.log(d);
    };

    service.query = function(par, fn) {
      var _url = url + '?' + par;
      $http({method: 'GET', url: _url, cache: false}).success(function(data) {
        fn(data);
      }).error(service.error);
    };

  	service.count = function(par, fn) {
      var _url = url + 'Count?anio=' + par.anio + '&mes=' + par.mes + '&dia' + par.dia;
      $http.get(_url).success(function(data) {
        fn(data);
      }).error(service.error);
    };

    service.all = function(id, fnSuccess) {
      var _url = url + 'All?id=' + id;
      console.log(_url);
      $http.get(_url).success(fnSuccess).error(service.error);
    };

    service.add = function(idPoliza, ingreso, depositante, fnSuccess) {
      var _url = url + 'Add';
      return $http.post(_url, { idPoliza: idPoliza, ingreso : ingreso, depositante: depositante })
        .success(fnSuccess)
        .error(service.error);
    };

    service.total = function(fnSuccess, fnError) {
      var _url = url + 'total';
      var token = $localStorage.token;
      var headers = {};
      if (token) {
        headers.Authorization = 'Bearer ' + token;
      }

      return $http({
        type: 'GET',
        url: _url,
        headers: headers
      }).then(fnSuccess, fnError);
      /*
      $.ajax({
        type: 'GET',
        url: _url,
        headers: headers
      }).done(fnSuccess).fail(fnError);
      */
    };

    return service;
  });
