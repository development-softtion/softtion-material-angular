
/*
 Angular Softtion Events v1.2.1
 (c) 2017 - 2019 Softtion Developers
 https://angular.softtion.com.co
 License: MIT
 Created: 19/Nov/2016
 Updated: 22/Abr/2019
 */

(function (factory) {
    
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("Softtion Angular requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
    
})(function (softtion, angular) {
    
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
    
    touchDirectives.forEach(function (directive) {
        ngEvents.directive(directive.name, touchDirective(directive));
    });
    
    pointerDirectives.forEach(function (directive) {
        ngEvents.directive(directive.name, pointerDirective(directive));
    });
    
    dragAndDropDirectives.forEach(function (directive) {
        ngEvents.directive(directive.name, dragAndDropDirective(directive));
    });
    
    // Directiva: NgEnter
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngEnter.$inject = ["$parse"];
    
    function ngEnter($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnEnter = $parse($attrs.ngEnter); // Función Enter

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("keyup", function ($event) {
                        if ($event.which !== 13) return;

                        $scope.$apply(function () {
                            fnEnter($scope, { $event: $event, $element: $element });
                        }); 
                    });
                };
            }
        };
    }
    
    // Directiva: NgLoad
    // Version: 1.0.0
    // Updated: 16/Abr/2018
    
    ngLoad.$inject = ["$parse"];
    
    function ngLoad($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnLoad = $parse($attrs.ngLoad); // Función Load

                return function ($scope, $element) {
                    $element.on("load", function ($event) {
                        $scope.$apply( function () {
                            fnLoad($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgError
    // Version: 1.0.0
    // Updated: 16/Abr/2018
    
    ngError.$inject = ["$parse"];
    
    function ngError($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnError = $parse($attrs.ngError); // Función Error

                return function ($scope, $element) {
                    $element.on("error", function ($event) {
                        $scope.$apply(function () {
                            fnError($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgClickRight
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngClickRight.$inject = ["$parse"];
    
    function ngClickRight($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnClickright = $parse($attrs.ngClickright); // Evento click derecho
                
                return function ($scope, $element) {
                    $element.on("contextmenu", function () { return false; });
                    
                    $element.on("mousedown", function ($event) {
                        if ($event.which !== 3) return;

                        $scope.$apply(function () {
                            fnClickright($scope, { $event: $event, $element: $element });
                        }); 
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextCopy
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextCopy.$inject = ["$parse"];
    
    function ngTextCopy($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextCopy = $parse($attrs.ngTextcopy); // Función Copiar

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("copy", function ($event) {
                        $scope.$apply(function () {
                            fnTextCopy($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextCut
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextCut.$inject = ["$parse"];
    
    function ngTextCut($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextCut = $parse($attrs.ngTextcut); // Función Cortar

                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("cut", function ($event) {
                        $scope.$apply(function () {
                            fnTextCut($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgTextPaste
    // Version: 1.0.0
    // Updated: 23/Abr/2018
    
    ngTextPaste.$inject = ["$parse"];
    
    function ngTextPaste($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTextPaste = $parse($attrs.ngTextpaste); // Función Pegar
                
                return function ($scope, $element) {
                    if (($element.tagName() !== "INPUT") && $element.tagName() !== "TEXTAREA") return;
                    
                    $element.on("paste", function ($event) {
                        $scope.$apply(function () {
                            fnTextPaste($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgScroll
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngScroll.$inject = ["$parse"];
    
    function ngScroll($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnScroll = $parse($attrs.ngScroll); // Función Scroll

                return function ($scope, $element) {
                    $element.on("scroll", function ($event) {
                        $scope.$apply(function () {
                            fnScroll($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: NgMouseHold
    // Version: 1.0.0
    // Updated: 31/Mar/2018
    
    ngMouseHold.$inject = ["$parse", "$timeout"];
    
    function ngMouseHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnMousehold = $parse($attrs.ngMousehold), promise;

                return function ($scope, $element) {
                    $element.on("mousedown", function ($event) {
                        promise = $timeout(function () {
                            fnMousehold($scope, { $event: $event, $element: $element });
                        }, 1000);
                    });

                    $element.on("mousemove", function () { $timeout.cancel(promise); });

                    $element.on("mouseup", function () { $timeout.cancel(promise); });
                };
            }
        };
    }
    
    // Directiva: NgTouch
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    function touchDirective(directive) {
        
        ngTouch.$inject = ["$parse"];
        
        function ngTouch($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnTouch = $parse($attrs[directive.name]); // Función Touch

                    return function ($scope, $element) {
                        if (!softtion.isTouchSupport()) return; // No soporta Touch
                        
                        $element.on(directive.event, function ($event) {
                            $scope.$apply(function () {
                                fnTouch($scope, { $event: $event, $element: $element });
                            });
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
    
    ngTouchHold.$inject = ["$parse", "$timeout"];
    
    function ngTouchHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTouchHold = $parse($attrs.ngTouchhold), promise;

                return function ($scope, $element) {
                    if (!softtion.isTouchSupport()) return; // No soporta Touch
                    
                    $element.on("touchstart", function ($event) {
                        promise = $timeout(function () {
                            fnTouchHold($scope, { $event: $event, $element: $element });
                        }, 1000);
                    });

                    $element.on("touchmove", function () { $timeout.cancel(promise); });

                    $element.on("touchend", function () { $timeout.cancel(promise); });
                };
            }
        };
    }
    
    // Directiva: NgPointer
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    function pointerDirective(directive) {
        
        ngPointer.$inject = ["$parse"];
        
        function ngPointer($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnPointer = $parse($attrs[directive.name]); // Pointer

                    function fnMouseEvent($scope, $element) {
                        return function ($event) {
                            $scope.$apply(function () {
                                fnPointer($scope, { 
                                    $result: getResultMouseEvent($event), 
                                    $event: $event, $element: $element
                                });
                            }); // Disparando evento
                        };
                    }
                    
                    function getResultMouseEvent($event) {
                        return {
                            offsetX: $event.offsetX,
                            offsetY: $event.offsetY
                        };
                    }
                    
                    function fnTouchEvent($scope, $element) {
                        return function ($event) {
                            $scope.$apply(function () {
                                fnPointer($scope, { 
                                    $result: getResultTouchEvent($event), 
                                    $event: $event, $element: $element
                                });
                            }); // Disparando evento
                        };
                    }
                    
                    function getResultTouchEvent($event) {
                        return ($event.targetTouches.length === 0) ? 
                            { } : {
                                offsetX: $event.targetTouches[0].clientX,
                                offsetY: $event.targetTouches[0].clientY
                            };
                    }

                    return function ($scope, $element) {
                        $element.
                            on(directive.eventTouch, fnTouchEvent($scope, $element)).
                            on(directive.eventMouse, fnMouseEvent($scope, $element));
                    
                        if (directive.name === "ngPointermove") {
                            $element.on("mouseleave", fnMouseEvent($scope, $element));
                            $element.on("mouseout", fnMouseEvent($scope, $element));
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
    
    ngPointerHold.$inject = ["$parse", "$timeout"];
    
    function ngPointerHold($parse, $timeout) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnPointerHold = $parse($attrs.ngPointerhold), promise;

                return function ($scope, $element) {
                    var fnPromise = function ($event) {
                            promise = $timeout(function () {
                                fnPointerHold($scope, { $event: $event, $element: $element });
                            }, 1000);
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
        
        ngDragAndDrop.$inject = ["$parse"];
    
        function ngDragAndDrop($parse) {
            return {
                restrict: "A",
                compile: function ($element, $attrs) {
                    var fnDragAndDrop = $parse($attrs[directive.name]);

                    return function ($scope, $element) {
                        $element.on(directive.event, function ($event) {
                            $scope.$apply(function () {
                                fnDragAndDrop($scope, { $event: $event, $element: $element });
                            });
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
    
    ngTransitionStart.$inject = ["$parse"];
    
    function ngTransitionStart($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTransitionStart = $parse($attrs.ngTransitionStart); // Función TransitionStart

                return function ($scope, $element) {
                    $element.transitionstart(function ($event) {
                        $scope.$apply(function () {
                            fnTransitionStart($scope, { $event: $event, $element: $element });
                        });
                    });
                };
            }
        };
    }
    
    // Directiva: ngTransitionEnd
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngTransitionEnd.$inject = ["$parse"];
    
    function ngTransitionEnd($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnTransitionEnd = $parse($attrs.ngTransitionEnd); // Función TransitionEnd

                return function ($scope, $element) {
                    $element.transitionend(function ($event) {
                        $scope.$apply(function () {
                            fnTransitionEnd($scope, { $event: $event, $element: $element });
                        }); 
                    });
                };
            }
        };
    }
    
    // Directiva: ngAnimationStart
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngAnimationStart.$inject = ["$parse"];
    
    function ngAnimationStart($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnAnimationStart = $parse($attrs.ngAnimationStart); // Función AnimationStart

                return function ($scope, $element) {
                    $element.animationstart(function ($event) {
                        $scope.$apply(function () {
                            fnAnimationStart($scope, { $event: $event, $element: $element });
                        }); // Disparando evento
                    });
                };
            }
        };
    }
    
    // Directiva: ngAnimationEnd
    // Version: 1.0.0
    // Updated: 01/Abr/2018
    
    ngAnimationEnd.$inject = ["$parse"];
    
    function ngAnimationEnd($parse) {
        return {
            restrict: "A",
            compile: function ($element, $attrs) {
                var fnAnimationEnd = $parse($attrs.ngAnimationEnd); // Función AnimationEnd

                return function ($scope, $element) {
                    $element.animationend(function ($event) {
                        $scope.$apply(function () {
                            fnAnimationEnd($scope, { $event: $event, $element: $element });
                        }); 
                    });
                };
            }
        };
    }
});