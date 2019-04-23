
/*
 Softtion v1.8.1
 (c) 2015 - 2019 Softtion Developers
 https://www.softtion.com.co
 License: MIT
 Create: 24/May/2015
 Update: 22/Abr/2019
 */

if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports)
    module.exports = "Class";

// Estructura de Class

(function () {
    !function (fnGlb) {        
        var glb = (typeof window !== "undefined") ? window : 
            (typeof global !== "undefined") ? 
                global : typeof self !== "undefined" ? self : undefined;
                
        if (glb) glb.Class = fnGlb(); // Se definió
    }(function () {
        var define, module, exports;
        
        return (function e(t, n, r) {
            var req = typeof require === "function" && require;
            
            function s(o, u) {
                if (!n[o]) {
                    if (!t[o]) {
                        if (!u && req)
                            return req(o, !0);
                        
                        if (req)
                            return req(o, !0);
                        
                        var f = new Error("Cannot find module '" + o + "'");
                        throw f.code = "MODULE_NOT_FOUND", f;
                    }
                    
                    var l = n[o] = { exports: {} };
                    
                    t[o][0].call(l.exports, function (e) {
                        var n = t[o][1][e]; return s(n ? n : e);
                    }, l, l.exports, e, t, n, r);
                }
                
                return n[o].exports;
            }
            
            for (var o = 0; o < r.length; o++) { s(r[o]); } return s;
        })({
            1: [ // Módulo Class
                function (_dereq_, module, exports) {
                    module.exports = {
                        CallCheck: _dereq_("./class-constructor/call-check.js"),
                        ConstructorReturn: _dereq_("./class-constructor/constructor-return.js"),
                        Inherits: _dereq_("./class-constructor/inherits.js"),
                        Create: _dereq_("./class-constructor/create.js")
                    };
                }, {
                    "./class-constructor/call-check.js": 2,
                    "./class-constructor/constructor-return.js": 3,
                    "./class-constructor/inherits.js": 4,
                    "./class-constructor/create.js": 5
                }
            ],
            2: [ // CallCheck
                function (_dereq_, module, exports) {
                    
                    module.exports = CallCheck;
                    
                    function CallCheck(instance, Constructor) { 
                        if (!(instance instanceof Constructor)) {
                            throw new TypeError("Cannot call a class as a function"); 
                        } // Error al crear clase desde función
                    }
                }, {}
            ],
            3: [ // ConstructorReturn
                function (_dereq_, module, exports) {
                    
                    module.exports = ConstructorReturn;
                    
                    function ConstructorReturn(self, call) {
                        if (!self) {
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        } // 
                        
                        return call && (typeof call === "object" || typeof call === "function") ? call : self;
                    }
                }, {}
            ],
            4: [ // Inherits
                function (_dereq_, module, exports) {
                    
                    module.exports = Inherits;
                    
                    function Inherits(subClass, superClass) {
                        if (typeof superClass !== "function" && superClass !== null) {
                            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                        }
                        
                        subClass.prototype = Object.create(
                            superClass && superClass.prototype, {
                                constructor: {
                                    value: subClass, 
                                    enumerable: false, 
                                    writable: true, 
                                    configurable: true
                                }
                            });
                            
                        if (superClass) Object.setPrototypeOf ? 
                                Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
                    }
                }, {}
            ],
            5: [ // Create
                function (_dereq_, module, exports) {
                    
                    var Create = function () {
                        function defineProps(target, props) { 
                            for (var i = 0; i < props.length; i++) { 
                                var descriptor = props[i]; 
                                descriptor.enumerable = descriptor.enumerable || false; 
                                descriptor.configurable = true;

                                if ("value" in descriptor) 
                                    descriptor.writable = true; 

                                Object.defineProperty(target, descriptor.key, descriptor); 
                            } 
                        } 

                        return function (Constructor, props, statics) { 
                            if (props) 
                                defineProps(Constructor.prototype, props); 
                            
                            if (statics) 
                                defineProps(Constructor, statics);
                            
                            return Constructor; // Retornando constructor generado
                        }; 
                    }();
                    
                    module.exports = Create;
                }, {}
            ]
        }, {}, [1])(1);
    });
})();

// Class Softtion

