
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

    ngSofttion.service("$restful", ["$http", function ($http) {
        return {
            create: create
        };
        
        function createRoute (selfRestful, id) {
            var url = selfRestful.url;
            
            if (softtion.isDefined(id)) {
                url += "/" + id;
            } // Añadiendo identificador en la URL
            
            selfRestful.prefixs.forEach(function (prefix) {
                url += "/" + prefix;
            }); // Añadiendo prefijos en la URL
            
            selfRestful.prefixs = []; // Reseteando prefijos
            
            return url; // Ruta final a consumir
        };
        
        var HttpRestful = function (url, $http) {
            this.url = url; this.$http = $http; this.prefixs = [];
        };
        
        HttpRestful.prototype.prefix = function (prefixs) {
            this.prefixs = prefixs; return this;
        };
        
        // MÉTODO GET
        
        HttpRestful.prototype.all = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(createRoute(self)).
                then(config["done"], config["error"]);
        };
        
        HttpRestful.prototype.index = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(
                    createRoute(self, config["id"]),
                    {
                        params: config["params"]
                    }
                ).then(config["done"], config["error"]);
        };
        
        HttpRestful.prototype.show = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(createRoute(self), config["id"]).
                then(config["done"], config["error"]);
        };
        
        // MÉTODO POST
        
        HttpRestful.prototype.store = function (config) {
            var self = this, $http = self.$http;
            
            return $http.post(
                createRoute(self, config["id"]), config["data"]
            ).then(config["done"], config["error"]);
        };
        
        // MÉTODO PUT
        
        HttpRestful.prototype.update = function (id, config) {
            var self = this, $http = self.$http;
            
            return $http.put(
                createRoute(self, id), config["data"]
            ).then(config["done"], config["error"]);
        };
        
        // MÉTODO DELETE
        
        HttpRestful.prototype.destroy = function (id, config) {
            var self = this, $http = self.$http;
            
            return $http.delete(
                createRoute(self, id)
            ).then(config["done"], config["error"]);
        };
        
        function create(url) {
            return new HttpRestful(url, $http); // Objeto RestFul
        };
    }]);
    
    function $restful($http) {
        return {
            create: create
        };
        
        function createRoute (selfRestful, id) {
            var url = selfRestful.url;
            
            if (softtion.isDefined(id)) {
                url += "/" + id;
            } // Añadiendo identificador en la URL
            
            selfRestful.prefixs.forEach(function (prefix) {
                url += "/" + prefix;
            }); // Añadiendo prefijos en la URL
            
            selfRestful.prefixs = []; // Reseteando prefijos
            
            return url; // Ruta final a consumir
        };
        
        var HttpRestful = function (url, $http) {
            this.url = url; this.$http = $http; this.prefixs = [];
        };
        
        HttpRestful.prototype.prefix = function (prefixs) {
            this.prefixs = prefixs; return this;
        };
        
        // MÉTODO GET
        
        HttpRestful.prototype.all = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(createRoute(self)).
                then(config["done"], config["error"]);
        };
        
        HttpRestful.prototype.index = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(
                    createRoute(self, config["id"]),
                    {
                        params: config["params"]
                    }
                ).then(config["done"], config["error"]);
        };
        
        HttpRestful.prototype.show = function (config) {
            var self = this, $http = self.$http;
            
            return $http.get(createRoute(self), config["id"]).
                then(config["done"], config["error"]);
        };
        
        // MÉTODO POST
        
        HttpRestful.prototype.store = function (config) {
            var self = this, $http = self.$http;
            
            return $http.post(
                createRoute(self, config["id"]), config["data"]
            ).then(config["done"], config["error"]);
        };
        
        // MÉTODO PUT
        
        HttpRestful.prototype.update = function (id, config) {
            var self = this, $http = self.$http;
            
            return $http.put(
                createRoute(self, id), config["data"]
            ).then(config["done"], config["error"]);
        };
        
        // MÉTODO DELETE
        
        HttpRestful.prototype.destroy = function (id, config) {
            var self = this, $http = self.$http;
            
            return $http.delete(
                createRoute(self, id)
            ).then(config["done"], config["error"]);
        };
        
        function create(url) {
            return new HttpRestful(url, $http); // Objeto RestFul
        };
    }
    
    ngSofttion.service("$fileHttp", $fileHttpService);
    
    $fileHttpService.$inject = [ "$q", "$http", "$timeout", "$window" ];
    
    function $fileHttpService($q, $http, $timeout, $window) {
        
        // Métodos del servicio 
        this.download = download;
        this.print = print;
        this.preview = preview;
        
        function getDataFile(response, type) {
            var blob = new Blob(
                    [ response.data ], { type: type }
                ),
                
                URL = $window.URL.createObjectURL(blob);
        
            return { blob: blob, url: URL };
        }
        
        function download(attrs) {
            return $q((resolve, reject) => {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", 
                    params: attrs.params
                }).then((response) => {
                    // Generar datos para descargar
                    var file = getDataFile(response, attrs.type);
                    
                    var element = "<a/>",
                        properties = { 
                            href: file.url, download: attrs.fileName 
                        };

                    angular.element(element, properties).
                        appendTo("body")[0].click();

                    $timeout(() => { 
                        $window.URL.revokeObjectURL(file.url); 
                    }, 10000); // Eliminando URL
                    
                    resolve(file.blob); // Proceso correcto
                }).catch((error) => { 
                    reject(error); // Error al descargar archivo
                });
            });
        };
        
        function print(attrs) {
            return $q((resolve, reject) => {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", 
                    params: attrs.params
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
                    responseType: "arraybuffer", 
                    params: attrs.params
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
                
                promise.setConnection = (connection) => {
                    command.setConnection(connection); return promise;
                };
                
                promise.setTable = (table) => {
                    command.setTable(table); return promise;
                };

                promise.setColumns = (columns) => {
                    command.setColumns(columns); return promise;
                };

                promise.setValues = (values) => {
                    command.setValues(values); return promise;
                };

                promise.setJson = (json) => {
                    command.setJson(json); return promise;
                };
    
                promise.getCommand = () => {
                    return command.getCommand();
                };
                
                promise.execute = () => {
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
                
                promise.where = () => {
                    if (arguments.length > 2) {
                        command.where(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.where(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.orWhere = () => {
                    if (arguments.length > 2) {
                        command.orWhere(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.orWhere(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.whereIsNull = (column) => {
                    command.whereIsNull(column); return promise;
                };

                promise.whereIsNotNull = (column) => {
                    command.whereIsNotNull(column); return promise;
                };

                promise.orWhereIsNull = (column) => {
                    command.orWhereIsNull(column); return promise;
                };

                promise.orWhereIsNotNull = (column) => {
                    command.orWhereIsNotNull(column); return promise;
                };

                promise.whereIn = (column, values) => {
                    command.whereIn(column, values); return promise;
                };

                promise.whereNotIn = (column, values) => {
                    command.whereNotIn(column, values); return promise;
                };

                promise.orWhereIn = (column, values) => {
                    command.orWhereIn(column, values); return promise;
                };

                promise.orWhereNotIn = (column, values) => {
                    command.orWhereNotIn(column, values); return promise;
                };

                promise.whereBetween = (column, values) => {
                    command.whereBetween(column, values); return promise;
                };

                promise.whereNotBetween = (column, values) => {
                    command.whereNotBetween(column, values); return promise;
                };

                promise.orWhereBetween = (column, values) => {
                    command.orWhereBetween(column, values); return promise;
                };

                promise.orWhereNotBetween = (column, values) => {
                    command.orWhereNotBetween(column, values); return promise;
                };

                promise.whereLike = (column, value) => {
                    command.whereLike(column, value); return promise;
                };

                promise.whereNotLike = (column, value) => {
                    command.whereNotLike(column, value); return promise;
                };

                promise.orWhereLike = (column, value) => {
                    command.orWhereLike(column, value); return promise;
                };

                promise.orWhereNotLike = (column, value) => {
                    command.orWhereNotLike(column, value); return promise;
                };

                promise.whereGlob = (column, value) => {
                    command.whereGlob(column, value); return promise;
                };

                promise.whereNotGlob = (column, value) => {
                    command.whereNotGlob(column, value); return promise;
                };

                promise.orWhereGlob = (column, value) => {
                    command.orWhereGlob(column, value); return promise;
                };

                promise.orWhereNotGlob = (column, value) => {
                    command.orWhereNotGlob(column, value); return promise;
                };
            }
            
            function setCommandSelect(q, command) {
                
                var promise = q.promise; // Promesa
    
                promise.setTables = (tables) => {
                    command.setTables(tables); return promise;
                };

                promise.setDistinct = (distinct) => {
                    command.setDistinct(distinct); return promise;
                };

                promise.getRelations = () => {
                    return command.getRelations();
                };

                promise.hasOne = (table, local, foreign, variable) => {
                    command.hasOne(table, local, foreign, variable); return promise;
                };

                promise.hasMany = (table, local, foreign, variable) => {
                    command.hasMany(table, local, foreign, variable); return promise;
                };

                promise.limit = (rows, offset) => {
                    command.limit(rows, offset); return promise;
                };

                promise.groupBy = (column) => {
                    command.groupBy(column); return promise;
                };
                
                promise.having = () => {
                    if (arguments.length > 2) {
                        command.having(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.having(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.orHaving = () => {
                    if (arguments.length > 2) {
                        command.orHaving(
                            arguments[0], arguments[1], arguments[2]
                        );
                    } else {
                        command.orHaving(arguments[0], arguments[1]);
                    } // El operador de la condición es una igualdad
                    
                    return promise; // Retornando interfaz fluida
                };

                promise.havingIsNull = (column) => {
                    command.havingIsNull(column); return promise;
                };

                promise.havingIsNotNull = (column) => {
                    command.havingIsNotNull(column); return promise;
                };

                promise.orHavingIsNull = (column) => {
                    command.orHavingIsNull(column); return promise;
                };

                promise.orHavingIsNotNull = (column) => {
                    command.orHavingIsNotNull(column); return promise;
                };

                promise.havingIn = (column, values) => {
                    command.havingIn(column, values); return promise;
                };

                promise.havingNotIn = (column, values) => {
                    command.havingNotIn(column, values); return promise;
                };

                promise.orHavingIn = (column, values) => {
                    command.orHavingIn(column, values); return promise;
                };

                promise.orHavingNotIn = (column, values) => {
                    command.orHavingNotIn(column, values); return promise;
                };

                promise.havingBetween = (column, values) => {
                    command.havingBetween(column, values); return promise;
                };

                promise.havingNotBetween = (column, values) => {
                    command.havingNotBetween(column, values); return promise;
                };

                promise.orHavingBetween = (column, values) => {
                    command.orHavingBetween(column, values); return promise;
                };

                promise.orHavingNotBetween = (column, values) => {
                    command.orHavingNotBetween(column, values); return promise;
                };

                promise.havingLike = (column, value) => {
                    command.havingLike(column, value); return promise;
                };

                promise.havingNotLike = (column, value) => {
                    command.havingNotLike(column, value); return promise;
                };

                promise.orHavingLike = (column, value) => {
                    command.orHavingLike(column, value); return promise;
                };

                promise.orHavingNotLike = (column, value) => {
                    command.orHavingNotLike(column, value); return promise;
                };

                promise.havingGlob = (column, value) => {
                    command.havingGlob(column, value); return promise;
                };

                promise.havingNotGlob = (column, value) => {
                    command.havingNotGlob(column, value); return promise;
                };

                promise.orHavingGlob = (column, value) => {
                    command.orHavingGlob(column, value); return promise;
                };

                promise.orHavingNotGlob = (column, value) => {
                    command.orHavingNotGlob(column, value); return promise;
                };
                
                promise.orderBy = (column, operator) => {
                    command.orderBy(column, operator); return promise;
                };
            }
        }
    } 
});