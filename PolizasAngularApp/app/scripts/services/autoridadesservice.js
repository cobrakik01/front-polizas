'use strict';

/**
 * @ngdoc service
 * @name polizasAngularAppApp.AutoridadesService
 * @description
 * # AutoridadesService
 * Service in the polizasAngularAppApp.
 */
angular.module('polizasAngularAppApp')
  .service('AutoridadesService', function ($http, api, toaster) {

  	var url = api + 'Autoridades/';
  	var service = {};

  	service.error = function(a, status, c, d) {
      toaster.pop('error', 'Error', 'Ocurrio un error ' + status);
      console.log(a);
      console.log(status);
      console.log(c);
      console.log(d);
    };

    service.query = function(par, fn) {
      var params = '?count=' + par.count + '&filter=' + par.filter + '&page=' + par.page + '&sorting=' + par.sorting;
      var _url = url + params;
      $http({method: 'GET', url: _url, cache: false}).success(function(data) {
        fn(data);
      }).error(service.error);
    };
    
  	service.create = function(model, fn) {
      var data = {nombre: model.nombre};
      $http.post(url, data).success(function(data) {
        fn(data);
      }).error(service.error);
    };

    service.delete = function(model, fn) {
      var _url = url + '?id=' + model.id;
      $http.delete(_url).success(function(data) {
        fn(data);
      }).error(service.error);
    };

    service.edit = function(model, fn) {
      $http.patch(url, model).success(function(data) {
        fn(data);
      }).error(service.error);
    };
  	return service;

  });