(function () {
    !function (fnGlb) {        
        var glb = (typeof window !== "undefined") ? window : 
            (typeof global !== "undefined") ? 
                global : typeof self !== "undefined" ? self : undefined;
                
        if (glb) glb.Softtion = fnGlb(); // Se definió
    }(function () {
        
        function Softtion() {
            Class.CallCheck(this, Softtion);
        }

        var functions = [
            { key: "isDefined", value: isDefined },
            { key: "isUndefined", value: isUndefined },
            { key: "isArray", value: isArray },
            { key: "isArrayEmpty", value: isArrayEmpty },
            { key: "isArrayNotEmpty", value: isArrayNotEmpty },
            { key: "isFunction", value: isFunction },
            { key: "isDate", value: isDate },
            { key: "isString", value: isString },
            { key: "isText", value: isText },
            { key: "isNumber", value: isNumber },
            { key: "isjQuery", value: isjQuery },
            { key: "isJson", value: isJson },
            { key: "isJsonEmpty", value: isJsonEmpty },
            { key: "parseBoolean", value: parseBoolean },
            { key: "findKey", value: findKey },
            { key: "removeKey", value: removeKey },
            { key: "required", value: required },
            { key: "forEach", value: forEach },
            { key: "leadingChar", value: leadingChar },
            { key: "isBetween", value: isBetween },
            { key: "leadingCharAfter", value: leadingCharAfter },
            { key: "leadingCharBefore", value: leadingCharBefore },
            { key: "redirect", value: redirect },
            { key: "location", value: location },
            { key: "startPage", value: startPage },
            { key: "createDateOfPHP", value: createDateOfPHP },
            { key: "createDateOfTime", value: createDateOfTime },
            { key: "isLeapYear", value: isLeapYear },
            { key: "clone", value: clone },
            { key: "cloneArray", value: cloneArray },
            { key: "isInPage", value: isInPage },
            { key: "isTouchSupport", value: isTouchSupport },
            { key: "getGUID", value: getGUID },
            { key: "generateUrl", value: generateUrl },
            { key: "copyToClipboard", value: copyToClipboard },
            { key: "encode", value: encode },
            { key: "decode", value: decode },
            { key: "isSupportedStorage", value: isSupportedStorage },
            { key: "addStorage", value: addStorage },
            { key: "getStorage", value: getStorage },
            { key: "getValueString", value: getValueString },
            { key: "getSuccessString", value: getSuccessString },
            { key: "getMonetaryExpression", value: getMonetaryExpression },
            { key: "getThreeDigits", value: getThreeDigits },
            { key: "getNumberDescription", value: getNumberDescription },
            { key: "simpleThreeRule", value: simpleThreeRule },
            { key: "deviceIs", value: deviceIs },
            { key: "getTimeFormatElapsed", value: getTimeFormatElapsed },
            { key: "getMIME", value: getMIME },
            { key: "openFrame", value: openFrame },
            { key: "newTabPage", value: newTabPage },
            { key: "nl2br", value: nl2br },
            { key: "getHexToRgb", value: getHexToRgb },
            { key: "convertToHex", value: convertToHex },
            { key: "getRgbToHex", value: getRgbToHex }
        ];
        
        var statics = [
            { key: "MANAGER_DATETIME", get: MANAGER_DATETIME },
            { key: "CODES_KEYBOARD", get: CODES_KEYBOARD },
            { key: "TEXTCONTROL", get: TEXTCONTROL },
            { key: "CLASSES", get: CLASSES },
            { key: "LISTENERS", get: LISTENERS },
            { key: "BreakException", get: BreakException },
            { key: "DIGITS", get: DIGITS },
            { key: "QUANTITIES", get: QUANTITIES },
            { key: "userAgent", get: userAgent },
            { key: "TIME_ELAPSED_CONFIG", get: TIME_ELAPSED_CONFIG },
            { key: "REG_CHARACTERS", get: REG_CHARACTERS },
            { key: "REG_EXPRESSION", get: REG_EXPRESSION }
        ];

        Class.Create(Softtion, functions, statics);

        function isDefined(object, force) {
            return (!force) ?
                ((typeof object !== "undefined") && (object !== null)) :
                (this.isDefined(object) && object !== "undefined");
        }

        function isUndefined(object, force) {
            return !this.isDefined(object, force);
        }

        function isArray(array, force) {
            return (this.isDefined(array, force)) ? (array instanceof Array) : false;
        }

        function isArrayEmpty(array, force) {
            return (this.isArray(array, force)) ? array.isEmpty() : false;
        }

        function isArrayNotEmpty(array, force) {
            return (this.isArray(array, force)) ? !array.isEmpty() : false;
        }

        function isFunction(func, force) {
            return (this.isDefined(func, force)) ? (typeof func === "function") : false;
        }

        function isDate(date, force) {
            return (this.isDefined(date, force)) ? (date instanceof Date) : false;
        }

        function isString(string, force) {
            return (this.isDefined(string, force)) ? (typeof string === "string") : false;
        }

        function isText(string, force) {
            return (this.isString(string, force)) ? (string.length > 0) : false;
        }

        function isNumber(number, force) {
            return (this.isDefined(number, force)) ? !isNaN(number) : false;
        }

        function isjQuery(object, force) {
            return (this.isDefined(object, force)) ? (object instanceof jQuery) : false;
        }

        function isJson(object, force) {
            return (this.isDefined(object, force)) ? (Object.keys(object) > 0) : false;
        }

        function isJsonEmpty(object, force) {
            return (this.isUndefined(object, force)) ? true : (Object.keys(object) === 0);
        }

        function parseBoolean(value) {
            if (this.isDefined(value)) {
                switch (value) {
                    case ("true"): return true;
                    case ("false"): return false;
                    case ("undefined"): return false;
                    case (1): return true;
                    case (0): return false;
                    case ("1"): return true;
                    case ("0"): return false;
                    default: return true; 
                }
            } else { 
                return false; 
            } // El objeto no esta definido en la función
        }

        function findKey(object, pattern) {
            var self = this; // Instancia de Softtion

            if (self.isUndefined(object) || !self.isText(pattern))
                return undefined; // Atributos indefindos para busqueda

            var keys = pattern.split("."); // Lista de claves

            if (!keys.has(1)) {  
                var value = undefined, result = object;

                self.forEach(keys, function (key) { 
                    value = result[key];

                    if (self.isDefined(value)) {
                        result = value; 
                    } else {
                        value = undefined; return true; 
                    } // Objeto no fue encontrado
                });

                return value; // Retornando objeto encontrado
            } else {
                return object[keys.first()];
            } // Solo existe una clave en la lista resultante
        }

        function removeKey(object, key) {
            if (this.isUndefined(object) || this.isUndefined(key)) return;

            delete object[key]; // Eliminando parametro del objeto
        }

        function required(object, keys) {
            var keyError = undefined, self = this; // Instancia de Softtion

            if (!self.isArray(keys)) {
                var value = self.findKey(object, keys); // Verificando

                return self.isDefined(value) ? 
                    { success: true } : { success: false, key: keys };
            } // Solo se desea validar una clave

            var result = self.forEach(keys, function (key) {
                keyError = key; return (!self.isDefined(self.findKey(object, key)));
            });

            return (result) ? { success: true } : { success: false, key: keyError };
        }

        function forEach(array, fn) {
            if (!this.isArray(array)) return false; // No es array

            try {
                array.forEach(function (value, index) {
                    var stop = fn(value, index); // Verificando

                    if (stop === true) throw Softtion.BreakException;
                });

                return true; // Array recorrido correctamente
            } catch (ex) {
                return false; // Array no recorrido correctamente
            } 
        }

        function leadingChar(type, word, character, size) {
            type = type || "before"; // Tipo de completación

            var $word = String(word), index = $word.length; 

            for (index; index < size; index++) { 
                switch (type) {
                    case ("before"): $word = character + $word; break;
                    case ("after"):  $word = $word + character; break;
                }
            } // Cargando caracteres faltante en la palabra

            return $word; // Retornando la palabra resultante
        }

        function leadingCharAfter(word, character, size) {
            return this.leadingChar("after", word, character, size);
        }

        function leadingCharBefore(word, character, size) {
            return this.leadingChar("before", word, character, size);
        }

        function redirect(url, milliseconds) { 
            setTimeout(function () { location.href = url; }, milliseconds || 0);
        }

        function location(location) {
            window.location = location;
        }

        function startPage(speed) {
            jQuery("html, body").animate({ scrollTop: 0 }, speed || 0);
        }

        function createDateOfPHP(timestamp) { 
            return (softtion.isNumber(timestamp)) ? new Date(timestamp * 1000) : undefined; 
        }

        function createDateOfTime(time) { 
            return (softtion.isText(time)) ? new Date("January 01, 1970 " + time) : undefined; 
        }

        function isLeapYear(year) {
            return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
        }

        function clone(object) {
            return jQuery.extend(true, {}, object);
        }

        function cloneArray(array) {
            return jQuery.extend(true, [], array);
        }

        function isInPage(node) {
            return (node === document.body) ? false : document.body.contains(node);
        }

        function isTouchSupport() {
            return ("ontouchstart" in window);
        }

        function isBetween(value, minValue, maxValue) {
            return (value < minValue) ? false : !(value > maxValue);
        }

        function getGUID() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            };

            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4();
        }

        function generateUrl(baseURL, suffixes) {
            var URL = baseURL; // Iniciando URL

            if (this.isArrayNotEmpty(suffixes)) {
                suffixes.forEach(function (suffix) { URL += "/" + suffix; });
            } else if (this.isText(suffixes)) {
                URL += "/" + suffixes;
            } // Se establecio un solo prefijo para URL

            return URL; // Retornando url generada para recurso
        }

        function copyToClipboard(text) {
            if (this.isUndefined(this.inputClipBoard)) {
                this.inputClipBoard = document.createElement("input");

                this.inputClipBoard.className = "input-clipboard";
                document.body.appendChild(this.inputClipBoard); // Insertando
            } // Instanciando elemento que contiene texto copiado

            this.inputClipBoard.setAttribute("value", text);

            // Selecciona el contenido del campo
            this.inputClipBoard.select(); document.execCommand("copy");
        }

        function encode(value, keyPassword) {
            return (typeof window.CryptoJS === "undefined") ? value :
                window.CryptoJS.AES.encrypt(value, keyPassword).toString();
        }

        function decode(value, keyPassword) {
            return (typeof window.CryptoJS === "undefined") ? value :
                window.CryptoJS.AES.decrypt(value, keyPassword).
                    toString(window.CryptoJS.enc.Utf8);
        }

        function isSupportedStorage() {
            return this.isDefined(window.localStorage);
        }

        function addStorage(key, value) {
            if (!this.isSupportedStorage()) {
                return false;
            } else {
                window.localStorage[key] = value; return true;
            } // Datos almacenados correctamente
        }

        function getStorage(key) {
            return (!this.isSupportedStorage()) ? undefined : window.localStorage[key];
        }

        function getValueString(format, value) {
            if (softtion.isUndefined(value)) return; // Valor indefinido

            switch (format) {
                case (Softtion.TEXTCONTROL.ALPHABETIC): 
                    return String(value).replace(Softtion.REG_CHARACTERS.ALPHABETIC, "");

                case (Softtion.TEXTCONTROL.NUMBER):  
                    return String(value).replace(Softtion.REG_CHARACTERS.NUMBER, "");

                case (Softtion.TEXTCONTROL.INTEGER):  
                    return (isNaN(value)) ? "" : String(value).replace(Softtion.REG_CHARACTERS.NUMBER, "");

                case (Softtion.TEXTCONTROL.ALPHANUMBER): 
                    return String(value).replace(Softtion.REG_CHARACTERS.ALPHANUMBER, "");

                case (Softtion.TEXTCONTROL.ALPHASPACE): 
                    return String(value).replace(Softtion.REG_CHARACTERS.ALPHASPACE, "");

                case (Softtion.TEXTCONTROL.ALPHANUMBERSPACE): 
                    return String(value).replace(Softtion.REG_CHARACTERS.ALPHANUMBERSPACE, "");

                case (Softtion.TEXTCONTROL.DECIMAL): 
                    return (isNaN(value)) ? "" : String(value).replace(Softtion.REG_CHARACTERS.DECIMAL, "");

                case (Softtion.TEXTCONTROL.EMAIL): 
                    return String(value).replace(Softtion.REG_CHARACTERS.EMAIL, "");

                case (Softtion.TEXTCONTROL.PASSWORD): 
                    return String(value).replace(Softtion.REG_CHARACTERS.PASSWORD, "");

                case (Softtion.TEXTCONTROL.MONEY):  
                    return (isNaN(value)) ? "" : String(value).replace(Softtion.REG_CHARACTERS.DECIMAL, "");

                case (Softtion.TEXTCONTROL.MATH):  
                    return (isNaN(value)) ? "" : String(value).replace(Softtion.REG_CHARACTERS.DECIMAL, "");

                default: return value; // No se aplica control de carácteres
            }
        }

        function getSuccessString(format, value) {
            switch (format) {
                case (Softtion.TEXTCONTROL.DECIMAL): 
                    return Softtion.REG_EXPRESSION.DECIMAL.test(value);

                case (Softtion.TEXTCONTROL.EMAIL): 
                    return Softtion.REG_EXPRESSION.EMAIL.test(value);

                default: return true; // No se debe aplicar control de texto
            }
        }

        function getMonetaryExpression(number, decimalsCount) {
            if (this.isUndefined(number)) return ""; // Indefinido

            var result = "", contador = 0, 
                fraction = Math.abs(number).toString().split("."),
                $number = fraction[0],
                length = $number.length, decimals;
        
            decimalsCount = decimalsCount || 2;

            if (fraction.has(2)) decimals = fraction[1];

            for (var index = 1; index <= length; index++) {
                if (contador === 3) { 
                    result = "." + result; contador = 0;
                } // Agregando punto en la cifra

                result = $number.charAt(length - index) + result; 

                contador++; // Aumentando index de recorrido
            } // Recorriendo el número expresarlo monetariamente

            if (number < 0) result = "-" + result; // Numero negativo

            return (this.isUndefined(decimals)) ? // Retornando expresión
                result : result + "," + decimals.substring(0, decimalsCount); 
        }

        function getThreeDigits(number) {
            var $number = String(number); // Corvirtiendo a String

            if (($number.length > 3) || ($number.length < 1)) 
                return undefined; // Excepción encontrada en el número

            $number = this.leadingCharBefore($number, "0", 3); 

            var expression = "", // Número descrito
                unityTen = parseInt($number.substring(1, 3)), 
                hundred = parseInt($number.substring(0, 1));

            if (hundred !== 0) {
                expression += Softtion.DIGITS[hundred * 100];

                expression += (hundred === 1 && unityTen !== 0) ? "TO " :  " "; 
            } // Describiendo la centena del número

            if (unityTen !== 0) {
                if (Softtion.DIGITS[unityTen]) {
                    expression += Softtion.DIGITS[unityTen];
                } else {
                    var ten = parseInt($number.substring(1, 2)) * 10,
                        unity = parseInt($number.substring(2, 3));

                    expression += Softtion.DIGITS[ten];
                    expression += " Y " + Softtion.DIGITS[unity];
                } // Desglozando número en decenas y unidades
            }

            return expression.trim(); // Retornando descripción del número
        }

        function getNumberDescription(number) {
            if (this.isUndefined(number)) return undefined; // Excepción

            number = isNaN(number) ? parseInt(number) : number;

            if (number === 0) return "CERO"; // Numero es "0"

            var $number = String(number), expression = "", 
                index = 0, endPosition = $number.length; 

            while (endPosition > 0) {
                var startPosicion = endPosition - 3; // Posición inicial

                if (startPosicion < 0) startPosicion = 0; // No desbordamiento

                var digits = $number.substring(startPosicion, endPosition),
                    description = this.getThreeDigits(digits);

                if (this.isText(description)) {
                    if (index > 0) {
                        if (parseInt(digits) > 1) {
                            description += " " + Softtion.QUANTITIES[index * 10];
                        } else {
                            if (index%2 !== 0) { 
                                description = Softtion.QUANTITIES[index]; 
                            } else { 
                                description += " " + Softtion.QUANTITIES[index]; 
                            } // Se requiere descriptor de cantidad y cifra
                        } // La cifra a describir es singular
                    } // La cifra pertenece a unidades de mil ó superiores

                    expression = description + " " + expression;
                } else if ((index > 1) && (index%2 === 0)) {
                    expression = QUANTITIES[index * 10] + " " +  expression;
                } // Se requiere descrición plural de la sección del número

                index++; endPosition = startPosicion; // Reconfigurando variables
            }

            return expression.trim(); // Retornando descripción del número
        } 

        function simpleThreeRule(key1, key2, value1) {
            return (key2 * value1) / key1; 
        }

        function deviceIs() {
            return {
                get: function () { return Softtion.userAgent; }, // DISPOSITIVO

                // SISTEMAS OPERATIVOS
                window: function () {
                    return softtion.isDefined(this.get().match(/Window/i));
                },
                android: function () {
                    return !this.window() && softtion.isDefined(this.get().match(/Android/i));
                },
                iOS: function () {
                    return this.iPhone() || this.iPad() || this.iPod();
                },

                // DISPOSITIVOS WINDOWS
                windowPhone: function () {
                    return softtion.isDefined(this.get().match(/IEMobile/i));
                },
                windowTablet: function () {
                    return this.window() && (!this.windowPhone() &&
                        softtion.isDefined(this.get().match(/touch/i)));
                },

                // DISPOSITIVOS ANDROID
                androidPhone : function () {
                    return this.android() && softtion.isDefined(this.get().match(/mobile/i));
                },
                androidTablet : function () {
                    return this.android() && !softtion.isDefined(this.get().match(/mobile/i));
                },

                // DISPOSITIVOS IOS
                iPhone: function () {
                    return softtion.isDefined(this.get().match(/iPhone/i));
                },
                iPad: function () {
                    return softtion.isDefined(this.get().match(/iPad/i));
                },
                iPod: function () {
                    return softtion.isDefined(this.get().match(/iPod/i));
                },

                // DISPOSITIVOS
                tablet: function () {
                    return this.androidTablet() || this.iPad() || this.windowTablet();
                },
                mobile: function () {
                    return this.androidPhone() || this.iPhone() || this.iPod() || this.windowPhone();
                },
                pc: function () {
                    return !this.tablet() && !this.mobile();
                }
            };
        }

        function getTimeFormatElapsed(milliseconds, min, prefixIgnore) {
            var label, // Etiqueta del texto de tiempo
                prefix = (milliseconds > 0) ? 
                    { singular: "Falta", plural: "Faltan" } : 
                    { singular: "Hace", plural: "Hace" };

            milliseconds = milliseconds || 0;
            var result = Math.abs(milliseconds); // Redefiniendo

            this.forEach(Softtion.TIME_ELAPSED_CONFIG, function (item) {
                var value = Math.roundDecimal(result / item.divisor);

                if (value >= item.comparator) { result = value; return false; }

                var suffix, isWeek = (value % 7 === 0);

                if (item.key === "days" && isWeek) {
                    value = value / 7; // Sacando la semana transcurrida

                    suffix = (min) ? // Sufijo
                        { singular: "sem", plural: "sems" } : 
                        { singular: "semana", plural: "semanas" }; 
                } else {
                    suffix = (min) ? item.min : item.normal; // Sufijo
                } // El tiempo no se ha definido en dias

                var keyItem = 
                        (value === 1) ? suffix.singular : suffix.plural,
                    $prefix = 
                        (value === 1) ? prefix.singular : prefix.plural;

                label = value + " " + keyItem; // Iniciando etiqueta

                if (!prefixIgnore) label = $prefix + " " +  label;

                return true; // Finalizando calculo de tiempo transcurrido
            });

            return label; // Retornando tiempo transcurrido en el formato
        }

        function getMIME(extension) {
            switch (extension) {
                case ("jpg") : return "image/jpg";
                case ("jpeg") : return "image/jpeg";
                case ("png") : return "image/png";
                case ("gif") : return "image/gif";
                case ("svg") : return "image/svg+xml";
                case ("pdf") : return "application/pdf";
                case ("txt") : return "text/plain";
                default: ""; // Extensión desconocida
            }
        }

        function openFrame(URL, isPrint) {
            var frame = document.createElement("iframe");
            frame.src = URL; frame.onload = onload;

            frame.style.visibility = "hidden";
            frame.style.right = "0";
            frame.style.bottom = "0";
            frame.style.position = "fixed";

            document.body.appendChild(frame); // Desplegando Frame

            function onclose() {
                document.body.removeChild(this.__container__);
            }

            function onload() {
                this.contentWindow.__container__ = this;
                this.contentWindow.focus(); // Required for IE
                this.contentWindow.onafterprint = onclose;
                this.contentWindow.onbeforeunload = onclose;

                if (isPrint) this.contentWindow.print();
            }
        }

        function newTabPage(url) {
            window.open(url, "_blank"); // Abriendo página nueva
        }

        function nl2br(str, is_xhtml) {
            if (this.isText(str)) {
                var breakTag = (this.parseBoolean(is_xhtml)) ? "<br />" : "<br>",
                    regex = /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g;

                return (str).replace(regex, "$1" + breakTag + "$2");
            } // Hay un texto establecido para realizar el cambio de etiqueta
        }

        function getHexToRgb(hexadecimal) {
            var result = Softtion.REG_EXPRESSION.HEX_TO_RGB.exec(hexadecimal);

            return !result ? null : {
                r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
            };
        }

        function convertToHex(value) {
            var hex = value.toString(16); // Valor hexadecimal

            return (hex.length === 1) ? "0" + hex : hex;
        }

        function getRgbToHex(r, g, b) {
            return "#" + this.convertToHex(r) + this.convertToHex(g) + this.convertToHex(b);
        }
    
        function MANAGER_DATETIME() {
            return {
                MONTHS: [
                    { name: "Enero", value: 0 }, { name: "Febrero", value: 1 },
                    { name: "Marzo", value: 2 }, { name: "Abril", value: 3 },
                    { name: "Mayo", value: 4 }, { name: "Junio", value: 5 },
                    { name: "Julio", value: 6 }, { name: "Agosto", value: 7 },
                    { name: "Septiembre", value: 8 }, { name: "Octubre", value: 9 },
                    { name: "Noviembre", value: 10 }, { name: "Diciembre", value: 11 }
                ],

                DAYS_OF_WEEK: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],

                DAYS_OF_WEEK_MIN: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],

                MONTHS_OF_YEAR: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],

                MONTHS_OF_YEAR_MIN: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],

                DAYS_OF_MONTHS: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            };
        }

        function CODES_KEYBOARD() {
            return {
                BACKSPACE: 8,       // TECLA BORRAR CARACTER
                TAB: 9,             // TECLA TABULACIÓN
                ENTER: 13,          // TECLA ENTER
                SHIFT: 16,          // TECLA SHIFT
                CTRL: 17,           // TECLA CONTROL
                ALT: 18,            // TECLA ALT
                ESC: 27,            // TECLA ESC
                SPACE: 32,          // TECLA ESPACIO
                END: 36,            // TECLA FIN
                HOME: 36,           // TECLA INICIO
                ARROW_UP: 38,       // TECLA FLECHA ARRIBA
                ARROW_RIGHT: 39,    // TECLA FLECHA DERECHA
                ARROW_DOWN: 40,     // TECLA FLECHA ABAJO
                ARROW_LEFT: 37,     // TECLA FLECHA IZQUIERDA
                DELETE: 46          // TECLA SUPRIMIR
            };
        }

        function TEXTCONTROL() {
            return {
                TEXT: "text",
                ALPHABETIC: "alphabetic",
                NUMBER: "number",
                INTEGER: "integer",
                MONEY: "money",
                MATH: "math",
                ALPHANUMBER: "alphanumber",
                ALPHASPACE: "alphaspace",
                ALPHANUMBERSPACE: "alphanumberspace",
                DECIMAL: "decimal",
                EMAIL: "email",
                PASSWORD: "password"
            };
        }

        function CLASSES() {
            return {
                BODY_OVERFLOW_NONE: "body-overflow-none",
                OVERFLOW_NONE: "overflow-none",
                BODY_OVERFLOW_NONE_NAV: "body-overflow-none-sidenav",
                SHOW_KEYBOARD: "show-keyboard",
                SHOW_BOTTOM_NAV: "show-bottom-navigation",

                APPBAR_56: "pd-56",
                APPBAR_64: "pd-64",

                ACTIVE: "active",
                DISPLAYED: "displayed",
                DEFAULT: "default",
                SHOW: "show",
                HIDE: "hide",
                HIDDEN: "hidden",
                START: "start",
                FIXED: "fixed",
                FINISH: "finish",
                DISABLED: "disabled",

                INDETERMINATE: "indeterminate",
                BUFFERING: "buffering",

                ANIMATED: "animated",
                OPTIONABLE: "optionable",
                ACTION: "action",

                TWO_LINE: "two-line",
                ROUND: "round",
                ELEVATION: "elevation",
                ALTERNATIVE: "alternative"
            };
        }

        function LISTENERS() {
            return {
                CLICK: "click",
                DBLCLICK: "dblclick",
                FOCUS: "focus",
                BLUR: "blur",
                ENTER: "enter",
                KEY_UP: "keyUp",
                KEY_DOWN: "keyDown",
                HOLD: "hold",
                CLICK_RIGHT: "clickRight",
                SHOW: "show",
                HIDE: "hide",
                CHANGED_TEXT: "changedText",
                ICON: "icon",
                ACTION: "action",
                EDIT: "edit",
                CHANGED: "changed",
                SELECTED: "selected",
                CLEAR: "clear",
                ADD: "add",
                REMOVE: "remove",
                SELECT: "select",
                CANCEL: "cancel",
                SAVE: "save",
                DETERMINATE: "determinate",
                SUCCESS: "success",
                ERROR: "error",
                CHECKBOX: "checkbox",
                OPTION: "option"
            };
        }

        function BreakException() {
            return {}; // Excepción generada
        }

        function DIGITS() {
            return {
                0: "",                  //   0
                1: "UN",                //   1
                2: "DOS",               //   2
                3: "TRÉS",              //   3
                4: "CUATRO",            //   4
                5: "CINCO",             //   5
                6: "SEíS",              //   6
                7: "SIETE",             //   7
                8: "OCHO",              //   8
                9: "NUEVE",             //   9
                10: "DÍEZ",             //  10
                11: "ONCE",             //  11
                12: "DOCE",             //  12
                13: "TRECE",            //  13
                14: "CATORCE",          //  14
                15: "QUINCE",           //  15
                16: "DIECISÉIS",        //  16
                17: "DIECISIETE",       //  17
                18: "DIECIOCHO",        //  18
                19: "DIECINUEVE",       //  19
                20: "VEINTE",           //  20
                21: "VIENTIUNO",        //  21
                22: "VIENTIDÓS",        //  22
                23: "VEINTITRÉS",       //  23
                24: "VEINTICUATRO",     //  24
                25: "VEINTICINCO",      //  25
                26: "VEINTISEÍS",       //  26
                27: "VEINTISIETE",      //  27
                28: "VEINTIOCHO",       //  28
                29: "VEINTINUEVE",      //  29
                30: "TREINTA",          //  30
                40: "CUARENTA",         //  40
                50: "CINCUENTA",        //  50
                60: "SESENTA",          //  60
                70: "SETENTA",          //  70
                80: "OCHENTA",          //  80
                90: "NOVENTA",          //  90
                100: "CIEN",            // 100
                200: "DOSCIENTOS",      // 200
                300: "TRECIENTOS",      // 300
                400: "CUATROCIENTOS",   // 400
                500: "QUINIENTOS",      // 500
                600: "SEISCIENTOS",     // 600
                700: "SETECIENTOS",     // 700
                800: "OCHOCIENTOS",     // 800
                900: "NOVECIENTOS"      // 900
            };
        }

        function QUANTITIES() {
            return {
                1: "MIL",
                10: "MIL",
                2: "MILLÓN",
                20: "MILLONES",
                3: "MIL",
                30: "MIL", 
                4: "BILLÓN", 
                40: "BILLONES",
                5: "MIL", 
                50: "MIL", 
                6: "TRILLÓN", 
                60: "TRILLONES",
                7: "MIL",
                70: "MIL"
            };
        }

        function userAgent() {
            return navigator.userAgent || navigator.vendor || window.opera;
        }

        function TIME_ELAPSED_CONFIG() {
            return [
                { 
                    divisor: 1000, comparator: 60, key: "seconds",
                    normal: { singular: "segundo", plural: "segundos" },
                    min: { singular: "seg", plural: "segs" }
                }, { 
                    divisor: 60, comparator: 60, key: "minutes",
                    normal: { singular: "minuto", plural: "minutos" },
                    min: { singular: "min", plural: "mins" }
                }, { 
                    divisor: 60, comparator: 24, key: "hours",
                    normal: { singular: "hora", plural: "horas" },
                    min: { singular: "hora", plural: "horas" }
                }, { 
                    divisor: 24, comparator: 30, key: "days",
                    normal: { singular: "día", plural: "días" },
                    min: { singular: "día", plural: "dias" }
                }, { 
                    divisor: 30, comparator: 12, key: "months",
                    normal: { singular: "mes", plural: "meses" },
                    min: { singular: "mes", plural: "meses" }
                }, { 
                    divisor: 12, comparator: 9999, key: "years",
                    normal: { singular: "año", plural: "años" },
                    min: { singular: "año", plural: "años" }
                }
            ];
        }

        function REG_CHARACTERS() {
            return {
                ALPHABETIC: /[^a-z|A-Z|ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]/g,
                ALPHASPACE: /[^a-z|A-Z| |ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]/g,
                NUMBER: /[^0-9]*$/g,
                ALPHANUMBER: /[^0-9|a-z|A-Z|ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]/g,
                ALPHANUMBERSPACE: /[^0-9|^a-z|A-Z| |ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü]/g,
                EMAIL: /[^a-z|A-Z|0-9|.|@|_|-]/g,
                DECIMAL: /[^0-9|.|+|-]/g,
                PASSWORD: /[^a-z|A-Z|0-9|ñ|Ñ|á|Á|é|É|í|Í|ó|Ó|ú|Ú|ü|Ü|.|@|_|-|#|$|&|%]/g
            };
        }

        function REG_EXPRESSION() {
            return {
                EMAIL: /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,8}$/,
                DECIMAL: /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/,
                HEX_TO_RGB: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
            };
        }
        
        return Softtion; // Retornando clase Softtion
    });
})();

