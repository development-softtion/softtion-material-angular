
/*
 Angular Softtion v1.3.4
 (c) 2016 - 2018 Softtion Developers
 http://angular.softtion.com.co
 License: MIT
 Updated: 27/Ene/2019
*/

(function (factory) {
    
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
    
})(function (softtion, angular) {
    
    var ngSofttion = angular.module("ngSofttion", []);

    ngSofttion.service("$restful", restfulService).
        service("$httpfile", $httpfileService).
        service("$webService", webServiceService).
        directive("ngIterate", ngIterateDirective);
    
    // SERVICIO: $restful
    
    restfulService.$inject = ["$q", "$http"];
    
    function restfulService($q, $http) {
        
        // Métodos del servicio 
        this.create = create;
        
        function create(baseURL) {
            return new HttpRestful(baseURL, $q, $http);
        };
    }
    
    function HttpRestful(baseURL, q, http) {
        Class.CallCheck(this, HttpRestful);

        var self = Class.ConstructorReturn(
            this, (HttpRestful.__proto__ || Object.getPrototypeOf(HttpRestful)).call(this)
        );

        self.baseURL = baseURL;     // URL del recurso
        self.$q = q;                // Servicio Promesa
        self.$http = http;          // Servicio HTTP
        self.config = {};           // Configuración de petición
    }

    var functions = [
        { key: "getBaseURL", value: getBaseURL },
        { key: "setConfig", value: setConfig },
        { key: "clean", value: clean },
        { key: "resource", value: resource },
        { key: "catalog", value: catalog },
        { key: "record", value: record },
        { key: "store", value: store },
        { key: "modify", value: modify },
        { key: "remove", value: remove },
        { key: "getResourceRoute", value: getResourceRoute }
    ];

    Class.Create(HttpRestful, functions);
    
    function getBaseURL() {
        return this.baseURL;
    }
    
    function setConfig(config) {
        this.config = config; return this;
    }
    
    function clean() {
        this.config = {}; return this; 
    }
        
    function getResourceRoute (ID, suffixes) {
        var URL = this.getBaseURL();

        if (softtion.isDefined(ID)) {
            URL += "/" + ID;
        } // Agregando ID de recurso en URL

        URL = softtion.generateUrl(URL, suffixes);
        
        return URL; // URL generada del recurso
    }

    function resource(ID, name) {
        var self = this, // Instancia 
            baseURL = this.getResourceRoute(ID, [name]),
            $q = self.$q, $http = self.$http;
        
        return new HttpRestful(baseURL, $q, $http); // Recurso
    }

    function catalog() {
        var self = this; // Instancia del objeto

        return self.$q(function (resolve, reject) {
            var URL = self.getResourceRoute(),
                httpGet = self.$http.get,
                promise = httpGet(URL, self.config);
                
            resolveRestful(self, promise, resolve, reject);
        });
    }

    function record(ID) {
        var self = this; // Instancia del objeto

        return self.$q(function (resolve, reject) {
            var URL = self.getResourceRoute(ID),
                httpGet = self.$http.get,
                promise = httpGet(URL, self.config);
                
            resolveRestful(self, promise, resolve, reject);
        });
    }

    function store(data) {
        var self = this; // Instancia del objeto

        return self.$q(function (resolve, reject) {
            var URL = self.getResourceRoute(),
                httpPost = self.$http.post,
                promise = httpPost(URL, data, self.config);
                
            resolveRestful(self, promise, resolve, reject);
        });
    }

    function modify(ID, data) {
        var self = this; // Instancia del objeto

        return self.$q(function (resolve, reject) {
            var URL = self.getResourceRoute(ID),
                httpPut = self.$http.put,
                promise = httpPut(URL, data, self.config);
                
            resolveRestful(self, promise, resolve, reject);
        });
    }

    function remove(ID) {
        var self = this; // Instancia del objeto

        return self.$q(function (resolve, reject) {
            var URL = self.getResourceRoute(ID),
                httpDelete = self.$http.delete,
                promise = httpDelete(URL, self.config);
                
            resolveRestful(self, promise, resolve, reject);
        });
    }
        
    function resolveRestful(instance, promise, resolve, reject) {
        promise.then(function (response) {
            instance.clean(); resolve(response); 
        }).catch(function (error) {
            instance.clean(); reject(error);
        });
    }
    
    // SERVICE: $webService
    
    webServiceService.$inject = ["$restful"];
    
    function webServiceService($restful) {
        
        // Atributos
        var packages = {}, fnSuccess, fnError; // Parámetros globales
        
        // Función del servicio
        function service(pkgName) { 
            var pkg = packages[pkgName]; // Nombre del paquete
            
            if (softtion.isUndefined(pkg)) return undefined;
            
            return pkg.getResources(); // Retornando los recursos
        }
        
        service.addPackage = function (pkgName, restore) {
            if (restore) {
                packages[pkgName] = new PackageWS();
            } else {
                var pkg = packages[pkgName]; // Paquete
                
                if (softtion.isUndefined(pkg))
                    packages[pkgName] = new PackageWS();
            } // No requiere forzarce instancia de paquete
            
            return this; // Retornando interfaz fluida
        };
        
        service.addResource = function (pkgName, rscName, baseURL) {
            var pkg = packages[pkgName]; // Paquete
            
            if (softtion.isDefined(pkg))
                pkg.addResource(rscName, baseURL); 
            
            return this; // Retornando interfaz fluida
        };
        
        service.globalSuccess = function ($success) {
            fnSuccess = $success; return this; // Retornando interfaz fluida
        };
        
        service.globalError = function ($error) {
            fnError = $error; return this; // Retornando interfaz fluida
        };
    
        function PackageWS() {
            Class.CallCheck(this, PackageWS);

            var self = Class.ConstructorReturn(
                this, (PackageWS.__proto__ || Object.getPrototypeOf(PackageWS)).call(this)
            );

            self.resources = {};
        }

        Class.Create(PackageWS, [
            { key: "addResource", value: addResource },
            { key: "getResources", value: getResources }
        ]);
        
        function addResource(name, baseURL) {
            this.resources[name] = new HttpRequest($restful.create(baseURL)); return this;
        }
        
        function getResources() {
            return this.resources; // Retornando recursos definidos
        }
        
        function HttpRequest(restful) {
            Class.CallCheck(this, HttpRequest);

            var self = Class.ConstructorReturn(
                this, (HttpRequest.__proto__ || Object.getPrototypeOf(HttpRequest)).call(this)
            );

            self.restful = restful;
        }

        var functions = [
            { key: "setConfig", value: setConfig },
            { key: "resource", value: resource },
            { key: "catalog", value: catalog },
            { key: "record", value: record },
            { key: "store", value: store },
            { key: "modify", value: modify },
            { key: "remove", value: remove },
            { key: "requiredPromise", value: requiredPromise }
        ];

        Class.Create(HttpRequest, functions);
    
        function setConfig(config) {
            this.restful.setConfig(config); return this;
        }
    
        function requiredPromise(requiredPromise) {
            this.isRequiredPromise = requiredPromise; return this;
        }

        function resource(ID, name) {
            return new HttpRequest(this.restful.resource(ID, name));
        }

        function catalog(params) {
            return resolvePromise(this, this.restful.catalog(), params);
        }

        function record(ID, params) {
            return resolvePromise(this, this.restful.record(ID), params);
        }

        function store(params) {
            return resolvePromise(this, this.restful.store(params.data), params);
        }

        function modify(ID, params) {
            return resolvePromise(this, this.restful.modify(ID, params.data), params);
        }

        function remove(ID, params) {
            return resolvePromise(this, this.restful.remove(ID), params);
        }
        
        function resolvePromise(instance, promise, params) {
            if (instance.isRequiredPromise) {
                instance.isRequiredPromise = false; return promise;
            } // Se necesita la promesa para el proceso
            
            return promise. // Promesa HTTP
                then(function (response) { 
                    var result = { break: false, data: undefined }; // Parámetros iniciales
                    
                    if (softtion.isFunction(fnSuccess)) result = fnSuccess(response); 
                    
                    if (softtion.isDefined(result)) if (result.break) return;
                    
                    if (softtion.isFunction(params.success)) params.success(response, result); 
                }).catch(function (response) { 
                    var result = { break: false, data: undefined }; // Parámetros iniciales
                    
                    if (softtion.isFunction(fnError)) result = fnError(response); 
                    
                    if (softtion.isDefined(result)) if (result.break) return;
                    
                    if (softtion.isFunction(params.error)) params.error(response, result); 
                });
        }
        
        return service; // Retornando servicio $webService
    }
    
    // SERVICIO: $httpfile
    
    $httpfileService.$inject = ["$q", "$http", "$timeout"];
    
    function $httpfileService($q, $http, $timeout) {
        
        var ACTIONS = {
            DOWNLOAD: "DOWNLOAD",
            UPLOAD: "UPLOAD",
            PRINT: "PRINT",
            PREVIEW: "PREVIEW"
        };
        
        this.ACTIONS = ACTIONS;
        
        this.post = fnFilePost;
        
        this.get = fnFileGet;
        
        this.upload = fnUpload;
        
        function fnFilePost(url, data, options) {
            var defaults = { "Content-type" : "application/json" }; // Predeterminado
            
            angular.extend(defaults, options.headers);
            
            return $q(function (resolve, reject) {
                $http.post(url, data, { 
                    params: options.params,
                    headers: defaults, 
                    responseType: "arraybuffer"
                }).then(function (response) {
                    // Archivo generado en la petición
                    var blob    = new Blob([response.data], {type : options.type});
                    
                    // Parametros para generar descarga
                    var fileURL = URL.createObjectURL(blob);
                    
                    switch (options.action) {
                        case (ACTIONS.DOWNLOAD):
                            var a       = document.createElement("a");
                            a.href      = fileURL; 
                            a.target    = "_blank";
                            a.download  = options.name;

                            document.body.appendChild(a); a.click();
                        break;
                        
                        case (ACTIONS.PREVIEW): softtion.openFrame(fileURL); break;
                        case (ACTIONS.PRINT): softtion.openFrame(fileURL, true); break;
                    }
                    
                    $timeout(function () { URL.revokeObjectURL(fileURL); }, 1000);
                    
                    resolve(blob, response); // Proceso correcto
                }).catch(function (error) { reject(error); }); // Error al descargar archivo
            });
        }
        
        function fnFileGet(url, options) {
            return $q(function (resolve, reject) {
                $http.get(url, {
                    params: options.params, responseType: "arraybuffer"
                }).then(function (response) {
                    // Archivo generado en la petición
                    var blob    = new Blob([response.data], {type : options.type});
                    
                    // Parametros para generar descarga
                    var fileURL = URL.createObjectURL(blob);
                    
                    switch (options.action) {
                        case (ACTIONS.DOWNLOAD):
                            var a       = document.createElement("a");
                            a.href      = fileURL; 
                            a.target    = "_blank";
                            a.download  = options.name;

                            document.body.appendChild(a); a.click();
                        break;
                        
                        case (ACTIONS.PREVIEW): softtion.openFrame(fileURL); break;
                        case (ACTIONS.PRINT): softtion.openFrame(fileURL, true); break;
                    }
                    
                    $timeout(function () { URL.revokeObjectURL(fileURL); }, 1000);
                    
                    resolve(blob, response); // Proceso correcto
                }).catch(function (error) { reject(error); }); // Error al descargar archivo
            });
        }
        
        function fnUpload(url, data, options) {
            return $q(function (resolve, reject) {
                var defaults = {
                    headers: { "Content-Type": undefined },
                    transformRequest: angular.identity,
                    eventHandlers: {
                        progress: function ($event) { 
                            if (softtion.isFunction(options.onProgress))
                                options.onProgress($event); // Progreso
                        }
                    }
                };
                
                angular.extend(defaults, options.config);
                
                $http.post(url, data, defaults).
                    then(function (response) { resolve(response); }).
                    catch(function (error) { reject(error); });
            });
        }
    } 
    
    // Directiva: ngIterate
    // Version: 1.0.0
    // Updated: 05/May/2018
    
    ngIterateDirective.$inject = ["$parse", "$animate", "$compile"];
    
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
                    ngIterateEndComment = $compile.$$createComment('end ngIterate', expression),
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
                                    var endNode = ngIterateEndComment.cloneNode(false);
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