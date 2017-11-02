/* !
 Softtion v1.2.6
 (c) 2015-2017 Softtion Developers, http://www.softtion.com.co
 License: MIT
 Update: 20/Juli/2017
 */

/* global CryptoJS */

(function (factory) {
    if (typeof jQuery === "function") {
        factory(window, jQuery); // jQuery ya se encuentra cargado
    } else { 
        throw new Error("Softtion requiere jQuery cargado en la Aplicación");
    } // No se ha cargado jQuery
})(function (window, jQuery) {
    
    var Softtion = function () { }; // Clase Softtion
    
    Softtion.prototype.DAYS_OF_WEEK = "NAME_DAYS_OF_WEEK";
    Softtion.prototype.DAYS_OF_WEEK_MIN = "NAME_DAYS_OF_WEEK_MIN";
    Softtion.prototype.MONTHS_OF_YEAR = "NAME_MONTHS_OF_YEAR";
    Softtion.prototype.MONTHS_OF_YEAR_MIN = "NAME_MONTHS_OF_YEAR_MIN";    
    Softtion.prototype.DAYS_OF_MONTHS = "COUNT_DAYS_OF_MONTHS";
    
    Softtion.prototype.TEXTCONTROL = "TEXTCONTROL";
    
    Softtion.prototype.get = function (option) {
        option = option || "nothing"; // Estableciendo opcion
        
        switch (option) {
            case (this.DAYS_OF_WEEK):
                return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                
            case (this.DAYS_OF_WEEK_MIN):
                return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
                
            case (this.MONTHS_OF_YEAR):
                return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
                
            case (this.MONTHS_OF_YEAR_MIN):
                return ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
                
            case (this.DAYS_OF_MONTHS):
                return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                
            case (this.TEXTCONTROL):
                return {
                    ALL: "text",
                    ALPHABETIC: "alphabetic",
                    NUMBER: "number",
                    MONEY: "money",
                    NOTHING: "nothing",
                    ALPHANUMBER: "alphanumber",
                    ALPHASPACE: "alphaspace",
                    ALPHANUMBERSPACE: "alphanumberspace",
                    DECIMAL: "decimal",
                    EMAIL: "email",
                    SYMBOL: "symbol",
                    PASSWORD: "password"
                };
                
            default: return null;
        }
    };
    
    Softtion.prototype.isDefined = function (object) {
        return ((typeof object !== "undefined") && (object !== null));
    };
    
    Softtion.prototype.isUndefined = function (object) {
        return !this.isDefined(object);
    };
    
    Softtion.prototype.isArray = function (array) {
        return ((this.isDefined(array)) && (array instanceof Array));
    };
    
    Softtion.prototype.isArrayEmpty = function (array) {
        return ((this.isArray(array)) && (array.isEmpty()));
    };
    
    Softtion.prototype.isFunction = function (func) {
        return ((this.isDefined(func)) && (typeof func === "function"));
    };
    
    Softtion.prototype.isDate = function (date) {
        return ((this.isDefined(date)) && (date instanceof Date));
    };
    
    Softtion.prototype.isString = function (string) {
        return ((this.isDefined(string)) && (typeof string === "string") && (string !== ""));
    };
    
    Softtion.prototype.isNumber = function (number) {
        return ((this.isDefined(number)) && (!isNaN(number)));
    };
    
    Softtion.prototype.isjQuery = function (object) {
        return ((this.isDefined(object)) && (object instanceof jQuery));
    };
    
    Softtion.prototype.isJsonEmpty = function (object) {
        return ((this.isUndefined(object)) || (Object.keys(object) === 0));
    };
    
    Softtion.prototype.parseBoolean = function (value) {
        if (this.isDefined(value)) {
            switch (value) {
                case ("true"): return true;
                case ("false"): return false;
                case (1): return true;
                case (0): return false;
                case ("1"): return true;
                case ("0"): return false;
                default: return true; 
            }
        } else { 
            return false; 
        } // El objeto no esta definido en la función
    };
    
    Softtion.prototype.findKey = function (object, keys) {
        var self = this; // Objeto Softtion
        
        if (this.isUndefined(object) || !this.isString(keys)) { 
            return undefined; 
        } // No se establecieron atributos para busqueda

        var arrayKeys = keys.split('.');
        
        if (arrayKeys.has(1)) { 
            return object[arrayKeys.first()]; 
        } else {
            var value = undefined, object = object;
            
            jQuery.each(arrayKeys, function (index, key) { 
                value = object[key];
                
                if (self.isDefined(value)) {
                    object = value; 
                } else {
                    value = undefined; return false; 
                } // Objeto no fue encontrado
            });
            
            return value; // Retornando objeto encontrado
        }
    };
    
    Softtion.prototype.removeKey = function (object, key) {
        if (this.isUndefined(object) || this.isUndefined(key)) { return; }
        
        delete object[key]; // Eliminando parametro del objeto
    };
    
    Softtion.prototype.nl2br = function (str, is_xhtml) {
        if (this.isString(str)) {
            var breakTag = (this.parseBoolean(is_xhtml)) ? "<br />" : "<br>",
                regex = /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g;
        
            return (str).replace(regex, '$1' + breakTag + '$2');
        } // Hay un texto establecido para realizar el cambio de etiqueta
    };
    
    Softtion.prototype.BreakException = {};
    
    Softtion.prototype.required = function (object, attributes) {
        if (this.isArray(attributes)) {
            var keyError = undefined, 
                response = {},
                self = this; // Objeto Softtion
            
            try {
                attributes.forEach(function (key) {
                    keyError = key; // Clave a validar
                    
                    if (!self.isDefined(self.findKey(object, key)))
                        throw self.BreakException;
                });
                
                response = { success: true };
            } catch (ex) {
                response = { success: false, key: keyError };
            }
            
            return response; // Respuesta del proceso
        } else {
            return (this.isDefined(this.findKey(object, attributes))) ?
                { success: true } : { success: false, key: attributes };
        }
    };
    
    Softtion.prototype.leadingChar = function (word, character, size, option) {
        var newWord = String(word); option = option || "before";
        
        switch (option) {
            case ("before") :
                for (var i = newWord.length; i < size; i++) { 
                    newWord = character + newWord; }
                
                return newWord; // Retornando nueva Palabra
                
            case ("after") :
                for (var i = newWord.length; i < size; i++) { 
                    newWord = newWord + character; }
                
                return newWord; // Retornando nueva Palabra
                
            default : return newWord; // No se definio tipo de Agregación
        }
    };
        
    Softtion.prototype.redirect = function (url, milliseconds) { 
        setTimeout(function () { location.href = url; }, milliseconds || 0);
    };
    
    Softtion.prototype.location = function (location) {
        window.location = location;
    };
    
    Softtion.prototype.startPage = function (speed) {
        jQuery("html, body").animate({ scrollTop: 0 }, speed || 0);
    };
    
    Softtion.prototype.print = function (title, html, css) {
        var docPrint = window.open('', (title || ''), 'width=600,height=400');
        docPrint.document.write("<html><head><title>" + (title || '') + "</title>");
        
        if (css) {
            docPrint.document.write(css);
        } // '<link rel="stylesheet" href="main.css" type="text/css"/>'
            
        docPrint.document.write("</head><body>");
        docPrint.document.write(html);
        docPrint.document.write("</body></html>");
        
        docPrint.document.close(); // necessary for IE >= 10
        docPrint.focus(); // necessary for IE >= 10
        
        docPrint.print(); docPrint.close(); return true;
    };
    
    Softtion.prototype.createDateOfPHP = function (timestamp) { 
        return new Date(timestamp * 1000); 
    };
    
    Softtion.prototype.isLeapYear = function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
    };
    
    Softtion.prototype.clone = function (object) {
        return jQuery.extend(true, {}, object);
    };
    
    Softtion.prototype.cloneArray = function (array) {
        return jQuery.extend(true, [], array);
    };
    
    Softtion.prototype.isInPage = function (node) {
        return (node === document.body) ? false : document.body.contains(node);
    };
    
    Softtion.prototype.isTouchSupport = function () {
        return ("ontouchstart" in window);
    };
    
    Softtion.prototype.isBetween = function (value, minValue, maxValue) {
        if (value < minValue) { return false; } // Afuera rango
        
        if (value > maxValue) { return false; } // Supera rango
        
        return true; // Valor se encuentra entre rango determinado
    };
    
    Softtion.prototype.getGUID = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };
        
        return function () {
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4();
        };
    })();
    
    Softtion.prototype.generateUrl = function (url, prefixs) {
        var urlFinal = url; // Iniciando URL
        
        if (this.isArray(prefixs)) {
            prefixs.forEach(function (prefix) {
                urlFinal += "/" + prefix;
            });
        } else if (this.isString(prefixs)) {
            urlFinal += "/" + prefixs;
        } // Se establecio un solo prefijo
        
        return urlFinal; // Retornando url establecida
    };
    
    window.softtion = new Softtion(); // Agregando softtion como Global
    
    Softtion.prototype.encode = function (value, keyPassword) {
        return (typeof CryptoJS === "undefined") ? value :
            CryptoJS.AES.encrypt(value, keyPassword).toString();
    };
    
    Softtion.prototype.decode = function (valueEncrypt, keyPassword) {
        return (typeof CryptoJS === "undefined") ? valueEncrypt :
            CryptoJS.AES.decrypt(valueEncrypt, keyPassword).toString(CryptoJS.enc.Utf8);
    };
    
    Softtion.prototype.getMIME = function (extension) {
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
    };
    
    var TypeCharacter = {
        characterSymbols: [
            33, 34, 35, 36, 37, 38, 39, 40, 40, 41, 42, 43, 44, 
            45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 
            93, 94, 95, 123, 124, 125, 161, 172, 176, 181, 191
        ],
        
        alphabetic: function (keyCode) { 
            return ((keyCode > 64) && (keyCode < 91))       // Abecedario mayúsculas
                || ((keyCode > 96) && (keyCode < 123))      // Abecedario minúsculas
                || (keyCode === 241) || (keyCode === 209)   // ñ, Ñ
                || (keyCode === 225) || (keyCode === 193)   // á, Á
                || (keyCode === 233) || (keyCode === 201)   // é, É
                || (keyCode === 237) || (keyCode === 205)   // í, Í
                || (keyCode === 243) || (keyCode === 211)   // ó, Ó
                || (keyCode === 250) || (keyCode === 218)   // ú, Ú
                || (keyCode === 252) || (keyCode === 220);  // ü, Ü
        },

        numeric: function (keyCode) { 
            return (keyCode > 47) && (keyCode < 58); // Numeros
        },

        alphaspace: function (keyCode) { 
            return this.alphabetic(keyCode) || (keyCode === 32); // Abecedario, Espacio
        },

        alphanumeric: function (keyCode) { 
            return this.alphabetic(keyCode) || this.numeric(keyCode); // Abecedario, Numeros
        },

        alphanumericspace: function (keyCode) { 
            return this.alphanumeric(keyCode) || (keyCode === 32); // Abecedario, Numeros, Espacio
        },

        decimal: function (keyCode, inputValue) { 
            return (keyCode === 46) ? 
                (inputValue.indexOf('.') === -1) :  // Punto
                this.numeric(keyCode);              // Numeros
        },
        
        symbol: function (keyCode) {
            return (TypeCharacter.characterSymbols.indexOf(keyCode) !== -1);
        },
        
        password: function (keyCode) {
            return this.alphanumeric(keyCode) || this.symbol(keyCode);
        },
        
        email: function (keyCode, inputValue) { 
            if (keyCode === 64) {
                return (inputValue.indexOf('@') === -1);
            } else if (keyCode === 32) {
                return false;
            } else {
                return true;
            } // Todo es valido para el email
        },
        
        settings: window.softtion.get(window.softtion.TEXTCONTROL)
    };
    
    Softtion.prototype.validateCharacter = function (options) {
        switch (options.type) {
            case (TypeCharacter.settings.ALPHABETIC): 
                return TypeCharacter.alphabetic(options.keyCode); 
                
            case (TypeCharacter.settings.NUMBER):  
                return TypeCharacter.numeric(options.keyCode);
                
            case (TypeCharacter.settings.MONEY):  
                return TypeCharacter.numeric(options.keyCode);
                
            case (TypeCharacter.settings.ALPHANUMBER): 
                return TypeCharacter.alphanumeric(options.keyCode); 
                
            case (TypeCharacter.settings.ALPHASPACE): 
                return TypeCharacter.alphaspace(options.keyCode); 
                
            case (TypeCharacter.settings.DECIMAL): 
                return TypeCharacter.decimal(options.keyCode, options.inputValue);
                
            case (TypeCharacter.settings.ALPHANUMBERSPACE): 
                return TypeCharacter.alphanumericspace(options.keyCode); 
                
            case (TypeCharacter.settings.SYMBOL): 
                return TypeCharacter.symbol(options.keyCode); 
                
            case (TypeCharacter.settings.PASSWORD): 
                return TypeCharacter.password(options.keyCode); 
                
            case (TypeCharacter.settings.EMAIL): 
                return TypeCharacter.email(options.keyCode, options.inputValue); 
                
            case (TypeCharacter.settings.NOTHING): return false; // No quiere ningun caracter

            default: return true; // Se aceptan cualquier caracter
        }
    };
    
    var DIGITS = {
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
    },
        QUANTITIES = {
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
        
    Softtion.prototype.getMonetaryExpression = function (number) {
        var $number = "", contador = 0, 
            numberString = number.toString(),
            length = numberString.length;
            
        for (var index = 1; index <= length; index++) {
            if (contador === 3) { 
                $number = "." + $number; contador = 0;
            } // Agregando punto en la cifra

            $number = numberString.charAt(length - index) + $number; 
            
            contador++; // Aumentando
        } // Recorriendo el número expresarlo monetariamente

        return $number; // Retornando expresado monetariamente
    };
    
//    softtion.processNumber = {
//        getThreeDigits : function (number) {
//            try {
//                if ((number.length > 3) || (number.length < 1)) {
//                    throw 'el número establecido para proceso no es de tres cifras.';
//                } /* Excepción */
//                
//                number = softtion.character.addBefore({word : number, character : '0', size : 3}); 
//                var $cifras = creatorCifras(), _cifraDescrita = '';
//                var _centena = parseInt(number.substring(0,1));
//                var _decenaUnidad = parseInt(number.substring(1,3));
//                
//                if (_centena !== 0) {
//                    _cifraDescrita = _cifraDescrita + $cifras[_centena * 100];
//                    
//                    if (_centena === 1 && _decenaUnidad !== 0) {
//                        _cifraDescrita = _cifraDescrita + 'TO ';
//                    } /* Añadimos caracteres en caso de ser Centana de 100 */
//                    
//                    else { _cifraDescrita = _cifraDescrita + ' '; } /* Agregamos espacio descripción */
//                }
//                
//                if (_decenaUnidad !== 0) {
//                    var temporal = $cifras[_decenaUnidad]; 
//                
//                    if (temporal) {
//                        if (temporal.length > 0) {
//                            _cifraDescrita = _cifraDescrita + temporal;
//                        } /* La cifra es diferente de Cero */
//                    }
//
//                    else {
//                        var decena = parseInt(number.substring(1,2)) * 10;
//                        var unidad = parseInt(number.substring(2,3));
//
//                        _cifraDescrita = _cifraDescrita + $cifras[decena];
//                        _cifraDescrita = _cifraDescrita + " Y " + $cifras[unidad];
//                    } /* Se desgloza el número para realizar descripción */
//                }
//                
//                return _cifraDescrita.trim(); /* Retornando cifra de tres dígitos */
//            }
//            
//            catch (err) { 
//                console.error('Softtion - Uncaught TypeError: ' + err); return null; 
//            } /* Error generado */
//        },
//        
//        getDescription : function (number) {
//            try {
//                if (softtion.isEmpty(number)) {
//                    throw 'el número puede no estar definido, instanciado ó no contiene caracteres.';
//                } /* Excepción */
//                
//                if (parseInt(number) !== 0) {
//                    number = String(parseInt(number)); /* Removiendo ceros */
//                    var _numeroDescrito = '', _posicionFinal = number.length, _index = 0; 
//
//                    while (_posicionFinal > 0) {
//                        var _posicionInicial = _posicionFinal - 3; /* Posición inicial del corte */
//
//                        if (_posicionInicial < 0) { _posicionInicial = 0; } /* Controlando desbordamiento */
//
//                        var $cantidades = creatorCantidades(); // Descripcion de Cantidades
//                        var _cifraNumerica = number.substring(_posicionInicial,_posicionFinal);
//                        var _cifraDescrita = softtion.processNumber.getThreeDigits(_cifraNumerica);
//
//                        if (_cifraDescrita.length > 0) {
//                            if (_index > 0) {
//                                if (parseInt(_cifraNumerica) > 1) {
//                                    _cifraDescrita = _cifraDescrita + ' ' + $cantidades[_index * 10];
//                                } /* La cifra a describir es plural */
//
//                                else {
//                                    /* Solo se requiere descriptor de cantidad */
//                                    if (_index%2 !== 0) { _cifraDescrita = $cantidades[_index]; }
//
//                                    /* Se requiere descriptor de cantidad y cifra */
//                                    else { _cifraDescrita = _cifraDescrita + ' ' + $cantidades[_index]; }
//                                } /* La cifra a describir es singular */
//                            } /* La cifra pertenece a unidades de mil ó superiores */
//
//                            _numeroDescrito = _cifraDescrita + ' ' + _numeroDescrito;
//                        } /* La cifra no contiene descripción */
//
//                        else if ((_index > 1) && (_index%2 === 0)) {
//                            _numeroDescrito = $cantidades[_index * 10] + ' ' +  _numeroDescrito;
//                        } /* Se requiere descrición plural de la sección del número */
//
//                        _index++; _posicionFinal = _posicionInicial; /* Reconfigurando variables */
//                    }
//
//                    return _numeroDescrito.trim(); /* Retornando descripción del número */
//                }
//                
//                else { return 'CERO'; } /* El número a describir es cero */
//            } /* Describiendo número */
//            
//            catch (err) { 
//                console.error('Softtion - Uncaught TypeError: ' + err); return null; 
//            } /* Error generado */
//        }
//    };
    
    // Extendiendo Objetos de JavaScript
    
    (function (softtion) {
        
        Array.prototype.isEmpty = function () { 
            return (this.length === 0); 
        };

        Array.prototype.first = function () { 
            return this.isEmpty() ? null : this[0]; 
        };

        Array.prototype.last = function () {
            return this.isEmpty() ? null : this[this.length - 1];
        };
        
        Array.prototype.has = function (count) { 
            return (this.length === count); 
        };
        
        Array.prototype.contains = function (count) { 
            return (this.length >= count); 
        };

        Array.prototype.remove = function (index) {
            if (this.contains(index + 1)) { 
                this.splice(index,1); 
            } // Contiene el index a remover

            return this; // Retornando interfaz fluida
        };

        Array.prototype.removeObject = function (object) {
            return this.remove(this.indexOf(object)); // Retornando interfaz fluida
        };
        
        Array.prototype.concat = function (object) {
            var self = this; // Objeto collection
            
            if (softtion.isArray(object)) {
                object.forEach(function (item) { self.push(item); });
            } else if (softtion.isDefined(object)) { self.push(object); }
            
            return self; // Retornando interfaz fluida
        };
        
        Array.prototype.filter = function (functionFilter) {
            var arrayFilter = new Array(), index = 0;
            
            if (softtion.isFunction(functionFilter)) {
                this.forEach(function (item) {
                    if (functionFilter(item)) { 
                        arrayFilter.push(item, index); 
                    }
                    
                    index++; // Aumentando index del item
                });
            } // Se ha definido función para filtrar
            
            return arrayFilter; // Retornando array filtrado
        };
        
        Array.prototype.for = function (callbackFor) {
            if (softtion.isFunction(callbackFor)) {
                var notStop = true, index = 0;

                while ((notStop) && (index < this.length)) {
                    var result = callbackFor(this[index], index); index++;
                    notStop = softtion.isDefined(result) ? result : true; 
                }
            }
        };
        
        // Métodos de Softtion para los objetos 'Date'

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
                        date : this.json("date"), 
                        time : this.json("time") 
                    };
            }
        };

        Date.prototype.toPHP = function () {
            return parseInt((this.getTime() / 1000));
        };

        Date.prototype.normalize = function (option) {
            var $option = option || "date";

            switch ($option) {
                case ("date") :
                    this.setHours(0); this.setMinutes(0); this.setSeconds(0); this.setMilliseconds(0);
                break;

                case ("time") :
                    this.setFullYear(1900); this.setMonth(1); this.setDate(1); 
                break;
            }
            
            return this; // Retoranando interfaz fluida
        };

        Date.prototype.getFormat = function (formato) {
            var $formato = formato || "dd-mm-aa hh:ii:ss"; // Estableciendo formato
            var $hora = (this.getHours() > 12) ? (this.getHours() - 12) : 
                (this.getHours() === 0) ? 12 : this.getHours();

            $formato = $formato.replace("dd",softtion.leadingChar(this.getDate(),"0",2));
            $formato = $formato.replace("mm",softtion.leadingChar((this.getMonth() + 1),"0",2));
            $formato = $formato.replace("aa",softtion.leadingChar(this.getFullYear(),"0",4));

            $formato = $formato.replace("mn",softtion.get(softtion.MONTHS_OF_YEAR)[this.getMonth()]);
            $formato = $formato.replace("ww",softtion.get(softtion.DAYS_OF_WEEK)[this.getDay()]);

            $formato = $formato.replace("hh",softtion.leadingChar(this.getHours(),"0",2));
            $formato = $formato.replace("ii",softtion.leadingChar(this.getMinutes(),"0",2));
            $formato = $formato.replace("ss",softtion.leadingChar(this.getSeconds(),"0",2));
            $formato = $formato.replace("hz",softtion.leadingChar($hora,"0",2));
            $formato = $formato.replace("zz",(this.getHours() > 11) ? "PM" : "AM"); 

            return $formato; // Retornando formato de la Fecha establecido
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
                        return this.equals(date,"date") && this.equals(date,"time");
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
        
        Date.prototype.increase = function (type, valueIncrease) {
            var $valueDate; // Tipo de dato a incrementar
            
            switch (type) {
                case ("hour") :
                    $valueDate = this.getHours() + valueIncrease;
                    this.setHours(($valueDate > 23) ? 0 : $valueDate);
                break;
                
                case ("minute") :
                    $valueDate = this.getMinutes() + valueIncrease;
                    this.setMinutes(($valueDate > 59) ? 0 : $valueDate);
                break;
                
                case ("second") :
                    $valueDate = this.getSeconds() + valueIncrease;
                    this.setSeconds(($valueDate > 59) ? 0 : $valueDate);
                break;
            }
        };
        
        Date.prototype.decrease = function (type, valueIncrease) {
            var $valueDate; // Tipo de dato a incrementar
            
            switch (type) {
                case ("hour") :
                    $valueDate = this.getHours() - valueIncrease;
                    this.setHours(($valueDate < 0) ? 23 : $valueDate);
                break;
                
                case ("minute") :
                    $valueDate = this.getMinutes() - valueIncrease;
                    this.setMinutes(($valueDate < 0) ? 59 : $valueDate);
                break;
                
                case ("second") :
                    $valueDate = this.getSeconds() - valueIncrease;
                    this.setSeconds(($valueDate < 0) ? 59 : $valueDate);
                break;
            }
        };
        
        // Métodos de Softtion para los objetos 'String'

        String.prototype.isFull = function () { return (this.length > 0); };

        String.prototype.isEmpty = function () { return (this.length === 0); };

    })(window.softtion);

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

        HtmlElement.prototype.addClass = function (newClass) { 
            if (softtion.isArray(newClass)) {
                this.classes = this.classes.concat(newClass); return this;
            } // Cargando lista Atributos

            this.classes.push(newClass); return this;
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

        softtion.html = function (tag, closed) {
            return new HtmlElement(tag, closed);
        };
    })(window.softtion);
    
    (function () {
        
        function decimalAdjust(type, value, exp) {
            // Si el exp no está definido o es cero...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // Si el valor no es un número o el exp no es un entero...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // Shift
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Shift back
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        }

        // Decimal round
        if (!Math.roundDecimal) {
            Math.roundDecimal = function (value, exp) {
                return decimalAdjust('round', value, exp);
            };
        }
        // Decimal floor
        if (!Math.floorDecimal) {
            Math.floorDecimal = function (value, exp) {
                return decimalAdjust('floor', value, exp);
            };
        }
        // Decimal ceil
        if (!Math.ceilDecimal) {
            Math.ceilDecimal = function (value, exp) {
                return decimalAdjust('ceil', value, exp);
            };
        }
    })();
});