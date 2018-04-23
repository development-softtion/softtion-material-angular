/*
 Angular Softtion Middleware v1.0.4
 (c) 2016 - 2018 Softtion Developers
 http://angular.softtion.com.co
 https://github.com/oldtimeguitarguy/angular-middleware
 License: MIT
 Updated: 16/Abr/2018
*/

((factory) => {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})((softtion, angular) => {
    
    angular.module("ngSofttion").
        provider("$middleware", middlewareProvider).
        config(config).run(run);

        // Atributos
    var $bypassAll = false, 
        $mappings = {}, 
        $global = { middleware: [], resolve: [] };

    function middlewareProvider() {
        
        this.map = function (mappings) {
            if (typeof mappings !== "object") 
                throw "¡Tu mapa de middlewares debe ser un objeto!";

            $mappings = mappings; // Asignando middlewares
        };
        
        this.bypassAll = function (enabledBypass) {
            if (typeof enabledBypass !== "boolean") 
                throw "Debe proporcionar paramétro como un valor booleano";

            $bypassAll = enabledBypass; // Estado de byPass
        };

        this.setGlobalMiddlewares = function (middlewares) {
            if (typeof middlewares !== "string" && !angular.isArray(middlewares)) 
                throw "Debe proporcionar una cadena, una cadena separada | o un array de nombres de middleware";

            $global.middleware = middlewares; // Middlewares globales
        };
        
        this.setGlobalResolves = function (resolves) {
            if (!angular.isArray(resolves)) 
                throw "Debe proporcionar una matriz de funciones resolves";

            $global.resolve = resolves; // Resolves globales
        };

        this.$get = factoryProvider;
        
        factoryProvider.$inject = [ "$injector", "$q" ];
        
        function factoryProvider($injector, $q) {
            
            var middleware = { 
                    next: nextMiddleware
                },
                request = {
                    next: nextRequest, redirectTo: redirectTo
                };

            function shouldBypass(route) {
                return ($bypassAll) ? true : !middlewareExists(route);
            }

            function middlewareExists(route) {
                return hasMiddleware($global) || hasMiddleware(route);
            }

            function hasMiddleware(route) {
                var middleware = getRouteMiddleware(route);

                return !!middleware && !!middleware.length;
            }

            function getRouteMiddleware(route) {
                return route.middleware || ((route.data || {}).vars || {}).middleware;
            }

            function concatMiddlewareNames(routes) {
                var middlewares = []; // Listado de middlewares

                for (var i = 0; i < routes.length; i++) {
                    middlewares = middlewares.together(getMiddlewareNames(routes[i]));
                } // Concat each route"s middleware names

                return middlewares; // Retornando middlewares
            }

            function getMiddlewareNames(route) {
                var middleware = getRouteMiddleware(route);

                if (typeof middleware === "undefined") return [];

                if (middleware instanceof Array) return middleware;

                return middleware.split("|"); // Middlewares
            }

            function nextMiddleware() {
                var next = $mappings[middleware.names[middleware.index++]];

                if (next) $injector.invoke(next, request); 
            }

            function nextRequest() {
                if (middleware.index === middleware.names.length)
                    middleware.resolution.resolve();

                middleware.next(); // Verificando siguiente middleware
            }

            function redirectTo(route, params, options) {
                middleware.resolution.reject({
                    type: "redirectTo", route: route, params: params, options: options
                });
            }

            return function (toRoute, toParams) {
                // Return if we should bypass
                if (shouldBypass(toRoute)) return $q.resolve();

                // Store a copy of the route parameters in the request
                request.params = angular.copy(toParams);

                // Store route name in the request
                request.route = toRoute.name;

                // Set the middleware index to 0
                middleware.index = 0;

                // Set the middleware names.
                // Make sure the globals are first, then concat toRoute
                middleware.names = concatMiddlewareNames([$global, toRoute]);

                // Create a deferred promise
                middleware.resolution = $q.defer();

                // Process that first middleware!
                middleware.next();

                // Return the promise
                return middleware.resolution.promise;
            };
        }
    }
    
    config.$inject = [ "$provide" ];
    
    function config($provide) {
        $provide.decorator("$route", decoratorProvider);
    
        decoratorProvider.$inject = [ "$delegate" ];
    
        function decoratorProvider($delegate) {
            angular.forEach($delegate.routes, 
                (route) => { route.resolve = route.resolve || {}; }
            );
            
            return $delegate; // Retornando delegación
        }
    }
    
    run.$inject = [ "$rootScope", "$route", "$location", "$middleware" ];
    
    function run($rootScope, $route, $location, $middleware) {
        $rootScope.$on("$routeChangeStart", (angularEvent, next, current) => {
            next.resolve.middleware = function () {
                return $middleware(next, next.params);
            };
        });

        $rootScope.$on("$routeChangeSuccess", (angularEvent, current, previous) => {
            $global.resolve.forEach((resolve) => {
                if (softtion.isFunction(resolve)) resolve();
            });

            if (angular.isFunction(current.resolve)) current.resolve(); 
        });

        $rootScope.$on("$routeChangeError", (event, current, previous, rejection) => {
            if (rejection.type !== "redirectTo") return;
            
            event.preventDefault(); // Prevent the route change from working normally

            // If the redirect route is the same, then just reload
            if (current.regexp.test(rejection.route)) return $route.reload();
            
            $location.path(rejection.route); // The path is new, so go there!
            
            if (rejection.params) $location.search(rejection.params);

        });
    }
});