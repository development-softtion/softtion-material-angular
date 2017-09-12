/*
 Angular Softtion v1.0.0
 (c) 2016 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 05/Ene/2016
*/

/* global URL */

(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular, jQuery) {
    
    var ngSofttion = angular.module("ngSofttion", []);
    
    ngSofttion.provider("$softtion", function () {
        
        this.$get = function () { return softtion; };
    });

    ngSofttion.service("$restful", ["$http", function ($http) {
        
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
        
        return {
            create: create
        };
    }]);

    function httpFileService ($http, $timeout, $window) {
        function download(attrs) { console.log(attrs);
            var functionSuccess = function (response) { 
                var fileBlob = new Blob(
                        [response.data], { type: attrs.type }
                    ),
                    fileUrl = URL.createObjectURL(fileBlob),
                    
                    element = "<a/>",
                    elementAttrs = { href: fileUrl, download: attrs.nameFile };

                angular.element(element, elementAttrs).appendTo("body")[0].click();

                $timeout(function () {
                    URL.revokeObjectURL(fileUrl); 
                }, 10000);

                if (softtion.isFunction(attrs.success)) {
                    attrs.success(fileBlob); 
                } // Se descargo archivo correctamente
            };
            
            var functionError = function (error) { 
                if (softtion.isFunction(attrs.error)) { 
                    attrs.error(error); 
                } // Error al tratar de descargar archivo
            };
            
            $http.get(
                attrs.url, { responseType: "arraybuffer" }
            ).then(functionSuccess, functionError);
        };
        
        function print(attrs) {
            var functionSuccess = function (response) {
                var fileBlob = new Blob(
                        [response.data], { type: attrs.type }
                    ),
                    fileUrl = URL.createObjectURL(fileBlob);
            
                $window.open(fileUrl).print();

                if (softtion.isFunction(attrs.success)) {
                    attrs.success(fileBlob); 
                } // Se descargo archivo correctamente
            };
            
            var functionError = function (error) {
                if (softtion.isFunction(attrs.error)) { 
                    attrs.error(error); 
                } // Error al tratar de descargar archivo
            };
            
            $http.get(
                attrs.url, { responseType: "arraybuffer" }
            ).then(functionSuccess, functionError);
        };
        
        function viewPreview(attrs) {
            var functionSuccess = function (response) {
                var fileBlob = new Blob(
                        [response.data], { type: attrs.type }
                    ),
                    fileUrl = URL.createObjectURL(fileBlob);
            
                $window.open(fileUrl);

                if (softtion.isFunction(attrs.success)) {
                    attrs.success(fileBlob); 
                } // Se descargo archivo correctamente
            };
            
            var functionError = function (error) {
                if (softtion.isFunction(attrs.error)) { 
                    attrs.error(error); 
                } // Error al tratar de descargar archivo
            };
            
            $http.get(
                attrs.url, { responseType: "arraybuffer" }
            ).then(functionSuccess, functionError);
        };
            
        return {
            download: download,
            print: print,
            viewPreview: viewPreview
        };
    };

    ngSofttion.service("$httpFile", ["$http", "$timeout", "$window", httpFileService]);
});