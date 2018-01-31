
/*
 Angular Softtion v1.1.8
 (c) 2016-2018 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 05/Ene/2016
*/

(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular) {
    
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

    function httpFileService ($q, $http, $timeout, $window) {
        return {
            download: download,
            print: print,
            preview: preview
        };
        
        function download(attrs) {
            return $q(function (resolve, reject) {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", 
                    params: attrs["params"] 
                }).then(function (response) {
                    var fileBlob = new Blob([response.data], { type: attrs.type }),
                        fileUrl = URL.createObjectURL(fileBlob),
                        element = "<a/>",
                        elementAttrs = { href: fileUrl, download: attrs.nameFile };

                    angular.element(element, elementAttrs).appendTo("body")[0].click();

                    $timeout(function () { 
                        URL.revokeObjectURL(fileUrl); 
                    }, 10000); // Eliminando URL
                    
                    resolve(fileBlob); // Todo correcto
                }).catch(function (error) { reject(error); });
            });
        };
        
        function print(attrs) {
            return $q(function (resolve, reject) {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", 
                    params: attrs["params"] 
                }).then(function (response) {
                    var fileBlob = new Blob([response.data], { type: attrs.type }),
                        fileUrl = URL.createObjectURL(fileBlob);

                    $window.open(fileUrl).print(); resolve(fileBlob); 
                }).catch(function (error) { reject(error); });
            });
        };
        
        function preview(attrs) {
            return $q(function (resolve, reject) {
                $http.get(attrs.url, { 
                    responseType: "arraybuffer", 
                    params: attrs.params
                }).then(function (response) {
                    var fileBlob = new Blob([response.data], { type: attrs.type }),
                        fileUrl = URL.createObjectURL(fileBlob);

                    $window.open(fileUrl); resolve(fileBlob); 
                }).catch(function (error) { reject(error); });
            });
        };
    };

    ngSofttion.service("$httpFile", ["$q", "$http", "$timeout", "$window", httpFileService]);
    
    if (softtion.isDefined(softtion.sqLite)) {
        ngSofttion.service("$sqLite", function () {
            return softtion.sqLite;
        });
    } // Se ha cargado Libreria de SQLite de Softtion
});