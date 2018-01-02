/*
 Angular Softtion Material v1.2.6
 (c) 2016 - 2017 Softtion Developers
 http://material.softtion.com
 License: MIT
 Updated: 02/Ene/2018
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
    
    function insertImgIcon ($scope, $component) {
        if (softtion.isString($scope.imgIcon)) {
            var icon = angular.element(
                softtion.html("img", false).addClass("img-icon").
                    addAttribute("src", $scope.imgIcon).create()
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
    
    function defineInputComponent($scope, $element, handler) {
        // Componentes
        var input = $element.find("input"),
            regexEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

        insertIconDescription($scope, input); // Icono descriptivo
        
        var callbackFnEvent = function ($event, $function) {
            $function({ 
                $event: $event, $value: $scope.valueInput, $model: $scope.value 
            });
        };

        $scope.$watch(function () {
            return $scope.clearModel;
        }, function (newValue) {
            if (newValue === true) {
                $scope.value = undefined; $scope.valueInput = ""; 
                $scope.clearModel = false;
            }
        });
        
        $scope.$watch(function () {
            return $scope.value;
        }, function (newValue) { 
            if ($scope.inputStart) {
                if (softtion.isUndefined(newValue) && !$scope.inputActive) {
                    return;
                } // Componente no se encuentra enfocado
                
                validateValue(newValue); // Validando model

                if (softtion.isDefined(newValue)) {
                    $scope.valueInput = ($scope.inputActive) ? newValue : ""; 
                } // Limpiando texto en input del componente
            } // Componente ya se ha iniciado (enfocado)
        });
        
        $scope.$watch(function () {
            return $scope.valueInput;
        }, function (newValue, oldValue) { 
            if (newValue !== oldValue) {
                $scope.inputEvent({$value: newValue});
            } // Input a cambiado su valor
        });

        // Atributos de control
        $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

        $scope.typeInput = handler.defineInput($scope.type || "text");
        $scope.valueInput = ""; $scope.isIconAction = false;
        $scope.errorActive = false; $scope.isErrorActive = false; 
        $scope.inputActive = false; $scope.viewPassword = false; 
        
        $scope.inputStart = false; // Input no inicializado

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
                
                case (TextType.MATH):
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
                $scope.isErrorActive = false; $scope.errorActive = false; 
                $element.removeClass("error");

                if (assign) { defineModel(); } // Estableciendo Model
            } // Todo esta correcto
        };
        
        function validateValue(newValue) {
            if (softtion.isUndefined(newValue) && $scope.required) {
                $scope.isErrorActive = false;
                $scope.errorInput("Este campo es requerido"); return;
            } // El campo es requerido en el componente
            
            if (softtion.isDefined(newValue)) {
                var lengthText = newValue.toString().length;

                if (lengthText < $scope.minLength) {
                    $scope.errorInput("Este campo requiere minimo " + $scope.minLength + " caracteres"); 
                    $scope.isErrorActive = true; return;
                } // El campo es requiere una cantida de caracteres en el componente
            } // Ya se encuentra definido el Valor
            
            $scope.isErrorActive = false; $scope.errorActive = false; 
            $element.removeClass("error"); // Valor cumple con los requisitos
        };

        $scope.successInput = function (value) {
            $scope.value = value; // Definiendo Model
        };

        $scope.errorInput = function (message) {
            $scope.errorActive = true; $element.addClass("error"); 
            $scope.errorText = message; $scope.value = undefined; 
        };

        $scope.isActiveLabel = function () {
            return ($scope.inputActive || 
                softtion.isString($scope.valueInput) || 
                softtion.isDefined($scope.value));
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
                callbackFnEvent($event, $scope.iconEvent); // Evento icon
            }
        };

        $scope.focusInput = function ($event) {
            if (softtion.isDefined($scope.value)) {
                $scope.valueInput = $scope.value.toString();
            } // Cambiando valor del texto en el Input

            $element.addClass("active"); $scope.inputActive = true; 
            $scope.inputStart = true; // Iniciando componente

            callbackFnEvent($event, $scope.focusEvent); // Evento focus
        };

        $scope.blurInput = function ($event) {
            validateTextModel(true); $scope.inputActive = false;
            $element.removeClass("active");

            callbackFnEvent($event, $scope.blurEvent); // Evento blur
        };

        $scope.keypressInput = function ($event) {
            // Desactivando teclado
            if ($scope.keyDisabled) { $event.preventDefault(); } 

            var validate = softtion.validateCharacter({
                keyCode: $event.keyCode, 
                type: $scope.type, 
                inputValue: $scope.valueInput
            });

            if (!validate) {
                $event.preventDefault();
            } // Cancelando el evento

            if (!isNaN($scope.maxLength) && 
                 $scope.valueInput.length >= $scope.maxLength) {
                    $event.preventDefault();
            } // Se definío numero correctamente

            if ($event.keyCode === 13) {
                callbackFnEvent($event, $scope.enterEvent);
            } else {
                callbackFnEvent($event, $scope.keypressEvent);
            } // No se presiono tecla 'Enter' en el input
        };

        $scope.keyupInput = function ($event) {
            // Desactivando teclado
            if ($scope.keyDisabled) { return; } 

            validateTextModel(false); // Validando campo

            callbackFnEvent($event, $scope.keyupEvent);
        };

        $scope.getValueModel = function () {
            var value = (softtion.isDefined($scope.value)) ? 
                $scope.value : $scope.valueInput;
                
            if (($scope.type === "password") && !$scope.viewPassword) {
                var length = value.length; value = "";

                for (var i = 0; i < length; i++) { 
                    value += String.fromCharCode(8226); 
                } // Cargando el caracter password '•'
            } else if (softtion.isDefined(value)) {
                var json = { $model: value, $value: String(value) },
                    valueTemp = $scope.formatValue(json);
                
                if (softtion.isDefined(valueTemp)) {
                    value = valueTemp;
                } // Se definio valor desde otro contexto
            } // Se establecio formato para el componente de texto

            return value; // Retornando el valor a mostrar
        };
    };
    
    function defineAreaComponent($scope, $element) {
        // Componentes
        var hidden = $element.find(".textarea-hidden"),
            area = $element.find("textarea");

        insertIconDescription($scope, area); // Icono descriptivo
        
        hidden.resize(function () {
            area.css("height", hidden.height() + "px");
        });

        var callbackFnEvent = function ($event, $function) {
            $function({ $event: $event, $value: $scope.valueArea });
        };

        $scope.$watch(function () {
            return $scope.clearModel;
        }, function (newValue) {
            if (newValue === true) {
                $scope.valueHidden = ""; $scope.value = undefined; 
                $scope.valueArea = ""; $scope.clearModel = false;
            }
        });
        
        $scope.$watch(function () {
            return $scope.value;
        }, function (newValue) { 
            if ($scope.areaStart) {
                if (softtion.isUndefined(newValue) && !$scope.areaActive) {
                    return;
                } // Componente no se encuentra enfocado
                
                validateValue(newValue); // Validando model

                if (softtion.isDefined(newValue)) {
                    $scope.valueArea = ($scope.areaActive) ? newValue : ""; 
                } // Limpiando texto en input del componente
            } // Componente iniciado
        });
        
        $scope.$watch(function () {
            return $scope.valueArea;
        }, function (newValue, oldValue) { 
            if (newValue !== oldValue) {
                $scope.areaEvent({$value: newValue});
            } // Input a cambiado su valor
        });

        // Atributos de control
        $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

        $scope.valueArea = ""; $scope.valueReal = false;
        $scope.areaActive = false; $scope.valueHidden = "";
        $scope.areaStart = false; $scope.heightEnd = 0;
        
        $scope.pressEnter = false; $scope.countEnter = 0;

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
                $scope.isErrorActive = false; $scope.errorActive = false; 
                $element.removeClass("error");

                if (assign) { defineModel(); } // Estableciendo Model
            } // Todo esta correcto
        };
        
        function validateValue(newValue) {
            if (softtion.isUndefined(newValue) && $scope.required) {
                $scope.isErrorActive = false;
                $scope.errorInput("Este campo es requerido"); return;
            } // El campo es requerido en el componente
            
            if (softtion.isDefined(newValue)) {
                var lengthText = newValue.toString().length;

                if (lengthText < $scope.minLength) {
                    $scope.errorInput("Este campo requiere minimo " + $scope.minLength + " caracteres"); 
                    $scope.isErrorActive = true; return;
                } // El campo es requiere una cantida de caracteres en el componente
            } // Ya se encuentra definido el Valor
            
            $scope.isErrorActive = false; $scope.errorActive = false; 
            $element.removeClass("error"); // Valor cumple con los requisitos
        };

        $scope.errorArea = function (message) {
            $scope.errorActive = true; $element.addClass("error"); 
            $scope.errorText = message; $scope.value = undefined; 
        };

        $scope.heightStyle = function () {
            $scope.valueHidden = ($scope.valueReal) ? 
                $scope.valueArea : $scope.value;
                
            var heightEnter = $scope.countEnter * 18,
                heightArea = 0; // Alto del area
            
            if (hidden.height() > 0) {
                $scope.heightEnd = hidden.height();
                heightArea = hidden.height();
            } else {
                heightArea = $scope.heightEnd;
            }
                
            return ($scope.pressEnter) ?
                "height: " + (heightArea + heightEnter) + "px;" :
                "height: " + heightArea + "px;";
        };

        $scope.isActiveLabel = function () {
            return ($scope.areaActive || softtion.isString($scope.valueArea)
                || softtion.isDefined($scope.value));
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
            if (!$scope.ngReadonly) {
                area.focus();
            } // Componente sin restricciones
        };

        $scope.clickArea = function ($event) {
            if (!$scope.ngReadonly) {
                $event.preventDefault();
            } // Componente solo lectura
            
            callbackFnEvent($event, $scope.clickEvent);
        };

        $scope.focusArea = function ($event) {            
            if (softtion.isDefined($scope.value)) {
                $scope.valueArea = $scope.value.toString();
            } // Cambiando valor del texto en el textarea

            $scope.areaActive = true; $scope.valueReal = true; 
            $element.addClass("active"); $scope.areaStart = true;

            callbackFnEvent($event, $scope.focusEvent); // Evento focus
        };

        $scope.blurArea = function ($event) {
            validateTextModel(true); $element.removeClass("active");

            $scope.valueReal = false; $scope.areaActive = false; 
            $scope.pressEnter = false; $scope.countEnter = 0;

            callbackFnEvent($event, $scope.blurEvent); // Evento blur

            if (softtion.isDefined($scope.value)) {
                $scope.valueArea = ""; 
            } // Limpiando texto en textarea del componente
        };

        $scope.keypressArea = function ($event) {
            // Desactivando teclado
            if ($scope.keyDisabled) { $event.preventDefault(); } 

            var validate = softtion.validateCharacter({
                keyCode: $event.keyCode, 
                type: $scope.type, 
                inputValue: $scope.valueArea
            });

            if (!validate) { 
                $event.preventDefault(); 
            } // Cancelando el evento

            if (!isNaN($scope.maxLength) &&
                 $scope.valueArea.length >= $scope.maxLength) {
                    $event.preventDefault();
            } // Se definío numero correctamente
            
            $scope.pressEnter = false; // No se ha presionado enter

            if ($event.keyCode === 13) {
                var length = $scope.valueArea.length,
                    cursorPosition = area.getCursorPosition();
                
                if (cursorPosition === 0) {
                    $event.preventDefault();
                } // Esta posicionado al comienzo del texto
                
                if (length <= cursorPosition) {
                    $scope.pressEnter = true; $scope.countEnter++;
                } // No se encuentra al final de Elemento
            
                callbackFnEvent($event, $scope.enterEvent);
            } else {
                $scope.countEnter = 0; // Se reinicia el contador
                callbackFnEvent($event, $scope.keypressEvent); 
            } // Hay un cambio en el valor
        };

        $scope.keyupArea = function ($event) {
            // Desactivando teclado
            if ($scope.keyDisabled) { return; } 

            validateTextModel(false); // Validando campo
            
            callbackFnEvent($event, $scope.keyupEvent);
        };

        $scope.getValueModel = function () {
            return (softtion.isDefined($scope.value)) ? $scope.value : $scope.valueArea;
        };
    };
    
    ngMaterial.filter("filterDictionary", filterDictionary);
    
    function filterDictionary() {
        return function (array, filter) {
            var result = []; // Lista de array a generar
            
            if (!softtion.isString(filter)) {
                return array;
            } // No ha digitado filtro
                               
            angular.forEach(array, function (item) {
                if (~item.toLowerCase().indexOf(filter)) { 
                    result.push(item); 
                } // Se encontro coincidencia, se agregara opción
            });
            
            return result; // Retornando array filtrado
        };
    }
    
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
                directive: ["$appBody", "$appContent", "$windowResize", 
                    function ($appBody, $appContent, $windowResize) {
                        return {
                            restrict: "C",
                            scope: {
                                fixed: "=?"
                            },
                            link: function ($scope, $element) {
                                    // Componentes
                                var sidenav = $appBody.children(".sidenav"),
                                    $window = angular.element(window),

                                    // Atributos
                                    position = 0, hideClass = "hide",
                                    heightElement = (!$element.hasClass("floating")) ?
                                        $element.innerHeight() : $element.outerHeight(true);


                                if ($element.find(".toolbar:first-child").exists() ||
                                    $element.find(".search-box:first-child").exists()) {
                                        $element.addClass("element-hidden");
                                } // Componente contiene elemento ocultable de primero

                                $appContent.scroll(function () {
                                    if (!$scope.fixed) {
                                        var heightMin = (($window.width() > 960) ? 64 : 56),
                                            positionNew = $appContent.scrollTop();

                                        if ((positionNew > heightMin)) {
                                            if (position < positionNew) {
                                                $element.addClass(hideClass); // Ocultando barra 
                                                $element.children(".dropdown").removeClass("show");
                                            } else {
                                                $element.removeClass(hideClass);
                                            } // Revelando componente
                                        } else if (positionNew === 0) {
                                            $element.removeClass(hideClass);
                                        } // Revelando componente, se llego al inicio

                                        position = positionNew; // Nueva posición del scroll
                                    } // Appbar se va ocultar en el Scroll
                                });

                                $appContent.css("padding-top", heightElement);
                                sidenav.css("top", heightElement); 

                                if ($window.width() > 960) { 
                                    $appContent.addClass("pd-64"); sidenav.addClass("pd-64");
                                } else {
                                    $appContent.addClass("pd-56"); sidenav.addClass("pd-56"); 
                                } // Pantalla es mayor a 960px

                                var keyAppBarWR = "wr-appbar-" + softtion.getGUID();

                                $windowResize.addListener(keyAppBarWR, function ($window) {
                                    if (!softtion.isInPage($element[0])) {
                                        $windowResize.removeListener(keyAppBarWR); return;
                                    } // Componente no se encuentra definido
                                    
                                    if ($window.width() > 960) {
                                        if (!$appContent.hasClass("pd-64")) {
                                            var paddingTop = parseInt($appContent.css("padding-top"));

                                            sidenav.css("top", (paddingTop + 8) + "px");
                                            $appContent.css("padding-top", (paddingTop + 8) + "px");
                                        } // AppBar de 64px Mínimo

                                        sidenav.addClass("pd-64").removeClass("pd-56");
                                        $appContent.addClass("pd-64").removeClass("pd-56");
                                    } else {
                                        if (!$appContent.hasClass("pd-56")) {
                                            var paddingTop = parseInt($appContent.css("padding-top"));

                                            sidenav.css("top", (paddingTop - 8) + "px");
                                            $appContent.css("padding-top", (paddingTop - 8) + "px");
                                        } // AppBar de 56px Mínimo

                                        sidenav.addClass("pd-56").removeClass("pd-64");
                                        $appContent.addClass("pd-56").removeClass("pd-64");
                                    }
                                });
                            }
                        };
                    }]
            },
            
            Audio: {
                route: "softtion/template/audio.html",
                name: "audio",
                html: function () {
                    var audio = softtion.html("audio").
                        addAttribute("preload", "auto");
                    
                    var content = softtion.html("div").addClass("content");
                    
                    content.addChildren(
                            softtion.html("button").
                                addClass(["action", "player"]).
                                addAttribute("ng-click", "play()").
                                addAttribute("ng-disabled", "errorAudio").
                                addChildren(
                                    softtion.html("i").
                                        setText("{{getIconPlay()}}")
                                )
                        ).addChildren(
                            softtion.html("button").
                                addClass(["action", "stopper"]).
                                addAttribute("ng-click", "stop()").
                                addAttribute("ng-disabled", "errorAudio").
                                addChildren(
                                    softtion.html("i").setText("stop")
                                )
                        ).addChildren(
                            softtion.html("div").addClass("detail").
                                addChildren(
                                    softtion.html("div").
                                        addClass(["progress-bar", "show"])
                                ).addChildren(
                                    softtion.html("label").addClass("name").
                                        setText("{{name}}")
                                ).addChildren(
                                    softtion.html("label").addClass("current-time").
                                        setText("{{getCurrentTime()}}")
                                ).addChildren(
                                    softtion.html("label").addClass("duration").
                                        setText("{{getDuration()}}")
                                )
                        ).addChildren(
                            softtion.html("button").
                                addClass(["action", "muted"]).
                                addAttribute("ng-click", "muted()").
                                addAttribute("ng-disabled", "errorAudio").
                                addChildren(
                                    softtion.html("i").
                                        setText("{{getIconMute()}}")
                                )
                        );
                
                    return audio + content; // Retornando componente
                },
                directive: ["$progressBar", function ($progressBar) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Audio.route,
                        scope: {
                            ngSrc: "@",
                            name: "@",
                            playAutomatic: "=?",
                            audioElement: "=?"
                        },
                        link: function ($scope, $element, $attrs) {
                            var audio = $element.children("audio")[0],
                                progressBar = $element.find(".progress-bar");
                        
                            $scope.$watch(function () {
                                return $scope.audioElement;
                            }, function (newValue, oldValue) {
                                var isAudio = newValue instanceof window.HTMLAudioElement;
                                $scope.audioElement = (isAudio) ? newValue : oldValue;
                            });
                            
                            $attrs.$observe("ngSrc", function () {
                                if (softtion.isString($scope.ngSrc)) {
                                    $scope.errorAudio = false;
                                    $scope.isLoadAudio = false;
                                    
                                    restorePlay(); $scope.duration = 0;
                                    
                                    if ($scope.playAutomatic) {
                                        audio.src = $scope.ngSrc;
                                    } // Reproducción automatica
                                } else {
                                    audio.src = ""; restorePlay(); $scope.duration = 0;
                                } // No ha definido correctamente la ruta
                            });
                        
                            $scope.isLoadAudio = false;
                            $scope.errorAudio = true;
                            
                            $scope.isPlay = false;
                            $scope.duration = 0;
                            $scope.currentTime = 0;
                            $scope.audioElement = audio;
                            
                            function describeTimeAudio(secondsAudio) {
                                var minutes = parseInt(secondsAudio / 60),
                                    seconds = parseInt(secondsAudio - (minutes * 60));
                            
                                return softtion.leadingChar(minutes, '0', 2) + 
                                    ":" + softtion.leadingChar(seconds, '0', 2);
                            }
                            
                            function restorePlay(paused) {
                                if ($scope.isPlay && !paused) {
                                    audio.pause();
                                } // La canción se esta reproducciendo
                                
                                $scope.isPlay = false; // Detener reproducción
                                audio.currentTime = 0; $scope.currentTime = 0;
                            }
                            
                            audio.onloadeddata = function () {
                                $scope.$apply(function () {
                                    $scope.isLoadAudio = true;
                                    
                                    $scope.isPlay = false;
                                    $scope.duration = audio.duration;
                                    
                                    $scope.play(); // Reproduciendo
                                });
                            };
                            
                            audio.onerror = function () {
                                $scope.$apply(function () {
                                    $scope.errorAudio = true; $scope.duration = 0;
                                    $scope.isPlay = false; $scope.isLoadAudio = false;
                                });
                            };
                            
                            audio.ontimeupdate = function () {
                                $scope.$apply(function () {
                                    $scope.currentTime = audio.currentTime;
                                    
                                    if ($scope.currentTime > 0) {
                                        var percentage = $scope.currentTime * 100;
                                        percentage = parseInt(percentage / $scope.duration);
                                        
                                        $progressBar.set(progressBar).setPercentage(percentage);
                                    } else {
                                        $progressBar.set(progressBar).setPercentage(0);
                                    } // La canción se ha detenido completamente
                                });
                            };
                            
                            audio.onended = function () {
                                $scope.$apply(function () { restorePlay(true); });
                            };
                            
                            $scope.play = function () {
                                if (!$scope.isLoadAudio) {
                                    audio.src = $scope.ngSrc; return;
                                } // No se ha cargado audio
                                
                                $scope.isPlay = !$scope.isPlay; // Cambiando estado
                                ($scope.isPlay) ? audio.play() : audio.pause();
                            };
                            
                            $scope.stop = function () {
                                restorePlay(); // Reiniciando audio
                            };
                            
                            $scope.muted = function () {
                                audio.muted = !audio.muted;
                            };
                            
                            $scope.getIconPlay = function () {
                                return (!$scope.isPlay) ? "play_circle_outline" : "pause_circle_outline";
                            };
                            
                            $scope.getIconMute = function () {
                                return (!audio.muted) ? "volume_up" : "volume_off";
                            };
                            
                            $scope.getCurrentTime = function () {
                                return describeTimeAudio($scope.currentTime);
                            };
                            
                            $scope.getDuration = function () {
                                return describeTimeAudio($scope.duration);
                            };
                        }
                    };
                }]
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
                        addClass("truncate").addAttribute("ng-click", "clickLabel()").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

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
                                addAttribute("tabindex","-1").
                                addAttribute("ng-repeat","suggestion in coincidences track by $index").
                                addAttribute("ng-click", "selectSuggestion(suggestion)").
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
                directive: ["$filter", function ($filter) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.AutoComplete.route,
                        scope: {
                            select: "=ngModel",
                            ngDisabled: "=?",
                            required: "=?",
                            keyDescription: "@",
                            label: "@",
                            suggestions: "=",
                            iconDescription: "@",
                            placeholder: "@",
                            disabledFocusclear: "=?",
                            helperText: "@",
                            helperPermanent: "=?",
                            searchMode: "=?",
                            rows: "=?",
                            
                            // Eventos
                            changedEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            functionDescription: "&"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), 
                                list = $element.find("ul");
                            
                            insertIconDescription($scope, input); // Icon Descriptivo
                                
                            // Atributos de control
                            var focusLi = false, searchStart = false;
                            
                            $scope.$watch(function () {
                                return $scope.suggestions;
                            }, function (newValue) {
                                if (softtion.isArray(newValue)) {
                                    if (!$scope.instance) {
                                        var keyOrder = ($scope.keyDescription) ? 
                                            $scope.keyDescription : "";
                                        
                                        $scope.suggestions = $filter("orderBy")(newValue, keyOrder);
                                    } // Aplicando el filtro
                                    
                                    $scope.instance = !$scope.instance;
                                } else {
                                    $scope.suggestions = []; // Array vacio
                                }
                            });

                            $scope.coincidences = []; $scope.old = undefined; 
                            $scope.instance = false; // Variable que verifica instancia
                            $scope.inputActive = false; $scope.clearSuggestion = true;
                            
                            $scope.$watch(function () {
                                return $scope.select;
                            }, function (newValue) {
                                if (softtion.isUndefined(newValue)) {
                                    $scope.valueInput = ""; 
                                } // Se limpio componente AutoComplete
                            });
                            
                            if (softtion.isNumber($scope.rows)) {
                                var rows = ((parseInt($scope.rows) * 48) + 24) + "px";
                                propertyStyle("--maxheight-autocomplete", rows);
                            } // Se ha definido núemro de filas a mostrar
                            
                            $scope.getValueSuggestion = function (suggestion) {
                                return !(softtion.isString($scope.keyDescription)) ? 
                                    JSON.stringify(suggestion) : 
                                    softtion.findKey(suggestion, $scope.keyDescription);
                            };

                            $scope.describeSuggestion = function (suggestion) {
                                return (typeof suggestion === "string") ?
                                    suggestion : $scope.getValueSuggestion(suggestion);
                            };

                            $scope.clickLabel = function () { input.focus(); };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.inputActive || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.select));
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
                                
                                $scope.focusEvent({$event: $event, $selected: $scope.select});
                            };
                            
                            $scope.searchSuggestions = function (filter) {
                                if (!softtion.isString(filter)) { 
                                    return; 
                                } // No ha definido patrón de filtro
                                
                                var coincidences = []; searchStart = true;
                               
                                angular.forEach($scope.suggestions, function (suggestion) {
                                    if (typeof suggestion === "string") {
                                        if (~suggestion.toLowerCase().indexOf(filter)) { 
                                            coincidences.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    } else {
                                        var value = $scope.getValueSuggestion(suggestion);

                                        if (~value.toLowerCase().indexOf(filter)) { 
                                            coincidences.push(suggestion); 
                                        } // Se encontro coincidencia, se agregara opción
                                    }
                                });
                                
                                $scope.coincidences = coincidences; list.addClass("active");
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
                                        list.removeClass("active"); 
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
                                    if (this.coincidences.length === 0) {
                                        $scope.select = undefined;
                                        $scope.clearSuggestion = true;
                                    } // No hay opciones posibles para selección
                                    
                                    $scope.inputActive = false; $element.removeClass("active");
                                    list.removeClass("active"); $scope.valueInput = "";

                                    $scope.blurEvent({
                                        $event: $event, $selected: $scope.select
                                    });
                                }
                            };

                            $scope.selectSuggestion = function (suggestion) {
                                $scope.old = $scope.select; $scope.inputActive = false;
                                $scope.clearSuggestion = false; list.removeClass("active"); 
                                
                                if (!$scope.searchMode) {
                                    $scope.select = suggestion; 
                                    $scope.valueInput = $scope.describeSuggestion(suggestion);
                                
                                    if ($scope.old !== $scope.select) {
                                        $scope.changedEvent({
                                            $nameEvent: "changed", 
                                            $old: $scope.old, $selected: $scope.select
                                        });
                                    } // La selección realizada es diferente a la anterior
                                } else {
                                    input.focus();  // Enfoncando componente de Texto
                                    
                                    $scope.changedEvent({
                                        $nameEvent: "selected", 
                                        $old: $scope.old, $selected: suggestion
                                    });
                                }
                            };

                            $scope.renderSuggestion = function (suggestion) {
                                var value = $scope.functionDescription({$suggestion: suggestion});
                                
                                if (softtion.isUndefined(value)) {
                                    value = softtion.isString(suggestion) ? suggestion :
                                        !(softtion.isString($scope.keyDescription)) ? 
                                            JSON.stringify(suggestion) :
                                            softtion.findKey(suggestion, $scope.keyDescription);
                                } // Se ha definido función para describir contenido

                                // Valor digitado para filtrar
                                var filter = $scope.valueInput.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                                // Expresión RegExp
                                var expReg = new RegExp("(" + filter.split(' ').join('|') + ")", "gi");

                                return value.replace(expReg, "<b>$1</b>"); // Valor final
                            };

                            $scope.notFoundResult = function () {
                                if (this.coincidences.length === 0) {
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
                                $scope.select = undefined; $element.removeClass("active"); 
                                $scope.clearSuggestion = true; 
                                
                                $scope.changedEvent({
                                    $selected: $scope.select,
                                    $nameEvent: "clear", $old: $scope.old
                                });
                                
                                if (!$scope.disabledFocusclear) { 
                                    input.focus(); 
                                } // Se hace focus al eliminar opción
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.select)) ?
                                    $scope.describeSuggestion($scope.select) : $scope.valueInput;
                            };
                        }
                    };
                }]
            },
            
            AutoCompleteRecord: {
                route: "softtion/template/autocomplete-record.html",
                name: "autocompleteRecord",
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
                        addClass("truncate").addAttribute("ng-click", "clickLabel()").
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

                    var value = softtion.html("p").addClass(["value"]).
                        setText("{{getValueModel()}}").
                        addAttribute("ng-hide", "hideValue").
                        addAttribute("ng-click", "clickLabel()");
                
                    var buttonClear = softtion.html("i").addClass(["action"]).
                        setText("close").addAttribute("ng-hide", "isActiveClear()").
                        addAttribute("ng-click", "clearAutocomplet()");
                
                    var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                        setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
                
                    var detail = softtion.html("div").addClass("detail").
                        addAttribute("ng-class", "{hidesubtitle: !isSubtitle(suggestion)}").
                        addChildren(
                            softtion.html("label").addClass(["title", "truncate"]).
                                addAttribute("ng-bind-html", "renderSuggestion(suggestion)")
                        ).
                        addChildren(
                            softtion.html("label").addClass(["subtitle", "truncate"]).
                                setText("{{getSubtitle(suggestion)}}")
                        );

                    var listAutocomplete = softtion.html("ul").
                        addChildren(
                            softtion.html("li").
                                addAttribute("tabindex","-1").
                                addAttribute("ng-repeat","suggestion in coincidences track by $index").
                                addAttribute("ng-click", "selectSuggestion(suggestion)").
                                addAttribute("ng-keydown", "keydownSuggestion($event, suggestion)").
                                addChildren(
                                    softtion.html("div").addClass("avatar").
                                        addChildren(
                                            softtion.html("span").
                                            addAttribute("ng-class", "{hidden: isAvatarImg(suggestion)}").
                                            setText("{{getTextAvatar(suggestion)}}")
                                        ).
                                        addChildren(
                                            softtion.html("img", false).
                                            addAttribute("ng-class", "{hidden: !isAvatarImg(suggestion)}").
                                            addAttribute("ng-src", "{{getSrcImg(suggestion)}}")
                                        )
                                ).addChildren(detail)
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
                directive: ["$filter", function ($filter) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.AutoCompleteRecord.route,
                        scope: {
                            select: "=ngModel",
                            ngDisabled: "=?",
                            required: "=?",
                            label: "@",
                            suggestions: "=",
                            keyTitle: "@",
                            keySubtitle: "@",
                            keyImg: "@",
                            iconDescription: "@",
                            placeholder: "@",
                            disabledFocusclear: "=?",
                            helperText: "@",
                            helperPermanent: "=?",
                            searchMode: "=?",
                            rows: "=?",
                            
                            // Eventos
                            changedEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            functionDescription: "&"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), 
                                list = $element.find("ul");
                            
                            insertIconDescription($scope, input); // Icon Descriptivo
                                
                            // Atributos de control
                            var focusLi = false, searchStart = false;
                            
                            $scope.$watch(function () {
                                return $scope.suggestions;
                            }, function (newValue) {
                                if (softtion.isArray(newValue)) {
                                    if (!$scope.instance) {
                                        var keyOrder = ($scope.keyTitle) ? $scope.keyTitle : "";
                                        $scope.suggestions = $filter("orderBy")(newValue, keyOrder);
                                    } // Aplicando el filtro
                                    
                                    $scope.instance = !$scope.instance;
                                } else {
                                    $scope.suggestions = []; // Array vacio
                                }
                            });

                            $scope.coincidences = []; $scope.old = undefined; 
                            $scope.instance = false; // Variable que verifica instancia
                            $scope.inputActive = false; $scope.clearSuggestion = true;
                            
                            $scope.$watch(function () {
                                return $scope.select;
                            }, function (newValue) {
                                if (softtion.isUndefined(newValue)) {
                                    $scope.valueInput = ""; 
                                } // Se limpio componente AutoComplete
                            });
                            
                            if (softtion.isNumber($scope.rows)) {
                                var rows = ((parseInt($scope.rows) * 56) + 28) + "px";
                                propertyStyle("--maxheight-autocomplete-record", rows);
                            } // Se ha definido núemro de filas a mostrar
                            
                            $scope.getValueSuggestion = function (suggestion) {
                                return !(softtion.isString($scope.keyTitle)) ? 
                                    JSON.stringify(suggestion) : 
                                    softtion.findKey(suggestion, $scope.keyTitle);
                            };
                            
                            $scope.isSubtitle = function (suggestion) {
                                return (softtion.isUndefined($scope.keySubtitle)) ?
                                    false : softtion.isString(suggestion[$scope.keySubtitle]);
                            };
                            
                            $scope.getSubtitle = function (suggestion) {
                                var defineSubtitle = softtion.isUndefined($scope.keySubtitle);
                                return (defineSubtitle) ? "" : suggestion[$scope.keySubtitle];
                            };
                            
                            $scope.getTextAvatar = function (suggestion) {
                                return this.getValueSuggestion(suggestion)[0];
                            };
                            
                            $scope.isAvatarImg = function (suggestion) {
                                return (softtion.isUndefined($scope.keyImg)) ?
                                    false : softtion.isString(suggestion[$scope.keyImg]);
                            };
                            
                            $scope.getSrcImg = function (suggestion) {
                                return (softtion.isUndefined($scope.keyImg)) ? "" : suggestion[$scope.keyImg];
                            };

                            $scope.clickLabel = function () { input.focus(); };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.inputActive || softtion.isString($scope.valueInput)
                                    || softtion.isDefined($scope.select));
                            };
                            
                            $scope.helperActive = function () {
                                return softtion.isUndefined($scope.select) || $scope.helperPermanent;
                            };
                            
                            $scope.isHaveSelection = function () {
                                return softtion.isString($scope.valueInput) || softtion.isDefined($scope.select);
                            };

                            $scope.focusInput = function ($event) {
                                if (softtion.isDefined($scope.select)) {
                                    $scope.valueInput = $scope.getValueSuggestion($scope.select);
                                } // Cambiando valor del texto en el Input
                                
                                $scope.inputActive = true; $element.addClass("active"); 
                                
                                // Buscar sugerencias con el filtro establecido
                                $scope.searchSuggestions($scope.valueInput.toLowerCase());
                                
                                $scope.focusEvent({$event: $event, $selected: $scope.select});
                            };
                            
                            $scope.searchSuggestions = function (filter) {
                                if (!softtion.isString(filter)) { 
                                    return; 
                                } // No ha definido patrón de filtro
                                
                                var coincidences = []; searchStart = true;
                               
                                angular.forEach($scope.suggestions, function (suggestion) {
                                    var value = $scope.getValueSuggestion(suggestion);

                                    if (~value.toLowerCase().indexOf(filter)) { 
                                        coincidences.push(suggestion); 
                                    } // Se encontro coincidencia, se agregara opción
                                });
                                
                                $scope.coincidences = coincidences; list.addClass("active");
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
                                        list.removeClass("active"); 
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
                                    if (this.coincidences.length === 0) {
                                        $scope.select = undefined;
                                        $scope.clearSuggestion = true;
                                    } // No hay opciones posibles para selección
                                    
                                    $scope.inputActive = false; $element.removeClass("active");
                                    list.removeClass("active"); $scope.valueInput = "";

                                    $scope.blurEvent({
                                        $event: $event, $selected: $scope.select
                                    });
                                }
                            };

                            $scope.selectSuggestion = function (suggestion) {
                                $scope.old = $scope.select; $scope.inputActive = false;
                                $scope.clearSuggestion = false; list.removeClass("active");
                                
                                if (!$scope.searchMode) {
                                    $scope.select = suggestion; 
                                    $scope.valueInput = $scope.getValueSuggestion(suggestion);
                                
                                    if ($scope.old !== $scope.select) {
                                        $scope.changedEvent({
                                            $selected: $scope.select,
                                            $nameEvent: "changed", $old: $scope.old
                                        });
                                    } // La selección realizada es diferente a la anterior
                                } else { 
                                    input.focus(); // Enfoncando componente de Texto
                                    
                                    $scope.changedEvent({
                                        $selected: suggestion,
                                        $nameEvent: "selected", $old: $scope.old
                                    });
                                }
                            };

                            $scope.renderSuggestion = function (suggestion) {
                                var value = $scope.functionDescription({$suggestion: suggestion});
                                
                                if (softtion.isUndefined(value)) {
                                    value = !(softtion.isString($scope.keyTitle)) ? 
                                        JSON.stringify(suggestion) :
                                        softtion.findKey(suggestion, $scope.keyTitle);
                                } // Se ha definido función para describir contenido
                                
                                // Valor digitado para filtrar
                                var filter = $scope.valueInput.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

                                // Expresión RegExp
                                var expReg = new RegExp("(" + filter.split(' ').join('|') + ")", "gi");

                                return value.replace(expReg, "<b>$1</b>"); // Valor final
                            };

                            $scope.notFoundResult = function () {
                                if (this.coincidences.length === 0) {
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
                                $scope.select = undefined; $element.removeClass("active"); 
                                $scope.clearSuggestion = true; 
                                
                                $scope.changedEvent({
                                    $nameEvent: "clear", 
                                    $old: $scope.old, 
                                    $selected: $scope.select
                                });
                                
                                if (!$scope.disabledFocusclear) { 
                                    input.focus(); 
                                } // Se hace focus al eliminar opción
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.select)) ?
                                    $scope.getValueSuggestion($scope.select) : $scope.valueInput;
                            };
                        }
                    };
                }]
            },
            
            BottomNavigation: {
                name: "bottomNavigation",
                ripple: function () {
                    return softtion.html("div").addClass("ripple-box").
                        addChildren(
                            softtion.html("span").addClass("effect")
                        ).create();
                },             
                directive: ["$softtionMaterial", function ($softtionMaterial) {
                    return {
                        restrict: "C",
                        scope: {
                            views: "@",
                            
                            // Eventos
                            viewEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var selectorFAB = $softtionMaterial.Selectors.FAB,
                                selectorNav = $softtionMaterial.Selectors.BottomNav; 
                            
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
                        
                            // Atributos
                            var classColor = "default", position = 0,
                                classHide = "hide", classShow = "show-bottom-navigation";
                            
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
                                    
                                    view.addClass("active");
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
                                
                                $scope.viewEvent({$event: $event});
                            });
                            
                            var nameEvent = "scroll.bottom-navigation",
                                defineElements = function () {
                                    snackbar = angular.element(".snackbar");
                                    toast = angular.element(".toast");
                                    actionButton = angular.element(selectorFAB);
                                    elementsNav = angular.element(selectorNav);
                                },
                                defineStatusElement = function (status) {
                                    if (!status) {
                                        snackbar.removeClass(classShow);
                                        toast.removeClass(classShow);
                                        actionButton.removeClass(classShow);
                                        elementsNav.removeClass(classShow);
                                    } else {
                                        snackbar.addClass(classShow);
                                        toast.addClass(classShow);
                                        actionButton.addClass(classShow);
                                        elementsNav.addClass(classShow);
                                    } // Se visualiza Bottom Navigation 
                                };
                            
                            var scrollBottomNav = function () {
                                var element = angular.element(this); defineElements();
                                
                                if (!softtion.isInPage($element[0])) {
                                    appContent.off(nameEvent, scrollBottomNav);
                                    defineStatusElement(false); return; 
                                } // No existe el bottom navigation en el documento
                                
                                var positionNew = element.scrollTop(); // Posicion actual
                                                                
                                if (position < positionNew) {
                                    defineStatusElement(false); $element.addClass(classHide);
                                } else {
                                    defineStatusElement(true); $element.removeClass(classHide);
                                } // Se visualiza BottomNavigation oculto
                                
                                position = positionNew; // Posición nueva del scroll
                            };
                            
                            appContent.on(nameEvent, scrollBottomNav);
                            
                            var flexibleContent = $element.parents(".flexible-content");
                            
                            if (flexibleContent.exists()) {
                                flexibleContent.children(".box").on(nameEvent, scrollBottomNav);
                            } // Elemento se encuentra insertado en un Flexible Content
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
                            
                            content.css("max-width", $scope.maxWidth);
                            content.css("max-height", "calc(100% - " + $scope.marginTop + ")");
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
            
            Carousel: {
                route: "softtion/template/carousel.html",
                name: "carousel",
                html: function () {
                    var content = softtion.html("div").
                        addClass("slide").addAttribute("ng-repeat", "slide in gallery").
                        addAttribute(
                            "ng-class", "{active: slideActive($index), before:" +
                            "slideBefore($index), after: slideAfter($index)}"
                        ).
                        addChildren(
                            softtion.html("img", false).addClass("center").
                                addAttribute("ng-src", "{{slide.img}}")
                        );

                    content.addChildren(
                        softtion.html("div").addClass(["detail", "{{position}}"]).
                            addChildren(
                                softtion.html("label").addClass("title").
                                    setText("{{slide.title}}")
                            ).
                            addChildren(
                                softtion.html("label").addClass("subtitle").
                                    setText("{{slide.subTitle}}")
                            ).
                            addChildren(
                                softtion.html("div").addClass("actions").
                                    addChildren(
                                        softtion.html("button").addClass("flat").
                                            addAttribute("ng-repeat", "action in actions").
                                            addAttribute(
                                                "ng-click", "clickAction(action, slide, $parent.$index)"
                                            ).setText("{{action.label}}")
                                    )
                            )
                    );

                    var buttonPrev = softtion.html("a").addClass(["arrow", "prev", "{{position}}"]).
                        addAttribute("ng-click", "prev()").
                        addAttribute("ng-class", "{disabled: transitionActive}").
                        addAttribute("ng-if", "beforeActive()").
                        addChildren(
                            softtion.html("i").setText("chevron_left")
                        );

                    var buttonNext = softtion.html("a").addClass(["arrow", "next", "{{position}}"]).
                        addAttribute("ng-click", "next()").
                        addAttribute("ng-class", "{disabled: transitionActive}").
                        addAttribute("ng-if", "afterActive()").
                        addChildren(
                            softtion.html("i").setText("chevron_right")
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
                            position: "@positionContent",
                            actions: "=?",
                            
                            // Escuchador
                            eventListener: "&"
                        },
                        link: function ($scope, $element) {
                            var intervalCarousel = undefined; $scope.index = 0; 
                            $scope.twoSlideActive = false; $scope.twoSlideStatus = "next";
                            $scope.time = isNaN($scope.time) ? 4000 : $scope.time;
                            
                            $scope.transitionActive = false; // Desactiva cambio
                            
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
                            
                            $scope.clickAction = function (action, item, $index) {
                                $scope.eventListener({
                                    $event: "clickAction", $item: item,
                                    $index: $index, $action: action.event
                                });
                            };
                        }
                    };
                }]
            },
            
            Catalog: {
                route: "softtion/template/catalog.html",
                name: "catalog",
                html: function () {
                    var arrowPrev = softtion.html("div").
                            addClass(["arrow", "prev"]).
                            addAttribute("ng-class", "{hidden : !activePrev()}").
                            addAttribute("ng-click", "prev()"),
                
                        arrowNext = softtion.html("div").
                            addClass(["arrow", "next"]).
                            addAttribute("ng-class", "{hidden : !activeNext()}").
                            addAttribute("ng-click", "next()"),
                
                        detail = softtion.html("div").addClass("detail").
                            addChildren(
                                softtion.html("div").addClass("content").
                                    addChildren(
                                        softtion.html("p").addClass("title").
                                            setText("{{photo.title}}")
                                    ).addChildren(
                                        softtion.html("p").addClass("subtitle").
                                            addChildren(
                                                softtion.html("img", false).
                                                    addAttribute("ng-hide", "!photo.icon").
                                                    addAttribute("disable-responsive", "true").
                                                    addAttribute("ng-src", "{{photo.icon}}")
                                            ).addChildren(
                                                softtion.html("span").
                                                    setText("{{photo.subtitle}}")
                                            )
                                    )
                            ).addChildren(
                                softtion.html("div").addClass("actions").
                                    addAttribute("ng-class", "{hidden: actions.length === 0}").
                                    addChildren(
                                        softtion.html("button").
                                            addAttribute("ng-repeat", "action in actions").
                                            addClass(["flat", "right"]).
                                            setText("{{action.label}}").
                                            addAttribute(
                                                "ng-click", "clickAction(action.name, photo, $index)"
                                            )
                                    )
                            );

                    var container = softtion.html("div").
                            addClass("container").
                            addAttribute("ng-style", "positionContent()").
                            addChildren(
                                softtion.html("div").addClass("content").
                                    addAttribute("ng-click", "select($index)").
                                    addAttribute("ng-style", "styleContent()").
                                    addAttribute("ng-class", "{active: isActiveContent($index)}").
                                    addAttribute("ng-repeat", "photo in gallery track by $index").
                                    addChildren(
                                        softtion.html("img", false).
                                            addAttribute("ng-src", "{{photo.src}}")
                                    ).addChildren(detail)
                    );  

                    return container + arrowPrev + arrowNext;
                },
                directive: ["$window", "$windowResize", function ($window, $windowResize) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Catalog.route,
                        scope: {
                            gallery: "=",
                            actions: "=?",
                            views: "@?",
                            widthViewOne: "@",
                            
                            eventAction: "&"
                        },
                        link: function ($scope, $element) {                            
                            var $container = $element.find(".container");
                            
                            $scope.index = 0; $scope.width = $window.innerWidth;
                            
                            if (!softtion.isArray($scope.gallery)) {
                                $scope.gallery = [];
                            } // Se debe definir una array en galeria
                            
                            if (!softtion.isArray($scope.actions)) {
                                $scope.actions = [];
                            } // Se debe definir una array en acciones
                            
                            var widthViewOne = parseInt($scope.widthViewOne);

                            $scope.widthOne = (isNaN(widthViewOne)) ? 360 : widthViewOne; 
                            
                            function getCountViews() {
                                var countViews = parseInt($scope.views);
                                
                                if (isNaN(countViews)) {
                                    countViews = 3;
                                } // No definio correctamente las vistas
                                
                                return countViews; // Cantidad de vistas
                            }
                            
                            $scope.styleContent = function () {
                                return !($scope.width > $scope.widthOne) ? {
                                        "flex-basis": "calc(100%)"
                                    } : {
                                        "flex-basis": "calc(100% / " + getCountViews() + ")"
                                    };
                            };
                            
                            $scope.isActiveContent = function ($index) {
                                return ($index === $scope.index);
                            };
                            
                            $scope.activePrev = function () {
                                return ($scope.index > 0);
                            };
                            
                            $scope.prev = function () {
                                if ($scope.index > 0) {
                                    $scope.index--;
                                } // Aun no ha llegado al inicio de Lista              
                            };
                            
                            $scope.activeNext = function () {
                                return ($scope.index < ($scope.gallery.length - 1));
                            };
                            
                            $scope.next = function () {
                                var length = $scope.gallery.length - 1;
                                    
                                if ($scope.index < (length)) {
                                    $scope.index++;
                                } // Aun no ha llegado al final de Lista
                            };
                            
                            $scope.select = function ($index) {
                                if ($scope.index !== $index) {
                                    $scope.index = $index;
                                } // Se ha seleccionado otro elemento
                            };
                            
                            function positionContentSmall() {
                                var $content = $container.find(".content");
                                
                                var widthContent = 0, translate = 0;
                                
                                if ($content) {
                                    widthContent = $content.width(); }
                                
                                translate = $scope.index * widthContent * -1;
                                
                                return {
                                    "-webkit-transform": "translateX(" + translate + "px)",
                                       "-moz-transform": "translateX(" + translate + "px)",
                                            "transform": "translateX(" + translate + "px)"
                                };
                            }
                            
                            function positionContentNormal() {
                                var $content = $container.find(".content"),
                                    countViews = getCountViews(),
                                    min = Math.trunc(countViews / 2),
                                    countItems = $scope.gallery.length,
                                    max = countItems - 1 - min;
                            
                                if ($scope.views%2 !== 0) { max--; }
                                
                                var widthContent = 0, translate;
                                
                                if ($content) {
                                    widthContent = $content.width(); }
                                
                                if ($scope.index < min) {
                                    translate = 0;
                                } else if ($scope.index > max) {
                                    translate = ($scope.index > countViews) ?
                                        widthContent * (max - min + 1) * (-1) : 0;
                                } else {
                                    translate = widthContent * (min - $scope.index);
                                } // Index se encuentra en la Mitad
                                
                                return {
                                    "-webkit-transform": "translateX(" + translate + "px)",
                                       "-moz-transform": "translateX(" + translate + "px)",
                                            "transform": "translateX(" + translate + "px)"
                                };
                                
                            }
                            
                            $scope.positionContent = function () {
                                return !($scope.width > $scope.widthOne) ? 
                                    positionContentSmall() : positionContentNormal();
                            };
                            
                            $scope.clickAction = function (name, $item, $index) {
                                $scope.eventAction({ $name: name, $item: $item, $index: $index });
                            };

                            var keyCatalogWR = "wr-catalog-" + softtion.getGUID();
                            
                            $windowResize.addListener(keyCatalogWR, function(window) {
                                if (!softtion.isInPage($element[0])) {
                                    $windowResize.removeListener(keyCatalogWR); return;
                                } // Componente no se encuentra definido
                                
                                $scope.width = window.width(); // Ajustando ancho
                            });
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
                            clickEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");

                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.checked = !$scope.checked; input.focus();
                                    $scope.clickEvent({$event: $event, $status: $scope.checked});
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
                            clickEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='checkbox']");
                            
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.checked = !$scope.checked; input.focus();
                                $scope.clickEvent({$event: $event});
                                
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
                            clickEvent: "&"
                        },
                        link: function ($scope) {
                            $scope.clickLabel = function ($event) { 
                                if ($scope.preventDefault) {
                                    return;
                                } // Se detendrá activación del evento
                                
                                $scope.clickEvent({$event: $event});
                                
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
                    var content = softtion.html("div").addClass("content").
                        addAttribute("ng-class", "{active: inputActive}");
                    
                    var box = softtion.html("div").addClass("box").
                        addAttribute(
                            "ng-class", "{focused: inputActive, disabled: ngDisabled, empty: isEmpty()}"
                        );
                    
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
                            blurEvent: "&",
                            focusEvent: "&",
                            changedEvent: "&"
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
                            
                            $scope.isEmpty = function () {
                                return $scope.listValue.isEmpty();
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
                                $scope.inputActive = true; // Activando input
                                
                                $scope.focusEvent({$event: $event, $values: $scope.listValue});
                            };
                            
                            $scope.blurInput = function ($event) { 
                                $scope.valueInput = undefined; $scope.inputActive = false;
                                
                                $scope.blurEvent({$event: $event, $values: $scope.listValue});
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

                                    $scope.changedEvent({
                                        $nameEvent: "add", 
                                        $values: $scope.listValue, 
                                        $text: $scope.valueInput
                                    });
                                    
                                    $scope.valueInput = undefined;
                                } // Se va agregar texto escrito en el componente
                            };
                            
                            $scope.removeItem = function (index) {
                                if (!$scope.ngDisabled) {
                                    var objectRemove = $scope.listValue[index];
                                
                                    $scope.listValue.remove(index); // Removiendo

                                    $scope.changedEvent({
                                        $nameEvent: "remove", 
                                        $values: $scope.listValue, 
                                        $remove: objectRemove
                                    });
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
                            selectEvent: "&",
                            cancelEvent: "&"
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
                                
                                this.setSelection(true); $scope.selectEvent({$time: $scope.time});
                            };
                            
                            $scope.cancel = function () {
                                this.setSelection(true); $scope.cancelEvent({$time: $scope.time});
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
                    
                    return dialog.create(); // Componente ClockpickerDialog
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
                            selectEvent: "&",
                            cancelEvent: "&"
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
                                $scope.selectEvent({$time: $scope.time});
                            };
                            
                            $scope.cancelComponent = function () {
                                $scope.showActive = false; $scope.selectEvent({$time: $scope.time});
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
                            showEvent: "&",
                            selectEvent: "&",
                            cancelEvent: "&",
                            iconEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var value = $element.find(".value");
                        
                            var icon = insertIconDescription($scope, value); // Icono
                            
                            if (softtion.isDefined(icon)) {
                                icon.on("click", function ($event) { 
                                    $scope.$apply(function () { 
                                        $scope.iconEvent({$event: $event}); 
                                    }); 
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
                                    $scope.show = true; $scope.showEvent({$event: $event});
                                }
                            };
                            
                            $scope.selectDialog = function ($time) {
                                $scope.time = $time; $scope.selectEvent({$time: $scope.time});
                            };
                            
                            $scope.cancelDialog = function () {
                                $scope.cancelEvent({$time: $scope.time});
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
                            ngSelect: "&",
                            ngSelectAll: "&"
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

                                    $scope.ngSelectAll({
                                        $event: $event, $selection: $scope.selection
                                    });
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

                                        $scope.ngSelect({
                                            $index: index, $status: itemActive, 
                                            $item: itemSelect, $event: $event, 
                                            $element: tr, $selection: $scope.selection
                                        });
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
                                                        addAttribute("ng-class",
                                                            "{disabled : dayDisabled(day.value), today: isToday(day.value)," +
                                                            " active: isActiveDay(day.value), selected: isSelectedDay(day.value)}"
                                                        ).addAttribute("ng-click", "selectDay(day.value)").
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
                            disabledDate: "&",
                            
                            // Eventos
                            selectEvent: "&",
                            cancelEvent: "&"
                        },
                        link: function ($scope, $elememt) {
                            // Componentes
                            var table = $elememt.find(".content table.days-month"),
                                listYears = $elememt.find(".content .year"),
                                listMonths = $elememt.find(".content .months");
                        
                            function init(date) {
                                dateDayStart.setFullYear(date.getFullYear()); 
                                dateDayStart.setDate(1); 
                                dateDayStart.setMonth(date.getMonth()); 
                                                        
                                $scope.year = date.getFullYear();
                                $scope.day = date.getDate();
                                $scope.month = date.getMonth();
                            
                                $scope.monthText = nameMonths[$scope.month];
                            
                                $scope.daysMonth = createCalendar(
                                    $scope.year, 
                                    $scope.month, 
                                    dateDayStart.getDay(), 
                                    countDaysMonths[$scope.month]
                                );
                            }
                            
                            // Atributos
                            var countDaysMonths = softtion.get(softtion.DAYS_OF_MONTHS),
                                today = new Date().normalize("date"), 
                                dateDayStart = new Date().normalize("date"),
                                yearRange = ($scope.yearRange) ? parseInt($scope.yearRange) : 10,
                                nameDaysWeek = softtion.get(softtion.DAYS_OF_WEEK),
                                nameMonths = softtion.get(softtion.MONTHS_OF_YEAR),
                                nameMonthsMin = softtion.get(softtion.MONTHS_OF_YEAR_MIN),
                                createCalendar = Material.components.Datepicker.createCalendar,
                                createYears = Material.components.Datepicker.createYears,
                                fontSize = parseInt(angular.element(document.body).css("font-size"));
                            
                            $scope.$watch(function () {
                                return $scope.date;
                            }, function (newValue, oldValue) {
                                if (softtion.isDate(newValue)) {
                                    init(newValue); 
                                } else if (softtion.isDefined(newValue)) {
                                    $scope.date = oldValue;
                                } // Valor definido no es una fecha
                            });
                            
                            $scope.enabledSelectYear = false;
                            $scope.enabledSelectMonth = false;
                            
                            init(today); // Iniciando calendario
                    
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
                            
                            // FUNCIONES PARA CONTROL DE AÑOS
                            
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
                                    
                                    $scope.daysMonth = createCalendar(
                                        $scope.year, $scope.month, dateDayStart.getDay(), countDaysMonth
                                    );
                                } // Cambio de año en el Componente
                                
                                $scope.activeYear(false); // Desactivando selección de Año
                            };
                             
                            // FUNCIONES PARA CONTROL DE MESES
                            
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
                            
                            // FUNCIONES PARA CONTROL DE DÍAS
                            
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
                            
                            $scope.selectDay = function (day) {
                                $scope.selectDate = new Date($scope.year, $scope.month, day);
                                $scope.day = day; // Estableciendo dia seleccionado
                            };
                            
                            $scope.isActiveDay = function (day) {
                                if (softtion.isDefined(day) && softtion.isDate($scope.selectDate)) {
                                    return $scope.selectDate.equalsDate($scope.year, $scope.month, day);
                                } // Se ha definido el dia a comparar
                                
                                return false; // No es el dia de Hoy
                            };
                            
                            $scope.isSelectedDay = function (day) {
                                if (softtion.isDefined(day) && softtion.isDate($scope.date)) {
                                    return $scope.date.equalsDate($scope.year, $scope.month, day);
                                } // Se ha definido el dia a comparar
                                
                                return false; // No es el dia de Hoy
                            };
                            
                            // FUNCIONES PARA CONTROL DE LA FECHA
                            
                            $scope.setDate = function () {
                                $scope.date = new Date($scope.year, $scope.month, $scope.day);
                                $scope.selectEvent({$date: $scope.date});
                            };
                            
                            $scope.cancel = function () {
                                $scope.cancelEvent({$date: $scope.date});
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
                                        addAttribute("ng-model", "date").
                                        addAttribute("disabled-date", "disabledDatePicker($date)").
                                        addAttribute("select-event", "selectComponent($date)").
                                        addAttribute("cancel-event", "cancelComponent($date)").
                                        addAttribute("min-date", "minDate").
                                        addAttribute("max-date", "maxDate").
                                        addAttribute("year-range", "{{yearRange}}")
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
                            disabledDate: "&",
                            yearRange: "@",
                            showActive: "=",
                            parent: "@",
                            
                            // Eventos
                            selectEvent: "&",
                            cancelEvent: "&"
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
                                $scope.selectEvent({$date: $scope.date});
                            };
                            
                            $scope.cancelComponent = function () {
                                $scope.showActive = false; // Cerrando Dialog
                                $scope.selectEvent({$date: $scope.date});
                            };
                            
                            $scope.disabledDatePicker = function ($date) {
                                return $scope.disabledDate({$date: $date});
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
                        addAttribute("ng-model","date").
                        addAttribute("show-active", "show").
                        addAttribute("select-event", "selectDialog($date)").
                        addAttribute("cancel-event", "cancelDialog($date)").
                        addAttribute("parent", "{{parent}}").
                        addAttribute("min-date", "minDate").
                        addAttribute("max-date", "maxDate").
                        addAttribute("disabled-date", "disabledDateDialog($date)").
                        addAttribute("year-range", "{{yearRange}}");
                
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
                            disabledDate: "&",
                            
                            // Eventos
                            showEvent: "&",
                            selectEvent: "&",
                            cancelEvent: "&",
                            iconEvent: "&"
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
                                    $scope.show = true; $scope.showEvent({$event: $event});
                                }
                            };
                            
                            $scope.selectDialog = function ($date) {
                                $scope.date = $date; $scope.selectEvent({$date: $scope.date});
                            };
                            
                            $scope.cancelDialog = function () {
                                $scope.cancelEvent({$date: $scope.date});
                            };
                            
                            $scope.disabledDateDialog = function ($date) {
                                return $scope.disabledDate({$date: $date});
                            };
                            
                            $scope.clearDate = function () {
                                $scope.date = undefined; $element.removeClass("active"); 
                            };
                        }
                    };
                }
            },
            
            Dictionary: {
                route: "softtion/template/dictionary.html",
                name: "dictionary",
                html: function () {
                    var content = softtion.html("div").addClass("content");
                    
                    var textField = softtion.html("div").
                        addClass("textfield").
                        addAttribute("ng-model", "valueInput").
                        addAttribute("label", "{{label}}").
                        addAttribute("keyup-event", "keyupEvent($value)");
                
                    var itemList = softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("detail").
                                addChildren(
                                    softtion.html("label").
                                        addClass("title").setText("{{item}}")
                                )
                        );
                
                    var list = softtion.html("ul").
                        addClass("list").addChildren(
                            softtion.html("li").
                                addClass(["item-list", "actionable"]).
                                addAttribute("ng-repeat", "item in list | filterDictionary:filter").
                                addAttribute("ng-click", "clickItem(item)").
                                addChildren(itemList)
                        );
                
                    content.addChildren(textField).addChildren(list);
                
                    return content.create(); // Componente Dictionary
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Dictionary.route,
                        scope: {
                            list: "=ngModel",
                            label: "@",
                            
                            selectEvent: "&"
                        },
                        link: function ($scope) {
                            $scope.keyupEvent = function ($value) {
                                $scope.filter = $value;
                            };
                            
                            $scope.clickItem = function ($item) {
                                $scope.selectEvent({$item: $item});
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
                                        addAttribute("ng-touchhold", "fileHold($event)").
                                        addAttribute("ng-clickright", "fileRight($event)").
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
                                                        addAttribute("ng-class", "{actionable: isIconAction()}").
                                                        addChildren(
                                                            softtion.html("div").addClass("avatar").
                                                                addChildren(
                                                                    softtion.html("i").setText("{{getIconFile(file.type)}}")
                                                                )
                                                        ).addChildren(
                                                            softtion.html("label").addClass("name").setText("{{file.name}}")
                                                        ).addChildren(
                                                            softtion.html("button").addClass("action").
                                                                addAttribute("ng-click", "clickIconAction($event)").
                                                                addChildren(
                                                                    softtion.html("i").setText("{{iconAction}}")
                                                                )
                                                        )
                                                )
                                        )
                                )
                        );
                    
                    return input + content; // Componente FileChooser
                },
                directive: ["$timeout", "$sce", "$softtionMaterial", function ($timeout, $sce, $softtionMaterial) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.Filechooser.route,
                        scope: {
                            file: "=ngModel",
                            ngDisabled: "=?",
                            textDescription: "@",
                            iconAction: "@",
                            fileTypes: "=?",
                            
                            holdEvent: "&",
                            clickrightEvent: "&",
                            actionEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                imagesFormat = $softtionMaterial.File.imagesFormat,
                                viewPreview = $element.find(".view-preview"),
                                heightStart = (viewPreview.height() - 16);                                
                            
                            $scope.textDescription = $scope.textDescription || 
                                "Seleccione archivos a procesar";
                            
                            $scope.file = undefined; // Archivos seleccionado
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
        
                                reader.onload = function ($event) {
                                    $scope.$apply(function () {
                                        var fileResult = $event.target.result; 
                                        file["base64"] = fileResult; $scope.file = file;
                                    });
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 250);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    console.log(files[0].type); 
                                    
                                    if (!softtion.isArray($scope.fileTypes)) {
                                        processFile(files[0]);
                                    } else if ($scope.fileTypes.isEmpty()) {
                                        processFile(files[0]);
                                    } else {
                                        if ($scope.fileTypes.indexOf(files[0].type) !== -1) {
                                            processFile(files[0]);
                                        } // Se han definido filtro de tipo de Archivos
                                    }
                                    
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
                                return $softtionMaterial.File.getIconFile(typeFile);
                            };
                            
                            $scope.getIconComponent = function (typeFile) {
                                var icon = $softtionMaterial.File.getIconComponent(typeFile),
                                        
                                    heightPreview = viewPreview.height(),
                                    height = (heightPreview > 0) ? 
                                        (heightPreview - 16) + "px" : heightStart + "px",
                                                
                                    style = "height: " + height + "; width: " + height
                                        + "; line-height: " + height + "; font-size: " + height;
                                
                                return $sce.trustAsHtml(icon.addAttribute("style", style).create());
                            };
                            
                            $scope.fileHold = function ($event) {
                                $scope.holdEvent({ $file: $scope.file, $event: $event });
                            };
                            
                            $scope.fileRight = function ($event) {
                                $scope.clickrightEvent({ $file: $scope.file, $event: $event });
                            };
                            
                            $scope.isIconAction = function () {
                                return softtion.isString($scope.iconAction);
                            };
                            
                            $scope.clickIconAction = function ($event) {
                                $scope.actionEvent({ $file: $scope.file, $event: $event });
                            };
                        }
                    };
                }]
            },
            
            FilechooserAudio: {
                route: "softtion/template/filechooser-audio.html",
                name: "filechooserAudio",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "file");
                
                    var audio = softtion.html("div").addClass("audio").
                        addAttribute("ng-src", "{{ngSrc}}").
                        addAttribute("name", "{{name}}").
                        addAttribute("play-automatic", "playAutomatic").
                        addAttribute("audio-element", "audioElement");
                    
                    var actions = softtion.html("div").addClass("actions").
                        addChildren(
                            softtion.html("label").addClass("truncate").
                                setText("{{label}}")
                        ).addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                                addAttribute("ng-disabled", "ngDisabled").
                                addChildren(
                                    softtion.html("i").setText("save").
                                        addAttribute("ng-click", "saveFile()")
                                )
                        ).addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-hide", "!isSelectFile()").
                                addAttribute("ng-disabled", "ngDisabled").
                                addChildren(
                                    softtion.html("i").setText("delete").
                                        addAttribute("ng-click", "deleteFile()")
                                )
                        ).addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-disabled", "ngDisabled").
                                addChildren(
                                    softtion.html("i").setText("file_upload").
                                        addAttribute("ng-click", "selectFile()")
                                )
                        );
                    
                    return input + audio + actions; // Componente FileChooser
                },
                directive: ["$timeout", "$sce", function ($timeout, $sce) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FilechooserAudio.route,
                        scope: {
                            file: "=ngModel",
                            ngSrc: "@",
                            name: "@",
                            playAutomatic: "=?",
                            audioElement: "=?",
                            
                            label: "@",
                            ngDisabled: "=?",
                            saveEnabled: "=?",
                            
                            changedEvent: "&",
                            saveEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]");
                        
                            $scope.file = undefined; // Archivos seleccionado
                            
                            var audiosTypes = [ "audio/mp3" ];
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
        
                                reader.onloadend = function () {
                                    $scope.$apply(function () {
                                        var src = window.URL.createObjectURL(file);
                                        
                                        $scope.ngSrc = $sce.trustAsResourceUrl(src);
                                        
                                        $scope.name = file.name;
                                        $scope.file = file; // Archivo
                                        
                                        $scope.changedEvent({$file: file});
                                    });
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 500);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    console.log(files[0].type); 
                                    
                                    if (audiosTypes.indexOf(files[0].type) !== -1) {
                                        processFile(files[0]);
                                    } // El archivo es una imagen
                                } // Se cambio ha seleccionado un archivo
                            });
                            
                            $scope.selectFile = function () { fileInput.click(); };
                            
                            $scope.deleteFile = function () {
                                $scope.file = undefined; $scope.name = "";
                                fileInput[0].value = ""; $scope.ngSrc = ""; 
                                
                                $scope.changedEvent({$file: undefined});
                            };
                            
                            $scope.saveFile = function () {
                                if (softtion.isDefined($scope.file)) {
                                    $scope.saveEvent({$file: $scope.file});
                                } // Hay una imagen seleccionada
                            };
                            
                            $scope.isSelectFile = function () {
                                return softtion.isDefined($scope.file);
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
                directive: ["$timeout", "$softtionMaterial", function ($timeout, $softtionMaterial) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FilechooserMultiple.route,
                        scope: {
                            files: "=ngModel",
                            iconButton: "@",
                            multiple: "=?",
                            ngDisabled: "=?",
                            textDescription: "@",
                            fileTypes: "=?",
                            
                            // Eventos
                            holdEvent: "&",
                            clickrightEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                imagesFormat = $softtionMaterial.File.imagesFormat;
                            
                            $scope.iconButton = $scope.iconButton || "attachment";
                            $scope.textDescription = $scope.textDescription || 
                                "Seleccione archivos a procesar";
                            
                            $scope.files = []; // Lista de archivos seleccionados
                            
                            if ($scope.multiple) {
                                fileInput.attr("multiple", "");
                            } // Se pueden seleccionar multiples archivos
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
        
                                reader.onload = function ($event) {
                                    $scope.$apply(function () {
                                        var fileResult = $event.target.result; 
                                        file["base64"] = fileResult; $scope.files.push(file);
                                    });
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 250);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    angular.forEach(files, function (file) {
                                        console.log(file.type); 
                                        
                                        if (!softtion.isArray($scope.fileTypes)) {
                                            processFile(file);
                                        } else if ($scope.fileTypes.isEmpty()) {
                                            processFile(file);
                                        } else {
                                            if ($scope.fileTypes.indexOf(files[0].type) !== -1) {
                                                processFile(file);
                                            } // Se han definido filtro de tipo de Archivos
                                        }
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
                                return $softtionMaterial.File.getIconFile(typeFile);
                            };
                            
                            $scope.getIconComponent = function (typeFile) {
                                return $softtionMaterial.File.getIconComponent(typeFile).create();
                            };
                            
                            $scope.fileHold = function (file, $event, $index) {
                                $scope.holdEvent({
                                    $file: file, $event: $event, $index: $index
                                });
                            };
                            
                            $scope.fileRight = function (file, $event, $index) {
                                $scope.clickrightEvent({
                                    $file: file, $event: $event, $index: $index
                                });
                            };
                        }
                    };
                }]
            },
            
            FilechooserPerfil: {
                route: "softtion/template/filechooser-perfil.html",
                name: "filechooserPerfil",
                html: function () {
                    var input = softtion.html("input", false).
                        addAttribute("type", "file");
                
                    var icon = softtion.html("i").setText("{{icon}}").
                        addAttribute("ng-hide", "isImgDefine()");
                
                    var img = softtion.html("img", false).
                        addAttribute("ng-src", "{{ngSrc}}").
                        addAttribute("ng-hide", "!isImgDefine()");
                    
                    var actions = softtion.html("div").addClass("actions").
                        addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-disabled", "ngDisabled").
                                addChildren(
                                    softtion.html("i").setText("file_upload").
                                        addAttribute("ng-click", "selectFile()")
                                )
                        ).addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-disabled", "ngDisabled").
                                addAttribute("ng-hide", "!isSelectFile()").
                                addChildren(
                                    softtion.html("i").setText("delete").
                                        addAttribute("ng-click", "deleteFile()")
                                )
                        ).addChildren(
                            softtion.html("button").addClass("action").
                                addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                                addAttribute("ng-disabled", "ngDisabled").
                                addChildren(
                                    softtion.html("i").setText("save").
                                        addAttribute("ng-click", "saveFile()")
                                )
                        );
                    
                    return input + img + icon + actions; // Componente FileChooser
                },
                directive: ["$timeout", function ($timeout) {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.FilechooserPerfil.route,
                        scope: {
                            file: "=ngModel",
                            icon: "@",
                            ngDisabled: "=?",
                            ngSrc: "=?",
                            saveEnabled: "=?",
                            
                            changedEvent: "&",
                            saveEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var fileInput = $element.find("input[type=file]"),
                                icon = $element.children("i"); 
                        
                            $scope.file = undefined; // Archivos seleccionado
                            $scope.icon = $scope.icon || "person";
                            
                            var imgTypes = [
                                "image/jpeg", 
                                "image/jpg", 
                                "image/png", 
                                "image/gif", 
                                "image/svg+xml"
                            ];
                            
                            var processFile = function (file) {
                                var reader = new FileReader();
        
                                reader.onload = function ($event) {
                                    $scope.$apply(function () {
                                        var fileResult = $event.target.result; 
                                        $scope.ngSrc = fileResult; // IMG
                                        
                                        file["base64"] = fileResult; $scope.file = file;
                                        
                                        $scope.changedEvent({$file: file});
                                    });
                                };
                                
                                $timeout(function () { reader.readAsDataURL(file); }, 250);
        
                                return reader; // Retornando procesador de Archivo
                            };
                            
                            icon.resize(function () {
                                var fontSize = $element.height() - 48; // Tamaño
                                
                                icon.css("font-size", fontSize + "px");
                                icon.css("line-height", fontSize + "px");
                            });
                            
                            fileInput.change(function ($event) {
                                var files = fileInput[0].files; // Archivos
                                
                                if (files.length) {
                                    console.log(files[0].type); 
                                    
                                    if (imgTypes.indexOf(files[0].type) !== -1) {
                                        processFile(files[0]);
                                    } // El archivo es una imagen
                                } // Se cambio ha seleccionado un archivo
                            });
                            
                            $scope.selectFile = function () { fileInput.click(); };
                            
                            $scope.isImgDefine = function () {
                                return softtion.isString($scope.ngSrc);
                            };
                            
                            $scope.deleteFile = function () {
                                $scope.ngSrc = ""; $scope.file = undefined;
                                fileInput[0].value = "";
                                $scope.changedEvent({$file: undefined});
                            };
                            
                            $scope.saveFile = function () {
                                if (softtion.isDefined($scope.file)) {
                                    $scope.saveEvent({$file: $scope.file});
                                } // Hay una imagen seleccionada
                            };
                            
                            $scope.isSelectFile = function () {
                                return softtion.isDefined($scope.file);
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
            
            FabMenuRainbow: {
                name: "fabMenuRainbow",
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
                            
                            box.on("click.fab-rainbow", function () {
                                if ($element.hasClass("active")) {
                                    $element.removeClass("active"); backdrop.removeClass("active");
                                    $body.removeClass("body-overflow-none");
                                } // Debe cerrarse el componente
                            });
                            
                            button.on("click.fab-rainbow", function (event) {
                                $element.addClass("active").addClass("start"); 
                                $body.addClass("body-overflow-none");
                                backdrop.addClass("active"); event.stopPropagation();
                            });
                            
                            backdrop.on("click.fab-rainbow", function () {
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
                        addAttribute("focused-element", "focusedArea").
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
                            focusedArea: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            areaEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineAreaComponent($scope, $element);
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
                            removeEvent: "&",
                            holdEvent: "&",
                            clickrightEvent: "&"
                        },
                        link: function ($scope, $element) {
                            $scope.removeImage = function ($index) {
                                var item = $scope.images[$index]; // Item eliminado
                                
                                $scope.images.remove($index); // Eliminando
                                $scope.removeEvent({$item: item, $index: $index});
                            };
                            
                            $scope.fileHold = function (item, $event, $index) {
                                $scope.holdEvent({
                                    $item: item, $event: $event, $index: $index
                                });
                            };
                            
                            $scope.fileRight = function (item, $event, $index) {
                                $scope.clickrightEvent({
                                    $item: item, $event: $event, $index: $index
                                });
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
                            disabledResponsive: "=?",
                            density: "@"
                        },
                        link: function ($scope, $element) {
                            var valuesDensity = [ "width", "height" ];
                            
                            if ($scope.disabledResponsive) { 
                                $element.addClass("active"); return; 
                            } // No se desea configurar imagen
                            
                            var defineDensity = function () {
                                var height = $element[0].naturalHeight,
                                    width = $element[0].naturalWidth;
                            
                                $fnMaterial.setDensity($element, width, height);
                            };
                            
                            if (valuesDensity.hasItem($scope.density)) {
                                $element.addClass("density-" + $scope.density).addClass("active");
                            } else {
                                ($element[0].complete) ? defineDensity() :
                                    $element.on("load", function () { defineDensity(); });
                            } // Cargando densidad por dimensiones de imagen
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
                            clickEvent: "&"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input[type='radio']");
                            
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.model = $scope.value; input.focus();
                                    
                                    $scope.clickEvent({
                                        $event: $event, $status: $scope.model
                                    });
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
                            changedEvent: "&"
                        },
                        link: function ($scope, $element) {
                            $scope.value = isNaN($scope.value) ? 0 : $scope.value;
                            
                            $scope.setValue = function (value) {
                                $scope.value = ($scope.value === value) ? 0 : value;
                                $scope.changedEvent({$value: $scope.value});
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
                        addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]).
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

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
                        addAttribute("ng-class", "{show: showList, hide: !showList && startShow}").
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
                            required: "=?",
                            keyDescription: "@",
                            suggestions: "=",
                            ngDisabled: "=?",
                            clearSuggestion: "=?",
                            disabledAutoclose: "=?",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            rows: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            changedEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var label = $element.find("label"), input = $element.find("input"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                            
                            insertIconDescription($scope, input); // Icono Descriptivo
                            
                            if (softtion.isNumber($scope.rows)) {
                                var rows = ((parseInt($scope.rows) * 48) + 24) + "px";
                                propertyStyle("--maxheight-select", rows);
                                
                                $element.addClass("height-costum"); // Clase
                            } // Se ha definido número de filas a mostrar en la Lista
                            
                            var clickComponent = function (target) {
                                return (label.is(target) || input.is(target) || value.is(target) || list.is(target))
                                    || button.is(target) || buttonIcon.is(target) || $element.is(target);
                            };
                            
                            var nameEvent = "click.sm-select-" + softtion.getGUID();
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
                                    angular.element(document).on(nameEvent, closeSelect);
                                } // No se permite cerrado automatico
                                
                                $scope.startShow = true; $scope.showList = true; 
                                $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off(nameEvent, closeSelect);
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
                                
                                $scope.clickEvent({
                                    $event: $event, $selected: $scope.select
                                }); 
                                
                                $event.stopPropagation(); // Deteniendo propagación
                            };
                            
                            $scope.isActiveLabel = function () {
                                return (softtion.isDefined($scope.select));
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                $scope.focusEvent({
                                    $event: $event, $selected: $scope.select
                                }); 
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                $scope.blurEvent({
                                    $event: $event, $selected: $scope.select
                                }); 
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? 
                                        $scope.hideSuggestions() : $scope.showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.setSelection = function (suggestion, $event) {
                                var item = angular.element($event.currentTarget);
                                
                                list.animate({ scrollTop: item[0].offsetTop }, 175, "standardCurve"); 
                                
                                $scope.selectTemp = $scope.select; 
                                
                                list.find("li").removeClass("active"); item.addClass("active"); 
                                
                                $scope.select = suggestion; $scope.hideSuggestions(); // Ocultando opciones
                                
                                $scope.changedEvent({
                                    $nameEvent: "select", $selected: $scope.select, $old: $scope.selectTemp
                                }); 
                            };
                            
                            $scope.clearSelection = function () {
                                $scope.select = undefined; $scope.hideSuggestions();
                                list.find("li").removeClass("active"); 
                                
                                $scope.changedEvent({
                                    $nameEvent: "clear", $selected: $scope.select, $old: $scope.selectTemp
                                }); 
                            };
                            
                            $scope.getValueModel = function () {
                                return (softtion.isDefined($scope.select)) ? 
                                    $scope.describeSuggestion($scope.select) : "";
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
                        addAttribute("ng-click","clickLabel($event)").addClass(["truncate"]).
                        addChildren(
                            softtion.html("span").setText("*").addAttribute("ng-if","required")
                        );

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
                        addAttribute("ng-class", "{show: showList, hide: !showList && startShow}").
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
                            required: "=?",
                            ngDisabled: "=?",
                            keyDescription: "@",
                            suggestions: "=",
                            iconDescription: "@",
                            helperText: "@",
                            helperPermanent: "=?",
                            rows: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            changedEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var input = $element.find("input"), label = $element.find("label"),
                                button = $element.find("button"), buttonIcon = button.find("i"),
                                value = $element.find(".value"), list = $element.find("ul");
                        
                            insertIconDescription($scope, input); // Icono Descriptivo
                            
                            if (softtion.isNumber($scope.rows)) {
                                var rows = ((parseInt($scope.rows) * 48) + 24) + "px";
                                propertyStyle("--maxheight-select", rows);
                                
                                $element.addClass("height-costum"); // Clase
                            } // Se ha definido número de filas a mostrar en la Lista
                        
                            // Atributos
                            var describeValues = Material.components.SelectMultiple.describeValues;
                            var temp = []; $scope.selects = $scope.selects || [];
                            var nameEvent = "click.sm-select-multiple-" + softtion.getGUID();
                            
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
                                    angular.element(document).on(nameEvent, closeSelect);
                                } // No se permite cerrado automatico
                                
                                $scope.startShow = true; $scope.showList = true; 
                                $element.addClass("active"); 
                            };
                            
                            $scope.hideSuggestions = function () {
                                $scope.showList = false; $element.removeClass("active"); 
                                
                                if (!$scope.disabledAutoclose) {
                                    angular.element(document).off(nameEvent, closeSelect);
                                } // No se permite cerrado automatico
                            };
                            
                            $scope.showList = false; $scope.startShow = false;

                            $scope.clickLabel = function ($event) { 
                                if ($element.hasClass("active")) {
                                    return;
                                } // El componente se encuentra activo
                                
                                $scope.toggleSuggestions();
                                
                                $scope.clickEvent({
                                    $event: $event, $selecteds: $scope.selects
                                }); 
                            };
                            
                            $scope.isActiveLabel = function () {
                                return ($scope.selects.length > 0);
                            };

                            $scope.focusInput = function ($event) { 
                                $element.addClass("active"); // Activando
                                
                                $scope.focusEvent({
                                    $event: $event, $selecteds: $scope.selects
                                }); 
                            };

                            $scope.blurInput = function ($event) {
                                $element.removeClass("active"); // Desactivando
                                
                                $scope.blurEvent({
                                    $event: $event, $selecteds: $scope.selects
                                }); 
                            };

                            $scope.toggleSuggestions = function () {
                                if (!$scope.ngDisabled) {
                                    (list.hasClass("active")) ? 
                                        $scope.hideSuggestions() : $scope.showSuggestions();
                                } // No esta desactivado el componente
                            };

                            $scope.checkedSuggestion = function (suggestion, $event) {
                                (!$scope.isItemChecked(suggestion)) ? $scope.selects.push(suggestion) :
                                    $scope.selects.remove($scope.selects.indexOf(suggestion));
                                
                                $scope.changedEvent({
                                    $event: $event, $selecteds: $scope.selects
                                });
                                    
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
            },
            
            StepperHorizontal: {
                name: "stepperHorizontal",
                directive: ["$softtionMaterial", function ($softtionMaterial) {
                    return {
                        restrict: "C",
                        $scope: {
                            disabledRipple: "=?"
                        },
                        link: function ($scope, $element) {
                            if ($scope.disabledRipple) { return; } // No Ripple
                            
                            var items = $element.find("li > .content");
                            
                            angular.forEach(items, function (item) {
                                var element = angular.element(item),
                                    box = $softtionMaterial.Ripple.box(),
                                    effect = $softtionMaterial.Ripple.effect();

                                box.append(effect); element.append(box);
                                $softtionMaterial.Ripple.event(box, effect);
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
                            clickEvent: "&"
                        },
                        link: function ($scope, $element) { 
                            $scope.clickLabel = function ($event) { 
                                if (!$scope.ngDisabled) {
                                    $scope.clickEvent({$event: $event});
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
                            elementScroll: "@",
                            disabledPositionStart: "=?",
                            disabledOverflow: "=?",
                            positionScroll: "@",
                            
                            // Eventos
                            viewEvent: "&"
                        },
                        link: function ($scope, $element) {
                            // Componentes
                            var viewContent = angular.element($scope.views), 
                                views, tabs = $element.find(".tab"), 
                                index = 0, clickActive = true, viewsCount = 0,
                                positionStart, enabledClick,
                                stripe = angular.element(
                                    softtion.html("div").addClass("stripe").create()
                                );
                            
                            $scope.elementScroll = $scope.elementScroll || ".app-content";
                            
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
                                
                                $element.displaceLeft(function (name, event) {
                                    switch (name) {
                                        case ("start"):
                                            positionStart = event.originalEvent.pageX;
                                        break;
                                        
                                        case ("displace"): 
                                            var disabledClick = !softtion.isBetween(
                                                (event.originalEvent.pageX - positionStart), -15, 15
                                            );
                                            
                                            if (disabledClick) { clickActive = false; }
                                        break;
                                        
                                        case ("end"): 
                                            enabledClick = $timeout(
                                                function () { clickActive = true; }, 100
                                            );
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
                                    if (itemTab.hasClass("active")) { return; }
                                    
                                    stripe.css({ width: width, left: left });
                                    tabs.removeClass("active"); itemTab.addClass("active");
                                
                                    if (softtion.isDefined(views)) {
                                        views.removeClass("active"); 
                                        angular.element(views[position]).addClass("active");
                                    } // Vista actualmente activa
                                    
                                    if (!$scope.disabledPositionStart) {
                                        var elementScroll = angular.element($scope.elementScroll),
                                            positionScroll = parseInt($scope.positionScroll);
                                        
                                        if (!isNaN(positionScroll) && 
                                            (positionScroll < elementScroll.scrollTop())) {
                                            elementScroll.scrollTop(positionScroll); 
                                        } // Reposicionando scroll
                                    } // No es necesario reposicionar scroll de elemento establecido
                                    
                                    if (left < $element.scrollLeft() || (width + left) > widthTab) {
                                        $element.animate({ scrollLeft: left }, 175, "standardCurve");                                         
                                    } // Reubicando vista del contenedor en pestaña
                                    
                                    viewContent.css("left", (position * -100) + "%");
                                    
                                    $scope.viewEvent({$event: $event});
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
                        addAttribute("focused-element", "focusedArea").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                            focusedArea: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            areaEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineAreaComponent($scope, $element);
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
                        addAttribute("focused-element", "focusedInput").
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                    
                    box.addChildren(input).addChildren(value).
                        addChildren(label).addChildren(iconAction);
                    
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
                            placeholder: "@",
                            helperText: "@",
                            focusedInput: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            formatValue: "&",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            iconEvent: "&",
                            inputEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineInputComponent($scope, $element, Material.components.TextBox);
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
                        addAttribute("focused-element", "focusedArea").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                            focusedArea: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            areaEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineAreaComponent($scope, $element);
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
                        addAttribute("focused-element", "focusedInput").
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                            placeholder: "@",
                            helperText: "@",
                            focusedInput: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            formatValue: "&",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            iconEvent: "&",
                            inputEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineInputComponent($scope, $element, Material.components.TextField);
                        }
                    };
                }
            },
            
            TextFieldBordered: {
                route: "softtion/template/textfield-bordered.html",
                name: "textfieldBordered",
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
                        addAttribute("focused-element", "focusedInput").
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                    
                    box.addChildren(input).addChildren(value).
                        addChildren(iconAction).addChildren(label);
                        
                    content.addChildren(box).addChildren(spanHelper).
                        addChildren(spanError).addChildren(spanCounter);
                
                    return content.create(); // Componente Textfield Bordered
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
                        templateUrl: Material.components.TextFieldBordered.route,
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
                            placeholder: "@",
                            helperText: "@",
                            focusedInput: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            formatValue: "&",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keyupEvent: "&",
                            keypressEvent: "&",
                            iconEvent: "&",
                            inputEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineInputComponent($scope, $element, Material.components.TextFieldBordered);
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
                        addAttribute("focused-element", "focusedArea").
                        addAttribute("style", "{{heightStyle()}}").
                        addAttribute("placeholder","{{placeholder}}");

                    var lineShadow = softtion.html("div").addClass("line-shadow");
                    var lineActive = softtion.html("div").addClass("line-shadow-active");

                    var label = softtion.html("label").setText("{{label}}").
                        addAttribute("ng-click","clickLabel($event)").
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                            focusedArea: "=?",
                            keyDisabled: "=?",
                            clearModel: "=?",
                            
                            // Eventos
                            clickEvent: "&",
                            blurEvent: "&",
                            focusEvent: "&",
                            enterEvent: "&",
                            keypressEvent: "&",
                            keyupEvent: "&",
                            areaEvent: "&"
                        },
                        link: function ($scope, $element) {
                            defineAreaComponent($scope, $element);
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
                        addAttribute("ng-class", "{active: isActiveLabel()}").
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
                            imgIcon: "@",
                            helperText: "@",
                            helperPermanent: "=?"
                        },
                        link: function ($scope, $element) {
                            var input = $element.find("input");
                            
                            insertIconDescription($scope, input); // Icono
                            insertImgIcon($scope, input); // Icono
                            
                            $scope.isActiveLabel = function () {
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
            
            VideoYoutube: {
                route: "softtion/template/video-youtube.html",
                name: "videoYoutube",
                html: function () {
                    var iframe = softtion.html("iframe");
                
                    return iframe.create(); // Componente
                },
                directive: function () {
                    return {
                        restrict: "C",
                        templateUrl: Material.components.VideoYoutube.route,
                        scope: {
                            allowfullscreen: "=?",
                            ngSrc: "=?"
                        },
                        link: function ($scope, $element) {
                            var $iframe = $element.children("iframe");
                            
                            $scope.$watch(function (){
                                return $scope.ngSrc;
                            }, function (newValue) {
                                if (softtion.isString(newValue)) {
                                    $iframe.attr("src", newValue);
                                } // Se ha definido una ruta correctamente
                            });
                            
                            $iframe.attr("allowfullscreen", $scope.allowfullscreen);
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
                            var disabledAutoclose = $scope.$eval(
                                    $attrs.disabledAutoclose
                                );
                            
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
            
            FocusedElement: {
                name: "focusedElement",
                directive: ["$parse", "$timeout", function ($parse, $timeout) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var $focusedElement = $parse($attrs.focusedElement);
                            
                            $scope.$watch($focusedElement, function (value) {
                                if (value === true) { $element.focus(); } 
                            });
                            
                            $element.on("blur.focused-element", function () {
                                $timeout(function () {
                                    $scope.$apply($focusedElement.assign($scope, false));
                                });
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
            
            MaterialBackground: {
                name: "materialBackground",
                directive: ["$materialTheme", function ($materialTheme) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var background = $attrs.materialBackground;
                            
                            if (softtion.isString(background)) {
                                var properties = background.split(":");
                                
                                if (properties.has(2)) {
                                    var theme = $materialTheme.get(),
                                        color = theme[properties[0]][properties[1]];
                                
                                    if (softtion.isString(color)) {
                                        $element.css("background-color", color);
                                    } // Se ha definido color correctamente
                                }
                            }
                        }
                    };
                }]
            },
            
            MaterialFont: {
                name: "materialFont",
                directive: ["$materialTheme", function ($materialTheme) {
                    return {
                        restrict: "A",
                        link: function ($scope, $element, $attrs) {
                            var fontColor = $attrs.materialFont;
                            
                            if (softtion.isString(fontColor)) {
                                var properties = fontColor.split(":");
                                
                                if (properties.has(2)) {
                                    var theme = $materialTheme.get(),
                                        color = theme[properties[0]][properties[1]];
                                
                                    if (softtion.isString(color)) {
                                        $element.css("color", color);
                                    } // Se ha definido color correctamente
                                }
                            }
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

                        $backdrop = softtion.html("div").addClass("backdrop").tojQuery();

                        var box = softtion.html("div").addClass("box").tojQuery();

                        $title = softtion.html("div").addClass("title").tojQuery();

                        $content = softtion.html("div").addClass("content").tojQuery();

                        var actions = softtion.html("div").addClass("actions").tojQuery();

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
            
            AppBody: {
                name: "$appBody",
                method: function () {
                    var $appBody = undefined; // Elemento
                    
                    this.$get = function () { 
                        if (softtion.isUndefined($appBody)) {
                            $appBody = angular.element(".app-body");
                        } // Definiendo AppBody
                        
                        return $appBody; // Retornando elemento
                    };
                }
            },
            
            AppContent: {
                name: "$appContent",
                method: function () {
                    var $appContent = undefined; // Elemento
                    
                    this.$get = function () { 
                        if (softtion.isUndefined($appContent)) {
                            $appContent = angular.element(".app-content");
                        } // Definiendo AppContent
                        
                        return $appContent; // Retornando elemento
                    };
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
                        backdrop = undefined;
                    
                    var BottomSheet = function () {};

                    BottomSheet.prototype.set = function (sheetElement) {
                        var self = this; // Componente
                        
                        bottomSheet = instanceElement(sheetElement, "bottom-sheet");
                        
                        executeIfExists(bottomSheet, function () {
                            if (bottomSheet.exists()) {
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
                                } // Componente no se encuentra en AppContent
                            } // BottomSheet existe, no se encuentra visible en Documento
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
                            } // BottomSheet existe, se encuentra visible en Documento
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
                        $body = undefined,
                        backdrop = undefined,
                        persistent = false;
                    
                    var Dialog = function () {};

                    Dialog.prototype.set = function (dialogElement) {
                        var self = this; // Sidenav
                        
                        dialog = instanceElement(dialogElement, "dialog");
                        
                        executeIfExists(dialog, function () {
                            if (dialog.exists()) {
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
                    
                    var $dialog = new Dialog();
                    
                    this.get = function () { return $dialog; };

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return $dialog; 
                    }];
                }
            },
            
            Dropdown: {
                name: "$dropdown",
                method: function () {
                    var belowOrigin = true, 
                        $body = undefined,
                        $appBody = undefined,
                        $appContent = undefined,
                        dropdown = undefined, 
                        origin = undefined;
                
                    var Dropdown = function () { };

                    Dropdown.prototype.set = function (dropdownElement) { 
                        dropdown = instanceElement(dropdownElement, "dropdown"); 
                        
                        return this; // Retornando interfaz fluida
                    };
                    
                    Dropdown.prototype.setBelowOrigin = function (belowDropdown) {
                        belowOrigin = belowDropdown; return this;
                    };

                    Dropdown.prototype.isShow = function () {
                        return (softtion.isDefined(dropdown)) ? 
                            dropdown.hasClass("show") : false; 
                    };

                    Dropdown.prototype.show = function (originElement, autoclose) {
                        var self = this, // Instancia del proveedor
                            nameEvent = "click.hidedropdown-" + softtion.getGUID();
                        
                        executeIfExists(dropdown, function () {
                            origin = originElement; show(); 
                            
                            if (autoclose) {
                                var dropdownNow = dropdown; // Actual a cerrar
                                
                                $body.on(nameEvent, function ($event) {
                                    $event.stopPropagation(); // Cancelando propagación
                                    
                                    if (dropdown.find($event.target).length === 0) {
                                        self.set(dropdownNow).hide(); $body.off(nameEvent);
                                    } // Se cerrará dropdown de manera automatica
                                });
                            }
                        });
                    };

                    Dropdown.prototype.showEvent = function (event, autoclose) {
                        var element = angular.element(event.currentTarget);

                        this.show(element, autoclose); 

                        if (autoclose) { event.stopPropagation(); }
                    };
                    
                    Dropdown.prototype.showXY = function (left, top, autoclose) {
                        var self = this, // Instancia del proveedor
                            nameEvent = "click.hidedropdown-" + softtion.getGUID();
                        
                        executeIfExists(dropdown, function () {
                            showXY(left, top); // Desplegando en la posición
                            
                            if (autoclose) {
                                var dropdownNow = dropdown; // Actual a cerrar
                                
                                $body.on(nameEvent, function ($event) {
                                    $event.stopPropagation(); // Cancelando propagación
                                    
                                    if (dropdown.find($event.target).length === 0) {
                                        self.set(dropdownNow).hide(); $body.off(nameEvent);
                                    } // Se cerrará dropdown de manera automatica
                                });
                            }
                        });
                    };

                    Dropdown.prototype.hide = function () {
                        if (this.isShow()) { 
                            dropdown.removeClass("show");
                        } // Esta abierto el dropdown
                    };
                    
                    var dropdownProvider = new Dropdown();

                    this.$get = ["$body", "$appBody", "$appContent", provider];
                    
                    function provider(body, appBody, appContent) { 
                        $body = body;
                        $appBody = appBody;
                        $appContent = appContent;
                        
                        return dropdownProvider; // Proveedor
                    }
                    
                    this.get = function () { return dropdownProvider; };
                    
                    function settingsElement(classElement) {
                        var settings = {
                                top: 0, left: 0,
                                moveLeft: false,
                                moveContent: false,
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
                    }
                    
                    function settingsDropdown() {
                        // Configuración estandar para posicionamiento
                        var settings = {
                            top: 0, left: 0, 
                            moveLeft: true,
                            moveScroll: true,
                            moveContent: false,
                            innerWidth: window.innerWidth, 
                            innerHeight: window.innerHeight
                        }; 
                        
                        if (softtion.isDefined(origin) && origin.exists()) {
                            if (origin.parents(".form-navigation").exists()) {
                                return settingsElement(".form-navigation");
                            } // Elemento está contenido en un FormNavigation
                            
                            if (origin.parents(".bottom-sheet").exists()) {
                                return settingsElement(".bottom-sheet");
                            } // Elemento está contenido en un BottomSheet
                            
                            if (origin.parents(".app-bar").exists()) {
                                dropdown.appendTo(origin.parents(".app-bar"));
                                settings.moveScroll = false;
                            } // Elemento está contenido en un AppBar
                            
                            if (origin.parents(".app-content").exists()) {
                                settings.moveContent = true;
                            } // Elemento está contenido en un AppContent
                        
                            return angular.extend(settings, origin.offset()); 
                        } // Se definío elemento que disparó despliegue del dropdown
                        
                        return settings; // Configuración por defecto
                    }
                    
                    function show() {
                        var settings = settingsDropdown(),
                            leftBody = parseInt($appBody.css("left"));
                        
                        var heightDropdown = dropdown.innerHeight(),
                            widthDropdown = dropdown.innerWidth(),
                            
                            heightOrigin = (origin) ? origin.innerHeight() : 0, 
                            widthOrigin = (origin) ? origin.innerWidth() : 0,
                            
                            posOriginY = settings.top, posOriginX = settings.left,
                            
                            // Atributos finales del Dropdown
                            left, top, originEffect, transformOrigin = 0; 
                            
                        dropdown.addClass("show"); // Activado dropdown
                            
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
                        if (belowOrigin) { 
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
                        
                        if (settings.moveContent) {
                            var leftContent = parseInt($appContent.css("left")),
                                topContent = parseInt($appContent.css("padding-top"));
                    
                            left = left - leftContent; //top = top - topContent; 
                        } // Desplazando elemento en AppContent
                        
                        if (settings.moveLeft) {
                            dropdown.removeClass("fixed"); 
                            left = left - leftBody; 
                            
                            if (settings.moveScroll) {
                                top = top + $appContent.scrollTop(); 
                            } // Desplazando con Scroll
                        } else {
                            dropdown.addClass("fixed");
                        }// Componente debe moverse con scroll de AppContent
                        
                        dropdown.css({ 
                            left: left, top: top,
                            "-moz-transform-origin": originEffect,
                            "-webkit-transform-origin": originEffect,
                            "transform-origin": originEffect
                         }); 
                    }
                    
                    function showXY(left, top) {
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
                        if (belowOrigin) { 
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
                            "transform-origin": originEffect
                         }); 
                         
                        dropdown.addClass("show"); // Activando dropdown
                    }
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
                                        softtion.html("div").addClass("backdrop").create()
                                    );

                                    form.append(backdrop); // Agregando Backdrop
                                } // Backdrop no se encuentra en el Componente
                                
                                backdrop.on("click", function () { self.hide(); });
                            } // Existe elemento FormNavigation en el documento
                        });
                        
                        return this; // Retornando interfaz fluida
                    };

                    FormNavigation.prototype.show = function () {
                        executeIfExists(form, function () {
                            if (!form.hasClass("show")) {
                                $body.addClass("body-overflow-none"); form.addClass("show"); 
                            } // FormNavigation no se encuentra activo
                        });
                    };

                    FormNavigation.prototype.hide = function () {
                        executeIfExists(form, function () {
                            if (form.hasClass("show")) {
                                $body.removeClass("body-overflow-none"); form.removeClass("show"); 
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

                    ProgressCircular.prototype.showRefresh = function () {
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
                        } // No se encuentra instanciado en el documento
                        
                        executeIfExists(circularRefresh, function () {
                            circularRefresh.addClass("show"); 
                        }); // Visualizando progress circular para refrescar
                    };

                    ProgressCircular.prototype.hideRefresh = function () {
                        executeIfExists(circularRefresh, function () {
                            circularRefresh.removeClass("show"); 
                        }); // Ocultando progress circular para refrescar
                    };

                    var progressCircularProvider = new ProgressCircular();
                    
                    this.$get = function () { return progressCircularProvider; };
                    
                    this.get = function () { return progressCircularProvider; };
                }
                
            },
            
            ProgressPane: {
                name: "$progressPane",
                method: function () {
                    var progressPane = undefined,
                        label = undefined,
                        $body = undefined;
                    
                    var ProgressPane = function () {};
                    
                    function createProgressPane() {
                        var label = softtion.html("label");
                        
                        var bar = softtion.html("div").
                            addClass(["progress-bar", "show", "indeterminate"]);
                    
                        var content = softtion.html("div").
                            addClass("content").
                            addChildren(label).addChildren(bar);
                    
                        return softtion.html("div").addClass("progress-pane").
                            addChildren(content).create();
                    }

                    ProgressPane.prototype.show = function (text) {
                        if (softtion.isUndefined(progressPane)) {
                            progressPane = angular.element(createProgressPane());
                            label = progressPane.find("label");
                            $body.append(progressPane); // Insertando
                        }
                        
                        executeIfExists(progressPane, function () {
                            label.html(text); // Agregando texto
                            
                            if (!progressPane.hasClass("show")) {
                                $body.addClass("body-overflow-none"); 
                                progressPane.addClass("show"); // No scroll
                            } // ProgressPane no se encuentra activo
                        });
                    };

                    ProgressPane.prototype.hide = function () {
                        executeIfExists(progressPane, function () {
                            if (progressPane.hasClass("show")) {
                                $body.removeClass("body-overflow-none"); 
                                progressPane.removeClass("show"); // Scroll
                            } // ProgressPane se encuentra activo
                        });
                    };
                    
                    var $progressPane = new ProgressPane();
                    
                    this.get = function () { return $progressPane; };

                    this.$get = ["$body", function ($bodyElement) { 
                        $body = $bodyElement; return $progressPane; 
                    }];
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
                                $body.addClass("body-overflow-none-sidenav"); 
                                sidenav.addClass("show"); // Visualizando
                            } // Sidenav no se encuentra activo
                        });
                    };

                    SideNav.prototype.hide = function () {
                        executeIfExists(sidenav, function () {
                            if (sidenav.hasClass("show")) {
                                $body.removeClass("body-overflow-none-sidenav");
                                sidenav.removeClass("show"); // Ocultando
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
                        snackbar = undefined, 
                        action = undefined,
                        time = 3500,
                        hiddenSnackbar = undefined,
                        $moveButton = Material.providers.Snackbar.moveButton;
                    
                    var SnackBar = function () { };
                    
                    var createSnackbar = function () {
                        body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );

                        action = angular.element(
                            softtion.html("div").addClass(["action"]).create()
                        );

                        snackbar = angular.element(
                            softtion.html("div").addClass(["snackbar"]).create()
                        );

                        snackbar.append(body); snackbar.append(action);

                        angular.element(".app-body").append(snackbar);  
                    };
                    
                    var instanceSnackbar = function () {
                        if (softtion.isUndefined(snackbar)) {
                            createSnackbar(); return;
                        } else if (!softtion.isInPage(snackbar[0])) {
                            createSnackbar(); return;
                        } // Snackbar no se encuentra en el documento
                    };

                    SnackBar.prototype.show = function (text, optionsAction) {
                        instanceSnackbar(); // Instanciando Snackbar
                        
                        var heightBody, self = this, selector = Softtion.Selectors.FAB,
                            bottomNavigation = angular.element(".bottom-navigation");
                            
                        action.height(0); // Ocultando acción

                        if (!snackbar.hasClass("show")) {
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
                                
                                action.css("height", snackbar.height());
                                
                                action.find("span").click(function () {
                                    if (softtion.isFunction(optionsAction.action)) {
                                        $scope.$apply(function () { 
                                            optionsAction.action(); 
                                        }); // Ejecutando evento Action del Snackbar

                                        if (softtion.isDefined(hiddenSnackbar)) {
                                            clearTimeout(hiddenSnackbar); hiddenSnackbar = undefined;
                                        } // Existe un cierre pendiente por realizar

                                        action.html(""); $moveButton(false, selector); 
                                        snackbar.removeClass("show"); 
                                    } // Ejecutando acción establecida en el Controlador
                                });
                            } else {
                                action.html(""); body.css("width", "100%");
                                body.css("padding-right", "0px");
                            } // No se ha definido acción para disparar en el componente
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                snackbar.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            snackbar.addClass("show"); $moveButton(true, selector, snackbar.height()); 

                            hiddenSnackbar = setTimeout(
                                function () {
                                    hiddenSnackbar = undefined; $moveButton(false, selector); 
                                    snackbar.removeClass("show"); 
                                },
                                time // Tiempo de espera para ocultarse
                            );
                        } else {
                            action.html(""); heightBody = parseInt(body.css("height"));
                            
                            if (softtion.isDefined(hiddenSnackbar)) {
                                clearTimeout(hiddenSnackbar); hiddenSnackbar = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            $moveButton(false, selector); snackbar.removeClass("show"); 
                            
                            setTimeout(
                                function () { self.show(text, optionsAction); }, 160
                            ); // Temporizador para visualizar
                        }
                    };
                    
                    SnackBar.prototype.setTime = function (timeDuration) {
                        time = timeDuration; return this; // Retornando interfaz fluida
                    };

                    var snackbarProvider = new SnackBar(); // Proveedor Snackbar
                    
                    this.get = function () { return snackbarProvider; };
                    
                    var fnProvider = function ($rootScope, $softtionMaterial) { 
                        Softtion = $softtionMaterial; $scope = $rootScope; return snackbarProvider; 
                    };
                    
                    this.$get = ["$rootScope", "$softtionMaterial", fnProvider];
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
                        toast = undefined,
                        time = 3500,
                        hiddenToast = undefined,
                        $moveButton = Material.providers.Toast.moveButton,
                        Softtion = undefined;
                    
                    var Toast = function () { };
                    
                    var createToast = function () {
                        toast = angular.element(
                            softtion.html("div").addClass(["toast"]).create()
                        );

                        body = angular.element(
                            softtion.html("p").addClass(["body"]).create()
                        );

                        toast.append(body); angular.element(".app-body").append(toast);
                    };
                    
                    var instanceToast = function () {
                        if (softtion.isUndefined(toast)) {
                            createToast(); return;
                        } else if (!softtion.isInPage(toast[0])) {
                            createToast(); return;
                        } // Toast no se encuentra en el documento
                    };

                    Toast.prototype.show = function (text) {
                        instanceToast(); // Instanciando Toast
                        
                        var heightBody, self = this, selector = Softtion.Selectors.FAB,
                            bottomNavigation = angular.element(".bottom-navigation");

                        if (!toast.hasClass("show")) {
                            body.html(text); heightBody = parseInt(body.height());
                            
                            if (bottomNavigation.exists() && !bottomNavigation.hasClass("hide")) {
                                toast.addClass("show-bottom-navigation");
                            } // Existe un bottom-navigation y esta visible en el documento
                            
                            toast.addClass("show"); $moveButton(true, selector, toast.innerHeight()); 

                            hiddenToast = setTimeout(
                                function () {
                                    hiddenToast = undefined; $moveButton(false, selector); 
                                    toast.removeClass("show"); // Ocultando Toast
                                },
                                time // Tiempo de espera para ocultarse
                            );
                        } else {
                            heightBody = parseInt(body.css("height"));
                            
                            if (softtion.isDefined(hiddenToast)) {
                                clearTimeout(hiddenToast); hiddenToast = undefined;
                            } // Existe un cierre pendiente por realizar
                            
                            $moveButton(false, selector); toast.removeClass("show"); 
                            
                            // Temporizador para visualizar
                            setTimeout(function () { self.show(text); }, 160); 
                        }
                    };
                    
                    Toast.prototype.setTime = function (timeDuration) {
                        time = timeDuration; return this; // Retornando interfaz fluida
                    };

                    var toastProvider = new Toast(); // Proveedor Toast
                    
                    this.get = function () { return toastProvider; };
                    
                    var providerToast = function ($softtionMaterial) { 
                        Softtion = $softtionMaterial; return toastProvider; 
                    };
                    
                    this.$get = ["$softtionMaterial", providerToast];
                }
            },
            
            MaterialTheme: {
                name: "$materialTheme",
                method: ["$materialColor", function ($materialColor) {
                        
                    function MaterialTheme() {};
                    
                    var $materialTheme = $materialColor.background; 
                    
                    MaterialTheme.prototype.setPrimary = function (themeName) {
                        var theme = $materialTheme[themeName],
                            border = $materialColor.border, 
                            ripple = $materialColor.ripple;
                            
                        if (softtion.isDefined(theme)) {
                            // Colores de fondo
                            propertyStyle("--theme-primary-background", theme["500"]);
                            propertyStyle("--theme-primary-background-light", theme["300"]);
                            propertyStyle("--theme-primary-background-dark", theme["800"]);
                            
                            // Colores de estado
                            propertyStyle("--theme-primary-background-focus", theme["700"]);
                            propertyStyle("--theme-primary-background-hover", theme["200"]);
                            propertyStyle("--theme-primary-background-disabled", theme["100"]);
                            
                            // Color de borde
                            propertyStyle("--theme-primary-background-border", border[theme.baseColor]);
                            
                            // Colores de fuente
                            var font = $materialColor.font[theme.baseColor];
                            
                            propertyStyle("--theme-primary-font", theme["500"]);
                            propertyStyle("--theme-primary-font-disabledcolor", theme["100"]);
                            
                            propertyStyle("--theme-primary-font-active", font.primary);
                            propertyStyle("--theme-primary-font-alternative", font.alternative);
                            propertyStyle("--theme-primary-font-inactive", font.secondary);
                            propertyStyle("--theme-primary-font-disabled", font.disabled);
                            
                            propertyStyle("--theme-primary-ripple", ripple[theme.baseColor]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    MaterialTheme.prototype.setError = function (themeName) {
                        var theme = $materialTheme[themeName];
                            
                        if (softtion.isDefined(theme)) {
                            propertyStyle("--theme-error-background", theme["500"]);
                            propertyStyle("--theme-error-font", theme["500"]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    MaterialTheme.prototype.setSecondary = function (themeName) {
                        var theme = $materialTheme[themeName],
                            border = $materialColor.border, 
                            ripple = $materialColor.ripple;
                            
                        if (softtion.isDefined(theme)) {
                            // Colores de fondo
                            propertyStyle("--theme-secondary-background", theme["500"]);
                            propertyStyle("--theme-secondary-background-light", theme["300"]);
                            propertyStyle("--theme-secondary-background-dark", theme["800"]);
                            
                            // Colores de estado
                            propertyStyle("--theme-secondary-background-focus", theme["700"]);
                            propertyStyle("--theme-secondary-background-hover", theme["200"]);
                            propertyStyle("--theme-secondary-background-disabled", theme["100"]);
                            
                            // Color de borde
                            propertyStyle("--theme-secondary-background-border", border[theme.baseColor]);
                            
                            // Colores de fuente
                            var font = $materialColor.font[theme.baseColor];
                            
                            propertyStyle("--theme-secondary-font", theme["500"]);
                            propertyStyle("--theme-secondary-font-disabledcolor", theme["100"]);
                            
                            propertyStyle("--theme-secondary-font-active", font.primary);
                            propertyStyle("--theme-secondary-font-alternative", font.alternative);
                            propertyStyle("--theme-secondary-font-inactive", font.secondary);
                            propertyStyle("--theme-secondary-font-disabled", font.disabled);
                            
                            propertyStyle("--theme-secondary-ripple", ripple[theme.baseColor]);
                        } // Tema de la paleta encontrado, cargando
                    };
                    
                    MaterialTheme.prototype.get = function () {
                        return $materialTheme;
                    };
                    
                    MaterialTheme.prototype.register = function (name, theme) {
                        var validate = softtion.required(theme, [
                            "50", "100", "200", "300", "400", "500", 
                            "600", "700", "800", "900", "baseColor"
                        ]);
                        
                        if (validate.success) {
                            $materialTheme[name] = theme; return this;
                        } // Definio correctamente el tema
                    };
                    
                    var materialTheme = new MaterialTheme();
                    
                    this.$get = function () { 
                        return materialTheme; 
                    };
                    
                    this.setPrimary = function (nameTheme) {
                        materialTheme.setPrimary(nameTheme); return this;
                    };
                    
                    this.setError = function (nameTheme) {
                        materialTheme.setError(nameTheme); return this;
                    };
                    
                    this.setSecondary = function (nameTheme) {
                        materialTheme.setSecondary(nameTheme); return this;
                    };
                    
                    this.register = function (name, theme) {
                        materialTheme.register(name, theme); return this;
                    };
                }]
            },
            
            WindowResize: {
                name: "$windowResize",
                method: function () {
                    
                    var WindowResize = function () { },
                            
                        // Atributos
                        $scope = undefined,
                        window = undefined,
                        listeners = {};
                        
                    var $windowResize = new WindowResize();
                    
                    WindowResize.prototype.addListener = function (key, listener) {
                        if (softtion.isFunction(listener)) {
                            listeners[key] = listener;
                        } // Se agrego una nueva función en la Lista
                    };
                    
                    WindowResize.prototype.removeListener = function (key) {
                        softtion.removeKey(listeners, key);
                    };
                    
                    this.get = function () { return $windowResize; };
                    
                    var fnProvider = function ($rootScope, $window) { 
                        $scope = $rootScope;  // Asignando $scope
                        window = angular.element($window);
                        
                        window.resize(function (event) {
                            $scope.$apply(function () {
                                angular.forEach(listeners, function (fn) {
                                    fn(window, event, $window);
                                });
                            });
                        });
                        
                        return $windowResize; // Retornando clase
                    };
                    
                    this.$get = ["$rootScope", "$window", fnProvider];
                }
            }
        }
    };

    ngMaterial.constant("$materialColor", {
        background: {
            red: {
                50:  "#ffebee", 100: "#ffcdd2", 200: "#ef9a9a", 300: "#e57373", 
                400: "#ef5350", 500: "#f44336", 600: "#e53935", 700: "#d32f2f", 
                800: "#c62828", 900: "#b71c1c", baseColor: "light", 
                A100: "#ff8a80", A200: "#ff5252", A400: "#ff1744", A700: "#d50000"
            },
            pink: {
                50:  "#fce4ec", 100: "#f8bbd0", 200: "#f48fb1", 300: "#f06292", 
                400: "#ec407a", 500: "#e91e63", 600: "#d81b60", 700: "#c2185b", 
                800: "#ad1457", 900: "#880e4f", baseColor: "light", 
                A100: "#ff80ab", A200: "#ff4081", A400: "#f50057", A700: "#c51162"
            },
            purple: {
                50:  "#f3e5f5", 100: "#e1bee7", 200: "#ce93d8", 300: "#ba68c8", 
                400: "#ab47bc", 500: "#9c27b0", 600: "#8e24aa", 700: "#7b1fa2", 
                800: "#6a1b9a", 900: "#4a148c", baseColor: "light", 
                A100: "#ea80fc", A200: "#e040fb", A400: "#d500f9", A700: "#aa00ff"
            },
            deepPurple: {
                50:  "#ede7f6", 100: "#d1c4e9", 200: "#b39ddb", 300: "#9575cd", 
                400: "#7e57c2", 500: "#673ab7", 600: "#5e35b1", 700: "#512da8", 
                800: "#4527a0", 900: "#311b92", baseColor: "light", 
                A100: "#b388ff", A200: "#7c4dff", A400: "#651fff", A700: "#6200ae"
            },
            indigo: {
                50:  "#e8eaf6", 100: "#c5cae9", 200: "#9fa8da", 300: "#7986cb", 
                400: "#5c6bc0", 500: "#3f51b5", 600: "#3949ab", 700: "#303f9f", 
                800: "#283593", 900: "#1a237e", baseColor: "light", 
                A100: "#8c9eff", A200: "#536dfe", A400: "#3d5afe", A700: "#304ffe"
            },
            blue: {
                50:  "#e3f2fd", 100: "#bbdefb", 200: "#90caf9", 300: "#64b5f6", 
                400: "#42a5f5", 500: "#2196f3", 600: "#1e88e5", 700: "#1976d2", 
                800: "#1565c0", 900: "#0d47a1", baseColor: "light", 
                A100: "#82b1ff", A200: "#448aff", A400: "#2979ff", A700: "#2962ff"
            },
            lightBlue: {
                50:  "#e1f5fe", 100: "#b3e5fc", 200: "#81d4fa", 300: "#4fc3f7", 
                400: "#29b6f6", 500: "#03a9f4", 600: "#039be5", 700: "#0288d1", 
                800: "#0277bd", 900: "#01579b", baseColor: "combined", 
                A100: "#80d8ff", A200: "#40c4ff", A400: "#00b0ff", A700: "#0091ea"
            },
            cyan: {
                50:  "#e0f7fa", 100: "#b2ebf2", 200: "#80deea", 300: "#4dd0e1", 
                400: "#26c6da", 500: "#00bcd4", 600: "#00acc1", 700: "#0097a7", 
                800: "#00838f", 900: "#006064", baseColor: "combined", 
                A100: "#84ffff", A200: "#18ffff", A400: "#00e5ff", A700: "#00b8d4"
            },
            teal: {
                50:  "#e0f2f1", 100: "#b2dfdb", 200: "#80cbc4", 300: "#4db6ac", 
                400: "#26a69a", 500: "#009688", 600: "#00897b", 700: "#00796b", 
                800: "#00695c", 900: "#004d40", baseColor: "light", 
                A100: "#a7ffeb ", A200: "#64ffda", A400: "#1de9b6", A700: "#00bfa5"
            },
            green: {
                50:  "#e8f5e9", 100: "#c8e6c9", 200: "#a5d6a7", 300: "#81c784", 
                400: "#66bb6a", 500: "#4caf50", 600: "#43a047", 700: "#388e3c", 
                800: "#2e7d32", 900: "#1b5e20", baseColor: "light", 
                A100: "#b9f6ca", A200: "#69f0ae", A400: "#00e676", A700: "#00c853"
            },
            lightGreen: {
                50:  "#f1f8e9", 100: "#dcedc8", 200: "#c5e1a5", 300: "#aed581", 
                400: "#9ccc65", 500: "#8bc34a", 600: "#7cb342", 700: "#689f38", 
                800: "#558b2f", 900: "#33691e", baseColor: "combined", 
                A100: "#ccff90", A200: "#b2ff59", A400: "#76ff03", A700: "#64dd17"
            },
            lime: {
                50:  "#f9fbe7", 100: "#f0f4c3", 200: "#e6ee9c", 300: "#dce775", 
                400: "#d4e157", 500: "#cddc39", 600: "#c0ca33", 700: "#afb42b", 
                800: "#9e9d24", 900: "#827717", baseColor: "combined", 
                A100: "#f4ff81", A200: "#eeff41", A400: "#c6ff00", A700: "#aeea00"
            },
            yellow: {
                50:  "#fffde7", 100: "#fff9c4", 200: "#fff59d", 300: "#fff176", 
                400: "#ffee58", 500: "#ffeb3b", 600: "#fdd835", 700: "#fbc02d", 
                800: "#f9a825", 900: "#f57f17", baseColor: "dark", 
                A100: "#ffff8d", A200: "#ffff00", A400: "#ffea00", A700: "#ffd600"
            },
            amber: {
                50:  "#fff8e1", 100: "#ffecb3", 200: "#ffe082", 300: "#ffd54f", 
                400: "#ffca28", 500: "#ffc107", 600: "#ffb300", 700: "#ffa000", 
                800: "#ff8f00", 900: "#ff6f00", baseColor: "dark", 
                A100: "#ffe57f", A200: "#ffd740", A400: "#ffc400", A700: "#ffab00"
            },
            orange: {
                50:  "#fff3e0", 100: "#ffe0b2", 200: "#ffcc80", 300: "#ffb74d", 
                400: "#ffa726", 500: "#ff9800", 600: "#fb8c00", 700: "#f57c00", 
                800: "#ef6c00", 900: "#e65100", baseColor: "combined", 
                A100: "#ffd180", A200: "#ffab40", A400: "#ffab40", A700: "#ff6d00"
            },
            deepOrange: {
                50:  "#fbe9e7", 100: "#ffccbc", 200: "#ffab91", 300: "#ff8a65", 
                400: "#ff7043", 500: "#ff5722", 600: "#f4511e", 700: "#e64a19", 
                800: "#d84315", 900: "#bf360c", baseColor: "light", 
                A100: "#ff9e80", A200: "#ff6e40", A400: "#ff3d00", A700: "#dd2c00"
            },
            brown: {
                50:  "#efebe9", 100: "#d7ccc8", 200: "#bcaaa4", 300: "#a1887f", 
                400: "#8d6e63", 500: "#795548", 600: "#6d4c41", 700: "#5d4037", 
                800: "#4e342e", 900: "#3e2723", baseColor: "light"
            },
            grey: {
                50:  "#fafafa", 100: "#f5f5f5", 200: "#eeeeee", 300: "#e0e0e0", 
                400: "#bdbdbd", 500: "#9e9e9e", 600: "#757575", 700: "#616161", 
                800: "#424242", 900: "#212121", baseColor: "combined"
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
            combined: {
                primary: "rgba(0, 0, 0, 0.87)",
                alternative: "rgba(255, 255, 255, 1)",
                secondary: "rgba(0, 0, 0, 0.54)",
                disabled: "rgba(0, 0, 0, 0.38)"
            }
        },
        border: {
            dark: "rgba(0, 0, 0, 0.12)",
            light: "rgba(255, 255, 255, 0.12)",
            combined: "rgba(0, 0, 0, 0.12)"
        },
        ripple: {
            dark: "rgba(0, 0, 0, 0.38)",
            light: "rgba(255, 255, 255, 0.5)",
            combined: "rgba(0, 0, 0, 0.38)"
        }
    });
    
    ngMaterial.constant("$softtionMaterial", {
        VERSION: "1.0.4",
        Selectors: {
            FAB: "button.floating:not(.static), .fab-speed-dial," 
                + " .fab-menu > .box, .fab-menu-rainbow,"
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
    
    ngMaterial.service("$fnMaterial", function () {
        return {
            setDensity: function (image, width, height) {
                var density = height / width; // Calculando

                (density > 1) ?
                    image.addClass("density-height") :
                    image.addClass("density-width");

                image.addClass("active"); // Activando imagen
            }
        };
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
    
    // Directivas de SofttionMaterial
    angular.forEach(Material.components, function (component) {
        ngMaterial.directive(component.name, component.directive);
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