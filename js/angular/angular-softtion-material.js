/*
 Angular Softtion Material v1.0.4
 (c) 2016 Softtion Developers, http://material.softtion.com.co
 License: MIT
 Updated: 24/Ene/2017
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
            AppBar: {
                name: "appBar",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            fixed: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes y atributos
                            var appContent = angular.element(".app-content"),
                                position = 0, hideClass = "hide",
                                heightElement = $element.innerHeight(),
                                $window = angular.element(window);
                            
                            if (!$scope.fixed) {
                                appContent.scroll(function () {
                                    var heightMin = (($window.width() > 960) ? 64 : 56),
                                        positionNew = appContent.scrollTop();

                                    hideClass = $element.hasClass("flexible-title") ? "hide-flexible-title" : "hide";

                                    if (positionNew > heightMin) {
                                        if (position < positionNew) {
                                            $element.addClass(hideClass); 
                                        } else {
                                            $element.removeClass(hideClass); 
                                        }
                                    } else if (positionNew === 0) {
                                        $element.removeClass(hideClass); 
                                    } 

                                    position = positionNew; // Posición nueva del scroll
                                });
                            }                            
                            
                            appContent.css("padding-top", heightElement + 16);
                        }
                    };
                }
            },
            
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
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addClass("truncate").addAttribute("ng-click","clickLabel()");

                    var span = softtion.html("span").addClass("truncate").
                        addAttribute("ng-hide","hideSpan");
                
                    var buttonClear = softtion.html("i").
                        addClass(["action-icon"]).setText("close").
                        addAttribute("ng-hide","clearSuggestion").
                        addAttribute("ng-click","clearAutocomplet()");

                    var listAutocomplete = softtion.html("ul").
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","option in suggestionsFilter track by $index").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-click","selectOption(option)").
                                addAttribute("ng-keydown","keydownOption($event, option)").
                                addAttribute("ng-bind-html","renderOption(option)")
                        ).addChildren(
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
                            required: "@",
                            filter: "@",
                            label: "@",
                            ngDisabled: "@",
                            suggestions: "=",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), 
                                list = $element.find("ul"),
                                label = $element.find("label");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input
                                
                            // Atributos de control
                            var filterDefined = softtion.isString($scope.filter),
                                focusLi = false, searchStart = false;

                            $scope.suggestionsFilter = []; $scope.clearSuggestion = true;

                            $scope.clickLabel = function () { input.focus(); };

                            $scope.focusInput = function () { 
                                $element.addClass("active"); label.addClass("active"); 
                            };

                            $scope.keyupInput = function (ev) {
                                if ([13, 27, 35, 36, 37, 38, 39, 40].indexOf(ev.keyCode) !== -1) { 
                                    return;
                                } // Estos caracteres no mejoran el patrón de busqueda
                                
                                if (!softtion.isString($scope.valueInput)) {
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
                                    if (softtion.isUndefined($scope.optionSelect)
                                        && !softtion.isString($scope.valueInput)) {
                                        $element.removeClass("active"); label.removeClass("active");
                                    } // No ha seleccionado, ni digitado en el Componente
                                    
                                    if (this.suggestionsFilter.length === 0) {
                                        list.removeClass("active"); $scope.optionSelect = undefined;
                                        $scope.clearSuggestion = true;
                                    } else {
                                        if (softtion.isDefined($scope.optionSelect)) {
                                            list.removeClass("active"); 
                                            
                                            if (typeof $scope.optionSelect === "string") {
                                                $scope.valueInput = $scope.optionSelect;
                                            } else {
                                                $scope.valueInput = (!(filterDefined) ? $scope.optionSelect.toString() :
                                                    softtion.findKey($scope.optionSelect, $scope.filter));
                                            }
                                        } else {
                                            list.removeClass("active"); }
                                    }
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
                                var value = option.labelAutoComplete || option;

                                // Valor digitado para filtrar
                                var filter = $scope.valueInput.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                                // Expresión RegExp
                                var expReg = new RegExp("(" + filter.split(' ').join('|') + ")", "gi");

                                return value.replace(expReg, "<b>$1</b>"); // Valor final
                            };

                            $scope.notFoundResult = function () {
                                if (this.suggestionsFilter.length === 0) {
                                    return (searchStart && softtion.isString($scope.valueInput));
                                } else { return false; }
                            };

                            $scope.descriptionNotFoundResult = function () {
                                return $scope.valueInput + ", no existen resultados.";
                            };
                            
                            $scope.clearAutocomplet = function () {
                                $scope.optionSelect = undefined; $scope.valueInput = ""; 
                                $scope.clearSuggestion = true; // Ocultar botón
                                $element.removeClass("active"); label.removeClass("active");
                            };
                        }
                    };
                }
            },
            
            BottomNavigation: {
                name: "bottomNavigation",
                ripple: function () {
                    return softtion.html("div").addClass("ripple-box").
                        addChildren(
                            softtion.html("span").addClass("effect")
                        ).create();
                },             
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            views: "@viewBox"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var rippleBox = angular.element(
                                    Material.components.BottomNavigation.ripple()
                                ),
                                tabs = $element.find(".content > li"),
                                tabActive = $element.find(".content > li.active:first"), 
                                fab = angular.element("button.floating"),
                                views = angular.element($scope.views), toast,
                                appContent = angular.element(".app-content"), snackbar;
                        
                            $element.append(rippleBox); // Agregando ripple
                            appContent.css("padding-bottom", "32px");
                        
                            // Atributos
                            var classColor = "default", position = 0, classHide = "hide";
                            
                            if (fab.exists()) {
                                fab.addClass("show-bottom-navigation");
                            } // Cambiando posición original
                            
                            tabs.attr("tab-index","-1"); // Haciendo enfocables
                            tabs.removeClass("active");  // Desactivando opciones
                            
                            if (!tabActive.exists()) {
                                tabActive = angular.element(tabs[0]);
                            } // Se establece como activo primero de lista
                            
                            tabActive.addClass("active");
                            
                            switch (tabs.length) {
                                default: $element.addClass("five-tabs"); break; 
                                case (3): $element.addClass("three-tabs"); break;
                                case (4): $element.addClass("four-tabs"); break;
                            } // Estableciendo dimensión
                                
                            if ($element.hasClass("shifting")) {
                                var classColorOption = tabActive.attr("color");
                                
                                if (softtion.isString(classColorOption)) {
                                    classColor = classColorOption;
                                } // La opción tiene un color establecido
                                
                                $element.addClass(classColor); // Color
                            } // Se debe establecer color base del componente
                                
                            tabs.click(function () {
                                var option = angular.element(this); // Opción activada
                                
                                if (option.hasClass("active")) {
                                    return;
                                } // La opción es la actualmente activa
                                
                                tabs.removeClass("active"); option.addClass("active");
                                
                                var viewTab = views.find(option.attr("view-tab"));
                                
                                if (viewTab.exists() && !viewTab.hasClass("active")) {
                                    appContent.scrollTop(0); // Posición inicial
                                    var viewActive = views.find(".content.active");
                                    
                                    if (viewActive.exists()) {
                                        viewActive.removeClass("opacity").removeClass("active");
                                    } // Ocultando componente activo
                                    
                                    viewTab.addClass("active").removeClass("slide-in-left").
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
                                
                                    classColor = (softtion.isString(classColorOption)) ? 
                                            classColorOption : "default";
                                
                                    $element.addClass(classColor); // Color
                                    
                                    effect.css({ top: top, left: left }); rippleBox.addClass("animated");
                                    setTimeout(function () { rippleBox.removeClass("animated").removeClass("show"); }, 525);
                                } else {
                                    effect.css({ top: top, left: left }); rippleBox.addClass("animated");
                                    setTimeout(function () { rippleBox.removeClass("animated").removeClass("show"); }, 325);
                                }// BottomNavigation permite cambio de Color
                            });
                            
                            var scrollBottomNav = function () {
                                if (softtion.isUndefined(snackbar) || !snackbar.exists()) {
                                    snackbar = angular.element(".snackbar");
                                } // No se ha encontrado Snackbar en el documento
                                
                                if (softtion.isUndefined(toast) || !toast.exists()) {
                                    toast = angular.element(".toast");
                                } // No se ha encontrado Toast en el documento
                                
                                if (softtion.isUndefined(fab) || !fab.exists()) {
                                    fab = angular.element("button.floating");
                                } // No se ha encontrado Floating en el documento
                                
                                if (!angular.element(document).find(".bottom-navigation").exists()) {
                                    toast.removeClass("show-bottom-navigation");
                                    snackbar.removeClass("show-bottom-navigation");
                                    fab.removeClass("show-bottom-navigation");
                                    appContent.off("scroll.bottom-navigation", scrollBottomNav); return;
                                } // No existe el bottom navigation en el documento
                                
                                var positionNew = appContent.scrollTop(); // Posicion actual
                                                                
                                if (position < positionNew) {
                                    fab.removeClass("show-bottom-navigation");
                                    snackbar.removeClass("show-bottom-navigation");
                                    toast.removeClass("show-bottom-navigation");
                                    $element.addClass(classHide);
                                } else {
                                    fab.addClass("show-bottom-navigation");
                                    snackbar.addClass("show-bottom-navigation");
                                    toast.addClass("show-bottom-navigation");
                                    $element.removeClass(classHide);
                                } // Se visualiza BottomNavigation oculto
                                
                                position = positionNew; // Posición nueva del scroll
                            };
                            
                            appContent.on("scroll.bottom-navigation", scrollBottomNav);
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
                        scope: {
                            disableRipple: "@"
                        },
                        link: function ($scope, $element) {
                            if ($scope.disableRipple) {
                                $element.addClass("disabled-ripple");
                            } // Usuario no desea efecto ripple en el Botón
                        }
                    };
                }
            },
            
            Carousel: {
                route: "softtion/template/carousel.html",
                name: "carousel",
                html: function () {
                    var content = softtion.html("div").
                        addClass("slide").addAttribute("ng-repeat", "slide in slides").
                        addAttribute(
                            "ng-class", "{active: slideActive($index), before: slideBefore($index), after: slideAfter($index)}"
                        ).addChildren(
                            softtion.html("img", false).addAttribute("src", "{{slide.img}}")
                        );

                    content.addChildren(
                        softtion.html("div").addClass("detail").
                            addChildren(
                                softtion.html("label").addClass("title").setText("{{slide.title}}")
                            ).
                            addChildren(
                                softtion.html("h2").addClass("subtitle").setText("{{slide.subTitle}}")
                            )
                    );

                    var buttonPrev = softtion.html("a").addClass(["arrow", "prev"]).
                        addAttribute("ng-click", "prev()").
                        addChildren(
                            softtion.html("i").addClass("material-icon").setText("chevron_left")
                        );

                    var buttonNext = softtion.html("a").addClass(["arrow", "next"]).
                        addAttribute("ng-click", "next()").
                        addChildren(
                            softtion.html("i").addClass("material-icon").setText("chevron_right")
                        );
                
                    return content + buttonPrev + buttonNext;
                },
                directive: ["$interval", function ($interval) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Carousel.route,
                        scope: {
                            slides: "=",
                            disabledAuto: "@",
                            time: "@",
                            height: "@"
                        },
                        link: function ($scope, $element) {
                            var intervalCarousel = undefined; $scope.index = 0; 
                            $scope.time = $scope.time || 4000;
                            
                            $element.height($scope.height || "inherit");

                            $scope.slideActive = function (index) {
                                return $scope.index === index;
                            };

                            $scope.slideBefore = function (index) {
                                var before = $scope.index - 1;

                                if (before < 0) {
                                    before = $scope.slides.length - 1;
                                } // Slide before es el ultimo

                                return before === (index);
                            };

                            $scope.slideAfter = function (index) {
                                var after = $scope.index + 1;

                                if (after === $scope.slides.length) {
                                    after = 0;
                                } // Slide after es el primero

                                return after === (index);
                            };

                            function prev() {
                                $scope.index--; // Index para slide anterior

                                if ($scope.index < 0)  {
                                    $scope.index = $scope.slides.length - 1;
                                } // Se salio del rango inferior de la lista
                            };

                            function next() {
                                $scope.index++; // Index para slide siguiente

                                if ($scope.index === $scope.slides.length) {
                                    $scope.index = 0;
                                } // Se alcanzo la cantidad de slides
                            };

                            function startInterval() {
                                if (!$scope.disabledAuto) {
                                    if (softtion.isInPage($element[0])) {
                                        intervalCarousel = $interval(next, $scope.time);
                                    } else {
                                        $interval.cancel(intervalCarousel);
                                    } // Ya no se encuentra en el documento
                                }
                            };

                            $scope.next = function () {
                                $interval.cancel(intervalCarousel); next(); startInterval();
                            };

                            $scope.prev = function () {
                                $interval.cancel(intervalCarousel); prev(); startInterval();
                            };

                            startInterval(); // Inicializando el interval
                        }
                    };
                }]
            },
            
            CheckBox: {
                route: "softtion/template/checkbox.html",
                name: "checkbox",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","checkbox").
                        addAttribute("ng-model","checked").
                        addAttribute("ng-disabled","ngDisabled");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel()");
                
                    var ripple = softtion.html("div").addClass("ripple-content").
                        addChildren(
                            softtion.html("div").addClass("box")
                        );

                    return input + label + ripple; // Checkbox
                },
                directive: ["$timeout", function ($timeout) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBox.route,
                        scope: {
                            checked: "=ngModel",
                            label: "@label",
                            ngDisabled: "@ngDisabled"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");

                            $scope.clickLabel = function () { 
                                if (!$scope.ngDisabled) {
                                    $scope.checked = !$scope.checked; input.focus();
                                } // No se permite el cambio de la Propiedad
                            };
                        }
                    };
                }]
            },
            
            CheckBoxControl: {
                route: "softtion/template/checkbox-control.html",
                name: "checkboxControl",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","checkbox").
                        addAttribute("ng-model","checked").
                        addAttribute("ng-disabled","ngDisabled");

                    var label = softtion.html("label").
                        addAttribute("ng-click","clickLabel($event)");

                    return input + label; // Checkbox control
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBoxControl.route,
                        scope: {
                            checked: "=ngModel",
                            ngDisabled: "@",
                            preventDefault: "@",
                            stopPropagation: "@"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");
                            
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.checked = !$scope.checked; input.focus();
                                
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
                    var chips = softtion.html("div").addClass("chips").
                        addChildren(
                            softtion.html("div").addClass("chip").
                                addAttribute("ng-repeat", "item in listValue").setText("{{item}}").
                                addChildren(
                                    softtion.html("div").addClass("action").
                                        addChildren(
                                            softtion.html("i").setText("close").
                                                addAttribute("ng-click", "removeItem($index)")
                                        )
                                )
                    );
                    
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-click","clickInput($event)").
                        addAttribute("ng-keypress","keypressInput($event)").
                        addAttribute("ng-blur","blurInput($event)").
                        addAttribute("ng-focus","focusInput($event)").
                        addAttribute("ng-model","valueInput").
                        addAttribute("ng-disabled","{{ngDisabled}}").
                        addAttribute("placeholder","{{placeholder}}");

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
                            label: "@", 
                            clickEvent: "=?",
                            maxCountDefined: "@maxCount",
                            ngDisabled: "@",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input
                        
                            $scope.listValue = $scope.listValue || new Array();
                            $scope.maxCount = $scope.maxCountDefined || -1;
                            
                            if ($scope.listValue.length > 0) { $element.addClass("active"); }
                            
                            $element.click(function (ev) { 
                                $element.removeClass("hide-input"); input.focus();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            });
                            
                            $scope.clickLabel = function (ev) {
                                $element.removeClass("hide-input"); input.focus();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickInput = function (ev) {
                                if (softtion.isFunction($scope.clickEvent)) {
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
                                    if (!softtion.isString($scope.valueInput)) {
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
                        addChildren(
                            softtion.html("div").addClass("time").
                                addChildren(
                                    softtion.html("div").addClass("am-pm").
                                        addChildren(
                                            softtion.html("div").addClass("am").setText("AM").
                                                addAttribute("ng-click","setZone(false)")
                                        ).
                                        addChildren(
                                            softtion.html("div").addClass("pm").setText("PM").
                                                addAttribute("ng-click","setZone(true)")
                                        )
                                ).addChildren(
                                    softtion.html("div").addClass("minute").setText(":{{leadingClock(minuteSelect)}}").
                                        addAttribute("ng-click","setSelection(false)")
                                ).addChildren(
                                    softtion.html("div").addClass(["hour"]).setText("{{hourSelect}}").
                                        addAttribute("ng-click","setSelection(true)")
                                )
                        );
                    
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("plate").
                                addAttribute("ng-mousedown","mousedownPlate($event)").
                                addChildren(
                                    softtion.html("div").addClass("canvas")
                                ).
                                addChildren(
                                    softtion.html("div").addClass(["hours"])
                                ).
                                addChildren(
                                    softtion.html("div").addClass("minutes")
                                )
                        );
                        
                    var footer = softtion.html("div").addClass("actions").
                        addChildren(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Ok").
                                addAttribute("ng-click","setTime()")
                        ).
                        addChildren(
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
                            setTimeSelect: "=?timeSelect",
                            cancelSelect: "=?cancelSelect"
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
                                touchSupported = ("ontouchstart" in window),
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
                                
                                if (softtion.isFunction($scope.setTimeSelect)) {
                                    $scope.setTimeSelect($scope.time);
                                } // Función que se llama cuando se selecciona Fecha
                            };
                            
                            $scope.cancel = function () {
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.isFunction($scope.cancelSelect)) {
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
                            
                            $scope.mousedownPlate = function ($event) {
                                var offset = plate.offset(), isTouch = /^touch/.test($event.type),
                                    startX = offset.left + attributes.dialRadius,
                                    startY = offset.top + attributes.dialRadius,
                                    positionX = (isTouch ? $event.originalEvent.touches[0] : $event).pageX - startX,
                                    positionY = (isTouch ? $event.originalEvent.touches[0] : $event).pageY - startY,
                                    circle = Math.sqrt(positionX * positionX + positionY * positionY);

                                    if (circle < attributes.radius - attributes.tickRadius || 
                                        circle > attributes.radius + attributes.tickRadius) {
                                            return;
                                    } // No se presiona click sobre componente que definen hora o minutos
                                    
                                $event.preventDefault();
                                
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
                            };
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
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addChildren(
                            softtion.html("div").addClass("box").
                                addChildren(
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
                            time: "=ngModel",
                            label: "@",
                            autoStart: "@"
                        },
                        controller: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                box = dialog.find(".box"),
                                backdrop = dialog.find(".backdrop");
                            
                            if (softtion.isDate($scope.time)) {
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
                            selectMultiple: "@?selectMultiple",
                            selection: "=?ngModel",
                            list: "=rowsData",
                            selectAll: "=?selectAll",
                            clickSelectAll: "=?clickSelectAll",
                            clickSelect: "=?clickSelect",
                            countSelect: "=?countSelect"
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
                                        
                                        if (softtion.isDefined(selectedSimple)) {
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
                        addChildren(
                            softtion.html("div").addClass("year").
                                setText("{{year}}").
                                addAttribute("ng-class","{active : enabledSelectYear}").
                                addAttribute("ng-click","activeYear(true)")
                        ).
                        addChildren(
                            softtion.html("div").addClass("day").
                                setText("{{describeDaySelect()}}").
                                addAttribute("ng-class","{active : !enabledSelectYear}").
                                addAttribute("ng-click","activeDay()")
                        );
                
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("month").
                                addAttribute("ng-hide","(enabledSelectYear || enabledSelectMonth)").
                                addChildren(
                                    softtion.html("div").addClass("button-left").
                                        addAttribute("ng-class", "{disabled: prevMonthEnabled()}").
                                        addAttribute("ng-click", "changedMonth(false)").
                                        addChildren(
                                            softtion.html("i").addClass("material-icon").
                                                setText("chevron_left")
                                        )
                                ).
                                addChildren(
                                    softtion.html("div").addClass("button-right").
                                        addAttribute("ng-class", "{disabled: nextMonthEnabled()}").
                                        addAttribute("ng-click", "changedMonth(true)").
                                        addChildren(
                                            softtion.html("i").addClass("material-icon").
                                                setText("chevron_right")
                                        )
                                ).
                                addChildren(
                                    softtion.html("div").addClass("name").
                                        addAttribute("ng-click", "activeMonth(true)").
                                        setText("{{monthText}}")
                                )
                        ).
                        addChildren(
                            softtion.html("table").addClass(["days-month", "animate", "easing-out"]).
                                addAttribute("ng-hide","(enabledSelectYear || enabledSelectMonth)").
                                addChildren(
                                    softtion.html("thead").append("<th>Do</th>").
                                        append("<th>Lu</th>").append("<th>Ma</th>").
                                        append("<th>Mi</th>").append("<th>Ju</th>").
                                        append("<th>Vi</th>").append("<th>Sa</th>")
                                ).addChildren(
                                    softtion.html("tbody").
                                        addChildren(
                                            softtion.html("tr").addClass("week").
                                                addAttribute("ng-repeat", "week in daysMonth").
                                                addChildren(
                                                    softtion.html("td").addClass("day").
                                                        addAttribute("ng-class","{disabled : dayDisabled(day.value)}").
                                                        addAttribute("ng-repeat", "day in week").
                                                        addAttribute("ng-click", "selectDay(day.value, $event)").
                                                        setText("{{day.value}}")
                                                )
                                        )
                                )
                        ).
                        addChildren(
                            softtion.html("div").addClass("months").addAttribute("ng-hide","!enabledSelectMonth").
                                addChildren(
                                    softtion.html("ul").
                                        addChildren(
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
                        addChildren(
                            softtion.html("div").addClass("year").addAttribute("ng-hide","!enabledSelectYear").
                                addChildren(
                                    softtion.html("ul").
                                        addChildren(
                                            softtion.html("li").
                                                addAttribute("ng-repeat","year in years").
                                                setText("{{year}}").
                                                addAttribute("ng-click","selectYear(year)").
                                                addAttribute("ng-class","{active : isYearActive(year)}")
                                        )
                                )
                        );
                        
                    var actions = softtion.html("div").addClass("actions").
                        addChildren(
                            softtion.html("button").
                                addClass(["flat", "ripple"]).
                                setText("Ok").
                                addAttribute("ng-click","setDate()")
                        ).
                        addChildren(
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
                    
                    if (!softtion.isArrayEmpty(week)) {
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
                            dateSelect: "=?",
                            cancelSelect: "=?",
                            minDate: "@",
                            maxDate: "@",
                            yearRange: "@"
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
                                $scope.year, $scope.month, dateDayStart.getDay(), countDaysMonths[$scope.month]
                            );
                    
                            $scope.months = [
                                { name: "Enero", value: 0 }, { name: "Febrero", value: 1 },
                                { name: "Marzo", value: 2 }, { name: "Abril", value: 3 },
                                { name: "Mayo", value: 4 }, { name: "Junio", value: 5 },
                                { name: "Julio", value: 6 }, { name: "Agosto", value: 7 },
                                { name: "Septiembre", value: 8 }, { name: "Octubre", value: 9 },
                                { name: "Noviembre", value: 10 }, { name: "Diciembre", value: 11 }
                            ];
                    
                            $scope.minDate = (softtion.isDate($scope.minDate)) ?
                                $scope.minDate.normalize("date") : undefined;
                    
                            $scope.maxDate = (softtion.isDate($scope.maxDate)) ?
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
                                if (softtion.isDate($scope.minDate)) {
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
                                if (softtion.isDate($scope.maxDate)) {
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
                                if (softtion.isUndefined($scope.minDate) &&
                                    softtion.isUndefined($scope.maxDate)) {
                                    return false;
                                } // Se permite todos los meses
                                
                                if (softtion.isDate($scope.minDate)) {
                                    var minYear = $scope.minDate.getFullYear(),
                                        minMonth = $scope.minDate.getMonth();
                                    
                                    if (minYear > $scope.year) {
                                        return true;
                                    } else if (minYear === $scope.year) {
                                        return (minMonth > month);
                                    }
                                } // Comparando con la fecha mínima
                                
                                if (softtion.isDate($scope.maxDate)) {
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
                                var dateDescribe = (softtion.isDate($scope.date)) ?
                                    $scope.date : new Date().normalize("date");
                                
                                var describe = nameDaysWeek[dateDescribe.getDay()];
                                describe += ", " + nameMonthsMin[dateDescribe.getMonth()];
                                describe += " " + dateDescribe.getDate();
                                describe += " del " + dateDescribe.getFullYear();
                                
                                return describe; // Retorna descripción de Fecha
                            };
                            
                            $scope.dayDisabled = function (day) {
                                if (softtion.isUndefined(day)) {
                                    return true;
                                } // El dia del componente es inválido
                                
                                if (!softtion.isDate($scope.minDate) && 
                                    !softtion.isDate($scope.maxDate)) {
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
                                
                                if (softtion.isFunction($scope.dateSelect)) {
                                    $scope.dateSelect($scope.date);
                                } // Se ha establecido metodo para seleccionar Fecha
                            };
                            
                            $scope.cancel = function () {
                                if (softtion.isFunction($scope.cancelSelect)) {
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
                        addAttribute("click-event","clickEvent").
                        addAttribute("icon","{{icon}}").
                        addAttribute("placeholder","{{placeholder}}");
                    
                    var dialog = softtion.html("div").addClass("dialog").
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addChildren(
                            softtion.html("div").addClass("box").
                                addChildren(
                                    softtion.html("div").addClass("datepicker").
                                        addAttribute("ng-model","datePicker").
                                        addAttribute("date-select","dateSelect").
                                        addAttribute("cancel-select","cancelSelect").
                                        addAttribute("min-date","{{minDate}}").
                                        addAttribute("max-date","{{maxDate}}").
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
                            autoStart: "@autoStart",
                            minDate: "@",
                            maxDate: "@",
                            yearRange: "@",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                box = dialog.find(".box"),
                                backdrop = dialog.find(".backdrop");
                            
                            if (softtion.isDate($scope.date)) {
                                $scope.text = $scope.date.getFormat("ww, dd del mn de aa");
                            } else if (softtion.parseBoolean($scope.autoStart)) {
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
                buttonAction: function () {
                    return softtion.html("button").addClass(["action"]).
                        addChildren(
                            softtion.html("i").setText("expand_more")
                        ).create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var header = $element.find(".header"),
                                body = $element.find(".body");
                            
                            if (body.exists()) {
                                var content = body.find(".content"),
                                    button = angular.element(
                                        Material.components.ExpansionPanel.buttonAction()
                                    ),
                                    icon = button.find("i");
                                
                                header.append(button); // Agregando icono al Header

                                header.click(function () {
                                    var marginTop = (-1 * content.innerHeight()),
                                        bodyStart = body.hasClass("start");
                                    
                                    if (!bodyStart) {
                                        content.css("margin-top", marginTop); body.addClass("start");
                                    } // Componente no se encuentra iniciado
                                    
                                    $element.siblings("li").removeClass("active");
                                    $element.siblings("li").find(".action").find("i").removeClass("active");
                                    $element.toggleClass("active"); // Cambiando estado

                                    if ($element.hasClass("active")) {
                                        icon.addClass("active");
                                    } else {
                                        icon.removeClass("active"); content.css("margin-top", marginTop);
                                    } // Cerrando content del Expansion
                                });
                            } // El componente no tiene contenedor
                        }
                    };
                }
            },
            
            FlexibleBox: {
                name: "flexibleBox",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var banner = $element.children(".banner"),
                                box = $element.children(".box"),
                                toolbar = banner.children(".toolbar"),
                                title = toolbar.children(".title");
                        
                            var height = banner.height();

                            box.scroll(function () {
                                var scroll = angular.element(this).scrollTop();

                                var opacity = scroll / height, margin = height - scroll - 56,
                                    heightBanner = height - scroll;

                                heightBanner = (heightBanner < 56) ? 56 : heightBanner;
                                margin = (margin < 0) ? 0 : margin;
                                opacity = (heightBanner === 56) ? 1 : (opacity > 1) ? 1 : opacity;

                                var fontSize = 28 - (opacity * 8); banner.css("height", heightBanner);

                                toolbar.css("background-color", "rgba(156, 39, 176, " + opacity + ")");

                                title.css({marginTop: margin, fontSize: fontSize});
                            });
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
                                    img.css("width", "100%") : img.css("height", "100%");
                            }
                        }
                    };
                }
            },
            
            ProgressCircular: {
                route: "softtion/template/progress-circular.html",
                name: "progressCircular",
                html: function () {
                    return softtion.html("svg").addAttribute("viewBox","0 0 66 66").
                        addChildren(softtion.html("circle")).create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ProgressCircular.route,
                        link: function ($scope, $element) { }
                    };
                }
            },
            
            RadioButton: {
                route: "softtion/template/radiobutton.html",
                name: "radiobutton",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","radio").
                        addAttribute("ng-model","model").
                        addAttribute("ng-value","value").
                        addAttribute("name","{{name}}").
                        addAttribute("ng-disabled","ngDisabled");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel()");
                
                    var ripple = softtion.html("div").addClass("ripple-content").
                        addChildren(
                            softtion.html("div").addClass("box")
                        );

                    return input + label + ripple; // RadioButton
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.RadioButton.route,
                        scope: {
                            model: "=ngModel",
                            value: "=ngValue",
                            name: "@",
                            label: "@",
                            ngDisabled: "@"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='radio']");

                            $scope.clickLabel = function () { 
                                if (!$scope.ngDisabled) {
                                    $scope.model = $scope.value; input.focus();
                                } // No se permite el cambio de la Propiedad
                            };
                        }
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
            
            Select: {
                route: "softtion/template/select.html",
                name: "select",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-readonly","true").
                        addAttribute("ng-click", "toggleSuggestions()").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("value","{{inputValue}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").addClass(["truncate"]);

                    var button = softtion.html("button").addClass("action").
                            addChildren(
                                softtion.html("i").addClass("action-icon").setText("expand_more")
                            ).
                            addAttribute("ng-hide", "ngDisabled").
                            addAttribute("tabindex","-1").
                            addAttribute("ng-click","toggleSuggestions()");

                    var list = softtion.html("ul").
                        addChildren(
                            softtion.html("li").addClass(["truncate", "clear-suggestion"]).
                                addAttribute("ng-if","clearSuggestion").
                                setText("Remover selección").
                                addAttribute("ng-hide", "!select").
                                addAttribute("ng-click","clearSelection()")
                        ).
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestions").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-click","setSelection(suggestion, $event)").
                                setText("{{getSuggestionDescription(suggestion)}}")
                        );

                    return input + lineShadow + label + button + list; // Componente
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Select.route,
                        scope: {
                            select: "=ngModel", 
                            label: "@",
                            keyDescription: "@",
                            suggestions: "=",
                            ngDisabled: "@",
                            clearSuggestion: "@",
                            disabledAutoclose: "@",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var label = $element.find("label"),
                                input = $element.find("input"),
                                button = $element.find("button"),
                                buttonIcon = button.find("i"),
                                list = $element.find("ul");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input
                                
                            var showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select", closeSelect);
                                } // No se permite cerrado automatico
                                
                                list.addClass("active"); buttonIcon.addClass("active"); 
                                $element.addClass("active"); // Visualizando opciones
                            };
                            
                            var hideSuggestions = function () {
                                list.removeClass("active"); buttonIcon.removeClass("active"); 
                                $element.removeClass("active"); // Ocultando opciones
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select", closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            var closeSelect = function (ev) {
                                if (label.is(ev.target) || input.is(ev.target) || 
                                    button.is(ev.target) || buttonIcon.is(ev.target) ||
                                    $element.is(ev.target) || list.is(ev.target)) {
                                    return;
                                } // Se ha realizado click sobre el componente de Selección
                                
                                hideSuggestions(); // Ocultando opciones
                            };
                            
                            $scope.getSuggestionDescription = function (suggestion) {
                                if (softtion.isString(suggestion)) {
                                    return suggestion;
                                } else if (softtion.isString($scope.keyDescription)) {
                                    return softtion.findKey(suggestion, $scope.keyDescription);
                                } else {
                                    return JSON.stringify(suggestion);
                                } // No se definido nada
                            };

                            if (softtion.isDefined($scope.select)) {
                                $scope.inputValue = $scope.getSuggestionDescription($scope.select);
                                $element.addClass("active"); label.addClass("active");
                            } // Hay un opcion seleccionada por defecto

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () {
                                if (softtion.isUndefined($scope.select)) {
                                    $element.removeClass("active"); label.removeClass("active"); 
                                } // No ha seleccionado ninguna de las opciones
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? hideSuggestions() : showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.setSelection = function (suggestion, $event) {
                                label.addClass("active"); list.find("li").removeClass("active"); 
                                $scope.inputValue = $scope.getSuggestionDescription(suggestion); 
                                angular.element($event.currentTarget).addClass("active"); 
                                
                                $scope.select = suggestion; hideSuggestions(); // Ocultando opciones
                            };
                            
                            $scope.clearSelection = function () {
                                label.removeClass("active"); $scope.select = undefined;  
                                list.find("li").removeClass("active"); 
                                $scope.inputValue = undefined; hideSuggestions();
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
                        addAttribute("ng-click","toggleSuggestions()").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-readonly","true").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("value","{{inputValue}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").addClass(["truncate"]);

                    var button = softtion.html("button").addClass("action").
                        addChildren(
                            softtion.html("i").addClass("action-icon").setText("expand_more")
                        ).addAttribute("ng-hide", "ngDisabled").
                        addAttribute("ng-click","toggleSuggestions()");

                    var list = softtion.html("ul").
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestions").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-class", "{active: suggestion.checked}").
                                addAttribute("ng-click","checkedSuggestion(suggestion, $index, $event)").
                                setText("{{getSuggestionDescription(suggestion)}}").
                                addChildren(
                                    softtion.html("div").addClass("checkbox-control").
                                        addAttribute("prevent-default", "true").
                                        addAttribute("ng-model", "suggestion.checked")
                                )
                        );

                    return input + lineShadow + label + button + list; // Componente
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
                            label: "@",
                            ngDisabled: "@",
                            keyDescription: "@",
                            suggestions: "=",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"),
                                label = $element.find("label"),
                                button = $element.find("button"),
                                buttonIcon = button.find("i"),
                                list = $element.find("ul");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input
                        
                            // Atributos
                            var valueSelects = Material.components.SelectMultiple.valueSelects;
                        
                            $scope.selects = $scope.selects || {};

                            angular.forEach($scope.suggestions, function (item, index) {
                                if (item.checked) {
                                    $scope.selects[index] = item;
                                } // Item ya esta seleccionado por defecto
                            });
                            
                            if (Object.keys($scope.selects).length > 0) {
                                label.addClass("active"); 
                            } // No ha seleccionado ninguna de las opciones
                            
                            $scope.inputValue = valueSelects($scope.selects, $scope.keyDescription);
                            
                            var showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select-multiple", closeSelect);
                                } // No se permite cerrado automatico
                                
                                list.addClass("active"); buttonIcon.addClass("active"); 
                                $element.addClass("active"); // Visualizando opciones
                            };
                            
                            var hideSuggestions = function () {
                                list.removeClass("active"); buttonIcon.removeClass("active"); 
                                $element.removeClass("active"); // Ocultando opciones
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select-multiple", closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            var closeSelect = function (ev) {
                                if (label.is(ev.target) || input.is(ev.target) || 
                                    button.is(ev.target) || buttonIcon.is(ev.target) ||
                                    $element.is(ev.target) || list.is(ev.target)) {
                                    return;
                                } // Se ha realizado click sobre el componente de Selección
                                
                                hideSuggestions(); // Ocultando opciones
                            };

                            $scope.clickLabel = function (ev) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () {
                                if (Object.keys($scope.selects).length === 0) {
                                    $element.removeClass("active"); label.removeClass("active");
                                } // No ha seleccionado ninguna de las opciones
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? hideSuggestions() : showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.checkedSuggestion = function (suggestion, $index, $event) {
                                suggestion.checked = !suggestion.checked;
                                
                                if (suggestion.checked) {
                                    $scope.selects[$index] = suggestion;
                                } else {
                                    softtion.removeKey($scope.selects, $index);
                                } // Eliminando opción

                                $scope.inputValue = valueSelects($scope.selects, $scope.keyDescription);
                                
                                (Object.keys($scope.selects).length > 0) ? 
                                    label.addClass("active") : label.removeClass("active"); 
                                    
                                $event.stopPropagation();
                            };
                            
                            $scope.getSuggestionDescription = function (suggestion) {
                                return !(softtion.isString($scope.keyDescription)) ?
                                    JSON.stringify(suggestion) : softtion.findKey(suggestion, $scope.keyDescription); 
                            };
                        }
                    };
                }
            },
            
            SidenavItem: {
                name: "sidenavItem",
                buttonAction: function () {
                    return softtion.html("button").addClass(["action"]).
                        addChildren(
                            softtion.html("i").setText("expand_more")
                        ).create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            // Componentes
                            var options = $element.find(".options");
                            
                            if (options.exists()) {
                                var ul = options.find("ul"),
                                    button = angular.element(
                                        Material.components.SidenavItem.buttonAction()
                                    ),
                                    icon = button.find("i");
                                
                                ul.css("margin-top", (ul[0].clientHeight * -1));
                                $element.find(".detail > a").append(button); // Agregando icono

                                $element.find(".detail").click(function () {
                                    var marginTop = (-1 * ul.innerHeight()), isStart = options.hasClass("active");
                                    
                                    if (!isStart) {
                                        ul.css("margin-top", marginTop); options.addClass("active");
                                    } // Componente no se encuentra iniciado
                                    
                                    $element.toggleClass("active"); // Cambiando estado

                                    if ($element.hasClass("active")) {
                                        icon.addClass("active");
                                    } else {
                                        icon.removeClass("active"); ul.css("margin-top", (-1 * ul.innerHeight()));
                                    } // Cerrando content del Expansion
                                });
                            } // El item contiene opciones
                        }
                    };
                }
            },
            
            Switch: {
                route: "softtion/template/switch.html",
                name: "switch",
                html: function () {
                    var label = softtion.html("label").
                        addChildren(
                            softtion.html("input", false).addAttribute("type","checkbox").
                                addAttribute("ng-model","checked").
                                addAttribute("ng-disabled","ngDisabled")
                        ).addChildren(
                            softtion.html("span").addClass("track")
                        );                   

                    return label.create(); // Switch
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Switch.route,
                        scope: {
                            checked: "=ngModel",
                            ngDisabled: "@"
                        },
                        link: function ($scope, $element) {
                            
                        }
                    };
                }
            },
            
            Tab: {
                name: "tabs",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            view: "@viewBox",
                            disabledPositionStart: "@disabledPositionStart"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var view = angular.element($scope.view),
                                indexActive = 0, index = 0,
                                tabs = $element.find(".tab"),
                                stripe = angular.element(
                                    softtion.html("div").addClass("stripe").create()
                                );
                            
                            if (tabs.exists()) {
                                tabs.attr("tabindex", "-1"); // Haciendo componentes enfocables
                                
                                if ($element.hasClass("fixed")) {
                                    tabs.css("width", (100 / tabs.length) +"%");
                                }

                                angular.forEach(tabs, function (option) { 
                                    angular.element(option).data("position", index); index++;
                                });
                                
                                var optionActive = $element.find(".tab.active:first");
                                
                                if (!optionActive.exists()) {
                                    optionActive = angular.element(tabs[0]).addClass("active");
                                } // No se establecio pestaña activa inicialmente
                                
                                var widthBar = optionActive.outerWidth(),
                                    leftBar = optionActive.position().left;
                                
                                angular.element(optionActive.attr("view-tab")).addClass("active");
                                stripe.css({ width: widthBar, left: leftBar });
                                
                                tabs.click(function () {
                                    var option = angular.element(this);
                                    
                                    var position = option.data("position"),
                                        left = option[0].offsetLeft,
                                        width = option[0].clientWidth;
                                    
                                    stripe.css({ width: width, left: left });
                            
                                    if (option.hasClass("active")) {
                                        return;
                                    } // Este componente ya se encuentra activo
                                    
                                    tabs.removeClass("active"); option.addClass("active");
                                    
                                    if (!$scope.disabledPositionStart) {
                                        angular.element(".app-content").scrollTop(0); 
                                    } // No es necesario subir vista
                                    
                                    if (left < $element.scrollLeft()) {
                                        $element.animate({ scrollLeft: left }, 175, "standardCurve"); 
                                    } else {
                                        var viewTab = $element.scrollLeft() + window.innerWidth;
                                        
                                        if (viewTab < (left + width)) {
                                            $element.animate({ scrollLeft: left }, 175, "standardCurve"); 
                                        }
                                    } // Reubicando vista del contenedor en pestaña

                                    var slideRight = (position > indexActive); indexActive = position;

                                    var viewTab = view.find(option.attr("view-tab"));
                                    
                                    if (!viewTab.hasClass("active")) {
                                        var viewActive = view.find(".content.active");

                                        if (viewActive.exists()) {
                                            viewActive.removeClass("active").removeClass("opacity-bottom"); 
                                        } // Removiendo clase activa a la Opcion anterior
                                        
                                        (slideRight) ?
                                            viewTab.addClass("active").
                                                removeClass("slide-in-left").
                                                addClass("slide-in-right") :

                                            viewTab.addClass("active").
                                                removeClass("slide-in-right").
                                                addClass("slide-in-left");
                                    } // El componente actualmente esta oculto
                                });
                            } // Exiten cabeceras en el componente
                    
                            $element.append(stripe); // Agregando componente selector
                        }
                    };
                }
            },
            
            TextArea: {
                route: "softtion/template/textarea.html",
                name: "textarea",
                defineTextHidden: function (textarea, texthidden) {
                    var $fontFamily = textarea.css("font-family"),
                        $fontSize = textarea.css("font-size"),
                        $lineHeight = textarea.css("line-height");

                    texthidden.css("font-family",$fontFamily);
                    texthidden.css("font-size",$fontSize);
                    texthidden.css("line-height",$lineHeight);
                },
                autoResize: function (textarea, texthidden) {
                    texthidden.html(textarea.val()); textarea.css('height', texthidden.height());
                },
                html: function () {
                    var $textArea = softtion.html("textarea").
                        addAttribute("ng-model","areaValue").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea()").
                        addAttribute("ng-focus","focusArea()").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("placeholder","{{placeholder}}");

                    var $lineShadow = softtion.html("div").addClass("line-shadow");

                    var $label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addChildren(
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
                            areaValue: "=?ngValueArea", 
                            label: "@", 
                            type: "@",
                            required: "@",
                            ngDisabled: "@",
                            ngReadonly: "@",
                            minLength: "@",
                            maxLength: "@",
                            clickEvent: "=?",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(area); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input

                            // Atributos de control
                            var defineTextHidden = Material.components.TextArea.defineTextHidden,
                                autoResize = Material.components.TextArea.autoResize,
                                tempMinLength = parseInt($scope.minLength),
                                minLength = (isNaN(tempMinLength)) ? -1 : tempMinLength,
                                maxLength = parseInt($scope.maxLength);

                            defineTextHidden(area, hidden); $scope.hideSpan = true;
                            $scope.areaValue = ""; // Valor inicial del Area

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); $scope.areaValue = $scope.value;
                                
                                autoResize(area, hidden); // Definiendo tamaño del Area
                            } // Se ha definido un valor

                            $scope.clickLabel = function (ev) {
                                area.focus(); // Se activa el componente 
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickArea = function (ev) {
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusArea = function () { $element.addClass("active"); };

                            $scope.blurArea = function () {
                                if (!softtion.isString($scope.areaValue)) {
                                    $element.removeClass("active"); // Componente sin texto

                                    if ($scope.required) {
                                        area.siblings("span").html("Este campo es requerido"); 
                                        $scope.value = undefined; $element.addClass("error"); $scope.hideSpan = false;
                                    }
                                } else if($scope.areaValue.length < minLength) {
                                    area.siblings("span").html("Es campo requiere minimo " + minLength + " caracteres"); 
                                    $scope.value = undefined; $element.addClass("error"); $scope.hideSpan = false; 
                                } else { 
                                    $scope.value = $scope.areaValue; $scope.hideSpan = true; $element.removeClass("error"); 
                                }

                                autoResize(area, hidden); // Cambiando tamaño del componente
                            };

                            $scope.keypressArea = function (ev) {
                                var validate = softtion.validateCharacter({
                                    keyCode: ev.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.areaValue
                                });

                                if (!validate) { ev.preventDefault(); } // Cancelando el evento
                                
                                if (!isNaN(maxLength)) {
                                    if ($scope.areaValue.length === maxLength) {
                                        ev.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
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
                        addAttribute("ng-click","clickInput($event)").
                        addAttribute("ng-blur","blurInput()").
                        addAttribute("ng-focus","focusInput()").
                        addAttribute("ng-keypress","keypressInput($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-model","inputValue").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-click","clickLabel($event)").
                        addChildren(
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
                            inputValue: "=?ngValueInput", 
                            label: "@", 
                            type: "@",
                            required: "@",
                            ngDisabled: "@",
                            ngReadonly: "@",
                            minLength: "@",
                            maxLength: "@",
                            clickEvent: "=?",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input

                            // Atributos de control
                            var tempMinLength = parseInt($scope.minLength),
                                minLength = (isNaN(tempMinLength)) ? -1 : tempMinLength,
                                maxLength = parseInt($scope.maxLength);

                            $scope.hideSpan = true; $scope.inputValue = "";
                            $scope.typeInput = Material.components.TextField.defineInput($scope.type);

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); $scope.inputValue = $scope.value;
                            } // Se ha definido un valor

                            $scope.clickLabel = function (ev) { 
                                input.focus(); // Enfocando el input
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                            
                            $scope.clickInput = function (ev) {
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };

                            $scope.focusInput = function () { $element.addClass("active"); };

                            $scope.blurInput = function () {
                                if (!softtion.isString($scope.inputValue)) {
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
                                
                                if (!isNaN(maxLength)) {
                                    if ($scope.inputValue.length === maxLength) {
                                        ev.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
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
                        addAttribute("ng-model","value").
                        addAttribute("placeholder","{{placeholder}}");

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
                            label: "@", 
                            clickEvent: "=?",
                            icon: "@",
                            placeholder: "@"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input");
                            
                            if (softtion.isDefined($scope.icon) && $element.hasClass("icon-label")) {
                                var icon = softtion.html("i").addClass("material-icon").setText($scope.icon);
                                angular.element(icon.create()).insertAfter(input); $element.addClass("icon-active");
                            } // Se debe insertar el icono antes del input
                            
                            $scope.clickInput = function (ev) {
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent(ev);
                                } // Se ha definido callback para Click
                            };
                        }
                    };
                }
            },
            
            Tooltip: {
                name: "tooltip",
                container: function () {
                    return softtion.html("div").addClass("tooltip-container").create();
                },
                element: function () {
                    return softtion.html("div").addClass("tooltip-element").create();
                },
                directive: function () {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var body = angular.element(document.body),
                                container = body.find(".tooltip-container");
                            
                            if (!container.exists()) {
                                container = angular.element(Material.components.Tooltip.container());
                        
                                body.append(container); // Agegando contenedor
                            } // Contenedor tooltip no se encuentra creado en el documento
                            
                            var tooltip = angular.element(Material.components.Tooltip.element());
                            
                            tooltip.html($attrs.tooltip); container.append(tooltip); // Agregando
                            
                            $element.mouseenter(function () {
                                //container.html($attrs.tooltip);
                                
                                var widthContainer = tooltip.innerWidth(),
                                    heightElement = $element.innerHeight(),
                                    positionX = $element.offset().left,
                                    positionY = $element.offset().top,
                                    widthElement = $element.innerWidth();
                                    
                                var left = (widthElement / 2) - (widthContainer / 2) + positionX,
                                    top = positionY + heightElement;
                                    
                                if (left < 8) { left = 8; }
                                
                                tooltip.css({ left: left, top: top, display: "block" }).addClass("show");
                            });
                            
                            $element.mouseout(function () { tooltip.css({ display: "none" }).removeClass("show"); });
                        }
                    };
                }
            }
        },
        
        providers: {
            Alert: {
                name: "$alert",
                method: function () {
                    // Propiedades del proveedor
                    var Properties = {
                        // Elementos
                        dialog: undefined, 
                        backdrop: undefined,
                        box: undefined, 
                        title: undefined, 
                        content: undefined,
                        actions: undefined,
                        positiveButton: undefined,
                        negativeButton: undefined,
                        
                        // Propiedades
                        backdropEnabled: false,
                        positiveFunction: undefined,
                        negativeEnabled: true,
                        negativeFunction: undefined
                    };
                    
                    var Alert = function () {
                        var self = this; // Objeto Alert

                        Properties.dialog = angular.element(
                            softtion.html("div").addClass("dialog").create()
                        );

                        Properties.backdrop = angular.element(
                            softtion.html("div").addClass("backdrop").create()
                        );

                        Properties.box = angular.element(
                            softtion.html("div").addClass("box").create()
                        );

                        Properties.title = angular.element(
                            softtion.html("div").addClass("title").create()
                        );

                        Properties.content = angular.element(
                            softtion.html("div").addClass("content").create()
                        );

                        Properties.actions = angular.element(
                            softtion.html("div").addClass("actions").create()
                        );

                        Properties.positiveButton = angular.element(
                            softtion.html("button").addClass(["flat","positive"]).create()
                        );

                        Properties.negativeButton = angular.element(
                            softtion.html("button").addClass(["flat","negative"]).create()
                        );

                        Properties.dialog.append(Properties.backdrop);
                        Properties.box.append(Properties.title);
                        Properties.box.append(Properties.content);
                        Properties.actions.append(Properties.positiveButton);
                        Properties.actions.append(Properties.negativeButton);
                        Properties.box.append(Properties.actions);
                        Properties.dialog.append(Properties.box);

                        Properties.backdrop.click(function () { 
                            if (Properties.backdropEnabled) {
                                self.hide(); 
                            } // Cerrando dialog con el Backdrop
                        });

                        Properties.positiveButton.click(function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.isFunction(Properties.positiveFunction)) {
                                Properties.positiveFunction(); 
                            } // Se establecío función para proceso Positivo
                        });

                        Properties.negativeButton.click(function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.isFunction(Properties.negativeFunction)) {
                                Properties.negativeFunction(); 
                            } // Se establecío función para proceso Negativo
                        });

                        angular.element(document.body).append(Properties.dialog);
                    };

                    Alert.prototype.title = function (title) {
                        if (softtion.isString(title)) {
                            Properties.title.html(title); 
                            Properties.title.removeClass("hidden");
                        } else {
                            Properties.title.addClass("hidden");
                        }
                        
                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.content = function (content) {
                        Properties.content.html(content); return this;
                    };

                    Alert.prototype.positiveLabel = function (label) {
                        Properties.positiveButton.html(label); return this;
                    };

                    Alert.prototype.negativeLabel = function (label) {
                        Properties.negativeButton.html(label); return this;
                    };
                    
                    Alert.prototype.negativeEnabled = function (enabled) {
                        Properties.negativeEnabled = enabled; return this;
                    };

                    Alert.prototype.backdropEnabled = function (enabled) {
                        Properties.backdropEnabled = enabled; return this;
                    };

                    Alert.prototype.positiveFunction = function (positiveFunction) {
                        Properties.positiveFunction = positiveFunction; return this;
                    };

                    Alert.prototype.negativeFunction = function (negativeFunction) {
                        Properties.negativeFunction = negativeFunction; return this;
                    };

                    Alert.prototype.settings = function (options) {
                        var $options = {
                            title: "", content: "",
                            positiveLabel: "Aceptar",
                            negativeLabel: "Cancelar",
                            enabledBackdrop: false,
                            positiveFunction: undefined,
                            negativeFunction: undefined
                        };
                        
                        angular.extend($options, options); 
                        
                        this.title($options.title); this.content($options.content);
                        this.positiveLabel($options.positiveLabel);
                        this.negativeLabel($options.negativeLabel);
                        this.backdropEnabled($options.enabledBackdrop);
                        this.positiveFunction($options.positiveFunction);
                        this.negativeFunction($options.negativeFunction);

                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.show = function () {
                        if (!Properties.dialog.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            (Properties.negativeEnabled) ?
                                Properties.negativeButton.removeClass("hidden") :
                                Properties.negativeButton.addClass("hidden");
                            
                            
                            Properties.dialog.addClass("active"); 
                            Properties.backdrop.fadeIn(175); Properties.box.addClass("show");
                        } // Dialog no se encuentra activo
                    };

                    Alert.prototype.hide = function () {
                        if (Properties.dialog.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            Properties.dialog.removeClass("active"); 
                            Properties.backdrop.fadeOut(175); Properties.box.removeClass("show");
                        } // Dialog se encuentra activo
                    };
                    
                    var alert = new Alert();
                    
                    this.$get = function () { return alert; };
                }
            },
            
            BottomSheet: {
                name: "$bottomSheet",
                method: function () {
                    var Properties = {
                        component: undefined, content: undefined, backdrop: undefined
                    };
                    
                    var BottomSheet = function () {};

                    BottomSheet.prototype.set = function (sheetID) {
                        var self = this; // Componente
                        
                        Properties.component = angular.element(sheetID);
                        
                        if (Properties.component.exists()) {
                            Properties.content = Properties.component.children(".content:first");
                            Properties.backdrop = Properties.component.children(".backdrop");

                            Properties.backdrop.click(function () { self.hide(); });
                        } // Componente existe en el Documento
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    BottomSheet.prototype.show = function () {
                        if (Properties.component.exists()) {
                            var appContent = Properties.component.parents(".app-content");
                            
                            var isContent = (appContent.exists()) ? true : false,
                                content = (appContent.exists()) ? appContent :  
                                    angular.element(document.body);
                            
                            if (!Properties.component.hasClass("active")) {
                                content.addClass("overflow-none");
                                
                                if (isContent) {
                                    Properties.content.addClass("show");
                                } else {
                                    Properties.content.addClass("show-content");
                                    Properties.content.css("margin-bottom", content.scrollTop());
                                }
                                
                                Properties.component.addClass("active"); 
                                Properties.backdrop.fadeIn(325, "standardCurve"); 
                            } // Componente no se encuentra activo en la Aplicación
                        }
                    };

                    BottomSheet.prototype.hide = function () {
                        if (Properties.component.exists()) {
                            var appContent = Properties.component.parents(".app-content");
                            
                            var isContent = (appContent.exists()) ? true : false,
                                content = (appContent.exists()) ? appContent :  
                                    angular.element(document.body);
                            
                            if (Properties.component.hasClass("active")) {
                                content.removeClass("overflow-none");

                                (isContent) ?
                                    Properties.content.removeClass("show") :
                                    Properties.content.removeClass("show-content");

                                var marginBottom = Properties.content.outerHeight();
                                Properties.content.css("margin-bottom", (marginBottom * -1) - 1);

                                Properties.component.removeClass("active"); 
                                Properties.backdrop.fadeOut(325, "standardCurve"); 
                            } // Componente se encuentra activo en la Aplicación
                        }
                    };
                    
                    var bottomSheet = new BottomSheet();

                    this.$get = function () { return bottomSheet; };
                }
            },
            
            Dropdown: {
                name: "$dropdown",
                handler: {
                    hide: function (dropdown) {
                        dropdown.removeClass("active"); 
                    },
                    show: function (properties) {
                        properties.component.addClass("active"); // Activando dropdown
                        
                        var dropdown = properties.component, origin = properties.origin;
                        
                        var heightDropdown = dropdown.innerHeight(),
                            widthDropdown = dropdown.innerWidth(),
                            
                            heightOrigin = (origin) ? origin.innerHeight() : 0, 
                            widthOrigin = (origin) ? origin.innerWidth() : 0,
                            
                            posOriginY = (origin) ? (dropdown.hasClass("fixed")) ?
                                origin.fixed().top : origin.offset().top : 0,
                            posOriginX = (origin) ? (dropdown.hasClass("fixed")) ?
                                origin.fixed().left : origin.offset().left : 0,
                            
                            // Atributos finales del Dropdown
                            left, top, originEffect, transformOrigin = 0; 
                            
                        // Definiendo posicion eje X
                        if ((posOriginX + widthDropdown) <= (window.innerWidth + window.scrollX)) {
                            left = posOriginX; transformOrigin = transformOrigin + 1;
                        } 
                        else if ((posOriginX + widthOrigin - widthDropdown) > 0) {
                            transformOrigin = transformOrigin + 3;
                            left = posOriginX + widthOrigin - widthDropdown - 10; 
                        } else { 
                            transformOrigin = transformOrigin + 1; 
                            left = window.innerWidth - widthDropdown - 10; 
                        }

                        // Definiendo posicion eje Y
                        if (properties.belowOrigin) { 
                            if ((posOriginY + heightDropdown) <= (window.innerHeight + window.scrollY)) {
                                top = posOriginY; transformOrigin = transformOrigin + 4;
                            } 
                            else if ((posOriginY + heightOrigin - heightDropdown) > 0) {
                                transformOrigin = transformOrigin + 7;
                                top = posOriginY + heightOrigin - heightDropdown; 
                            } 
                            else { 
                                transformOrigin = transformOrigin + 4;
                                top = window.innerHeight - heightDropdown - 10;  
                            }
                        } else { 
                            if ((posOriginY + heightOrigin + heightDropdown) <= window.innerHeight) {
                                top = posOriginY + heightOrigin; transformOrigin = transformOrigin + 4;
                            } 
                            else if ((posOriginY - heightDropdown) > 0) {
                                top = posOriginY - heightDropdown; 
                                transformOrigin = transformOrigin + 7;
                            } 
                            else { 
                                transformOrigin = transformOrigin + 4; 
                                top = window.innerHeight - heightDropdown - 10;
                            }
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
                    var DropdownProperties = {
                        id: "", belowOrigin: true, component: undefined, origin: undefined
                    };
                    
                    var Dropdown = function () { };

                    Dropdown.prototype.set = function (dropdownID) { 
                        if (DropdownProperties.id !== dropdownID) {
                            DropdownProperties.id = dropdownID;
                            DropdownProperties.component = angular.element(dropdownID); 
                        } // Se ha definido nuevo dropdown
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    Dropdown.prototype.clear = function () {
                        DropdownProperties.component = undefined;
                        DropdownProperties.id = ""; return this;
                    };
                    
                    Dropdown.prototype.setBelowOrigin = function (belowOrigin) {
                        DropdownProperties.belowOrigin = belowOrigin; return this;
                    };

                    Dropdown.prototype.isActive = function () {
                        if (softtion.isDefined(DropdownProperties.component)) {
                            return DropdownProperties.component.hasClass("active");
                        } // Esta definido el Id del Dropdown

                        return false; // Se desconoce el Componente
                    };

                    Dropdown.prototype.show = function (origin) {
                        if (softtion.isDefined(DropdownProperties.component)) {
                            DropdownProperties.origin = origin; // Estableciendo origen
                            Material.providers.Dropdown.handler.show(DropdownProperties); 
                        } // Esta definido el dropdown en el Provedor
                    };

                    Dropdown.prototype.hide = function () {
                        if (this.isActive()) { 
                            Material.providers.Dropdown.handler.hide(DropdownProperties.component); 
                        } // Esta abierto el dropdown en el Provedor
                    };
                    
                    var dropdown = new Dropdown();

                    this.$get = function () { return dropdown; };
                    
                    this.clear = function () { dropdown.clear(); };
                }
            },
            
            FormNavigation: {
                name: "$formNavigation",
                method: function () {
                    var Properties = {
                        form: undefined, backdrop: undefined, content: undefined
                    };
                    
                    var FormNavigation = function () {};

                    FormNavigation.prototype.set = function (idPaneForm) {
                        var self = this; // Instancia del PaneForm
                        
                        Properties.form = angular.element(idPaneForm);

                        if (Properties.form.exists()) {
                            Properties.content = Properties.form.children(".content:first");
                            Properties.backdrop = Properties.form.children(".backdrop");

                            if (!Properties.backdrop.exists()) {
                                Properties.backdrop = angular.element(
                                    softtion.html("div").addClass("backdrop").create()
                                );

                                Properties.form.append(Properties.backdrop);
                                Properties.backdrop.click(function () { self.hide(); });
                            }
                        } // Existe el PaneForm en el documento
                        
                        return this; // Retornando interfaz fluida
                    };

                    FormNavigation.prototype.show = function () {
                        if (Properties.form.exists() && !Properties.form.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            Properties.content.removeClass("sharp-curve").removeClass("hide");
                            Properties.content.addClass("easing-out").addClass("show");
                            Properties.backdrop.fadeIn(300); Properties.form.addClass("active"); 
                        } // Sidenav no se encuentra activo
                    };

                    FormNavigation.prototype.hide = function () {
                        if (Properties.form.exists() && Properties.form.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            Properties.content.removeClass("easing-out").removeClass("show");
                            Properties.content.addClass("hide").addClass("sharp-curve");
                            Properties.backdrop.fadeOut(300); Properties.form.removeClass("active"); 
                        } // Sidenav no se encuentra activo
                    };
                    
                    var formNavigation = new FormNavigation();

                    this.$get = function () { return formNavigation; };
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
                                self.content = self.sidenav.children(".content:first");
                                self.backdrop = self.sidenav.children(".backdrop");

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
                    var Properties = {
                        scope: undefined, box: undefined, 
                        body: undefined, action: undefined
                    };
                    
                    var SnackBar = function () { 
                        Properties.body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );
                
                        Properties.action = angular.element(
                            softtion.html("div").addClass(["action"]).create()
                        );

                        Properties.box = angular.element(
                            softtion.html("div").addClass(["snackbar"]).create()
                        );

                        Properties.box.append(Properties.body); 
                        Properties.box.append(Properties.action);
                        
                        angular.element(".app-body").append(Properties.box);
                    };

                    SnackBar.prototype.show = function (text, optionsAction) {
                        var heightBody, self = this, // Snackbar
                            bottomNavigation = angular.element(".bottom-navigation");
                            
                        Properties.action.height(0); // Ocultando acción

                        if (!Properties.box.hasClass("active")) {
                            Properties.body.html(text); // Estableciendo texto
                            heightBody = parseInt(Properties.body.height());
                            
                            if (heightBody > 20) {
                                Properties.body.addClass("two-line");
                            } else {
                                Properties.body.removeClass("two-line");
                            } // Cuerpo es de una sola línea
                            
                            if (softtion.isDefined(optionsAction)) {
                                var span = "<span>" + optionsAction.label + "</span>";
                                Properties.action.html(span); // Texto de acción                                
                                
                                var widthAction = Properties.action.find("span").width(),
                                    widthBody = "calc(100% - " + (widthAction + 30) + "px)";
                                
                                Properties.body.css("width", widthBody);
                                Properties.body.css("padding-right", "24px");
                                
                                Properties.action.css("height", Properties.box.height());
                                
                                Properties.action.find("span").click(function () {
                                    if (softtion.isFunction(optionsAction.action)) {
                                        optionsAction.action(); Properties.action.html(""); 

                                        if (softtion.isDefined(self.hiddenSnackbar)) {
                                            clearTimeout(self.hiddenSnackbar); self.hiddenSnackbar = undefined;
                                        } // Existe un cierre pendiente por realizar

                                        Material.providers.Snackbar.moveButton(false); 
                                        Properties.box.removeClass("show").removeClass("active"); 
                                    } // Ejecutando acción establecida en el Controlador
                                });
                            } else {
                                Properties.action.html("");
                                Properties.body.css("padding-right", "0px");
                                Properties.body.css("width", "100%");
                            } // No se ha definido acción para disparar en el componente
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                Properties.box.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            Properties.box.addClass("active").addClass("show");
                            Material.providers.Snackbar.moveButton(true, Properties.box.height()); 

                            self.hiddenSnackbar = setTimeout(
                                function () {
                                    self.hiddenSnackbar = undefined; // Eliminando temporizador
                                    
                                    Properties.box.removeClass("show").removeClass("active");
                                    Material.providers.Snackbar.moveButton(false); 
                                },
                                5000 // Tiempo de espera para ocultarse
                            );
                        } else {
                            Properties.action.html(""); // Limpiando acción
                            heightBody = parseInt(Properties.body.css("height"));
                            
                            if (softtion.isDefined(self.hiddenSnackbar)) {
                                clearTimeout(self.hiddenSnackbar); self.hiddenSnackbar = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            Material.providers.Snackbar.moveButton(false); 
                            Properties.box.removeClass("show").removeClass("active"); 
                            
                            setTimeout(
                                function () { self.show(text, optionsAction); }, 350
                            ); // Temporizador para visualizar
                        }
                    };

                    var snackbar = new SnackBar();
                    
                    this.$get = function () { return snackbar; };
                }
            },
            
            Toast: {
                name: "$toast",
                moveButton: function (isShow, height) {
                    var button = angular.element("button.floating");
                        
                    if (button.exists() && (window.innerWidth <= 640)) {
                        (!isShow) ? button.css("margin-bottom", "0px") :
                            button.css("margin-bottom", (height - 16) + "px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var Properties = {
                        scope: undefined, box: undefined, body: undefined
                    };
                    
                    var SnackBar = function () { 
                        Properties.body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );

                        Properties.box = angular.element(
                            softtion.html("div").addClass(["toast"]).create()
                        );

                        Properties.box.append(Properties.body); 
                        
                        angular.element(".app-body").append(Properties.box);
                    };

                    SnackBar.prototype.show = function (text) {
                        var heightBody, self = this, // Toast
                            bottomNavigation = angular.element(".bottom-navigation");

                        if (!Properties.box.hasClass("active")) {
                            Properties.body.html(text); // Estableciendo texto
                            heightBody = parseInt(Properties.body.height());
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                Properties.box.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            Properties.box.addClass("active").addClass("show");
                            Material.providers.Toast.moveButton(true, Properties.box.innerHeight()); 

                            self.hiddenToast = setTimeout(
                                function () {
                                    self.hiddenToast = undefined; // Eliminando temporizador
                                    
                                    Properties.box.removeClass("show").removeClass("active");
                                    Material.providers.Toast.moveButton(false); 
                                },
                                5000 // Tiempo de espera para ocultarse
                            );
                        } else {
                            heightBody = parseInt(Properties.body.css("height"));
                            
                            if (softtion.isDefined(self.hiddenToast)) {
                                clearTimeout(self.hiddenToast); self.hiddenToast = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            Material.providers.Snackbar.moveButton(false); 
                            Properties.box.removeClass("show").removeClass("active"); 
                            
                            setTimeout(
                                function () { self.show(text); }, 350
                            ); // Temporizador para visualizar
                        }
                    };

                    var snackbar = new SnackBar();
                    
                    this.$get = function () { return snackbar; };
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
            if (softtion.isDefined(component["route"])) {
                $templateCache.put(component.route, component.html());
            }
        });
    }]);
    
    // Provedores de SofttionMaterial
    
    angular.forEach(Material.providers, function (provider) {
        ngMaterial.provider(provider.name, provider.method);
    });
});