// Class Time

(function () {
    !function (fnGlb) {        
        var glb = (typeof window !== "undefined") ? window : 
            (typeof global !== "undefined") ? 
                global : typeof self !== "undefined" ? self : undefined;
                
        if (glb) glb.TimerD = fnGlb(window.softtion); // Se definió
    }(function (softtion) {
        
        function Time(milliseconds) {
            Class.CallCheck(this, Time);

            var self = Class.ConstructorReturn(
                this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this)
            );
    
            self.setTime(milliseconds);
        }

        var functions = [
            { key: "setTime", value: setTime },
            { key: "getDescription", value: getDescription }
        ];

        Class.Create(Time, functions);
        
        function setTime(milliseconds) {
            this.milliseconds = milliseconds; return this;
        }

        function getDescription() {
            var seconds = Math.roundDecimal(this.milliseconds/1000);

            if (seconds < 60) 
                return "00:" + softtion.leadingCharBefore(seconds, "0", 2); 

            var minutes = parseInt(seconds / 60);
            seconds = seconds - (minutes * 60); // Recalculando
            
            var text = softtion.leadingCharBefore(minutes, "0", 2);

            return text + ":" + softtion.leadingCharBefore(seconds, "0", 2); 
        }

        return Time; // Retornando clase Time
    });
})();

