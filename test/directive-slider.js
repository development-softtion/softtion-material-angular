
            
        var ItemList = {
                name: "itemList",
                slideAction: function (itemList) {
                    var slideAction = softtion.html("div", true).
                        addClass("slide-action").tojQuery();
                    
                    itemList.append(slideAction); return slideAction;
                },
                elementSlideAction: function (slideAction, slideIcon, slideLabel) {
                    var icon = softtion.html("i").setText(slideIcon).tojQuery();

                    var button = softtion.html("button").setText(slideLabel).
                        addClass(["confirm-button", "flat"]).tojQuery();

                    slideAction.append(icon); slideAction.append(button); 
                    
                    return { icon: icon, button: button }; // Retornando elementos
                },
                directive: ["$parse", function ($parse) {
                    return {
                        restrict: "C",
                        compile: function ($element, $attrs) {
                                // Padre del componente
                            var parent = $element.parent(), 
                                    
                                // Función al completar Slide
                                fn = $parse($attrs["ngSlide"]), 
                                slideEnabled = softtion.parseBoolean(
                                    parent.attr("slide-enabled")
                                ),
                                slideFunction = softtion.parseBoolean(
                                    parent.attr("slide-function")
                                ),
                                slideConfirmable = softtion.parseBoolean(
                                    parent.attr("slide-confirmable")
                                ),
                                slideIcon = parent.attr("slide-icon"),
                                slideLabel = parent.attr("slide-label");
                                
                            var fnItemList = Material.components.ItemList;
                            
                            return function ($scope, $element) {
                                if (slideEnabled) {
                                    $element.addClass("slide"); // Item permite Slide
                                    
                                    function slideEvent($element, $event) {
                                        if (ejecuteEvent) {
                                            $element.css("height", "0"); // Ocultando elemento

                                            var callback = function () {
                                                fn($scope, { $element: $element, $event: $event });
                                            };

                                            $scope.$apply(callback); // Disparando evento
                                        }
                                    }

                                    var content = $element.children(".content"),
                                        slideAction, icon, confirmButton, ejecuteEvent = false,
                                        initialPosition, finalPosition, slided = 0,
                                        posInitialX, posFinalX, moveActive = false;

                                    if (!$element.children(".slide-action").exists()) {
                                        slideAction = fnItemList.slideAction($element);
                                    } // Insertando contenedor slideAction en el componente

                                    if (slideConfirmable) {
                                        var elements = fnItemList.elementSlideAction(slideAction, slideIcon, slideLabel);

                                        icon = elements.icon; confirmButton = elements.button;

                                        confirmButton.on("click.confirmButton", function (event) {
                                            ejecuteEvent = true; slideEvent($element, event); event.stopPropagation();
                                        });

                                        slideAction.on("click.slideAction", function () {
                                            content.css({left: "0px"}); $element.css("height", "auto"); 
                                        });
                                    } // Insertando elementos en slideAction del componente

                                    function start(event) {
                                        var typeEvent = event.type; moveActive = true;

                                        initialPosition = content.position(); finalPosition = content.position();

                                        content.transition("none"); slided = 0;

                                        posInitialX = (typeEvent === "touchstart") ?
                                            event.changedTouches[0].clientX : event.clientX;

                                        slideAction.css("height", content.height() + "px");
                                        $element.css("height", content.height() + "px");
                                    } // Función cuando se presiona el componente

                                    function move(event) {
                                        if (!moveActive) { return; } // No esta activo el evento

                                        var typeEvent = event.type; // Tipo de evento

                                        if (typeEvent === "mouseleave") {
                                            finish(event); event.stopPropagation(); return false;
                                        } // Se ha salido del componente

                                        finalPosition = content.position();

                                        posFinalX = (typeEvent === "touchmove") ?
                                                event.changedTouches[0].clientX : event.clientX;

                                        slided = (slideFunction) ? posFinalX - posInitialX : 
                                                (posFinalX - posInitialX) / 8;

                                        if (slideConfirmable) {
                                            icon.css({left: "initial", right: "initial"});
                                            confirmButton.css({left: "initial", right: "initial"});

                                            var floatElement = (slided > 0) ?
                                                {alert: "left", button: "right"} :
                                                {alert: "right", button: "left"};

                                            icon.css(floatElement.alert, "20px"); 
                                            confirmButton.css(floatElement.button, "20px");
                                        }

                                        content.css({left: slided + "px", top: initialPosition.top + "px"});
                                    } // Función cuando se mueve el componente

                                    function finish() {
                                        moveActive = false; // Fin del arrastre del slide

                                        content.transition("left 0.325s var(--standard-curve)");

                                        var width = content.width() / 2,
                                            traslation = finalPosition.left - initialPosition.left,
                                            left = (traslation > 0) ? "100%" : "-100%";

                                        if (slideFunction) {
                                            if (Math.abs(traslation) >= width) {
                                                content.css({left: left}); 

                                                if (!slideConfirmable) { ejecuteEvent = true; }
                                            } else {
                                                content.css({left: initialPosition.left});
                                            }
                                        } else {
                                            content.css({left: "0px"}); $element.css("height", "auto");
                                        }
                                    } // Función cuando se suelta el componente

                                    content.transitionend(function (event) { slideEvent($element, event); });

                                    content.pointermove(move); content.mouseleave(move);
                                    content.pointerdown(start); content.pointerup(finish);
                                }
                            };
                        }
                    };
                }]
            }
            
        var Slider = {
                route: "softtion/template/slider.html",
                name: "slider",
                html: function () {
                    var content = softtion.html("div").addClass("content").
                            addAttribute("ng-class", "{iconactive: iconActive(),"
                                + " deslice: desliceActive, disabled: ngDisabled,"
                                + " full: isValueFull(), showcase: showcase}").
                            addAttribute("ng-mouseout", "outContent()").
                            addAttribute("ng-mouseleave", "outContent()").
                            addChildren(
                                softtion.html("i").setText("{{getIconValue()}}").
                                    addAttribute("ng-click", "clickIcon()")
                            ).addChildren(
                                softtion.html("div").addClass("track").
                                    addAttribute("ng-pointerdown", "trackPointerDown($event)").
                                    addAttribute("ng-pointerup", "trackPointerUp($event)").
                                    addAttribute("ng-pointermove", "trackPointerMove($event)").
                                    addChildren(
                                        softtion.html("div").addClass("track-off")
                                    ).addChildren(
                                        softtion.html("div").addClass("track-on").
                                        addAttribute("ng-style", "getPercentajeValue()")
                                    ).addChildren(
                                        softtion.html("div").addClass("thumb").
                                            addAttribute("ng-class", "{off: isValueOff(), active: slideActive}").
                                            addAttribute("ng-style", "getPositionThumb()").
                                            addChildren(
                                                softtion.html("span").
                                                setText("{{value|number:0}}")
                                            )
                                    )
                            ).addChildren(
                                softtion.html("div").addClass("showcase-input").
                                addChildren(
                                    softtion.html("input").
                                    addAttribute("type", "number").
                                    addAttribute("ng-model", "valueInput").
                                    addAttribute("ng-disabled", "ngDisabled").
                                    addAttribute("ng-keyup", "keyUpInput()")
                                ).addChildren(
                                    softtion.html("div").addClass("line-shadow")
                                )
                            );

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-class", "{active: isLabelActive()}");
                    
                    return label + content; // Componente Slider
                },
                directive: ["$timeout", function ($timeout) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Slider.route,
                        scope: {
                            value: "=ngModel",
                            ngDisabled: "=?",
                            label: "@",
                            icon: "@",
                            emptyIcon: "@",
                            fullIcon: "@",
                            minValue: "=?",
                            maxValue: "=?",
                            slided: "=?",
                            showcase: "=?"
                        },
                        link: function ($scope, $element) {
                                // Componentes
                            var $content = $element.find(".content"),
                                $trackOff = $content.find(".track"),
                                $thumb = $content.find(".thumb"),
                                $trackOn = $content.find(".track-on");
                                
                                // Atributos
                            var initialPosition, initialX, finalX, range, time;
                            
                            $scope.desliceActive = false;
                            $scope.slideActive = false; 
                            $scope.maxValue = $scope.maxValue || 100;
                            $scope.minValue = $scope.minValue || 0;
                            range = $scope.maxValue - $scope.minValue;
                            
                            $scope.value = isNaN($scope.value) ? 
                                $scope.minValue : $scope.value;
                                
                            $scope.valueInput = parseInt($scope.value);

                            $scope.fullIcon = $scope.fullIcon || $scope.icon;
                            $scope.emptyIcon = $scope.emptyIcon || $scope.icon;
                            
                            $scope.$watch(function () {
                                return $scope.value;
                            }, function (newValue) {
                                var between = softtion.isBetween(
                                    newValue, $scope.minValue, $scope.maxValue
                                );
                            
                                if (!between) {
                                    if (newValue < $scope.minValue) {
                                        $scope.value = $scope.minValue;
                                    } // Valor es menor que el rango
                                    
                                    if (newValue > $scope.maxValue) {
                                        $scope.value = $scope.maxValue;
                                    } // Valor es mayor que el rango
                                }
                                
                                $scope.valueInput = Math.round($scope.value);
                            });

                            $scope.iconActive = function () {
                                return softtion.isString($scope.icon);
                            };
                            
                            $scope.isLabelActive = function () {
                                return softtion.isString($scope.label); 
                            };

                            $scope.getIconValue = function () {
                                if ($scope.value <= $scope.minValue) {
                                    return $scope.emptyIcon;
                                } else if ($scope.value >= $scope.maxValue) {
                                    return $scope.fullIcon;
                                } else {
                                    return $scope.icon;
                                } // Icono por defecto establecido
                            };

                            $scope.isValueOff = function () {
                                return ($scope.value <= $scope.minValue);
                            };
                            
                            $scope.isValueFull = function () {
                                return ($scope.value >= $scope.maxValue);
                            };

                            $scope.clickIcon = function () {
                                if ($scope.ngDisabled) { return; } // Inactivo
                                
                                $scope.value = $scope.minValue; // Mínimo valor
                            };
                            
                            var startSlide = function ($event) {
                                var offsetX,
                                    typeEvent = $event.type || $event.originalEvent.type;
                                
                                if (typeEvent === "touchstart") {
                                    var position = $event.changedTouches[0];
                                    
                                    initialX = position.clientX;
                                    offsetX = position.clientX - $trackOff.offset().left; 
                                } else {
                                    offsetX = $event.offsetX; initialX = $event.clientX;
                                } // No es un evento Touch

                                offsetX = ($element.hasClass("discrete")) ? offsetX + 4 : offsetX;
                                
                                return offsetX; // Posición inicial para arrastre
                            };
                            
                            $scope.trackPointerDown = function ($event) {
                                if ($scope.ngDisabled) { return; } // Inactivo
                                
                                var offsetX = startSlide($event),
                                    $target = angular.element($event.target);
                                
                                initialPosition = ($target.is($thumb)) ? 
                                    $trackOn.width() : offsetX;
                                    
                                setValueSlide(initialPosition / $trackOff.width());
                                
                                $scope.slideActive = true; // Inicio de arrastre
                            };

                            var setValueSlide = function (position) {
                                if (position >= 0 && position <= 1) {
                                    $scope.value = Math.round(position * range + $scope.minValue);
                                } // Definiendo valor por Posición
                            };
                            
                            $scope.trackPointerMove = function ($event) {
                                if (!$scope.slideActive) { return; } // No ha iniciado Slide
                                
                                var typeEvent = $event.type || $event.originalEvent.type;
                                
                                if (typeEvent === "mouseout" || typeEvent === "mouseleave") {
                                    $event.stopPropagation();
                                } // Se ha salido del componente Slide en arrastre

                                finalX = (typeEvent === "touchmove") ? 
                                    $event.changedTouches[0].clientX : $event.clientX;

                                $scope.desliceActive = true; // Se activo el arrastre
                                var finalPosition = initialPosition + (finalX - initialX);

                                if ((finalPosition > 0) && (finalPosition < $trackOff.width())) {
                                    setValueSlide(finalPosition / $trackOff.width());
                                } else if (finalPosition < 0) {
                                    setValueSlide(0);
                                } else if (finalPosition >= $trackOff.width()) {
                                    (!$element.hasClass("discret")) ?
                                        setValueSlide(1) :
                                        setValueSlide(finalPosition / $trackOff.width());
                                }
                            };
                            
                            $scope.trackPointerUp = function () {
                                $scope.slideActive = false; $scope.desliceActive = false; 
                            };
                            
                            $scope.outContent = function () { 
                                $scope.slideActive = false; $scope.desliceActive = false; 
                            };

                            $scope.getPercentajeValue = function () {
                                $scope.percentage = ($scope.value - $scope.minValue) / range * 100;

                                ($scope.value >= $scope.maxValue) ?
                                    $element.addClass("full") : $element.removeClass("full");

                                return {width: $scope.percentage + '%'}; // Porcentaje del Valor
                            };

                            $scope.getPositionThumb = function () {
                                var percentage = ($element.hasClass("discrete")) ?
                                    $scope.percentage + "%" : 
                                    "calc(" + $scope.percentage + "% - 8px)";
                                
                                return {left: percentage}; // Posicion del Thumb
                            };
                                
                            var setValueInput = function () {
                                if (softtion.isUndefined($scope.valueInput)) {
                                    $scope.valueInput = $scope.value;
                                } else {
                                    $scope.value = $scope.valueInput;
                                } // Se ha definido correctamente valor en Input
                            };
                            
                            $scope.keyUpInput = function () {
                                if (softtion.isDefined(time)) {
                                    $timeout.cancel(time);
                                } // Cancelando función actual
                                
                                time = $timeout(setValueInput, 500);
                            };
                        }
                    };
                }]
            }