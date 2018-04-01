
/*
 Angular Softtion v1.1.8
 (c) 2016-2018 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 05/Ene/2016
*/

((factory) => {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error(
            "Softtion Angular requiere Softtion y Angular cargado en la Aplicación"
        );
    } // No se ha cargado Softtion y Angular
})((softtion, angular) => {
    
    var ngSofttion = angular.module("ngSofttion", []);

    // SERVICIO: $restful

    ngSofttion.service("$restful", $restful);
    
    $restful.$inject = [ "$q", "$http" ];
    
    function $restful($q, $http) {
        
        // Métodos del servicio 
        this.create = create;
        
        function create(baseURL) {
            return new HttpRestful(baseURL, $q, $http);
        };
    }
        
    var HttpRestful = function (baseURL, q, http) {
        this.baseURL = baseURL;     // URL del recurso
        this.$q = q;                // Servicio Promesa
        this.$http = http;          // Servicio HTTP
        this.config = {};           // Configuración de petición
    };
    
    HttpRestful.prototype.getBaseURL = function () {
        return this.baseURL;
    };
    
    HttpRestful.prototype.setConfig = function (config) {
        this.config = config; return this;
    };
    
    HttpRestful.prototype.clean = function () {
        this.config = {}; return this; 
    };
        
    HttpRestful.prototype.getResourceRoute  = function (ID, suffixes) {
        var URL = this.getBaseURL();

        if (softtion.isDefined(ID)) {
            URL += "/" + ID;
        } // Agregando ID de recurso en URL

        URL = softtion.generateUrl(URL, suffixes);
        
        return URL; // URL generada del recurso
    };

    HttpRestful.prototype.resource = function (ID, name) {
        var self = this, // Instancia 
            baseURL = this.getResourceRoute(ID, [name]),
            $q = self.$q, $http = self.$http;
        
        return new HttpRestful(baseURL, $q, $http); // Recurso
    };

    // HTTP GET

    HttpRestful.prototype.catalog = function () {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute();
            
            self.$http.get(URL, self.config).
                then((response) => {
                    self.clean(); resolve(response);
                }).catch((error) => {
                    self.clean(); reject(error);
                });
        });
    };

    HttpRestful.prototype.record = function (ID) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID);
            
            self.$http.get(URL, self.config).
                then((response) => {
                    self.clean(); resolve(response);
                }).catch((error) => {
                    self.clean(); reject(error);
                });
        });
    };

    // HTTP POST

    HttpRestful.prototype.store = function (data) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute();
            
            self.$http.post(URL, data, self.config).
                then((response) => {
                    self.clean(); resolve(response);
                }).catch((error) => {
                    self.clean(); reject(error);
                });
        });
    };

    // HTTP PUT

    HttpRestful.prototype.modify = function (ID, data) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID);
            
            self.$http.put(URL, data, self.config).
                then((response) => {
                    self.clean(); resolve(response);
                }).catch((error) => {
                    self.clean(); reject(error);
                });
        });
    };

    // HTTP DELETE

    HttpRestful.prototype.remove = function (ID) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID);
            
            self.$http.delete(URL, self.config).
                then((response) => {
                    self.clean(); resolve(response);
                }).catch((error) => {
                    self.clean(); reject(error);
                });
        });
    };
    
    // SERVICIO: $fileHttp
    
    ngSofttion.service("$fileHttp", $fileHttpService);
    
    $fileHttpService.$inject = [ "$q", "$http", "$timeout", "$window" ];
    
    function $fileHttpService($q, $http, $timeout, $window) {
        
        // Métodos del servicio 
        this.download = download;
        this.print = print;
        this.preview = preview;
        
        function getDataFile(response, type) {
            var blob = new Blob([response.data], { type: type }),
                URL = $window.URL.createObjectURL(blob);
        
            return { blob: blob, url: URL }; // Resultado de archivo
        }
        
        function download(attrs) {
            return $q((resolve, reject) => {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", params: attrs.params
                }).then((response) => {
                    // Generar datos para descargar
                    var file = getDataFile(response, attrs.type);
                    
                    var element = "<a/>",
                        properties = { 
                            href: file.url, download: attrs.fileName 
                        };

                    angular.element(element, properties).
                        appendTo("body")[0].click();

                    $timeout(() => { $window.URL.revokeObjectURL(file.url); }, 10000);
                    
                    resolve(file.blob); // Proceso correcto
                }).catch((error) => { 
                    reject(error); // Error al descargar archivo
                });
            });
        };
        
        function print(attrs) {
            return $q((resolve, reject) => {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", params: attrs.params
                }).then((response) => {
                    // Generar datos para imprimir
                    var file = getDataFile(response, attrs.type);

                    $window.open(file.url).print(); 
                    
                    resolve(file.blob); // Proceso correcto
                }).catch((error) => { 
                    reject(error); // Error al imprimir archivo
                });
            });
        };
        
        function preview(attrs) {
            return $q((resolve, reject) => {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", params: attrs.params
                }).then((response) => {
                    // Generar datos para visualizar
                    var file = getDataFile(response, attrs.type);

                    $window.open(file.url); 
                    
                    resolve(file.blob); // Proceso correcto
                }).catch((error) => { 
                    reject(error); // Error al visualizar archivo
                });
            });
        };
    };
    
    // VERIFICANDO INSTANCIA PLUGIN SQLITE DE SOFTTION
    
    if (softtion.isDefined(softtion.sqLite)) {
        
        ngSofttion.service("$sqLite", $sqLite);
        
        $sqLite.$inject = [ "$q" ];
        
        function $sqLite ($q) {
            var sqLite = softtion.sqLite;
            
            this.isSupported = isSupported; 
            this.openDatabase = openDatabase;
            this.insert = insert;
            this.insertArray = insertArray;
            this.update = update;
            this.delete = fnDelete;
            this.select = select;

            function isSupported() {
                return sqLite.isSupported();
            }

            function openDatabase(options) {
                return sqLite.openDatabase(options);
            }

            function insert(connection) { 
                var q = $q.defer(), // Servicio promesa
                    insert = sqLite.insert(connection);
            
                setCommandStandard(q, insert);
                
                return q.promise; // Retornando promesa servicio
            }

            function insertArray(connection) { 
                var q = $q.defer(), // Servicio promesa
                    insert = sqLite.insertArray(connection);
            
                setCommandStandard(q, insert);
                
                return q.promise; // Retornando promesa servicio
            }

            function update(connection) { 
                var q = $q.defer(), // Servicio promesa
                    update = sqLite.update(connection);
            
                setCommandStandard(q, update);
                setCommandWhere(q, update);
                
                return q.promise; // Retornando promesa servicio
            }

            function fnDelete(connection) { 
                var q = $q.defer(), // Servicio promesa
                    deleteSQL = sqLite.delete(connection);
            
                setCommandStandard(q, deleteSQL);
                setCommandWhere(q, deleteSQL);
                
                return q.promise; // Retornando promesa servicio
            }

            function select(connection) {
                var q = $q.defer(), // Servicio promesa
                    select = sqLite.select(connection);
            
                setCommandStandard(q, select);
                setCommandWhere(q, select);
                setCommandSelect(q, select);
                
                return q.promise; // Retornando promesa servicio
            }
            
            function setCommandStandard(q, command) {
                
                var promise = q.promise; // Promesa
                
                promise.setConnection = function (connection) {
                    command.setConnection(connection); return promise;
                };
                
                promise.setTable = function (table) {
                    command.setTable(table); return promise;
                };

                promise.setColumns = function (columns) {
                    command.setColumns(columns); return promise;
                };

                promise.setValues = function (values) {
                    command.setValues(values); return promise;
                };

                promise.setJson = function (json) {
                    command.setJson(json); return promise;
                };
    
                promise.getCommand = function () {
                    return command.getCommand();
                };
                
                promise.execute = function () {
                    command.execute().
                        then(
                            (result) => { q.resolve(result); }
                        ).catch(
                            (result) => { q.reject(result); }
                        );
                        
                    return promise; // Retornando Promesa
                };
            }
            
            function setCommandWhere(q, command) {
                
                var promise = q.promise; // Promesa
                
                promise.where = function () {
                    if (arguments.length > 2) {
                        command.where(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.where(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.orWhere = function () {
                    if (arguments.length > 2) {
                        command.orWhere(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.orWhere(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.whereIsNull = function (column) {
                    command.whereIsNull(column); return promise;
                };

                promise.whereIsNotNull = function (column) {
                    command.whereIsNotNull(column); return promise;
                };

                promise.orWhereIsNull = function (column) {
                    command.orWhereIsNull(column); return promise;
                };

                promise.orWhereIsNotNull = function (column) {
                    command.orWhereIsNotNull(column); return promise;
                };

                promise.whereIn = function (column, values) {
                    command.whereIn(column, values); return promise;
                };

                promise.whereNotIn = function (column, values) {
                    command.whereNotIn(column, values); return promise;
                };

                promise.orWhereIn = function (column, values) {
                    command.orWhereIn(column, values); return promise;
                };

                promise.orWhereNotIn = function (column, values) {
                    command.orWhereNotIn(column, values); return promise;
                };

                promise.whereBetween = function (column, values) {
                    command.whereBetween(column, values); return promise;
                };

                promise.whereNotBetween = function (column, values) {
                    command.whereNotBetween(column, values); return promise;
                };

                promise.orWhereBetween = function (column, values) {
                    command.orWhereBetween(column, values); return promise;
                };

                promise.orWhereNotBetween = function (column, values) {
                    command.orWhereNotBetween(column, values); return promise;
                };

                promise.whereLike = function (column, value) {
                    command.whereLike(column, value); return promise;
                };

                promise.whereNotLike = function (column, value) {
                    command.whereNotLike(column, value); return promise;
                };

                promise.orWhereLike = function (column, value) {
                    command.orWhereLike(column, value); return promise;
                };

                promise.orWhereNotLike = function (column, value) {
                    command.orWhereNotLike(column, value); return promise;
                };

                promise.whereGlob = function (column, value) {
                    command.whereGlob(column, value); return promise;
                };

                promise.whereNotGlob = function (column, value) {
                    command.whereNotGlob(column, value); return promise;
                };

                promise.orWhereGlob = function (column, value) {
                    command.orWhereGlob(column, value); return promise;
                };

                promise.orWhereNotGlob = function (column, value) {
                    command.orWhereNotGlob(column, value); return promise;
                };
            }
            
            function setCommandSelect(q, command) {
                
                var promise = q.promise; // Promesa
    
                promise.setTables = function (tables) {
                    command.setTables(tables); return promise;
                };

                promise.setDistinct = function (distinct) {
                    command.setDistinct(distinct); return promise;
                };

                promise.getRelations = function () {
                    return command.getRelations();
                };

                promise.hasOne = function (table, local, foreign, variable) {
                    command.hasOne(table, local, foreign, variable); return promise;
                };

                promise.hasMany = function (table, local, foreign, variable) {
                    command.hasMany(table, local, foreign, variable); return promise;
                };

                promise.limit = function (rows, offset) {
                    command.limit(rows, offset); return promise;
                };

                promise.groupBy = function (column) {
                    command.groupBy(column); return promise;
                };
                
                promise.having = function () {
                    if (arguments.length > 2) {
                        command.having(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.having(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.orHaving = function () {
                    if (arguments.length > 2) {
                        command.orHaving(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.orHaving(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.havingIsNull = function (column) {
                    command.havingIsNull(column); return promise;
                };

                promise.havingIsNotNull = function (column) {
                    command.havingIsNotNull(column); return promise;
                };

                promise.orHavingIsNull = function (column) {
                    command.orHavingIsNull(column); return promise;
                };

                promise.orHavingIsNotNull = function (column) {
                    command.orHavingIsNotNull(column); return promise;
                };

                promise.havingIn = function (column, values) {
                    command.havingIn(column, values); return promise;
                };

                promise.havingNotIn = function (column, values) {
                    command.havingNotIn(column, values); return promise;
                };

                promise.orHavingIn = function (column, values) {
                    command.orHavingIn(column, values); return promise;
                };

                promise.orHavingNotIn = function (column, values) {
                    command.orHavingNotIn(column, values); return promise;
                };

                promise.havingBetween = function (column, values) {
                    command.havingBetween(column, values); return promise;
                };

                promise.havingNotBetween = function (column, values) {
                    command.havingNotBetween(column, values); return promise;
                };

                promise.orHavingBetween = function (column, values) {
                    command.orHavingBetween(column, values); return promise;
                };

                promise.orHavingNotBetween = function (column, values) {
                    command.orHavingNotBetween(column, values); return promise;
                };

                promise.havingLike = function (column, value) {
                    command.havingLike(column, value); return promise;
                };

                promise.havingNotLike = function (column, value) {
                    command.havingNotLike(column, value); return promise;
                };

                promise.orHavingLike = function (column, value) {
                    command.orHavingLike(column, value); return promise;
                };

                promise.orHavingNotLike = function (column, value) {
                    command.orHavingNotLike(column, value); return promise;
                };

                promise.havingGlob = function (column, value) {
                    command.havingGlob(column, value); return promise;
                };

                promise.havingNotGlob = function (column, value) {
                    command.havingNotGlob(column, value); return promise;
                };

                promise.orHavingGlob = function (column, value) {
                    command.orHavingGlob(column, value); return promise;
                };

                promise.orHavingNotGlob = function (column, value) {
                    command.orHavingNotGlob(column, value); return promise;
                };
                
                promise.orderBy = function (column, operator) {
                    command.orderBy(column, operator); return promise;
                };
            }
        }
    } 
});