'use strict';

/**
 * @ngdoc function
 * @name polizasAngularAppApp.controller:AfianzadorasCtrl
 * @description
 * # AfianzadorasCtrl
 * Controller of the polizasAngularAppApp
 */
angular.module('polizasAngularAppApp')
  .controller('AfianzadorasCtrl', function (
    $scope, 
    AfianzadoraService,
    toaster, 
    DataTable,
    cbk,
    $modal)
  {

    var self = $scope;

    self.afianzadora = {
    	Nombre: ''
    };

    self.table = DataTable.params({
        sorting: { Nombre: 'asc' },
        filter: { Nombre: '' }
    }, AfianzadoraService);
    
    self.table.params.reload();

    self.nuevo = function() {
    	AfianzadoraService.create(self.afianzadora, function(data) {
    		self.afianzadora = {};
    		if(data.Message)
    		{
    			toaster.pop(data.Message.Type, data.Message.Title, data.Message.Message);
                self.table.params.reload();
    		}
    	});
    };

    self.mdlEditar = function(model) {
        var modalInstance = $modal.open({
            templateUrl: 'mdlEditarAfianzadora.html',
            controller: 'AfianzadorasEditarModalCtrl',
            size: 'sm',
            resolve: {
                params: function () {
                    return {
                        model: model,
                        table: self.table
                    };
                }
            }
        });
    };

    self.mdlEliminar = function(model) {
        cbk.alert({
            title: "Eliminar", 
            msg: "¿Esta seguro de eliminarlo?", 
            accept: function(data)  {
                AfianzadoraService.delete({id: model.Id}, function(resp){
                    data.ctx.dismiss();
                    self.table.params.reload();
                    if(typeof resp.Message != 'undefined') {
                        toaster.pop(resp.Message.Type, resp.Message.Title, resp.Message.Message);
                    }
                }, function(){
                    self.table.params.reload();
                });
            }
        });
    };

  });
