/* !
 * Angular Softtion Material v1.0.0
 * (c) 2016 Softtion Developers
 * License: MIT
 */
(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("AngularSofttion requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular) {
    
    var ngMaterial = angular.module("ngSofttionMaterial", ["ngSanitize"]),
        TextType = softtion.get(softtion.TEXTCONTROL);
    
    var Material = {
        components: {            
            AutoComplete: {
                route: "softtion/template/autocomplete.html",
                name: "autocomplete",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-model","valueInput").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-keyup","keyupInput($event)").
                        addAttribute("ng-keydown","keydownInput($event)").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-disabled","ngDisabled");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addClass("truncate").addAttribute("ng-click","clickLabel()");

                    var span = softtion.html("span").addClass("truncate").
                        addAttribute("ng-hide","hideSpan");
                
                    var buttonClear = softtion.html("i").
                        addClass(["material-icon", "clear"]).setText("close").
                        addAttribute("ng-hide","clearSuggestion").
                        addAttribute("ng-click","clearAutocomplet()");

                    var listAutocomplete = softtion.html("ul").
                        addComponent(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","option in suggestionsFilter").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-click","selectOption(option)").
                                addAttribute("ng-keydown","keydownOption($event, option)").
                                addAttribute("ng-bind-html","renderOption(option)")
                        ).addComponent(
                            softtion.html("li").addClass(["truncate","not-found"]).
                                addAttribute("ng-if","notFoundResult()").
                                setText("{{descriptionNotFoundResult()}}")
                        );

                    return input + lineShadow + label + span + buttonClear + listAutocomplete;
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.AutoComplete.route,
                        scope: {
                            optionSelect: "=ngModel",
                            required: "=required",
                            filter: "@filter",
                            label: "@label",
                            ngDisabled: "=ngDisabled",
                            suggestions: "=suggestions"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), list = $element.find("ul");
                                
                            // Atributos de control
                            var filterDefined = softtion.is("string", $scope.filter),
                                focusLi = false, searchStart = false;

                            $scope.suggestionsFilter = []; $scope.clearSuggestion = true;

                            $scope.clickLabel = function () { input.focus(); };

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.keyupInput = function (ev) {
                                if ([13, 27, 35, 36, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) { 
                                    return;
                                } // Estos caracteres no mejoran el patrón de busqueda
                                
                                if (!softtion.is("string", $scope.valueInput)) {
                                    return;
                                } // No hay nada digitado en el Componente de texto
                                
                                var suggestionsFilter = [],
                                    filter = $scope.valueInput.toLowerCase(); 
                                    searchStart = true;
                               
                                angular.forEach($scope.suggestions, function (suggestion) {
                                    if (typeof suggestion === "string") {
                                        if (~suggestion.toLowerCase().indexOf(filter)) { 
                                            suggestionsFilter.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    } else {
                                        var $value = !(filterDefined) ? suggestion.toString() :
                                            softtion.findKey(suggestion, $scope.filter);

                                        if (~$value.toLowerCase().indexOf(filter)) { 
                                            suggestion["labelAutoComplete"] = $value;
                                            suggestionsFilter.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    }
                                });

                                $scope.suggestionsFilter = suggestionsFilter;

                                if (!list.hasClass("active")) { list.addClass("active"); }
                            };

                            $scope.keydownInput = function (ev) {
                                switch (ev.keyCode) {
                                    case (27): // ESC
                                        if (list.hasClass("active")) { list.removeClass("active"); }
                                    break;

                                    case (40): // FLECHA ABAJO
                                        var options = list.find('li'); // Lista de opciones

                                        if (options.length) { 
                                            focusLi = true; options.first().focus(); 
                                        } // Seleccionando primer elemento
                                    break;
                                }
                            };

                            $scope.keydownOption = function (ev, option) {
                                switch (ev.keyCode) {
                                    case (13): // ENTER
                                        this.selectOption(option);
                                    break;

                                    case (27): // ESC
                                        list.removeClass("active");
                                    break;

                                    case (38): // FLECHA ARRIBA
                                        var $option = angular.element(ev.currentTarget);
                                        ($option.prev().length) ? $option.prev().focus() : input.focus();
                                    break;

                                    case (40): // FLECHA ABAJO
                                        var $option = angular.element(ev.currentTarget);
                                        if ($option.next().length) { $option.next().focus(); }
                                    break;
                                }
                            };

                            $scope.blurInput = function () {
                                if (focusLi) {
                                    focusLi = false; // Se ha enfocado Lista
                                } else {
                                    if (softtion.is("undefined", $scope.optionSelect)
                                        && !softtion.is("string", $scope.valueInput)) {
                                        $element.removeClass("active");
                                    } // No ha seleccionado, ni digitado en el Componente
                                    
                                    list.removeClass("active"); 
                                }
                            };

                            $scope.selectOption = function (option) {
                                $scope.optionSelect = option; $scope.clearSuggestion = false;

                                if (typeof option === "string") {
                                    $scope.valueInput = option;
                                } else {
                                    $scope.valueInput = (!(filterDefined) ? option.toString() :
                                        softtion.findKey(option, $scope.filter));
                                }

                                list.removeClass("active"); // Ocultando lista
                            };

                            $scope.renderOption = function (option) {
                                // Texto a mostrar en la lista
                                var $value = option.labelAutoComplete || option;

                                // Valor digitado para filtrar
                                var $filter = $scope.valueInput.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                                // Expresión RegExp
                                var $expReg = new RegExp("(" + $filter.split(' ').join('|') + ")", "gi");

                                return $value.replace($expReg, "<b>$1</b>"); // Valor final
                            };

                            $scope.notFoundResult = function () {
                                if (this.suggestionsFilter.length === 0) {
                                    return (searchStart && softtion.is("string", $scope.valueInput));
                                } else { return false; }
                            };

                            $scope.descriptionNotFoundResult = function () {
                                return '"' + $scope.valueInput + '", no existen resultados.';
                            };
                            
                            $scope.clearAutocomplet = function () {
                                $scope.optionSelect = undefined; $scope.valueInput = "";
                                $scope.clearSuggestion = true; $element.removeClass("active");
                            };
                        }
                    };
                }
            },
            
            BottomNavigation: {
                name: "bottomNavigation",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            body: "@body"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var rippleBox = $element.find(".ripple-box"),
                                options = $element.find(".tab > li"),
                                optionActive = $element.find(".tab > li.active:first"), 
                                fab = angular.element("button.floating"),
                                body = angular.element($scope.body),
                                $window = angular.element(window), snackbar;
                        
                            // Atributos
                            var classColor = "default", position = 0, classHide = "hide";
                            
                            if (fab.exists()) {
                                fab.addClass("show-bottom-navigation");
                            } // Cambiando posición original
                            
                            options.attr("tab-index","-1"); // Haciendo enfocables
                            options.removeClass("active");  // Desactivando opciones
                            
                            if (!optionActive.exists()) {
                                optionActive = angular.element(options[0]);
                            } // Se establece como activo primero de lista
                            
                            optionActive.addClass("active");
                            
                            switch (options.length) {
                                case (3): $element.addClass("three-options"); break;
                                case (4): $element.addClass("four-options"); break;
                                case (5): $element.addClass("five-options"); break; }
                                
                            if ($element.hasClass("shifting")) {
                                var classColorOption = optionActive.attr("color");
                                
                                if (softtion.is("string", classColorOption)) {
                                    classColor = classColorOption;
                                } // La opción tiene un color establecido
                                
                                $element.addClass(classColor); // Color
                            } // Se debe establecer color base del componente
                                
                            options.click(function () {
                                var option = angular.element(this); // Opción activada
                                
                                if (option.hasClass("active")) {
                                    return;
                                } // La opción es la actualmente activa
                                
                                options.removeClass("active"); option.addClass("active");
                                
                                var bodyView = body.find(option.attr("tab"));
                                
                                if (bodyView.exists() && !bodyView.hasClass("active")) {
                                    angular.element(window).scrollTop(0); 
                                    var bodyActive = body.find(".content.active");
                                    
                                    if (bodyActive.exists()) {
                                        bodyActive.removeClass("opacity").removeClass("active");
                                    } // Ocultando componente activo
                                    
                                    bodyView.addClass("active").removeClass("slide-in-left").
                                        removeClass("slide-in-right").addClass("opacity-bottom");
                                } // Componente exite y esta oculto
                                
                                var effect = rippleBox.find(".effect"); 
                                rippleBox.addClass("show"); // Visualizando el ripple
                                
                                if (rippleBox.hasClass("animated")) {
                                    rippleBox.removeClass("animated");
                                } // Removiendo animación ripple
                                
                                var top = (option.height() / 2), left = option.offset().left; 
                                    left += (option.outerWidth() / 2) - $element.offset().left;
                                    
                                if ($element.hasClass("shifting")) {
                                    var classColorOption = option.attr("color");
                                    
                                    $element.removeClass(classColor);
                                
                                    classColor = (softtion.is("string", classColorOption)) ? 
                                            classColorOption : "default";
                                
                                    $element.addClass(classColor); // Color
                                    
                                    effect.css({ top: top, left: left }); rippleBox.addClass("animated");
                                    setTimeout(function () { rippleBox.removeClass("animated").removeClass("show"); }, 525);
                                } else {
                                    effect.css({ top: top, left: left }); rippleBox.addClass("animated");
                                    setTimeout(function () { rippleBox.removeClass("animated").removeClass("show"); }, 325);
                                }// BottomNavigation permite cambio de Color
                            });
                            
                            $window.scroll(function () {
                                var positionNew = $window.scrollTop(); // Posicion actual
                                
                                if (softtion.is("undefined", snackbar) || !snackbar.exists()) {
                                    snackbar = angular.element(".snackbar");
                                } // No se ha encontrado Snackbar en el documento
                                
                                if (softtion.is("undefined", fab) || !fab.exists()) {
                                    fab = angular.element("button.floating");
                                } // No se ha encontrado Floating en el documento
                                                                
                                if (position < positionNew) {
                                    fab.removeClass("show-bottom-navigation");
                                    snackbar.removeClass("show-bottom-navigation");
                                    $element.addClass(classHide);
                                } else {
                                    fab.addClass("show-bottom-navigation");
                                    snackbar.addClass("show-bottom-navigation");
                                    $element.removeClass(classHide);
                                } // Se visualiza BottomNavigation oculto
                                
                                position = positionNew; // Posición nueva del scroll
                            });
                        }
                    };
                }
            },
            
            BottomSheet: {
                name: "bottomSheet",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var backdrop = $element.find(".backdrop"),
                                content = $element.find(".content");
                        
                            if (!backdrop.exists()) {
                                backdrop = angular.element(
                                    softtion.html("div").addClass("backdrop").create()
                                );
                        
                                $element.append(backdrop); // Agregando backdrop 
                            } // No existe backdrop
                            
                            var marginBottom = content.outerHeight();
                            content.css("margin-bottom", (marginBottom * -1) - 1);
                            
                            content.addClass("start"); // Componente inicializado
                        }
                    };
                }
            },
            
            Button: {
                name: "button",
                directive: function () {
                    return {
                        restrict: "E",
                        link: function ($scope, $element) {
                            var effectFocus = angular.element("<div class='focused'></div>"),
                                ripple = $element.find(".ripple-box");
                            
                            $element.focus(function () {
                                effectFocus.css("height", parseInt($element.css("width")) + "px");
                            });
                            
                            if ($element.hasClass("raised") || $element.hasClass("flat")) {
                                (ripple.exists()) ? 
                                    effectFocus.insertBefore(ripple) : $element.append(effectFocus);
                            } 
                        }
                    };
                }
            },
            
            CheckBox: {
                route: "softtion/template/checkbox.html",
                name: "checkbox",
                html: function () {
                    var $input = softtion.html("input", false).
                        addAttribute("type","checkbox").
                        addAttribute("ng-model","checked").
                        addAttribute("ng-disabled","ngDisabled");

                    var $label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel()");

                    var $focused = softtion.html("div").addClass("checkbox-focused");

                    return $input + $label + $focused; // Checkbox
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBox.route,
                        scope: {
                            checked: "=ngModel",
                            label: "@label",
                            ngDisabled: "=ngDisabled"
                        },
                        link: function ($scope, $element) {
                            var $input = $element.find("input");

                            $scope.clickLabel = function () { 
                                if (!$scope.ngDisabled) {
                                    $scope.checked = !$scope.checked; $input.focus(); 
                                } // No se permite el cambio de la Propiedad
                            };
                        }
                    };
                }
            },
            
            CheckBoxSelection: {
                route: "softtion/template/checkbox-selection.html",
                name: "checkboxSelection",
                html: function () {
                    var $input = softtion.html("input", false).
                        addAttribute("type","checkbox").
                        addAttribute("ng-model","checked").
                        addAttribute("ng-disabled","ngDisabled");

                    var $label = softtion.html("label").
                        addAttribute("ng-click","clickLabel($event)");

                    return $input + $label; // CheckboxTable
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBoxSelection.route,
                        scope: {
                            checked: "=ngModel",
                            preventDefault: "=preventDefault",
                            stopPropagation: "=stopPropagation",
                            ngDisabled: "=ngDisabled"
                        },
                        link: function ($scope) {
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.checked = !$scope.checked; 
                                
                                if ($scope.stopPropagation) {
                                    $event.stopPropagation();
                                } // Se detendrá propagación de Evento
                            };
                        }
                    };
                }
            },
            
            ChipInput: {
                route: "softtion/template/chip-input.html",
                name: "chipInput",
                html: function () {
                    var chips = softtion.html("div").addClass("chip").
                        addAttribute("ng-repeat", "item in listValue").
                        setText("{{item}}").
                        addComponent(
                            softtion.html("div").addClass("close").
                                addComponent(
                                    softtion.html("i").addClass("material-icon").
                                        setText("close").
                                        addAttribute("ng-click", "removeItem($index)")
                                )
                        );
                    
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-click","clickInput($event)").
                        addAttribute("ng-keypress","keypressInput($event)").
                        addAttribute("ng-blur","blurInput($event)").
                        addAttribute("ng-focus","focusInput($event)").
                        addAttribute("ng-model","valueInput");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-click", "clickLabel($event)");

                    return chips + input + lineShadow + label; // Componente
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ChipInput.route,
                        scope: {
                            listValue: "=ngModel", 
                            label: "@label", 
                            clickEvent: "=clickEvent",
                            maxCountDefined: "=maxCount"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input");
                        
                            $scope.listValue = $scope.listValue || new Collection();
                            $scope.maxCount = $scope.maxCountDefined || -1;
                            
                            if ($scope.listValue.length > 0) { $element.addClass("active"); }
                            
                            $element.click(function (ev) { 
                                $element.removeClass("hide-input"); input.focus();
                                
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            });
                            
                            $scope.clickLabel = function (ev) {
                                $element.removeClass("hide-input"); input.focus();
                                
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickInput = function (ev) {
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.focusInput = function () { $element.addClass("active"); };
                            
                            $scope.blurInput = function () { 
                                if ($scope.listValue.length > 0) {
                                    $element.addClass("hide-input"); 
                                } else {
                                    $element.removeClass("active"); 
                                } // No tiene opciones escritas
                            };
                            
                            $scope.keypressInput = function (ev) {
                                if (ev.keyCode === 13) {
                                    if (!softtion.is("string", $scope.valueInput)) {
                                        return;
                                    } // No ha escrito nada en el Componente
                                    
                                    if ($scope.maxCount === $scope.listValue.length) {
                                        return;
                                    } // Ha alcanzado cntidad de items permitidos
                                    
                                    $scope.listValue.push($scope.valueInput); $scope.valueInput = undefined;
                                } // Se va agregar texto escrito en el componente
                            };
                            
                            $scope.removeItem = function (index) {
                                $scope.listValue.remove(index); // Removiendo
                            };
                        }
                    };
                }
                
            },
            
            Clockpicker: {
                route: "softtion/template/clockpicker.html",
                name: "clockpicker",
                html: function () {
                    var title = softtion.html("div").addClass("title").
                        addComponent(
                            softtion.html("div").addClass("time").
                                addComponent(
                                    softtion.html("div").addClass("am-pm").
                                        addComponent(
                                            softtion.html("div").addClass("am").setText("AM").
                                                addAttribute("ng-click","setZone(false)")
                                        ).
                                        addComponent(
                                            softtion.html("div").addClass("pm").setText("PM").
                                                addAttribute("ng-click","setZone(true)")
                                        )
                                ).addComponent(
                                    softtion.html("div").addClass("minute").setText(":{{leadingClock(minuteSelect)}}").
                                        addAttribute("ng-click","setSelection(false)")
                                ).addComponent(
                                    softtion.html("div").addClass(["hour"]).setText("{{hourSelect}}").
                                        addAttribute("ng-click","setSelection(true)")
                                )
                        );
                    
                    var content = softtion.html("div").addClass("content").
                        addComponent(
                            softtion.html("div").addClass("plate").
                                addComponent(
                                    softtion.html("div").addClass("canvas")
                                ).
                                addComponent(
                                    softtion.html("div").addClass(["hours"])
                                ).
                                addComponent(
                                    softtion.html("div").addClass("minutes")
                                )
                        );
                        
                    var footer = softtion.html("div").addClass("actions").
                        addComponent(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Ok").
                                addAttribute("ng-click","setTime()")
                        ).
                        addComponent(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Cancelar").
                                addAttribute("ng-click","cancel()")
                        );
                
                    return title + content + footer; // Reloj completo
                },
                createSvgElement: function (nameElement) {
                    return document.createElementNS("http://www.w3.org/2000/svg", nameElement);
                },
                paintSelector: function (canvas, attrs) {
                    var svg = Material.components.Clockpicker.createSvgElement("svg");
                    svg.setAttribute("class", "materialize-clock-svg");
                    svg.setAttribute("width", attrs.diameter);
                    svg.setAttribute("height", attrs.diameter);
                    
                    var g = Material.components.Clockpicker.createSvgElement("g");
                    g.setAttribute("transform", "translate(" + attrs.dialRadius + "," + attrs.dialRadius + ")");
                    
                    var bearing = Material.components.Clockpicker.createSvgElement("circle");
                    bearing.setAttribute("class", "bearing");
                    bearing.setAttribute("cx", 0);
                    bearing.setAttribute("cy", 0);
                    bearing.setAttribute("r", 3.0);
                    
                    var hand = Material.components.Clockpicker.createSvgElement("line");
                    hand.setAttribute("x1", 0); hand.setAttribute("y1", 0);
        
                    var bg = Material.components.Clockpicker.createSvgElement("circle");
                    bg.setAttribute("class", "bg"); bg.setAttribute("r", attrs.tickRadius);
                    
                    var fg = Material.components.Clockpicker.createSvgElement("circle");
                    fg.setAttribute("class", "fg"); fg.setAttribute("r", 3.5);
                    
                    g.appendChild(hand); g.appendChild(bg); g.appendChild(fg); 
                    g.appendChild(bearing); svg.appendChild(g); canvas.append(svg);
                    
                    return {
                        hand: hand, g: g, bg: bg, fg: fg, bearing: bearing, svg: svg
                    };
                },
                paintClock: function (hours, minutes, attrs) {
                    var tickHour = angular.element("<div class='tick'></div>");
    
                    for (var hour = 1; hour < 13; hour++) {
                        var tick = tickHour.clone(), radian = hour / 6 * Math.PI;
                        
                        tick.css({
                            left: attrs.dialRadius + Math.sin(radian) * attrs.radius - attrs.tickRadius,
                            top: attrs.dialRadius - Math.cos(radian) * attrs.radius - attrs.tickRadius
                        });
                        
                        tick.addClass("tick-" + hour); tick.html(hour); hours.append(tick);
                    } // Cargando horas del Reloj
                    
                    var tickMinute = angular.element("<div class='tick'></div>");
                    
                    for (var minute = 0; minute < 12; minute++) {
                        var tick = tickMinute.clone(), radian = minute / 6 * Math.PI;
                        
                        tick.css({
                            left: attrs.dialRadius + Math.sin(radian) * attrs.radius - attrs.tickRadius,
                            top: attrs.dialRadius - Math.cos(radian) * attrs.radius - attrs.tickRadius
                        });

                        tick.addClass("tick-" + (minute * 5)); tick.html(minute * 5); minutes.append(tick);
                    }
                },
                setHand: function (x, y, isHours, canvasComponent, attrs) {
                    var radian = Math.atan2(-x, y) + Math.PI,
                        unit = Math.PI / (isHours ? 6 : 30), value;

                    value = Math.round(radian / unit); radian = value * unit;

                    if (isHours) {
                        if (value === 0) { value = 12; }
                            canvasComponent.fg.style.visibility = 'hidden';
                    } else {
                        var isOnNum = (value % 5 === 0);
                        
                        if (isOnNum) {
                            canvasComponent.fg.style.visibility = 'hidden';
                        } else {
                            canvasComponent.fg.style.visibility = 'visible';
                        }
                        
                        if (value === 60) { value = 0; }
                    }

                    canvasComponent.g.insertBefore(canvasComponent.hand, canvasComponent.bearing);
                    canvasComponent.g.insertBefore(canvasComponent.bg, canvasComponent.fg);
                    canvasComponent.bg.setAttribute("class", "bg");

                    // Set clock hand and others' position
                    var cx = Math.sin(radian) * attrs.radius,
                        cy = -Math.cos(radian) * attrs.radius;

                    canvasComponent.hand.setAttribute("x2", Math.sin(radian) * (attrs.radius - attrs.tickRadius));
                    canvasComponent.hand.setAttribute("y2", -Math.cos(radian) * (attrs.radius - attrs.tickRadius));
                    canvasComponent.bg.setAttribute("cx", cx);
                    canvasComponent.bg.setAttribute("cy", cy);
                    canvasComponent.fg.setAttribute("cx", cx);
                    canvasComponent.fg.setAttribute("cy", cy);

                    return value; // Retornando el valor seleccionado
                },
                getPosition: function (value, isHours, attrs) {
                    var unit = Math.PI / (isHours ? 6 : 30), radian = value * unit;
                    
                    return {
                        x: Math.sin(radian) * attrs.radius, y: -Math.cos(radian) * attrs.radius
                    };
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Clockpicker.route,
                        scope: {
                            time: "=ngModel", 
                            setTimeSelect: "=timeSelect",
                            cancelSelect: "=cancelSelect"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var title = $element.find(".title"),
                                am = title.find(".am-pm > .am"),
                                pm = title.find(".am-pm > .pm"),
                                hour = title.find(".time > .hour"),
                                minute = title.find(".time > .minute"),
                                
                                content = $element.find(".content"),
                                plate = content.find(".plate"),
                                canvas = plate.find(".canvas"),
                                hours = plate.find(".hours"),
                                minutes = plate.find(".minutes");
                            
                            // Atributos
                            var isPM = false, isHours = true, canvasComponent,
                                touchSupported = "ontouchstart" in window,
                                attributes = {
                                    dialRadius: 116, 
                                    radius: 96,
                                    diameter: 232,
                                    duration: 350,
                                    tickRadius: 14
                                };
                            
                            Material.components.Clockpicker.paintClock(hours, minutes, attributes);
                            canvasComponent = Material.components.Clockpicker.paintSelector(canvas, attributes);
                            
                            // Propiedades del scope
                            $scope.setZone = function (zone) {
                                if (zone) {
                                    am.removeClass("active"); pm.addClass("active");
                                } else {
                                    pm.removeClass("active"); am.addClass("active");
                                } // Zona horaria definida es "AM"
                                    
                                isPM = zone; // Definiendo zona horaria
                            };
                            
                            $scope.setSelection = function (selection) {
                                isHours = selection; // Definiendo tipo de selección
                                
                                if (isHours) {
                                    minute.removeClass("active"); hour.addClass("active");
                                    minutes.removeClass("active"); hours.addClass("active");
                                } else {
                                    hour.removeClass("active"); minute.addClass("active");
                                    hours.removeClass("active"); minutes.addClass("active");
                                } // Tipo de selección para minutos
                                    
                                var position = Material.components.Clockpicker.getPosition(
                                    (isHours) ? $scope.hourSelect : $scope.minuteSelect, isHours, attributes
                                );
                        
                                Material.components.Clockpicker.setHand(
                                    position.x, position.y, isHours, canvasComponent, attributes
                                );
                            };
                            
                            $scope.leadingClock = function (value) {
                                return ((value < 10) ? "0" : "") + value;
                            };
                            
                            $scope.setTime = function () {
                                var hour = (isPM) ?
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect + 12) : $scope.hourSelect :
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect) : 0;
                                
                                $scope.time.setHours(hour); $scope.time.setMinutes($scope.minuteSelect);
                                
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.is("function", $scope.setTimeSelect)) {
                                    $scope.setTimeSelect($scope.time);
                                } // Función que se llama cuando se selecciona Fecha
                            };
                            
                            $scope.cancel = function () {
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.is("function", $scope.cancelSelect)) {
                                    $scope.cancelSelect($scope.time);
                                } // Función que se llama cuando se cancela Selección
                            };
                            
                            $scope.time = $scope.time || new Date();
                            
                            $scope.hourSelect = ($scope.time.getHours() === 0) ?
                                12 : ($scope.time.getHours() > 12) ? 
                                $scope.time.getHours() - 12 : $scope.time.getHours();
                            
                            $scope.minuteSelect = $scope.time.getMinutes();
                            
                            $scope.setZone(($scope.time.getHours() > 11)); $scope.setSelection(true);
                            hours.find(".tick-" + $scope.hourSelect).addClass("active");
                            minutes.find(".tick-" + $scope.minuteSelect).addClass("active");
                            
                            plate.on("mousedown", function (ev) {
                                var offset = plate.offset(), isTouch = /^touch/.test(ev.type),
                                    startX = offset.left + attributes.dialRadius,
                                    startY = offset.top + attributes.dialRadius,
                                    positionX = (isTouch ? ev.originalEvent.touches[0] : ev).pageX - startX,
                                    positionY = (isTouch ? ev.originalEvent.touches[0] : ev).pageY - startY,
                                    circle = Math.sqrt(positionX * positionX + positionY * positionY);

                                    if (circle < attributes.radius - attributes.tickRadius || 
                                        circle > attributes.radius + attributes.tickRadius) {
                                            return;
                                    } // No se presiona click sobre componente que definen hora o minutos
                                    
                                ev.preventDefault();
                                
                                var value = Material.components.Clockpicker.setHand(
                                    positionX, positionY, isHours, canvasComponent, attributes
                                );
                        
                                if (isHours) {
                                    $scope.hourSelect = value; // Hora seleccionada
                                    hours.find(".tick").removeClass("active");
                                    hours.find(".tick-" + value).addClass("active");
                                    
                                    $scope.setSelection(false); // Minutos
                                } else {
                                    $scope.minuteSelect = value;// Minuto seleccionado
                                    minutes.find(".tick").removeClass("active");
                                    minutes.find(".tick-" + value).addClass("active");
                                }
                            });
                        }
                    };
                }
            },
            
            ClockpickerInput: {
                route: "softtion/template/clockpicker-input.html",
                name: "clockpickerInput",
                html: function () {
                    var input = softtion.html("div").addClass(["textfield-readonly", "low"]).
                        addAttribute("label","{{label}}").
                        addAttribute("ng-model","text").
                        addAttribute("click-event","clickEvent");
                    
                    var dialog = softtion.html("div").addClass("dialog").
                        addComponent(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addComponent(
                            softtion.html("div").addClass("box").
                                addComponent(
                                    softtion.html("div").addClass("clockpicker").
                                        addAttribute("ng-model","timePicker").
                                        addAttribute("time-select","timeSelect").
                                        addAttribute("cancel-select","cancelSelect")

                                )
                        );
                
                    return input + dialog;
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ClockpickerInput.route,
                        scope: {
                            label: "@label",
                            time: "=ngModel",
                            autoStart: "=autoStart"
                        },
                        controller: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                box = dialog.find(".box"),
                                backdrop = dialog.find(".backdrop");
                            
                            if (softtion.is("date", $scope.time)) {
                                $scope.text = $scope.time.getFormat("hz:ii zz");
                            } else if ($scope.autoStart) {
                                $scope.time = new Date(); // Tiempo del dispositivo
                                $scope.text = $scope.time.getFormat("hz:ii zz");
                            }
                            
                            // Open Dialog-Clock
                            $scope.clickEvent = function () {
                                box.addClass("show"); dialog.addClass("active"); backdrop.fadeIn(175); 
                                angular.element(document.body).addClass("body-overflow-none");
                            };
                            
                            // Close Dialog-Clock
                            $scope.cancelSelect = function () {
                                box.removeClass("show"); dialog.removeClass("active"); backdrop.fadeOut(175); 
                                angular.element(document.body).removeClass("body-overflow-none");
                            };
                            
                            $scope.timeSelect = function (time) {
                                $scope.time = time; $scope.text = time.getFormat("hz:ii zz"); 
                                box.removeClass("show"); dialog.removeClass("active"); backdrop.fadeOut(175);
                                angular.element(document.body).removeClass("body-overflow-none");
                            };
                        }
                    };
                }
            },
            
            DataTable: {
                name: "datatable",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            selectMultiple: "=selectMultiple",
                            list: "=ngModel",
                            selection: "=selection",
                            selectAll: "=selectAll",
                            clickSelectAll: "=clickSelectAll",
                            clickSelect: "=clickSelect",
                            countSelect: "=countSelect"
                        },
                        link: function ($scope, $element) {
                            var selectedSimple = undefined; // Objeto seleccionado
                        
                            $scope.selection = $scope.selection || {};
                            
                            $scope.clickSelectAll = function () {
                                if ($scope.selectMultiple) {
                                    if (!$scope.selectAll) {
                                        $element.find("tbody tr.active").removeClass("active");
                                        $scope.selection = {}; $element.removeClass("selected"); 
                                        $scope.countSelect = 0; // No existen filas seleccionadas
                                        
                                        angular.forEach($scope.list, 
                                            function (object) { object.checked = false; }
                                        );
                                    } else {
                                        $element.find("tbody tr").addClass("active"); // Activando filas
                                        
                                        angular.forEach($scope.list, function (object, key) {
                                            $scope.selection[key] = object; object.checked = true;
                                        });
                                        
                                        $scope.countSelect = $scope.list.length; $element.addClass("selected"); 
                                    }
                                } else {
                                    $scope.selectAll = false;
                                } // No se permite la selección multiple
                            };
                            
                            $scope.clickSelect = function (object, $index, $event) {
                                object.checked = !object.checked;
                                
                                var row = angular.element($event.currentTarget); 
                                
                                if ($scope.selectMultiple) {
                                    row.toggleClass("active"); // Cambiando estado
                                    
                                    if (object.checked) {
                                        $scope.selection[$index] = object;
                                    } else {
                                        softtion.removeKey($scope.selection, $index);
                                    } // Ya estaba seleccionado la fila
                                } else {
                                    if (object.checked) {
                                        row.siblings("tr").removeClass("active"); row.addClass("active"); 
                                        $scope.selection = {}; $scope.selection[$index] = object;
                                        
                                        if (softtion.is("defined", selectedSimple)) {
                                            selectedSimple.checked = false; selectedSimple = object;
                                        } else { selectedSimple = object; }
                                    } else {
                                        $scope.selection = {}; row.removeClass("active"); 
                                        selectedSimple = undefined; // Sin objeto seleccionado
                                    } // Ya estaba seleccionado la fila
                                }
                                
                                $scope.countSelect = Object.keys($scope.selection).length;
                                
                                ($scope.countSelect > 0) ?
                                    $element.addClass("selected") : $element.removeClass("selected");
                                
                                $scope.selectAll = $scope.countSelect === $scope.list.length;
                            };
                        }
                    };
                }
            },
            
            Datepicker: {
                route: "softtion/template/datepicker.html",
                name: "datepicker",
                html: function() {
                    var title = softtion.html("div").addClass("title").
                        addComponent(
                            softtion.html("div").addClass("year").
                                setText("{{year}}").
                                addAttribute("ng-class","{active : enabledSelectYear}").
                                addAttribute("ng-click","activeYear(true)")
                        ).
                        addComponent(
                            softtion.html("div").addClass("day").
                                setText("{{describeDaySelect()}}").
                                addAttribute("ng-class","{active : !enabledSelectYear}").
                                addAttribute("ng-click","activeDay()")
                        );
                
                    var content = softtion.html("div").addClass("content").
                        addComponent(
                            softtion.html("div").addClass("month").
                                addAttribute("ng-hide","(enabledSelectYear || enabledSelectMonth)").
                                addComponent(
                                    softtion.html("div").addClass("button-left").
                                        addAttribute("ng-class", "{disabled: prevMonthEnabled()}").
                                        addAttribute("ng-click", "changedMonth(false)").
                                        addComponent(
                                            softtion.html("i").addClass("material-icon").
                                                setText("chevron_left")
                                        )
                                ).
                                addComponent(
                                    softtion.html("div").addClass("button-right").
                                        addAttribute("ng-class", "{disabled: nextMonthEnabled()}").
                                        addAttribute("ng-click", "changedMonth(true)").
                                        addComponent(
                                            softtion.html("i").addClass("material-icon").
                                                setText("chevron_right")
                                        )
                                ).
                                addComponent(
                                    softtion.html("div").addClass("name").
                                        addAttribute("ng-click", "activeMonth(true)").
                                        setText("{{monthText}}")
                                )
                        ).
                        addComponent(
                            softtion.html("table").addClass(["days-month", "animate", "easing-out"]).
                                addAttribute("ng-hide","(enabledSelectYear || enabledSelectMonth)").
                                addComponent(
                                    softtion.html("thead").append("<th>Do</th>").
                                        append("<th>Lu</th>").append("<th>Ma</th>").
                                        append("<th>Mi</th>").append("<th>Ju</th>").
                                        append("<th>Vi</th>").append("<th>Sa</th>")
                                ).addComponent(
                                    softtion.html("tbody").
                                        addComponent(
                                            softtion.html("tr").addClass("week").
                                                addAttribute("ng-repeat", "week in daysMonth").
                                                addComponent(
                                                    softtion.html("td").addClass("day").
                                                        addAttribute("ng-class","{disabled : dayDisabled(day.value)}").
                                                        addAttribute("ng-repeat", "day in week").
                                                        addAttribute("ng-click", "selectDay(day.value, $event)").
                                                        setText("{{day.value}}")
                                                )
                                        )
                                )
                        ).
                        addComponent(
                            softtion.html("div").addClass("months").addAttribute("ng-hide","!enabledSelectMonth").
                                addComponent(
                                    softtion.html("ul").
                                        addComponent(
                                            softtion.html("li").
                                                addAttribute("ng-repeat","month in months").
                                                setText("{{month.name}}").
                                                addAttribute("ng-click","selectMonth(month.value)").
                                                addAttribute("ng-class",
                                                    "{active : isMonthActive(month.value), disabled: monthListEnabled(month.value) }"
                                                )
                                        )
                                )
                        ).
                        addComponent(
                            softtion.html("div").addClass("year").addAttribute("ng-hide","!enabledSelectYear").
                                addComponent(
                                    softtion.html("ul").
                                        addComponent(
                                            softtion.html("li").
                                                addAttribute("ng-repeat","year in years").
                                                setText("{{year}}").
                                                addAttribute("ng-click","selectYear(year)").
                                                addAttribute("ng-class","{active : isYearActive(year)}")
                                        )
                                )
                        );
                        
                    var actions = softtion.html("div").addClass("actions").
                        addComponent(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Ok").
                                addAttribute("ng-click","setDate()")
                        ).
                        addComponent(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Cancelar").
                                addAttribute("ng-click","cancel()")
                        );
                
                    return title + content + actions; // Retornando componente
                }, 
                createCalendar: function (year, month, dayWeekStart, daysOfMonth) {
                    var countDay = 1; // Contador de dias

                    if (month === 1 && softtion.isLeapYear(year)) {
                        daysOfMonth++;
                    } // El mes es Febrero y el año es biciesto

                    var calendarMonth = [], firstWeek = [];

                    for (var i = 0; i < dayWeekStart; i++) {
                        firstWeek.push({value: null});
                    } // Cargando dias en blanco del Calendario

                    for (var i = dayWeekStart; i < 7; i++) {
                        firstWeek.push({value: countDay}); countDay++;
                    } // Cargando dias hábiles, Primera Semana

                    calendarMonth.push(firstWeek); // Primera semana
                    
                    var stop = false, week = [], countDaysWeek = 1;
                    
                    while (!stop) {
                        week.push({value: countDay}); countDay++; countDaysWeek++;
                        
                        if (countDaysWeek > 7) {
                            countDaysWeek = 1; calendarMonth.push(week); week = [];
                        } // Se insertaron los 7 dias de la semana
                        
                        stop = (countDay > daysOfMonth); // Verificando
                    }
                    
                    if (!softtion.is("arrayEmpty", week)) {
                        calendarMonth.push(week);
                    } // Agregando semana pendiente por completar

                    return calendarMonth; // Retornando calendario
                },
                createYears: function (year, minDate, maxDate, yearRange) {
                    var yearsPrev = [], yearsNext = [], years = [],
                        yearMax = (maxDate) ? maxDate.getFullYear() : 10000,
                        yearMin = (minDate) ? minDate.getFullYear() : 0;
                    
                    for (var count = 1; count <= yearRange; count++) {
                        var valueYearNext = year + count,
                            valueYearPrev = year - (yearRange + 1) + count;
                        
                        if (valueYearPrev >= yearMin) {
                            yearsPrev.push(valueYearPrev);
                        } // Año anterior permitido para selección
                        
                        if (valueYearNext <= yearMax) {
                            yearsNext.push(valueYearNext);
                        } // Año siguiente permitido para selección
                    }
                        
                    years = yearsPrev.concat([year]); years = years.concat(yearsNext);

                    return years; // Retornando años para la selección
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Datepicker.route,
                        scope: {
                            date: "=ngModel",
                            dateSelect: "=dateSelect",
                            cancelSelect: "=cancelSelect",
                            minDate: "=minDate",
                            maxDate: "=maxDate",
                            yearRange: "@yearRange"
                        },
                        link: function ($scope, $elememt) {
                            // Componentes
                            var table = $elememt.find(".content table.days-month"),
                                listYears = $elememt.find(".content .year"),
                                listMonths = $elememt.find(".content .months");
                            
                            // Atributos
                            var countDaysMonths = softtion.get(softtion.DAYS_OF_MONTHS),
                                dateDayStart = new Date().normalize("date"),
                                yearRange = ($scope.yearRange) ? parseInt($scope.yearRange) : 10,
                                nameDaysWeek = softtion.get(softtion.DAYS_OF_WEEK),
                                nameMonths = softtion.get(softtion.MONTHS_OF_YEAR),
                                nameMonthsMin = softtion.get(softtion.MONTHS_OF_YEAR_MIN),
                                createCalendar = Material.components.Datepicker.createCalendar,
                                createYears = Material.components.Datepicker.createYears,
                                fontSize = parseInt(angular.element(document.body).css("font-size"));
                        
                            $scope.date = new Date().normalize("date");
                            
                            $scope.year = $scope.date.getFullYear();
                            $scope.day = $scope.date.getDate();
                            $scope.month = $scope.date.getMonth();
                            $scope.enabledSelectYear = false;
                            $scope.enabledSelectMonth = false;
                            dateDayStart.setDate(1); // Primer dia del mes
                            
                            $scope.monthText = nameMonths[$scope.month];
                            
                            $scope.daysMonth = createCalendar(
                                $scope.year, 
                                $scope.month, 
                                dateDayStart.getDay(), 
                                countDaysMonths[$scope.month]
                            );
                    
                            $scope.months = [
                                { name: "Enero", value: 0 }, { name: "Febrero", value: 1 },
                                { name: "Marzo", value: 2 }, { name: "Abril", value: 3 },
                                { name: "Mayo", value: 4 }, { name: "Junio", value: 5 },
                                { name: "Julio", value: 6 }, { name: "Agosto", value: 7 },
                                { name: "Septiembre", value: 8 }, { name: "Octubre", value: 9 },
                                { name: "Noviembre", value: 10 }, { name: "Diciembre", value: 11 }
                            ];
                    
                            $scope.minDate = (softtion.is("date", $scope.minDate)) ?
                                $scope.minDate.normalize("date") : undefined;
                    
                            $scope.maxDate = (softtion.is("date", $scope.maxDate)) ?
                                $scope.maxDate.normalize("date") : undefined;
                            
                            // Eventos para controlar años
                            $scope.isYearActive = function (year) {
                                return ($scope.year === year);
                            };
                            
                            $scope.activeYear = function (enabled) {
                                $scope.enabledSelectYear = enabled; 
                                
                                if ($scope.enabledSelectYear) {
                                    $scope.years = createYears(
                                        $scope.year, $scope.minDate, $scope.maxDate, yearRange
                                    );
                            
                                    if ($scope.enabledSelectMonth) {
                                        $scope.activeMonth(false);
                                    } // Desactivando selección del mes
                                    
                                    var scroll = (yearRange - 3) * 2.5 * fontSize;
                                    listYears.animate({ scrollTop: scroll }, 100);
                                } // Esta desactivado selección de Año
                            };
                            
                            $scope.selectYear = function (year) {
                                if ($scope.year !== year) {
                                    $scope.year = year; dateDayStart.setYear($scope.year);
                                    var countDaysMonth = countDaysMonths[$scope.month];
                                    
                                    $scope.daysMonth = createCalendar($scope.year, $scope.month, dateDayStart.getDay(), countDaysMonth);
                                } // Cambio de año en el Componente
                                
                                $scope.activeYear(false); // Desactivando selección de Año
                            };
                             
                            // Eventos para controlar meses
                            $scope.prevMonthEnabled = function () {
                                if (softtion.is("defined", $scope.minDate)) {
                                    var month = $scope.month - 1, year = $scope.year;
                                    
                                    if (month < 0) { 
                                        month = 11; year--;
                                    } // Se paso para mes del año anterior
                                    
                                    if (year < $scope.minDate.getFullYear()) {
                                        return true;
                                    } else if (year === $scope.minDate.getFullYear()) {
                                        return (month < $scope.minDate.getMonth());
                                    } // El mes anterior esta fuera del rango
                                }
                                
                                return false; // Se puede retornar a la fecha Actual
                            };
                            
                            $scope.nextMonthEnabled = function () {
                                if (softtion.is("defined", $scope.maxDate)) {
                                    var month = $scope.month + 1, year = $scope.year;
                                    
                                    if (month > 12) { 
                                        month = 0; year++;
                                    } // Sobrepaso mes del año siguiente
                                    
                                    if (year > $scope.maxDate.getFullYear()) {
                                        return true;
                                    } else if (year === $scope.maxDate.getFullYear()) {
                                        return (month > $scope.maxDate.getMonth());
                                    } // El mes siguiente esta fuera del rango
                                }
                                
                                return false; // Se puede retornar a la fecha Actual
                            };
                            
                            $scope.activeMonth = function (enabled) {
                                $scope.enabledSelectMonth = enabled;
                                
                                if ($scope.enabledSelectMonth) {
                                    var scroll = ($scope.month - 2) * 2.5 * fontSize;
                                    listMonths.animate({ scrollTop: scroll }, 100);
                                } // Se activo selección de Mes
                            };
                            
                            $scope.monthListEnabled = function (month) {
                                if (softtion.is("undefined", $scope.minDate) &&
                                    softtion.is("undefined", $scope.maxDate)) {
                                    return false;
                                } // Se permite todos los meses
                                
                                if (softtion.is("defined", $scope.minDate)) {
                                    var minYear = $scope.minDate.getFullYear(),
                                        minMonth = $scope.minDate.getMonth();
                                    
                                    if (minYear > $scope.year) {
                                        return true;
                                    } else if (minYear === $scope.year) {
                                        return (minMonth > month);
                                    }
                                } // Comparando con la fecha mínima
                                
                                if (softtion.is("defined", $scope.maxDate)) {
                                    var maxYear = $scope.maxDate.getFullYear(),
                                        maxMonth = $scope.maxDate.getMonth();
                                    
                                    if (maxYear < $scope.year) {
                                        return true;
                                    } else if (maxYear === $scope.year) {
                                        return (maxMonth < month);
                                    }
                                } // Comparando con la fecha mínima
                                
                                return false; // Mes permitido para selección
                            };
                            
                            $scope.isMonthActive = function (month) {
                                return ($scope.month === month);
                            };
                            
                            $scope.changedMonth = function (event) {
                                if (event) {
                                    $scope.month++; // Aumentado el mes
                                    table.addClass("slide-in-right");
                                    
                                    if ($scope.month > 11) {
                                        $scope.month = 0; $scope.year++;
                                        dateDayStart.setYear($scope.year);
                                    } // Ha superado el año actual
                                } else {
                                    $scope.month--; // Aumentado el mes
                                    table.addClass("slide-in-left");
                                    
                                    if ($scope.month < 0) {
                                        $scope.month = 11; $scope.year--;
                                        dateDayStart.setYear($scope.year);
                                    } // Ha regresado el año actual
                                } // Se decrementa el calendario
                                
                                setTimeout(function () {
                                    table.removeClass("slide-in-right").removeClass("slide-in-left");
                                }, 300);
                                
                                dateDayStart.setMonth($scope.month); // Mes seleccionado
                                $scope.monthText = nameMonths[$scope.month];
                                var countDaysMonth = countDaysMonths[$scope.month];
                                
                                $scope.daysMonth = createCalendar($scope.year, $scope.month, dateDayStart.getDay(), countDaysMonth);
                            };
                            
                            $scope.selectMonth = function (month) {
                                if ($scope.month !== month) {
                                    $scope.month = month; dateDayStart.setMonth($scope.month);
                                    $scope.monthText = nameMonths[$scope.month];
                                    var countDaysMonth = countDaysMonths[$scope.month];
                                    
                                    $scope.daysMonth = createCalendar($scope.year, $scope.month, dateDayStart.getDay(), countDaysMonth);
                                } // Cambio de año en el Componente
                                
                                $scope.activeMonth(false); // Desactivando selección del Mes
                            };
                            
                            // Eventos para controlar dias
                            $scope.describeDaySelect = function () {
                                var dateDescribe = (softtion.is("date", $scope.date)) ?
                                    $scope.date : new Date().normalize("date");
                                
                                var describe = nameDaysWeek[dateDescribe.getDay()];
                                describe += ", " + nameMonthsMin[dateDescribe.getMonth()];
                                describe += " " + dateDescribe.getDate();
                                describe += " del " + dateDescribe.getFullYear();
                                
                                return describe; // Retorna descripción de Fecha
                            };
                            
                            $scope.dayDisabled = function (day) {
                                if (softtion.is("undefined", day)) {
                                    return true;
                                } // El dia del componente es inválido
                                
                                if (softtion.is("undefined", $scope.minDate) && 
                                    softtion.is("undefined", $scope.maxDate)) {
                                    return false;
                                } // Todos los dias están permitidos en el Componente
                                
                                var date = new Date($scope.year, $scope.month, day);                                
                                
                                if (date.getTime() < $scope.minDate.getTime()) {
                                    return true; 
                                } // La fecha es menor a la establecida
                                
                                if (date.getTime() > $scope.maxDate.getTime()) {
                                    return true; 
                                } // La fecha es mayor a la establecida
                                
                                return false; // El día es permitido para Selección
                            };
                            
                            $scope.activeDay = function () {
                                $scope.activeMonth(false); $scope.activeYear(false);
                            };
                            
                            $scope.selectDay = function (day, $event) {
                                var dayElement = angular.element($event.currentTarget);
                                
                                dayElement.parents("tbody").find(".day").removeClass("active");
                                dayElement.addClass("active"); $scope.day = day;
                            };
                            
                            // Eventos para controlar fecha final
                            $scope.setDate = function () {
                                $scope.date = new Date($scope.year, $scope.month, $scope.day);
                                
                                if (softtion.is("function", $scope.dateSelect)) {
                                    $scope.dateSelect($scope.date);
                                } // Se ha establecido metodo para seleccionar Fecha
                            };
                            
                            $scope.cancel = function () {
                                if (softtion.is("function", $scope.cancelSelect)) {
                                    $scope.cancelSelect($scope.date);
                                } // Se ha establecido metodo para cancelar Selección
                            };
                        }
                    };
                }
            },
            
            DatepickerInput: {
                route: "softtion/template/datepicker-input.html",
                name: "datepickerInput",
                html: function () {
                    var input = softtion.html("div").addClass(["textfield-readonly", "low"]).
                        addAttribute("label","{{label}}").
                        addAttribute("ng-model","text").
                        addAttribute("click-event","clickEvent");
                    
                    var dialog = softtion.html("div").addClass("dialog").
                        addComponent(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addComponent(
                            softtion.html("div").addClass("box").
                                addComponent(
                                    softtion.html("div").addClass("datepicker").
                                        addAttribute("ng-model","datePicker").
                                        addAttribute("date-select","dateSelect").
                                        addAttribute("cancel-select","cancelSelect").
                                        addAttribute("min-date","minDate").
                                        addAttribute("max-date","maxDate").
                                        addAttribute("year-range","{{yearRange}}")
                                )
                        );
                
                    return input + dialog; // Creando componente dialog
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.DatepickerInput.route,
                        scope: {
                            label: "@label",
                            date: "=ngModel",
                            autoStart: "=autoStart",
                            minDate: "=minDate",
                            maxDate: "=maxDate",
                            yearRange: "@yearRange"
                        },
                        link: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                box = dialog.find(".box"),
                                backdrop = dialog.find(".backdrop");
                            
                            if (softtion.is("date", $scope.date)) {
                                $scope.text = $scope.date.getFormat("ww, dd del mn de aa");
                            } else if ($scope.autoStart) {
                                $scope.date = new Date(); // Tiempo del dispositivo
                                $scope.text = $scope.date.getFormat("ww, dd del mn de aa");
                            }
                            
                            // Open Dialog-Date
                            $scope.clickEvent = function () {
                                box.addClass("show"); dialog.addClass("active"); backdrop.fadeIn(175); 
                                angular.element(document.body).addClass("body-overflow-none");
                            };
                            
                            // Close Dialog-Date
                            $scope.cancelSelect = function () {
                                box.removeClass("show"); dialog.removeClass("active"); backdrop.fadeOut(175); 
                                angular.element(document.body).removeClass("body-overflow-none");
                            };
                            
                            $scope.dateSelect = function (date) {
                                $scope.date = date; $scope.text = date.getFormat("ww, dd del mn de aa"); 
                                box.removeClass("show"); dialog.removeClass("active"); backdrop.fadeOut(175);
                                angular.element(document.body).removeClass("body-overflow-none");
                            };
                        }
                    };
                }
            },
            
            ExpansionPanel: {
                name: "expansionPanel",
                icon: function () {
                    return softtion.html("i").addClass(["material-icon"]).setText("expand_more").create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var panelHeader = $element.find(".header"),
                                panelBody = $element.find(".body");
                            
                            if (panelBody.exists()) {
                                var content = panelBody.find(".content"),
                                    icon = angular.element(Material.components.ExpansionPanel.icon());
                                
                                panelHeader.append(icon); // Agregando icono al Header

                                panelHeader.click(function () {
                                    var marginTop = (-1 * content.innerHeight()),
                                        bodyStart = panelBody.hasClass("start");
                                    
                                    if (!bodyStart) {
                                        content.css("margin-top", marginTop); panelBody.addClass("start");
                                    } // Componente no se encuentra iniciado
                                    
                                    $element.siblings("li").removeClass("active");
                                    $element.siblings("li").find("i").html("expand_more");
                                    $element.toggleClass("active"); // Cambiando estado

                                    if ($element.hasClass("active")) {
                                        icon.html("expand_less");
                                    } else {
                                        icon.html("expand_more"); content.css("margin-top", marginTop);
                                    } // Cerrando content del Expansion
                                });
                            } // El componente no tiene contenedor
                        }
                    };
                }
            },
            
            ItemList: {
                name: "itemList",
                icon: function () {
                    return softtion.html("i").addClass(["material-icon"]).setText("expand_more").create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            // Componentes
                            var options = $element.find(".options");
                            
                            if (options.exists()) {
                                var ul = options.find("ul"), // Lista del submenu
                                    icon = angular.element(Material.components.ItemList.icon());
                                
                                ul.css("margin-top", (ul[0].clientHeight * -1));
                                $element.find(".detail").append(icon); // Agregando icono

                                $element.find(".content").click(function () {
                                    var marginTop = (-1 * ul.innerHeight()), 
                                        isStart = options.hasClass("start");
                                    
                                    if (!isStart) {
                                        ul.css("margin-top", marginTop); options.addClass("start");
                                    } // Componente no se encuentra iniciado
                                    
                                    $element.toggleClass("active"); // Cambiando estado

                                    if ($element.hasClass("active")) {
                                        icon.html("expand_less");
                                    } else {
                                        icon.html("expand_more"); ul.css("margin-top", (-1 * ul.innerHeight()));
                                    } // Cerrando content del Expansion
                                });
                            } // El item contiene opciones
                        }
                    };
                }
            },
            
            MediaArea: {
                name: "mediaArea",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var img = $element.find("img"); // Imagen de la Media
                            
                            if (img.exists()) {
                                var density = img[0].height / img[0].width;
                                
                                (density >= 1)  ? // Ancho es mayor igual a alto
                                    img.css("width", "100%") : img.css("height", "100%");                            }
                        }
                    };
                }
            },
            
            ProgressCircular: {
                route: "softtion/template/progress-circular.html",
                name: "progressCircular",
                html: function () {
                    return softtion.html("svg").addAttribute("viewBox","0 0 66 66").
                        addComponent(softtion.html("circle")).create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ProgressCircular.route,
                        link: function ($scope, $element) { }
                    };
                }
            },
            
            Ripple: {
                name: "ripple",
                box: function () {
                    return softtion.html("div").addClass("ripple-box").create();
                },
                effect: function () {
                    return softtion.html("span").addClass("effect").create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var box = angular.element(Material.components.Ripple.box()),
                                effect = angular.element(Material.components.Ripple.effect());
                        
                            box.append(effect); $element.append(box);
                            
                            box.click(function (ev) {
                                if (box.parent().is(":disabled")) { return; }
                                
                                if (box.hasClass("animated")) {
                                    box.removeClass("animated");
                                } // Removiendo la clase para animar
                                
                                var left = ev.pageX - box.offset().left, 
                                    top = ev.pageY - box.offset().top;
                                
                                effect.css({ top: top, left: left }); box.addClass("animated"); 
                            });
                        }
                    };
                }
            },
            
            SearchBox: {
                name: "searchBox",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            angular.element(".app-content").css("margin-top", 64);
                            
                            var $window = angular.element(window),
                                position = 0, classHide = "hide";
                            
                            if (!$element.hasClass("offscreen")) {
                                $window.scroll(function () {
                                    var positionNew = $window.scrollTop();

                                    if (positionNew > 64) {
                                        (position < positionNew) ?
                                            $element.addClass(classHide) : $element.removeClass(classHide);
                                    } else if (positionNew === 0) {
                                        $element.removeClass(classHide); }

                                    position = positionNew; // Posición nueva del scroll
                                });
                            } // Toolbar esta fijo en la Pantalla de la App
                        }
                    };
                }
            },
            
            Select: {
                route: "softtion/template/select.html",
                name: "select",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-readonly","true").
                        addAttribute("value","{{valueInput}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addClass(["truncate","active"]);

                    var icon = softtion.html("i").addClass("material-icon").
                        setText("expand_more").addAttribute("ng-click","openSuggestions()");

                    var list = softtion.html("ul").
                        addComponent(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestions").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-click","selectSuggestion(suggestion, $event)").
                                setText("{{getSuggestionDescription(suggestion)}}")
                        );

                    return input + lineShadow + label + icon + list; // Componente
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Select.route,
                        scope: {
                            select: "=ngModel", 
                            label: "@label",
                            keyDescription: "@keyDescription",
                            suggestions: "=suggestions"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"),
                                list = $element.find("ul"),
                                icon = $element.find(".material-icon");

                            if (softtion.is("defined", $scope.select)) {
                                $scope.valueInput = $scope.getSuggestionDescription($scope.select);
                            } // Hay un opcion seleccionada por defecto

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () { $element.removeClass("active"); };

                            $scope.openSuggestions = function () {
                                list.toggleClass("active"); // Cambiando estado
                                
                                if (list.hasClass("active")) {
                                    icon.html("expand_less"); $element.addClass("active");
                                } else {
                                    icon.html("expand_more"); input.focus();
                                }
                            };

                            $scope.selectSuggestion = function (suggestion, $event) {
                                $scope.select = suggestion; icon.html("expand_more"); 
                                list.find("li").removeClass("active"); input.focus(); 
                                $scope.valueInput = $scope.getSuggestionDescription(suggestion); 
                                angular.element($event.currentTarget).addClass("active"); 

                                list.removeClass("active"); // Ocultando lista
                            };
                            
                            $scope.getSuggestionDescription = function (suggestion) {
                                if (softtion.is("string", suggestion)) {
                                    return suggestion;
                                } else if (softtion.is("string", $scope.keyDescription)) {
                                    return softtion.findKey(suggestion, $scope.keyDescription);
                                } else {
                                    return JSON.stringify(suggestion);
                                } // No se definido nada
                            };
                        }
                    };
                }
            },
            
            SelectMultiple: {
                route: "softtion/template/select-multiple.html",
                name: "selectMultiple",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-click","viewSuggestions()").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-readonly","true").
                        addAttribute("value","{{valueInput}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addClass(["truncate","active"]);

                    var icon = softtion.html("i").addClass("material-icon").
                        setText("expand_more").addAttribute("ng-click","viewSuggestions()");

                    var list = softtion.html("ul").
                        addComponent(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestions").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-class", "{active: suggestion.checked}").
                                addAttribute("ng-click","selectSuggestion(suggestion, $index)").
                                setText("{{getSuggestionDescription(suggestion)}}").
                                addComponent(
                                    softtion.html("div").addClass("checkbox-selection").
                                        addAttribute("prevent-default", "true").
                                        addAttribute("ng-model", "suggestion.checked")
                                )
                        );

                    return input + lineShadow + label + icon + list; // Componente
                },
                valueSelects: function (selects, keyDescription) {
                    var size = Object.keys(selects).length, count = 0,
                        valueInput = ""; // Inicializando variable
                                
                    angular.forEach(selects, function (item) {
                        valueInput += softtion.findKey(item, keyDescription); count++;
                        valueInput += (count === size) ? "" : ", "; // Verificando final
                    });
                    
                    return valueInput.trim(); // Valores seleccionados
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.SelectMultiple.route,
                        scope: {
                            selects: "=ngModel", 
                            label: "@label",
                            keyDescription: "@keyDescription",
                            suggestions: "=suggestions"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"),
                                list = $element.find("ul"),
                                icon = $element.find(".material-icon");
                        
                            // Atributos
                            var valueSelects = Material.components.SelectMultiple.valueSelects;
                        
                            $scope.selects = $scope.selects || {};

                            angular.forEach($scope.suggestions, function (item, index) {
                                if (item.checked) {
                                    $scope.selects[index] = item;
                                } // Item ya esta seleccionado por defecto
                            });
                            
                            $scope.valueInput = valueSelects($scope.selects, $scope.keyDescription);

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () { $element.removeClass("active"); };

                            $scope.viewSuggestions = function () {
                                list.toggleClass("active"); // Cambiando estado
                                
                                if (list.hasClass("active")) {
                                    icon.html("expand_less"); $element.addClass("active");
                                } else {
                                    icon.html("expand_more"); input.focus();
                                } // Cerrando lista de Opciones
                            };

                            $scope.selectSuggestion = function (suggestion, $index) {
                                suggestion.checked = !suggestion.checked;
                                
                                if (suggestion.checked) {
                                    $scope.selects[$index] = suggestion;
                                } else {
                                    softtion.removeKey($scope.selects, $index);
                                } // Eliminando opción

                                $scope.valueInput = valueSelects($scope.selects, $scope.keyDescription);
                            };
                            
                            $scope.getSuggestionDescription = function (suggestion) {
                                return !(softtion.is("string", $scope.keyDescription)) ?
                                    JSON.stringify(suggestion) :
                                    softtion.findKey(suggestion, $scope.keyDescription);
                            };
                        }
                    };
                }
            },
            
            Tab: {
                name: "tab",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            body: "@body"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var body = angular.element($scope.body),
                                indexActive = 0, index = 0,
                                options = $element.find(".option"),
                                bar = angular.element(
                                    softtion.html("div").addClass("bar").create()
                                );
                            
                            if (options.exists()) {
                                options.attr("tabindex", "-1"); // Haciendo componentes enfocables

                                angular.forEach(options, function (option) { 
                                    angular.element(option).data("position", index); index++;
                                });
                                
                                var optionActive = $element.find(".active:first");
                                
                                if (!optionActive.exists()) {
                                    optionActive = angular.element(options[0]).addClass("active");
                                } // No se establecio pestaña activa inicialmente
                                
                                angular.element(optionActive.attr("tab")).addClass("active");
                                
                                options.click(function () {
                                    var option = angular.element(this);
                                    
                                    var position = option.data("position"),
                                        left = option[0].offsetLeft,
                                        width = option[0].clientWidth;
                                    
                                    bar.css({ width: width, left: left });
                            
                                    if (option.hasClass("active")) {
                                        return;
                                    } // Este componente ya se encuentra activo
                                    
                                    options.removeClass("active"); option.addClass("active");
                                    angular.element(window).scrollTop(0); 
                                    
                                    if (left < $element.scrollLeft()) {
                                        $element.animate({ scrollLeft: left }, 175, "standardCurve"); 
                                    } else {
                                        var view = $element.scrollLeft() + window.innerWidth;
                                        
                                        if (view < (left + width)) {
                                            $element.animate({ scrollLeft: left }, 175, "standardCurve"); 
                                        }
                                    } // Reubicando vista del contenedor en pestaña

                                    var slideRight = (position > indexActive); indexActive = position;

                                    var bodyView = body.find(option.attr("tab"));
                                    
                                    if (!bodyView.hasClass("active")) {
                                        var bodyActive = body.find(".content.active");

                                        if (bodyActive.exists()) {
                                            bodyActive.removeClass("active").removeClass("opacity-bottom"); 
                                        } // Removiendo clase activa a la Opcion anterior
                                        
                                        (slideRight) ?
                                            bodyView.addClass("active").
                                                removeClass("slide-in-left").
                                                addClass("slide-in-right") :

                                            bodyView.addClass("active").
                                                removeClass("slide-in-right").
                                                addClass("slide-in-left");
                                    } // El componente actualmente esta oculto
                                });
                            } // Exiten cabeceras en el componente
                    
                            $element.append(bar); // Agregando componente selector
                        }
                    };
                }
            },
            
            TextArea: {
                route: "softtion/template/textarea.html",
                name: "textarea",
                defineTextHidden: function (textarea, texthidden) {
                    var $width = textarea.css("width"), 
                        $fontFamily = textarea.css("font-family"),
                        $fontSize = textarea.css("font-size"),
                        $lineHeight = textarea.css("line-height");

                    texthidden.css("width",$width);
                    texthidden.css("font-family",$fontFamily);
                    texthidden.css("font-size",$fontSize);
                    texthidden.css("line-height",$lineHeight);
                },
                autoResize: function (textarea, texthidden) {
                    texthidden.html(textarea.val()); textarea.css('height', texthidden.height());
                },
                html: function () {
                    var $textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("maxlength","{{maxLength || -1}}").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea()").
                        addAttribute("ng-focus","focusArea()").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled");

                    var $lineShadow = softtion.html("div").addClass("line-shadow");

                    var $label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addComponent(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var $span = softtion.html("span").addClass("truncate").
                        addAttribute("ng-hide","hideSpan");

                    var $textHidden = softtion.html("div").addClass("textarea-hidden");

                    return $textArea + $lineShadow + $label + $span + $textHidden;
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextArea.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@label", 
                            type: "@type",
                            required: "=required",
                            ngDisabled: "=ngDisabled",
                            ngReadonly: "=ngReadonly",
                            minLength: "@minLength",
                            maxLength: "@maxLength",
                            clickEvent: "=clickEvent"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");

                            // Atributos de control
                            var defineTextHidden = Material.components.TextArea.defineTextHidden,
                                autoResize = Material.components.TextArea.autoResize,
                                tempMinLength = parseInt($scope.minLength),
                                minLength = (isNaN(tempMinLength)) ? -1 : tempMinLength;

                            defineTextHidden(area, hidden); $scope.hideSpan = true;
                            $scope.valueArea = ""; // Valor inicial del Area

                            if (softtion.is("string", $scope.value)) { 
                                $element.addClass("active"); $scope.valueArea = $scope.value;
                                
                                autoResize(area, hidden); // Definiendo tamaño del Area
                            } // Se ha definido un valor

                            $scope.clickLabel = function (ev) { 
                                area.focus(); // Se activa el componente 
                                
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickArea = function (ev) {
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusArea = function () { $element.addClass("active"); };

                            $scope.blurArea = function () {
                                if (!softtion.is("string", $scope.valueArea)) {
                                    $element.removeClass("active"); // Componente sin texto

                                    if ($scope.required) {
                                        area.siblings("span").html("Este campo es requerido"); 
                                        $scope.value = undefined; $element.addClass("error"); $scope.hideSpan = false;
                                    }
                                } else if($scope.valueArea.length < minLength) {
                                    area.siblings("span").html("Es campo requiere minimo " + minLength + " caracteres"); 
                                    $scope.value = undefined; $element.addClass("error"); $scope.hideSpan = false; 
                                } else { 
                                    $scope.value = $scope.valueArea; $scope.hideSpan = true; $element.removeClass("error"); 
                                }

                                autoResize(area, hidden); // Cambiando tamaño del componente
                            };

                            $scope.keypressArea = function (ev) {
                                var validate = softtion.validateCharacter({
                                    keyCode: ev.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { ev.preventDefault(); } // Cancelando el evento
                            };
                            
                            $scope.keyupArea = function () { autoResize(area, hidden); };
                        }
                    };
                }
            },
            
            TextField: {
                route: "softtion/template/textfield.html",
                name: "textfield",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","{{typeInput}}").
                        addAttribute("maxlength","{{maxLength || -1}}").
                        addAttribute("ng-click","clickInput($event)").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-keypress","keypressInput($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-model","inputValue").
                        addAttribute("ng-disabled","ngDisabled");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-click","clickLabel($event)").
                        addComponent(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var span = softtion.html("span").addClass("truncate").
                        addAttribute("ng-hide","hideSpan");

                    return input + lineShadow + label + span; // Componente
                },        
                defineInput: function (typeInput) {
                    switch (typeInput) {
                        default: return "text";
                        case (TextType.DECIMAL): return "number";
                        case (TextType.NUMBER): return "number";
                        case (TextType.PASSWORD): return "password";
                    }
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextField.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@label", 
                            type: "@type",
                            required: "=required",
                            ngDisabled: "=ngDisabled",
                            ngReadonly: "=ngReadonly",
                            minLength: "@minLength",
                            maxLength: "@maxLength",
                            clickEvent: "=clickEvent"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input");

                            // Atributos de control
                            var tempMinLength = parseInt($scope.minLength),
                                minLength = (isNaN(tempMinLength)) ? -1 : tempMinLength;

                            $scope.hideSpan = true; $scope.inputValue = "";
                            $scope.typeInput = Material.components.TextField.defineInput($scope.type);

                            if (softtion.is("string", $scope.value)) { 
                                $element.addClass("active"); $scope.inputValue = $scope.value;
                            } // Se ha definido un valor

                            $scope.clickLabel = function (ev) { 
                                input.focus(); // Enfocando el input
                                
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickInput = function (ev) {
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () {
                                if ($scope.inputValue === "") {
                                    $element.removeClass("active"); // Componente no tiene Texto

                                    if ($scope.required) {
                                        input.siblings("span").html("Este campo es requerido"); 
                                        $scope.value = undefined; $element.addClass("error"); $scope.hideSpan = false;
                                    }
                                } else if($scope.inputValue.length < minLength) {
                                    input.siblings("span").html("Es campo requiere minimo " + minLength + " caracteres");
                                    $element.addClass("error"); $scope.hideSpan = false; $scope.value = undefined;
                                } else { 
                                    $scope.value = $scope.inputValue; $scope.hideSpan = true; $element.removeClass("error"); 
                                }
                            };

                            $scope.keypressInput = function (ev) {
                                var validate = softtion.validateCharacter({
                                    keyCode: ev.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.inputValue
                                });

                                if (!validate) { ev.preventDefault(); } // Cancelando el evento
                            };
                        }
                    };
                }
            },
            
            TextFieldReadOnly: {
                route: "softtion/template/textfield-readonly.html",
                name: "textfieldReadonly",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-click","clickInput($event)").
                        addAttribute("ng-readonly","true").
                        addAttribute("ng-model","value");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate");

                    return input + lineShadow + label; // Componente
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextFieldReadOnly.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@label", 
                            clickEvent: "=clickEvent"
                        },
                        link: function ($scope) {
                            $scope.clickInput = function (ev) {
                                if (softtion.is("function", $scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                        }
                    };
                }
            },
            
            Toolbar: {
                name: "toolbar",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            // Componentes
                            var $window = angular.element(window),
                                position = 0, classHide = "hide";
                            
                            if (!$element.hasClass("offscreen")) {
                                $window.scroll(function () {
                                    var positionNew = $window.scrollTop(); // Posicion actual

                                    classHide = $element.hasClass("flexible-title") ?
                                        "hide-flexible-title" : "hide";

                                    if (positionNew > 56) {
                                        (position < positionNew) ?
                                            $element.addClass(classHide) : $element.removeClass(classHide);
                                    } else if (positionNew === 0) {
                                        $element.removeClass(classHide); }

                                    position = positionNew; // Posición nueva del scroll
                                });
                            } // Toolbar esta fijo en la Pantalla de la App
                            
                            angular.element(".app-content").css("margin-top", $element.innerHeight());
                        }
                    };
                }
            },
            
            Tooltip: {
                name: "tooltip",
                container: function () {
                    return softtion.html("div").addClass("tooltip-container").create();
                },
                directive: function () {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var body = angular.element(document.body),
                                container = body.find(".tooltip-container");
                            
                            if (!container.exists()) {
                                container = angular.element(
                                    Material.components.Tooltip.container()
                                );
                        
                                body.append(container);
                            } // Contenedor tooltip no se encuentra ingresado
                            
                            $element.mouseenter(function () {
                                container.html($attrs.tooltip);
                                
                                var widthContainer = container.innerWidth(),
                                    heightElement = $element.innerHeight(),
                                    positionX = $element.offset().left,
                                    positionY = $element.offset().top,
                                    widthElement = $element.innerWidth();
                                
                                container.css({
                                    left: (widthElement / 2) - (widthContainer / 2) + positionX,
                                    top: positionY + heightElement + 10
                                });
                                    
                                container.fadeIn(375);
                            });
                            
                            $element.mouseout(function () { container.fadeOut(0); });
                        }
                    };
                }
            }
        },
        
        providers: {
            Alert: {
                name: "$alert",
                method: function () {
                    // Atributos del proveedor
                    var AttributesAlert = {
                        // Elementos
                        dialog: undefined, 
                        backdrop: undefined,
                        box: undefined, 
                        title: undefined, 
                        content: undefined,
                        actions: undefined,
                        btnPositive: undefined,
                        btnNegative: undefined,
                        
                        // Propiedades
                        backdropClose: false,
                        eventPositive: undefined,
                        eventNegative: undefined
                    };
                    
                    var Alert = function () {
                        var self = this; 

                        AttributesAlert.dialog = angular.element(
                            softtion.html("div").addClass("dialog").create()
                        );

                        AttributesAlert.backdrop = angular.element(
                            softtion.html("div").addClass("backdrop").create()
                        );

                        AttributesAlert.box = angular.element(
                            softtion.html("div").addClass("box").create()
                        );

                        AttributesAlert.title = angular.element(
                            softtion.html("div").addClass("title").create()
                        );

                        AttributesAlert.content = angular.element(
                            softtion.html("div").addClass("content").create()
                        );

                        AttributesAlert.actions = angular.element(
                            softtion.html("div").addClass("actions").create()
                        );

                        AttributesAlert.btnPositive = angular.element(
                            softtion.html("button").addClass(["flat","positive"]).create()
                        );

                        AttributesAlert.btnNegative = angular.element(
                            softtion.html("button").addClass(["flat","negative"]).create()
                        );

                        AttributesAlert.dialog.append(AttributesAlert.backdrop);
                        AttributesAlert.box.append(AttributesAlert.title);
                        AttributesAlert.box.append(AttributesAlert.content);
                        AttributesAlert.actions.append(AttributesAlert.btnPositive);
                        AttributesAlert.actions.append(AttributesAlert.btnNegative);
                        AttributesAlert.box.append(AttributesAlert.actions);
                        AttributesAlert.dialog.append(AttributesAlert.box);

                        AttributesAlert.backdrop.click(function () { 
                            if (AttributesAlert.backdropClose) {
                                self.hide(); 
                            } // Cerrando dialog con el Backdrop
                        });

                        AttributesAlert.btnPositive.click(function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.is("function", AttributesAlert.eventPositive)) {
                                AttributesAlert.eventPositive(); 
                            } // Se establecío función para proceso Positivo
                        });

                        AttributesAlert.btnNegative.click(function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.is("function", AttributesAlert.eventNegative)) {
                                AttributesAlert.eventNegative(); 
                            } // Se establecío función para proceso Negativo
                        });

                        angular.element(document.body).append(AttributesAlert.dialog);
                    };

                    Alert.prototype.title = function (title) {
                        if (softtion.is("string", title)) {
                            AttributesAlert.title.html(title); 
                            AttributesAlert.title.removeClass("hidden");
                        } else {
                            AttributesAlert.title.addClass("hidden");
                        }
                        
                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.content = function (content) {
                        AttributesAlert.content.html(content); return this;
                    };

                    Alert.prototype.positiveText = function (text) {
                        AttributesAlert.btnPositive.html(text); return this;
                    };

                    Alert.prototype.negativeText = function (text) {
                        AttributesAlert.btnNegative.html(text); return this;
                    };

                    Alert.prototype.enabledBackdrop = function (enabled) {
                        AttributesAlert.backdropClose = enabled; return this;
                    };

                    Alert.prototype.eventPositive = function (eventPositive) {
                        AttributesAlert.eventPositive = eventPositive; return this;
                    };

                    Alert.prototype.eventNegative = function (eventNegative) {
                        AttributesAlert.eventNegative = eventNegative; return this;
                    };

                    Alert.prototype.settings = function (options) {
                        var $options = {
                            title: "", content: "",
                            positiveText: "Aceptar",
                            negativeText: "Cancelar",
                            enabledBackdrop: false,
                            eventPositive: undefined,
                            eventNegative: undefined
                        };
                        
                        angular.extend($options, options); 
                        
                        this.title($options.title); this.content($options.content);
                        this.positiveText($options.positiveText);
                        this.negativeText($options.negativeText);
                        this.enabledBackdrop($options.enabledBackdrop);
                        this.eventPositive($options.eventPositive);
                        this.eventNegative($options.eventNegative);

                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.show = function () {
                        if (!AttributesAlert.dialog.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            AttributesAlert.dialog.addClass("active"); 
                            AttributesAlert.backdrop.fadeIn(175);
                            
                            AttributesAlert.box.addClass("show");
                        } // Dialog no se encuentra activo
                    };

                    Alert.prototype.hide = function () {
                        if (AttributesAlert.dialog.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            AttributesAlert.dialog.removeClass("active"); 
                            AttributesAlert.backdrop.fadeOut(175);
                            
                            AttributesAlert.box.removeClass("show");
                        } // Dialog no se encuentra activo
                    };
                    
                    var alert = new Alert();
                    
                    this.$get = function () { return alert; };
                }
            },
            
            BottomSheet: {
                name: "$bottomSheet",
                method: function () {
                    var AttributesSheet = {
                        id: undefined,
                        bottomSheet: undefined,
                        content: undefined,
                        backdrop: undefined
                    };
                    
                    var BottomSheet = function () {};

                    BottomSheet.prototype.set = function (sheetID) {
                        var self = this; // Sidenav
                        
                        if (AttributesSheet.id !== sheetID) {
                            AttributesSheet.id = sheetID; AttributesSheet.bottomSheet = angular.element(sheetID);
                        
                            if (AttributesSheet.bottomSheet.exists()) {
                                AttributesSheet.content = AttributesSheet.bottomSheet.find(".content");
                                AttributesSheet.backdrop = AttributesSheet.bottomSheet.find(".backdrop");
                                
                                AttributesSheet.backdrop.click(function () { self.hide(); });
                            } // Sidenav existe en el Documento
                        }
                        
                        return this; // Retornando interfaz fluida
                    };

                    BottomSheet.prototype.show = function () {
                        if (!AttributesSheet.bottomSheet.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            AttributesSheet.content.addClass("show");
                            AttributesSheet.backdrop.fadeIn(325, "standardCurve"); 
                            AttributesSheet.bottomSheet.addClass("active"); 
                        } // Sidenav no se encuentra activo
                    };

                    BottomSheet.prototype.hide = function () {
                        if (AttributesSheet.bottomSheet.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            var marginBottom = AttributesSheet.content.outerHeight();
                            AttributesSheet.content.css("margin-bottom", (marginBottom * -1) - 1);
                            
                            AttributesSheet.content.removeClass("show");
                            AttributesSheet.backdrop.fadeOut(325, "standardCurve"); 
                            AttributesSheet.bottomSheet.removeClass("active"); 
                        } // Sidenav no se encuentra activo
                    };
                    
                    var sidenav = new BottomSheet();

                    this.$get = function () { return sidenav; };
                }
            },
            
            Dropdown: {
                name: "$dropdown",
                handler: {
                    show: function (component) {
                        Material.providers.Dropdown.handler.setPosition(component, false); 
                        component.dropdown.addClass("active"); // Activando dropdown
                    },
                    hide: function (dropdown) {
                        dropdown.removeClass("active"); 
                    },
                    setPosition: function (component, isOpen) {
                        (isOpen) ? component.dropdown.addClass("changed-position") :
                            component.dropdown.removeClass("changed-position");
                        
                        // Componentes
                        var dropdown = component.dropdown, origin = component.origin;
                        
                        var widthDropdown = dropdown.innerWidth(),
                            heightDropdown = dropdown.innerHeight(),
                            widthOrigin = (origin) ? origin.innerWidth() : 0,
                            heightOrigin = (origin) ? origin.innerHeight() : 0, 
                            posOriginY = (origin) ? origin.offset().top : 0,
                            posOriginX = (origin) ? origin.offset().left : 0,
                            
                            // Atributos finales del Dropdown
                            left, top, originEffect, transformOrigin = 0; 
                    
                        // Definiendo posicion eje X
                        if ((posOriginX + widthDropdown) <= window.innerWidth) {
                            left = posOriginX; transformOrigin = transformOrigin + 1;
                        } else if ((posOriginX + widthOrigin - widthDropdown) > 0) {
                            left = posOriginX + widthOrigin - widthDropdown; transformOrigin = transformOrigin + 3;
                        } else { 
                            left = window.innerWidth - widthDropdown - 10; transformOrigin = transformOrigin + 1; 
                        }

                        // Definiendo posicion eje Y
                        if (component.belowOrigin) { 
                            if ((posOriginY + heightDropdown) <= window.innerHeight) {
                                top = posOriginY; transformOrigin = transformOrigin + 4;
                            } else if ((posOriginY + heightOrigin - heightDropdown) > 0) {
                                top = posOriginY + heightOrigin - heightDropdown; transformOrigin = transformOrigin + 7;
                            } else { 
                                top = window.innerHeight - heightDropdown -10; transformOrigin = transformOrigin + 4; }
                        } else { 
                            if ((posOriginY + heightOrigin + heightDropdown) <= window.innerHeight) {
                                top = posOriginY + heightOrigin; transformOrigin = transformOrigin + 4;
                            } else if ((posOriginY - heightDropdown) > 0) {
                                top = posOriginY - heightDropdown; transformOrigin = transformOrigin + 7;
                            } else { 
                                top = window.innerHeight - heightDropdown - 10; transformOrigin = transformOrigin + 4; }
                        }
                        
                        switch (transformOrigin) {
                            case (5): originEffect = "0 0"; break;
                            case (7): originEffect = "100% 0"; break;
                            case (8): originEffect = "0 100%"; break;
                            case (10): originEffect = "100% 100%"; break;
                            default: originEffect = "0 0"; break;
                        } // Definiiendo inicio del efecto
                        
                        dropdown.css({ 
                            left: left, top: top, 
                            "-moz-transform-origin": originEffect,
                            "-webkit-transform-origin": originEffect,
                            "-o-transform-origin": originEffect,
                            "transform-origin": originEffect,
                            "-ms-transform-origin": originEffect
                         }); 
                    }
                },
                method: function () {
                    var Dropdown = function () {
                        this.id = ""; this.belowOrigin = true;
                    };

                    Dropdown.prototype.set = function (dropdownID) { 
                        if (this.id !== dropdownID) {
                            this.dropdown = angular.element(dropdownID); this.id = dropdownID;
                        } // Se ha definido nuevo dropdown
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    Dropdown.prototype.setBelowOrigin = function (belowOrigin) {
                        this.belowOrigin = belowOrigin; return this;
                    };

                    Dropdown.prototype.isActive = function () {
                        if (softtion.is("defined", this.dropdown)) {
                            return this.dropdown.hasClass("active");
                        } // Esta definido el Id del Dropdown

                        return false; // Se desconoce el Componente
                    };

                    Dropdown.prototype.show = function (origin) {
                        if (softtion.is("defined", this.dropdown)) {
                            this.origin = origin; // Estableciendo origen
                            
                            (this.isActive()) ?
                                Material.providers.Dropdown.handler.setPosition(this, true) : 
                                Material.providers.Dropdown.handler.show(this); 
                        } // Esta definido el dropdown en el Provedor
                    };

                    Dropdown.prototype.hide = function () {
                        if (this.isActive()) { 
                            Material.providers.Dropdown.handler.hide(this.dropdown); 
                        } // Esta abierto el dropdown en el Provedor
                    };
                    
                    var dropdown = new Dropdown();

                    this.$get = function () { return dropdown; };
                }
            },
            
            Snackbar: {
                name: "$snackbar",
                moveButton: function (isShow, height) {
                    var button = angular.element("button.floating");
                        
                    if (button.exists() && (window.innerWidth <= 640)) {
                        (!isShow) ? button.css("margin-bottom", "0px") :
                            button.css("margin-bottom", (height) + "px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var AttributesSnackbar = {
                            scope: undefined, box: undefined, 
                            body: undefined, action: undefined
                        };
                    
                    var SnackBar = function () { 
                        AttributesSnackbar.body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );
                
                        AttributesSnackbar.action = angular.element(
                            softtion.html("div").addClass(["action"]).create()
                        );

                        AttributesSnackbar.box = angular.element(
                            softtion.html("div").addClass(["snackbar"]).create()
                        );

                        AttributesSnackbar.box.append(AttributesSnackbar.body); 
                        AttributesSnackbar.box.append(AttributesSnackbar.action);
                        
                        angular.element(document.body).append(AttributesSnackbar.box);
                    };

                    SnackBar.prototype.show = function (text, actionProperty) {
                        var heightBody, self = this; // Snackbar
                        AttributesSnackbar.action.height(0);
                        var bottomNavigation = angular.element(".bottom-navigation");

                        if (!AttributesSnackbar.box.hasClass("active")) {
                            AttributesSnackbar.body.html(text); // Estableciendo texto
                            heightBody = parseInt(AttributesSnackbar.body.height());
                            
                            if (heightBody > 20) {
                                AttributesSnackbar.body.addClass("two-line");
                            } else {
                                AttributesSnackbar.body.removeClass("two-line");
                            } // Cuerpo es de una sola línea
                            
                            if (softtion.is("defined", actionProperty)) {
                                var span = "<span>" + actionProperty.label + "</span>";
                                AttributesSnackbar.action.html(span); // Texto de acción                                
                                
                                var widthAction = AttributesSnackbar.action.find("span").width(),
                                    widthBody = "calc(100% - " + (widthAction + 30) + "px)";
                                
                                AttributesSnackbar.body.css("width", widthBody);
                                AttributesSnackbar.body.css("padding-right", "24px");
                                
                                AttributesSnackbar.action.css("height", AttributesSnackbar.box.height());
                                
                                AttributesSnackbar.action.find("span").click(function () {
                                    if (softtion.is("function", actionProperty.action)) {
                                        actionProperty.action(); AttributesSnackbar.action.html(""); 

                                        if (softtion.is("defined", self.hiddenSnackbar)) {
                                            clearTimeout(self.hiddenSnackbar); self.hiddenSnackbar = undefined;
                                        } // Existe un cierre pendiente por realizar

                                        Material.providers.Snackbar.moveButton(false); 
                                        AttributesSnackbar.box.removeClass("show").removeClass("active"); 
                                    } // Ejecutando acción establecida en el Controlador
                                });
                            } else {
                                AttributesSnackbar.action.html("");
                                AttributesSnackbar.body.css("padding-right", "0px");
                                AttributesSnackbar.body.css("width", "100%");
                            } // No e ha definido acción
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                AttributesSnackbar.box.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            AttributesSnackbar.box.addClass("active").addClass("show");
                            Material.providers.Snackbar.moveButton(true, AttributesSnackbar.box.height()); 

                            self.hiddenSnackbar = setTimeout(
                                function () {
                                    self.hiddenSnackbar = undefined; // Eliminando temporizador
                                    
                                    AttributesSnackbar.box.removeClass("show").removeClass("active");
                                    Material.providers.Snackbar.moveButton(false); 
                                },
                                5000 // Tiempo de espera para ocultarse
                            );
                        } else {
                            AttributesSnackbar.action.html(""); // Limpiando acción
                            heightBody = parseInt(AttributesSnackbar.body.css("height"));
                            
                            if (softtion.is("defined", self.hiddenSnackbar)) {
                                clearTimeout(self.hiddenSnackbar); self.hiddenSnackbar = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            Material.providers.Snackbar.moveButton(false); 
                            AttributesSnackbar.box.removeClass("show").removeClass("active"); 
                            
                            setTimeout(
                                function () { self.show(text, actionProperty); }, 350
                            ); // Temporizador para visualizar
                        }
                    };

                    var snackbar = new SnackBar();
                    
                    this.$get = function () { 
                        return snackbar; 
                    };
                    
                    this.scope = function (scope) { 
                        AttributesSnackbar.scope = scope;
                    };
                }
            },
            
            Sidenav: {
                name: "$sidenav",
                method: function () {
                    var SideNav = function () { this.id = ""; };

                    SideNav.prototype.set = function (sidenavID) {
                        var self = this; // Sidenav
                        
                        if (self.id !== sidenavID) {
                            self.id = sidenavID; self.sidenav = angular.element(sidenavID);
                        
                            if (self.sidenav.exists()) {
                                self.content = self.sidenav.find(".content:first");
                                self.backdrop = self.sidenav.find(".backdrop");

                                if (!self.backdrop.exists()) {
                                    self.backdrop = angular.element(
                                        softtion.html("div").addClass("backdrop").create()
                                    );

                                    self.sidenav.append(self.backdrop);
                                    self.backdrop.click(function () { self.hide(); });
                                }
                            } // Sidenav existe en el Documento
                        }
                        
                        return this; // Retornando interfaz fluida
                    };

                    SideNav.prototype.show = function () {
                        var self = this; // Sidenav

                        if (!self.sidenav.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            self.content.removeClass("sharp-curve").removeClass("hide");
                            self.content.addClass("easing-out").addClass("show");
                            self.backdrop.fadeIn(300); self.sidenav.addClass("active"); 
                        } // Sidenav no se encuentra activo
                    };

                    SideNav.prototype.hide = function () {
                        var self = this; // Sidenav

                        if (self.sidenav.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            self.content.removeClass("easing-out").removeClass("show");
                            self.content.addClass("hide").addClass("sharp-curve");
                            self.backdrop.fadeOut(300); self.sidenav.removeClass("active"); 
                        } // Sidenav no se encuentra activo
                    };
                    
                    var sidenav = new SideNav();

                    this.$get = function () { return sidenav; };
                }
            }
        }
    };
    
    // Directivas de SofttionMaterial
    
    angular.forEach(Material.components, function (component) {
        ngMaterial.directive(component.name, component.directive);
    });
    
    // Rutas virtuales de los componentes SofttionMaterial
    
    ngMaterial.run(["$templateCache", function ($templateCache) {
        angular.forEach(Material.components, function (component) {
            if (softtion.is("defined", component["route"])) {
                $templateCache.put(component.route, component.html());
            }
        });
    }]);
    
    // Provedores de SofttionMaterial
    
    angular.forEach(Material.providers, function (provider) {
        ngMaterial.provider(provider.name, provider.method);
    });
});