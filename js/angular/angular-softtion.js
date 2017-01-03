/*
 Angular Softtion v0.0.5
 (c) 2016 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 19/Nov/2016
*/

(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("AngularSofttion requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular, jQuery) {
    
    var ngSofttion = angular.module("ngSofttion", []);
    
    ngSofttion.provider("$request", function () {
        
        var RequestHandler = {
            scope: undefined,
            
            settings: {
                dataType: "json",
                async: true,
                timeout : 60000,
                username: "",
                password: "",
                done: function () {},
                failed: function () {},
                headers: {}
            },
            
            resultDone: function (data, textStatus, jqXHR) {
                if (softtion.is("function", RequestHandler.doneRequest)) {
                    RequestHandler.doneRequest(data, textStatus, jqXHR);
                } // Existe una función definida para la Respuesta
            },
            
            doneAjax: function (data, textStatus, jqXHR) {
                !(softtion.is("defined", RequestHandler.scope)) ?
                    RequestHandler.resultDone(data, textStatus, jqXHR) :
                    RequestHandler.scope.$apply(function () {
                        RequestHandler.resultDone(data, textStatus, jqXHR);
                    });
            },
            
            doneRequest: function (data, textStatus, jqXHR) {}, 
            
            failGlobal: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR); console.log(textStatus); console.log(errorThrown);
            },
            
            failAjax: function (jqXHR, textStatus, errorThrown) {
                RequestHandler.failGlobal(jqXHR, textStatus, errorThrown);
                
                if (softtion.is("function", RequestHandler.failRequest)) {
                    !(softtion.is("defined", RequestHandler.scope)) ?
                        RequestHandler.failRequest(jqXHR, textStatus, errorThrown) :
                        RequestHandler.scope.$apply(function () {
                            RequestHandler.failRequest(jqXHR, textStatus, errorThrown);
                        });
                } // Se ha definido evento para procesar error
            },
            
            failRequest: function (jqXHR, textStatus, errorThrown) {}
        };
        
        var Request = function () { };
        
        Request.prototype.settings = function (settingsRequest) {
            if (softtion.is("defined", settingsRequest)) {
                angular.extend(RequestHandler.settings, settingsRequest); 
                
                return this; // Retornando interfaz fluida
            } else {
                return RequestHandler.settings;
            }// Se desea conocer las opciones establecidas para la Petición
        };
        
        Request.prototype.scope = function (scope) {
            RequestHandler.scope = scope; return this;
        };
        
        Request.prototype.errorGlobal = function (errorGlobal) {
            if (softtion.is("function", errorGlobal)) { 
                RequestHandler.failGlobal = errorGlobal; 
            } // Se ha definido nuevo error Global
                
            return this; // Retornando interfaz fluida
        };
        
        Request.prototype.post = function (optionsPost) {
            var settingsPost = { method: "POST" };
            
            angular.extend(settingsPost, RequestHandler.settings);
            angular.extend(settingsPost, optionsPost);
            
            RequestHandler.doneRequest = settingsPost["done"]; 
            RequestHandler.failRequest = settingsPost["failed"]; 
            
            return jQuery.ajax(settingsPost).done(RequestHandler.doneAjax).
                fail(RequestHandler.failAjax); // Petición POST
        };
        
        Request.prototype.get = function (optionsPost) {
            var settingsGet = { method: "GET" };
            
            angular.extend(settingsGet, RequestHandler.settings);
            angular.extend(settingsGet, optionsPost);
            
            RequestHandler.doneRequest = settingsGet["done"]; 
            RequestHandler.failRequest = settingsGet["failed"]; 
            
            return jQuery.ajax(settingsGet).done(RequestHandler.doneAjax).
                fail(RequestHandler.failAjax); // Petición GET
        };
        
        var request = new Request();
        
        this.$get = function () { return request; };
    });
});