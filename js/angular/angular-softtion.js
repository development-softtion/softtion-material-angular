
/*
 Angular Softtion v1.2.8
 (c) 2016 - 2018 Softtion Developers
 http://angular.softtion.com.co
 License: MIT
 Updated: 16/Abr/2018
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

    ngSofttion.service("$restful", $restfulService).
        service("$fileHttp", $fileHttpService).
        service("$webService", $webServiceService).
        directive("ngIterate", ngIterateDirective);
    
    // SERVICIO: $restful
    
    $restfulService.$inject = [ "$q", "$http" ];
    
    function $restfulService($q, $http) {
        
        // Métodos del servicio 
        this.create = create;
        
        function create(baseURL) {
            return new HttpRestful(baseURL, $q, $http);
        };
    }
        
    function HttpRestful(baseURL, q, http) {
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

    HttpRestful.prototype.catalog = function () {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(),
                httpGet = self.$http.get,
                promise = httpGet(URL, self.config);
                
            resolvePromiseRestful(self, promise, resolve, reject);
        });
    };

    HttpRestful.prototype.record = function (ID) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID),
                httpGet = self.$http.get,
                promise = httpGet(URL, self.config);
                
            resolvePromiseRestful(self, promise, resolve, reject);
        });
    };

    HttpRestful.prototype.store = function (data) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(),
                httpPost = self.$http.post,
                promise = httpPost(URL, data, self.config);
                
            resolvePromiseRestful(self, promise, resolve, reject);
        });
    };

    HttpRestful.prototype.modify = function (ID, data) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID),
                httpPut = self.$http.put,
                promise = httpPut(URL, data, self.config);
                
            resolvePromiseRestful(self, promise, resolve, reject);
        });
    };

    HttpRestful.prototype.remove = function (ID) {
        var self = this; // Instancia del objeto

        return self.$q((resolve, reject) => {
            var URL = self.getResourceRoute(ID),
                httpDelete = self.$http.delete,
                promise = httpDelete(URL, self.config);
                
            resolvePromiseRestful(self, promise, resolve, reject);
        });
    };
        
    function resolvePromiseRestful(instance, promise, resolve, reject) {
        promise.
            then((response) => { instance.clean(); resolve(response); }).
            catch((error) => { instance.clean(); reject(error);});
    }
    
    // SERVICE: $API
    
    $webServiceService.$inject = [ "$restful" ];
    
    function $webServiceService($restful) {
        
            // Atributos
        var packages = {}; // Contenedor de paquetes
        
            // Función del servicio
        var service = function (package) { 
            return softtion.isDefined(packages[package]) ?
                packages[package].getResources() : undefined; 
        };
        
        service.addPackage = function (name, restore) {
            packages[name] = (restore) ? // Restaurar
                new Package() : packages[name] || new Package(); 
            
            return this; // Retornando interfaz fluida
        };
        
        service.addResource = function (package, name, baseURL) {
            if (softtion.isDefined(packages[package]))
                packages[package].addResource(name, baseURL); 
            
            return this; // Retornando interfaz fluida
        };
        
        function Package() { this.resources = {}; }
        
        Package.prototype.addResource = function (name, baseURL) {
            this.resources[name] = new HttpRequest($restful.create(baseURL)); 
            
            return this; // Retornando interfaz fluida
        };
        
        Package.prototype.getResources = function () {
            return this.resources; // Retornando recursos definidos
        };
        
        function HttpRequest(restful) { 
            this.restful = restful; // Objeto HttpRestful
        }
    
        HttpRequest.prototype.setConfig = function (config) {
            this.restful.setConfig(config); return this;
        };
    
        HttpRequest.prototype.requiredPromise = function (requiredPromise) {
            this.isRequiredPromise = requiredPromise; return this;
        };

        HttpRequest.prototype.resource = function (ID, name) {
            return new HttpRequest(this.restful.resource(ID, name));
        };

        HttpRequest.prototype.catalog = function (params) {
            return resolvePromise(this, this.restful.catalog(), params);
        };

        HttpRequest.prototype.record = function (ID, params) {
            return resolvePromise(this, this.restful.record(ID), params);
        };

        HttpRequest.prototype.store = function (params) {
            return resolvePromise(this, this.restful.store(params.data), params);
        };

        HttpRequest.prototype.modify = function (ID, params) {
            return resolvePromise(this, this.restful.modify(ID, params.data), params);
        };

        HttpRequest.prototype.remove = function (ID, params) {
            return resolvePromise(this, this.restful.remove(ID), params);
        };
        
        function resolvePromise(instance, promise, params) {
            if (instance.isRequiredPromise) {
                instance.isRequiredPromise = false; return promise;
            } // Se necesita la promesa para el proceso
            
            return promise.
                then((response) => { 
                    if (softtion.isFunction(params.success)) params.success(response); 
                }).
                catch((error) => { 
                    if (softtion.isFunction(params.error)) params.error(error); 
                });
        }
        
        return service; // Retornando servicio $request
    }
    
    // SERVICIO: $fileHttp
    
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
    
    // Directiva: ngIterate
    // Version: 1.0.0
    // Updated: 05/May/2018
    
    ngIterateDirective.$inject = [ "$parse", "$animate", "$compile" ];
    
    function ngIterateDirective($parse, $animate, $compile) {
        
        var UID = 0, // Identificador
            isArray = Array.isArray,
            slice = [].slice,
            hasOwnProperty = Object.prototype.hasOwnProperty;

        function nextUid() {
            return ++UID;
        }

        function hashKey(obj, nextUidFn) {
            var key = obj && obj.$$hashKey;

            if (key) {
                if (typeof key === "function") key = obj.$$hashKey();
                
                return key;
            }

            var objType = typeof obj;
            
            if (objType === "function" || (objType === "object" && obj !== null)) {
                key = obj.$$hashKey = objType + ':' + (nextUidFn || nextUid)();
            } else {
                key = objType + ':' + obj;
            }

            return key;
        }

        function isWindow(obj) {
            return obj && obj.window === obj;
        }

        function isString(value) {
            return typeof value === "string";
        }

        function isArrayLike(obj) {
            if (softtion.isUndefined(obj) || isWindow(obj)) return false;
            
            if (isArray(obj) || isString(obj))
                return true;

            var length = "length" in Object(obj) && obj.length;

            return !isNaN(length) &&
                    (length >= 0 && ((length - 1) in obj ||
                    obj instanceof Array) || 
                    typeof obj.item === "function");

        }

        function getBlockNodes(nodes) {
            var node = nodes[0], blockNodes, 
                endNode = nodes[nodes.length - 1];

            for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
                if (blockNodes || nodes[i] !== node) {
                    if (!blockNodes) 
                        blockNodes = jqLite(slice.call(nodes, 0, i));
                    
                    blockNodes.push(node);
                }
            }

            return blockNodes || nodes;
        }

        function updateScope(scope, index, valueID, value, keyID, key, length) {
            scope[valueID] = value;

            if (keyID) scope[keyID] = key;

            scope.$index = index; scope.$first = (index === 0);
            scope.$last = (index === (length - 1));
            scope.$middle = !(scope.$first || scope.$last);
            scope.$odd = !(scope.$even = (index & 1) === 0);
        }

        function getBlockStart(block) {
            return block.clone[0];
        }

        function getBlockEnd(block) {
            return block.clone[block.clone.length - 1];
        }

        function sliceArgs(args, startIndex) {
            return slice.call(args, startIndex || 0);
        }
        
        function toDebugString(obj, maxDepth) {
            if (typeof obj === "function") {
                return obj.toString().replace(/ \{[\s\S]*$/, '');
            } else if (softtion.isUndefined(obj)) {
                return "undefined";
            } else if (typeof obj !== "string") {
                return serializeObject(obj, maxDepth);
            } else {
                return obj;
            } // Se debe retornar a el mismo
        }
        
        function serializeObject(obj, maxDepth) {
            var seen = []; // Listado
            
            if (isValidObjectMaxDepth(maxDepth)) 
                obj = angular.copy(obj, null, maxDepth);
            
            return JSON.stringify(obj, (key, val) => {
                val = toJsonReplacer(key, val);
                
                if (isObject(val)) {
                    if (seen.indexOf(val) >= 0) return '...'; seen.push(val);
                }
                
                return val; // Resultado del proceso
            });
        }
        
        function toJsonReplacer(key, value) {
            var val = value;

            if (typeof key === "string" && key.charAt(0) === "$" && key.charAt(1) === "$") {
                val = undefined;
            } else if (isWindow(value)) {
                val = "$WINDOW";
            } else if (value && window.document === value) {
                val = "$DOCUMENT";
            } 

            return val;
        }
        
        function consoleError(module, ErrorConstructor) {
            ErrorConstructor = ErrorConstructor || Error;
            
            return function () {
                var code = arguments[0], paramPrefix, 
                    template = arguments[1], i,
                    message = "[" + (module ? module + ":" : "") + code + "] ",
                    
                    templateArgs = sliceArgs(arguments, 2).map((arg) => {
                        return toDebugString(arg, 5);
                    });

                message += template.replace(/\{\d+\}/g, (match) => {
                    var index = +match.slice(1, -1);

                    if (index < templateArgs.length) return templateArgs[index];

                    return match; // Retornando match
                });

                message += "\nhttp://errors.angularjs.org/1.6.7/" + (module ? module + "/" : "") + code;

                for (i = 0, paramPrefix = "?"; i < templateArgs.length; i++, paramPrefix = "&") {
                    message += paramPrefix + "p" + i + "=" + encodeURIComponent(templateArgs[i]);
                }

                return new ErrorConstructor(message); // Reportando el error
            };
        }
        
        function evalAttrsScope($values, $scope, data) {
            var evalIterateCount = $parse($values.iterateCount),
                evalIterateEmpty = $parse($values.iterateEmpty);
            
            if (evalIterateCount.assign)
                evalIterateCount.assign($scope, data.length);
            
            if (evalIterateEmpty.assign)
                evalIterateEmpty.assign($scope, (data.length === 0));
        }

        var NG_REMOVED = "$$NG_REMOVED", 
            ngIterateConsoleError = consoleError("ngIterate");
        
        return {
            restrict: "A",
            multiElement: true,
            transclude: "element",
            priority: 1000,
            terminal: true,
            $$tlb: true,
            compile: function ($element, $attr) {
                var expression = $attr.ngIterate,
                    ngRepeatEndComment = $compile.$$createComment('end ngRepeat', expression),
                    match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                if (!match) 
                    throw ngIterateConsoleError('iexp', 'Expected expression in form of \'_item_ in _collection_[ track by _id_]\' but got \'{0}\'.', expression);

                var lhs = match[1], rhs = match[2], aliasAs = match[3], trackByExp = match[4];

                match = lhs.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);

                if (!match)
                    throw ngIterateConsoleError('iidexp', '\'_item_\' in \'_item_ in _collection_\' should be an identifier or \'(_key_, _value_)\' expression, but got \'{0}\'.', lhs);
                            
                var valueIdentifier = match[3] || match[1], keyIdentifier = match[2];

                if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) ||
                        /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) 
                    throw ngIterateConsoleError('badident', 'alias \'{0}\' is invalid --- must be a valid JS identifier which is not a reserved name.', aliasAs);
                

                var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, 
                    trackByIdObjFn, hashFnLocals = {$id: hashKey};

                if (trackByExp) {
                    trackByExpGetter = $parse(trackByExp);
                } else {
                    trackByIdArrayFn = function (key, value) { return hashKey(value); };
                    
                    trackByIdObjFn = function (key) { return key; };
                }

                // ngIterate Link
                return function ($scope, $element, $attr, ctrl, $transclude) { 
                    var $values = {
                        iterateCount: $parse($attr.ngIterateCount),
                        iterateEmpty: $parse($attr.ngIterateEmpty)
                    };

                    if (trackByExpGetter) {
                        trackByIdExpFn = function (key, value, index) {
                            if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
                            
                            hashFnLocals[valueIdentifier] = value;
                            hashFnLocals.$index = index;
                            return trackByExpGetter($scope, hashFnLocals);
                        };
                    }
                    
                    var lastBlockMap = Object.create(null);

                    $scope.$watchCollection(rhs, function (collection) { // ngIterate Action
                        var index, length,
                            previousNode = $element[0],
                            nextNode,
                            nextBlockMap = Object.create(null),
                            collectionLength,
                            key, value, 
                            trackById,
                            trackByIdFn,
                            collectionKeys,
                            block, 
                            nextBlockOrder,
                            elementsToRemove;

                        if (aliasAs) $scope[aliasAs] = collection;

                        if (isArrayLike(collection)) {
                            collectionKeys = collection;
                            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
                        } else {
                            trackByIdFn = trackByIdExpFn || trackByIdObjFn; collectionKeys = [];
                            
                            for (var itemKey in collection) {
                                if (hasOwnProperty.call(collection, itemKey) && itemKey.charAt(0) !== "$") 
                                    collectionKeys.push(itemKey);
                            }
                        }

                        collectionLength = collectionKeys.length;
                        nextBlockOrder = new Array(collectionLength);

                        for (index = 0; index < collectionLength; index++) {
                            key = (collection === collectionKeys) ? index : collectionKeys[index];
                            value = collection[key]; trackById = trackByIdFn(key, value, index);
                            
                            if (lastBlockMap[trackById]) {
                                block = lastBlockMap[trackById]; delete lastBlockMap[trackById];
                                nextBlockMap[trackById] = block; nextBlockOrder[index] = block;
                            } else if (nextBlockMap[trackById]) {
                                forEach(nextBlockOrder, function (block) {
                                    if (block && block.scope) lastBlockMap[block.id] = block;
                                });
                                
                                throw ngIterateConsoleError('dupes',
                                        'Duplicates in a repeater are not allowed. Use \'track by\' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}',
                                        expression, trackById, value);
                            } else {
                                nextBlockOrder[index] = {id: trackById, scope: undefined, clone: undefined};
                                nextBlockMap[trackById] = true;
                            }
                        }

                        for (var blockKey in lastBlockMap) {
                            block = lastBlockMap[blockKey];
                            elementsToRemove = getBlockNodes(block.clone);
                            $animate.leave(elementsToRemove);
                            
                            if (elementsToRemove[0].parentNode) 
                                for (index = 0, length = elementsToRemove.length; index < length; index++) {
                                    elementsToRemove[index][NG_REMOVED] = true;
                                }
                            
                            block.scope.$destroy();
                        }
                        
                        evalAttrsScope($values, $scope, { length: collectionLength });

                        for (index = 0; index < collectionLength; index++) {
                            key = (collection === collectionKeys) ? index : collectionKeys[index];
                            value = collection[key]; block = nextBlockOrder[index];

                            if (block.scope) {
                                nextNode = previousNode;

                                do {
                                    nextNode = nextNode.nextSibling;
                                } while (nextNode && nextNode[NG_REMOVED]);

                                if (getBlockStart(block) !== nextNode) 
                                    $animate.move(getBlockNodes(block.clone), null, previousNode);
                                
                                previousNode = getBlockEnd(block);
                                updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                            } else {
                                $transclude(function (clone, scope) { // ngIterate Transclude
                                    block.scope = scope;
                                    var endNode = ngRepeatEndComment.cloneNode(false);
                                    clone[clone.length++] = endNode;

                                    $animate.enter(clone, null, previousNode);
                                    
                                    previousNode = endNode; block.clone = clone;
                                    nextBlockMap[block.id] = block;
                                    updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                                });
                            }
                        }
                        
                        lastBlockMap = nextBlockMap;
                    });
                };
            }
        };
    }
});