/*
 Angular Softtion Material v1.0.8
 (c) 2016 Softtion Developers, http://material.softtion.com.co
 License: MIT
 Updated: 10/Abr/2017
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

    var insertIconDescription = function ($scope, $component) {
        if (softtion.isString($scope.iconDescription)) {
            var icon = angular.element(
                softtion.html("i").addClass("icon-description").
                    setText($scope.iconDescription).create()
            );
            
            icon.insertBefore($component); return icon; // Icono
        } // Icono descriptivo, se debe insertar el icono antes del input
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
                                $window = angular.element(window),
                                toolbar = $element.children(".toolbar"),
                                
                                // Atributos
                                position = 0, hideClass = "hide",
                                heightElement = $element.innerHeight();
                        
                            $element.transitionend(function () {});
                            
                            if (!$scope.fixed) {
                                appContent.scroll(function () {
                                    var heightMin = (($window.width() > 960) ? 64 : 56),
                                        positionNew = appContent.scrollTop();

                                    hideClass = toolbar.hasClass("flexible-title") ? 
                                        "hide-flexible-title" : "hide";

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
                            sidenav.children(".content").css("top", heightElement); 
                        }
                    };
                }
            },
            
            AutoComplete: {
                route: "softtion/template/autocomplete.html",
                name: "autocomplete",
                html: function () {
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

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-class", "isActiveLabel()").
                        addClass("truncate").addAttribute("ng-click", "clickLabel()");

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel()");

                    var span = softtion.html("span").addClass("truncate").
                        addAttribute("ng-hide","hideSpan");
                
                    var buttonClear = softtion.html("i").
                        addClass(["action-icon"]).setText("close").
                        addAttribute("ng-hide", "isActiveClear()").
                        addAttribute("ng-click", "clearAutocomplet()");

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

                    return input + lineShadow + label + span + value + buttonClear + listAutocomplete;
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.AutoComplete.route,
                        scope: {
                            suggestionSelect: "=ngModel",
                            ngDisabled: "=?",
                            required: "=?",
                            keyDescription: "@",
                            functionDescription: "=?",
                            label: "@",
                            suggestions: "=",
                            icon: "@",
                            placeholder: "@",
                            disabledFocusclear: "=?",
                            
                            // Eventos
                            changedEvent: "=?",
                            blurEvent: "=?",
                            focusEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), 
                                list = $element.find("ul");
                            
                            insertIconDescription($scope, $element, input); // IconLabel
                                
                            // Atributos de control
                            var focusLi = false, searchStart = false;

                            $scope.describeSuggestion = function (suggestion) {
                                if (typeof suggestion === "string") {
                                    return suggestion;
                                } else {
                                    return (!(softtion.isString($scope.keyDescription)) ? suggestion.toString() :
                                        softtion.findKey(suggestion, $scope.keyDescription));
                                }
                            };

                            $scope.suggestionsFilter = []; $scope.suggestionTemp = undefined; 
                            $scope.clearSuggestion = true; $scope.hideValue = false; $scope.valueInput = "";

                            $scope.clickLabel = function () { input.focus(); };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.hideValue || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.suggestionSelect)) ? "active" : "";
                            };
                            
                            $scope.isHaveSelection = function () {
                                return softtion.isString($scope.valueInput) || softtion.isDefined($scope.suggestionSelect);
                            };

                            $scope.focusInput = function ($event) {
                                if (softtion.isDefined($scope.suggestionSelect)) {
                                    $scope.valueInput = $scope.describeSuggestion($scope.suggestionSelect);
                                } // Cambiando valor del texto en el Input
                                
                                $scope.hideValue = true; $element.addClass("active"); 
                                
                                // Buscar sugerencias con el filtro establecido
                                $scope.searchSuggestions($scope.valueInput.toLowerCase());
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event, $scope.suggestionSelect);
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
                                    } else if (softtion.isUndefined($scope.suggestionSelect) && !softtion.isString($scope.valueInput)) {
                                        $element.removeClass("active"); 
                                    } else if (this.suggestionsFilter.length === 0) {
                                        list.removeClass("active"); $scope.suggestionSelect = undefined;
                                        $scope.clearSuggestion = true;
                                    } else {
                                        list.removeClass("active"); 
                                    }
                                    
                                    $scope.hideValue = false; // Activando vista del componente

                                    if (softtion.isFunction($scope.blurEvent)) {
                                        $scope.blurEvent($event, $scope.suggestionSelect);
                                    } // Evento 'focus' sobre el inpur en el componente
                                }
                            };

                            $scope.selectSuggestion = function (suggestion) {
                                $scope.suggestionTemp = $scope.suggestionSelect; $scope.hideValue = false;
                                $scope.suggestionSelect = suggestion; $scope.clearSuggestion = false;
                                
                                $scope.valueInput = $scope.describeSuggestion(suggestion);

                                list.removeClass("active"); // Ocultando lista
                                
                                if ($scope.suggestionTemp !== $scope.suggestionSelect) {
                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent("changed", $scope.suggestionSelect, $scope.suggestionTemp);
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
                                return !softtion.isDefined($scope.suggestionSelect);
                            };
                            
                            $scope.clearAutocomplet = function () {
                                $scope.suggestionSelect = undefined; $scope.valueInput = ""; 
                                $scope.clearSuggestion = true; $element.removeClass("active"); 
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent("clear", $scope.suggestionSelect, $scope.suggestionTemp);
                                } // Evento cambio de selección de sugerencia
                                
                                if (!$scope.disabledFocusclear) { 
                                    input.focus(); 
                                } // Se hace focus al eliminar opción
                                
                            };
                            
                            $scope.getValueModel = function () {
                                if (softtion.isDefined($scope.suggestionSelect)) {
                                    return $scope.describeSuggestion($scope.suggestionSelect);
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
                directive: function () {
                    return {
                        restrict: "C",
                        scope: {
                            views: "@",
                            
                            // Eventos
                            viewEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var rippleBox = angular.element(
                                    Material.components.BottomNavigation.ripple()
                                ),
                                items = $element.find(".content > li"),
                                itemActive = $element.find(".content > li.active:first"), 
                                fab = angular.element("button.floating"),
                                views = angular.element($scope.views), toast,
                                appContent = angular.element(".app-content"), snackbar;
                        
                            $element.append(rippleBox); // Agregando ripple
                            
                            var paddingBottom = parseInt(appContent.css("padding-bottom"));
                            appContent.css("padding-bottom", (paddingBottom + 32) + "px");
                        
                            // Atributos
                            var classColor = "default", position = 0, classHide = "hide";
                            
                            if (fab.exists()) {
                                fab.addClass("show-bottom-navigation");
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
                                
                            items.click(function (event) {
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
                                    $scope.viewEvent(event);
                                } // Evento 'view' cuando hay un cambio de vista
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
                        addClass("slide").addAttribute("ng-repeat", "slide in gallery").
                        addAttribute(
                            "ng-class", "{active: slideActive($index), before: slideBefore($index), after: slideAfter($index)}"
                        ).
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{slide.img}}")
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
                            clickEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");

                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.checked = !$scope.checked; input.focus();
                                    
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent($event, $scope.checked);
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
                            clickEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");
                            
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.checked = !$scope.checked; input.focus();
                                    
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
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
                            clickEvent: "=?"
                        },
                        link: function ($scope) {
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
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
                        addAttribute("placeholder", "{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

                    var label = softtion.html("label").
                        setText("{{label}}").addClass("truncate").
                        addAttribute("ng-click", "clickLabel($event)").
                        addAttribute("ng-class", "{active: isLabelActive()}");

                    return chips + input + lineShadow + label; // Componente
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
                            icon: "@",
                            placeholder: "@", 
                            
                            // Eventos
                            blurEvent: "=?",
                            focusEvent: "=?",
                            changedEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"); 
                            
                            insertIconDescription($scope, $element, input);
                        
                            $scope.maxCount = !isNaN($scope.maxCount) ? $scope.maxCount : -1;
                            $scope.listValue = $scope.listValue || new Array(); $scope.focus = false;
                            
                            if ($scope.listValue.length > 0) { 
                                $element.addClass("active"); 
                            }
                            
                            $element.click(function (event) { 
                                $element.removeClass("hide-input"); input.focus();
                            });
                            
                            $scope.clickLabel = function ($event) {
                                $element.removeClass("hide-input"); input.focus();
                                
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.isLabelActive = function () {
                                return $scope.focus || ($scope.listValue.length > 0);
                            };
                            
                            $scope.clickInput = function ($event) {
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); $scope.focus = true;
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event, $scope.listValue);
                                } // Evento focus sobre el componente
                            };
                            
                            $scope.blurInput = function ($event) { 
                                $scope.valueInput = undefined; $scope.focus = false;
                                
                                if ($scope.listValue.length > 0) {
                                    $element.addClass("hide-input"); 
                                } else {
                                    $element.removeClass("active"); 
                                } // No tiene opciones escritas
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent($event, $scope.listValue);
                                } // Evento blur sobre el componente
                            };
                            
                            $scope.keypressInput = function (ev) {
                                if (ev.keyCode === 13) {
                                    if (!softtion.isString($scope.valueInput)) {
                                        return;
                                    } // No ha escrito nada en el Componente
                                    
                                    if ($scope.maxCount === $scope.listValue.length) {
                                        return;
                                    } // Ha alcanzado cntidad de items permitidos
                                    
                                    $scope.listValue.push($scope.valueInput); 

                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent("add", $scope.valueInput, $scope.listValue);
                                    } // Evento clear sobre el componente
                                    
                                    $scope.valueInput = undefined;
                                } // Se va agregar texto escrito en el componente
                            };
                            
                            $scope.removeItem = function (index) {
                                if (!$scope.ngDisabled) {
                                    var objectRemove = $scope.listValue[index];
                                
                                    $scope.listValue.remove(index); // Removiendo

                                    if (softtion.isFunction($scope.changedEvent)) {
                                        $scope.changedEvent("remove", objectRemove, $scope.listValue);
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
                            
                            // Eventos
                            selectEvent: "=?",
                            cancelEvent: "=?"
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
                            
                            var time = new Date(); // Tiempo actual
                            
                            $scope.hourSelect = (time.getHours() === 0) ?
                                12 : (time.getHours() > 12) ? 
                                time.getHours() - 12 : time.getHours();
                            
                            $scope.minuteSelect = time.getMinutes();
                            
                            $scope.setZone((time.getHours() > 11)); $scope.setSelection(true);
                            hours.find(".tick-" + $scope.hourSelect).addClass("active");
                            minutes.find(".tick-" + $scope.minuteSelect).addClass("active");
                            
                            $scope.leadingClock = function (value) {
                                return ((value < 10) ? "0" : "") + value;
                            };
                            
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
                            
                            $scope.setTime = function () {
                                var hour = (isPM) ?
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect + 12) : $scope.hourSelect :
                                    ($scope.hourSelect !== 12) ? ($scope.hourSelect) : 0;
                                
                                if (softtion.isUndefined($scope.time)) {
                                    $scope.time = new Date();
                                } // Inicializando objeto para manipular el tiempo
                                
                                $scope.time.setHours(hour); $scope.time.setMinutes($scope.minuteSelect);
                                
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent($scope.time);
                                } // Función que se llama cuando se selecciona Fecha
                            };
                            
                            $scope.cancel = function () {
                                this.setSelection(true); // Seleccion de hora
                                
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent($scope.time);
                                } // Función que se llama cuando se cancela Selección
                            };
                        }
                    };
                }
            },
            
            ClockpickerInput: {
                route: "softtion/template/clockpicker-input.html",
                name: "clockpickerInput",
                html: function () {
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
                    
                    var dialog = softtion.html("div").addClass(["dialog", "picker-clock"]).
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addChildren(
                            softtion.html("div").addClass("box").
                                addAttribute("ng-class", "{show: show}").
                                addChildren(
                                    softtion.html("div").addClass("clockpicker").
                                        addAttribute("ng-model","timePicker").
                                        addAttribute("select-event","timeSelect").
                                        addAttribute("cancel-event","cancelSelect")

                                )
                        );
                
                    return lineShadow + label + value + dialog; // Creando componente
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.ClockpickerInput.route,
                        scope: {
                            time: "=ngModel",
                            label: "@",
                            icon: "@",
                            format: "@",
                            autoStart: "=?",
                            ngDisabled: "=?",
                            parent: "@",
                            
                            // Eventos
                            showEvent: "=?",
                            selectEvent: "=?",
                            cancelEvent: "=?",
                            iconEvent: "=?"
                        },
                        directive: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                $body = angular.element(document.body);
                        
                            if (softtion.isString($scope.icon) && $element.hasClass("label-hidden")) {
                                var icon = angular.element(
                                    softtion.html("i").setText($scope.icon).create()
                                );

                                $element.append(icon); $element.addClass("icon-active");
                                
                                if (softtion.isFunction($scope.iconEvent)) {
                                    icon.addClass("action"); // Se definio evento en el icono
                                    
                                    icon.click(function ($event) { 
                                        $scope.$apply(function () { $scope.iconEvent($event); });
                                    });
                                }
                            } // IconLabel activado, se debe insertar el icono antes del input
                            
                            $scope.show = false; 
                            
                            $scope.format = $scope.format || "hz:ii zz";
                            
                            if (softtion.isUndefined($scope.time) && $scope.autoStart) {
                                $scope.time = new Date(); 
                            } // Se desea iniciar automaticamente la fecha
                            
                            if (softtion.isString($scope.parent)) {
                                var parent = angular.element($scope.parent);
                                
                                if (parent.exists()) { dialog.appendTo(parent); }
                            } // Se definio un selector para contener dialog
                            
                            $scope.getValueModel = function () {
                                if (softtion.isUndefined($scope.time)) {
                                    return "";
                                } else if (softtion.isDate($scope.time)) {
                                    return $scope.time.getFormat($scope.format);
                                } else {
                                    return "Parámetro establecido no es hora";
                                }
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.time)) ? "active" : "";
                            };
                            
                            $scope.showDialog = function ($event) {
                                if (!$scope.ngDisabled) {
                                    $scope.show = true; dialog.addClass("active");
                                    $body.addClass("body-overflow-none");
                                    
                                    if (softtion.isFunction($scope.showEvent)) {
                                        $scope.showEvent($event);
                                    } // Evento abrir dialog en el componente
                                }
                            };
                            
                            $scope.cancelSelect = function () {
                                $scope.show = false; dialog.removeClass("active"); 
                                $body.removeClass("body-overflow-none");
                                    
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent($scope.time);
                                } // Evento cancelar selección en el componente
                            };
                            
                            $scope.timeSelect = function (time) {
                                $scope.time = time; dialog.removeClass("active"); 
                                $scope.show = false; $body.removeClass("body-overflow-none");
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent($scope.time);
                                } // Evento selección nueva en el componente
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
                            clickSelectAll: "=?",
                            clickSelect: "=?",
                            
                            // Eventos
                            selectEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var selectedBefore = undefined; // Objeto seleccionado
                        
                            $scope.selection = ($scope.selectMultiple) ? [] : undefined;
                            
                            if (softtion.isDefined($scope.rowsData)) {
                                
                            } // Se han definido lista de datos a manipular
                            
                            $scope.clickSelectAll = function () {
                                if ($scope.selectMultiple) {
                                    $scope.selection = []; // Reiniciando lista de selección
                                    
                                    if (!$scope.selectAll) {
                                        $element.find("tbody tr.active").removeClass("active");
                                        $element.removeClass("selected"); $scope.countSelect = 0; 
                                        
                                        angular.forEach($scope.rowsData, 
                                            function (object) { object.checked = false; }
                                        );
                                    } else {
                                        $element.find("tbody tr").addClass("active"); // Activando filas
                                        
                                        angular.forEach($scope.rowsData, function (object) {
                                            $scope.selection.push(object); object.checked = true;
                                        });
                                        
                                        $scope.countSelect = $scope.selection.length; 
                                        $element.addClass("selected"); 
                                    }
                                    
                                    if (softtion.isFunction($scope.selectEvent)) {
                                        $scope.selectEvent("all", $scope.selection);
                                    } // Se definio escuchador cuando se realize selección
                                } else {
                                    $scope.selectAll = false;
                                } // No se permite la selección multiple
                            };
                            
                            $scope.clickSelect = function (object, $event) {
                                object.checked = !object.checked;
                                
                                var row = angular.element($event.currentTarget); 
                                
                                if ($scope.selectMultiple) {
                                    row.toggleClass("active"); // Cambiando estado
                                    
                                    if (object.checked) {
                                        $scope.selection.push(object);
                                        
                                        if (softtion.isFunction($scope.selectEvent)) {
                                            $scope.selectEvent("checked", object);
                                        } // Se definio escuchador cuando se realize selección
                                    } else {
                                        $scope.selection.remove($scope.selection.indexOf(object)); 
                                        
                                        if (softtion.isFunction($scope.selectEvent)) {
                                            $scope.selectEvent("unchecked", object);
                                        } // Se definio escuchador cuando se realize selección
                                    } // Ya estaba seleccionado la fila
                                    
                                    $scope.countSelect = $scope.selection.length;
                                } else {
                                    if (object.checked) {
                                        row.siblings("tr").removeClass("active");
                                        row.addClass("active"); $scope.selection = object;
                                        
                                        $scope.countSelect = 1; // Hay selección
                                        
                                        if (softtion.isDefined(selectedBefore)) {
                                            selectedBefore.checked = false; selectedBefore = object;
                                        } else { 
                                            selectedBefore = object; 
                                        } // Activando el nuevo objeto
                                        
                                        if (softtion.isFunction($scope.selectEvent)) {
                                            $scope.selectEvent("checked", object);
                                        } // Se definio escuchador cuando se realize selección
                                    } else {
                                        $scope.selection = undefined; row.removeClass("active"); 
                                        selectedBefore = undefined; $scope.countSelect = 0;
                                        
                                        if (softtion.isFunction($scope.selectEvent)) {
                                            $scope.selectEvent("unchecked", object);
                                        } // Se definio escuchador cuando se realize selecciónS
                                    } // Ya estaba seleccionado la fila
                                }
                                
                                ($scope.countSelect > 0) ?
                                    $element.addClass("selected") : $element.removeClass("selected");
                                
                                $scope.selectAll = ($scope.countSelect === $scope.rowsData.length);
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
                            minDate: "=?",
                            maxDate: "=?",
                            yearRange: "@",
                            
                            // Eventos
                            selectEvent: "=?",
                            cancelEvent: "=?"
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
                            
                            var dateNow = new Date().normalize("date");
                                                        
                            $scope.year = dateNow.getFullYear();
                            $scope.day = dateNow.getDate();
                            $scope.month = dateNow.getMonth();
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
                                
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent($scope.date);
                                } // Se ha establecido metodo para seleccionar Fecha
                            };
                            
                            $scope.cancel = function () {
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent($scope.date);
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
                    
                    var dialog = softtion.html("div").addClass(["dialog", "picker-date"]).
                        addChildren(
                            softtion.html("div").addClass("backdrop")
                        ).
                        addChildren(
                            softtion.html("div").addClass("box").
                                addAttribute("ng-class", "{show: show}").
                                addChildren(
                                    softtion.html("div").addClass("datepicker").
                                        addAttribute("ng-model","datePicker").
                                        addAttribute("select-event","dateSelect").
                                        addAttribute("cancel-event","cancelSelect").
                                        addAttribute("min-date","minDate").
                                        addAttribute("max-date","maxDate").
                                        addAttribute("year-range","{{yearRange}}")
                                )
                        );
                
                    return lineShadow + label + value + dialog; // Creando componente
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.DatepickerInput.route,
                        scope: {
                            date: "=ngModel",
                            label: "@",
                            icon: "@",
                            format: "@",
                            autoStart: "=?",
                            minDate: "=?",
                            maxDate: "=?",
                            yearRange: "=?",
                            ngDisabled: "=?",
                            parent: "@",
                            
                            // Eventos
                            showEvent: "=?",
                            selectEvent: "=?",
                            cancelEvent: "=?",
                            iconEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var dialog = $element.find(".dialog"),
                                value = $element.find(".value"),
                                $body = angular.element(document.body);
                        
                            var icon = insertIconDescription($scope, $element, value);
                            
                            if (softtion.isFunction($scope.iconEvent)) {
                                if (softtion.isDefined(icon)) {
                                    icon.addClass("action"); // Se definio evento en el icono

                                    icon.click(function ($event) { 
                                        $scope.$apply(function () { $scope.iconEvent($event); });
                                    }); 
                                }
                            }
                            
                            $scope.show = false; $scope.format = $scope.format || "ww, dd de mn del aa";
                            
                            if (softtion.isUndefined($scope.date) && $scope.autoStart) {
                                $scope.date = new Date(); 
                            } // Se desea iniciar automaticamente la fecha
                            
                            if (softtion.isString($scope.parent)) {
                                var parent = angular.element($scope.parent);
                                
                                if (parent.exists()) { dialog.appendTo(parent); }
                            } // Se definio un selector para contener dialog
                            
                            $scope.getValueModel = function () {
                                if (softtion.isUndefined($scope.date)) {
                                    return "";
                                } else if (softtion.isDate($scope.date)) {
                                    return $scope.date.getFormat($scope.format);
                                } else {
                                    return "Parámetro establecido no es fecha";
                                }
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.date)) ? "active" : "";
                            };
                            
                            $scope.showDialog = function ($event) {
                                if (!$scope.ngDisabled) {
                                    $scope.show = true; dialog.addClass("active");
                                    $body.addClass("body-overflow-none");
                                    
                                    if (softtion.isFunction($scope.showEvent)) {
                                        $scope.showEvent($event);
                                    } // Evento abrir dialog en el componente
                                }
                            };
                            
                            $scope.dateSelect = function (date) {
                                $scope.date = date; dialog.removeClass("active"); 
                                $scope.show = false; $body.removeClass("body-overflow-none");
                                    
                                if (softtion.isFunction($scope.selectEvent)) {
                                    $scope.selectEvent($scope.date);
                                } // Evento selección nueva en el componente
                            };
                            
                            $scope.cancelSelect = function () {
                                $scope.show = false; dialog.removeClass("active");
                                $body.removeClass("body-overflow-none");
                                    
                                if (softtion.isFunction($scope.cancelEvent)) {
                                    $scope.cancelEvent($scope.date);
                                } // Evento cancelar selección en el componente
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
                                var content = body.find(".content"),
                                    button = angular.element(
                                        Material.components.ExpansionPanel.buttonAction()
                                    ),
                                    icon = button.find("i");
                                
                                button.insertAfter(header.find(".title")); // Agregando icono

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
            
            FilechooserMultiple: {
                route: "softtion/template/filechooser-multiple.html",
                name: "filechooserMultiple",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "file");
                    
                    var button = softtion.html("button").addClass(["floating", "static"]).
                        addAttribute("ng-click", "selectFile()").
                        addAttribute("ng-disabled", "ngDisabled").
                        addChildren(softtion.html("i").setText("{{iconButton}}"));
                
                    var content = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("select-file").
                                addAttribute("ng-hide", "(files.length > 0)").
                                addChildren(
                                    softtion.html("i").setText("file_upload").
                                        addAttribute("ng-class", "{disabled: ngDisabled}")
                                ).addChildren(
                                    softtion.html("p").setText("Seleccione archivos a procesar").
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
                                                    softtion.html("div").addClass("icon").
                                                        addAttribute("ng-bind-html", "getIconComponent(file.type)").
                                                        addAttribute("ng-if", "!isImageFile(file.type)")
                                                ).
                                                addChildren(
                                                    softtion.html("img", false).
                                                        addAttribute("ng-if", "isImageFile(file.type)").
                                                        addAttribute("ng-src", "{{file.base64}}")
                                                )
                                        ).
                                    
                                        addChildren(
                                            softtion.html("div").addClass("detail").
                                                addChildren(
                                                    softtion.html("div").addClass("avatar").
                                                        addChildren(
                                                            softtion.html("i").setText("{{getIconFile(file.type)}}")
                                                        )
                                                ).
                                                addChildren(
                                                    softtion.html("label").addClass("name").setText("{{file.name}}")
                                                )
                                        )
                            )
                                )
                        );
                    
                    return input + content + button;
                },
                directive: ["$timeout", function ($timeout) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FilechooserMultiple.route,
                        scope: {
                            files: "=ngModel",
                            iconButton: "@",
                            multiple: "=?",
                            ngDisabled: "=?",
                            
                            eventHold: "=?",
                            eventClickright: "=?"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                imageFormats = [
                                    "image/jpeg", "image/png", "image/jpg", "image/gif"
                                ];
                            
                            $scope.iconButton = $scope.iconButton || "attachment";
                            
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
                            
                            $scope.isImageFile = function (typeFile) {
                                return (imageFormats.indexOf(typeFile) !== -1);
                            };
                            
                            $scope.getIconFile = function (typeFile) {
                                switch (typeFile) {
                                    case ("image/jpeg"): return "image";
                                    case ("image/jpg"): return "image";
                                    case ("image/png"): return "image";
                                    case ("image/gif"): return "gif";
                                    case ("application/x-zip-compressed"): return "archive";
                                    case ("text/plain"): return "format_align_center";
                                    default: return "insert_drive_file";
                                }
                            };
                            
                            var createIcon = function (typeFile) {
                                return softtion.html("i").setText($scope.getIconFile(typeFile)).create();
                            };
                            
                            var createImage = function (classImg) {
                                return softtion.html("div").addClass(["svg-icon", classImg, "cover"]).create();
                            };
                            
                            $scope.getIconComponent = function (typeFile) {
                                switch (typeFile) {
                                    case ("application/pdf"): return createImage("pdf"); 
                                    case ("application/x-zip-compressed"): return createImage("zip");
                                    default: return createIcon(typeFile);
                                }
                            };
                            
                            $scope.fileHold = function (file, $event, $index) {
                                if (softtion.isFunction($scope.eventHold)) {
                                    $scope.eventHold(file, $event, $index);
                                } // Se ha definido evento Hold en el componente
                            };
                            
                            $scope.fileRight = function (file, $event, $index) {
                                if (softtion.isFunction($scope.eventClickright)) {
                                    $scope.eventClickright(file, $event, $index);
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
            
            MediaArea: {
                name: "mediaArea",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            var img = $element.find("img"); // Imagen de la Media
                            
                            if (img.exists()) {
                                var density = img[0].height / img[0].width;
                                
                                // Ancho es mayor igual a alto
                                (density >= 1)  ? img.css("width", "100%") : img.css("height", "100%");
                            }
                        }
                    };
                }
            },
            
            ProgressBar: {
                name: "progressBar",
                directive: function () {
                    return {
                        restrict: "C",
                        link: function ($scope, $element) {
                            if (!$element.hasClass("indeterminate")) {
                                var bar = softtion.html("div").addClass("bar").tojQuery();
                                
                                $element.append(bar); // Insertando barra progreso
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
                            clickEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='radio']");
                            
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.model = $scope.value; input.focus();
                                    
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent($event, $scope.model);
                                    } // Evento click sobre el componente
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
                        addAttribute("type", "text").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-readonly", "true").
                        addAttribute("ng-click", "toggleSuggestions()").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("placeholder", "{{placeholder}}");

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

                    return input + lineShadow + label + value + button + list; // Componente
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
                            icon: "@",
                            placeholder: "@",
                            
                            // Eventos
                            clickEvent: "=?",
                            changedEvent: "=?",
                            blurEvent: "=?",
                            focusEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var label = $element.find("label"), input = $element.find("input"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                            
                            insertIconDescription($scope, $element, input);
                            
                            var clickComponent = function (target) {
                                return (label.is(target) || input.is(target) || value.is(target) || list.is(target))
                                    || button.is(target) || buttonIcon.is(target) || $element.is(target);
                            };
                            
                            $scope.closeSelect = function ($event) {
                                $scope.$apply(function() {
                                    if (!clickComponent($event.target)) {
                                        $scope.hideSuggestions(); // Ocultando opciones
                                    } // Se ha realizado click sobre el componente de Selección
                                });
                            };
                            
                            $scope.showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select", $scope.closeSelect);
                                } // No se permite cerrado automatico
                                
                                if (softtion.isDefined($scope.select)) {
                                    //S$scope.valueInput = $scope.describeSuggestion($scope.select);
                                } // Cambiando valor del texto en el Input
                                
                                $scope.startShow = true; $scope.showList = true; $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select", $scope.closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            $scope.selectTemp = undefined; $scope.showList = false; $scope.startShow = false; 
                            
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

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event, $scope.select); 
                                } // Evento click sobre el componente
                                
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.select)) ? "active" : "";
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event, $scope.select); 
                                } // Evento focus sobre el componente
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent($event, $scope.select); 
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
                                    $scope.changedEvent("select", $scope.select, $scope.selectTemp); 
                                } // Evento change sobre el componente
                            };
                            
                            $scope.clearSelection = function () {
                                $scope.select = undefined; $scope.hideSuggestions();
                                list.find("li").removeClass("active"); 
                                
                                if (softtion.isFunction($scope.changedEvent)) {
                                    $scope.changedEvent("clear", $scope.select, $scope.selectTemp); 
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
                    var input = softtion.html("input", false).
                        addAttribute("type","text").
                        addAttribute("ng-model","valueInput").
                        addAttribute("ng-click","toggleSuggestions()").
                        addAttribute("ng-blur","blurInput($event)").
                        addAttribute("ng-focus","focusInput($event)").
                        addAttribute("ng-readonly","true").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{holderhide: isHaveText()}").
                        addAttribute("placeholder","{{placeholder}}");

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

                    var list = softtion.html("ul").
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

                    return input + lineShadow + label + value + button + list; // Componente
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
                            icon: "@",
                            placeholder: "@",
                            
                            // Eventos
                            clickEvent: "=?",
                            changedEvent: "=?",
                            blurEvent: "=?",
                            focusEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), label = $element.find("label"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                        
                            insertIconDescription($scope, $element, input);
                        
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
                            
                            $scope.closeSelect = function ($event) {
                                $scope.$apply(function() {
                                    if (!clickComponent($event.target)) {
                                        $scope.hideSuggestions(); // Ocultando opciones
                                    } // Se ha realizado click sobre el componente de Selección
                                });
                            };
                            
                            $scope.isHaveText = function () {
                                return ($scope.selects.length > 0);
                            };
                            
                            $scope.showSuggestions = function () {
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).on("click.sm-select-multiple", $scope.closeSelect);
                                } // No se permite cerrado automatico
                                
                                $scope.startShow = true; $scope.showList = true; $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off("click.sm-select-multiple", $scope.closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            $scope.showList = false; $scope.startShow = false;

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event, $scope.selects); 
                                } // Evento click sobre el componente
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.selects.length > 0) ? "active" : "";
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event, $scope.selects); 
                                } // Evento focus sobre el componente
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent($event, $scope.selects); 
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
                                    $scope.changedEvent("select", $scope.selects); 
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
                            clickEvent: "=?"
                        },
                        link: function ($scope, $element) { 
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    if (softtion.isFunction($scope.clickEvent)) {
                                        $scope.clickEvent($event);
                                    } // Evento click sobre el componente
                                } // No se permite el cambio de la Propiedad
                            };
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
                            views: "@",
                            disabledPositionStart: "=?",
                            
                            // Eventos
                            viewEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var views = angular.element($scope.views), index = 0,
                                tabs = $element.find(".tab"),
                                stripe = angular.element(
                                    softtion.html("div").addClass("stripe").create()
                                );
                            
                            if (tabs.exists()) {
                                tabs.attr("tabindex", "-1"); // Haciendo componentes enfocables

                                angular.forEach(tabs, function (tab) { 
                                    angular.element(tab).data("position", index); index++;
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
                                views.css("left", (position * -100) + "%");
                                
                                tabs.click(function ($event) {
                                    if (!views.hasClass("transition")) {
                                        views.addClass("transition");
                                    } // Agregando la clase transition al componente
                                    
                                    var itemTab = angular.element(this);
                                    
                                    var position = itemTab.data("position"),
                                        left = itemTab[0].offsetLeft,
                                        width = itemTab[0].clientWidth;
                                    
                                    stripe.css({ width: width, left: left });
                            
                                    if (itemTab.hasClass("active")) {
                                        return;
                                    } // Este componente ya se encuentra activo
                                    
                                    tabs.removeClass("active"); itemTab.addClass("active");
                                    
                                    if (!$scope.disabledPositionStart) {
                                        angular.element(".app-content").scrollTop(0); 
                                    } // No es necesario subir vista
                                    
                                    if (left < $element.scrollLeft()) {
                                        $element.animate({ scrollLeft: left }, 175, "standardCurve"); 
                                    } // Reubicando vista del contenedor en pestaña
                                    
                                    views.css("left", (position * -100) + "%");
                                    
                                    if (softtion.isFunction($scope.viewEvent)) {
                                        $scope.viewEvent($event);
                                    } // Evento view cuando hay un cambio de vista
                                });
                            } // Exiten pestañas en el componente
                    
                            $element.append(stripe); // Agregando componente selector
                        }
                    };
                }
            },
            
            TextArea: {
                route: "softtion/template/textarea.html",
                name: "textarea",
                defineTextHidden: function (textarea, texthidden) {
                    var fontFamily = textarea.css("font-family"),
                        fontSize = textarea.css("font-size"),
                        lineHeight = textarea.css("line-height");

                    texthidden.css("font-family", fontFamily);
                    texthidden.css("font-size", fontSize);
                    texthidden.css("line-height", lineHeight);
                },
                html: function () {
                    var textArea = softtion.html("textarea").
                        addAttribute("ng-model","valueArea").
                        addAttribute("ng-click","clickArea($event)").
                        addAttribute("ng-blur","blurArea($event)").
                        addAttribute("ng-focus","focusArea($event)").
                        addAttribute("ng-keypress","keypressArea($event)").
                        addAttribute("ng-readonly","ngReadonly").
                        addAttribute("ng-disabled","ngDisabled").
                        addAttribute("ng-class", "{hide: !hideValue, holderhide: isHaveText()}").
                        addAttribute("ng-trim", "ngTrim").
                        addAttribute("ng-change", "ngChange").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");

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

                    var span = softtion.html("span").addClass("truncate");

                    var textHidden = softtion.html("div").addClass("textarea-hidden");

                    return textArea + lineShadow + label + value + span + textHidden;
                },         
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.TextArea.route,
                        scope: {
                            value: "=ngModel", 
                            valueArea: "=?value", 
                            label: "@", 
                            required: "=?",
                            ngTrim: "=?",
                            ngChange: "=?",
                            uppercase: "=?",
                            ngDisabled: "=?",
                            ngReadonly: "=?",
                            minLength: "=?",
                            maxLength: "=?",
                            icon: "@",
                            placeholder: "@",
                            
                            // Eventos
                            clickEvent: "=?",
                            blurEvent: "=?",
                            focusEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var hidden = $element.find(".textarea-hidden"),
                                area = $element.find("textarea");
                            
                            insertIconDescription($scope, $element, area);

                            // Atributos de control
                            var defineTextHidden = Material.components.TextArea.defineTextHidden;
                        
                            $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

                            defineTextHidden(area, hidden); $scope.hideValue = false;
                            $scope.valueArea = ""; $scope.valueReal = false;
                            
                            $scope.heightStyle = function () {
                                var value = ($scope.valueReal) ? $scope.valueArea : $scope.value;
                                hidden.html(value); return "height: " + hidden.height() + "px;";
                            };

                            // Se ha definido un valor
                            if (softtion.isString($scope.value)) { $element.addClass("active"); } 

                            $scope.clickLabel = function ($event) {
                                area.focus(); // Se activa el componente 
                                
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
                                } // Evento click sobre el componente
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.hideValue || softtion.isString($scope.valueArea)
                                    || softtion.isDefined($scope.value)) ? "active" : "";
                            };
                            
                            $scope.isHaveText = function () {
                                return softtion.isString($scope.valueArea) || softtion.isDefined($scope.value);
                            };
                            
                            $scope.clickArea = function ($event) {
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
                                } // Evento click sobre el componente
                            };

                            $scope.focusArea = function ($event) {
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = $scope.value.toString();
                                } // Cambiando valor del texto en el textarea
                                
                                $scope.hideValue = true; $scope.valueReal = true; 
                                $element.addClass("active"); 
                                
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event, $scope.valueArea);
                                } // Evento focus sobre el componente
                            };

                            $scope.blurArea = function ($event) {
                                if (!softtion.isString($scope.valueArea)) {
                                    $element.removeClass("active"); // Componente sin texto
                                    
                                    if ($scope.valueArea === "") { $scope.value = undefined; }

                                    if ($scope.required) {
                                        area.siblings("span").html("Este campo es requerido"); 
                                        $scope.value = undefined; $element.addClass("error");
                                    }
                                } else if($scope.valueArea.length < $scope.minLength) {
                                    area.siblings("span").html("Es campo requiere minimo " + $scope.minLength + " caracteres"); 
                                    $scope.value = undefined; $element.addClass("error"); 
                                } else { 
                                    if ($scope.uppercase) {
                                        $scope.valueArea = $scope.valueArea.toUpperCase();
                                    } // Se desea el texto en mayusculas
                                    
                                    $scope.value = $scope.valueArea; $element.removeClass("error"); 
                                }
                                
                                $scope.valueReal = false; $scope.hideValue = false; // Ocultando texrarea
                                
                                if (softtion.isDefined($scope.value)) {
                                    $scope.valueArea = ""; 
                                } // Limpiando texto en textarea del componente
                                
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent($event, $scope.value, $scope.valueArea);
                                } // Evento blur sobre el componente
                            };

                            $scope.keypressArea = function (ev) {
                                var validate = softtion.validateCharacter({
                                    keyCode: ev.keyCode, 
                                    type: $scope.type, 
                                    inputValue: $scope.valueArea
                                });

                                if (!validate) { ev.preventDefault(); } // Cancelando el evento
                                
                                if (!isNaN($scope.maxLength)) {
                                    if ($scope.valueArea.length === $scope.maxLength) {
                                        ev.preventDefault();
                                    } // Cancelando el evento
                                } // Se definío numero correctamente
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
                
                    var iconPassword = softtion.html("i").addClass("action").
                        setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                        addAttribute("ng-click", "clickAction()");

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
                        addChildren(iconPassword).addChildren(label).
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
                            clickEvent: "=?",
                            blurEvent: "=?",
                            focusEvent: "=?",
                            enterEvent: "=?",
                            changeEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.children(".content").children("input"),
                                regexEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/,
                                handler = Material.components.TextField;

                            insertIconDescription($scope, input); // Icono descriptivo
                            
                            var callbackFnEvent = function ($event, $function) {
                                if (softtion.isFunction($function)) {
                                    $function($event, $scope.valueInput);
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
                                $scope.value = value; 
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
                            
                            $scope.clickAction = function () {
                                if ($scope.ngDisabled) {
                                    return;
                                } // Componente esta desactivado
                                
                                if ($scope.type === "password") {
                                    $scope.viewPassword = !$scope.viewPassword; // Definiendo visibilidad
                                    
                                    $scope.typeInput = $scope.viewPassword ? "text" : "password";
                                    $scope.iconAction = $scope.viewPassword ? "visibility_off" : "visibility";
                                } else {
                                    if (softtion.isFunction($scope.iconFunction)) {
                                        $scope.$apply(function () { $scope.iconFunction(); });
                                    } // Se ha definido una función para el icono
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

                                if (!validate) { $event.preventDefault(); } // Cancelando el evento
                                
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
            
            TextFieldReadOnly: {
                route: "softtion/template/textfield-readonly.html",
                name: "textfieldReadonly",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "text").
                        addAttribute("ng-click", "clickInput($event)").
                        addAttribute("ng-blur", "blurInput($event)").
                        addAttribute("ng-focus", "focusInput($event)").
                        addAttribute("ng-readonly", "true").
                        addAttribute("ng-model", "value").
                        addAttribute("placeholder", "{{placeholder}}");

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
                            icon: "@",
                            placeholder: "@", 
                            
                            // Eventos
                            clickEvent: "=?", 
                            blurEvent: "=?", 
                            focusEvent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input");
                            
                            insertIconDescription($scope, $element, input);
                            
                            $scope.clickInput = function ($event) {
                                if (softtion.isFunction($scope.clickEvent)) {
                                    $scope.clickEvent($event);
                                } // Evento click sobre el componente
                            };
                            
                            $scope.focusInput = function ($event) {
                                if (softtion.isFunction($scope.focusEvent)) {
                                    $scope.focusEvent($event);
                                } // Evento click sobre el componente
                            };
                            
                            $scope.blurInput = function ($event) {
                                if (softtion.isFunction($scope.blurEvent)) {
                                    $scope.blurEvent($event);
                                } // Evento click sobre el componente
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
                                container = body.find(".tooltip-container"),
                                $window = angular.element(window);
                            
                            if (!container.exists()) {
                                container = angular.element(Material.components.Tooltip.container());
                        
                                body.append(container); // Agegando contenedor
                            } // Contenedor tooltip no se encuentra creado en el documento
                            
                            var tooltip = angular.element(Material.components.Tooltip.element());
                            
                            tooltip.html($attrs.tooltip); container.append(tooltip); // Agregando
                            
                            $element.on("mouseenter", function () {
                                var widthTooltip = tooltip.innerWidth(),
                                    heightElement = $element.innerHeight(),
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
                }
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
                            $element.click(function (event) {
                                $bottomSheet.set($attrs.bottomNavigation).show();
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
                            var disabledAutoclose = softtion.parseBoolean($attrs.disabledAutoclose);
                            
                            $element.click(function (event) {
                                $dropdown.set($attrs.dropdown).show($element, !disabledAutoclose);
                                
                                if (!disabledAutoclose) { event.stopPropagation(); }
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
                            $element.click(function (event) {
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
                            $element.click(function (event) {
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
                            softtion.html("div").addClass(["dialog", "alert"]).create()
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
                        var optionsDefault = {
                            title: "", content: "",
                            positiveLabel: "Aceptar",
                            negativeLabel: "Cancelar",
                            enabledBackdrop: false,
                            positiveFunction: undefined,
                            negativeFunction: undefined
                        };
                        
                        angular.extend(optionsDefault, options); 
                        
                        this.title(optionsDefault.title); 
                        this.content(optionsDefault.content);
                        this.positiveLabel(optionsDefault.positiveLabel);
                        this.negativeLabel(optionsDefault.negativeLabel);
                        this.backdropEnabled(optionsDefault.enabledBackdrop);
                        this.positiveFunction(optionsDefault.positiveFunction);
                        this.negativeFunction(optionsDefault.negativeFunction);

                        return this; // Retornando interfaz fluida
                    };

                    Alert.prototype.show = function () {
                        if (!Properties.dialog.hasClass("active")) {
                            angular.element(document.body).addClass("body-overflow-none");
                            
                            (Properties.negativeEnabled) ?
                                Properties.negativeButton.removeClass("hidden") :
                                Properties.negativeButton.addClass("hidden");
                            
                            Properties.dialog.addClass("active"); Properties.box.addClass("show");
                        } // Dialog no se encuentra activo
                    };

                    Alert.prototype.hide = function () {
                        if (Properties.dialog.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            Properties.dialog.removeClass("active"); Properties.box.removeClass("show");
                        } // Dialog se encuentra activo
                    };
                    
                    var alert = new Alert();
                    
                    this.get = function () { return alert; };
                    
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
                            Properties.content = Properties.component.children(".content");
                            Properties.backdrop = Properties.component.children(".backdrop");

                            Properties.backdrop.click(function () { self.hide(); });
                        } // Componente existe en el Documento
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    BottomSheet.prototype.show = function () {
                        if (Properties.component.exists()) {
                            var appContent = Properties.component.parents(".app-content");
                            
                            var isInAppcontent = (appContent.exists()),
                                content = (isInAppcontent) ? appContent :  
                                    angular.element(document.body);
                            
                            if (!Properties.component.hasClass("active")) {
                                content.addClass("overflow-none");
                                
                                if (isInAppcontent) {
                                    Properties.content.addClass("show");
                                } else {
                                    Properties.content.addClass("show-content");
                                    Properties.content.css("margin-bottom", content.scrollTop());
                                } // Componente no se encuentra en AppContent
                                
                                Properties.component.addClass("active"); 
                            } // Componente no se encuentra activo en la Aplicación
                        }
                    };

                    BottomSheet.prototype.hide = function () {
                        if (Properties.component.exists()) {
                            var appContent = Properties.component.parents(".app-content");
                            
                            var isInAppcontent = (appContent.exists()),
                                content = (isInAppcontent) ? appContent :  
                                    angular.element(document.body);
                            
                            if (Properties.component.hasClass("active")) {
                                content.removeClass("overflow-none");

                                (!isInAppcontent) ? 
                                    Properties.content.removeClass("show-content") :
                                    Properties.content.removeClass("show");

                                var marginBottom = Properties.content.outerHeight();
                                Properties.content.css("margin-bottom", (marginBottom * -1) - 1);

                                Properties.component.removeClass("active"); 
                            } // Componente se encuentra activo en la Aplicación
                        }
                    };
                    
                    var bottomSheet = new BottomSheet();
                    
                    this.get = function () { return bottomSheet; };

                    this.$get = function () { return bottomSheet; };
                }
            },
            
            Dialog: {
                name: "$dialog",
                method: function () {
                    var Properties = {
                        id: undefined,
                        dialog: undefined,
                        box: undefined,
                        backdrop: undefined,
                        persistent: false
                    };
                    
                    var Dialog = function () { this.id = ""; };

                    Dialog.prototype.set = function (dialogID) {
                        var self = this; // Sidenav
                        
                        if (Properties.id !== dialogID) {
                            Properties.id = dialogID; Properties.dialog = angular.element(dialogID);
                        
                            if (Properties.dialog.exists()) {
                                Properties.box = Properties.dialog.children(".box");
                                Properties.backdrop = Properties.dialog.children(".backdrop");

                                if (!Properties.backdrop.exists()) {
                                    Properties.backdrop = angular.element(
                                        softtion.html("div").addClass("backdrop").create()
                                    );

                                    Properties.dialog.append(Properties.backdrop);
                                    
                                    Properties.backdrop.click(function () { 
                                        if (!Properties.persistent) { self.hide(); }
                                    });
                                }
                            } // Sidenav existe en el Documento
                        }
                        
                        return this; // Retornando interfaz fluida
                    };

                    Dialog.prototype.show = function (persistent) {
                        if (!Properties.dialog.hasClass("active")) {
                            Properties.persistent = persistent;
                            
                            var $body = angular.element(document.body);
                            
                            $body.addClass("body-overflow-none"); // Body no scroll
                            
                            Properties.box.removeClass("hide").addClass("show");
                            Properties.dialog.addClass("active"); // Se activa el Sidenav
                        } // Sidenav no se encuentra activo
                    };

                    Dialog.prototype.hide = function () {
                        if (Properties.dialog.hasClass("active")) {
                            var $body = angular.element(document.body);
                            
                            $body.removeClass("body-overflow-none"); // Body scroll
                            
                            Properties.box.removeClass("show").addClass("hide");
                            Properties.dialog.removeClass("active"); // Se desactiva el Sidenav
                        } // Sidenav no se encuentra activo
                    };
                    
                    var dialog = new Dialog();
                    
                    this.get = function () { return dialog; };

                    this.$get = function () { return dialog; };
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
                    
                    show: function (properties) {
                        var handler = Material.providers.Dropdown.handler,
                            appContent = angular.element(".app-content"),
                            dropdown = properties.component, 
                            origin = properties.origin,
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
                        if (properties.belowOrigin) { 
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
                    
                    showXY: function (properties, left, top) {
                        var dropdown = properties.component;
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
                        if (properties.belowOrigin) { 
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
                    var Properties = {
                        id: undefined, 
                        belowOrigin: true, 
                        component: undefined, 
                        origin: undefined
                    };
                    
                    var Dropdown = function () { };

                    Dropdown.prototype.set = function (dropdownID) { 
                        if (Properties.id !== dropdownID) {
                            Properties.id = dropdownID;
                            Properties.component = angular.element(dropdownID); 
                        } else if (!softtion.isInPage(Properties.component[0])) {
                            Properties.component = angular.element(dropdownID); 
                        } // Se reasigna el componente
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    Dropdown.prototype.clear = function () {
                        Properties.component = undefined; Properties.id = ""; return this;
                    };
                    
                    Dropdown.prototype.setBelowOrigin = function (belowOrigin) {
                        Properties.belowOrigin = belowOrigin; return this;
                    };

                    Dropdown.prototype.isActive = function () {
                        if (softtion.isDefined(Properties.component)) {
                            return Properties.component.hasClass("active");
                        } // Esta definido el Id del Dropdown

                        return false; // Se desconoce el Componente
                    };

                    Dropdown.prototype.show = function (origin, autoclose) {
                        var self = this, id = Properties.id,
                            nameEvent = "click.hidedropdown" + id;
                        
                        if (softtion.isDefined(Properties.component)) {
                            Properties.origin = origin; // Estableciendo origen
                            Material.providers.Dropdown.handler.show(Properties); 
                            
                            if (autoclose) {
                                var $body = angular.element(document.body); // Documento
                                
                                $body.on(nameEvent, function (event) {
                                    if (Properties.component.find(event.target).length === 0) {
                                        self.set(id).hide(); $body.off(nameEvent);
                                    } // Se debe cerrar el dropdown de manera automatica
                                });
                            }
                        } // Esta definido el dropdown en el Provedor
                    };
                    
                    Dropdown.prototype.showXY = function (left, top, autoclose) {
                        var self = this; // Objeto dropdown
                        
                        if (softtion.isDefined(Properties.component)) {
                            Material.providers.Dropdown.handler.showXY(Properties, left, top); 
                            
                            if (autoclose) {
                                var $body = angular.element(document.body); // Documento
                                
                                $body.on("click.hidedropdown", function (ev) {
                                    if (Properties.component.find(ev.target).length === 0) {
                                        self.hide(); $body.off("click.hidedropdown");
                                    } // Se debe cerrar el dropdown de manera automatica
                                });
                            }
                        } // Esta definido el dropdown en el Provedor
                    };

                    Dropdown.prototype.hide = function () {
                        if (this.isActive()) { 
                            Material.providers.Dropdown.handler.hide(Properties.component); 
                        } // Esta abierto el dropdown en el Provedor
                    };
                    
                    var dropdown = new Dropdown();
                    
                    this.get = function () { return dropdown; };

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
                            Properties.backdrop = Properties.form.children(".backdrop");
                            Properties.content = Properties.form.children(".content");

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
                            Properties.form.addClass("active"); 
                            Properties.content.addClass("easing-out").addClass("show");
                        } // Sidenav no se encuentra activo
                    };

                    FormNavigation.prototype.hide = function () {
                        if (Properties.form.exists() && Properties.form.hasClass("active")) {
                            angular.element(document.body).removeClass("body-overflow-none");
                            
                            Properties.content.removeClass("easing-out").removeClass("show");
                            Properties.form.removeClass("active"); 
                            Properties.content.addClass("hide").addClass("sharp-curve");
                        } // Sidenav no se encuentra activo
                    };
                    
                    var formNavigation = new FormNavigation();
                    
                    this.get = function () { return formNavigation; };

                    this.$get = function () { return formNavigation; };
                }
            },
            
            ProgressBar: {
                name: "$progressBar",
                method: function () {
                    var Properties = { 
                        component: undefined,
                        callback: undefined,
                        functionStart: false,
                        $rootScope: undefined,
                        events: [
                            "animationend", "oAnimationEnd", "mozAnimationEnd", "webkitAnimationEnd"
                        ]
                    };
                    
                    var ProgressBar = function () {};

                    ProgressBar.prototype.set = function (progressID) {
                        Properties.component = angular.element(progressID);
                        var component = Properties.component;
                        
                        if (component.exists() && !component.hasClass("indeterminate")) {
                            var bar = component.children(".bar");
                            
                            if (!bar.hasEventListener(Properties.events)) {
                                bar.animationend(function () { 
                                    component.removeClass("show"); Properties.functionStart = false;
                                    
                                    if (softtion.isFunction(Properties.callback)) {
                                        Properties.$rootScope.$apply(function () { Properties.callback(); });
                                    } // Invocando función al terminar animación
                                });
                            }
                        } // Componente existe correctamente
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    ProgressBar.prototype.show = function (duration, callback) {
                        duration = duration || 4000; // Definiendo duración
                        
                        if (!Properties.component.hasClass("indeterminate")) {
                            var bar = Properties.component.children(".bar");
                            
                            if (!Properties.functionStart) {
                                Properties.callback = callback;
                            } // No se ha iniciado ningún proceso
                            
                            Properties.functionStart = true; // Inicio de efecto
                            
                            bar.css("-moz-animation-duration", (duration + "ms"));
                            bar.css("-webkit-animation-duration", (duration + "ms"));
                            bar.css("animation-duration", (duration + "ms"));
                            bar.css("-o-animation-duration", (duration + "ms"));
                            bar.css("-ms-animation-duration", (duration + "ms"));
                        } // Componente no es Indeterminado
                        
                        Properties.component.addClass("show"); // Visualizando
                    };

                    ProgressBar.prototype.hide = function () {
                        Properties.component.removeClass("show");
                    };
                    
                    var progressBar = new ProgressBar();
                    
                    this.get = function () { return progressBar; };

                    this.$get = ["$rootScope", function ($rootScope) {
                        Properties.$rootScope = $rootScope; return progressBar; 
                    }];
                }
            },
            
            ProgressCircular: {
                name: "$progressCircular",
                method: function () {
                    var Properties = {
                        component: undefined
                    };
                    
                    var ProgressCircular = function () { 
                        Properties.component = angular.element(
                            softtion.html("div").
                                addClass("content-progress-circular").
                                addChildren(
                                    softtion.html("div").addClass("progress-circular")
                                ).create()
                        );
                        
                        var appBar = angular.element(".app-bar");
                        
                        (appBar.exists()) ? appBar.append(Properties.component) :
                            angular.element(".app-content").append(Properties.component);
                    };

                    ProgressCircular.prototype.show = function () {
                        if (!Properties.component.hasClass("show")) {
                            Properties.component.addClass("show");
                        } // Haciendo visible el componente
                    };

                    ProgressCircular.prototype.hide = function () {
                        if (Properties.component.hasClass("show")) {
                            Properties.component.removeClass("show");
                        } // Haciendo invisible el componente
                    };

                    var progressCircular = new ProgressCircular();
                    
                    this.get = function () { return progressCircular; };
                    
                    this.$get = function () { return progressCircular; };
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
                            var $body = angular.element(document.body);
                            
                            $body.addClass("body-overflow-none"); // Body no scroll
                            
                            self.content.removeClass("hide").addClass("show");
                            self.sidenav.addClass("active"); // Se activa el Sidenav
                            
                            if (self.sidenav.hasClass("persistent")) {
                                $body.addClass("sidenav-persistent");
                            } // Componente es persistente en el documento
                        } // Sidenav no se encuentra activo
                    };

                    SideNav.prototype.hide = function () {
                        var self = this; // Sidenav

                        if (self.sidenav.hasClass("active")) {
                            var $body = angular.element(document.body);
                            
                            $body.removeClass("body-overflow-none"); // Body scroll
                            
                            self.content.removeClass("show").addClass("hide");
                            self.sidenav.removeClass("active"); // Se desactiva el Sidenav
                            
                            if (self.content.hasClass("persistent")) {
                                $body.removeClass("sidenav-persistent");
                            } // Componente es persistente en el documento
                        } // Sidenav no se encuentra activo
                    };
                    
                    var sidenav = new SideNav();
                    
                    this.get = function () { return sidenav; };

                    this.$get = function () { return sidenav; };
                }
            },
            
            Snackbar: {
                name: "$snackbar",
                moveButton: function (isShow, height) {
                    var button = angular.element("button.floating");
                        
                    if (button.exists() && (window.innerWidth <= 640) && !button.hasClass("static")) {
                        (!isShow) ? button.css("margin-bottom", "0px") :
                            button.css("margin-bottom", (height) + "px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var Properties = {
                        body: undefined, 
                        $rootScope: undefined,
                        box: undefined, 
                        action: undefined
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
                                        Properties.$rootScope.$apply(function () { optionsAction.action(); });

                                        if (softtion.isDefined(self.hiddenSnackbar)) {
                                            clearTimeout(self.hiddenSnackbar); self.hiddenSnackbar = undefined;
                                        } // Existe un cierre pendiente por realizar

                                        Properties.action.html(""); Material.providers.Snackbar.moveButton(false); 
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
                                3500 // Tiempo de espera para ocultarse
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
                    
                    this.get = function () { return snackbar; };
                    
                    this.$get = ["$rootScope", function ($rootScope) { 
                        Properties.$rootScope = $rootScope; return snackbar; 
                    }];
                }
            },
            
            Toast: {
                name: "$toast",
                moveButton: function (isShow, height) {
                    var button = angular.element("button.floating");
                        
                    if (button.exists() && (window.innerWidth <= 640) && !button.hasClass("static")) {
                        (!isShow) ? button.css("margin-bottom", "0px") :
                            button.css("margin-bottom", (height - 16) + "px");
                    } // Se debe cambiar posición del Botón en la Pantalla
                },
                method: function () {
                    var Properties = {
                        scope: undefined, box: undefined, body: undefined
                    };
                    
                    var Toast = function () { 
                        Properties.body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );

                        Properties.box = angular.element(
                            softtion.html("div").addClass(["toast"]).create()
                        );

                        Properties.box.append(Properties.body); 
                        
                        angular.element(".app-body").append(Properties.box);
                    };

                    Toast.prototype.show = function (text) {
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
                                3500 // Tiempo de espera para ocultarse
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

                    var toast = new Toast();
                    
                    this.get = function () { return toast; };
                    
                    this.$get = function () { return toast; };
                }
            },
            
            ThemeMaterial: {
                name: "$themeMaterial",
                method: ["ColorPalette", function (ColorPallete) {
                        
                    var ThemeMaterial = function () {};
                    
                    ThemeMaterial.prototype.setPrimary = function (nameTheme) {
                        var theme = ColorPallete[nameTheme]; // Tema
                        
                        if (softtion.isDefined(theme)) {
                            document.documentElement.style.setProperty("--theme-background", theme.standard);
                            document.documentElement.style.setProperty("--theme-background-light", theme.light);
                            document.documentElement.style.setProperty("--theme-background-dark", theme.dark);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    ThemeMaterial.prototype.setError = function (nameTheme) {
                        var theme = ColorPallete[nameTheme]; // Tema
                        
                        if (softtion.isDefined(theme)) {
                            document.documentElement.style.setProperty("--error-primary-font", theme.standard);
                            document.documentElement.style.setProperty("--theme-background-error", theme.standard);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    ThemeMaterial.prototype.setSecondary = function (nameTheme) {
                        var theme = ColorPallete[nameTheme]; // Tema
                        
                        if (softtion.isDefined(theme)) {
                            document.documentElement.style.setProperty("--theme-background-accent", theme.accent);
                            document.documentElement.style.setProperty("--theme-background-accent-disabled", theme.accentDisabled);
                            document.documentElement.style.setProperty("--theme-background-accent-focus", theme.accentFocus);
                            document.documentElement.style.setProperty("--theme-background-accent-hover", theme.accentHover);

                            document.documentElement.style.setProperty("--accent-primary-font", theme.font);
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

    ngMaterial.constant("ColorPalette", {
        red: {
            standard: "#f44336",        // red-500
            dark: "#d32f2f",            // red-700
            light: "#ef9a9a",           // red-200

            accent: "#f44336",          // red-500
            accentFocus: "#c62828",     // red-800
            accentHover: "#e57373",     // red-300
            accentDisabled: "#ffcdd2",  // red-100

            font: "#f44336"             // red-500
        },
        pink: {
            standard: "#e91e63",        // pink-500
            dark: "#c2185b",            // pink-700
            light: "#f48fb1",           // pink-200

            accent: "#e91e63",          // pink-500
            accentFocus: "#ad1457",     // pink-800
            accentHover: "#f06292",     // pink-300
            accentDisabled: "#f8bbd0",  // pink-100

            font: "#e91e63"             // pink-500
        },
        purple: {
            standard: "#9c27b0",        // purple-500
            dark: "#7b1fa2",            // purple-700
            light: "#e1bee7",           // purple-200

            accent: "#9c27b0",          // purple-500
            accentFocus: "#6a1b9a",     // purple-800
            accentHover: "#ba68c8",     // purple-300
            accentDisabled: "#e1bee7",  // purple-100

            font: "#9c27b0"             // purple-500
        },
        deepPurple: {
            standard: "#673ab7",        // deep-purple-500
            dark: "#512da8",            // deep-purple-700
            light: "#b39ddb",           // deep-purple-200

            accent: "#673ab7",          // deep-purple-500
            accentFocus: "#4527a0",     // deep-purple-800
            accentHover: "#9575cd",     // deep-purple-300
            accentDisabled: "#d1c4e9",  // deep-purple-100

            font: "#673ab7"             // deep-purple-500
        },
        indigo: {
            standard: "#3f51b5",        // indigo-500
            dark: "#303f9f",            // indigo-700
            light: "#9fa8da",           // indigo-200

            accent: "#3f51b5",          // indigo-500
            accentFocus: "#283593",     // indigo-800
            accentHover: "#7986cb",     // indigo-300
            accentDisabled: "#c5cae9",  // indigo-100

            font: "#3f51b5"             // indigo-500
        },
        blue: {
            standard: "#2196f3",        // blue-500
            dark: "#1976d2",            // blue-700
            light: "#90caf9",           // blue-200

            accent: "#2196f3",          // blue-500
            accentFocus: "#1565c0",     // blue-800
            accentHover: "#64b5f6",     // blue-300
            accentDisabled: "#bbdefb",  // blue-100

            font: "#2196f3"             // blue-500
        },
        lightBlue: {
            standard: "#03a9f4",        // light-blue-500
            dark: "#0288d1",            // light-blue-700
            light: "#81d4fa",           // light-blue-200

            accent: "#03a9f4",          // light-blue-500
            accentFocus: "#0277bd",     // light-blue-800
            accentHover: "#4fc3f7",     // light-blue-300
            accentDisabled: "#b3e5fc",  // light-blue-100

            font: "#03a9f4"             // light-blue-500
        },
        cyan: {
            standard: "#00bcd4",        // cyan-500
            dark: "#0097a7",            // cyan-700
            light: "#80deea",           // cyan-200

            accent: "#00bcd4",          // cyan-500
            accentFocus: "#00838f",     // cyan-800
            accentHover: "#4dd0e1",     // cyan-300
            accentDisabled: "#b2ebf2",  // cyan-100

            font: "#00bcd4"             // cyan-500
        },
        teal: {
            standard: "#009688",        // teal-500
            dark: "#00796b",            // teal-700
            light: "#80cbc4",           // teal-200

            accent: "#009688",          // teal-500
            accentFocus: "#00695c",     // teal-800
            accentHover: "#4db6ac",     // teal-300
            accentDisabled: "#b2dfdb",  // teal-100

            font: "#009688"             // teal-500
        },
        green: {
            standard: "#4caf50",        // green-500
            dark: "#388e3c",            // green-700
            light: "#a5d6a7",           // green-200

            accent: "#4caf50",          // green-500
            accentFocus: "#2e7d32",     // green-800
            accentHover: "#81c784",     // green-300
            accentDisabled: "#c8e6c9",  // green-100

            font: "#4caf50"             // green-500
        },
        lightGreen: {
            standard: "#8bc34a",        // light-green-500
            dark: "#689f38",            // light-green-700
            light: "#c5e1a5",           // light-green-200

            accent: "#8bc34a",          // light-green-500
            accentFocus: "#558b2f",     // light-green-800
            accentHover: "#aed581",     // light-green-300
            accentDisabled: "#dcedc8",  // light-green-100

            font: "#8bc34a"             // light-green-500
        },
        lime: {
            standard: "#c0ca33",        // lime-600
            dark: "#9e9d24",            // lime-800
            light: "#dce775",           // lime-300

            accent: "#c0ca33",          // lime-600
            accentFocus: "#827717",     // lime-900
            accentHover: "#d4e157",     // lime-400
            accentDisabled: "#e6ee9c",  // lime-200

            font: "#c0ca33"             // lime-600
        },
        yellow: {
            standard: "#fdd835",        // yellow-600
            dark: "#fbc02d",            // yellow-700
            light: "#fff176",           // yellow-300

            accent: "#fdd835",          // yellow-600
            accentFocus: "#f9a825",     // yellow-800
            accentHover: "#ffee58",     // yellow-400
            accentDisabled: "#fff59d",  // yellow-200

            font: "#fdd835"             // yellow-600
        },
        amber: {
            standard: "#ffc107",        // amber-500
            dark: "#ffa000",            // amber-700
            light: "#ffe082",           // amber-200

            accent: "#ffc107",          // amber-500
            accentFocus: "#ff8f00",     // amber-800
            accentHover: "#ffd54f",     // amber-300
            accentDisabled: "#ffecb3",  // amber-100

            font: "#ffc107"             // amber-500
        },
        orange: {
            standard: "#ff9800",        // orange-500
            dark: "#f57c00",            // orange-700
            light: "#ffe0b2",           // orange-200

            accent: "#ff9800",          // orange-500
            accentFocus: "#ef6c00",     // orange-800
            accentHover: "#ffb74d",     // orange-300
            accentDisabled: "#c5cae9",  // orange-100

            font: "#ff9800"             // orange-500
        },
        deepOrange: {
            standard: "#ff5722",        // deep-orange-500
            dark: "#e64a19",            // deep-orange-700
            light: "#ffab91",           // deep-orange-200

            accent: "#ff5722",          // deep-orange-500
            accentFocus: "#d84315",     // deep-orange-800
            accentHover: "#ff8a65",     // deep-orange-300
            accentDisabled: "#ffccbc",  // deep-orange-100

            font: "#ff5722"             // deep-orange-500
        },
        brown: {
            standard: "#795548",        // brown-500
            dark: "#5d4037",            // brown-700
            light: "#bcaaa4",           // brown-200

            accent: "#795548",          // brown-500
            accentFocus: "#4e342e",     // brown-800
            accentHover: "#a1887f",     // brown-300
            accentDisabled: "#d7ccc8",  // brown-100

            font: "#795548"             // brown-500
        },
        grey: {
            standard: "#9e9e9e",        // grey-500
            dark: "#616161",            // grey-700
            light: "#e0e0e0",           // grey-300

            accent: "#9e9e9e",          // grey-500
            accentFocus: "#424242",     // grey-800
            accentHover: "#bdbdbd",     // grey-400
            accentDisabled: "#eeeeee",  // grey-200

            font: "#9e9e9e"             // grey-500
        },
        blueGrey: {
            standard: "#607d8b",        // blue-grey-500
            dark: "#455a64",            // blue-grey-700
            light: "#b0bec5",           // blue-grey-200

            accent: "#607d8b",          // blue-grey-500
            accentFocus: "#263238",     // blue-grey-900
            accentHover: "#90a4ae",     // blue-grey-300
            accentDisabled: "#cfd8dc",  // blue-grey-100

            font: "#607d8b"             // blue-grey-500
        }
    });
    
    ngMaterial.constant("SofttionMaterial", {
        VERSION: "1.0.4",
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
    
    // Provedores de SofttionMaterial
    angular.forEach(Material.providers, function (provider) {
        ngMaterial.provider(provider.name, provider.method);
    });
    
    // Directivas de proveedores de SofttionMaterial
    angular.forEach(Material.properties, function (property) {
        ngMaterial.directive(property.name, property.directive);
    });
});