// Class ColorMaterial

(function () {
    !function (fnGlb) {        
        var glb = (typeof window !== "undefined") ? window : 
            (typeof global !== "undefined") ? 
                global : typeof self !== "undefined" ? self : undefined;
                
        if (glb) glb.ColorMaterial = fnGlb(); // Se definió
    }(function () {

        function ColorMaterial(color) {
            Class.CallCheck(this, ColorMaterial);

            var self = Class.ConstructorReturn(
                this, (ColorMaterial.__proto__ || Object.getPrototypeOf(ColorMaterial)).call(this)
            );

            if (typeof color === "string") {
                self._color = color;
                self._rgb = softtion.getHexToRgb(color);
            }

            if (typeof color === "object") {
                self._rgb = color;
                self._color = softtion.getRgbToHex(color.r, color.g, color.b);
            }

            self._r = self._rgb.r; self._g = self._rgb.g; self._b = self._rgb.b;
        }

        var functions = [
            { key: "toHexString", value: toHexString },
            { key: "toRgb", value: toRgb },
            { key: "isDark", value: isDark },
            { key: "isLight", value: isLight },
            { key: "getBrightness", value: getBrightness }
        ];

        var statics = [
            { key: "multiply", value: multiply },
            { key: "mix", value: mix }
        ];

        Class.Create(ColorMaterial, functions, statics);

        function toHexString() {
            return softtion.getRgbToHex(this._r, this._g, this._b);
        }

        function toRgb() {
            return { r: this._r, g: this._g, b: this._b };
        }

        function getBrightness() {
            var rgb = this.toRgb(); // Datos en RGB para determinar luz

            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        }

        function isDark() {
            return this.getBrightness() < 128;
        }

        function isLight() {
            return !this.isDark();
        }

        function multiply(color1, color2) {
            var color = {}; // Nuevo color resultante del proceso

            color.r = Math.floor(color1.r * color2.r / 255);
            color.g = Math.floor(color1.g * color2.g / 255);
            color.b = Math.floor(color1.b * color2.b / 255);

            return new ColorMaterial({ r: color.r, g: color.g, b: color.b });
        }

        function mix(color1, color2, amount) {
            amount = (amount === 0) ? 0 : (amount || 50);

            var rgb1 = new ColorMaterial(color1).toRgb();
            var rgb2 = new ColorMaterial(color2).toRgb();

            var p = amount / 100;
            var a = 0, w1;
            var w = p * 2 - 1;

            if (w * a === -1) {
                w1 = w;
            } else {
                w1 = (w + a) / (1 + w * a);
            }

            w1 = (w1 + 1) / 2;

            var w2 = 1 - w1;

            var rgb = {
                r: Math.floor(rgb2.r * w1 + rgb1.r * w2),
                g: Math.floor(rgb2.g * w1 + rgb1.g * w2),
                b: Math.floor(rgb2.b * w1 + rgb1.b * w2)
            };

            return new ColorMaterial(rgb); // Color resultante
        }

        return ColorMaterial; // Retornando clase ColorMaterial
    });
})();

