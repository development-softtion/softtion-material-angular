/*
 Angular Softtion v1.0.0
 (c) 2016 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 05/Ene/2016
*/

(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular, jQuery) {
    
    var ngSofttion = angular.module("ngSofttion", []);
    
    //https://github.com/oldtimeguitarguy/angular-middleware
    var $mappings = {}, $bypassAll = false, $globalMiddleware = { middleware: [] }, globalAfter;
    
    var factory = function ($injector, $q) {
        var middleware = {
                next: nextMiddleware
            },
            request = {
                next: nextRequest, redirectTo: redirectTo
            };
        
        function shouldBypass(route) {
            if ($bypassAll) { 
                return true;
            }
            return !middlewareExists(route);
        }

        function middlewareExists(route) {
            return hasMiddleware($globalMiddleware) || hasMiddleware(route);
        }

        function hasMiddleware(route) {
            var middleware = getRouteMiddleware(route);
            
            return !!middleware && !!middleware.length;
        }

        function getRouteMiddleware(route) {
            return route.middleware || ((route.data || {}).vars || {}).middleware;
        }

        function concatMiddlewareNames(routes) {
            var output = [];

            // Concat each route's middleware names
            for (var i = 0; i < routes.length; i++) {
                output = output.concat(getMiddlewareNames(routes[i]));
            }

            return output;
        }

        function getMiddlewareNames(route) {
            var middleware = getRouteMiddleware(route);

            if (middleware instanceof Array) {
                return middleware;
            }

            if (typeof middleware === 'undefined') {
                return [];
            }

            return middleware.split('|');
        }

        function nextMiddleware() {
            var next = $mappings[middleware.names[middleware.index++]];

            if (next) {
                $injector.invoke(next, request); }
        }

        function nextRequest() {
            if (middleware.index === middleware.names.length) {
                middleware.resolution.resolve();
            }

            middleware.next();
        }

        function redirectTo(route, params, options) {
            middleware.resolution.reject({
                type: "redirectTo", route: route, params: params, options: options
            });
        }
        
        return function (toRoute, toParams) {
            // Return if we should bypass
            if (shouldBypass(toRoute)) {
                return $q.resolve();
            }

            // Store a copy of the route parameters in the request
            request.params = angular.copy(toParams);

            // Store route name in the request
            request.route = toRoute.name;

            // Set the middleware index to 0
            middleware.index = 0;

            // Set the middleware names.
            // Make sure the globals are first, then concat toRoute
            middleware.names = concatMiddlewareNames([$globalMiddleware, toRoute]);

            // Create a deferred promise
            middleware.resolution = $q.defer();

            // Process that first middleware!
            middleware.next();

            // Return the promise
            return middleware.resolution.promise;
        };
    };

    var provider = function () {
        this.map = function (customMappings) {
            if (typeof customMappings !== 'object') {
                throw 'Your middleware map must be an object!';
            }

            $mappings = customMappings;
        };
        
        this.bypassAll = function (enableBypass) {
            if (typeof enableBypass !== 'boolean') {
                throw 'You must provide bypassAll with a boolean value!';
            }

            $bypassAll = enableBypass; // Set it!
        };

        this.global = function (customGlobalMiddleware) {
            if (typeof customGlobalMiddleware !== 'string' && !angular.isArray(customGlobalMiddleware)) {
                throw 'You must provide a string, a string separated by pipes, or an array of middleware names';
            }

            $globalMiddleware.middleware = customGlobalMiddleware;
        };
        
        this.globalAfter = function (customGlobalAfter) {
            globalAfter = customGlobalAfter;
        };

        this.$get = ["$injector", "$q", factory];
    };

    ngSofttion.provider("$middleware", provider);

    ngSofttion.config(["$provide", function ($provide) {
        $provide.decorator("$route", ["$delegate", function ($delegate) {
            angular.forEach($delegate.routes, function (route) {
                route.resolve = route.resolve || {};
            });
            
            return $delegate;
        }]);
    }]);

    ngSofttion.run(['$rootScope', '$route', '$location', '$middleware',
        function ($rootScope, $route, $location, $middleware) {
            $rootScope.$on('$routeChangeStart', function (angularEvent, next, current) {
                next.resolve.middleware = function () {
                    return $middleware(next, next.params);
                };
            });
            
            $rootScope.$on('$routeChangeSuccess', function (angularEvent, current, previous) {
                if (angular.isFunction(globalAfter)) {
                    globalAfter();
                } // Se definió una función global para el cargue
                
                if (angular.isFunction(current.after)) {
                    current.after(); return;
                } // Se definió función para ejecutar despues del cargue
            });
            
            $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
                if (rejection.type === "redirectTo") {
                    // Prevent the route change from working normally
                    event.preventDefault();

                    // If the redirect route is the same, then just reload
                    if (current.regexp.test(rejection.route)) {
                        return $route.reload();
                    }

                    // The path is new, so go there!
                    $location.path(rejection.route);
                    if (rejection.params)
                        $location.search(rejection.params);
                }
            });
    }]);
});