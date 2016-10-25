/*
 * Angular Middleware
 * 2016, https://github.com/oldtimeguitarguy/angular-middleware
 * Modify: Softtion Developers
 * License: MIT
 */
(function (angular) {
    "use strict";

    // This has to be declared here
    // because this is concatinated
    // BEFORE the provider, which defines it
    var $mappings = {}, $bypassAll = false, $globalMiddleware = { middleware: [] };
    
    var factory = function ($injector, $q) {
        var middleware = {
            next: nextMiddleware
        },
        request = {
            next: nextRequest, redirectTo: redirectTo
        };
        
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

        this.$get = ["$injector", "$q", factory];
    };

    var ngMiddleware = angular.module("ngMiddleware", []);
            
    ngMiddleware.provider("$middleware", provider);

    ngMiddleware.config(['$provide', function ($provide) {
        $provide.decorator('$route', ['$delegate', function ($delegate) {
            angular.forEach($delegate.routes, function (route) {
                route.resolve = route.resolve || {};
            });
            
            return $delegate;
        }]);
    }]);

    ngMiddleware.run(['$rootScope', '$route', '$location', '$middleware',
        function ($rootScope, $route, $location, $middleware) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                next.resolve.middleware = function () {
                    return $middleware(next, next.params);
                };
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
}(window.angular));