// Extendiendo clases Javascript

(function (factory) {
    if (typeof jQuery === "function") {
        factory(window, jQuery); // jQuery ya se encuentra cargado
    } else { 
        throw new Error("Softtion requiere jQuery cargado en la Aplicación");
    } // No se ha cargado jQuery
})(function (window, jQuery) {
    
    window.softtion = new Softtion(); // Agregando softtion como Global
    
    // Métodos de Softtion para los objetos "Array"
    
    (function (softtion) {
        
        Array.prototype.size = function () { 
            return this.length; 
        };
        
        Array.prototype.isEmpty = function () { 
            return (this.length === 0); 
        };

        Array.prototype.first = function () { 
            return this.isEmpty() ? null : this[0]; 
        };

        Array.prototype.last = function () {
            return this.isEmpty() ? null : this[this.length - 1];
        };
        
        Array.prototype.isLastIndex = function (index) {
            return (this.length === (index + 1)); 
        };

        Array.prototype.has = function (count) { 
            return (this.length === count); 
        };
        
        Array.prototype.hasItem = function (item) {
            return (this.indexOf(item) !== -1);
        };
        
        Array.prototype.haveSomeItem = function (items) {
            if (!softtion.isArray(items)) return false;
            
            var self = this, result = false;
            
            softtion.forEach(items, function (item) {
                return (result = self.hasItem(item));
            });
            
            return result; // Retornando resultado
        };

        Array.prototype.contains = function (count) { 
            return (this.length >= count); 
        };

        Array.prototype.remove = function (index) {
            if (this.contains(index + 1)) 
                this.splice(index, 1); 

            return this; // Retornando interfaz fluida
        };

        Array.prototype.removeObject = function (object) {
            return this.remove(this.indexOf(object)); // Retornando interfaz fluida
        };

        Array.prototype.together = function (object) {
            var self = this; // Objeto collection

            if (softtion.isArray(object)) {
                object.forEach(function (item) { self.push(item); });
            } else if (softtion.isDefined(object)) { 
                self.push(object);
            } // Agregando el objeto definido

            return self; // Retornando interfaz fluida
        };
        
        Array.prototype.extract = function (start, end) {
            if (end > this.length) end = this.length;
            
            var result = []; // Array resultante
            
            for (var index = start; index < end; index++) {
                result.push(this[index]);
            } // Recorriendo array entre las posiciónes dadas
            
            return result; // Retornando Array de extracción
        };

        Array.prototype.filtrate = function (fn) {
            var array = []; // Array filtrado

            if (softtion.isFunction(fn)) {
                this.forEach(function (item, index) {
                    if (fn(item, index)) array.push(item); 
                });
            } // Se ha definido función para filtrar

            return array; // Retornando Array
        };

    })(window.softtion);

    // Métodos de Softtion para los objetos "Date"
        
    (function (softtion) {

        Date.prototype.toPHP = function () {
            return parseInt((this.getTime() / 1000));
        };

        Date.prototype.normalize = function (option) {
            option = option || "date";

            switch (option) {
                case ("date") :
                    this.setHours(0); this.setMinutes(0);
                    this.setSeconds(0); this.setMilliseconds(0);
                break;

                case ("time") :
                    this.setFullYear(1900); this.setMonth(1); this.setDate(1); 
                break;
            }

            return this; // Retornando interfaz fluida
        };

        Date.prototype.getFormat = function (format) {
            var formato = format || "dd-mm-aa hh:ii:ss"; // Formato
            var hora = (this.getHours() > 12) ? (this.getHours() - 12) : 
                (this.getHours() === 0) ? 12 : this.getHours();

            formato = formato.replace(
                "dd", softtion.leadingCharBefore(this.getDate(), "0", 2)
            ); // Número del día de la fecha

            formato = formato.replace(
                "dw", Softtion.MANAGER_DATETIME.DAYS_OF_WEEK[this.getDay()]
            ); // Número del día de la fecha
        
            formato = formato.replace(
                "mm", softtion.leadingCharBefore((this.getMonth() + 1), "0", 2)
            ); // Número del mes de la fecha
    
            formato = formato.replace(
                "aa", softtion.leadingCharBefore(this.getFullYear(), "0", 4)
            ); // Número del año de la fecha

            formato = formato.replace(
                "mn", Softtion.MANAGER_DATETIME.MONTHS_OF_YEAR[this.getMonth()]
            ); // Nombre del mes de la fecha

            formato = formato.replace(
                "mx", Softtion.MANAGER_DATETIME.MONTHS_OF_YEAR_MIN[this.getMonth()]
            ); // Nombre del mes reducido de la fecha
    
            formato = formato.replace(
                "ww", Softtion.MANAGER_DATETIME.DAYS_OF_WEEK[this.getDay()]
            ); // Nombre de la semana de la fecha

            formato = formato.replace(
                "hh", softtion.leadingCharBefore(this.getHours(), "0", 2)
            ); // Número de hora de la fecha
    
            formato = formato.replace(
                "ii", softtion.leadingCharBefore(this.getMinutes(), "0", 2)
            ); // Número de minuto de la fecha
    
            formato = formato.replace(
                "ss", softtion.leadingCharBefore(this.getSeconds(), "0", 2)
            ); // Número de segundo de la fecha
    
            formato = formato.replace(
                "hz", softtion.leadingCharBefore(hora, "0", 2)
            ); // Número de hora de la fecha
    
            formato = formato.replace("zz", (this.getHours() > 11) ? "PM" : "AM"); 

            return formato; // Retornando formato de la Fecha establecido
        };

        Date.prototype.code = function (type) {
            switch (type) {
                case ("date") : return this.getFormat("aammdd");
                case ("time") : return this.getFormat("hhiiss");
                default : return this.getFormat("aammddhhiiss");
            }
        };

        Date.prototype.equals = function (date, option) {
            if (softtion.isDate(date)) {
                option = option || "date"; // Estableciendo opción

                switch (option) {
                    case ("date") :
                        if (this.getDate() !== date.getDate()) {
                            return false; } // Comparando dias de las fechas

                        if (this.getMonth() !== date.getMonth()) {
                            return false; } // Comparando meses de las fechas

                        return this.getFullYear() === date.getFullYear();

                    case ("time") :
                        if (this.getSeconds() !== date.getSeconds()) {
                            return false; } // Comparando segundos de las fechas

                        if (this.getMinutes() !== date.getMinutes()) {
                            return false; } // Comparando minutos de las fechas

                        return this.getHours() === date.getHours();

                    case ("datetime") :
                        return this.equals(date, "date") && this.equals(date, "time");
                }
            } // Comparando atributos de las fechas

            return false; // No se puede realizar comparación
        };

        Date.prototype.merge = function (date, option) {
            if (softtion.isDate(date)) {
                var $option = option || "time"; // Estableciendo opción

                switch ($option) {
                    case ("date") :
                        this.setFullYear(date.getFullYear());
                        this.setMonth(date.getMonth()); 
                        this.setDate(date.getDate());

                    case ("time") :
                        this.setHours(date.getHours());
                        this.setMinutes(date.getMinutes()); 
                        this.setSeconds(date.getSeconds());
                    break;
                }
            }
        };

        Date.prototype.equalsDate = function (year, month, day) {
            if (this.getDate() !== day) {
                return false; } // Comparando dias de las fechas

            if (this.getMonth() !== month) {
                return false; } // Comparando meses de las fechas

            return (this.getFullYear() === year);
        };

        Date.prototype.isLeapYear = function () { 
            return softtion.isLeapYear(this.getFullYear());
        };

        Date.prototype.increaseTime = function (milliseconds) {
            this.setTime(this.getTime() + milliseconds); return this;
        };

        Date.prototype.increaseSeconds = function (seconds) {
            return this.increaseTime(seconds * 1000);
        };

        Date.prototype.increaseMinutes = function (minutes) {
            return this.increaseSeconds(minutes * 60);
        };

        Date.prototype.increaseHours = function (hours) {
            return this.increaseMinutes(hours * 60);
        };

        Date.prototype.increaseDays = function (days) {
            return this.increaseHours(days * 24);
        };

        Date.prototype.increaseWeeks = function (weeks) {
            return this.increaseDays(weeks * 7);
        };

        Date.prototype.increaseYears = function (years) {
            return this.increaseDays(years * 365);
        };

        Date.prototype.decreaseTime = function (milliseconds) {
            this.setTime(this.getTime() - milliseconds); return this;
        };

        Date.prototype.decreaseSeconds = function (seconds) {
            return this.decreaseTime(seconds * 1000);
        };

        Date.prototype.decreaseMinutes = function (minutes) {
            return this.decreaseSeconds(minutes * 60);
        };

        Date.prototype.decreaseHours = function (hours) {
            return this.decreaseMinutes(hours * 60);
        };

        Date.prototype.decreaseDays = function (days) {
            return this.decreaseHours(days * 24);
        };

        Date.prototype.decreaseWeeks = function (weeks) {
            return this.decreaseDays(weeks * 7);
        };

        Date.prototype.decreaseYears = function (years) {
            return this.decreaseDays(years * 365);
        };
        
        Date.prototype.isAfter = function (date) {
            if (!softtion.isDate(date)) return false;
            
            return this.getTime() < date.getTime();
        };
        
        Date.prototype.isBefore = function (date) {
            if (!softtion.isDate(date)) return false;
            
            return this.getTime() > date.getTime();
        };
        
        Date.prototype.getDifferenceFormat = function (date, min, prefixIgnore) {
            date = date || new Date(); // Redifiniendo date
            var difference = this.getTime() - date.getTime();
            
            return softtion.getTimeFormatElapsed(difference, min, prefixIgnore);
        };

    })(window.softtion);
        
    // Métodos de Softtion para los objetos "String"
    
    (function (softtion) {
        
        function forceString(value) {
            var result = value; // Salvando valor anterior
            
            result = result.replace("á", "a"); 
            result = result.replace("Á", "A");
            result = result.replace("é", "e"); 
            result = result.replace("É", "E");
            result = result.replace("í", "i"); 
            result = result.replace("Í", "I");
            result = result.replace("ó", "o"); 
            result = result.replace("Ó", "O");
            result = result.replace("ú", "u"); 
            result = result.replace("Ú", "U");
            
            return result; // Retornando resultado del proceso
        }

        String.prototype.isFull = function () { return (this.length > 0); };

        String.prototype.isEmpty = function () { return (this.length === 0); };
        
        String.prototype.pattern = function (value, force) { 
            if (!softtion.isText(value)) return true; // Sin filtro
            
            var test = (!force) ? this.toLowerCase() : forceString(this.toLowerCase());
            if (force) value = forceString(value); // Se debe forzar el patrón
            
            return (~test.indexOf(value.toLowerCase()) !== 0); 
        };
        
        String.prototype.like = function (type, value, force) { 
            if (!softtion.isText(value)) return true; // Sin filtro
            
            var pattern = undefined, // Expresión RegExp
                test = (!force) ? this.toLowerCase() : forceString(this.toLowerCase());
            
            switch (type) {
                case ("start"):   // LIKE "value%"
                    pattern = "^" + value.toLowerCase() + ".*$"; break;
                case ("between"):   // LIKE "%value%"
                    pattern = "^.*" + value.toLowerCase() + ".*$"; break;
                case ("end"):  // LIKE "%value"
                    pattern = "^.*" + value.toLowerCase() + "$"; break;
            } // Definiendo tipo de LIKE para aplicar
            
            if (force) pattern = forceString(pattern); // Se debe forzar el patrón
            
            return softtion.isUndefined(pattern) ? 
                false : softtion.isDefined(test.match(pattern));
        };

    })(window.softtion);
    
    // Función para crear html desde Javascript

    (function (softtion) {

        // Class HtmlAttribute
        var HtmlAttribute = function (name, value) {
            this.name = name; this.value = value;
        };

        HtmlAttribute.prototype.getName = function () { 
            return this.name; 
        };

        HtmlAttribute.prototype.getValue = function () { 
            return this.value; 
        };

        HtmlAttribute.prototype.isCorrect = function () {
            return (softtion.isDefined(this.name) && this.name !== "");
        };

        // Class HtmlElement
        var HtmlElement = function (tag, isClosed) {
            this.tag = tag; this.id = undefined;        
            this.classes = new Array();       
            this.attributes = new Array();
            this.text = ""; this.childrens = new Array();

            this.closed = (isClosed !== undefined) ? isClosed : true; 
        };

        HtmlElement.prototype.clean = function () {
            this.id = undefined; this.classes = new Array();
            this.attributes = new Array(); 
            this.text = ""; this.childrens = new Array();

            return this; // Retornando componente para Fluent
        };

        HtmlElement.prototype.setTag = function (tag) { 
            this.tag = tag; return this; 
        };

        HtmlElement.prototype.setClosed = function (closed) { 
            this.closed = (closed !== undefined) ? closed : true; return this;
        };

        HtmlElement.prototype.setId = function (id) { 
            this.id = id; return this; 
        };

        HtmlElement.prototype.addClass = function (classNew) { 
            if (softtion.isUndefined(classNew)) return this;
            
            this.classes = (softtion.isArray(classNew)) ?
                this.classes.together(classNew) : 
                this.classes.together([classNew]);
            
            return this; // Retornando interfaz fluida
        };

        HtmlElement.prototype.addAttribute = function (attribute, value) {
            try {
                if (softtion.isUndefined(attribute)) {
                    throw "el atributo establecido no esta definido ó instanciado.";
                } // Objeto undefined

                if (typeof attribute === "string") {
                    this.attributes.push(new HtmlAttribute(attribute,value)); return this;
                } // Objeto es de tipo String

                if (!(attribute instanceof HtmlAttribute)) { 
                    throw "el atributo establecido no es de tipo HtmlAttribute.";
                } // Objeto no es de tipo HtmlAttribute

                this.attributes.push(attribute); return this;
            } 

            catch (err) { 
                console.error("Softtion Component - Uncaught TypeError: " + err); 
            } // Error generado 
        };

        HtmlElement.prototype.setText = function (text) { 
            this.text = text; return this; 
        };

        HtmlElement.prototype.append = function (text) { 
            this.text += text; return this; 
        };

        HtmlElement.prototype.addChildren = function (component) {
            try {
                if (softtion.isUndefined(component)) {
                    throw "El componente establecido no esta definido ó instanciado.";
                } // Objeto undefined

                if (!(component instanceof HtmlElement)) {
                    throw "El componente establecido no es de tipo HtmlElement.";
                } // Objeto no es de tipo HtmlComponent

                this.childrens.push(component); return this;
            } 

            catch (err) { 
                console.error("Softtion - Uncaught TypeError: " + err); 
            } // Error generado
        };

        HtmlElement.prototype.create = function () {
            try {
                if (!this.tag) {
                    throw "No ha establecido el tipo de etiqueta del Componente.";
                } // No definio correctamente la etiqueta

                var element = "<" + this.tag; // Iniciando etiqueta de configuración

                if (this.id) element += " id='" + this.id + "'"; // Se estableció identificador de Componente

                if (!this.classes.isEmpty()) {
                    element += " class='"; // Iniciando definicion de Clases
                    this.classes.forEach(function (newClass) { element += newClass + " "; });

                    element = element.trim() + "'"; 
                } // Se establecieron clases para el Componente

                if (!this.attributes.isEmpty()) {
                    this.attributes.forEach(function (attribute) { 
                        if (attribute.isCorrect()) {
                            element += " " + attribute.getName() + "='" + attribute.getValue() + "'";
                        }
                    });
                } // Se establecieron atributos para el Componente

                element += ">"; // Cerrando etiqueta de configuración

                if (this.text) element += this.text; // Se estableció texto de Componente

                if (!this.childrens.isEmpty()) {
                    this.childrens.forEach(function (children) { 
                        element += children.create(); 
                    });
                } // Se establecieron componentes hijos en el Componente */

                if (this.closed) element +=  "</" + this.tag + ">"; // Cerrando su etiqueta

                return element; // Retornando configuración del componente
            } 

            catch (err) { 
                console.error("Softtion - Uncaught TypeError: " + err); 
            } // Error generado
        };

        HtmlElement.prototype.tojQuery = function () { 
            return jQuery(this.create());
        };

        HtmlElement.prototype.toString = function () {
            return this.create();
        };

        Softtion.prototype.html = function (tag, closed) {
            return new HtmlElement(tag, closed);
        };
        
        Softtion.prototype.htmlElement = function (tag, classes) {
            return new HtmlElement(tag).addClass(classes).tojQuery();
        };
        
    })(window.softtion);
    
    // Funciones para redondear números
    
    (function () {
    
        function decimalAdjust(type, value, exp) {
            // Si el exp no está definido o es cero...
            if (typeof exp === "undefined" || +exp === 0) {
                return Math[type](value);
            }
            value = +value; exp = +exp;
            
            // Si el valor no es un número o el exp no es un entero...
            if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
                return NaN;
            }
            // Shift
            value = value.toString().split("e");
            value = Math[type](+(value[0] + "e" + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split("e");
            return +(value[0] + "e" + (value[1] ? (+value[1] + exp) : exp));
        }

        // Decimal round
        if (!Math.roundDecimal) {
            Math.roundDecimal = function (value, exp) {
                return decimalAdjust("round", value, exp);
            };
        }
        // Decimal floor
        if (!Math.floorDecimal) {
            Math.floorDecimal = function (value, exp) {
                return decimalAdjust("floor", value, exp);
            };
        }
        // Decimal ceil
        if (!Math.ceilDecimal) {
            Math.ceilDecimal = function (value, exp) {
                return decimalAdjust("ceil", value, exp);
            };
        }
    })();
});