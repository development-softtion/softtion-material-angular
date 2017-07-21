/*
 Angular Softtion Events v1.1.2
 (c) 2017 Softtion Developers, http://angular.softtion.com.co
 License: MIT
 Updated: 20/Jul/2017
 */
(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular, jQuery) {
    
    var ngSofttionEvents = angular.module("ngSofttionEvents", []);
    
    // Evento enter en los inputs y textarea
    ngSofttionEvents.directive("ngEnter", ["$parse", function ($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fn = $parse($attrs["ngEnter"]);

                return function ($scope, $element) {
                    if (($element.tagName() === "INPUT") || $element.tagName() === "TEXTAREA") {
                        $element.on("keyup", function ($event) {
                            if ($event.which === 13) { 
                                var callback = function () {
                                    fn($scope, { $event: $event });
                                };
                                
                                $scope.$apply(callback); // Disparando evento
                            } // Presiono la tecla ENTER
                        });
                    } // El componente es de texto, se puede agregar evento Enter
                };
            }
        };
    }]);
    
    // Evento click derecho
    ngSofttionEvents.directive("ngClickright", ["$parse", function ($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fn = $parse($attrs["ngClickright"]);
                
                return function ($scope, $element) {
                    $element.on("contextmenu", function () { return false; });
                    
                    $element.on("mousedown", function ($event) {
                        if ($event.which === 3) { 
                            var callback = function () {
                                fn($scope, { $event: $event });
                            };

                            $scope.$apply(callback); // Disparando evento
                        } // Presiono la tecla ENTER
                    });
                };
            }
        };
    }]);
    
    // Evento mouse hold
    ngSofttionEvents.directive("ngMousehold", 
        ["$parse", "$timeout", function ($parse, $timeout) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs["ngMousehold"]), promise;
                    
                    return function ($scope, $element) {
                        $element.on("mousedown", function ($event) {
                            var callback = function () {
                                fn($scope, { $event: $event });
                            };

                            promise = $timeout(callback, 1000);
                        });

                        $element.on("mousemove", function () { $timeout.cancel(promise); });

                        $element.on("mouseup", function () { $timeout.cancel(promise); });
                    };
                }
            };
        }]
    );
    
    // Eventos touch en AngularJS
    var directivesTouch = [
        { event: "touchstart", name: "ngTouchstart" },
        { event: "touchcancel", name: "ngTouchcancel" },
        { event: "touchmove", name: "ngTouchmove" },
        { event: "touchend", name: "ngTouchend" },
        { event: "touchleave", name: "ngTouchleave" }
    ];
    
    directivesTouch.forEach(function (directive) {
        ngSofttionEvents.directive(directive.name, ["$parse", function ($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs[directive.name]);

                    return function ($scope, $element) {
                        if ("ontouchstart" in window && softtion.isFunction(fn)) {
                            $element.on(directive.event, function ($event) {
                                var callback = function () {
                                    fn($scope, { $event: $event });
                                };

                                $scope.$apply(callback); // Disparando evento
                            }); // Dispositivo soporta TouchEvent
                        }
                    };
                }
            };
        }]);
    });
    
    // Evento touch hold
    ngSofttionEvents.directive("ngTouchhold", 
        ["$parse", "$timeout", function ($parse, $timeout) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs["ngTouchhold"]), promise;
                    
                    return function ($scope, $element) {
                        if ("ontouchstart" in window && softtion.isFunction(fn)) {
                            $element.on("touchstart", function ($event) {
                                var callback = function () {
                                    fn($scope, { $event: $event });
                                };
                                
                                promise = $timeout(callback, 1000);
                            });
                            
                            $element.on("touchmove", function () { $timeout.cancel(promise); });
                            
                            $element.on("touchend", function () { $timeout.cancel(promise); });
                        } // Dispositivo soporta TouchEvent
                    };
                }
            };
        }]
    );
    
    // Eventos pointer en AngularJS
    var directivesPointer = [
        { eventTouch: "touchstart", eventMouse: "mousedown", name: "ngPointerdown" },
        { eventTouch: "touchend", eventMouse: "mouseup", name: "ngPointerup" },
        { eventTouch: "touchmove", eventMouse: "mousemove", name: "ngPointermove" }
    ];
    
    directivesPointer.forEach(function (directive) {
        ngSofttionEvents.directive(directive.name, ["$parse", function ($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs[directive.name]);

                    return function ($scope, $element) {
                        var fnEvent = function ($event) {
                            var callback = function () {
                                fn($scope, { $event: $event });
                            };

                            $scope.$apply(callback); // Disparando evento
                        };
                        
                        $element.on(directive.eventTouch, fnEvent).
                            on(directive.eventMouse, fnEvent);
                    
                        if (directive.name === "ngPointermove") {
                            $element.on("mouseout", fnEvent);
                            $element.on("mouseleave", fnEvent);
                        }
                    };
                }
            };
        }]);
    });
    
    // Evento pointer hold
    ngSofttionEvents.directive("ngPointerhold", 
        ["$parse", "$timeout", function ($parse, $timeout) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs["ngPointerhold"]), promise;
                    
                    return function ($scope, $element) {
                        var fnPromise = function ($event) {
                                var callback = function () {
                                    fn($scope, { $event: $event });
                                };

                                promise = $timeout(callback, 1000);
                            },
                            cancelPromise = function () { 
                                $timeout.cancel(promise); 
                            };
                        
                        $element.on("touchstart", fnPromise);
                        $element.on("touchmove", cancelPromise);
                        $element.on("touchend", cancelPromise);
                        $element.on("mousedown", fnPromise);
                        $element.on("mousemove", cancelPromise);
                        $element.on("mouseup", cancelPromise);
                    };
                }
            };
        }]
    );
    
    // Eventos Drag and Drop en AngularJS
    var directivesDragAndDrop = [
        { event: "drop", name: "ngDrop" },
        { event: "dragstart", name: "ngDragstart" },
        { event: "dragenter", name: "ngDragEnter" },
        { event: "dragover", name: "ngDragover" },
        { event: "dragleave", name: "ngDragleave" },
        { event: "dragend", name: "ngDragend" }
    ];
    
    directivesDragAndDrop.forEach(function (directive) {
        ngSofttionEvents.directive(directive.name, ["$parse", function ($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fn = $parse($attrs[directive.name]);

                    return function ($scope, $element) {
                        $element.on(directive.event, function ($event) {
                            var callback = function () {
                                fn($scope, { $event: $event, $element: $element });
                            };

                            $scope.$apply(callback); // Disparando evento
                        }); 
                    };
                }
            };
        }]);
    });
});