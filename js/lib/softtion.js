
/*
 Softtion v1.4.7
 (c) 2015 - 2018 Softtion Developers
 http://www.softtion.com.co
 License: MIT
 Create: 24/May/2015
 Update: 05/May/2018
 */

class Softtion {
    
    constructor() { }
    
    static get MANAGER_DATETIME() {
        return {
            MONTHS: [
                { name: "Enero", value: 0 }, { name: "Febrero", value: 1 },
                { name: "Marzo", value: 2 }, { name: "Abril", value: 3 },
                { name: "Mayo", value: 4 }, { name: "Junio", value: 5 },
                { name: "Julio", value: 6 }, { name: "Agosto", value: 7 },
                { name: "Septiembre", value: 8 }, { name: "Octubre", value: 9 },
                { name: "Noviembre", value: 10 }, { name: "Diciembre", value: 11 }
            ],
            
            DAYS_OF_WEEK: [
                "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" 
            ],
            
            DAYS_OF_WEEK_MIN: [
                "Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb" 
            ],
            
            MONTHS_OF_YEAR: [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" 
            ],
            
            MONTHS_OF_YEAR_MIN: [ 
                "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" 
            ],
            
            DAYS_OF_MONTHS: [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
        };
    };
    
    static get CODES_KEYBOARD() {
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
                
    static get TEXTCONTROL() {
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
        
    static get CLASSES() {
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
            
            TWO_LINE: "two-line"
        };
    }
    
    static get LISTENERS() {
        return {
            CLICK: "click",
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
            CHECKBOX: "checkbox"
        };
    }
    
    static get BreakException() {
        return {}; // Excepción generada
    }
    
    static get DIGITS() {
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
            22: "VIENTIDOS",        //  22
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
    
    static get QUANTITIES() {
        return {
            1: "MIL",
            10: "MIL",
            2: "MILLÓN",
            20: "MILLÓNES",
            3: "MIL",
            30: "MIL", 
            4: "BILLÓN", 
            40: "BILLÓNES",
            5: "MIL", 
            50: "MIL", 
            6: "TRILLÓN", 
            60: "TRILLONES",
            7: "MIL",
            70: "MIL"
        };
    }
    
    static get userAgent() {
        return navigator.userAgent || navigator.vendor || window.opera;
    }
    
    static get TIME_ELAPSED_CONFIG() {
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
    
    static get REG_CHARACTERS() {
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
    
    static get REG_EXPRESSION() {
        return {
            EMAIL: /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,8}$/,
            DECIMAL: /^[-+]?[0-9]+(\.[0-9]+)?$/,
            HEX_TO_RGB: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
        };
    }
    
    isDefined(object, force) {
        return (!force) ?
            ((typeof object !== "undefined") && (object !== null)) :
            (this.isDefined(object) && object !== "undefined");
    }
    
    isUndefined(object, force) {
        return !this.isDefined(object, force);
    }
    
    isArray(array, force) {
        return ((this.isDefined(array, force)) && (array instanceof Array));
    }
    
    isArrayEmpty(array, force) {
        return ((this.isArray(array, force)) && (array.isEmpty()));
    }
    
    isArrayNotEmpty(array, force) {
        return ((this.isArray(array, force)) && (!array.isEmpty()));
    }
    
    isFunction(func, force) {
        return ((this.isDefined(func, force)) && (typeof func === "function"));
    }
    
    isDate(date, force) {
        return ((this.isDefined(date, force)) && (date instanceof Date));
    }
    
    isString(string, force) {
        return ((this.isDefined(string, force)) && (typeof string === "string"));
    }
    
    isText(string, force) {
        return ((this.isString(string, force)) && (string.length > 0));
    }
    
    isNumber(number, force) {
        return ((this.isDefined(number, force)) && (!isNaN(number)));
    }
    
    isjQuery(object, force) {
        return ((this.isDefined(object, force)) && (object instanceof jQuery));
    }
    
    isJson(object, force) {
        return ((this.isDefined(object, force)) && (Object.keys(object) > 0));
    }
    
    isJsonEmpty(object, force) {
        return ((this.isUndefined(object, force)) || (Object.keys(object) === 0));
    }
    
    parseBoolean(value) {
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
    
    findKey(object, pattern) {
        var self = this; // Instancia de Softtion
        
        if (self.isUndefined(object) || !self.isText(pattern))
            return undefined; // Atributos indefindos para busqueda

        var keys = pattern.split("."); // Lista de claves
        
        if (!keys.has(1)) {  
            var value = undefined, result = object;
            
            self.forEach(keys, (key) => { 
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
    
    removeKey(object, key) {
        if (this.isUndefined(object) || this.isUndefined(key)) return;
        
        delete object[key]; // Eliminando parametro del objeto
    }
    
    required(object, validationKeys) {
        var self = this; // Instancia de Softtion
        
        if (self.isArray(validationKeys)) {
            var keyError = undefined; // Clave errada
            
            var result = self.forEach(validationKeys, (key) => {
                keyError = key; // Clave a validar
                
                var value = self.findKey(object, key);
                
                if (!self.isDefined(value)) return true;
            });
            
            return (result) ? { success: true } : // Sin problemas
                { success: false, key: keyError };
        } else {
            var value = self.findKey(object, validationKeys);
            
            return (self.isDefined(value)) ?
                { success: true } : 
                { success: false, key: validationKeys };
        } // Se hace validación de clave única
    }
    
    forEach(array, fn) {
        if (!this.isArray(array)) return false; // No es array
        
        try {
            array.forEach((value, index) => {
                var stop = fn(value, index); // Verificando

                if (stop === true) throw Softtion.BreakException;
            });
            
            return true; // Array recorrido correctamente
        } catch (ex) {
            return false; // Array no recorrido correctamente
        } 
    }
    
    leadingChar(type, word, character, size) {
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
    
    leadingCharAfter(word, character, size) {
        return this.leadingChar("after", word, character, size);
    }
    
    leadingCharBefore(word, character, size) {
        return this.leadingChar("before", word, character, size);
    }
        
    redirect(url, milliseconds) { 
        setTimeout(function () { location.href = url; }, milliseconds || 0);
    }
    
    location(location) {
        window.location = location;
    }
    
    startPage(speed) {
        jQuery("html, body").animate({ scrollTop: 0 }, speed || 0);
    }
    
    createDateOfPHP(timestamp) { 
        return (softtion.isNumber(timestamp)) ? new Date(timestamp * 1000) : undefined; 
    }
    
    isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
    }
    
    clone(object) {
        return jQuery.extend(true, {}, object);
    }
    
    cloneArray(array) {
        return jQuery.extend(true, [], array);
    }
    
    isInPage(node) {
        return (node === document.body) ? false : document.body.contains(node);
    }
    
    isTouchSupport() {
        return ("ontouchstart" in window);
    }
    
    isBetween(value, minValue, maxValue) {
        return (value < minValue) ? false : !(value > maxValue);
    }
    
    getGUID() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4();
    }
    
    generateUrl(baseURL, suffixes) {
        var URL = baseURL; // Iniciando URL
        
        if (this.isArrayNotEmpty(suffixes)) {
            suffixes.forEach((suffix) => { URL += "/" + suffix; });
        } else if (this.isText(suffixes)) {
            URL += "/" + suffixes;
        } // Se establecio un solo prefijo para URL
        
        return URL; // Retornando url generada para recurso
    }
    
    encode(value, keyPassword) {
        return (typeof window.CryptoJS === "undefined") ? value :
            window.CryptoJS.AES.encrypt(value, keyPassword).toString();
    }
    
    decode(value, keyPassword) {
        return (typeof window.CryptoJS === "undefined") ? value :
            window.CryptoJS.AES.decrypt(value, keyPassword).
                toString(window.CryptoJS.enc.Utf8);
    }
    
    isSupportedStorage() {
        return this.isDefined(window.localStorage);
    }
    
    addStorage(key, value) {
        if (!this.isSupportedStorage()) {
            return false;
        } else {
            window.localStorage[key] = value; return true;
        } // Datos almacenados correctamente
    }
    
    getStorage(key) {
        return (!this.isSupportedStorage()) ? undefined : window.localStorage[key];
    }
    
    getValueString(format, value) {
        switch (format) {
            case (Softtion.TEXTCONTROL.ALPHABETIC): 
                return value.replace(Softtion.REG_CHARACTERS.ALPHABETIC, "");
                
            case (Softtion.TEXTCONTROL.NUMBER):  
                return value.replace(Softtion.REG_CHARACTERS.NUMBER, "");
                
            case (Softtion.TEXTCONTROL.INTEGER):  
                return value.replace(Softtion.REG_CHARACTERS.NUMBER, "");
                
            case (Softtion.TEXTCONTROL.ALPHANUMBER): 
                return value.replace(Softtion.REG_CHARACTERS.ALPHANUMBER, "");
                
            case (Softtion.TEXTCONTROL.ALPHASPACE): 
                return value.replace(Softtion.REG_CHARACTERS.ALPHASPACE, "");
                
            case (Softtion.TEXTCONTROL.ALPHANUMBERSPACE): 
                return value.replace(Softtion.REG_CHARACTERS.ALPHANUMBERSPACE, "");
                
            case (Softtion.TEXTCONTROL.DECIMAL): 
                return value.replace(Softtion.REG_CHARACTERS.DECIMAL, "");
                
            case (Softtion.TEXTCONTROL.EMAIL): 
                return value.replace(Softtion.REG_CHARACTERS.EMAIL, "");
                
            case (Softtion.TEXTCONTROL.PASSWORD): 
                return value.replace(Softtion.REG_CHARACTERS.PASSWORD, "");
                
            case (Softtion.TEXTCONTROL.MONEY):  
                return value.replace(Softtion.REG_CHARACTERS.DECIMAL, "");
                
            case (Softtion.TEXTCONTROL.MATH):  
                return value.replace(Softtion.REG_CHARACTERS.DECIMAL, "");
                
            default: return value; // No se aplica control de carácteres
        }
    }
    
    getSuccessString(format, value) {
        switch (format) {
            case (Softtion.TEXTCONTROL.DECIMAL): 
                return Softtion.REG_EXPRESSION.DECIMAL.test(value);
                
            case (Softtion.TEXTCONTROL.EMAIL): 
                return Softtion.REG_EXPRESSION.EMAIL.test(value);
                
            default: return true; // No se debe aplicar control de texto
        }
    }
        
    getMonetaryExpression(number, decimalsCount) {
        if (this.isUndefined(number)) return ""; // Indefinido
        
        var result = "", contador = 0, 
            fraction = number.toString().split("."),
            $number = fraction[0],
            length = $number.length, decimals;
    
        if (fraction.has(2)) decimals = fraction[1];
        
        for (var index = 1; index <= length; index++) {
            if (contador === 3) { 
                result = "." + result; contador = 0;
            } // Agregando punto en la cifra

            result = $number.charAt(length - index) + result; 
            
            contador++; // Aumentando
        } // Recorriendo el número expresarlo monetariamente

        return (this.isUndefined(decimals)) ? // Retornando expresión
            result : result + "," + decimals.substring(0, decimalsCount); 
    }
    
    getThreeDigits(number) {
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
        
    getNumberDescription(number) {
        if (this.isUndefined(number)) 
            return undefined; // Excepción encontrada en el número

        number = isNaN(number) ? parseInt(number) : number;

        if (number === 0) return "CERO"; // Numero es '0'
        
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
    
    deviceIs() {
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
    
    getTimeFormatElapsed(milliseconds, min, prefixIgnore) {
        var label, // Etiqueta del texto de tiempo
            prefix = (milliseconds > 0) ? 
                { singular: "Falta", plural: "Faltan" } : 
                { singular: "Hace", plural: "Hace" };
        
        milliseconds = milliseconds || 0;
        var result = Math.abs(milliseconds); // Redefiniendo
        
        this.forEach(Softtion.TIME_ELAPSED_CONFIG, (item) => {
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
    
    getMIME(extension) {
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
    
    print(attrs) {
        var defaults = {
            title: "SofttionPrint", width: 600, height: 400
        };
        
        attrs = jQuery.extend({}, defaults, attrs);
        
        var title = "<html><head><title>" + attrs.title + "</title>",
            dimensions = "width=" + attrs.width + ",height=" + attrs.height,

        file = window.open("", "PRINT", dimensions);

        file.document.write(title);
        file.document.write("</head><body>");
        file.document.write(attrs.html);
        file.document.write("</body></html>");
        file.document.close();

        file.focus(); file.print(); file.close();
    }
    
    newTabPage(url) {
        var a = document.createElement("a");
        a.target = "_blank"; a.href = url; a.click(); 
    }
    
    nl2br(str, is_xhtml) {
        if (this.isText(str)) {
            var breakTag = (this.parseBoolean(is_xhtml)) ? "<br />" : "<br>",
                regex = /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g;
        
            return (str).replace(regex, "$1" + breakTag + "$2");
        } // Hay un texto establecido para realizar el cambio de etiqueta
    }
    
    getHexToRgb(hexadecimal) {
        var result = Softtion.REG_EXPRESSION.HEX_TO_RGB.exec(hexadecimal);
        
        return !result ? null : {
            r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16)
        };
    }
    
    convertToHex(value) {
        var hex = value.toString(16); // Valor haxacimal
        
        return (hex.length === 1) ? "0" + hex : hex;
    }

    getRgbToHex(r, g, b) {
        return "#" + this.convertToHex(r) + this.convertToHex(g) + this.convertToHex(b);
    }
}

(function (factory) {
    if (typeof jQuery === "function") {
        factory(window, jQuery); // jQuery ya se encuentra cargado
    } else { 
        throw new Error("Softtion requiere jQuery cargado en la Aplicación");
    } // No se ha cargado jQuery
})(function (window, jQuery) {
    
    window.softtion = new Softtion(); // Agregando softtion como Global
    
    ((softtion) => {
        
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

        Array.prototype.contains = function (count) { 
            return (this.length >= count); 
        };

        Array.prototype.remove = function (index) {
            if (this.contains(index + 1)) this.splice(index, 1); 

            return this; // Retornando interfaz fluida
        };

        Array.prototype.removeObject = function (object) {
            return this.remove(this.indexOf(object)); // Retornando interfaz fluida
        };

        Array.prototype.together = function (object) {
            var self = this; // Objeto collection

            if (softtion.isArray(object)) {
                object.forEach((item) => { self.push(item); });
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
                this.forEach((item, index) => {
                    if (fn(item, index)) array.push(item); 
                });
            } // Se ha definido función para filtrar

            return array; // Retornando Array
        };

    })(window.softtion);

    // Métodos de Softtion para los objetos 'Date'
        
    ((softtion) => {

        Date.prototype.toJSON = function (option) {
            switch (option) {
                case ("date") :
                    return { 
                        day : this.getDate(), 
                        month : this.getMonth() + 1, 
                        year : this.getFullYear() 
                    };

                case ("time") : 
                    return { 
                        hour : this.getHours(), 
                        minute : this.getMinutes(), 
                        second : this.getSeconds() 
                    };

                default :
                    return { 
                        date : this.toJson("date"), 
                        time : this.toJson("time") 
                    };
            }
        };

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
                "mm", softtion.leadingCharBefore((this.getMonth() + 1), "0", 2)
            ); // Número del mes de la fecha
    
            formato = formato.replace(
                "aa", softtion.leadingCharBefore(this.getFullYear(), "0", 4)
            ); // Número del año de la fecha

            formato = formato.replace(
                "mn", Softtion.MANAGER_DATETIME.MONTHS_OF_YEAR[this.getMonth()]
            ); // Nombre del mes de la fecha
    
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
            if (softtion.isDate(date)) return false;
            
            return this.getTime() < date.getTime();
        };
        
        Date.prototype.isBefore = function (date) {
            if (softtion.isDate(date)) return false;
            
            return this.getTime() > date.getTime();
        };
        
        Date.prototype.getDifferenceFormat = function (date, min, prefixIgnore) {
            date = date || new Date(); // Redifiniendo date
            var difference = this.getTime() - date.getTime();
            
            return softtion.getTimeFormatElapsed(difference, min, prefixIgnore);
        };

    })(window.softtion);
        
    // Métodos de Softtion para los objetos 'String'
    
    ((softtion) => {
        
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
                case ("start"):   // LIKE 'value%'
                    pattern = "^" + value.toLowerCase() + ".*$"; break;
                case ("between"):   // LIKE '%value%'
                    pattern = "^.*" + value.toLowerCase() + ".*$"; break;
                case ("end"):  // LIKE '%value'
                    pattern = "^.*" + value.toLowerCase() + "$"; break;
            } // Definiendo tipo de LIKE para aplicar
            
            if (force) pattern = forceString(pattern); // Se debe forzar el patrón
            
            return softtion.isUndefined(pattern) ? 
                false : softtion.isDefined(test.match(pattern));
        };

    })(window.softtion);

    ((softtion) => {

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
                    throw 'el atributo establecido no esta definido ó instanciado.';
                } // Objeto undefined

                if (typeof attribute === 'string') {
                    this.attributes.push(new HtmlAttribute(attribute,value)); return this;
                } // Objeto es de tipo String

                if (!(attribute instanceof HtmlAttribute)) { 
                    throw 'el atributo establecido no es de tipo HtmlAttribute.';
                } // Objeto no es de tipo HtmlAttribute

                this.attributes.push(attribute); return this;
            } 

            catch (err) { 
                console.error('Softtion Component - Uncaught TypeError: ' + err); 
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
                    throw 'El componente establecido no esta definido ó instanciado.';
                } // Objeto undefined

                if (!(component instanceof HtmlElement)) {
                    throw 'El componente establecido no es de tipo HtmlElement.';
                } // Objeto no es de tipo HtmlComponent

                this.childrens.push(component); return this;
            } 

            catch (err) { 
                console.error('Softtion - Uncaught TypeError: ' + err); 
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
                console.error('Softtion - Uncaught TypeError: ' + err); 
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