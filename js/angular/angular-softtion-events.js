/*
 Angular Softtion Events v1.1.8
 (c) 2017 - 2018 Softtion Developers
 http://angular.softtion.com.co
 License: MIT
 Updated: 31/Mar/2018
 */

((factory) => {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular, jQuery);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})((softtion, angular, jQuery) => {
    
    var ngEvents = angular.module("ngSofttionEvents", []).
            directive("ngEnter", ngEnter).
            directive("ngLoad", ngLoad).
            directive("ngClickright", ngClickRight).
            directive("ngTextcopy", ngTextCopy).
            directive("ngTextcut", ngTextCut).
            directive("ngTextpaste", ngTextPaste).
            directive("ngScroll", ngScroll).
            directive("ngMousehold", ngMouseHold).
            directive("ngTouchhold", ngTouchHold).
            directive("ngPointerhold", ngPointerHold).
            directive("ngTransitionstart", ngTransitionStart).
            directive("ngTransitionend", ngTransitionEnd).
            directive("ngAnimationstart", ngAnimationStart).
            directive("ngAnimationend", ngAnimationEnd);
    
        // Eventos grupales en AngularJS
    var touchDirectives = [
            { event: "touchstart", name: "ngTouchstart" },
            { event: "touchcancel", name: "ngTouchcancel" },
            { event: "touchmove", name: "ngTouchmove" },
            { event: "touchend", name: "ngTouchend" },
            { event: "touchleave", name: "ngTouchleave" }
        ],
        
        pointerDirectives = [
            { eventTouch: "touchstart", eventMouse: "mousedown", name: "ngPointerdown" },
            { eventTouch: "touchend", eventMouse: "mouseup", name: "ngPointerup" },
            { eventTouch: "touchmove", eventMouse: "mousemove", name: "ngPointermove" }
        ],
        
        dragAndDropDirectives = [
            { event: "drop", name: "ngDrop" },
            { event: "dragstart", name: "ngDragstart" },
            { event: "dragenter", name: "ngDragEnter" },
            { event: "dragover", name: "ngDragover" },
            { event: "dragleave", name: "ngDragleave" },
            { event: "dragend", name: "ngDragend" }
        ];
    
    touchDirectives.forEach((directive) => {
        ngEvents.directive(directive.name, touchDirective(directive));
    });
    
    pointerDirectives.forEach((directive) => {
        ngEvents.directive(directive.name, pointerDirective(directive));
    });
    
    dragAndDropDirectives.forEach((directive) => {
        ngEvents.directive(directive.name, dragAndDropDirective(directive));
    });
    
    // Directiva: NgEnter
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngEnter.$inject = [ "$parse" ];
    
    function ngEnter($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnEnter = $parse($attrs.ngEnter); // Función Enter

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("keyup", ($event) => {
                        if ($event.which !== 13) return;
                        
                        var callback = function () {
                            fnEnter($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgLoad
    // Version: 1.0.0
    // Updated: 16/Abr/2018
    
    ngLoad.$inject = [ "$parse" ];
    
    function ngLoad($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnLoad = $parse($attrs.ngLoad); // Función Load

                return function ($scope, $element) {
                    $element.on("load", ($event) => {
                        var callback = function () {
                            fnLoad($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgError
    // Version: 1.0.0
    // Updated: 16/Abr/2018
    
    ngError.$inject = [ "$parse" ];
    
    function ngError($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnError = $parse($attrs.ngLoad); // Función Error

                return function ($scope, $element) {
                    $element.on("error", ($event) => {
                        var callback = function () {
                            fnError($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgClickRight
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngClickRight.$inject = [ "$parse" ];
    
    function ngClickRight($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnClickright = $parse($attrs.ngClickright); // Evento click derecho
                
                return function ($scope, $element) {
                    $element.on("contextmenu", () => { return false; });
                    
                    $element.on("mousedown", ($event) => {
                        if ($event.which !== 3) return;
                        
                        var callback = function () {
                            fnClickright($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextCopy
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextCopy.$inject = [ "$parse" ];
    
    function ngTextCopy($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextCopy = $parse($attrs.ngTextcopy); // Función Copiar

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("copy", ($event) => {
                        var callback = function () {
                            fnTextCopy($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextCut
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextCut.$inject = [ "$parse" ];
    
    function ngTextCut($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextCut = $parse($attrs.ngTextcut); // Función Cortar

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("cut", ($event) => {
                        var callback = function () {
                            fnTextCut($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextPaste
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextPaste.$inject = [ "$parse" ];
    
    function ngTextPaste($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextPaste = $parse($attrs.ngTextpaste); // Función Pegar
                
                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("paste", ($event) => {
                        var callback = function () {
                            fnTextPaste($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgScroll
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngScroll.$inject = [ "$parse" ];
    
    function ngScroll($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnScroll = $parse($attrs.ngScroll); // Función Scroll

                return function ($scope, $element) {
                    $element.on("scroll", ($event) => {
                        var callback = function () {
                            fnScroll($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: NgMouseHold
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngMouseHold.$inject = [ "$parse", "$timeout" ];
    
    function ngMouseHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnMousehold = $parse($attrs.ngMousehold), promise;

                return function ($scope, $element) {
                    $element.on("mousedown", ($event) => {
                        var callback = function () {
                            fnMousehold($scope, { $event: $event, $element: $element });
                        };

                        promise = $timeout(callback, 1000);
                    });

                    $element.on("mousemove", () => { $timeout.cancel(promise); });

                    $element.on("mouseup", () => { $timeout.cancel(promise); });
                };
            }
        };
    }
    
    // Directiva: NgTouch
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    function touchDirective(directive) {
        
        ngTouch.$inject = [ "$parse" ];
        
        function ngTouch($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnTouch = $parse($attrs[directive.name]); // Función Touch

                    return function ($scope, $element) {
                        if (!softtion.isTouchSupport()) return; // No soporta Touch
                        
                        $element.on(directive.event, ($event) => {
                            var callback = function () {
                                fnTouch($scope, { $event: $event, $element: $element });
                            };

                            $scope.$apply(callback); // Disparando evento
                        }); 
                    };
                }
            };
        }
        
        return ngTouch; // Retornando eventos Touchs
    }
    
    // Directiva: ngTouchHold
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngTouchHold.$inject = [ "$parse", "$timeout" ];
    
    function ngTouchHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTouchHold = $parse($attrs.ngTouchhold), promise;

                return function ($scope, $element) {
                    if (!softtion.isTouchSupport()) return; // No soporta Touch
                    
                    $element.on("touchstart", ($event) => {
                        var callback = function () {
                            fnTouchHold($scope, { $event: $event, $element: $element });
                        };

                        promise = $timeout(callback, 1000);
                    });

                    $element.on("touchmove", () => { $timeout.cancel(promise); });

                    $element.on("touchend", () => { $timeout.cancel(promise); });
                };
            }
        };
    }
    
    // Directiva: NgPointer
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    function pointerDirective(directive) {
        
        ngPointer.$inject = [ "$parse" ];
        
        function ngPointer($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnPointer = $parse($attrs[directive.name]); // Función pointer

                    return function ($scope, $element) {
                        var fnEvent = function ($event) {
                            var callback = function () {
                                fnPointer($scope, { $event: $event, $element: $element });
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
        }
        
        return ngPointer; // Retornando eventos Pointers
    }
    
    // Directiva: NgPointerHold
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngPointerHold.$inject = [ "$parse", "$timeout" ];
    
    function ngPointerHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnPointerHold = $parse($attrs.ngPointerhold), promise;

                return function ($scope, $element) {
                    var fnPromise = function ($event) {
                            var callback = function () {
                                fnPointerHold($scope, { $event: $event, $element: $element });
                            };

                            promise = $timeout(callback, 1000);
                        },
                        cancelPromise = function () { $timeout.cancel(promise); };

                    $element.on("touchstart", fnPromise);
                    $element.on("touchmove", cancelPromise);
                    $element.on("touchend", cancelPromise);
                    $element.on("mousedown", fnPromise);
                    $element.on("mousemove", cancelPromise);
                    $element.on("mouseup", cancelPromise);
                };
            }
        };
    }
    
    // Directiva: NgDragAndDrop
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    function dragAndDropDirective(directive) {
        
        ngDragAndDrop.$inject = [ "$parse" ];
    
        function ngDragAndDrop($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnDragAndDrop = $parse($attrs[directive.name]);

                    return function ($scope, $element) {
                        $element.on(directive.event, ($event) => {
                            var callback = function () {
                                fnDragAndDrop($scope, { $event: $event, $element: $element });
                            };

                            $scope.$apply(callback); // Disparando evento
                        }); 
                    };
                }
            };
        }
        
        return ngDragAndDrop; // Retornando eventos DragAndDrop
    }
    
    // Directiva: ngTransitionStart
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngTransitionStart.$inject = [ "$parse" ];
    
    function ngTransitionStart($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTransitionStart = $parse($attrs.ngTransitionStart); // Función TransitionStart

                return function ($scope, $element) {
                    $element.transitionstart(($event) => {
                        var callback = function () {
                            fnTransitionStart($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: ngTransitionEnd
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngTransitionEnd.$inject = [ "$parse" ];
    
    function ngTransitionEnd($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTransitionEnd = $parse($attrs.ngTransitionEnd); // Función TransitionEnd

                return function ($scope, $element) {
                    $element.transitionend(($event) => {
                        var callback = function () {
                            fnTransitionEnd($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: ngAnimationStart
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngAnimationStart.$inject = [ "$parse" ];
    
    function ngAnimationStart($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnAnimationStart = $parse($attrs.ngAnimationStart); // Función AnimationStart

                return function ($scope, $element) {
                    $element.animationstart(($event) => {
                        var callback = function () {
                            fnAnimationStart($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: ngAnimationEnd
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngAnimationEnd.$inject = [ "$parse" ];
    
    function ngAnimationEnd($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnAnimationEnd = $parse($attrs.ngAnimationEnd); // Función AnimationEnd

                return function ($scope, $element) {
                    $element.animationend(($event) => {
                        var callback = function () {
                            fnAnimationEnd($scope, { $event: $event, $element: $element });
                        };

                        $scope.$apply(callback); // Disparando evento
                    });
                };
            }
        };
    }
});