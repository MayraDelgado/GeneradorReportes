'use strict';
var angularObj = {
    app: null,
    initAngular: function (api, freshState) {
        angularObj.app = angular.module('myAplicacion', ['ngMaterial', 'material.components.expansionPanels', 'md.data.table']);

        angularObj.app.controller('accesoDatosController', ['$scope', '$filter', '$http', '$mdSelect', function ($scope, $filter, $http, $mdSelect) {
            $scope.lstDeviceGeotab = [];
            $scope.dispositivoSeleccionado = [];
            $scope.lstDevice = {};
            $scope.resultConsultaVehiculos = [];
            $scope.resultReporteFechas = [];
            $scope.resultConsultaVehiculosFiltro = [];
            $scope.resultadoFechas = [];
            $scope.resultadoVehiculos = [];
            $scope.vinNameDevice = [];
            $scope.Data = {
                start: new Date(),
                end: new Date()

            };
            $scope.selected = [];
            $scope.options = {
                boundaryLinks: true,
                rowSelection: true
            }
            $scope.query = {
                order: 'GOId',
                limit: 5,
                page: 1
            };
            $scope.logPagination = function (page, limit) {
                console.log('page: ', page);
                console.log('limit: ', limit);
            }



            // api call vehiculos geotab
            api.call("Get", {
                typeName: "Device"
            }, function (result) {
                $scope.lstDeviceGeotab = result;
                $scope.lstDeviceGeotab.forEach(function (device) {
                    $scope.lstDevice.id = device;
                    //console.log(device);
                }); //console.log(device);
            }, function (error) {
                console.log(error.message);
            });

            // funcion que permite ingresar texto en el search 
            $scope.updateSearch = function updateSearch(e) {
                e.stopPropagation();
            };

            $scope.getDevice = function (device) {
                try {
                    //$scope.dispositivoSeleccionado = device;
                    $scope.$apply();

                } catch (error) {
                    console.log(error.message);
                }
            }
            /* $scope.consultaReporteFechas = function () {
                 //console.log("muestra mensaje timer");
                 try {
                     swal({
                         imageUrl: '../img/cargando.gif',
                         timer: 5000,
                         showConfirmButton: false
                     }).then(function (result) {
                         console.log({
                             start: moment($scope.Data.start).format('MM-DD-YYYY'),
                             end: moment($scope.Data.end).format('MM-DD-YYYY')
                         });
                         //return;
                         var conAjax = $http.post("https://cppa.metricamovil.com/PMFReports/DateReport", {
                             start: moment($scope.Data.start).format('MM-DD-YYYY'),
                             end: moment($scope.Data.end).format('MM-DD-YYYY')
                         }, {
                             headers: {
                                 'Content-Type': 'application/json'
                             }
                         }).then(function successCallback(response) {
                             console.log(response);
                             $scope.resultReporteFechas = response.data;
                         }, function errorCallback(response) {
                             console.error(response);
                         });
                     });


                 } catch (error) {
                     console.log(error.message);
                 }
             }*/

            /* $scope.reporteFechas = function () {
                try {

                } catch (error) {
                    console.error(error.message);
                }
            }
*/
            $scope.fechasreport = function () {

                // $scope.dispositivoSeleccionado = $scope.lstDeviceGeotab;

                swal({
                    imageUrl: '../img/cargando5.gif',
                    timer: 5000,
                    showConfirmButton: false
                });
                var conAjax = $http.post("https://cppa.metricamovil.com/PMFReports/DateReport", {
                    start: moment($scope.Data.start).format('MM-DD-YYYY'),
                    end: moment($scope.Data.end).format('MM-DD-YYYY')
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function successCallback(response) {
                    console.log(response);
                    /*if(response.data.status ==="400"){
                        swal({
                            type: 'error',
                            //title: 'Oops...',
                            text: 'No existen registros en el rango de fechas seleccionado',
                        });
                    }*/
                    $scope.lstDevice.forEach(function (filtroDeviceGeotab) {
                        response.forEach(function (filtroDeviceApi) {
                            //modificar aqui XD  
                        })
                    })

                    $scope.resultReporteFechas = response.data;
                    if ($scope.resultReporteFechas.length === 0) {
                        swal({
                            type: 'error',
                            //title: 'Oops...',
                            text: 'No existen registros en el rango de fechas seleccionado',
                        });
                    }

                });
            }

            /* $scope.consultaVehiculos = function () {
                 try {
                     //$scope.dispositivoSeleccionado = $scope.lstDeviceGeotab;
                     var dispositivoSeleccionadoAux = this.dispositivoSeleccionado;
                     if (dispositivoSeleccionadoAux.length > 0) {
                         swal({
                             imageUrl: "../img/cargando5.gif",
                             timer: 5000,
                             showConfirmButton: false
                         }).then(function (result) {
                             var listaIds = [];
                             dispositivoSeleccionadoAux.forEach(function (dispositivo) {
                                 listaIds.push(dispositivo.id);
                             });
                             var conAjax = $http.post("https://cppa.metricamovil.com/PMFReports/DeviceReport", JSON.stringify({
                                 start: moment($scope.Data.start).format('MM-DD-YYYY'),
                                 end: moment($scope.Data.end).format('MM-DD-YYYY'),
                                 devices: listaIds
                             }), {
                                 headers: {
                                     'Content-Type': 'application/json'
                                 }
                             }).then(function successCallback(response) {
                                 $scope.resultConsultaVehiculos = response.data;
                                 console.log(response);
                                 if ($scope.resultConsultaVehiculos.length === 0) {
                                     swal({
                                         type: 'error',
                                         title: 'Oops....',
                                         text: 'No existen registros en el rango de fechas seleccionado'
                                     });
                                 }
                             }, function errorCallback(respone) {
                                 console.error(response);
                             });
                         });
                     }

                 } catch (error) {
                     console.log(error.message);
                 }
             }*/

            $scope.vehiculosreport = function () {
                var dispositivoSeleccionadoAux = this.dispositivoSeleccionado;
                if (dispositivoSeleccionadoAux.length === 0) {
                    swal({
                        type: 'error',
                        text: 'Debes seleccionar al menos un vehículo para continuar la consulta !',
                    })
                } else
                if (dispositivoSeleccionadoAux.length > 0) {
                    swal({
                        imageUrl: '../img/cargando5.gif',
                        timer: 5000,
                        showConfirmButton: false,
                    });
                    var listaIds = [];
                    dispositivoSeleccionadoAux.forEach(function (dispositivo) {
                        listaIds.push(dispositivo.id);
                    });
                    var conAjax = $http.post("https://cppa.metricamovil.com/PMFReports/DeviceReport", JSON.stringify({
                        start: moment($scope.Data.start).format('MM-DD-YYYY'),
                        end: moment($scope.Data.end).format('MM-DD-YYYY'),
                        devices: listaIds
                    }), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function successCallback(response) {
                            $scope.resultConsultaVehiculos = response.data;
                            console.log(response);
                            if ($scope.resultConsultaVehiculos.length === 0) {
                                swal({
                                    type: 'error',
                                    text: 'No existen registros en el rango de fechas seleccionado',
                                });
                            }
                        },
                        function errorCallback(response) {
                            console.error(response);
                        });
                }
            }

            /* $scope.crearCSVFechas = function () {
                 $('#fechaInstalacion').table2excel({
                     exclude: ".noExl",
                     fileext: ".xls",
                     filename: "AuditoríadeRegistros_Fechas" + new Date().toUTCString().replace(/[\-\:\.]/g, "")
                 });
                 limpiarTableFechas();
             }*/
            /*$scope.crearCSVvehiculo = function () {
                $("#fechaDevice").table2excel({
                    exclude: ".noExl",
                    fileext: ".xls",
                    filename: "AuditoríadeRegistros_Dispositivos" + new Date().toUTCString().replace(/[\-\:\.]/g, "")
                });
            }*/

            $scope.crearCSVFechas = function () {
                if ($scope.resultReporteFechas.length === 0) {
                    swal(
                        '',
                        'No hay datos que descargar',
                        "error",
                    )
                    console.log("No hay datos que descargar");
                } else
                if ($scope.resultReporteFechas.length > 0) {
                    $("#fechaInstalacion").table2excel({
                        filename: "AuditoríadeRegistros_Fechas"
                    });
                }
            }
            $scope.crearCSVvehiculo = function () {
                if ($scope.resultConsultaVehiculos.length === 0) {
                    swal(
                        '',
                        'No hay datos que descargar',
                        "error",
                    )
                    console.log("No hay datos que descargar");
                } else
                if ($scope.resultConsultaVehiculos.length > 0) {
                    $("#fechaDevice").table2excel({
                        filename: "AuditoríadeRegistros_Dispositivos"
                    });
                }
            }

            /* var url = "../img/pruebaExcelAddin.xlsx";
             $scope.req = new XMLHttpRequest();
             $scope.req.open("GET", url, true);
             $scope.req.responseType = "arraybuffer";
             $scope.onload = function (e) {
                 $scope.data = new Uint8Array($scope.req.response);
                 $scope.workbook = XLSX.read($scope.data, {
                     type: "array"
                 });
                 $scope.first_sheet_name = $scope.workbook.SheetNames[0];
                 $scope.worksheet = workbook.Sheets[first_sheet_name];
                 console.log(XLSX.utils.sheet_to_json(worksheet));
             }
             $scope.req.send();*/
            // Check for the various File API support.
            if (window.Blob) {
                console.log("Great success")
                // Great success! All the File APIs are supported.
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }


        }]);

        angularObj.app.config(function ($mdDateLocaleProvider) {
            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('MM-DD-YYYY');
            }
        });
        angularObj.app.directive('myOnFocus', function () {
            return {
                scope: true,
                restrict: 'A',
                link: function (scope, elem, attr, ctrl) {
                    scope.showOptions = true;
                    if ((attr['mdOnClose'])) {
                        attr['mdOnClose'] = "showOptions=false;" + (attr['mdOnClose']);
                    } else {
                        (attr['mdOnClose']) = "showOptions=false;"
                    }
                    elem.bind('focus', function () {
                        if (scope.showOptions) {
                            console.log(scope, elem, attr, ctrl);
                            elem.triggerHandler('click');
                        }
                    });
                    elem.bind('blur', function () {
                        scope.showOptions = true;
                    });
                }
            };
        });


    }
}