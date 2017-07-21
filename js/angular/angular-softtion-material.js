/*
 Angular Softtion Material v1.1.4
 (c) 2016 Softtion Developers, http://material.softtion.com.co
 License: MIT
 Updated: 20/Jul/2017
*/
(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("AngularSofttion requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular) {
    
    var ngMaterial = angular.module("ngSofttionMaterial", ["ngSanitize", "ngSofttionEvents"]),
        TextType = softtion.get(softtion.TEXTCONTROL);

    function insertIconDescription ($scope, $component) {
        if (softtion.isString($scope.iconDescription)) {
            var icon = angular.element(
                softtion.html("i").addClass("icon-description").
                    setText($scope.iconDescription).create()
            );
            
            icon.insertBefore($component); return icon; // Icono
        } // Icono descriptivo, se debe insertar el icono antes del input
    };
                    
    function propertyStyle (key, value) {
        document.documentElement.style.setProperty(key, value);
    };
    
    function instanceElement (object, hasClass) {
        var $element = undefined;
        
        if (softtion.isString(object)) {
            $element = angular.element(object);
        } else if (softtion.isjQuery(object)) {
            $element = object;
        } // Objeto es una instancia de jQuery
        
        if (softtion.isDefined(object) && softtion.isString(hasClass)) {
            if (!$element.hasClass(hasClass)) {
                $element = undefined;
            } // Objeto no contiene la clase establecida
        }
        
        return $element; // Retornando elemento
    };
    
    function executeIfExists (object, callback) {
        if (softtion.isDefined(object)) { callback(); }
    };
    
    function isDateDisabled(date, minDate, maxDate, $fnValidate) {
        var validateCostum = false;
        
        if (softtion.isFunction($fnValidate)) {
            validateCostum = $fnValidate({$date: date});
            validateCostum = validateCostum || false;
        } // Realizando validación Personal
        
        return validateCostum || // Personalizada
            (softtion.isDate(minDate) && 
            date.getTime() < minDate.getTime()) ||
           (softtion.isDate(maxDate) &&
            date.getTime() > maxDate.getTime());
    };
    
    var MANAGER_DATETIME = {
        MONTHS: [
            { name: "Enero", value: 0 }, { name: "Febrero", value: 1 },
            { name: "Marzo", value: 2 }, { name: "Abril", value: 3 },
            { name: "Mayo", value: 4 }, { name: "Junio", value: 5 },
            { name: "Julio", value: 6 }, { name: "Agosto", value: 7 },
            { name: "Septiembre", value: 8 }, { name: "Octubre", value: 9 },
            { name: "Noviembre", value: 10 }, { name: "Diciembre", value: 11 }
        ]
    };
    
    var Material = {        
        components: {
            AppBar: {
                name: "appBar",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            fixed: "=?"
                        },
                        link: function ($scope, $element) {
                                // Componentes
                            var appBody = angular.element(".app-body"),
                                appContent = angular.element(".app-content"),
                                sidenav = appBody.children(".sidenav"),
                                contentNav = sidenav.children(".content"),
                                $window = angular.element(window),
                                
                                // Atributos
                                position = 0, hideClass = "hide",
                                heightElement = (!$element.hasClass("floating")) ?
                                    $element.innerHeight() : $element.outerHeight(true);
                            
                            if (!$scope.fixed) {
                                appContent.scroll(function () {
                                    var heightMin = (($window.width() > 960) ? 64 : 56),
                                        positionNew = appContent.scrollTop();

                                    if ((positionNew > heightMin)) {
                                        if (position < positionNew) {
                                            $element.addClass(hideClass); // Ocultando barra 
                                            $element.children(".dropdown").removeClass("active");
                                        } else {
                                            $element.removeClass(hideClass);
                                        } // Revelando componente
                                    } else if (positionNew === 0) {
                                        $element.removeClass(hideClass);
                                    } // Revelando componente, se llego al inicio

                                    position = positionNew; // Nueva posición del scroll
                                });
                            }
                            
                            appContent.css("padding-top", heightElement);
                            contentNav.css("top", heightElement); 
                            
                            if ($window.width() > 960) { 
                                appContent.addClass("pd-64"); contentNav.addClass("pd-64");
                            } else {
                                appContent.addClass("pd-56"); contentNav.addClass("pd-64"); 
                            } // Pantalla es mayor a 960px
                            
                            $window.resize(function () {
                                if ($window.width() > 960) {
                                    if (!appContent.hasClass("pd-64")) {
                                        var paddingTop = parseInt(appContent.css("padding-top"));
                                        appContent.css("padding-top", (paddingTop + 8) + "px");
                                        contentNav.css("top", (paddingTop + 8) + "px");
                                    } // AppBar de 64px Mínimo
                                    
                                    appContent.addClass("pd-64").removeClass("pd-56");
                                    contentNav.addClass("pd-64").removeClass("pd-56");
                                } else {
                                    if (!appContent.hasClass("pd-56")) {
                                        var paddingTop = parseInt(appContent.css("padding-top"));
                                        appContent.css("padding-top", (paddingTop - 8) + "px");
                                        contentNav.css("top", (paddingTop - 8) + "px");
                                    } // AppBar de 56px Mínimo
                                    
                                    appContent.addClass("pd-56").removeClass("pd-64");
                                    contentNav.addClass("pd-56").removeClass("pd-64");
                                }
                            });
                        }
                    };
                }
            },
            
            AutoComplete: {
                route: "softtion/template/autocomplete.html",
                name: "autocomplete",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "text").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-keyup", "keyupInput($event)").
                        addAttribute("ng-keydown", "keydownInput($event)").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-class", "{hide: !hideValue, holderhide: isHaveSelection()}").
                        addAttribute("placeholder", "{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");
                    var lineActive = softtion.html("div").addClass("line-shadow-active");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-class", "isActiveLabel()").
                        addClass("truncate").addAttribute("ng-click", "clickLabel()");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel()");
                
                    var buttonClear = softtion.html("i").addClass(["action"]).
                        setText("close").addAttribute("ng-hide", "isActiveClear()").
                        addAttribute("ng-click", "clearAutocomplet()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

                    var listAutocomplete = softtion.html("ul").
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestionsFilter track by $index").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-mousedown", "selectSuggestion(suggestion)").
                                addAttribute("ng-keydown", "keydownSuggestion($event, suggestion)").
                                addAttribute("ng-bind-html", "renderSuggestion(suggestion)")
                        ).addChildren(
                            softtion.html("li").addClass(["truncate", "not-found"]).
                                addAttribute("ng-if", "notFoundResult()").
                                setText("{{descriptionNotFoundResult()}}")
                        );
                
                    content.addChildren(input).addChildren(lineShadow).
                        addChildren(lineActive).addChildren(label).
                        addChildren(value).addChildren(buttonClear).
                        addChildren(spanHelper).addChildren(listAutocomplete);
                
                    return content.create(); // Componente AutoComplete
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.AutoComplete.route,
                        scope: {
                            select: "=ngModel",
                            ngDisabled: "=?",
                            required: "=?",
                            keyDescription: "@",
                            functionDescription: "=?",
                            label: "@",
                            suggestions: "=",
                            iconDescription: "@",
                            placeholder: "@",
                            disabledFocusclear: "=?",
                            helperText: "@",
                            helperPermanent: "=?",
                            
                            // Eventos
                            changedEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), 
                                list = $element.find("ul");
                            
                            insertIconDescription($scope, input); // Icon Descriptivo
                                
                            // Atributos de control
                            var focusLi = false, searchStart = false;

                            $scope.suggestionsFilter = []; 
                            $scope.suggestionTemp = undefined; 
                            $scope.valueInput = ""; 
                            $scope.clearSuggestion = true;
                            $scope.inputActive = false; 

                            $scope.describeSuggestion = function (suggestion) {
                                if (typeof suggestion === "string") {
                                    return suggestion;
                                } else {
                                    return (!(softtion.isString($scope.keyDescription)) ? 
                                        suggestion.toString() :
                                        softtion.findKey(suggestion, $scope.keyDescription));
                                }
                            };

                            $scope.clickLabel = function () { input.focus(); };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.inputActive || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.select)) ? "active" : "";
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.select) || $scope.helperPermanent;
                            };
                            
                            $scope.isHaveSelection = function () {
                                return softtion.isString($scope.valueInput) || softtion.isDefined($scope.select);
                            };

                            $scope.focusInput = function ($event) {
                                if (softtion.isDefined($scope.select)) {
                                    $scope.valueInput = $scope.describeSuggestion($scope.select);
                                } // Cambiando valor del texto en el Input
                                
                                $scope.inputActive = true; $element.addClass("active"); 
                                
                                // Buscar sugerencias con el filtro establecido
                                $scope.searchSuggestions($scope.valueInput.toLowerCase());
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent({$event: $event, $selected: $scope.select});
                                } // Evento focus sobre el inpur en el componente
                            };
                            
                            $scope.searchSuggestions = function (filter) {
                                if (filter === "") { return; }
                                
                                var suggestionsFilter = []; searchStart = true;
                               
                                angular.forEach($scope.suggestions, function (suggestion) {
                                    if (typeof suggestion === "string") {
                                        if (~suggestion.toLowerCase().indexOf(filter)) { 
                                            
                                            suggestionsFilter.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    } else {
                                        var value = !(softtion.isString($scope.keyDescription)) ? 
                                            suggestion.toString() : softtion.findKey(suggestion, $scope.keyDescription);

                                        if (~value.toLowerCase().indexOf(filter)) { 
                                            suggestionsFilter.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    }
                                });

                                $scope.suggestionsFilter = suggestionsFilter;

                                if (!list.hasClass("active")) { list.addClass("active"); }
                            };

                            $scope.keyupInput = function ($event) {
                                if ([13, 27, 35, 36, 37, 38, 39, 40].indexOf($event.keyCode) !== -1) { 
                                    return;
                                } // Estos caracteres no mejoran el patrón de busqueda
                                
                                if (!softtion.isString($scope.valueInput)) {
                                    return;
                                } // No hay nada digitado en el Componente de texto
                                
                                // Buscar sugerencias con el filtro digitado
                                $scope.searchSuggestions($scope.valueInput.toLowerCase()); 
                            };

                            $scope.keydownInput = function ($event) {
                                switch ($event.keyCode) {
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

                            $scope.keydownSuggestion = function ($event, suggestion) {
                                switch ($event.keyCode) {
                                    case (13): // ENTER
                                        this.selectSuggestion(suggestion);
                                    break;

                                    case (27): // ESC
                                        list.removeClass("active");
                                    break;

                                    case (38): // FLECHA ARRIBA
                                        var $option = angular.element($event.currentTarget);
                                        ($option.prev().length) ? $option.prev().focus() : input.focus();
                                    break;

                                    case (40): // FLECHA ABAJO
                                        var $option = angular.element($event.currentTarget);
                                        if ($option.next().length) { $option.next().focus(); }
                                    break;
                                }
                            };

                            $scope.blurInput = function ($event) {
                                if (focusLi) {
                                    focusLi = false; // Se ha enfocado Lista
                                } else {
                                    if ($scope.valueInput === "") {
                                        $element.removeClass("active"); list.removeClass("active");
                                    } else if (softtion.isUndefined($scope.select) && !softtion.isString($scope.valueInput)) {
                                        $element.removeClass("active"); 
                                    } else if (this.suggestionsFilter.length === 0) {
                                        list.removeClass("active"); $scope.select = undefined;
                                        $scope.clearSuggestion = true;
                                    } else {
                                        list.removeClass("active"); 
                                    }
                                    
                                    $scope.inputActive = false; // Desactivando vista del componente

                                    if (softtion.isFunction($scope.blurEvent)) {
                                        $scope.blurEvent({$event: $event, $selected: $scope.select});
                                    } // Evento 'focus' sobre el inpur en el componente
                                }
                            };

                            $scope.selectSuggestion = function (suggestion) {
                                $scope.suggestionTemp = $scope.select; $scope.inputActive = false;
                                $scope.select = suggestion; $scope.clearSuggestion = false;
                                
                                $scope.valueInput = $scope.describeSuggestion(suggestion);

                                list.removeClass("active"); // Ocultando lista
                                
                                if ($scope.suggestionTemp !== $scope.select) {
                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent({
                                            $nameEvent: "changed", 
                                            $old: $scope.suggestionTemp, 
                                            $selected: $scope.select
                                        });
                                    } // Evento cambio de selección
                                } // La selección realizada es diferente a la anterior
                            };

                            $scope.renderSuggestion = function (suggestion) {
                                var value; // Texto a mostrar en la lista
                                
                                if (softtion.isFunction($scope.functionDescription)) {
                                    value = $scope.functionDescription(suggestion);
                                } else {
                                    value = !(softtion.isString($scope.keyDescription)) ? suggestion :
                                        softtion.findKey(suggestion, $scope.keyDescription);
                                } // Se ha definido función para describir contenido

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
                            
                            $scope.isActiveClear = function () {
                                return !softtion.isDefined($scope.select);
                            };
                            
                            $scope.clearAutocomplet = function () {
                                $scope.select = undefined; $scope.valueInput = ""; 
                                $scope.clearSuggestion = true; $element.removeClass("active"); 
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent({
                                        $nameEvent: "clear", 
                                        $old: $scope.suggestionTemp, 
                                        $selected: $scope.select
                                    });
                                } // Evento cambio de selección de sugerencia
                                
                                if (!$scope.disabledFocusclear) { 
                                    input.focus(); 
                                } // Se hace focus al eliminar opción
                            };
                            
                            $scope.getValueModel = function () {
                                if (softtion.isDefined($scope.select)) {
                                    return $scope.describeSuggestion($scope.select);
                                } else {
                                    return $scope.valueInput;
                                }
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
                directive: ["SofttionMaterial", function (SofttionMaterial) {
                    return {
                        restrict: "C",
                        scope: {
                            views: "@",
                            
                            // Eventos
                            viewEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var selectorFAB = SofttionMaterial.Selectors.FAB,
                                selectorNav = SofttionMaterial.Selectors.BottomNav; 
                            
                            // Componentes
                            var rippleBox = angular.element(
                                    Material.components.BottomNavigation.ripple()
                                ),
                                items = $element.find(".content > li"),
                                itemActive = $element.find(".content > li.active:first"), 
                                actionButton = angular.element(selectorFAB),
                                elementsNav = angular.element(selectorNav),
                                views = angular.element($scope.views),
                                appContent = angular.element(".app-content"), 
                                snackbar, toast;
                        
                            $element.append(rippleBox); // Agregando ripple
                            
                            var paddingBottom = parseInt(appContent.css("padding-bottom"));
                            appContent.css("padding-bottom", (paddingBottom + 32) + "px");
                        
                            // Atributos
                            var classColor = "default", position = 0, classHide = "hide";
                            
                            if (actionButton.exists()) {
                                actionButton.addClass("show-bottom-navigation");
                            } // Cambiando posición original
                            
                            if (elementsNav.exists()) {
                                elementsNav.addClass("show-bottom-navigation");
                            } // Cambiando posición original
                            
                            items.attr("tab-index","-1"); items.removeClass("active"); 
                            
                            if (!itemActive.exists()) {
                                itemActive = angular.element(items[0]);
                            } // Se establece como activo primero de lista
                            
                            itemActive.addClass("active");
                            
                            var viewStart = views.find(itemActive.attr("view"));
                            viewStart.addClass("active"); // Activando vista
                            
                            switch (items.length) {
                                default: $element.addClass("five-tabs"); break; 
                                case (3): $element.addClass("three-tabs"); break;
                                case (4): $element.addClass("four-tabs"); break;
                            } // Estableciendo dimensión
                                
                            if ($element.hasClass("shifting")) {
                                var classColorOption = itemActive.attr("color");
                                
                                if (softtion.isString(classColorOption)) {
                                    classColor = classColorOption;
                                } // La opción tiene un color establecido
                                
                                $element.addClass(classColor); // Color
                            } // Se debe establecer color base del componente
                                
                            items.click(function ($event) {
                                var item = angular.element(this); // Opción activada
                                
                                if (item.hasClass("active")) {
                                    return;
                                } // La opción es la actualmente activa
                                
                                items.removeClass("active"); item.addClass("active");
                                
                                var view = views.find(item.attr("view"));
                                
                                if (view.exists() && !view.hasClass("active")) {
                                    appContent.scrollTop(0); // Posición inicial
                                    var viewActive = views.find(".content.active");
                                    
                                    if (viewActive.exists()) {
                                        viewActive.removeClass("opacity").removeClass("active");
                                    } // Ocultando componente activo
                                    
                                    view.addClass("active").addClass("opacity-bottom");
                                } // Componente exite y esta oculto
                                
                                var effect = rippleBox.find(".effect"); rippleBox.addClass("show"); 
                                
                                if (rippleBox.hasClass("animated")) {
                                    rippleBox.removeClass("animated");
                                } // Removiendo animación ripple
                                
                                var top = (item.height() / 2), left = item.offset().left; 
                                    left += (item.outerWidth() / 2) - $element.offset().left;
                                    
                                if ($element.hasClass("shifting")) {
                                    var classColorOption = item.attr("color");
                                    
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
                                
                                if (softtion.isFunction($scope.viewEvent)) {
                                    $scope.viewEvent({$event: $event});
                                } // Evento 'view' cuando hay un cambio de vista
                            });
                            
                            var scrollBottomNav = function () {
                                if (softtion.isUndefined(snackbar) || !snackbar.exists()) {
                                    snackbar = angular.element(".snackbar");
                                } // No se ha encontrado Snackbar en el documento
                                
                                if (softtion.isUndefined(toast) || !toast.exists()) {
                                    toast = angular.element(".toast");
                                } // No se ha encontrado Toast en el documento
                                
                                actionButton = angular.element(selectorFAB);
                                elementsNav = angular.element(selectorNav);
                                
                                if (!softtion.isInPage($element[0])) {
                                    snackbar.removeClass("show-bottom-navigation");
                                    toast.removeClass("show-bottom-navigation");
                                    actionButton.removeClass("show-bottom-navigation");
                                    elementsNav.removeClass("show-bottom-navigation");
                                    
                                    appContent.off("scroll.bottom-navigation", scrollBottomNav); return;
                                } // No existe el bottom navigation en el documento
                                
                                var positionNew = appContent.scrollTop(); // Posicion actual
                                                                
                                if (position < positionNew) {
                                    snackbar.removeClass("show-bottom-navigation");
                                    toast.removeClass("show-bottom-navigation");
                                    actionButton.removeClass("show-bottom-navigation");
                                    elementsNav.removeClass("show-bottom-navigation");
                                    $element.addClass(classHide);
                                } else {
                                    snackbar.addClass("show-bottom-navigation");
                                    toast.addClass("show-bottom-navigation");
                                    actionButton.addClass("show-bottom-navigation");
                                    elementsNav.addClass("show-bottom-navigation");
                                    $element.removeClass(classHide);
                                } // Se visualiza BottomNavigation oculto
                                
                                position = positionNew; // Posición nueva del scroll
                            };
                            
                            appContent.on("scroll.bottom-navigation", scrollBottomNav);
                        }
                    };
                }]
            },
            
            BottomSheet: {
                name: "bottomSheet",
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            maxWidth: "@",
                            marginTop: "@"
                        },
                        link: function ($scope, $element) {
                            var backdrop = $element.find(".backdrop"),
                                content = $element.children(".content");
                        
                            $scope.maxWidth = $scope.maxWidth || "480px";
                            $scope.marginTop = $scope.marginTop || "0px";
                                                    
                            if (!backdrop.exists()) {
                                backdrop = angular.element(
                                    softtion.html("div").addClass("backdrop").create()
                                );
                        
                                $element.append(backdrop); // Agregando backdrop 
                            } // No existe backdrop
                            
                            var marginBottom = content.outerHeight();
                            content.css("margin-bottom", (marginBottom * -1) - 1);
                            content.css("max-width", $scope.maxWidth);
                            content.css("max-height", "calc(100% - " + $scope.marginTop + ")");
                            
                            content.addClass("start"); // Componente inicializado
                        }
                    };
                }
            },
            
            Breadcrumb: {
                name: "breadcrumb",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            $element.displaceLeft();
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
                            disableRipple: "=?"
                        },
                        link: function ($scope, $element) {
                            if ($scope.disableRipple) {
                                $element.addClass("disabled-ripple"); return;
                            } // Usuario no desea efecto ripple en el Botón
                        }
                    };
                }
            },
            
            Calendar: {
                route: "softtion/template/calendar.html",
                name: "calendar",
                html: function () {
                    var header = softtion.html("div").addClass("header").
                        addChildren(
                            softtion.html("button").addClass(["action", "left"]).
                                addAttribute("ng-click", "prevMonth()").
                                addAttribute("ng-disabled", "prevDisabled()").
                                addAttribute("ng-class", "{hide: showEvents}").
                                addChildren(
                                    softtion.html("i").setText("chevron_left")
                                )
                        ).addChildren(
                            softtion.html("button").addClass(["action", "back"]).
                                addAttribute("ng-click", "hideDay()").
                                addAttribute("ng-class", "{show: showEvents}").
                                addChildren(
                                    softtion.html("i").setText("arrow_back")
                                )
                        ).addChildren(
                            softtion.html("div").addClass("title").
                                setText("{{year}}, {{getNameMonth()}}")
                        ).addChildren(
                            softtion.html("button").addClass(["action", "right"]).
                                addAttribute("ng-click", "nextMonth()").
                                addAttribute("ng-disabled", "nextDisabled()").
                                addAttribute("ng-class", "{hide: showEvents}").
                                addChildren(
                                    softtion.html("i").setText("chevron_right")
                                )
                        ).
                        addChildren(
                            softtion.html("div").addClass("actions").
                                addChildren(
                                    softtion.html("i").setText("delete").
                                        addAttribute("ng-if", "!disabledDelete").
                                        addAttribute("ng-dragleave", "dragLeaveDelete($element)").
                                        addAttribute("ng-drop", "dropDelete($element)").
                                        addAttribute("ng-dragover", "dragOverDelete($element, $event)")
                                ).addChildren(
                                    softtion.html("i").setText("edit").
                                        addAttribute("ng-if", "!disabledEdit").
                                        addAttribute("ng-dragleave", "dragLeaveEdit($element)").
                                        addAttribute("ng-drop", "dropEdit($element)").
                                        addAttribute("ng-dragover", "dragOverEdit($element, $event)")
                                )
                        );
                
                    var headTable = softtion.html("div").addClass("head").
                        addChildren(
                            softtion.html("div").addClass("day-week").
                                addAttribute("ng-repeat", "dayWeek in daysWeek").
                                addChildren(
                                    softtion.html("p").addClass("name-day").
                                        setText("{{dayWeek.normal}}")
                                ).addChildren(
                                    softtion.html("p").addClass("name-day-min").
                                        setText("{{dayWeek.min}}")
                                )
                        );
                
                    var bodyTable = softtion.html("div").
                        addClass(["body", "animate", "easing-out"]).
                        addChildren(
                            softtion.html("div").addClass("week").
                                addAttribute("ng-repeat", "week in calendarMonth").
                                addChildren(
                                    softtion.html("div").addClass("day").
                                        addAttribute("ng-repeat", "day in week").
                                        addAttribute("tabindex", "-1").
                                        addAttribute("ng-dragleave", "dragLeaveDay($element)").
                                        addAttribute("ng-dragover", "dragOverDay($element, $event)").
                                        addAttribute("ng-drop", "dropDay($element, day.number)").
                                        addAttribute("ng-click", "showDay(day)").
                                        addAttribute("ng-class", 
                                            "{inactive: dayCalendarInactive(day),"
                                            + " disabled: dayDisabled(day.number),"
                                            + " today: isToday(day.number)}"
                                        ).addChildren(
                                            softtion.html("div").addClass("number").
                                                setText("{{day.number}}").addChildren(
                                                    softtion.html("span").setText("*").
                                                        addAttribute("ng-class", "{active: (day.events.length > 0)}")
                                                )
                                        ).addChildren(
                                            softtion.html("div").addClass("event").
                                                addAttribute("ng-repeat", "event in day.events").
                                                addAttribute("draggable", "true").
                                                addAttribute("ng-dragstart", "dragStartEvent(event, day.number, $element)").
                                                addAttribute("ng-dragend", "dragEndEvent($element)").
                                                addChildren(
                                                    softtion.html("p").setText("{{event.title}}")
                                                )
                                        )
                                )
                        );
                
                    var content = softtion.html("div").addClass("content").
                        addAttribute("ng-class", "{hide: showEvents}").
                        addChildren(
                            softtion.html("div").addClass("table").
                                addChildren(headTable).addChildren(bodyTable)
                        );
            
                    var listEvents = softtion.html("div").addClass("list-events").
                        addAttribute("ng-class", "{show: showEvents}").
                        addChildren(
                            softtion.html("div").addClass("datepicker-dialog").
                                addAttribute("ng-model", "datePicker").
                                addAttribute("show-active", "showDialog").
                                addAttribute("parent", "{{parentDialog}}").
                                addAttribute("min-date", "minDate").
                                addAttribute("max-date", "maxDate").
                                addAttribute("year-range","10").
                                addAttribute("disabled-date", "disabledDateDialog($date)").
                                addAttribute("select-event", "selectDialogDate($date)")
                        ).addChildren(
                            softtion.html("div").addClass("head").
                                setText("{{getTitleEvents()}}")
                        ).addChildren(
                            softtion.html("ul").addChildren(
                                softtion.html("li").addClass("item-list").
                                    addAttribute("ng-repeat", "event in eventsSelect").
                                    addChildren(
                                        softtion.html("div").addClass("content").
                                            addChildren(
                                                softtion.html("label").addClass("title").
                                                    setText("{{event.title}}")
                                            ).addChildren(
                                                softtion.html("p").addClass("description").
                                                    setText("{{event.description}}")
                                            ).addChildren(
                                                softtion.html("div").addClass("actions").
                                                    addChildren(
                                                        softtion.html("button").addClass("flat").
                                                            addAttribute("ng-if", "!disabledDelete").
                                                            addAttribute("ng-click", "deleteEvent(event)").
                                                            setText("Eliminar")
                                                    ).addChildren(
                                                        softtion.html("button").addClass("flat").
                                                            addAttribute("ng-if", "!disabledMove").
                                                            addAttribute("ng-click", "startChanged(event)").
                                                            setText("Mover")
                                                    ).addChildren(
                                                        softtion.html("button").addClass("flat").
                                                            addAttribute("ng-if", "!disabledEdit").
                                                            addAttribute("ng-click", "startEdit(event)").
                                                            setText("Editar")
                                                    )
                                            )
                                    )
                            )
                        );
                
                    return header + content + listEvents; // Calendario
                },
                directive: ["ManagerCalendar", function (ManagerCalendar) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Calendar.route,
                        scope: {
                            managerCalendar: "=ngModel",
                            disabledMove: "=?",
                            disabledDelete: "=?",
                            disabledEdit: "=?",
                            
                            minDate: "=?",
                            maxDate: "=?",
                            parentDialog: "@",
                            disabledDate: "&?",
                            
                            // Eventos
                            moveEvent: "&?",
                            removeEvent: "&?",
                            editEvent: "&?"
                        }, 
                        link: function ($scope, $element) {
                            var table = $element.find(".body"), 
                                today = new Date(),
                                eventSelect, moveActive = false,
                                dayEvent, removeActive = false;
                            
                            // Eventos del manejador del calendario
                            var EventsCalendar = { 
                                addEvent: function (success, year, month) {
                                    if (!success) { return; } // Función no se ejecuto
                                    
                                    if (year === $scope.year && month === $scope.month) {
                                        refreshCalendarMonth();
                                    } // Se agrego evento en el mes activo
                                },
                            
                                removeEvent: function (success, year, month, event) {
                                    if (!success) { return; } // Función no se ejecuto
                                    
                                    if (year === $scope.year && month === $scope.month) {
                                        refreshCalendarMonth();
                                    } // Se removio evento en el mes activo
                                    
                                    if (removeActive) {
                                        removeActive = false; // Desactivando
                                
                                        if (softtion.isFunction($scope.removeEvent)) {
                                            $scope.removeEvent({$eventCalendar: event});
                                        } // Se removio un evento desde el Calendario
                                    }
                                }, 
                                
                                moveEvent: function (success, year, month, event) {
                                    if (!success) { return; } // Función no se ejecuto
                                    
                                    if (year === $scope.year && month === $scope.month) {
                                        refreshCalendarMonth();
                                    } // Se movío evento en el mes activo
                                    
                                    if (moveActive) {
                                        moveActive = false; // Desactivando
                                
                                        if (softtion.isFunction($scope.moveEvent)) {
                                            $scope.moveEvent({$eventCalendar: event});
                                        } // Se movio un evento desde el Calendario
                                    }
                                }
                            };
                            
                            $scope.managerCalendar = 
                                ManagerCalendar.instance(EventsCalendar);
                            
                            $scope.$watch(function () {
                                return $scope.managerCalendar;
                            }, function (newValue, oldValue) {
                                if (newValue === oldValue) {
                                    return;
                                } // No hay cambios
                                
                                if (!(ManagerCalendar.isInstance(newValue))) {
                                    $scope.managerCalendar = oldValue;
                                } // Se ha definido instancia incorrecta
                            });
                            
                            // Atributos de control
                            $scope.date = new Date(); $scope.date.setDate(1);
                            
                            $scope.year = $scope.date.getFullYear(); 
                            $scope.month = $scope.date.getMonth();
                            
                            $scope.daysWeek = []; // Dias de la semana
                            
                            var daysWeekMin = softtion.get(softtion.DAYS_OF_WEEK_MIN),
                                daysWeek = softtion.get(softtion.DAYS_OF_WEEK);
                        
                            for (var i = 0; i < 7; i++) {
                                $scope.daysWeek.push({
                                    normal: daysWeek[i], min: daysWeekMin[i]
                                });
                            } // Cargando nombre de los dias
                            
                            $scope.nameMonths = softtion.get(softtion.MONTHS_OF_YEAR);
                            $scope.daysMonth = softtion.get(softtion.DAYS_OF_MONTHS);
                            
                            newCalendarMonth = function () {
                                var calendarMonth = []; // Mes
                                
                                for (var i = 0; i < 6; i++) {
                                    var week = []; // Semana nueva

                                    for (var j = 0; j < 7; j++) {
                                        week.push({});
                                    } // Cargando dias en la Semana

                                    calendarMonth.push(week);
                                } // Cargando semanas en el Mes
                                
                                return calendarMonth; // Sin eventos
                            };
                            
                            createCalendarMonth = function () {
                                var countDay = 1, daysMonth = $scope.daysMonth[$scope.month];
                                
                                if ($scope.month === 1 && 
                                    softtion.isLeapYear($scope.year)) {
                                    daysMonth++;
                                } // El mes es Febrero y el año es biciesto
                                
                                var firstWeek = $scope.calendarMonth[0];
                                
                                for (var i = $scope.date.getDay(); i < 7; i++) {
                                    var events = $scope.managerCalendar.getEvenstOfDay(
                                            $scope.year, $scope.month, countDay
                                        );
                                    
                                    firstWeek[i] = { number: countDay, events: events }; countDay++;
                                } // Cargando dias hábiles, Primera Semana
                                
                                var stop = false, weekCount = 1, dayWeek = 0;
                                
                                while (!stop) {
                                    var week = $scope.calendarMonth[weekCount],
                                        events = $scope.managerCalendar.getEvenstOfDay(
                                            $scope.year, $scope.month, countDay
                                        );
                                
                                    week[dayWeek] = { number: countDay, events: events }; 
                                    countDay++; dayWeek++; // Aumentando
                                    
                                    if (dayWeek > 6) {
                                        weekCount++; dayWeek = 0;
                                    } // Siguiente semana
                                    
                                    stop = (countDay > daysMonth);
                                } // Cargando las otras semanas del Mes
                            };
                            
                            refreshCalendarMonth = function () {
                                $scope.calendarMonth = newCalendarMonth();
                                createCalendarMonth(); // Cargando eventos
                            };
                            
                            refreshCalendarMonth(); // Inicializar calendario
                            
                            $scope.getNameMonth = function () {
                                return $scope.nameMonths[$scope.month];
                            };
                            
                            $scope.dayCalendarInactive = function (day) {
                                return softtion.isUndefined(day.number);
                            };
                            
                            $scope.dayDisabled = function (day) {
                                if (softtion.isUndefined(day)) {
                                    return true;
                                } // El dia del componente es inválido
                                
                                var date = new Date($scope.year, $scope.month, day);  
                                
                                return isDateDisabled(
                                    date, $scope.minDate, $scope.maxDate, $scope.disabledDate
                                );
                            };
                            
                            $scope.disabledDateDialog = function ($date) {
                                if (softtion.isFunction($scope.disabledDate)) {
                                    return $scope.disabledDate({$date: $date});
                                } // Se esta estableciendo función de Validación
                            };
                            
                            $scope.prevMonth = function () {
                                $scope.month--; // Disminuyendo el mes
                                
                                if ($scope.month < 0) {
                                    $scope.year--; $scope.month = 11;
                                    $scope.date.setFullYear($scope.year);
                                } // Desendio de año
                                
                                $scope.date.setMonth($scope.month);
                                refreshCalendarMonth();
                                
                                table.addClass("slide-in-left");
                                
                                setTimeout(function () { 
                                    table.removeClass("slide-in-left"); 
                                }, 300); // Quitando animación
                            };
                            
                            $scope.nextMonth = function () {
                                $scope.month++; // Aumentando el mes
                                
                                if ($scope.month > 11) {
                                    $scope.year++; $scope.month = 0;
                                    $scope.date.setFullYear($scope.year);
                                } // Aumento de año
                                
                                $scope.date.setMonth($scope.month);
                                refreshCalendarMonth();
                                
                                table.addClass("slide-in-right");
                                
                                setTimeout(function () { 
                                    table.removeClass("slide-in-right"); 
                                }, 300); // Quitando animación
                            };
                             
                            $scope.prevDisabled = function () {
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
                                
                                return false; // Se puede retroceder de fecha Actual
                            };
                            
                            $scope.nextDisabled = function () {
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
                                
                                return false; // Se puede avanzar de fecha Actual
                            };
                            
                            $scope.getTitleEvents = function () {
                                return !softtion.isDate($scope.dateSelect) ? "" :
                                    $scope.dateSelect.getFormat("ww, dd de mn del aa");
                            };
                            
                            $scope.showDay = function (day) {
                                $scope.showEvents = true; dayEvent = day.number;
                                $scope.eventsSelect = day.events;
                                
                                $scope.dateSelect = new Date(
                                    $scope.year, $scope.month, dayEvent
                                );
                            };
                            
                            $scope.isToday = function (day) {
                                if (softtion.isDefined(day)) {
                                    return today.equalsDate($scope.year, $scope.month, day);
                                } // Se ha definido el dia a comparar
                                
                                return false; // No es el dia de Hoy
                            };
                            
                            $scope.hideDay = function () {
                                $scope.showEvents = false; 
                            };
                            
                            $scope.deleteEvent = function (event) {
                                removeActive = true; // Removido en Calendario
                                
                                $scope.managerCalendar.removeEvent(
                                    $scope.year, $scope.month, dayEvent, event
                                );
                            };
                            
                            $scope.startChanged = function (event) {
                                $scope.showDialog = true; eventSelect = event;
                            };
                            
                            $scope.startEdit = function (event) {
                                if (softtion.isFunction($scope.editEvent)) {
                                    $scope.editEvent({$event: event});
                                } // Se ha disparado acción para Editar evento
                            };
                            
                            $scope.selectDialogDate = function ($date) {
                                if (!$scope.dateSelect.equals($date)) {
                                    moveActive = true; // Movido en Calendario
                                    
                                    $scope.managerCalendar.moveEvent(
                                        $scope.dateSelect, $date, eventSelect
                                    );
                                } // Fechas son diferentes, se realiza cambio
                            };
                            
                            // Funciones para capturar evento
                            $scope.dragOverDay = function ($element, $event) {
                                if ($scope.disabledMove) { return; } // Inhabilitado
                                
                                $element.addClass("dragover"); $event.preventDefault();
                            };
                            
                            $scope.dragLeaveDay = function ($element) {
                                if ($scope.disabledMove) { return; } // Inhabilitado
                                
                                $element.removeClass("dragover"); // Quitando efecto
                            };
                            
                            $scope.dropDay = function ($element, dayNew) {
                                if ($scope.disabledMove) { return; } // Inhabilitado
                                
                                $element.removeClass("dragover"); moveActive = true;
                                
                                if (dayNew !== dayEvent) {
                                    $scope.managerCalendar.moveEvent(
                                        $scope.year, $scope.month, dayEvent, 
                                        $scope.year, $scope.month, dayNew, eventSelect
                                    );
                                } // Se debe mover evento de día
                            };
                            
                            // Funciones para arrastrar evento
                            $scope.dragStartEvent = function (event, day, $element) {
                                eventSelect = event; dayEvent = day; 
                                $element.addClass("drag-event"); // Inicio de drag
                            };
                            
                            $scope.dragEndEvent = function ($element) {
                                $element.removeClass("drag-event"); // Fin de drag
                            };
                            
                            // Funciones para editar evento
                            $scope.dragOverEdit = function ($element, $event) {
                                $element.addClass("dragover"); $event.preventDefault();
                            };
                            
                            $scope.dragLeaveEdit = function ($element) {
                                $element.removeClass("dragover"); // Quitando efecto
                            };
                            
                            $scope.dropEdit = function ($element) {
                                $element.removeClass("dragover"); // Quitando efecto
                                
                                if (softtion.isFunction($scope.editEvent)) {
                                    $scope.editEvent({$event: eventSelect});
                                } // Se ha disparado acción para Editar evento
                            };
                            
                            // Funciones para remover evento
                            $scope.dragOverDelete = function ($element, $event) {
                                $element.addClass("dragover"); $event.preventDefault();
                            };
                            
                            $scope.dragLeaveDelete = function ($element) {
                                $element.removeClass("dragover"); // Quitando efecto
                            };
                            
                            $scope.dropDelete = function ($element) {
                                $element.removeClass("dragover"); removeActive = true;
                                
                                $scope.managerCalendar.removeEvent(
                                    $scope.year, $scope.month, dayEvent, eventSelect
                                );
                            };
                        }
                    };
                }]
            },
            
            Carousel: {
                route: "softtion/template/carousel.html",
                name: "carousel",
                html: function () {
                    var content = softtion.html("div").
                        addClass("slide").addAttribute("ng-repeat", "slide in gallery").
                        addAttribute(
                            "ng-class", "{active: slideActive($index), before: slideBefore($index), after: slideAfter($index)}"
                        ).
                        addChildren(
                            softtion.html("img", false).addClass("center").
                                addAttribute("ng-src", "{{slide.img}}")
                        );

                    content.addChildren(
                        softtion.html("div").addClass(["detail", "{{positionContent}}"]).
                            addAttribute("ng-style", "{color: fontColor}").
                            addChildren(
                                softtion.html("label").addClass("title").setText("{{slide.title}}")
                            ).
                            addChildren(
                                softtion.html("h2").addClass("subtitle").setText("{{slide.subTitle}}")
                            )
                    );

                    var buttonPrev = softtion.html("a").addClass(["arrow", "prev", "{{positionContent}}"]).
                        addAttribute("ng-click", "prev()").
                        addAttribute("ng-class", "{disabled: transitionActive}").
                        addAttribute("ng-if", "beforeActive()").
                        addChildren(
                            softtion.html("i").setText("chevron_left").
                                addAttribute("ng-style", "{color: fontColor}")
                        );

                    var buttonNext = softtion.html("a").addClass(["arrow", "next", "{{positionContent}}"]).
                        addAttribute("ng-click", "next()").
                        addAttribute("ng-class", "{disabled: transitionActive}").
                        addAttribute("ng-if", "afterActive()").
                        addChildren(
                            softtion.html("i").setText("chevron_right").
                                addAttribute("ng-style", "{color: fontColor}")
                        );
                
                    return content + buttonPrev + buttonNext;
                },
                directive: ["$interval", "$timeout", function ($interval, $timeout) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Carousel.route,
                        scope: {
                            gallery: "=",
                            disabledInterval: "=?",
                            time: "=?",
                            height: "@",
                            positionContent: "@",
                            fontColor: "@"
                        },
                        link: function ($scope, $element) {
                            var intervalCarousel = undefined; $scope.index = 0; 
                            $scope.twoSlideActive = false; $scope.twoSlideStatus = "next";
                            $scope.time = isNaN($scope.time) ? 4000 : $scope.time;
                            
                            $scope.transitionActive = false; // Desactiva cambio
                            
                            $scope.fontColor = $scope.fontColor || "#ffffff";
                            
                            $element.css("padding-top", $scope.height || "56.6%");
                            
                            $scope.$watch("gallery", function () {
                                $scope.index = 0; $interval.cancel(intervalCarousel);
                                $scope.twoSlideActive = ($scope.gallery.length === 2);
                                
                                $scope.twoSlideStatus = "next"; // Adelante
                                                                
                                (!$scope.twoSlideActive) ?  
                                    $element.removeClass("two-slide") :
                                    $element.addClass("two-slide");
                                
                                $element.addClass("next"); startInterval(); // Inicializando interval
                            });

                            $scope.slideActive = function (index) {
                                return $scope.index === index;
                            };

                            $scope.slideBefore = function (index) {
                                var before = $scope.index - 1;

                                if (before < 0) {
                                    before = $scope.gallery.length - 1;
                                } // Slide before es el ultimo

                                return before === (index) && this.beforeActive();
                            };

                            $scope.slideAfter = function (index) {
                                var after = $scope.index + 1;

                                if (after === $scope.gallery.length) {
                                    after = 0;
                                } // Slide after es el primero

                                return after === (index) && this.afterActive();
                            };
                            
                            $scope.beforeActive = function () {
                                return (this.gallery.length > 2) || (this.twoSlideStatus === "prev"); 
                            };
                            
                            $scope.afterActive = function () {
                                return ($scope.gallery.length > 1) && (this.twoSlideStatus === "next"); 
                            };

                            function prev() {
                                if ($scope.twoSlideActive) {
                                    $scope.twoSlideStatus = "next";
                                } // Galería solo tiene 2 imagenes
                                
                                $element.removeClass("next").addClass("prev");
                                $scope.index--; $scope.transitionActive = true;

                                if ($scope.index < 0)  {
                                    $scope.index = $scope.gallery.length - 1;
                                } // Se salio del rango inferior de la lista
                                
                                $timeout(function () { $scope.transitionActive = false; }, 1000);
                            };

                            function next() {
                                if ($scope.twoSlideActive) {
                                    $scope.twoSlideStatus = "prev";
                                } // Galería solo tiene 2 imagenes
                                
                                $element.removeClass("prev").addClass("next");
                                $scope.index++; $scope.transitionActive = true;

                                if ($scope.index === $scope.gallery.length) {
                                    $scope.index = 0;
                                } // Se alcanzo la cantidad de slides
                                
                                $timeout(function () { $scope.transitionActive = false; }, 1000);
                            };
                            
                            function interval() {
                                var fn; // Función a ejecutar
                                
                                if (!$scope.twoSlideActive) {
                                    fn = next;
                                } else {
                                    fn = ($scope.twoSlideStatus === "next") ? next : prev;
                                } // Galería solo tiene 2 imagenes
                                
                                fn(); // Invocando función
                            };

                            function startInterval() {
                                if (!$scope.disabledInterval) {
                                    if (softtion.isInPage($element[0])) {
                                        intervalCarousel = $interval(interval, $scope.time);
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
                        }
                    };
                }]
            },
            
            CheckBox: {
                route: "softtion/template/checkbox.html",
                name: "checkbox",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "checkbox").
                        addAttribute("ng-model", "checked").
                        addAttribute("ng-disabled", "ngDisabled");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click", "clickLabel($event)");
                
                    var ripple = softtion.html("div").addClass("ripple-content").
                        addChildren(
                            softtion.html("div").addClass("box")
                        );

                    return input + label + ripple; // Checkbox
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBox.route,
                        scope: {
                            checked: "=ngModel",
                            label: "@",
                            ngDisabled: "=?",
                            
                            // Eventos
                            clickEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");

                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.checked = !$scope.checked; input.focus();
                                    
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent({$event: $event, $status: $scope.checked});
                                    } // Evento click sobre el componente
                                } // No se permite el cambio de la Propiedad
                            };
                        }
                    };
                }
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
                            ngDisabled: "=?",
                            preventDefault: "=?",
                            stopPropagation: "=?",
                            
                            // Eventos
                            clickEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");
                            
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.checked = !$scope.checked; input.focus();
                                    
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent({$event: $event});
                                } // Evento click sobre el componente
                                
                                if ($scope.stopPropagation) {
                                    $event.stopPropagation();
                                } // Se detendrá propagación de Evento
                            };
                        }
                    };
                }
            },
            
            CheckBoxSelect: {
                route: "softtion/template/checkbox-select.html",
                name: "checkboxSelect",
                html: function () {
                    var label = softtion.html("label").
                        addAttribute("ng-click","clickLabel($event)");

                    return label.create(); // Checkbox select
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.CheckBoxSelect.route,
                        scope: {
                            preventDefault: "=?",
                            stopPropagation: "=?",
                            
                            // Eventos
                            clickEvent: "&?"
                        },
                        link: function ($scope) {
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent({$event: $event});
                                } // Evento click sobre el componente
                                
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
                    var content = softtion.html("div").addClass("content");
                    
                    var box = softtion.html("div").addClass("box").
                        addAttribute("ng-class", "{focused: inputActive, disabled: ngDisabled}");
                    
                    var chips = softtion.html("div").addClass("chips").
                        addChildren(
                            softtion.html("div").addClass("chip").
                                addAttribute("ng-repeat", "item in listValue").setText("{{item}}").
                                addChildren(
                                    softtion.html("div").addClass("action").
                                        addAttribute("ng-hide", "ngDisabled").
                                        addChildren(
                                            softtion.html("i").setText("close").
                                                addAttribute("ng-click", "removeItem($index)")
                                        )
                                )
                    );
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "text").
                        addAttribute("ng-click", "clickInput($event)").
                        addAttribute("ng-keypress", "keypressInput($event)").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-disabled", "{{ngDisabled}}").
                        addAttribute("placeholder", "{{placeholder}}").
                        addAttribute("ng-style", "{width: resizeWidthInput()}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");
                    var lineActive = softtion.html("div").addClass("line-shadow-active");

                    var label = softtion.html("label").
                        addAttribute("ng-click", "clickLabel($event)").
                        addAttribute("ng-class", "{active: isLabelActive()}").
                        setText("{{label}}").addClass("truncate");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
                
                    box.addChildren(chips).addChildren(input);
                
                    content.addChildren(box).
                        addChildren(lineShadow).addChildren(lineActive).
                        addChildren(label).addChildren(spanHelper);

                    return content.create(); // Componente ChipInput
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ChipInput.route,
                        scope: {
                            listValue: "=ngModel", 
                            label: "@",
                            maxCount: "=?",
                            ngDisabled: "=?",
                            iconDescription: "@",
                            placeholder: "@", 
                            helperText: "@",
                            helperPermanent: "=?",
                            
                            // Eventos
                            blurEvent: "&?",
                            focusEvent: "&?",
                            changedEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"),
                                box = $element.find(".box"),
                                chips = $element.find(".chips");
                                
                            insertIconDescription($scope, box);  // Icono Descriptivo
                        
                            $scope.listValue = $scope.listValue || new Array(); 
                            $scope.maxCount = !isNaN($scope.maxCount) ? $scope.maxCount : -1;
                            $scope.inputActive = false; // Componente Activo
                            
                            if ($scope.listValue.length > 0) { 
                                $element.addClass("active"); 
                            } // La lista contiene elementos definidos
                            
                            $element.click(function ($event) { 
                                input.focus(); // Enfocando componente de Texto
                            });
                            
                            $scope.resizeWidthInput = function () {
                                var widthInput = "100%", 
                                    widthChips = chips.width(),
                                    widthBox = box.width();
                                
                                if ((widthChips > 0) && widthChips < (widthBox / 2)) {
                                    widthInput = (widthBox - widthChips - 12) + "px";
                                } // Se debe reajustar el tamaño del Input
                                
                                return widthInput; // Retornando ancho
                            };
                            
                            $scope.clickLabel = function ($event) {
                                input.focus(); $event.stopPropagation();
                            };
                            
                            $scope.isLabelActive = function () {
                                return $scope.inputActive || ($scope.listValue.length > 0);
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isArrayEmpty($scope.listValue) || $scope.helperPermanent;
                            };
                            
                            $scope.clickInput = function ($event) {
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); $scope.inputActive = true;
                                $element.removeClass("hide-input");
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent({$event: $event, $values: $scope.listValue});
                                } // Evento focus sobre el componente
                            };
                            
                            $scope.blurInput = function ($event) { 
                                $scope.valueInput = undefined; $scope.inputActive = false;
                                
                                if ($scope.listValue.length > 0) {
                                    $element.addClass("hide-input"); 
                                } else {
                                    $element.removeClass("active"); 
                                } // No tiene opciones escritas
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent({$event: $event, $values: $scope.listValue});
                                } // Evento blur sobre el componente
                            };
                            
                            $scope.keypressInput = function (ev) {
                                if (ev.keyCode === 13) {
                                    if (!softtion.isString($scope.valueInput)) {
                                        return;
                                    } // No ha escrito nada en el Componente
                                    
                                    if ($scope.maxCount === $scope.listValue.length) {
                                        return;
                                    } // Ha alcanzado cantidad de items permitidos
                                    
                                    if ($scope.listValue.indexOf($scope.valueInput) !== -1) {
                                        return;
                                    } // Texto digitado ya se encuentra en la Lista
                                    
                                    $scope.listValue.push($scope.valueInput); 

                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent({
                                            $nameEvent: "add", 
                                            $values: $scope.listValue, 
                                            $text: $scope.valueInput
                                        });
                                    } // Evento clear sobre el componente
                                    
                                    $scope.valueInput = undefined;
                                } // Se va agregar texto escrito en el componente
                            };
                            
                            $scope.removeItem = function (index) {
                                if (!$scope.ngDisabled) {
                                    var objectRemove = $scope.listValue[index];
                                
                                    $scope.listValue.remove(index); // Removiendo

                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent({
                                            $nameEvent: "remove", 
                                            $values: $scope.listValue, 
                                            $remove: objectRemove
                                        });
                                    } // Evento clear sobre el componente
                                }
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
                                                addAttribute("ng-click","setZone(false)").
                                                addAttribute("ng-class","{active: !isPM}")
                                        ).
                                        addChildren(
                                            softtion.html("div").addClass("pm").setText("PM").
                                                addAttribute("ng-click","setZone(true)").
                                                addAttribute("ng-class","{active: isPM}")
                                        )
                                ).addChildren(
                                    softtion.html("div").addClass("minute").
                                        addAttribute("ng-click","setSelection(false)").
                                        setText(":{{leadingClock(minuteSelect)}}").
                                        addAttribute("ng-class","{active: !isHours}")
                                ).addChildren(
                                    softtion.html("div").addClass(["hour"]).setText("{{hourSelect}}").
                                        addAttribute("ng-class","{active: isHours}").
                                        addAttribute("ng-click","setSelection(true)")
                                )
                        );
                    
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("plate").
                                addAttribute("ng-pointerdown","pointerdownPlate($event)").
                                addAttribute("ng-pointerup","pointerupPlate($event)").
                                addAttribute("ng-pointermove","pointermovePlate($event)").
                                addChildren(
                                    softtion.html("div").addClass("canvas")
                                ).
                                addChildren(
                                    softtion.html("div").addClass(["hours"]).
                                        addAttribute("ng-class","{active: isHours}").
                                        addChildren(
                                            softtion.html("div").addClass("tick").setText("{{hour}}").
                                                addAttribute("ng-repeat", "hour in clockValues").
                                                addAttribute("ng-style", "getPositionElement(hour)").
                                                addAttribute("ng-class", "{active: hourActive(hour)}")
                                        )
                                ).
                                addChildren(
                                    softtion.html("div").addClass("minutes").
                                        addAttribute("ng-class","{active: !isHours}").
                                        addChildren(
                                            softtion.html("div").addClass("tick").
                                                setText("{{(minute - 1) * 5}}").
                                                addAttribute("ng-repeat", "minute in clockValues").
                                                addAttribute("ng-style", "getPositionElement((minute - 1))").
                                                addAttribute("ng-class", "{active: minuteActive(minute)}")
                                        )
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
                            
                            // Eventos
                            selectEvent: "&?",
                            cancelEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var content = $element.find(".content"),
                                plate = content.find(".plate"),
                                canvas = plate.find(".canvas");
                            
                            // Atributos
                            $scope.clockValues = [
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                            ];
                            
                            $scope.valueSelection = undefined;
                            $scope.valueHour = undefined;
                            $scope.valueMinute = undefined;
                            $scope.isPM = false; $scope.isHours = true;
                                    
                            var canvasComponent,
                                selectionStart = false, 
                                attributes = {
                                    dialRadius: 116, 
                                    radius: 96,
                                    diameter: 232,
                                    duration: 350,
                                    tickRadius: 14
                                },

                                // Eventos de la directiva
                                setHand = Material.components.Clockpicker.setHand,
                                paintSelector = Material.components.Clockpicker.paintSelector;
                            
                            canvasComponent = paintSelector(canvas, attributes);
                            
                            $scope.getPositionElement = function (value) {
                                var radian = value / 6 * Math.PI,
                                    left = Math.sin(radian) * attributes.radius,
                                    top = Math.cos(radian) * attributes.radius;
                        
                                return {
                                    top: attributes.dialRadius - top - attributes.tickRadius,
                                    left: attributes.dialRadius + left - attributes.tickRadius
                                };
                            };
                            
                            $scope.setZone = function (zone) {
                                $scope.isPM = zone; // Definiendo zona horaria
                            };
                            
                            $scope.setSelection = function (selection) {
                                $scope.isHours = selection; // Definiendo tipo de selección
                                    
                                var position = Material.components.Clockpicker.getPosition(
                                    ($scope.isHours) ? $scope.hourSelect : $scope.minuteSelect, $scope.isHours, attributes
                                );
                        
                                Material.components.Clockpicker.setHand(
                                    position.x, position.y, $scope.isHours, canvasComponent, attributes
                                );
                            };
                            
                            var time = new Date(); // Tiempo actual
                            
                            $scope.hourSelect = (time.getHours() === 0) ?
                                12 : (time.getHours() > 12) ? 
                                time.getHours() - 12 : time.getHours();
                            $scope.valueHour = $scope.hourSelect;
                            
                            $scope.minuteSelect = time.getMinutes();
                            $scope.valueMinute = $scope.minuteSelect;
                            
                            $scope.setZone((time.getHours() > 11)); $scope.setSelection(true);
                            
                            $scope.leadingClock = function (value) {
                                return ((value < 10) ? "0" : "") + value;
                            };
                            
                            var calculatePosition = function ($event) {
                                var data = {
                                        isMove: true, positionX: 0, positionY: 0
                                    },
                                            
                                    isTouch = softtion.isTouchSupport(),
                                    offset = plate.offset(), 
                                    startX = offset.left + attributes.dialRadius,
                                    startY = offset.top + attributes.dialRadius,
                                    eventFinal = isTouch ? 
                                        $event.originalEvent.touches[0] : $event;
                                    
                                    data.positionX = eventFinal.pageX - startX,
                                    data.positionY = eventFinal.pageY - startY;
                            
                                var circle = Math.sqrt(
                                    data.positionX * data.positionX + data.positionY * data.positionY
                                );

                                if ((circle < attributes.radius - attributes.tickRadius) || 
                                    (circle > attributes.radius + attributes.tickRadius)) {
                                        data.isMove = false;
                                } // No se presiona click sobre el reloj del componente 
                                
                                return data; // Resultado de movel componente
                            };
                            
                            var movePosition = function ($event) {
                                var data = calculatePosition($event);
                                
                                if (data.isMove) {
                                    $event.preventDefault();

                                    $scope.valueSelection = setHand(
                                        data.positionX, data.positionY, 
                                        $scope.isHours, canvasComponent, attributes
                                    );
                            
                                    if ($scope.isHours) {
                                        $scope.valueHour = $scope.valueSelection;
                                    } else {
                                        $scope.valueMinute = $scope.valueSelection;
                                    }
                                }
                            };
                            
                            $scope.pointerdownPlate = function ($event) {
                                selectionStart = true; movePosition($event);
                            };
                            
                            $scope.pointermovePlate = function ($event) {
                                if (selectionStart) {
                                    movePosition($event);
                                } // Se inicia arrastre
                            };
                            
                            $scope.pointerupPlate = function () {
                                selectionStart = false; // Deteniendo arrastre
                                
                                if ($scope.isHours) {
                                    $scope.hourSelect = $scope.valueSelection;
                                    $scope.setSelection(false); // Minutos
                                } else {
                                    $scope.minuteSelect = $scope.valueSelection;
                                }
                            };
                            
                            $scope.hourActive = function (hour) {
                                return (hour === $scope.valueHour);
                            };
                            
                            $scope.minuteActive = function (minute) {
                                return ((minute - 1) * 5 === $scope.valueMinute);
                            };
                            
                            $scope.setTime = function () {
                                var hour = ($scope.isPM) ?
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect + 12) : $scope.hourSelect :
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect) : 0;
                                
                                if (softtion.isUndefined($scope.time)) {
                                    $scope.time = new Date();
                                } // Inicializando objeto para manipular el tiempo
                                
                                $scope.time.setHours(hour); $scope.time.setMinutes($scope.minuteSelect);
                                
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$time: $scope.time});
                                } // Función que se llama cuando se selecciona Fecha
                            };
                            
                            $scope.cancel = function () {
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent({$time: $scope.time});
                                } // Función que se llama cuando se cancela Selección
                            };
                        }
                    };
                }
            },
            
            ClockpickerDialog: {
                route: "softtion/template/clockpicker-dialog.html",
                name: "clockpickerDialog",
                html: function () {
                    var dialog = softtion.html("div").addClass(["dialog", "picker-clock"]).
                        addAttribute("ng-class", "{show: showActive}").
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).addChildren(
                            softtion.html("div").addClass("box").
                                addChildren(
                                    softtion.html("div").addClass("clockpicker").
                                        addAttribute("ng-model","time").
                                        addAttribute("select-event","selectComponent($time)").
                                        addAttribute("cancel-event","cancelComponent($time)")
                                )
                        );
                    
                    return dialog.create(); // Componente DatepickerDialog
                },
                directive: ["$body", function ($body) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ClockpickerDialog.route,
                        scope: {
                            time: "=ngModel",
                            showActive: "=",
                            parent: "@",
                            
                            // Eventos
                            selectEvent: "&?",
                            cancelEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            if (softtion.isString($scope.parent)) {
                                var parent = angular.element($scope.parent);
                                
                                if (parent.exists()) {
                                    $element.appendTo(parent); 
                                } // Moviendo componente
                            } // Se definio un selector para contener dialog
                            
                            $scope.$watch(function () {
                                return $scope.showActive;
                            }, function (newValue) {
                                (!newValue) ? 
                                    $body.removeClass("body-overflow-none") :
                                    $body.addClass("body-overflow-none");
                            });
                            
                            $scope.selectComponent = function ($time) {
                                $scope.showActive = false; $scope.time = $time;
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$time: $scope.time});
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.cancelComponent = function () {
                                $scope.showActive = false; // Cerrando Dialog
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$time: $scope.time});
                                } // Evento selección nueva en el componente
                            };
                        }
                    };
                }]
            },
            
            ClockpickerInput: {
                route: "softtion/template/clockpicker-input.html",
                name: "clockpickerInput",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var lineShadow = softtion.html("div").
                        addClass("line-shadow").addAttribute("ng-class", "{disabled: ngDisabled}");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-class", "{disabled: ngDisabled}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "showDialog($event)");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click", "showDialog($event)");
                
                    var buttonClear = softtion.html("i").addClass(["action"]).
                        setText("close").addAttribute("ng-hide", "isActiveClear()").
                        addAttribute("ng-click", "clearTime()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
                    
                    var dialog = softtion.html("div").addClass("clockpicker-dialog").
                        addAttribute("ng-model","timePicker").
                        addAttribute("show-active", "show").
                        addAttribute("select-event","selectDialog($time)").
                        addAttribute("cancel-event","cancelDialog($time)").
                        addAttribute("parent", "{{parent}}");
                
                    content.addChildren(value).addChildren(lineShadow).
                        addChildren(label).addChildren(buttonClear).addChildren(spanHelper);
                
                    return content + dialog; // Componente ClockPickerInput
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ClockpickerInput.route,
                        scope: {
                            time: "=ngModel",
                            label: "@",
                            format: "@",
                            autoStart: "@",
                            ngDisabled: "=?",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            parent: "@",
                            
                            // Eventos
                            showEvent: "&?",
                            selectEvent: "&?",
                            cancelEvent: "&?",
                            iconEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var value = $element.find(".value");
                        
                            var icon = insertIconDescription($scope, value); // Icono
                            
                            if (softtion.isDefined(icon)) {
                                icon.on("click", function ($event) { 
                                    if (softtion.isFunction($scope.iconEvent)) {
                                        $scope.$apply(function () { 
                                            $scope.iconEvent({$event: $event}); 
                                        }); 
                                    } // Asignando su función
                                }); 
                            } // Se ha definido un icono descriptivo
                            
                            $scope.show = false; $scope.format = $scope.format || "hz:ii zz";
                            
                            if (softtion.isUndefined($scope.time) 
                                    && $scope.$eval($scope.autoStart)) {
                                $scope.time = new Date(); 
                            } // Se desea iniciar automaticamente la fecha
                            
                            $scope.$watch(function () {
                                return $scope.time;
                            }, function (newValue) {
                                if (!softtion.isDate(newValue)) {
                                    $scope.time = undefined;
                                } // Objeto establecido no es una fecha
                            });
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.time)) ?
                                    $scope.time.getFormat($scope.format) : "";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.time)) ? "active" : "";
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.time) || $scope.helperPermanent;
                            };
                            
                            $scope.isActiveClear = function () {
                                return !softtion.isDefined($scope.time) || $scope.ngDisabled;
                            };
                            
                            $scope.showDialog = function ($event) {
                                if (!$scope.ngDisabled) {
                                    $scope.show = true; // Activando Dialog
                                    
                                    if (softtion.isFunction($scope.showEvent)) {
                                        $scope.showEvent({$event: $event});
                                    } // Evento abrir dialog en el componente
                                }
                            };
                            
                            $scope.selectDialog = function ($time) {
                                $scope.time = $time; // Asignando tiempo
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$time: $scope.time});
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.cancelDialog = function () {
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent({$time: $scope.time});
                                } // Evento cancelar selección en el componente
                            };
                            
                            $scope.clearTime = function () {
                                $scope.time = undefined; $element.removeClass("active"); 
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
                            selection: "=?ngModel",
                            rowsData: "=",
                            countSelect: "=?",
                            selectMultiple: "=?",
                            selectAll: "=?",
                            keySelect: "@",
                            ngSelect: "&?",
                            ngSelectAll: "&?"
                        },
                        link: function ($scope, $element) {
                            var selectedBefore = undefined; // Objeto seleccionado
                            
                            $scope.selection = ($scope.selectMultiple) ? [] : undefined;
                            $scope.keySelect = $scope.keySelect || "checked";
                            $scope.selectAll = false; $scope.countSelect = 0;

                            if (softtion.isArray($scope.rowsData)) {
                                angular.forEach($scope.rowsData, 
                                    function (object) {
                                        object[$scope.keySelect] = false;
                                    }
                                );
                            } // Se han definido lista de datos a manipular
                            
                            function selectItem(object, row) {
                                object[$scope.keySelect] = !object[$scope.keySelect];

                                if ($scope.selectMultiple) {
                                    row.toggleClass("active"); // Cambiando estado

                                    if (object[$scope.keySelect]) {
                                        $scope.selection.push(object);
                                    } else {
                                        $scope.selection.remove($scope.selection.indexOf(object));
                                    } // Ya estaba seleccionado la fila

                                    $scope.countSelect = $scope.selection.length;
                                } else {
                                    if (object[$scope.keySelect]) {
                                        row.siblings("tr").removeClass("active");
                                        
                                        row.addClass("active"); $scope.selection = object; 
                                        $scope.countSelect = 1; 

                                        if (softtion.isDefined(selectedBefore)) {
                                            selectedBefore[$scope.keySelect] = false; 
                                        } // Desactivando selección anterior
                                        
                                        selectedBefore = object; // Realizando nueva asignación
                                    } else {
                                        $scope.selection = undefined; row.removeClass("active");
                                        selectedBefore = undefined; $scope.countSelect = 0;
                                    } // Ya estaba seleccionado la fila
                                }

                                $scope.selectAll = ($scope.countSelect === $scope.rowsData.length);
                                
                                !$scope.selectAll ?
                                    $element.find("thead > tr").removeClass("active") :
                                    $element.find("thead > tr").addClass("active"); 
                            };

                            function selectAll() {
                                if ($scope.selectMultiple) {
                                    $scope.selection = []; $scope.selectAll = !$scope.selectAll;

                                    if ($scope.selectAll) {
                                        $element.find("thead > tr").addClass("active"); 
                                        $element.find("tbody > tr").addClass("active");

                                        angular.forEach($scope.rowsData,
                                            function (object) { 
                                                $scope.selection.push(object); 
                                                object[$scope.keySelect] = true; 
                                            }
                                        );
                                
                                        $scope.countSelect = $scope.selection.length;
                                    } else {
                                        $element.find("thead > tr").removeClass("active"); 
                                        $element.find("tbody > tr").removeClass("active"); 

                                        angular.forEach($scope.rowsData, 
                                            function (object) { object[$scope.keySelect] = false; }
                                        );

                                        $scope.countSelect = 0; // No hay seleccionados
                                    }
                                } else {
                                    $scope.selectAll = false;
                                } // No se permite la selección multiple
                            };
                            
                            $element.on("click", "thead .checkbox-select", function ($event) {
                                var callback = function () {
                                    selectAll(); // Evento de selección Multiple

                                    if (softtion.isFunction($scope.ngSelectAll)) {
                                        $scope.ngSelectAll({
                                            $event: $event, $selection: $scope.selection
                                        });
                                    } // Se ha definido función
                                };
                                
                                $scope.$apply(callback); // Ejecutando
                            });
                            
                            $element.on("click", "tbody > tr .checkbox-select", function ($event) {
                                var tr = angular.element($event.currentTarget).parents("tr"),
                                    itemSelect = undefined, itemActive = false,
                                    index = $element.find("tbody > tr").index(tr),
                                    
                                    callback = function () {
                                        if (softtion.isArray($scope.rowsData)) {
                                            itemSelect = $scope.rowsData[index];

                                            if (softtion.isDefined(itemSelect)) {
                                                selectItem(itemSelect, tr);
                                            }
                                        } // Se definio model en el componente

                                        if (softtion.isFunction($scope.ngSelect)) {
                                            $scope.ngSelect({
                                                $index: index, $status: itemActive, 
                                                $item: itemSelect, $event: $event, 
                                                $element: tr, $selection: $scope.selection
                                            });
                                        } // Se ha definido función
                                    };                                    
                                
                                $scope.$apply(callback); // Ejecutando
                            });
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
                                                        addAttribute("ng-repeat", "day in week").
                                                        addAttribute("ng-class","{disabled : dayDisabled(day.value), today: isToday(day.value)}").
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
                            minDate: "=?",
                            maxDate: "=?",
                            yearRange: "@",
                            disabledDate: "&?",
                            
                            // Eventos
                            selectEvent: "&?",
                            cancelEvent: "&?"
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
                            
                            var today = new Date().normalize("date");
                                                        
                            $scope.year = today.getFullYear();
                            $scope.day = today.getDate();
                            $scope.month = today.getMonth();
                            $scope.enabledSelectYear = false;
                            $scope.enabledSelectMonth = false;
                            dateDayStart.setDate(1); // Primer dia del mes
                            
                            $scope.monthText = nameMonths[$scope.month];
                            
                            $scope.daysMonth = createCalendar(
                                $scope.year, $scope.month, dateDayStart.getDay(), countDaysMonths[$scope.month]
                            );
                    
                            $scope.months = MANAGER_DATETIME.MONTHS;
                    
                            $scope.minDate = (softtion.isDate($scope.minDate)) ?
                                $scope.minDate.normalize("date") : undefined;
                    
                            $scope.maxDate = (softtion.isDate($scope.maxDate)) ?
                                $scope.maxDate.normalize("date") : undefined;
                                
                            listYears.scroll(function () {
                                function updateYears () {
                                    var scrollHeight = listYears[0].scrollHeight,
                                        scrollTop = listYears.scrollTop(), newYears = [],
                                        clientHeight = listYears[0].clientHeight;

                                    if (scrollTop === (scrollHeight - clientHeight)) {
                                        var year = $scope.years.last(),
                                            yearLimit = (softtion.isDefined($scope.maxDate)) ? 
                                                $scope.maxDate.getFullYear() : 10000;

                                        for (var i = 1; i <= 5; i++) {
                                            if ((year + i) <= yearLimit) { 
                                                newYears.push((year + i));
                                            } // No desborda limite superior
                                        } // Cargando años siguientes de rango

                                        $scope.years = $scope.years.concat(newYears);
                                    } else if (scrollTop <= 10) {
                                        var year = $scope.years.first(),
                                            yearLimit = (softtion.isDefined($scope.minDate)) ? 
                                                $scope.minDate.getFullYear() : 1969;

                                        for (var i = 0; i < 5; i++) {
                                            if ((year + i - 5) > yearLimit) {
                                                newYears.push((year + i - 5));
                                            } // No desborda limite inferior
                                        } //  Cargando años anteriores de rango

                                        $scope.years = newYears.concat($scope.years);
                                    }
                                }
                                
                                $scope.$apply(updateYears); // Agregando años
                            });
                            
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
                            
                            $scope.isToday = function (day) {
                                if (softtion.isDefined(day)) {
                                    return today.equalsDate($scope.year, $scope.month, day);
                                } // Se ha definido el dia a comparar
                                
                                return false; // No es el dia de Hoy
                            };
                            
                            $scope.dayDisabled = function (day) {
                                if (softtion.isUndefined(day)) {
                                    return true;
                                } // El dia del componente es inválido
                                
                                var date = new Date($scope.year, $scope.month, day);  
                                
                                return isDateDisabled(
                                    date, $scope.minDate, $scope.maxDate, $scope.disabledDate
                                );
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
                                
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$date: $scope.date});
                                } // Se ha establecido metodo para seleccionar Fecha
                            };
                            
                            $scope.cancel = function () {
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent({$date: $scope.date});
                                } // Se ha establecido metodo para cancelar Selección
                            };
                        }
                    };
                }
            },
            
            DatepickerDialog: {
                route: "softtion/template/datepicker-dialog.html",
                name: "datepickerDialog",
                html: function () {
                    var dialog = softtion.html("div").addClass(["dialog", "picker-date"]).
                        addAttribute("ng-class", "{show: showActive}").
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).addChildren(
                            softtion.html("div").addClass("box").
                                addChildren(
                                    softtion.html("div").addClass("datepicker").
                                        addAttribute("ng-model","date").
                                        addAttribute("disabled-date", "disabledDatePicker($date)").
                                        addAttribute("select-event","selectComponent($date)").
                                        addAttribute("cancel-event","cancelComponent($date)").
                                        addAttribute("min-date","minDate").
                                        addAttribute("max-date","maxDate").
                                        addAttribute("year-range","{{yearRange}}")
                                )
                        );
                    
                    return dialog.create(); // Componente DatepickerDialog
                },
                directive: ["$body", function ($body) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.DatepickerDialog.route,
                        scope: {
                            date: "=ngModel",
                            minDate: "=?",
                            maxDate: "=?",
                            disabledDate: "&?",
                            yearRange: "@",
                            showActive: "=",
                            parent: "@",
                            
                            // Eventos
                            selectEvent: "&?",
                            cancelEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            if (softtion.isString($scope.parent)) {
                                var parent = angular.element($scope.parent);
                                
                                if (parent.exists()) {
                                    $element.appendTo(parent); 
                                } // Moviendo componente
                            } // Se definio un selector para contener dialog
                            
                            $scope.$watch(function () {
                                return $scope.showActive;
                            }, function (newValue) {
                                (!newValue) ? 
                                    $body.removeClass("body-overflow-none") :
                                    $body.addClass("body-overflow-none");
                            });
                            
                            $scope.selectComponent = function ($date) {
                                $scope.showActive = false; $scope.date = $date;
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$date: $scope.date});
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.cancelComponent = function () {
                                $scope.showActive = false; // Cerrando Dialog
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$date: $scope.date});
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.disabledDatePicker = function ($date) {
                                if (softtion.isFunction($scope.disabledDate)) {
                                    return $scope.disabledDate({$date: $date});
                                } // Se esta estableciendo función de Validación
                            };
                        }
                    };
                }]
            },
            
            DatepickerInput: {
                route: "softtion/template/datepicker-input.html",
                name: "datepickerInput",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var lineShadow = softtion.html("div").
                        addClass("line-shadow").addAttribute("ng-class", "{disabled: ngDisabled}");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-class", "{disabled: ngDisabled}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "showDialog($event)");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click", "showDialog($event)");
                
                    var buttonClear = softtion.html("i").addClass(["action"]).
                        setText("close").addAttribute("ng-hide", "isActiveClear()").
                        addAttribute("ng-click", "clearDate()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
                    
                    var dialog = softtion.html("div").addClass("datepicker-dialog").
                        addAttribute("ng-model","datePicker").
                        addAttribute("show-active", "show").
                        addAttribute("select-event","selectDialog($date)").
                        addAttribute("cancel-event","cancelDialog($date)").
                        addAttribute("parent", "{{parent}}").
                        addAttribute("min-date","minDate").
                        addAttribute("max-date","maxDate").
                        addAttribute("disabled-date", "disabledDateDialog($date)").
                        addAttribute("year-range","{{yearRange}}");
                
                    content.addChildren(value).addChildren(lineShadow).
                        addChildren(label).addChildren(buttonClear).addChildren(spanHelper);
                
                    return content + dialog; // Componente DatePickerInput
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.DatepickerInput.route,
                        scope: {
                            date: "=ngModel",
                            format: "@",
                            label: "@",
                            autoStart: "@",
                            ngDisabled: "=?",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            
                            minDate: "=?",
                            maxDate: "=?",
                            yearRange: "=?",
                            parent: "@",
                            disabledDate: "&?",
                            
                            // Eventos
                            showEvent: "&?",
                            selectEvent: "&?",
                            cancelEvent: "&?",
                            iconEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var value = $element.find(".value"),
                                format = "ww, dd de mn del aa";
                        
                            var icon = insertIconDescription($scope, value); // Icono
                            
                            if (softtion.isDefined(icon)) {
                                icon.on("click", function ($event) { 
                                    if (softtion.isFunction($scope.iconEvent)) {
                                        $scope.$apply(function () { 
                                            $scope.iconEvent({$event: $event}); 
                                        }); 
                                    } // Asignando su función
                                }); 
                            } // Se ha definido un icono descriptivo
                            
                            $scope.show = false; $scope.format = $scope.format || format;
                            
                            if (softtion.isUndefined($scope.date) 
                                    && $scope.$eval($scope.autoStart)) {
                                $scope.date = new Date(); 
                            } // Se desea iniciar automaticamente la fecha
                            
                            $scope.$watch(function () {
                                return $scope.date;
                            }, function (newValue) {
                                if (!softtion.isDate(newValue)) {
                                    $scope.date = undefined;
                                } // Objeto establecido no es una fecha
                            });
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.date)) ?
                                    $scope.date.getFormat($scope.format) : "";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.date)) ? "active" : "";
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.date) || $scope.helperPermanent;
                            };
                            
                            $scope.isActiveClear = function () {
                                return !softtion.isDefined($scope.date) || $scope.ngDisabled;
                            };
                            
                            $scope.showDialog = function ($event) {
                                if (!$scope.ngDisabled) {
                                    $scope.show = true; // Haciendo visible
                                    
                                    if (softtion.isFunction($scope.showEvent)) {
                                        $scope.showEvent({$event: $event});
                                    } // Evento abrir dialog en el componente
                                }
                            };
                            
                            $scope.selectDialog = function ($date) {
                                $scope.date = $date; // Nueva fecha establecida
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent({$date: $scope.date});
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.cancelDialog = function () {
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent({$date: $scope.date});
                                } // Evento cancelar selección en el componente
                            };
                            
                            $scope.disabledDateDialog = function ($date) {
                                if (softtion.isFunction($scope.disabledDate)) {
                                    return $scope.disabledDate({$date: $date});
                                } // Se esta estableciendo función de Validación
                            };
                            
                            $scope.clearDate = function () {
                                $scope.date = undefined; $element.removeClass("active"); 
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
                            var header = $element.children(".header"),
                                body = $element.children(".body");
                            
                            if (body.exists()) {
                                var content = body.children(".content"),
                                    actions = body.children(".actions"),
                                    button = angular.element(
                                        Material.components.ExpansionPanel.buttonAction()
                                    );
                                
                                button.insertAfter(header.children(".title")); // Icono

                                header.click(function () {
                                    var elements = $element.siblings("li");
                                    
                                    elements.removeClass("active"); // Desactivando
                                    elements.children(".body").css("max-height", "0px");
                                    
                                    $element.toggleClass("active"); // Cambiando estado

                                    if ($element.hasClass("active")) {
                                        var heightActions = actions.innerHeight(),
                                            heightContent = content.innerHeight(),

                                            heightBody = // Calculando alto del Body
                                                ((isNaN(heightContent)) ? 0 : heightContent) + 
                                                ((isNaN(heightActions)) ? 0 : heightActions);
                                    
                                        body.css("max-height", heightBody + "px");
                                    } else {
                                        body.css("max-height", "0px");
                                    } // Se debe recoger el contenido del elemento
                                });
                            } // El componente no tiene contenedor
                        }
                    };
                }
            },
            
            Filechooser: {
                route: "softtion/template/filechooser.html",
                name: "filechooser",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "file");
                
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("select-file").
                                addAttribute("ng-hide", "isSelectedFile()").
                                addAttribute("ng-click", "selectFile()"). 
                                addChildren(
                                    softtion.html("i").setText("file_upload").
                                        addAttribute("ng-class", "{disabled: ngDisabled}")
                                ).addChildren(
                                    softtion.html("p").setText("{{textDescription}}").
                                        addAttribute("ng-class", "{disabled: ngDisabled}")
                                )
                        ).addChildren(
                            softtion.html("div").addClass("files").
                                addAttribute("ng-hide", "!isSelectedFile()").
                                addChildren(
                                    softtion.html("div").addClass(["file"]).
                                        addAttribute("ng-touchhold", "fileHold(file, $event, $index)").
                                        addAttribute("ng-clickright", "fileRight(file, $event, $index)").
                                        addAttribute("tabindex", "-1").
                                        addChildren(
                                            softtion.html("div").addClass("content").
                                                addChildren(
                                                    softtion.html("div").addClass("view-preview").
                                                        addChildren(
                                                            softtion.html("div").addClass("delete").addChildren(
                                                                softtion.html("button").addClass("flat").setText("Remover").
                                                                    addAttribute("ng-click", "removeFile()")
                                                            )
                                                        ).addChildren(
                                                            softtion.html("div").addClass("icon").
                                                                addAttribute("ng-bind-html", "getIconComponent(file.type)").
                                                                addAttribute("ng-if", "!isImageFile(file.type)")
                                                        ).addChildren(
                                                            softtion.html("img", false).addClass("center").
                                                                addAttribute("ng-src", "{{file.base64}}").
                                                                addAttribute("ng-if", "isImageFile(file.type)")
                                                        )
                                                ).

                                                addChildren(
                                                    softtion.html("div").addClass("detail").
                                                        addChildren(
                                                            softtion.html("div").addClass("avatar").
                                                                addChildren(
                                                                    softtion.html("i").setText("{{getIconFile(file.type)}}")
                                                                )
                                                        ).addChildren(
                                                            softtion.html("label").addClass("name").setText("{{file.name}}")
                                                        )
                                                )
                                        )
                                )
                        );
                    
                    return input + content; // Componente FileChooser
                },
                directive: ["$timeout", "$sce", "SofttionMaterial", function ($timeout, $sce, SofttionMaterial) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Filechooser.route,
                        scope: {
                            file: "=ngModel",
                            ngDisabled: "=?",
                            textDescription: "@",
                            
                            holdEvent: "&?",
                            clickrightEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                imagesFormat = SofttionMaterial.File.imagesFormat,
                                viewPreview = $element.find(".view-preview"),
                                heightStart = (viewPreview.height() - 16);                                
                            
                            $scope.textDescription = $scope.textDescription || 
                                "Seleccione archivos a procesar";
                            
                            $scope.file = undefined; // Archivos seleccionado
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
                                
                                reader.onloadstart = function ($event) {
                                    // En Inicio
                                };  
        
                                reader.onprogress = function ($event) {
                                    // En progreso
                                };
        
                                reader.onload = function ($event) {
                                    $scope.$apply(function () {
                                        var fileResult = $event.target.result; 
                                        file["base64"] = fileResult; $scope.file = file;
                                    });
                                };
                                
                                reader.onerror = function (event) {
                                    // Error
                                };

                                reader.onabort = function (event) {
                                    // Cancelar
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 250);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    console.log(files[0].type); processFile(files[0]);
                                } // Se cambio archivo a seleccionar
                            });
                            
                            $scope.isSelectedFile = function () { 
                                return softtion.isDefined($scope.file);
                            };
                            
                            $scope.selectFile = function () { fileInput.click(); };
                            
                            $scope.removeFile = function () {
                                $scope.file = undefined; fileInput[0].value = "";
                            };
                            
                            $scope.isImageFile = function (typeFile) {
                                return (imagesFormat.indexOf(typeFile) !== -1);
                            };
                            
                            $scope.getIconFile = function (typeFile) {
                                return SofttionMaterial.File.getIconFile(typeFile);
                            };
                            
                            $scope.getIconComponent = function (typeFile) {
                                var icon = SofttionMaterial.File.getIconComponent(typeFile),
                                        
                                    heightPreview = viewPreview.height(),
                                    height = (heightPreview > 0) ? 
                                        (heightPreview - 16) + "px" : heightStart + "px",
                                                
                                    style = "height: " + height + "; width: " + height
                                        + "; line-height: " + height + "; font-size: " + height;
                                
                                return $sce.trustAsHtml(icon.addAttribute("style", style).create());
                            };
                            
                            $scope.fileHold = function (file, $event, $index) {
                                if (softtion.isFunction($scope.holdEvent)) {
                                    $scope.holdEvent({
                                        $file: file, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Hold en el componente
                            };
                            
                            $scope.fileRight = function (file, $event, $index) {
                                if (softtion.isFunction($scope.clickrightEvent)) {
                                    $scope.clickrightEvent({
                                        $file: file, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Click derecho en el componente
                            };
                        }
                    };
                }]
            },
            
            FilechooserMultiple: {
                route: "softtion/template/filechooser-multiple.html",
                name: "filechooserMultiple",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "file");
                    
                    var actionAdd = softtion.html("div").addClass(["action-add"]).
                        addAttribute("ng-click", "selectFile()").
                        addAttribute("ng-class", "{disabled: ngDisabled}").
                        addChildren(softtion.html("i").setText("{{iconButton}}"));
                
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("select-file").
                                addAttribute("ng-hide", "(files.length > 0)").
                                addChildren(
                                    softtion.html("i").setText("file_upload").
                                        addAttribute("ng-class", "{disabled: ngDisabled}")
                                ).addChildren(
                                    softtion.html("p").setText("{{textDescription}}").
                                        addAttribute("ng-class", "{disabled: ngDisabled}")
                                )
                        ).addChildren(
                            softtion.html("div").addClass("files").
                                addChildren(
                                    softtion.html("div").addClass(["file"]).
                                        addAttribute("ng-repeat", "file in files").
                                        addAttribute("ng-touchhold", "fileHold(file, $event, $index)").
                                        addAttribute("ng-clickright", "fileRight(file, $event, $index)").
                                        addAttribute("tabindex", "-1").
                                        addChildren(
                                            softtion.html("div").addClass("content").
                                                addChildren(
                                                    softtion.html("div").addClass("view-preview").
                                                        addChildren(
                                                            softtion.html("div").addClass("delete").addChildren(
                                                                softtion.html("button").addClass("flat").setText("Remover").
                                                                    addAttribute("ng-click", "removeFile($index)")
                                                            )
                                                        ).addChildren(
                                                            softtion.html("div").addClass("icon").
                                                            addAttribute("ng-bind-html", "getIconComponent(file.type)").
                                                            addAttribute("ng-if", "!isImageFile(file.type)")
                                                        ).addChildren(
                                                            softtion.html("img", false).addClass("center").
                                                            addAttribute("ng-src", "{{file.base64}}").
                                                            addAttribute("ng-if", "isImageFile(file.type)")
                                                        )
                                                ).addChildren(
                                                    softtion.html("div").addClass("detail").
                                                        addChildren(
                                                            softtion.html("div").addClass("avatar").
                                                            addChildren(
                                                                softtion.html("i").setText("{{getIconFile(file.type)}}")
                                                            )
                                                        ).addChildren(
                                                            softtion.html("label").addClass("name").setText("{{file.name}}")
                                                        )
                                                )
                                        )
                                    )
                            );
                    
                    return input + content + actionAdd; // Componente FileChooser Multiple
                },
                directive: ["$timeout", "SofttionMaterial", function ($timeout, SofttionMaterial) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FilechooserMultiple.route,
                        scope: {
                            files: "=ngModel",
                            iconButton: "@",
                            multiple: "=?",
                            ngDisabled: "=?",
                            textDescription: "@",
                            
                            // Eventos
                            holdEvent: "&?",
                            clickrightEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                imagesFormat = SofttionMaterial.File.imagesFormat;
                            
                            $scope.iconButton = $scope.iconButton || "attachment";
                            $scope.textDescription = $scope.textDescription || 
                                "Seleccione archivos a procesar";
                            
                            $scope.files = []; // Lista de archivos seleccionados
                            
                            if ($scope.multiple) {
                                fileInput.attr("multiple", "");
                            } // Se pueden seleccionar multiples archivos
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
                                
                                reader.onloadstart = function ($event) {
                                    // En Inicio
                                };  
        
                                reader.onprogress = function ($event) {
                                    // En progreso
                                };
        
                                reader.onload = function ($event) {
                                    $scope.$apply(function () {
                                        var fileResult = $event.target.result; 
                                        file["base64"] = fileResult; $scope.files.push(file);
                                    });
                                };
                                
                                reader.onerror = function (event) {
                                    // Error
                                };

                                reader.onabort = function (event) {
                                    // Cancelar
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 250);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    angular.forEach(files, function (file) {
                                        console.log(file.type); processFile(file);
                                    });
                                } // Se cambio archivo a seleccionar
                            });
                            
                            $scope.selectFile = function () { fileInput.click(); };
                            
                            $scope.removeFile = function ($index) {
                                $scope.files.remove($index); fileInput[0].value = "";
                            };
                            
                            $scope.isImageFile = function (typeFile) {
                                return (imagesFormat.indexOf(typeFile) !== -1);
                            };
                            
                            $scope.getIconFile = function (typeFile) {
                                return SofttionMaterial.File.getIconFile(typeFile);
                            };
                            
                            $scope.getIconComponent = function (typeFile) {
                                return SofttionMaterial.File.getIconComponent(typeFile).create();
                            };
                            
                            $scope.fileHold = function (file, $event, $index) {
                                if (softtion.isFunction($scope.holdEvent)) {
                                    $scope.holdEvent({
                                        $file: file, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Hold en el componente
                            };
                            
                            $scope.fileRight = function (file, $event, $index) {
                                if (softtion.isFunction($scope.clickrightEvent)) {
                                    $scope.clickrightEvent({
                                        $file: file, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Click derecho en el componente
                            };
                        }
                    };
                }]
            },
            
            FlexibleBox: {
                name: "flexibleBox",
                backgroundColor: function () {
                    return softtion.html("div").addClass("background-color").create();
                },
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var banner = $element.children(".banner"),
                                box = $element.children(".box"),
                                toolbar = banner.children(".toolbar"),
                                title = toolbar.children(".title"),
                                detail = toolbar.children(".detail");
                        
                            var height = undefined,
                                background = angular.element(
                                    Material.components.FlexibleBox.backgroundColor()
                                );
                            
                            if (toolbar.exists()) {
                                background.insertBefore(toolbar);
                            } else {
                                banner.append(background); 
                            } // No existe un Toolbar en el banner

                            box.scroll(function () {
                                height = height || banner.height(); // Tomando height inicial
                                var heightToolbar = (window.innerWidth > 960) ? 64 : 56;
                                
                                var scroll = angular.element(this).scrollTop();

                                var opacity = scroll / height, margin = height - scroll - heightToolbar,
                                    heightBanner = height - scroll;

                                heightBanner = (heightBanner < heightToolbar) ? heightToolbar : heightBanner;
                                margin = (margin < 0) ? 0 : margin;
                                opacity = (heightBanner === heightToolbar) ? 1 : (opacity > 1) ? 1 : opacity;

                                var fontSizeTitle = 28 - (opacity * 8),
                                    fontSizeDetailSubTitle = 14 - (opacity * 2),
                                    fontSizeDetailTitle = 24 - (opacity * 6);
                                
                                banner.css("height", heightBanner); background.css("opacity", opacity);

                                title.css({ marginTop: margin, fontSize: fontSizeTitle }); 
                                
                                detail.css({ marginTop: margin }); // Margin del detail
                                detail.children(".subtitle").css("font-size", fontSizeDetailSubTitle);
                                detail.children(".title").css("font-size", fontSizeDetailTitle);
                            });
                        }
                    };
                }
            },
            
            FabMenu: {
                name: "fabMenu",
                directive: ["$body", function ($body) {
                    return {
                        restrict: "C", 
                        link: function ($scope, $element) {
                            var button = $element.find(".button-floating"),
                                box = $element.children(".box"),
                                backdrop = $element.children(".backdrop");
                        
                            $element.attr("tab-index", "-1"); // Enfocable
                                                    
                            if (!backdrop.exists()) {
                                backdrop = angular.element(
                                    softtion.html("div").addClass("backdrop").create()
                                );
                        
                                $element.append(backdrop); // Agregando backdrop 
                            } // No existe backdrop en el componente
                            
                            box.on("click", function () {
                                if ($element.hasClass("active")) {
                                    $element.removeClass("active"); $body.removeClass("body-overflow-none");
                                } // Debe cerrarse el componente
                            });
                            
                            button.on("click", function (event) {
                                $element.addClass("active"); $body.addClass("body-overflow-none"); event.stopPropagation();
                            });
                            
                            backdrop.on("click", function () {
                                $element.removeClass("active"); $body.removeClass("body-overflow-none");
                            });
                        }
                    };
                }]
            },
            
            FabMenuArc: {
                name: "fabMenuArc",
                directive: ["$body", function ($body) {
                    return {
                        restrict: "C", 
                        link: function ($scope, $element) {
                            var button = $element.find(".button-floating"),
                                box = $element.children(".box"),
                                backdrop = angular.element(".backdrop.fab-backdrop");
                                                    
                            if (!backdrop.exists()) {
                                backdrop = angular.element(
                                    softtion.html("div").
                                        addClass(["backdrop", "fab-backdrop"]).create()
                                );
                        
                                $body.append(backdrop); // Agregando backdrop 
                            } // No existe backdrop en el componente
                        
                            $element.attr("tab-index", "-1"); // Enfocable
                            
                            box.on("click", function () {
                                if ($element.hasClass("active")) {
                                    $element.removeClass("active"); backdrop.removeClass("active");
                                    $body.removeClass("body-overflow-none");
                                } // Debe cerrarse el componente
                            });
                            
                            button.on("click", function (event) {
                                $element.addClass("active").addClass("start"); 
                                $body.addClass("body-overflow-none");
                                backdrop.addClass("active"); event.stopPropagation();
                            });
                            
                            backdrop.on("click", function () {
                                $element.removeClass("active"); backdrop.removeClass("active");
                            });
                        }
                    };
                }]
            },
            
            FabSpeedDial: {
                name: "fabSpeedDial",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var buttonPrimary = $element.children("button.floating"),
                                icon = buttonPrimary.children("i"),
                                nameIcon = icon.text(); // Icono establecido
                        
                            $element.find("button.floating").addClass("static");
                            
                            buttonPrimary.on("click.fab-speeddial", function () {
                                buttonPrimary.addClass("active");
                                $element.toggleClass("active");
                                
                                ($element.hasClass("active")) ?
                                    icon.text("close") : icon.text(nameIcon);
                            });
                        }
                    };
                }
            },
            
            FullwidthField: {
                route: "softtion/template/fullwidth-field.html",
                name: "fullwidthField",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea($event)").
                        addAttribute("ng-focus","focusArea($event)").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");

                    var textHidden = softtion.html("div").
                        addClass("textarea-hidden").setText("{{valueHidden}}");
                    
                    content.addChildren(textArea).
                        addChildren(value).addChildren(textHidden);
                    
                    return content.create(); // Componente TextArea
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FullwidthField.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@", 
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            insertIconDescription($scope, area); // Icono descriptivo
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueArea
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.valueArea = ""; $scope.valueReal = false;
                            $scope.areaActive = false; $scope.valueHidden = "";

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueArea = $scope.valueArea.toUpperCase();
                                } // Se desea el texto en mayusculas
                                    
                                $scope.value = $scope.valueArea; // Definiendo Model
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Componente sin texto
                                    
                                if ($scope.valueArea === "") { 
                                    $scope.value = undefined; 
                                } // Estableciendo Model indefinido

                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorArea("Este campo es requerido");
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueArea.length;
                                
                                if (!softtion.isString($scope.valueArea)) {
                                    if (assign) {
                                        textEmpty();
                                    } // No hay texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorArea("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else { 
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel();
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.errorArea = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.heightStyle = function () {
                                $scope.valueHidden = ($scope.valueReal) ? 
                                    $scope.valueArea : $scope.value;
                                
                                return "height: " + hidden.height() + "px;";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.areaActive || softtion.isString($scope.valueArea)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.areaActive) {
                                    lengthText = $scope.valueArea.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueArea.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueArea) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () {
                                area.focus(); // Se activa el componente 
                            };
                            
                            $scope.clickArea = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };

                            $scope.focusArea = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = $scope.value.toString();
                                } // Cambiando valor del texto en el textarea
                                
                                $scope.areaActive = true; $scope.valueReal = true; 
                                $element.addClass("active"); 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurArea = function ($event) {
                                validateTextModel(true); // Validando Model
                                
                                $scope.valueReal = false; $scope.areaActive = false; 
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = ""; 
                                } // Limpiando texto en textarea del componente
                            };

                            $scope.keypressArea = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { 
                                    $event.preventDefault(); 
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueArea.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                callbackFnEvent($event, $scope.changeEvent);
                            };
                            
                            $scope.keyupArea = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.value)) ? $scope.value : $scope.valueArea;
                            };
                        }
                    };
                }
            },
            
            Gallery: {
                route: "softtion/template/gallery.html",
                name: "gallery",
                html: function () {
                    var image = softtion.html("div").addClass(["image"]).
                        addAttribute("ng-repeat", "image in images").
                        addAttribute("ng-touchhold", "fileHold(image, $event, $index)").
                        addAttribute("ng-clickright", "fileRight(image, $event, $index)").
                        addAttribute("tabindex", "-1").
                        addChildren(
                            softtion.html("div").addClass("content").
                                addChildren(
                                    softtion.html("div").addClass("view-preview").
                                        addChildren(
                                            softtion.html("div").addClass("delete").
                                                addAttribute("ng-if", "!disabledRemove").
                                                addChildren(
                                                    softtion.html("button").addClass("flat").setText("Remover").
                                                        addAttribute("ng-click", "removeImage($index)")
                                                )
                                        ).addChildren(
                                            softtion.html("img", false).addClass("center").
                                            addAttribute("ng-src", "{{image.src}}")
                                        )
                                ).addChildren(
                                    softtion.html("div").addClass("detail").
                                        addChildren(
                                            softtion.html("div").addClass("avatar").
                                            addChildren(
                                                softtion.html("i").setText("{{image.icon}}")
                                            )
                                        ).addChildren(
                                            softtion.html("label").addClass("name").setText("{{image.name}}")
                                        )
                                )
                        );
                    
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("images").addChildren(image)
                        );
                    
                    return content.create(); // Componente Gallery
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Gallery.route,
                        scope: {
                            images: "=ngModel",
                            disabledRemove: "=?",
                            
                            // Eventos
                            removeEvent: "&?",
                            holdEvent: "&?",
                            clickrightEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            $scope.removeImage = function ($index) {
                                var item = $scope.images[$index]; // Item eliminado
                                
                                $scope.images.remove($index); // Eliminando
                                
                                if (softtion.isFunction($scope.removeEvent)) {
                                    $scope.removeEvent({$item: item, $index: $index});
                                } // Se ha definido una función al remover
                            };
                            
                            $scope.fileHold = function (item, $event, $index) {
                                if (softtion.isFunction($scope.holdEvent)) {
                                    $scope.holdEvent({
                                        $item: item, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Hold en el componente
                            };
                            
                            $scope.fileRight = function (item, $event, $index) {
                                if (softtion.isFunction($scope.clickrightEvent)) {
                                    $scope.clickrightEvent({
                                        $item: item, $event: $event, $index: $index
                                    });
                                } // Se ha definido evento Click derecho en el componente
                            };
                        }
                    };
                }
            },
            
            Img: {
                name: "img",
                directive: ["$fnMaterial", function ($fnMaterial) {
                    return {
                        restrict: "E",
                        scope: {
                            disabledResponsive: "=?"
                        },
                        link: function ($scope, $element) {
                            if ($scope.disabledResponsive) { 
                                $element.addClass("active"); return; 
                            } // No se desea configurar imagen
                            
                            var defineDensity = function () {
                                var height = $element[0].naturalHeight,
                                    width = $element[0].naturalWidth;
                            
                                $fnMaterial.setDensity($element, width, height);
                            };
                            
                            ($element[0].complete) ? defineDensity() :
                                $element.on("load", function () { defineDensity(); });
                        }
                    };
                }]
            },
            
            ItemList: {
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
            },
            
            ProgressBar: {
                name: "progressBar",
                directive: ["$progressBar", function ($progressBar) {
                    return {
                        restrict: "C",
                        scope: {
                            visible: "=?",
                            percentage: "@"
                        },
                        link: function ($scope, $element) {
                            if (!$element.hasClass("indeterminate")) {
                                var bar = softtion.html("div").
                                    addClass("bar").tojQuery();
                                
                                $element.append(bar); // Cargando Barra
                            } // Insertando barra progreso en el Componente
                            
                            if ($element.hasClass("buffering")) {
                                $element.append(
                                    softtion.html("div").addClass("buffer").tojQuery()
                                ); 
                            } // Insertando barra buffer en el Componente
                            
                            $progressBar.set($element).setPercentage($scope.percentage);
                            
                            if ($scope.visible) {
                                $progressBar.show();
                            } // Se hace visible inicialmente
                        }
                    };
                }]
            },
            
            ProgressButtonFloating: {
                route: "softtion/template/progress-button-floating.html",
                name: "progressButtonFloating",
                html: function () {
                    var progressCircular = softtion.html("div").
                            addClass("progress-circular");
                    
                    var buttonSuccess = softtion.html("div").
                            addClass("button-success").
                            addChildren(
                                softtion.html("i").setText("{{iconFinish}}")
                            );
                    
                    var button = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addChildren(
                            softtion.html("i").setText("{{iconButton}}")
                        );
                    
                    return progressCircular + buttonSuccess + button;
                },
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            iconButton: "@",
                            iconFinish: "@",
                            ngDisabled: "=?"
                        },
                        templateUrl: Material.components.ProgressButtonFloating.route,
                        link: function ($scope, $element) {
                            $scope.iconFinish = $scope.iconFinish || "done";
                        }
                    };
                }
            },
            
            ProgressCircular: {
                route: "softtion/template/progress-circular.html",
                name: "progressCircular",
                html: function () {
                    return softtion.html("svg").addAttribute("viewBox","0 0 32 32").
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
                        addAttribute("value","{{value}}").
                        addAttribute("name","{{name}}").
                        addAttribute("ng-disabled","ngDisabled");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)");
                
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
                            value: "@",
                            name: "@",
                            label: "@",
                            ngDisabled: "=?",
                            
                            // Eventos
                            clickEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='radio']");
                            
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.model = $scope.value; input.focus();
                                    
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent({
                                            $event: $event, $status: $scope.model
                                        });
                                    } // Evento click sobre el componente
                                } // No se permite el cambio de la Propiedad
                            };
                        }
                    };
                }
            },
            
            Rating: {
                route: "softtion/template/rating.html",
                name: "rating",
                html: function () {
                    var button1 = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "setValue(1)").
                        addClass("action").addChildren(
                            softtion.html("i").setText("{{isActive(1)}}")
                        );
                
                    var button2 = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "setValue(2)").
                        addClass("action").addChildren(
                            softtion.html("i").setText("{{isActive(2)}}")
                        );
                
                    var button3 = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "setValue(3)").
                        addClass("action").addChildren(
                            softtion.html("i").setText("{{isActive(3)}}")
                        );
                
                    var button4 = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "setValue(4)").
                        addClass("action").addChildren(
                            softtion.html("i").setText("{{isActive(4)}}")
                        );
                
                    var button5 = softtion.html("button").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "setValue(5)").
                        addClass("action").addChildren(
                            softtion.html("i").setText("{{isActive(5)}}")
                        );

                    return button1 + button2 + button3 + button4 + button5;
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Rating.route,
                        scope: {
                            value: "=ngModel",
                            ngDisabled: "=?",
                            
                            // Eventos
                            changedEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            $scope.value = isNaN($scope.value) ? 0 : $scope.value;
                            
                            $scope.setValue = function (value) {
                                $scope.value = ($scope.value === value) ? 0 : value;
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent({$value: $scope.value});
                                } // Se realizo cambio de valor en Componente
                            };
                            
                            $scope.isActive = function (value) {
                                return ($scope.value >= value) ? "star" : "star_border";
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
                    var content = softtion.html("div").addClass("content");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "text").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-readonly", "true").
                        addAttribute("ng-click", "toggleSuggestions()").
                        addAttribute("ng-disabled", "ngDisabled");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]);

                    var value = softtion.html("p").addClass(["value", "truncate"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-click", "clickLabel($event)");

                    var button = softtion.html("button").addClass("action").
                            addChildren(
                                softtion.html("i").addClass("action-icon").setText("arrow_drop_down").
                                    addAttribute("ng-class", "{active: showList}")
                            ).
                            addAttribute("ng-hide", "ngDisabled").
                            addAttribute("tabindex", "-1").
                            addAttribute("ng-click", "toggleSuggestions()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

                    var list = softtion.html("ul").
                        addAttribute("ng-class", "{active: showList, show: !showList && startShow}").
                        addChildren(
                            softtion.html("li").addClass(["truncate", "clear-suggestion"]).
                                addAttribute("ng-if", "clearSuggestion").
                                setText("Remover selección").
                                addAttribute("ng-hide", "!select").
                                addAttribute("ng-click", "clearSelection()")
                        ).
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat", "suggestion in suggestions").
                                addAttribute("tabindex", "-1").
                                addAttribute("ng-click", "setSelection(suggestion, $event)").
                                setText("{{describeSuggestion(suggestion)}}")
                        );
                    
                    content.addChildren(input).addChildren(lineShadow).
                        addChildren(label).addChildren(value).
                        addChildren(button).addChildren(spanHelper).
                        addChildren(list);
                    
                    return content.create(); // Componente Select
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
                            ngDisabled: "=?",
                            clearSuggestion: "=?",
                            disabledAutoclose: "=?",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            
                            // Eventos
                            clickEvent: "&?",
                            changedEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var label = $element.find("label"), input = $element.find("input"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                            
                            insertIconDescription($scope, input); // Icono Descriptivo
                            
                            var clickComponent = function (target) {
                                return (label.is(target) || input.is(target) || value.is(target) || list.is(target))
                                    || button.is(target) || buttonIcon.is(target) || $element.is(target);
                            };
                            
                            $scope.selectTemp = undefined; $scope.showList = false; $scope.startShow = false;
                            
                            function closeSelect ($event) {
                                $scope.$apply(function() {
                                    if (!clickComponent($event.target)) {
                                        $scope.hideSuggestions(); // Ocultando opciones
                                    } // Se ha realizado click sobre el componente de Selección
                                });
                            };
                            
                            $scope.showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select", closeSelect);
                                } // No se permite cerrado automatico
                                
                                $scope.startShow = true; $scope.showList = true; 
                                $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select", closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            $scope.describeSuggestion = function (suggestion) {
                                if (softtion.isString(suggestion)) {
                                    return suggestion;
                                } else if (softtion.isString($scope.keyDescription)) {
                                    return softtion.findKey(suggestion, $scope.keyDescription);
                                } else {
                                    return JSON.stringify(suggestion);
                                } // No se definido nada
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isDefined($scope.select);
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.select) || $scope.helperPermanent;
                            };

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent({
                                        $event: $event, $selected: $scope.select
                                    }); 
                                } // Evento click sobre el componente
                                
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.select)) ? "active" : "";
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent({
                                        $event: $event, $selected: $scope.select
                                    }); 
                                } // Evento focus sobre el componente
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent({
                                        $event: $event, $selected: $scope.select
                                    }); 
                                } // Evento blur sobre el componente
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? $scope.hideSuggestions() : $scope.showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.setSelection = function (suggestion, $event) {
                                var item = angular.element($event.currentTarget);
                                
                                list.animate({ scrollTop: item[0].offsetTop }, 175, "standardCurve"); 
                                
                                $scope.selectTemp = $scope.select; 
                                
                                list.find("li").removeClass("active"); item.addClass("active"); 
                                
                                $scope.select = suggestion; $scope.hideSuggestions(); // Ocultando opciones
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent({
                                        $nameEvent: "select", 
                                        $selected: $scope.select, 
                                        $old: $scope.selectTemp
                                    }); 
                                } // Evento change sobre el componente
                            };
                            
                            $scope.clearSelection = function () {
                                $scope.select = undefined; $scope.hideSuggestions();
                                list.find("li").removeClass("active"); 
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent({
                                        $nameEvent: "clear", 
                                        $selected: $scope.select, 
                                        $old: $scope.selectTemp
                                    }); 
                                } // Evento change sobre el componente
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.select)) ? $scope.describeSuggestion($scope.select) : "";
                            };
                        }
                    };
                }
            },
            
            SelectMultiple: {
                route: "softtion/template/select-multiple.html",
                name: "selectMultiple",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-model","valueInput").
                        addAttribute("ng-click","toggleSuggestions()").
                        addAttribute("ng-blur","blurInput($event)").
                        addAttribute("ng-focus","focusInput($event)").
                        addAttribute("ng-readonly","true").
                        addAttribute("ng-disabled","ngDisabled");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click","clickLabel($event)").addClass(["truncate"]);

                    var value = softtion.html("p").addClass(["value", "truncate"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");

                    var button = softtion.html("button").addClass("action").
                        addChildren(
                            softtion.html("i").addClass("action-icon").setText("arrow_drop_down").
                                addAttribute("ng-class", "{active: showList}")
                        ).addAttribute("ng-hide", "ngDisabled").
                        addAttribute("ng-click","toggleSuggestions()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

                    var listSelect = softtion.html("ul").
                        addAttribute("ng-class", "{active: showList, show: !showList && startShow}").
                        addChildren(
                            softtion.html("li").addClass(["truncate"]).
                                addAttribute("ng-repeat","suggestion in suggestions").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-class", "{active: isItemChecked(suggestion)}").
                                addAttribute("ng-click","checkedSuggestion(suggestion, $event)").
                                setText("{{describeSuggestion(suggestion)}}").
                                addChildren(
                                    softtion.html("div").addClass("checkbox-select").
                                        addAttribute("ng-class", "{active: isItemChecked(suggestion)}").
                                        addAttribute("prevent-default", "true")
                                )
                        );
                
                    content.addChildren(input).addChildren(lineShadow).
                        addChildren(label).addChildren(value).addChildren(spanHelper).
                        addChildren(button).addChildren(listSelect);

                    return content.create(); // Componente Select Multiple
                },
                describeValues: function (selects, keyDescription) {
                    var size = Object.keys(selects).length, count = 0, valueInput = ""; 
                                
                    angular.forEach(selects, function (item) {
                        valueInput += softtion.isString(item) ? item :
                            softtion.findKey(item, keyDescription); 
                        
                        count++; valueInput += (count === size) ? "" : ", ";
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
                            ngDisabled: "=?",
                            keyDescription: "@",
                            suggestions: "=",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            
                            // Eventos
                            clickEvent: "&?",
                            changedEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), label = $element.find("label"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                        
                            insertIconDescription($scope, input); // Icono Descriptivo
                        
                            // Atributos
                            var describeValues = Material.components.SelectMultiple.describeValues;
                        
                            var temp = []; $scope.selects = $scope.selects || [];
                            
                            $scope.selects.forEach(function (select) {
                                if (temp.indexOf(select) === -1) { temp.push(select); } 
                            }); // Verificando la lista de items
                            
                            $scope.selects = temp; // Cargando lista real
                            
                            var clickComponent = function (target) {
                                return (label.is(target) || input.is(target) || value.is(target) || list.is(target))
                                    || button.is(target) || buttonIcon.is(target) || $element.is(target);
                            };
                            
                            function closeSelect ($event) {
                                $scope.$apply(function() {
                                    if (!clickComponent($event.target)) {
                                        $scope.hideSuggestions(); // Ocultando opciones
                                    } // Se ha realizado click sobre el componente de Selección
                                });
                            };
                            
                            $scope.isHaveText = function () {
                                return ($scope.selects.length > 0);
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isArrayEmpty($scope.selects) || $scope.helperPermanent;
                            };
                            
                            $scope.showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select-multiple", closeSelect);
                                } // No se permite cerrado automatico
                                
                                $scope.startShow = true; $scope.showList = true; 
                                $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select-multiple", closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            $scope.showList = false; $scope.startShow = false;

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent({
                                        $event: $event, $selecteds: $scope.selects
                                    }); 
                                } // Evento click sobre el componente
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.selects.length > 0) ? "active" : "";
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent({
                                        $event: $event, $selecteds: $scope.selects
                                    }); 
                                } // Evento focus sobre el componente
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent({
                                        $event: $event, $selecteds: $scope.selects
                                    }); 
                                } // Evento blur sobre el componente
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? $scope.hideSuggestions() : $scope.showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.checkedSuggestion = function (suggestion, $event) {
                                (!$scope.isItemChecked(suggestion)) ? $scope.selects.push(suggestion) :
                                    $scope.selects.remove($scope.selects.indexOf(suggestion));
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent({
                                        $event: $event, $selecteds: $scope.selects
                                    }); 
                                } // Evento change sobre el componente
                                    
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.describeSuggestion = function (suggestion) {
                                return (softtion.isString(suggestion)) ? suggestion :
                                    !(softtion.isString($scope.keyDescription)) ?
                                        JSON.stringify(suggestion) : 
                                        softtion.findKey(suggestion, $scope.keyDescription); 
                            };
                            
                            $scope.getValueModel = function () {
                                return describeValues($scope.selects, $scope.keyDescription);
                            };
                            
                            $scope.isItemChecked = function (suggestion) {
                                return ($scope.selects.indexOf(suggestion) !== -1);
                            };
                        }
                    };
                }
            },
            
            Sidenav: {
                name: "sidenav",
                directive: ["$sidenav", function ($sidenav) {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var buttonClose = softtion.html("button").
                                addClass(["action", "close"]).
                                addChildren(
                                    softtion.html("i").setText("chevron_left")
                                ).tojQuery();
                            
                            $element.children(".content").append(buttonClose);
                            
                            buttonClose.on("click.hide-sidenav", 
                                function () { $sidenav.set($element).hide(); }
                            );
                        }
                    };
                }]
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
                            var options = $element.children(".options"),
                                detail = $element.children(".detail");
                            
                            if (options.exists()) {
                                var list = options.children("ul");
                                $element.addClass("optionable");
                                
                                detail.children("a").append(
                                    angular.element(
                                        Material.components.SidenavItem.buttonAction()
                                    )
                                ); // Agregando button

                                detail.click(function () {
                                    $element.toggleClass("active"); // Cambiando estado
                                    
                                    var heightList = list.height();

                                    ($element.hasClass("active")) ?
                                        options.css("max-height", heightList + "px") :
                                        options.css("max-height", "0px");
                                });
                            } // El item contiene opciones
                        }
                    };
                }
            },
            
            Slider: {
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
                                softtion.html("div").addClass("track-off").
                                    addAttribute("ng-pointerdown", "trackPointerDown($event)").
                                    addAttribute("ng-pointerup", "trackPointerUp($event)").
                                    addAttribute("ng-pointermove", "trackPointerMove($event)").
                                    addChildren(
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
                                $trackOff = $content.find(".track-off"),
                                $thumb = $content.find(".thumb"),
                                $trackOn = $content.find(".track-on");
                                
                                // Atributos
                            var initialPosition, finalPosition,
                                initialX, finalX, range, time;
                            
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
                                
                                $scope.valueInput = parseInt($scope.value);
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
                                    
                                setPositionSlide(initialPosition / $trackOff.width());
                                
                                $scope.slideActive = true; // Inicio de arrastre
                            };

                            var setPositionSlide = function (position) {
                                finalPosition = $trackOn.width();
                                
                                if (position >= 0 && position <= 1) {
                                    $scope.value = position * range + $scope.minValue;
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
                                finalPosition = initialPosition + (finalX - initialX);

                                if ((finalPosition > 0) && (finalPosition < $trackOff.width())) {
                                    setPositionSlide(finalPosition / $trackOff.width());
                                } else if (finalPosition < 0) {
                                    setPositionSlide(0);
                                } else if (finalPosition >= $trackOff.width()) {
                                    (!$element.hasClass("discret")) ?
                                        setPositionSlide(1) :
                                        setPositionSlide(finalPosition / $trackOff.width());
                                }
                            };
                            
                            $scope.trackPointerUp = function () {
                                finalPosition = $trackOn.width();
                                $scope.slideActive = false; 
                                $scope.desliceActive = false; 
                            };
                            
                            $scope.outContent = function () { 
                                $scope.slideActive = false; $scope.desliceActive = false; 
                            };

                            $scope.getPercentajeValue = function () {
//                                $timeout.cancel(time); time = undefined;
//                                
//                                time = $timeout(function () {
//                                    if (parseInt($scope.value) < minValue) {
//                                        $scope.value = minValue;
//                                        
//                                    }
//                                    if (parseInt($scope.value) > maxValue) {
//                                        $scope.value = maxValue;
//                                    }
//                                }, 1000);
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
            },
            
            StepperHorizontal: {
                name: "stepperHorizontal",
                directive: ["SofttionMaterial", function (SofttionMaterial) {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var items = $element.find("li > .content");
                            
                            angular.forEach(items, function (item) {
                                var element = angular.element(item),
                                    box = SofttionMaterial.Ripple.box(),
                                    effect = SofttionMaterial.Ripple.effect();

                                box.append(effect); element.append(box);
                                SofttionMaterial.Ripple.event(box, effect);
                            });
                        }
                    };
                }]
            },
            
            Switch: {
                route: "softtion/template/switch.html",
                name: "switch",
                html: function () {
                    var label = softtion.html("label").
                        addAttribute("ng-click", "clickLabel($event)").
                        addChildren(
                            softtion.html("input", false).addAttribute("type","checkbox").
                                addAttribute("ng-model", "checked").
                                addAttribute("ng-disabled", "ngDisabled")
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
                            ngDisabled: "=?",
                            
                            // Eventos
                            clickEvent: "&?"
                        },
                        link: function ($scope, $element) { 
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent({$event: $event});
                                    } // Evento click sobre el componente
                                } // No se permite el cambio de la Propiedad
                            };
                        }
                    };
                }
            },
            
            Tabs: {
                name: "tabs",
                directive: ["$timeout", function ($timeout) {
                    return {
                        restrict: "C",
                        scope: {
                            views: "@",
                            disabledPositionStart: "=?",
                            disabledOverflow: "=?",
                            
                            // Eventos
                            viewEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var viewContent = angular.element($scope.views), 
                                views, tabs = $element.find(".tab"),
                                index = 0, clickActive = true, viewsCount = 0,
                                stripe = angular.element(
                                    softtion.html("div").addClass("stripe").create()
                                );
                            
                            if (tabs.exists()) {
                                tabs.attr("tabindex", "-1"); // Componentes enfocables
                                
                                if (viewContent.exists()) {
                                    views = viewContent.children(".view"); 
                                    views.removeClass("active"); viewsCount = views.length;
                                } // Determinando capacida

                                angular.forEach(tabs, function (tab) { 
                                    (viewsCount > index) ?
                                        angular.element(tab).data("position", index) :
                                        angular.element(tab).data("position", -1);
                                    
                                    index++; // Aumentando el contador de Vistas
                                });
                                
                                var tabActive = $element.find(".tab.active:first");
                                
                                if (!tabActive.exists()) {
                                    tabActive = angular.element(tabs[0]);
                                } // No se establecio pestaña activa inicialmente
                                
                                tabs.removeClass("active"); tabActive.addClass("active");
                                
                                var widthBar = tabActive.outerWidth(),
                                    leftBar = tabActive.position().left;
                                
                                stripe.css({ width: widthBar, left: leftBar });
                                
                                var position = tabActive.data("position");
                                viewContent.css("left", (position * -100) + "%");
                                
                                if (softtion.isDefined(views)) {
                                    angular.element(views[position]).addClass("active");
                                } // Vista actualmente activa
                                
                                $element.displaceLeft(function (name) {
                                    switch (name) {
                                        case ("displace"): clickActive = false; break;
                                        case ("end"): 
                                            $timeout(function () { clickActive = true; }, 500);
                                        break;
                                    }
                                }); // Evento arrastre en el componente
                                
                                tabs.on("click.tabs", function ($event) {
                                    if (!clickActive) {
                                        clickActive = true; return;
                                    } // Se realizo un arrastre
                                    
                                    if (!viewContent.hasClass("transition")) {
                                        viewContent.addClass("transition");
                                    } // Agregando transition al componente
                                    
                                    var itemTab = angular.element(this);
                                    
                                    var position = itemTab.data("position"),
                                        left = itemTab[0].offsetLeft,
                                        width = itemTab[0].clientWidth,
                                        widthTab = $element.width();
                            
                                    // Este componente está activo o no tiene vista
                                    if (itemTab.hasClass("active") || (position === -1)) { return; }
                                    
                                    stripe.css({ width: width, left: left });
                                    tabs.removeClass("active"); itemTab.addClass("active");
                                
                                    if (softtion.isDefined(views)) {
                                        views.removeClass("active"); angular.element(views[position]).addClass("active");
                                    } // Vista actualmente activa
                                    
                                    if (!$scope.disabledPositionStart) {
                                        angular.element(".app-content").scrollTop(0); 
                                    } // No es necesario subir vista
                                    
                                    if (left < $element.scrollLeft() || (width + left) > widthTab) {
                                        $element.animate({ scrollLeft: left }, 175, "standardCurve");                                         
                                    } // Reubicando vista del contenedor en pestaña
                                    
                                    viewContent.css("left", (position * -100) + "%");
                                    
                                    if (softtion.isFunction($scope.viewEvent)) {
                                        $scope.viewEvent({$event: $event});
                                    } // Evento view cuando hay un cambio de vista
                                });
                            } // Exiten pestañas en el componente
                    
                            $element.append(stripe); // Agregando componente selector
                        }
                    };
                }]
            },
            
            TextArea: {
                route: "softtion/template/textarea.html",
                name: "textarea",
                html: function () {
                    var content = softtion.html("div").addClass("content").
                        addAttribute("ng-class", "{focused: areaActive, disabled: ngDisabled}");
                    
                    var box = softtion.html("div").addClass("box");
                    
                    var textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea($event)").
                        addAttribute("ng-focus","focusArea($event)").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "isActiveLabel()").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");
                
                    var spanError = softtion.html("span").addClass(["error", "truncate"]).
                        setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "errorActive");
                
                    var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                        setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

                    var textHidden = softtion.html("div").
                        addClass("textarea-hidden").setText("{{valueHidden}}");
                    
                    box.addChildren(textArea).addChildren(label).
                        addChildren(value).addChildren(textHidden);
                        
                    content.addChildren(box).addChildren(spanError).
                        addChildren(spanHelper).addChildren(spanCounter);
                    
                    return content.create(); // Componente TextArea
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextArea.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@", 
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            insertIconDescription($scope, area); // Icono descriptivo
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueArea
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.valueArea = ""; $scope.valueReal = false;
                            $scope.areaActive = false; $scope.valueHidden = "";

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueArea = $scope.valueArea.toUpperCase();
                                } // Se desea el texto en mayusculas
                                    
                                $scope.value = $scope.valueArea; // Definiendo Model
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Componente sin texto
                                    
                                if ($scope.valueArea === "") { 
                                    $scope.value = undefined; 
                                } // Estableciendo Model indefinido

                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorArea("Este campo es requerido");
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueArea.length;
                                
                                if (!softtion.isString($scope.valueArea)) {
                                    if (assign) {
                                        textEmpty();
                                    } // No hay texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorArea("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else { 
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel();
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.errorArea = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.heightStyle = function () {
                                $scope.valueHidden = ($scope.valueReal) ? 
                                    $scope.valueArea : $scope.value;
                                
                                return "height: " + hidden.height() + "px;";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.areaActive || softtion.isString($scope.valueArea)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.areaActive) {
                                    lengthText = $scope.valueArea.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueArea.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueArea) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () {
                                area.focus(); // Se activa el componente 
                            };
                            
                            $scope.clickArea = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };

                            $scope.focusArea = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = $scope.value.toString();
                                } // Cambiando valor del texto en el textarea
                                
                                $scope.areaActive = true; $scope.valueReal = true; 
                                $element.addClass("active"); 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurArea = function ($event) {
                                validateTextModel(true); // Validando Model
                                
                                $scope.valueReal = false; $scope.areaActive = false; 
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = ""; 
                                } // Limpiando texto en textarea del componente
                            };

                            $scope.keypressArea = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { 
                                    $event.preventDefault(); 
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueArea.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                callbackFnEvent($event, $scope.changeEvent);
                            };
                            
                            $scope.keyupArea = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.value)) ? $scope.value : $scope.valueArea;
                            };
                        }
                    };
                }
            },
            
            TextBox: {
                route: "softtion/template/textbox.html",
                name: "textbox",
                html: function () {
                    var content = softtion.html("div").addClass("content").
                        addAttribute("ng-class", "{focused: inputActive, disabled: ngDisabled}");
                    
                    var box = softtion.html("div").addClass("box");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "{{typeInput}}").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-click", "clickInput($event)").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-keypress", "keypressInput($event)").
                        addAttribute("ng-keyup", "keyupInput($event)").
                        addAttribute("ng-readonly", "ngReadonly").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText(), iconaction: isIconAction}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("placeholder", "{{placeholder}}");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");
                
                    var iconAction = softtion.html("i").addClass("action").
                        setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                        addAttribute("ng-click", "clickAction($event)");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click", "clickLabel($event)").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var spanError = softtion.html("span").addClass(["error", "truncate"]).
                        setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "errorActive");
                
                    var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                        setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");
                    
                    box.addChildren(input).addChildren(label).
                        addChildren(value).addChildren(iconAction);
                    
                    content.addChildren(box).addChildren(spanHelper).
                        addChildren(spanError).addChildren(spanCounter);

                    return content.create(); // Componente Textfield
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
                        templateUrl: Material.components.TextBox.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@", 
                            type: "@",
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            iconAction: "@",
                            iconFunction: "=?",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            enterEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"),
                                regexEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
                                handler = Material.components.TextBox;
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueInput
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.typeInput = handler.defineInput($scope.type || "text");
                            $scope.valueInput = "";  $scope.isIconAction = false;
                            $scope.errorActive = false; $scope.isErrorActive = false; 
                            $scope.inputActive = false; $scope.viewPassword = false;

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            if ($scope.type === "password") {
                                $scope.isIconAction = true;
                                $scope.iconAction = "visibility";
                            } else {
                                if (softtion.isString($scope.iconAction)) {
                                    $scope.isIconAction = true;
                                } // Icono de acción definido por el usuario
                            }
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueInput = $scope.valueInput.toUpperCase();
                                } // Se desea texto en mayuscula

                                switch ($scope.type) {
                                    case (TextType.MONEY):
                                        $scope.successInput(parseInt($scope.valueInput));
                                    break;

                                    case (TextType.DECIMAL): 
                                        $scope.successInput(parseFloat($scope.valueInput)); 
                                    break;

                                    case (TextType.EMAIL):
                                        if (regexEmail.test($scope.valueInput)) {
                                            $scope.successInput($scope.valueInput);
                                        } else {
                                            $scope.errorInput("Texto digitado no es email");
                                        } // Error en el correo
                                    break;

                                    default: 
                                        $scope.successInput($scope.valueInput);
                                    break;
                                } // Definiendo tipo de dato del modelo
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Sin texto
                                    
                                if ($scope.valueInput === "") { 
                                    $scope.value = undefined; 
                                } // Dejando Model indefinido
                                    
                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorInput("Este campo es requerido"); 
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueInput.length;
                                
                                if (!softtion.isString($scope.valueInput)) {
                                    if (assign) { 
                                        textEmpty(); 
                                    } // Componente sin texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorInput("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else {
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel(); 
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.successInput = function (value) {
                                $scope.value = value; // Definiendo Model
                            };
                            
                            $scope.errorInput = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.inputActive || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.inputActive) {
                                    lengthText = $scope.valueInput.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueInput.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueInput) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () { 
                                input.focus(); // Enfocando el input
                            };
                            
                            $scope.clickInput = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };
                            
                            $scope.clickAction = function ($event) {
                                if ($scope.ngDisabled) {
                                    return;
                                } // Componente esta desactivado
                                
                                if ($scope.type === "password") {
                                    $scope.viewPassword = !$scope.viewPassword; // Definiendo visibilidad
                                    
                                    $scope.typeInput = $scope.viewPassword ? "text" : "password";
                                    $scope.iconAction = $scope.viewPassword ? "visibility_off" : "visibility";
                                } else {
                                    callbackFnEvent($event, $scope.iconFunction); // Evento icon
                                }
                            };

                            $scope.focusInput = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueInput = $scope.value.toString();
                                } // Cambiando valor del texto en el Input
                                
                                $element.addClass("active"); $scope.inputActive = true; 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurInput = function ($event) {
                                validateTextModel(true); $scope.inputActive = false;
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueInput = ""; 
                                } // Limpiando texto en input del componente
                            };

                            $scope.keypressInput = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueInput
                                });

                                if (!validate) {
                                 	$event.preventDefault();
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueInput.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                if ($event.keyCode === 13) {
                                    callbackFnEvent($event, $scope.enterEvent);
                                } else {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // No se presiono tecla 'Enter' en el input
                            };
                            
                            $scope.keyupInput = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                var value = (softtion.isDefined($scope.value)) ? 
                                    $scope.value : $scope.valueInput;                                    
                                    
                                if (($scope.type === "password") && !$scope.viewPassword) {
                                    var length = value.length; value = "";
                                    
                                    for (var i = 0; i < length; i++) { value += "•"; }
                                } // Contenido del input es tipo password
                                
                                return value; // Retornando el valor a mostrar
                            };
                        }
                    };
                }
            },
            
            TextBoxMultiline: {
                route: "softtion/template/textbox-multiline.html",
                name: "textboxMultiline",
                html: function () {
                    var content = softtion.html("div").addClass("content").
                        addAttribute("ng-class", "{focused: areaActive, disabled: ngDisabled}");
                    
                    var box = softtion.html("div").addClass("box");
                    
                    var textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea($event)").
                        addAttribute("ng-focus","focusArea($event)").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "isActiveLabel()").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");
                    
                    var spanError = softtion.html("span").addClass(["error", "truncate"]).
                        setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "errorActive");
                
                    var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                        setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

                    var textHidden = softtion.html("div").
                        addClass("textarea-hidden").setText("{{valueHidden}}");
                    
                    box.addChildren(textArea).addChildren(label).
                        addChildren(value).addChildren(textHidden);
                        
                    content.addChildren(box).addChildren(spanError).
                        addChildren(spanHelper).addChildren(spanCounter);
                    
                    return content.create(); // Componente TextBox
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextBoxMultiline.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@", 
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueArea
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.valueArea = ""; $scope.valueReal = false;
                            $scope.areaActive = false; $scope.valueHidden = "";

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueArea = $scope.valueArea.toUpperCase();
                                } // Se desea el texto en mayusculas
                                    
                                $scope.value = $scope.valueArea; // Definiendo Model
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Componente sin texto
                                    
                                if ($scope.valueArea === "") { 
                                    $scope.value = undefined; 
                                } // Estableciendo Model indefinido

                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorArea("Este campo es requerido");
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueArea.length;
                                
                                if (!softtion.isString($scope.valueArea)) {
                                    if (assign) {
                                        textEmpty();
                                    } // No hay texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorArea("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else { 
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel();
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.errorArea = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.heightStyle = function () {
                                $scope.valueHidden = ($scope.valueReal) ? 
                                    $scope.valueArea : $scope.value;
                                
                                return "height: " + hidden.height() + "px;";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.areaActive || softtion.isString($scope.valueArea)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.areaActive) {
                                    lengthText = $scope.valueArea.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueArea.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueArea) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () {
                                area.focus(); // Se activa el componente 
                            };
                            
                            $scope.clickArea = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };

                            $scope.focusArea = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = $scope.value.toString();
                                } // Cambiando valor del texto en el textarea
                                
                                $scope.areaActive = true; $scope.valueReal = true; 
                                $element.addClass("active"); 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurArea = function ($event) {
                                validateTextModel(true); // Validando Model
                                
                                $scope.valueReal = false; $scope.areaActive = false; 
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = ""; 
                                } // Limpiando texto en textarea del componente
                            };

                            $scope.keypressArea = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { 
                                    $event.preventDefault(); 
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueArea.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                callbackFnEvent($event, $scope.changeEvent);
                            };
                            
                            $scope.keyupArea = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.value)) ? $scope.value : $scope.valueArea;
                            };
                        }
                    };
                }
            },
            
            TextField: {
                route: "softtion/template/textfield.html",
                name: "textfield",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "{{typeInput}}").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-click", "clickInput($event)").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-keypress", "keypressInput($event)").
                        addAttribute("ng-keyup", "keyupInput($event)").
                        addAttribute("ng-readonly", "ngReadonly").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText(), iconaction: isIconAction}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("placeholder", "{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");
                    var lineActive = softtion.html("div").addClass("line-shadow-active");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");
                
                    var iconAction = softtion.html("i").addClass("action").
                        setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                        addAttribute("ng-click", "clickAction($event)");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-class", "isActiveLabel()").
                        addAttribute("ng-click", "clickLabel($event)").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var spanError = softtion.html("span").addClass(["error", "truncate"]).
                        setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "errorActive");
                
                    var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                        setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");
                    
                    content.addChildren(input).addChildren(lineShadow).
                        addChildren(lineActive).addChildren(value).
                        addChildren(iconAction).addChildren(label).
                        addChildren(spanHelper).addChildren(spanError).
                        addChildren(spanCounter);

                    return content.create(); // Componente Textfield
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
                            label: "@", 
                            type: "@",
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            iconDescription: "@",
                            iconAction: "@",
                            iconFunction: "=?",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            enterEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.children(".content").children("input"),
                                regexEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
                                handler = Material.components.TextField;

                            insertIconDescription($scope, input); // Icono descriptivo
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueInput
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.typeInput = handler.defineInput($scope.type || "text");
                            $scope.valueInput = "";  $scope.isIconAction = false;
                            $scope.errorActive = false; $scope.isErrorActive = false; 
                            $scope.inputActive = false; $scope.viewPassword = false;

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            if ($scope.type === "password") {
                                $scope.isIconAction = true;
                                $scope.iconAction = "visibility";
                            } else {
                                if (softtion.isString($scope.iconAction)) {
                                    $scope.isIconAction = true;
                                } // Icono de acción definido por el usuario
                            }
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueInput = $scope.valueInput.toUpperCase();
                                } // Se desea texto en mayuscula

                                switch ($scope.type) {
                                    case (TextType.MONEY):
                                        $scope.successInput(parseInt($scope.valueInput));
                                    break;

                                    case (TextType.DECIMAL): 
                                        $scope.successInput(parseFloat($scope.valueInput)); 
                                    break;

                                    case (TextType.EMAIL):
                                        if (regexEmail.test($scope.valueInput)) {
                                            $scope.successInput($scope.valueInput);
                                        } else {
                                            $scope.errorInput("Texto digitado no es email");
                                        } // Error en el correo
                                    break;

                                    default: 
                                        $scope.successInput($scope.valueInput);
                                    break;
                                } // Definiendo tipo de dato del modelo
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Sin texto
                                    
                                if ($scope.valueInput === "") { 
                                    $scope.value = undefined; 
                                } // Dejando Model indefinido
                                    
                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorInput("Este campo es requerido"); 
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueInput.length;
                                
                                if (!softtion.isString($scope.valueInput)) {
                                    if (assign) { 
                                        textEmpty(); 
                                    } // Componente sin texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorInput("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else {
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel(); 
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.successInput = function (value) {
                                $scope.value = value; // Definiendo Model
                            };
                            
                            $scope.errorInput = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.inputActive || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.inputActive) {
                                    lengthText = $scope.valueInput.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueInput.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueInput) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () { 
                                input.focus(); // Enfocando el input
                            };
                            
                            $scope.clickInput = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };
                            
                            $scope.clickAction = function ($event) {
                                if ($scope.ngDisabled) {
                                    return;
                                } // Componente esta desactivado
                                
                                if ($scope.type === "password") {
                                    $scope.viewPassword = !$scope.viewPassword; // Definiendo visibilidad
                                    
                                    $scope.typeInput = $scope.viewPassword ? "text" : "password";
                                    $scope.iconAction = $scope.viewPassword ? "visibility_off" : "visibility";
                                } else {
                                    callbackFnEvent($event, $scope.iconFunction); // Evento icon
                                }
                            };

                            $scope.focusInput = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueInput = $scope.value.toString();
                                } // Cambiando valor del texto en el Input
                                
                                $element.addClass("active"); $scope.inputActive = true; 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurInput = function ($event) {
                                validateTextModel(true); $scope.inputActive = false;
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueInput = ""; 
                                } // Limpiando texto en input del componente
                            };

                            $scope.keypressInput = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueInput
                                });

                                if (!validate) {
                                 	$event.preventDefault();
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueInput.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                if ($event.keyCode === 13) {
                                    callbackFnEvent($event, $scope.enterEvent);
                                } else {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // No se presiono tecla 'Enter' en el input
                            };
                            
                            $scope.keyupInput = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                var value = (softtion.isDefined($scope.value)) ? 
                                    $scope.value : $scope.valueInput;                                    
                                    
                                if (($scope.type === "password") && !$scope.viewPassword) {
                                    var length = value.length; value = "";
                                    
                                    for (var i = 0; i < length; i++) { value += "•"; }
                                } // Contenido del input es tipo password
                                
                                return value; // Retornando el valor a mostrar
                            };
                        }
                    };
                }
            },
            
            TextFieldMultiline: {
                route: "softtion/template/textfield-multiline.html",
                name: "textfieldMultiline",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea($event)").
                        addAttribute("ng-focus","focusArea($event)").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-keyup","keyupArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");
                    var lineActive = softtion.html("div").addClass("line-shadow-active");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "isActiveLabel()").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel($event)");
                
                    var spanError = softtion.html("span").addClass(["error", "truncate"]).
                        setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "errorActive");
                
                    var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                        setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

                    var textHidden = softtion.html("div").
                        addClass("textarea-hidden").setText("{{valueHidden}}");
                    
                    content.addChildren(textArea).addChildren(lineShadow).
                        addChildren(lineActive).
                        addChildren(label).addChildren(value).
                        addChildren(spanError).addChildren(spanHelper).
                        addChildren(spanCounter).addChildren(textHidden);
                    
                    return content.create(); // Componente TextArea
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextFieldMultiline.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@", 
                            required: "=?",
                            ngTrim: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            iconDescription: "@",
                            placeholder: "@",
                            helperText: "@",
                            
                            // Eventos
                            clickEvent: "&?",
                            blurEvent: "&?",
                            focusEvent: "&?",
                            changeEvent: "&?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            insertIconDescription($scope, area); // Icono descriptivo
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function({
                                        $event: $event, $value: $scope.valueArea
                                    });
                                } // Se definio una función para invocar
                            };

                            // Atributos de control
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            $scope.valueArea = ""; $scope.valueReal = false;
                            $scope.areaActive = false; $scope.valueHidden = "";

                            if (softtion.isString($scope.value)) { 
                                $element.addClass("active"); 
                            } // Se ha definido un valor en el Model
                            
                            function defineModel() {
                                if ($scope.uppercase) {
                                    $scope.valueArea = $scope.valueArea.toUpperCase();
                                } // Se desea el texto en mayusculas
                                    
                                $scope.value = $scope.valueArea; // Definiendo Model
                            };
                            
                            function textEmpty() {
                                $element.removeClass("active"); // Componente sin texto
                                    
                                if ($scope.valueArea === "") { 
                                    $scope.value = undefined; 
                                } // Estableciendo Model indefinido

                                if ($scope.required) {
                                    $scope.isErrorActive = true;
                                    $scope.errorArea("Este campo es requerido");
                                } // Texto es requerido
                            };
                            
                            function validateTextModel(assign) {
                                var lengthText = $scope.valueArea.length;
                                
                                if (!softtion.isString($scope.valueArea)) {
                                    if (assign) {
                                        textEmpty();
                                    } // No hay texto
                                } else if (lengthText < $scope.minLength) {
                                    if (assign || $scope.isErrorActive) {
                                        $scope.isErrorActive = true;
                                        $scope.errorArea("Este campo requiere minimo " + $scope.minLength + " caracteres");
                                    }
                                } else { 
                                    $scope.isErrorActive = false;
                                    $scope.errorActive = false; 
                                    $element.removeClass("error");
                                    
                                    if (assign) {
                                        defineModel();
                                    } // Estableciendo Model
                                } // Todo esta correcto
                            };
                            
                            $scope.errorArea = function (message) {
                                $scope.errorActive = true; $element.addClass("error"); 
                                $scope.errorText = message; $scope.value = undefined; 
                            };
                            
                            $scope.heightStyle = function () {
                                $scope.valueHidden = ($scope.valueReal) ? 
                                    $scope.valueArea : $scope.value;
                                
                                return "height: " + hidden.height() + "px;";
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.areaActive || softtion.isString($scope.valueArea)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isCounterAllowed = function () {
                                return (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
                            };
                            
                            $scope.textCounter = function () {
                                var lengthText = 0; // Cantidad de caracteres
                                
                                if ($scope.areaActive) {
                                    lengthText = $scope.valueArea.length;
                                } else {
                                    lengthText = (softtion.isDefined($scope.value)) ?
                                        lengthText = $scope.value.length :
                                        lengthText = $scope.valueArea.length;
                                } // Componente no se encuentra enfocado
                                
                                return lengthText + "/" + $scope.maxLength;
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueArea) || softtion.isDefined($scope.value);
                            };

                            $scope.clickLabel = function () {
                                area.focus(); // Se activa el componente 
                            };
                            
                            $scope.clickArea = function ($event) {
                                callbackFnEvent($event, $scope.clickEvent); // Evento click
                            };

                            $scope.focusArea = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = $scope.value.toString();
                                } // Cambiando valor del texto en el textarea
                                
                                $scope.areaActive = true; $scope.valueReal = true; 
                                $element.addClass("active"); 
                                
                                callbackFnEvent($event, $scope.focusEvent); // Evento focus
                            };

                            $scope.blurArea = function ($event) {
                                validateTextModel(true); // Validando Model
                                
                                $scope.valueReal = false; $scope.areaActive = false; 
                                
                                callbackFnEvent($event, $scope.blurEvent); // Evento blur
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = ""; 
                                } // Limpiando texto en textarea del componente
                            };

                            $scope.keypressArea = function ($event) {
                                var validate = softtion.validateCharacter({
                                    keyCode: $event.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { 
                                    $event.preventDefault(); 
                                } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueArea.length === $scope.maxLength) {
                                        $event.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
                                
                                callbackFnEvent($event, $scope.changeEvent);
                            };
                            
                            $scope.keyupArea = function ($event) {
                                validateTextModel(false); // Validando campo
                                
                                if ($event.keyCode === 8) {
                                    callbackFnEvent($event, $scope.changeEvent);
                                } // Se borró un carácter del input
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.value)) ? $scope.value : $scope.valueArea;
                            };
                        }
                    };
                }
            },
            
            TextFieldReadOnly: {
                route: "softtion/template/textfield-readonly.html",
                name: "textfieldReadonly",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var input = softtion.html("input", false).
                        addAttribute("type", "text").
                        addAttribute("ng-readonly", "true").
                        addAttribute("ng-model", "value");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        addAttribute("ng-class", "{active: isLabelActive()}").
                        setText("{{label}}").addClass("truncate");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
                
                    content.addChildren(input).addChildren(lineShadow)
                        .addChildren(label).addChildren(spanHelper);

                    return content.create(); // Componente TextFieldReadonly
                },        
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextFieldReadOnly.route,
                        scope: {
                            value: "=ngModel", 
                            label: "@",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input");
                            
                            insertIconDescription($scope, input); // Icono
                            
                            $scope.isLabelActive = function () {
                                return softtion.isDefined($scope.value);
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.value) || $scope.helperPermanent;
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
                    return softtion.html("div").
                        addClass("tooltip-element").addChildren(
                            softtion.html("p")
                        ).create();
                },
                directive: ["$body", function ($body) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var handler = Material.components.Tooltip,
                                container = $body.find(".tooltip-container"),
                                $window = angular.element(window);
                            
                            if (!container.exists()) {
                                container = angular.element(handler.container());
                        
                                $body.append(container); // Agregando contenedor
                            } // Contenedor tooltip no se encuentra creado en el documento
                            
                            var tooltip = angular.element(handler.element());
                            
                            container.append(tooltip); 
                            tooltip.children("p").html($attrs.tooltip); 
                            var widthTooltip = tooltip.innerWidth();
                            
                            $element.on("mouseenter", function () {
                                var heightElement = $element.innerHeight(),
                                    positionX = $element.offset().left,
                                    positionY = $element.offset().top,
                                    widthElement = $element.innerWidth(),
                                    marginTop = ($window.width() > 640) ? 12 : 8;
                                    
                                var left = (widthElement / 2) - (widthTooltip / 2) + positionX,
                                    top = positionY + heightElement + marginTop;
                                    
                                if (left < 8) { left = 8; }
                                
                                tooltip.css({ left: left, top: top }).addClass("show");
                            });
                            
                            $element.on("mouseout", function () { tooltip.removeClass("show"); });
                        }
                    };
                }]
            },
            
            ViewsTabs: {
                name: "viewsTab",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var countContent = $element.find(".view").length;
                            
                            $element.css("width", (countContent * 100) + "%");
                        }
                    };
                }
            }
        },
        
        properties: {
            BottomSheet: {
                name: "bottomSheet",
                directive: ["$bottomSheet", function ($bottomSheet) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            $element.on("click", function () {
                                $bottomSheet.set($attrs.bottomSheet).show();
                            });
                        }
                    };
                }]
            },
            
            Dialog: {
                name: "dialog",
                directive: ["$dialog", function ($dialog) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            $element.click(function () {
                                $dialog.set($attrs.dialog).show();
                            });
                        }
                    };
                }]
            },
            
            Dropdown: {
                name: "dropdown",
                directive: ["$dropdown", function ($dropdown) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var disabledAutoclose = 
                                $scope.$eval($attrs.disabledAutoclose);
                            
                            $element.on("click", function (event) {
                                $dropdown.set($attrs.dropdown).
                                    show($element, !disabledAutoclose);
                                
                                if (!disabledAutoclose) { 
                                    event.stopPropagation(); 
                                } // Desactivar Autocerrado
                            });
                        }
                    };
                }]
            },
            
            FormNavigation: {
                name: "formNavigation",
                directive: ["$formNavigation", function ($formNavigation) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            $element.on("click", function () {
                                $formNavigation.set($attrs.formNavigation).show();
                            });
                        }
                    };
                }]
            },
            
            Sidenav: {
                name: "sidenav",
                directive: ["$sidenav", function ($sidenav) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            $element.on("click", function () {
                                $sidenav.set($attrs.sidenav).show();
                            });
                        }
                    };
                }]
            }
        },
        
        providers: {
            Alert: {
                name: "$alert",
                method: function () {
                        // Elementos
                    var $dialog = undefined, 
                        $backdrop = undefined,
                        $title = undefined, 
                        $content = undefined,
                        $buttonPositive = undefined,
                        $buttonNegative = undefined,
                        
                        // Proveedores
                        $body = undefined,
                        $scope = undefined,
                        
                        // Propiedades
                        $enabledBackdrop = false,
                        $fnPositive = undefined,
                        $enabledNegative = true,
                        $fnNegative = undefined;
                    
                    var Alert = function () {
                        var self = this; // Objeto Alert

                        $dialog = softtion.html("div").
                            addClass(["dialog", "alert"]).tojQuery();

                        $backdrop = softtion.html("div").
                            addClass("backdrop").tojQuery();

                        var box = softtion.html("div").
                            addClass("box").tojQuery();

                        $title = softtion.html("div").
                            addClass("title").tojQuery();

                        $content = softtion.html("div").
                            addClass("content").tojQuery();

                        var actions = softtion.html("div").
                            addClass("actions").tojQuery();

                        $buttonPositive = softtion.html("button").
                            addClass(["flat","positive"]).tojQuery();

                        $buttonNegative = softtion.html("button").
                            addClass(["flat","negative"]).tojQuery();
                        
                        box.append($title); box.append($content); box.append(actions);
                        actions.append($buttonPositive); actions.append($buttonNegative);
                        $dialog.append($backdrop); $dialog.append(box);

                        $backdrop.on("click", function () { 
                            if ($enabledBackdrop) { self.hide(); } // Cerrando 
                        });

                        $buttonPositive.on("click", function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.isFunction($fnPositive)) {
                                $scope.$apply(function () { $fnPositive(); });
                            } // Se establecío función para proceso Positivo
                        });

                        $buttonNegative.on("click", function () { 
                            self.hide(); // Ocultado el modal

                            if (softtion.isFunction($fnNegative)) {
                                $scope.$apply(function () { $fnNegative(); });
                            } // Se establecío función para proceso Negativo
                        });
                        //$bodyElement.append($dialog); // Agregando Alert
                    };

                    Alert.prototype.setTitle = function (title) {
                        if (softtion.isString(title)) {
                            $title.html(title); $title.removeClass("hidden");
                        } else {
                            $title.addClass("hidden");
                        } // Titulo definido no es una cadena
                        
                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.setContent = function (content) {
                        $content.html(content); return this;
                    };

                    Alert.prototype.setLabelPositive = function (label) {
                        $buttonPositive.html(label); return this;
                    };

                    Alert.prototype.setLabelNegative = function (label) {
                        $buttonNegative.html(label); return this;
                    };
                    
                    Alert.prototype.isEnabledNegative = function (enabled) {
                        $enabledNegative = enabled; return this;
                    };

                    Alert.prototype.isEnabledBackdrop = function (enabled) {
                        $enabledBackdrop = enabled; return this;
                    };

                    Alert.prototype.setFunctionPositive = function (fnPositive) {
                        $fnPositive = fnPositive; return this;
                    };

                    Alert.prototype.setFunctionNegative = function (fnNegative) {
                        $fnNegative = fnNegative; return this;
                    };

                    Alert.prototype.setSettings = function (options) {
                        var defaults = {
                            title: "", content: "",
                            labelNegative: "Cancelar",
                            labelPositive: "Aceptar",
                            enabledNegative: true,
                            enabledBackdrop: false,
                            functionPositive: undefined,
                            functionNegative: undefined
                        };
                        
                        angular.extend(defaults, options); 
                        
                        this.isEnabledBackdrop(defaults.enabledBackdrop);
                        this.isEnabledNegative(defaults.enabledNegative);
                        this.setTitle(defaults.title);
                        this.setContent(defaults.content);
                        this.setLabelPositive(defaults.labelPositive);
                        this.setLabelNegative(defaults.labelNegative);
                        this.setFunctionPositive(defaults.functionPositive);
                        this.setFunctionNegative(defaults.functionNegative);

                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.show = function () {
                        if (!$dialog.hasClass("show")) {
                            $body.addClass("body-overflow-none");
                            
                            ($enabledNegative) ?
                                $buttonNegative.removeClass("hidden") :
                                $buttonNegative.addClass("hidden");
                            
                            $dialog.addClass("show");
                        } // Dialog no se encuentra visible en la Aplicación
                    };

                    Alert.prototype.hide = function () {
                        if ($dialog.hasClass("show")) {
                            $body.removeClass("body-overflow-none");
                            $dialog.removeClass("show"); 
                        } // Dialog se encuentra visible en la Aplicación
                    };
                    
                    var alertProvider = new Alert();
                    
                    this.get = function () { return alertProvider; };
                    
                    var fnProvider = function ($bodyElement, $rootScope) { 
                        $bodyElement.append($dialog); // Dialog
                        $body = $bodyElement; $scope = $rootScope; 
                        
                        return alertProvider; // Retornando Proveedor
                    };
                    
                    this.$get = ["$body", "$rootScope", fnProvider];
                }
            },
            
            Body: {
                name: "$body",
                method: function () {
                    var $body = angular.element(document.body);
                    
                    this.$get = function () { return $body; };
                }
            },
            
            BottomSheet: {
                name: "$bottomSheet",
                method: function () {
                    var bottomSheet = undefined, 
                        $body = undefined,
                        content = undefined, 
                        backdrop = undefined;
                    
                    var BottomSheet = function () {};

                    BottomSheet.prototype.set = function (sheetElement) {
                        var self = this; // Componente
                        
                        bottomSheet = instanceElement(sheetElement, "bottom-sheet");
                        
                        executeIfExists(bottomSheet, function () {
                            if (bottomSheet.exists()) {
                                content = bottomSheet.children(".content");
                                backdrop = bottomSheet.children(".backdrop");

                                backdrop.click(function () { self.hide(); });
                            } // BottomSheet existe en el Documento
                        });
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    BottomSheet.prototype.show = function () {
                        executeIfExists(bottomSheet, function () {
                            if (!bottomSheet.hasClass("show")) {
                                var appContent = bottomSheet.parents(".app-content"),
                                    isInAppcontent = (appContent.exists()),
                                    container = (isInAppcontent) ? appContent : $body;

                                container.addClass("overflow-none");

                                if (isInAppcontent) {
                                    bottomSheet.addClass("show");
                                } else {
                                    bottomSheet.addClass("show-content");
                                    content.css("margin-bottom", container.scrollTop());
                                } // Componente no se encuentra en AppContent
                            } // BottomSheet existe, no se encuentra activo
                        });
                    };

                    BottomSheet.prototype.hide = function () {
                        executeIfExists(bottomSheet, function () {
                            if ((bottomSheet.hasClass("show") || 
                                bottomSheet.hasClass("show-content"))) {
                            
                                var appContent = bottomSheet.parents(".app-content"),
                                    isInAppcontent = (appContent.exists()),
                                    container = (isInAppcontent) ? appContent : $body;
                                    container.removeClass("overflow-none");

                                (!isInAppcontent) ? 
                                    bottomSheet.removeClass("show-content") :
                                    bottomSheet.removeClass("show");

                                var marginBottom = content.outerHeight();
                                content.css("margin-bottom", (marginBottom * -1) - 1);
                            } // BottomSheet existe, se encuentra activo
                        });
                    };
                    
                    var bottomSheetProvider = new BottomSheet();

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return bottomSheetProvider; 
                    }];
                    
                    this.get = function () { return bottomSheetProvider; };
                }
            },
            
            Dialog: {
                name: "$dialog",
                method: function () {
                    var dialog = undefined,
                        box = undefined,
                        $body = undefined,
                        backdrop = undefined,
                        persistent = false;
                    
                    var Dialog = function () {};

                    Dialog.prototype.set = function (dialogElement) {
                        var self = this; // Sidenav
                        
                        dialog = instanceElement(dialogElement, "dialog");
                        
                        executeIfExists(dialog, function () {
                            if (dialog.exists()) {
                                box = dialog.children(".box");
                                backdrop = dialog.children(".backdrop");

                                if (!backdrop.exists()) {
                                    backdrop = angular.element(
                                        softtion.html("div").addClass("backdrop").create()
                                    );

                                    dialog.append(backdrop);

                                    backdrop.click(function () { 
                                        if (!persistent) { self.hide(); }
                                    });
                                }
                            } // Dialog existe en el Documento
                        });
                        
                        return this; // Retornando interfaz fluida
                    };

                    Dialog.prototype.show = function (isPersistent) {
                        executeIfExists(dialog, function () {
                            if (!dialog.hasClass("show")) {
                                persistent = isPersistent;
                                $body.addClass("body-overflow-none"); 
                                dialog.addClass("show"); // No scroll
                            } // Dialog no se encuentra activo
                        });
                    };

                    Dialog.prototype.hide = function () {
                        executeIfExists(dialog, function () {
                            if (dialog.hasClass("show")) {
                                $body.removeClass("body-overflow-none"); 
                                dialog.removeClass("show"); // Scroll
                            } // Dialog se encuentra activo
                        });
                    };
                    
                    var dialog = new Dialog();
                    
                    this.get = function () { return dialog; };

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return dialog; 
                    }];
                }
            },
            
            Dropdown: {
                name: "$dropdown",
                handler: {
                    settingsElement: function (origin, dropdown, classElement) {
                        var settings = {
                                top: 0, left: 0, moveLeft: false,
                                innerWidth: window.innerWidth, 
                                innerHeight: window.innerHeight
                            },  
                            element = origin.parents(classElement),
                            position = origin.positionParent(classElement + " > .content"),
                            content = element.children(".content"), 
                            flexibleBox = origin.parents(".flexible-box");

                        if (flexibleBox.exists()) {
                            if (origin.parents(".flexible-box > .banner").exists()) {
                                dropdown.appendTo(flexibleBox);

                                settings.innerWidth = content.width();
                                settings.innerHeight = content.height();
                            } else {
                                var box = flexibleBox.children(".box"), 
                                    contentFlexible = box.children(".content");

                                dropdown.appendTo(contentFlexible); 
                                position.top += box.scrollTop();

                                settings.innerWidth = contentFlexible.width();
                                settings.innerHeight = contentFlexible.height();
                            }
                        } else {
                            dropdown.appendTo(content); 
                            position.top += content.scrollTop();

                            settings.innerWidth = content.width();
                            settings.innerHeight = content.height();
                        }

                        return angular.extend(settings, position);
                    },
                    
                    settingsDropdown: function (dropdown, origin) {
                        var settings = {
                            top: 0, left: 0, moveLeft: true,
                            moveScroll: true,
                            innerWidth: window.innerWidth, 
                            innerHeight: window.innerHeight
                        }; // Configuración estandar para posición
                        
                        if (origin.exists()) {
                            if (origin.parents(".form-navigation").exists()) {
                                return this.settingsElement(origin, dropdown, ".form-navigation");
                            } // Elemento está contenido en un FormNavigation
                            
                            if (origin.parents(".bottom-sheet").exists()) {
                                return this.settingsElement(origin, dropdown, ".bottom-sheet");
                            } // Elemento está contenido en un BottomSheet
                            
                            if (origin.parents(".app-bar").exists()) {
                                dropdown.appendTo(origin.parents(".app-bar")); settings.moveScroll = false;
                            } // Elemento está contenido en un Appbar
                        
                            return angular.extend(settings, origin.offset()); 
                        } // Se definío elemento que disparó despliegue del dropdown
                        
                        return settings; // Configuración por defecto
                    },
                    
                    hide: function (dropdown) {
                        dropdown.removeClass("active"); 
                    },
                    
                    show: function (options) {
                        var handler = Material.providers.Dropdown.handler,
                            appContent = angular.element(".app-content"),
                            dropdown = options.dropdown, 
                            origin = options.origin,
                            settings = handler.settingsDropdown(dropdown, origin),
                            leftBody = parseInt(angular.element(".app-body").css("left"));
                        
                        var heightDropdown = dropdown.innerHeight(),
                            widthDropdown = dropdown.innerWidth(),
                            
                            heightOrigin = (origin) ? origin.innerHeight() : 0, 
                            widthOrigin = (origin) ? origin.innerWidth() : 0,
                            
                            posOriginY = settings.top, posOriginX = settings.left,
                            
                            // Atributos finales del Dropdown
                            left, top, originEffect, transformOrigin = 0; 
                            
                        dropdown.addClass("active"); // Activado dropdown
                            
                        // Definiendo posicion eje X
                        if ((posOriginX + widthDropdown) <= (settings.innerWidth)) {
                            left = posOriginX; 
                            transformOrigin = transformOrigin + 1;
                        } else if ((posOriginX + widthOrigin - widthDropdown) > 0) {
                            transformOrigin = transformOrigin + 3;
                            left = posOriginX + widthOrigin - widthDropdown - 10; 
                        } else { 
                            transformOrigin = transformOrigin + 1; 
                            left = settings.innerWidth - widthDropdown - 10; 
                        }

                        // Definiendo posicion eje Y
                        if (options.belowOrigin) { 
                            if ((posOriginY + heightDropdown) <= (settings.innerHeight)) {
                                top = posOriginY;
                                transformOrigin = transformOrigin + 4;
                            } else if ((posOriginY + heightOrigin - heightDropdown) > 0) {
                                transformOrigin = transformOrigin + 7;
                                top = posOriginY + heightOrigin - heightDropdown; 
                            } else { 
                                transformOrigin = transformOrigin + 4;
                                top = settings.innerHeight - heightDropdown - 10;  
                            }
                        } else { 
                            if ((posOriginY + heightOrigin + heightDropdown) <= settings.innerHeight) {
                                top = posOriginY + heightOrigin; 
                                transformOrigin = transformOrigin + 4;
                            } else if ((posOriginY - heightDropdown) > 0) {
                                top = posOriginY - heightDropdown; 
                                transformOrigin = transformOrigin + 7;
                            } else { 
                                transformOrigin = transformOrigin + 4; 
                                top = settings.innerHeight - heightDropdown - 10;
                            }
                        }
                        
                        switch (transformOrigin) {
                            case (5): originEffect = "0 0"; break;
                            case (7): originEffect = "100% 0"; break;
                            case (8): originEffect = "0 100%"; break;
                            case (10): originEffect = "100% 100%"; break;
                            default: originEffect = "0 0"; break;
                        } // Definiendo inicio del efecto
                        
                        if (settings.moveLeft) {
                            dropdown.removeClass("fixed"); left = left - leftBody; 
                            
                            if (settings.moveScroll) {
                                top = top + appContent.scrollTop(); 
                            } // Desplazando con Scroll
                        } else {
                            dropdown.addClass("fixed");
                        }// Componente debe moverse con scroll de AppContent
                        
                        dropdown.css({ 
                            left: left, top: top,
                            "-moz-transform-origin": originEffect,
                            "-webkit-transform-origin": originEffect,
                            "-o-transform-origin": originEffect,
                            "transform-origin": originEffect,
                            "-ms-transform-origin": originEffect
                         }); 
                    },
                    
                    showXY: function (options, left, top) {
                        var dropdown = options.dropdown;
                        dropdown.addClass("active"); // Activando dropdown
                        
                        var heightDropdown = dropdown.innerHeight(),
                            widthDropdown = dropdown.innerWidth(),
                            transformOrigin = 0, originEffect;
                        
                        // Definiendo posicion del eje X
                        if ((left + widthDropdown) <= (window.innerWidth)) {
                            transformOrigin = transformOrigin + 1;
                        } else if ((left - widthDropdown) > 0) {
                            transformOrigin = transformOrigin + 3; 
                            left = left - widthDropdown - 10; 
                        } else { 
                            transformOrigin = transformOrigin + 1; 
                            left = window.innerWidth - widthDropdown - 10; 
                        }

                        // Definiendo posicion del eje Y
                        if (options.belowOrigin) { 
                            if ((top + heightDropdown) <= (window.innerHeight)) {
                                transformOrigin = transformOrigin + 4;
                            } else if ((top - heightDropdown) > 0) {
                                transformOrigin = transformOrigin + 7;
                                top = top - heightDropdown; 
                            } else { 
                                transformOrigin = transformOrigin + 4; 
                                top = window.innerHeight - heightDropdown - 10;  
                            }
                        } else { 
                            if ((top + heightDropdown) <= window.innerHeight) {
                                transformOrigin = transformOrigin + 4;
                            } else if ((top - heightDropdown) > 0) {
                                top = top - heightDropdown; 
                                transformOrigin = transformOrigin + 7;
                            } else { 
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
                        } // Definiendo inicio del efecto
                        
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
                    var belowOrigin = true, 
                        $body = undefined,
                        dropdown = undefined, 
                        origin = undefined;
                    
                    var Dropdown = function () { };

                    Dropdown.prototype.set = function (dropdownElement) { 
                        dropdown = instanceElement(dropdownElement, "dropdown"); 
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    Dropdown.prototype.setBelowOrigin = function (belowOriginDropdown) {
                        belowOrigin = belowOriginDropdown; return this;
                    };

                    Dropdown.prototype.isActive = function () {
                        if (softtion.isDefined(dropdown)) {
                            return dropdown.hasClass("active");
                        } // Esta definido el Dropdown

                        return false; // Se desconoce el Componente
                    };

                    Dropdown.prototype.show = function (originElement, autoclose) {
                        var self = this, // Instancia del proveedor
                            nameEvent = "click.hidedropdown-" + softtion.getGUID();
                        
                        executeIfExists(dropdown, function () {
                            origin = originElement; // Estableciendo origen
                            
                            Material.providers.Dropdown.handler.show({
                                origin: origin, belowOrigin: belowOrigin, dropdown: dropdown
                            }); 
                            
                            if (autoclose) {
                                $body.on(nameEvent, function ($event) {
                                    if (dropdown.find($event.target).length === 0) {
                                        self.set(dropdown).hide(); $body.off(nameEvent);
                                    } // Se debe cerrar el dropdown de manera automatica
                                });
                            }
                        });
                    };
                    
                    Dropdown.prototype.showXY = function (left, top, autoclose) {
                        var self = this, // Instancia del proveedor
                            nameEvent = "click.hidedropdown-" + softtion.getGUID();
                        
                        executeIfExists(dropdown, function () {
                            Material.providers.Dropdown.handler.showXY({
                                belowOrigin: belowOrigin, dropdown: dropdown
                            }, left, top); 
                            
                            if (autoclose) {
                                $body.on(nameEvent, function ($event) {
                                    if (dropdown.find($event.target).length === 0) {
                                        self.set(dropdown).hide(); $body.off(nameEvent);
                                    } // Se debe cerrar el dropdown de manera automatica
                                });
                            }
                        });
                    };

                    Dropdown.prototype.hide = function () {
                        if (this.isActive()) { 
                            Material.providers.Dropdown.handler.hide(dropdown); 
                        } // Esta abierto el dropdown en el Provedor
                    };
                    
                    var dropdownProvider = new Dropdown();

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return dropdownProvider;
                    }];
                    
                    this.get = function () { return dropdownProvider; };
                }
            },
            
            FormNavigation: {
                name: "$formNavigation",
                method: function () {
                    var $body = undefined,
                        form = undefined,
                        backdrop = undefined;
                    
                    var FormNavigation = function () {};

                    FormNavigation.prototype.set = function (formElement) {
                        var self = this; // Instancia del Proveedor
                        
                        form = instanceElement(formElement, "form-navigation");
                        
                        executeIfExists(form, function () {
                            if (form.exists()) {
                                backdrop = form.children(".backdrop");

                                if (!backdrop.exists()) {
                                    backdrop = angular.element(
                                        softtion.html("div").
                                            addClass("backdrop").create()
                                    );

                                    form.append(backdrop);
                                    
                                    backdrop.click(function () { self.hide(); });
                                }
                            } // Existe elemento FormNavigation en el documento
                        });
                        
                        return this; // Retornando interfaz fluida
                    };

                    FormNavigation.prototype.show = function () {
                        executeIfExists(form, function () {
                            if (!form.hasClass("show")) {
                                $body.addClass("body-overflow-none"); 
                                form.removeClass("hide").addClass("show"); 
                            } // FormNavigation no se encuentra activo
                        });
                    };

                    FormNavigation.prototype.hide = function () {
                        executeIfExists(form, function () {
                            if (form.hasClass("show")) {
                                $body.removeClass("body-overflow-none");
                                form.removeClass("show").addClass("hide"); 
                            } // FormNavigation se encuentra activo
                        });
                    };
                    
                    var formNavigationProvider = new FormNavigation();

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return formNavigationProvider; 
                    }];
                    
                    this.get = function () { return formNavigationProvider; };
                }
            },
            
            ProgressBar: {
                name: "$progressBar",
                method: function () {
                    var $scope = undefined,
                        progressBar = undefined,
                        callback = undefined,
                        functionStart = false,
                        isDeterminate = false,
                        events = [
                            "animationend", "oAnimationEnd", "mozAnimationEnd", "webkitAnimationEnd"
                        ];
                    
                    var ProgressBar = function () {};

                    ProgressBar.prototype.set = function (progressElement) {
                        progressBar = instanceElement(progressElement, "progress-bar");
                        
                        return this; // Retornando como interfaz fluida
                    };
                    
                    ProgressBar.prototype.show = function () {
                        executeIfExists(progressBar, 
                            function () { progressBar.addClass("show"); }
                        );
                        
                        return this; // Retornando como interfaz fluida
                    };
                    
                    ProgressBar.prototype.determinate = function (duration, callbackFunction) {
                        executeIfExists(progressBar, function () { 
                            if (!progressBar.hasClass("indeterminate")) {
                                isDeterminate = true; duration = duration || 4000;

                                var bar = progressBar.children(".bar");

                                if (!functionStart) {
                                    callback = callbackFunction;
                                } // No se ha iniciado ningún proceso

                                functionStart = true; // Inicio de efecto

                                bar.css("-moz-animation-duration", (duration + "ms"));
                                bar.css("-webkit-animation-duration", (duration + "ms"));
                                bar.css("animation-duration", (duration + "ms"));
                                bar.css("-o-animation-duration", (duration + "ms"));
                                bar.css("-ms-animation-duration", (duration + "ms"));

                                var bar = progressBar.children(".bar");

                                if (!bar.hasEventListener(events)) {
                                    bar.animationend(function () { 
                                        if (isDeterminate) {
                                            progressBar.removeClass("show"); 
                                        } // Se invoco método determinado

                                        isDeterminate = false; functionStart = false;

                                        if (softtion.isFunction(callback)) {
                                            $scope.$apply(function () { callback(); });
                                        } // Invocando función al terminar animación
                                    });
                                }
                            } // Componente no es Indeterminado
                        });
                    };

                    ProgressBar.prototype.hide = function () {
                        executeIfExists(progressBar, 
                            function () { progressBar.removeClass("show"); }
                        );
                    };
                    
                    var setPercentageBuffering = function (component, percentage) {
                        var buffer = component.children(".buffer"),
                            bar = component.children(".bar"),
                            
                            bufferPercentage = percentage + 15;
                        
                        if (bufferPercentage > 100) {
                            bufferPercentage = 100;
                        } // No debe sobrepasar el 100%
                        
                        bar.css("width", percentage + "%");
                        buffer.css("width", bufferPercentage + "%");
                    };
                    
                    ProgressBar.prototype.setPercentage = function (percentage) {
                        executeIfExists(progressBar, function () { 
                            if (progressBar.hasClass("indeterminate")) {
                                return;
                            } // No se le aplican propiedades porcentuales

                            if (isNaN(percentage)) {
                                return;
                            } // Dato establecido no es númerico

                            if (percentage < 0) {
                                percentage = 0;
                            } // No debe ser menor a 0%

                            if (percentage > 100) {
                                percentage = 100;
                            } // No debe sobrepasar el 100%

                            !(progressBar.hasClass("buffering")) ?
                                progressBar.children(".bar").css("width", percentage + "%") :
                                setPercentageBuffering(progressBar, percentage);
                        });
                    };
                    
                    var progressBarProvider = new ProgressBar();
                    
                    this.get = function () { return progressBarProvider; };

                    this.$get = ["$rootScope", function ($rootScope) {
                        $scope = $rootScope; return progressBarProvider; 
                    }];
                }
            },
            
            ProgressButtonFloating: {
                name: "$progressFAB",
                method: function () {
                    var progressFab = undefined,
                        circular = undefined,
                        events = [
                            "animationend", "oAnimationEnd", "mozAnimationEnd", "webkitAnimationEnd"
                        ];
                    
                    var ProgressFAB = function () {};
                    
                    ProgressFAB.prototype.set = function (progressElement) {
                        progressFab = instanceElement(progressElement, "progress-button-floating");
                        
                        executeIfExists(progressFab, function () {
                            if (progressFab.exists()) {
                                circular = progressFab.children(".progress-circular");

                                if (!circular.hasEventListener(events)) {
                                    circular.animationend(function () { 
                                        progressFab.removeClass("start").addClass("finish"); 
                                    });
                                } // No tiene establecido finalización de Animación
                            } // Componente se ha definido
                        });
                        
                        return this; // Retornando como interfaz fluida
                    };
                    
                    ProgressFAB.prototype.determinate = function (time) {
                        executeIfExists(progressFab, function () {
                            if (!progressFab.hasClass("finish")) {
                                time = isNaN(time) ? 4000 : time;
                                propertyStyle("--time-progress-circular", time + "ms"); 

                                progressFab.addClass("start"); // Iniciando
                            } // Componente no esta finalizado
                        });
                    };
                    
                    ProgressFAB.prototype.restore = function () {
                        executeIfExists(progressFab, function () {
                            progressFab.removeClass("finish");
                        }); // Componente esta definido en el Proveedor
                    };

                    var progressFabProvider = new ProgressFAB();
                    
                    this.$get = function () { return progressFabProvider; };
                    
                    this.get = function () { return progressFabProvider; };
                }
            },
            
            ProgressCircular: {
                name: "$progressCircular",
                method: function () {
                    var progressCircular = undefined,
                        circularRefresh = undefined,
                        events = [
                            "animationend", "oAnimationEnd", "mozAnimationEnd", "webkitAnimationEnd"
                        ];
                    
                    var ProgressCircular = function () { };
                    
                    ProgressCircular.prototype.set = function (circularElement) {
                        progressCircular = instanceElement(circularElement, "progress-circular"); return this;
                    };

                    ProgressCircular.prototype.show = function () {
                        executeIfExists(progressCircular, function () { 
                            progressCircular.addClass("show"); 
                        }); // Visualizando progress circular del documento
                    };

                    ProgressCircular.prototype.hide = function () {
                        executeIfExists(progressCircular, function () { 
                            progressCircular.removeClass("show"); 
                        }); // Ocultando progress circular del documento
                    };
                    
                    ProgressCircular.prototype.refreshInstance = function () {
                        if (softtion.isUndefined(circularRefresh)) {
                            circularRefresh = angular.element(
                                softtion.html("div").
                                    addClass("refresh-progress-circular").
                                    addChildren(
                                        softtion.html("div").addClass(
                                            ["progress-circular", "indeterminate"]
                                        ).addChildren(
                                            softtion.html("svg").
                                                addAttribute("viewBox", "0 0 32 32").
                                                addChildren(softtion.html("circle"))
                                        )
                                    ).create()
                            );

                            var appBar = angular.element(".app-bar");

                            (appBar.exists()) ? appBar.append(circularRefresh) :
                                angular.element(".app-content").append(circularRefresh);
                        } // Ya se encuentra instanciado
                        
                        return this; // Retornando como interfaz fluida
                    };

                    ProgressCircular.prototype.refreshShow = function () {
                        executeIfExists(circularRefresh, function () {
                            circularRefresh.addClass("show"); 
                        }); // Visualizando progress circular para refrescar
                    };

                    ProgressCircular.prototype.refreshHide = function () {
                        executeIfExists(circularRefresh, function () {
                            circularRefresh.removeClass("show"); 
                        }); // Ocultando progress circular para refrescar
                    };
                    
                    ProgressCircular.prototype.determinate = function (time, round) {
                        executeIfExists(progressCircular, function () {
                            if (progressCircular.hasClass("indeterminate")) {
                                return;
                            } // Componente es Indeterminado, no realiza efecto

                            time = isNaN(time) ? 4000 : time;
                            round = isNaN(round) ? 3 : round;

                            propertyStyle("--time-progress-circular", time + "ms"); 
                            propertyStyle("--round-progress-circular", (round * 360 - 90) + "deg"); 

                            this.show(); // Haciendo visible el componente

                            if (!progressCircular.hasEventListener(events)) {
                                progressCircular.animationend(function () { 
                                    progressCircular.removeClass("show"); 
                                });
                            } // No tiene establecido finalización de Animación
                        });
                    };

                    var progressCircularProvider = new ProgressCircular();
                    
                    this.$get = function () { return progressCircularProvider; };
                    
                    this.get = function () { return progressCircularProvider; };
                }
                
            },
            
            Sidenav: {
                name: "$sidenav",
                method: function () {
                    var sidenav = undefined,
                        $body = undefined,
                        backdrop = undefined;
                
                    var SideNav = function () { };

                    SideNav.prototype.set = function (sidenavElement) {
                        var self = this; // Sidenav
                        
                        sidenav = instanceElement(sidenavElement, "sidenav");
                        
                        executeIfExists(sidenav, function () {
                            if (sidenav.exists()) {
                                backdrop = sidenav.children(".backdrop");

                                if (!backdrop.exists()) {
                                    backdrop = angular.element(
                                        softtion.html("div").addClass("backdrop").create()
                                    );

                                    sidenav.append(backdrop);
                                    backdrop.click(function () { self.hide(); });
                                }
                            } // Sidenav existe en el Documento
                        });
                        
                        return this; // Retornando interfaz fluida
                    };

                    SideNav.prototype.show = function () {
                        executeIfExists(sidenav, function () {
                            if (!sidenav.hasClass("show")) {
                                $body.addClass("body-overflow-none"); // No scroll
                                sidenav.removeClass("hide").addClass("show");
                            } // Sidenav no se encuentra activo
                        });
                    };

                    SideNav.prototype.hide = function () {
                        executeIfExists(sidenav, function () {
                            if (sidenav.hasClass("show")) {
                                $body.removeClass("body-overflow-none"); // Scroll
                                sidenav.removeClass("show").addClass("hide");
                            } // Sidenav no se encuentra activo
                        });
                    };
                    
                    var sidenavProvider = new SideNav();

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return sidenavProvider; 
                    }];
                    
                    this.get = function () { return sidenavProvider; };
                }
            },
            
            Snackbar: {
                name: "$snackbar",
                moveButton: function (isShow, selector, height) {
                    var button = angular.element(selector); // Action Button
                        
                    if (button.exists() && (window.innerWidth <= 640)) {
                        (isShow) ? button.css("margin-bottom", (height) + "px") :
                            button.css("margin-bottom", "0px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var body = undefined, 
                        $scope = undefined,
                        Softtion = undefined,
                        box = undefined, 
                        action = undefined,
                        hiddenSnackbar = undefined;
                    
                    var SnackBar = function () { 
                        body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );
                
                        action = angular.element(
                            softtion.html("div").addClass(["action"]).create()
                        );

                        box = angular.element(
                            softtion.html("div").addClass(["snackbar"]).create()
                        );

                        box.append(body); box.append(action);
                        
                        angular.element(".app-body").append(box);
                    };

                    SnackBar.prototype.show = function (text, optionsAction) {
                        var heightBody, self = this, // Snackbar
                            selector = Softtion.Selectors.FAB,
                            $moveButton = Material.providers.Snackbar.moveButton,
                            bottomNavigation = angular.element(".bottom-navigation");
                            
                        action.height(0); // Ocultando acción

                        if (!box.hasClass("active")) {
                            body.html(text); heightBody = parseInt(body.height());
                            
                            (heightBody > 20) ? body.addClass("two-line") : 
                                body.removeClass("two-line");
                            
                            if (softtion.isDefined(optionsAction)) {
                                var span = "<span>" + optionsAction.label + "</span>";
                                action.html(span); // Texto de acción                                
                                
                                var widthAction = action.find("span").width(),
                                    widthBody = "calc(100% - " + (widthAction + 30) + "px)";
                                
                                body.css("padding-right", "24px");
                                body.css("width", widthBody);
                                
                                action.css("height", box.height());
                                
                                action.find("span").click(function () {
                                    if (softtion.isFunction(optionsAction.action)) {
                                        $scope.$apply(function () { 
                                            optionsAction.action(); 
                                        }); // Ejecutando evento Action del Snackbar

                                        if (softtion.isDefined(hiddenSnackbar)) {
                                            clearTimeout(hiddenSnackbar); hiddenSnackbar = undefined;
                                        } // Existe un cierre pendiente por realizar

                                        action.html(""); $moveButton(false, selector); 
                                        box.removeClass("show").removeClass("active"); 
                                    } // Ejecutando acción establecida en el Controlador
                                });
                            } else {
                                action.html(""); body.css("width", "100%");
                                body.css("padding-right", "0px");
                            } // No se ha definido acción para disparar en el componente
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                box.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            box.addClass("active").addClass("show");
                            $moveButton(true, selector, box.height()); 

                            hiddenSnackbar = setTimeout(
                                function () {
                                    hiddenSnackbar = undefined; $moveButton(false, selector); 
                                    box.removeClass("show").removeClass("active"); 
                                },
                                3500 // Tiempo de espera para ocultarse
                            );
                        } else {
                            action.html(""); heightBody = parseInt(body.css("height"));
                            
                            if (softtion.isDefined(hiddenSnackbar)) {
                                clearTimeout(hiddenSnackbar); hiddenSnackbar = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            $moveButton(false, selector); box.removeClass("show").removeClass("active"); 
                            
                            setTimeout(
                                function () { self.show(text, optionsAction); }, 350
                            ); // Temporizador para visualizar
                        }
                    };

                    var snackbar = new SnackBar(); // Proveedor Snackbar
                    
                    this.get = function () { return snackbar; };
                    
                    var fnProvider = function ($rootScope, SofttionMaterial) { 
                        Softtion = SofttionMaterial; $scope = $rootScope; return snackbar; 
                    };
                    
                    this.$get = ["$rootScope", "SofttionMaterial", fnProvider];
                }
            },
            
            Toast: {
                name: "$toast",
                moveButton: function (isShow, selector, height) {
                    var button = angular.element(selector); // Action Button
                        
                    if (button.exists() && (window.innerWidth <= 640)) {
                        (isShow) ? button.css("margin-bottom", (height - 16) + "px") :
                            button.css("margin-bottom", "0px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var body = undefined, 
                        box = undefined,
                        hiddenToast = undefined,
                        Softtion = undefined;
                    
                    var Toast = function () { 
                        box = angular.element(
                            softtion.html("div").addClass(["toast"]).create()
                        );
                
                        body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );

                        box.append(body); angular.element(".app-body").append(box);
                    };

                    Toast.prototype.show = function (text) {
                        var heightBody, self = this, // Toast
                            selector = Softtion.Selectors.FAB,
                            $moveButton = Material.providers.Toast.moveButton,
                            bottomNavigation = angular.element(".bottom-navigation");

                        if (!box.hasClass("active")) {
                            body.html(text); heightBody = parseInt(body.height());
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                box.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            box.addClass("active").addClass("show");
                            $moveButton(true, selector, box.innerHeight()); 

                            hiddenToast = setTimeout(
                                function () {
                                    hiddenToast = undefined; $moveButton(false, selector); 
                                    box.removeClass("show").removeClass("active");
                                },
                                3500 // Tiempo de espera para ocultarse
                            );
                        } else {
                            heightBody = parseInt(body.css("height"));
                            
                            if (softtion.isDefined(hiddenToast)) {
                                clearTimeout(hiddenToast); hiddenToast = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            $moveButton(false, selector); 
                            box.removeClass("show").removeClass("active"); 
                            
                            setTimeout(
                                function () { self.show(text); }, 350
                            ); // Temporizador para visualizar
                        }
                    };

                    var toast = new Toast(); // Proveedor Toast
                    
                    this.get = function () { return toast; };
                    
                    var providerToast = function (SofttionMaterial) { 
                        Softtion = SofttionMaterial; return toast; 
                    };
                    
                    this.$get = ["SofttionMaterial", providerToast];
                }
            },
            
            ThemeMaterial: {
                name: "$themeMaterial",
                method: ["ColorMaterial", function (ColorMaterial) {
                        
                    var ThemeMaterial = function () {};
                    
                    ThemeMaterial.prototype.setPrimary = function (nameTheme) {
                        var theme = ColorMaterial.background[nameTheme],
                            border = ColorMaterial.border, ripple = ColorMaterial.ripple;
                            
                        if (softtion.isDefined(theme)) {
                            // Colores de fondo
                            propertyStyle("--theme-primary-background", theme["500"]);
                            propertyStyle("--theme-primary-background-light", theme["300"]);
                            propertyStyle("--theme-primary-background-dark", theme["900"]);
                            
                            // Colores de estado
                            propertyStyle("--theme-primary-background-focus", theme["700"]);
                            propertyStyle("--theme-primary-background-hover", theme["200"]);
                            propertyStyle("--theme-primary-background-disabled", theme["100"]);
                            
                            // Color de borde
                            propertyStyle("--theme-primary-background-border", border[theme.baseColor]);
                            
                            // Colores de fuente
                            var font = ColorMaterial.font[theme.baseColor];
                            
                            propertyStyle("--theme-primary-font", theme["500"]);
                            propertyStyle("--theme-primary-font-disabledcolor", theme["100"]);
                            
                            propertyStyle("--theme-primary-font-active", font.primary);
                            propertyStyle("--theme-primary-font-alternative", font.alternative);
                            propertyStyle("--theme-primary-font-inactive", font.secondary);
                            propertyStyle("--theme-primary-font-disabled", font.disabled);
                            
                            propertyStyle("--theme-primary-ripple", ripple[theme.baseColor]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    ThemeMaterial.prototype.setError = function (nameTheme) {
                        var theme = ColorMaterial.background[nameTheme];
                            
                        if (softtion.isDefined(theme)) {
                            propertyStyle("--theme-error-background", theme["500"]);
                            propertyStyle("--theme-error-font", theme["500"]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    ThemeMaterial.prototype.setSecondary = function (nameTheme) {
                        var theme = ColorMaterial.background[nameTheme],
                            border = ColorMaterial.border, ripple = ColorMaterial.ripple;
                            
                        if (softtion.isDefined(theme)) {
                            // Colores de fondo
                            propertyStyle("--theme-secondary-background", theme["500"]);
                            propertyStyle("--theme-secondary-background-light", theme["300"]);
                            propertyStyle("--theme-secondary-background-dark", theme["900"]);
                            
                            // Colores de estado
                            propertyStyle("--theme-secondary-background-focus", theme["700"]);
                            propertyStyle("--theme-secondary-background-hover", theme["200"]);
                            propertyStyle("--theme-secondary-background-disabled", theme["100"]);
                            
                            // Color de borde
                            propertyStyle("--theme-secondary-background-border", border[theme.font]);
                            
                            // Colores de fuente
                            var font = ColorMaterial.font[theme.baseColor];
                            
                            propertyStyle("--theme-secondary-font", theme["500"]);
                            propertyStyle("--theme-secondary-font-disabledcolor", theme["100"]);
                            
                            propertyStyle("--theme-secondary-font-active", font.primary);
                            propertyStyle("--theme-secondary-font-alternative", font.alternative);
                            propertyStyle("--theme-secondary-font-inactive", font.secondary);
                            propertyStyle("--theme-secondary-font-disabled", font.disabled);
                            
                            propertyStyle("--theme-secondary-ripple", ripple[theme.baseColor]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    var themeMaterial = new ThemeMaterial();
                    
                    this.$get = function () { return themeMaterial; };
                    
                    this.setPrimary = function (nameTheme) {
                        themeMaterial.setPrimary(nameTheme); return this;
                    };
                    
                    this.setError = function (nameTheme) {
                        themeMaterial.setError(nameTheme); return this;
                    };
                    
                    this.setSecondary = function (nameTheme) {
                        themeMaterial.setSecondary(nameTheme); return this;
                    };
                }]
            }
        }
    };
    
    // Directivas de SofttionMaterial
    angular.forEach(Material.components, function (component) {
        ngMaterial.directive(component.name, component.directive);
    });
    
    // Rutas virtuales de los componentes SofttionMaterial
    ngMaterial.run(["$templateCache", function ($templateCache) {
        if (!("ontouchstart" in window)) {
            angular.element("body").addClass("not-touch");
        } // No soporta eventos Touch
        
        angular.forEach(Material.components, function (component) {
            if (softtion.isDefined(component["route"])) {
                $templateCache.put(component.route, component.html());
            }
        });
    }]);

    ngMaterial.constant("ColorMaterial", {
        background: {
            red: {
                50:  "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 
                400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 
                800: "#c62828", 900: "#b71c1c", baseColor: "light"
            },
            pink: {
                50:  "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 
                400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 
                800: "#ad1457", 900: "#880e4f", baseColor: "light"
            },
            purple: {
                50:  "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 
                400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 
                800: "#6a1b9a", 900: "#4a148c", baseColor: "light"
            },
            deepPurple: {
                50:  "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 
                400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 
                800: "#4527a0", 900: "#311b92", baseColor: "light"
            },
            indigo: {
                50:  "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 
                400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 
                800: "#283593", 900: "#1a237e", baseColor: "light"
            },
            blue: {
                50:  "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 
                400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 
                800: "#1565c0", 900: "#0d47a1", baseColor: "light"
            },
            lightBlue: {
                50:  "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 
                400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 
                800: "#0277bd", 900: "#01579b", baseColor: "alternativeDark"
            },
            cyan: {
                50:  "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 
                400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 
                800: "#00838f", 900: "#006064", baseColor: "alternativeDark"
            },
            teal: {
                50:  "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 
                400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 
                800: "#00695c", 900: "#004d40", baseColor: "light"
            },
            green: {
                50:  "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 
                400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 
                800: "#2e7d32", 900: "#1b5e20", baseColor: "light"
            },
            lightGreen: {
                50:  "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 
                400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 
                800: "#558b2f", 900: "#33691e", baseColor: "alternativeDark"
            },
            lime: {
                50:  "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 
                400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 
                800: "#9e9d24", 900: "#827717", baseColor: "alternativeDark"
            },
            yellow: {
                50:  "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 
                400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 
                800: "#f9a825", 900: "#f57f17", baseColor: "dark"
            },
            amber: {
                50:  "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 
                400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 
                800: "#ff8f00", 900: "#ff6f00", baseColor: "dark"
            },
            orange: {
                50:  "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 
                400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 
                800: "#ef6c00", 900: "#e65100", baseColor: "alternativeDark"
            },
            deepOrange: {
                50:  "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 
                400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 
                800: "#d84315", 900: "#bf360c", baseColor: "light"
            },
            brown: {
                50:  "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 
                400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 
                800: "#4e342e", 900: "#3e2723", baseColor: "light"
            },
            grey: {
                50:  "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 
                400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 
                800: "#424242", 900: "#212121", baseColor: "alternativeDark"
            },
            blueGrey: {
                50:  "#eceff1", 100: "#cfd8dc", 200: "#b0bec5", 300: "#90a4ae", 
                400: "#78909c", 500: "#607d8b", 600: "#546e7a", 700: "#455a64", 
                800: "#37474f", 900: "#263238", baseColor: "light"
            }
        }, 
        font: {
            light: {
                primary: "rgba(255, 255, 255, 1)",
                alternative: "rgba(255, 255, 255, 1)",
                secondary: "rgba(255, 255, 255, 0.7)",
                disabled: "rgba(255, 255, 255, 0.5)"
            },
            dark: {
                primary: "rgba(0, 0, 0, 0.87)",
                alternative: "rgba(0, 0, 0, 0.87)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)"
            },
            alternativeDark: {
                primary: "rgba(0, 0, 0, 0.87)",
                alternative: "rgba(255, 255, 255, 1)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)"
            }
        },
        border: {
            dark: "rgba(0, 0, 0, 0.12)",
            light: "rgba(255, 255, 255, 0.12)"
        },
        ripple: {
            dark: "rgba(0, 0, 0, 0.38)",
            light: "rgba(255, 255, 255, 0.5)"
        }
    });
    
    ngMaterial.constant("SofttionMaterial", {
        VERSION: "1.0.4",
        Selectors: {
            FAB: "button.floating:not(.static), .fab-speed-dial," 
                + " .fab-menu > .box, .fab-menu-arc,"
                + " .progress-button-floating",
            BottomNav: ".stepper-mobile, .footer-buttons"
        },
        File: {
            imagesFormat: [
                "image/jpeg", "image/png", "image/jpg", "image/gif", "image/svg+xml"
            ],
            
            getIconFile: function (typeFile) {
                switch (typeFile) {
                    case ("image/jpeg"): return "image";
                    case ("image/jpg"): return "image";
                    case ("image/png"): return "image";
                    case ("image/gif"): return "gif";
                    case ("image/svg+xml"): return "image";
                    case ("application/x-zip-compressed"): return "archive";
                    case ("text/plain"): return "format_align_center";
                    default: return "insert_drive_file";
                }
            },
                            
            createIcon: function (typeFile) {
                return softtion.html("i").setText(this.getIconFile(typeFile));
            },

            createImage: function (classImg) {
                return softtion.html("div").addClass(["svg-icon", classImg, "cover"]);
            },
            
            getIconComponent: function (typeFile) {
                switch (typeFile) {
                    case ("application/pdf"): return this.createImage("pdf"); 
                    case ("application/x-zip-compressed"): return this.createImage("zip");
                    default: return this.createIcon(typeFile);
                }
            }
        },
        Ripple: {
            element: function () {
                return softtion.html("div").addClass("ripple").tojQuery();
            },
            box: function () {
                return softtion.html("div").addClass("ripple-box").tojQuery();
            },
            effect: function () {
                return softtion.html("span").addClass("effect").tojQuery();
            },
            event: function (box, effect) {
                box.click(function ($event) {
                    if (box.parent().is(":disabled")) { return; }

                    if (box.hasClass("animated")) {
                        box.removeClass("animated");
                    } // Removiendo la clase para animar

                    var left = $event.pageX - box.offset().left, 
                        top = $event.pageY - box.offset().top;

                    effect.css({ top: top, left: left }); box.addClass("animated"); 
                });
            }
        },
        Theme: {
            RED: "red",
            PINK: "pink",
            PURPLE: "purple",
            DEEP_PURPLE: "deepPurple",
            INDIGO: "indigo",
            BLUE: "blue",
            LIGHT_BLUE: "lightBlue",
            CYAN: "cyan",
            TEAL: "teal",
            GREEN: "green",
            LIGHT_GREEN: "lightGreen",
            LIME: "lime",
            YELLOW: "yellow",
            AMBER: "amber",
            ORANGE: "orange",
            DEEP_ORANGE: "deepOrange",
            BROWN: "brown",
            GREY: "grey",
            BLUE_GREY: "blueGrey"
        }
    });
    
    ngMaterial.factory("ManagerCalendar", function () {
        var ManagerCalendar = (function () {
            var ManagerCalendar = function (callbackEvents) {
                this.calendar = {}; // Calendario
                this.callbackEvents = callbackEvents;
            };

            function addEventWithParameters(
                manager, year, month, day, event, disabled) {
                if (softtion.isUndefined(manager.calendar[year])) {
                    manager.calendar[year] = {};
                } // Agregando año en el Manejador

                var yearCalendar = manager.calendar[year];

                if (softtion.isUndefined(yearCalendar[month])) {
                    yearCalendar[month] = {};
                } // Agregando mes en el año del Manejador

                var monthCalendar = yearCalendar[month];

                if (!softtion.isArray(monthCalendar[day])) {
                    monthCalendar[day] = new Array();
                } // Inicializando día en el mes seleccionado

                monthCalendar[day].push(event); // Agregando evento

                if (!disabled) { 
                    manager.callbackEvents.addEvent(true, year, month); 
                } // No requiere notificación

                return true; // Agregado existosamente
            };

            function addEventWithDate(manager, date, event, disabled) {
                if (softtion.isDate(date)) {
                    var year = date.getFullYear(),
                        day = date.getDate(),
                        month = date.getMonth();

                    return addEventWithParameters(
                        manager, year, month, day, event, disabled
                    );
                } 

                manager.callbackEvents.addEvent(false); return false;
            };

            ManagerCalendar.prototype.addEvent = function () {
                var manager = this, // Manejador del Calendario
                    addEvent = manager.callbackEvents.addEvent;

                switch (arguments.length) {
                    case (2):
                        return addEventWithDate(
                            manager, 
                            arguments[0], // Fecha
                            arguments[1]  // Evento
                        );

                    case (4):
                        return addEventWithParameters(
                            manager, 
                            arguments[0], // Año
                            arguments[1], // Mes
                            arguments[2], // Día
                            arguments[3]  // Evento
                        );

                    default: 
                        addEvent(false); return false;
                }
            };

            function removeEventWithParameters(
                manager, year, month, day, event, disabled) {
                if (softtion.isUndefined(manager.calendar[year])) {
                    return false;
                } // No hay eventos en el Calendario (Año)

                var yearCalendar = manager.calendar[year];

                if (softtion.isUndefined(yearCalendar[month])) {
                    return false;
                } // No hay eventos en el Calendario (Mes)

                var monthCalendar = yearCalendar[month];

                if (!softtion.isArray(monthCalendar[day])) {
                    return false;
                } // No hay eventos en el Calendario (Día)

                var index = monthCalendar[day].indexOf(event),
                    removeEvent = manager.callbackEvents.removeEvent; 

                monthCalendar[day].remove(index); 

                if (!disabled) { removeEvent(true, year, month, event); }

                return true; // Removido exitosamente
            };

            function removeEventWithDate(manager, date, event, disabled) {
                if (softtion.isDate(date)) {
                    var year = date.getFullYear(),
                        day = date.getDate(),
                        month = date.getMonth();

                    return removeEventWithParameters(
                        manager, year, month, day, event, disabled
                    );
                } 

                manager.callbackEvents.removeEvent(false); return false;
            };

            ManagerCalendar.prototype.removeEvent = function () {
                var manager = this, // Manejador del Calendario
                    removeEvent = manager.callbackEvents.removeEvent;

                switch (arguments.length) {
                    case (2):
                        return removeEventWithDate(
                            manager, 
                            arguments[0], // Fecha
                            arguments[1]  // Evento
                        );

                    case (4):
                        return removeEventWithParameters(
                            manager, 
                            arguments[0], // Año
                            arguments[1], // Mes
                            arguments[2], // Día
                            arguments[3]  // Evento
                        );

                    default: 
                        removeEvent(false); return false;
                }
            };

            function moveEventWithParameters(
                manager, yearOld, monthOld, dayOld, yearNew, monthNew, dayNew, event) {
                var remove = removeEventWithParameters(
                    manager, yearOld, monthOld, dayOld, event, true
                ); // Removiendo evento

                if (remove) {
                    var add = addEventWithParameters(
                        manager, yearNew, monthNew, dayNew, event, true
                    ); // Agregando evento

                    if (add) {
                        manager.callbackEvents.moveEvent(true, yearNew, monthNew, event); 
                    } // Movido correctamente

                    return add; // Resultado de agregación
                }

                return false; // No se encontro evento para Remover
            };
            
            function moveEventWithDate(manager, dateOld, dateNew, event) {
                if (softtion.isDate(dateOld) && softtion.isDate(dateNew)) {
                    var yearOld = dateOld.getFullYear(),
                        dayOld = dateOld.getDate(),
                        monthOld = dateOld.getMonth(),
                        yearNew = dateNew.getFullYear(),
                        dayNew = dateNew.getDate(),
                        monthNew = dateNew.getMonth();

                    return moveEventWithParameters(
                        manager, yearOld, monthOld, dayOld, 
                        yearNew, monthNew, dayNew, event
                    );
                }
                
                manager.callbackEvents.moveEvent(false); return false;
            }

            ManagerCalendar.prototype.moveEvent = function () {
                var manager = this, // Manejador del Calendario
                    moveEvent = manager.callbackEvents.moveEvent;

                switch (arguments.length) {
                    case (3):
                        return moveEventWithDate(
                            manager, 
                            arguments[0], // Fecha vieja
                            arguments[1], // Fecha nueva
                            arguments[2]  // Evento
                        );
                
                    case (7):
                        return moveEventWithParameters(
                            manager, 
                            arguments[0], // Año viejo
                            arguments[1], // Mes viejo
                            arguments[2], // Día viejo
                            arguments[3], // Año nuevo
                            arguments[4], // Mes nuevo
                            arguments[5], // Día nuevo
                            arguments[6]  // Evento
                        );

                    default: 
                        moveEvent(false); return false;
                }
            };

            function getEvenstOfDayWithParameters (manager, year, month, day) {
                if (softtion.isUndefined(manager.calendar[year])) {
                    return [];
                } // No hay eventos en el año establecido

                var yearCalendar = manager.calendar[year];

                if (softtion.isUndefined(yearCalendar[month])) {
                    return [];
                } // No hay eventos en el mes establecido

                var monthCalendar = yearCalendar[month];

                return (!softtion.isArray(monthCalendar[day])) ?
                    [] : monthCalendar[day]; // Eventos del día
            };

            function getEvenstOfDayWithDate (manager, date) {
                if (!softtion.isDate(date)) { return []; } // Sin busqueda

                var year = date.getFullYear(),
                    day = date.getDate(),
                    month = date.getMonth();

                return getEvenstOfDayWithParameters(manager, year, month, day);
            }

            ManagerCalendar.prototype.getEvenstOfDay = function () {
                var manager = this; // Manejador del calendario

                switch (arguments.length) {
                    case (1):
                        return getEvenstOfDayWithDate(
                            manager,
                            arguments[0] // Fecha
                        );

                    case (3):
                        return getEvenstOfDayWithParameters(
                            manager,
                            arguments[0], // Año
                            arguments[1], // Mes
                            arguments[2]  // Día
                        );

                    default: return [];
                }
            };
            
            ManagerCalendar.prototype.getEvenstOfMonth = function (year, month) {
                var manager = this; // Manejador del calendario
                
                if (softtion.isUndefined(manager.calendar[year])) {
                    return {};
                } // No hay eventos en el año establecido

                var yearCalendar = manager.calendar[year];

                return (softtion.isUndefined(yearCalendar[month])) ?
                    {} : yearCalendar[month]; // Eventos del mes
            };
            
            ManagerCalendar.prototype.getEvenstOfYear = function (year) {
                var manager = this; // Manejador del calendario

                return (softtion.isUndefined(manager.calendar[year])) ?
                    {} : manager.calendar[year]; // Eventos del año
            };

            return ManagerCalendar; // Clase Manejador de Calendario
        })();
        
        return {
            instance: function (callbackEvents) {
                return new ManagerCalendar(callbackEvents);
            },
            
            isInstance: function (object) {
                return (object instanceof ManagerCalendar);
            }
        };
    });
    
    ngMaterial.service("$fnMaterial", function () {
        return {
            setDensity: function ($element, width, height) {
                var density = height / width; // Calculando

                (density > 1) ?
                    $element.addClass("density-height") :
                    $element.addClass("density-width");

                $element.addClass("active"); // Activando
            }
        };
    });
    
    // Provedores de SofttionMaterial
    angular.forEach(Material.providers, function (provider) {
        ngMaterial.provider(provider.name, provider.method);
    });
    
    // Directivas de proveedores de SofttionMaterial
    angular.forEach(Material.properties, function (property) {
        ngMaterial.directive(property.name, property.directive);
    });
});