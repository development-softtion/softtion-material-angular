/* !
 jQuery Softtion v1.0.0
 (c) 2016 Softtion Developers, http://jquery.softtion.com.co
 License: MIT
 Updated: 23/Nov/2016
 */
(function (factory) {
    if (typeof jQuery === "function" && typeof window.softtion === "object") {
        factory(jQuery, window.softtion);
    } else { 
        throw new Error("jQuery Softtion requiere jQuery y Softtion cargado en la Aplicación");
    } // No se ha cargado jQuery y Softtion
})(function (jQuery, softtion) {
    
    var Module = {
        getKeyJson: function (attributes, object, defaultValue) {
            if (softtion.isUndefined(object)) {
                return defaultValue; 
            } // El objeto no fue definido o no encontrado

            var value = ""; attributes = attributes.split(" ");

            attributes.for(function (attribute) {
                var valueAttribute = object[attribute]; // Valor del atributo
                value += softtion.isUndefined(valueAttribute) ? valueAttribute + " " : "";
            });

            return (softtion.isString(value)) ? value.trim() :
                (softtion.isDefined(defaultValue)) ? defaultValue : "N/D";
        }
    };
    
    jQuery.fn.extend({
        exists: function () { 
            return (jQuery(this).length > 0);
        },
        
        tagName: function () {
            return jQuery(this).prop("tagName"); 
        },
        
        enter: function (functionEnter) {
            var component = jQuery(this); // Componente
            
            if (component.tagName() === "INPUT") {
                component.keyup(function (ev) {
                    if (ev.which === 13) { 
                        if (softtion.isFunction(functionEnter)) { functionEnter(component); }
                    } // Presiono la tecla ENTER
                });
            } // Componente es un INPUT
            
            return component; // Retornando interfaz fluida
        },
        
        deployHtml: function (options) {
            var $default = {
                before: undefined,     // Proceso antes de cargar HTML
                after: undefined,      // Proceso despues de cargar HTML
                animated: undefined,   // Animación en el componente
                url: undefined,        // URL donde se encuentra Html
                failed: undefined      // Proceso en caso de Error de cargue
            };
            
            var $options = jQuery.extend({}, $default, options),
                $component = jQuery(this);
        
            return jQuery.ajax({
                type: "GET",
                mimeType: "text/html; charset=utf-8", 
                url: $options.url,
                dataType: "html",
                async: true,
                success: function (data) {
                    if (softtion.isFunction($options.before)) {
                        $options.before($component); 
                    } // Ejecutando función antes de cargar
                    
                    $component.empty(); // Limpiando componente
                    
                    if (softtion.isDefined($options.animated)) {
                        $component.html(data); $component.animated($options.animated);
                    } else { 
                        $component.html(data); 
                    } // Cargando html en el componente, sin animación
                    
                    if (softtion.isFunction($options.after)) { 
                        $options.after($component); 
                    } // Ejecutando función desoues de cargar
                },
                
                error: function (jqXHR) {
                    if (softtion.isFunction($options.failed)) { 
                        $options.failed(jqXHR, $component); 
                    } // Ejecutando función error al cargar Componente
                } 
            }); 
        },
        
        createJSON: function () {
            var jsonCreated = {}; // Objeto para crear
            
            jQuery(this).each(function () {
                var $nameKeyData = jQuery(this).data("keyjson");
                
                if (softtion.isString($nameKeyData)) {
                    jsonCreated[$nameKeyData] = jQuery(this).val();
                }
            });
            
            return jsonCreated; // Retornando objeto creado
        },
        
        valueJSON: function (object, defaultValue) {
            jQuery(this).each(function () {
                var component = jQuery(this), keyJson = component.data("keyvalue");
                
                if (softtion.isString(keyJson)) {
                    var keysJson = keyJson.split(".");
                    
                    if (keysJson.has(1)) {
                        component.value(
                            Module.getKeyJson(keysJson[0], object, defaultValue)
                        );
                    } else {
                        object = undefined; var size = keysJson.length - 1;

                        for (var index = 0; index < size; index++) {
                            object = softtion.isUndefined(object) ? 
                                object[keysJson[index]] : object[keysJson[index]];

                            if (softtion.isUndefined(object)) { break; }
                        }

                        component.value(
                            Module.getKeyJson(keysJson[size], object, defaultValue)
                        );
                    }
                }
            });
        },
        
        cleanInput: function () {
            jQuery(this).removeClass("error").removeClass("active");
        },
        
        fixed: function () {
            var element = this[0], parent = element.offsetParent,
                top = element.offsetTop, left = element.offsetLeft;
            
            while (softtion.isDefined(parent)) {
                top += parent.offsetTop; left += parent.offsetLeft;
                
                parent = parent.offsetParent;
            } // El elemento esta contenido en otro
            
            return { top: top, left: left };
        }
    });
    
    jQuery.extend({
        registerCubicBiezer: function (functionName, cubicBezierArray) {
            if (jQuery.isArray(functionName)) {
                cubicBezierArray = functionName; // Valores de la función
                
                functionName = 'cubbez_' + cubicBezierArray.join('_').replace(/\./g, 'p');
            } // Definiendo nombre de la función Cubic Bezier
            
            if (typeof jQuery.easing[functionName] !== "function") {
                var polyBez = function (p1, p2) {
                    var A = [null, null], B = [null, null], C = [null, null],
                            
                        bezCoOrd = function (t, ax) {
                            C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                            return t * (C[ax] + t * (B[ax] + t * A[ax]));
                        },
                                
                        xDeriv = function (t) {
                            return C[0] + t * (2 * B[0] + 3 * A[0] * t);
                        },
                                
                        xForT = function (t) {
                            var x = t, i = 0, z;
                            
                            while (++i < 14) {
                                z = bezCoOrd(x, 0) - t;
                                
                                if (Math.abs(z) < 1e-3) { break; }
                                
                                x -= z / xDeriv(x);
                            }
                            
                            return x;
                        };
                        
                    return function (t) {
                        return bezCoOrd(xForT(t), 1);
                    };
                };
                
                jQuery.easing[functionName] = function (x, t, b, c, d) {
                    return c * polyBez([cubicBezierArray[0], cubicBezierArray[1]], [cubicBezierArray[2], cubicBezierArray[3]])(t / d) + b;
                };
            }
            
            return functionName; // Retornando nombre de la función registrada
        }
    });
    
    // Registrando funciones Cubic Biezer de Material Design
    jQuery.registerCubicBiezer("standardCurve",[0.4, 0.2, 0, 1]);
    jQuery.registerCubicBiezer("easingOut",[0, 0, 0.2, 1]);
    jQuery.registerCubicBiezer("easingIn",[0.4, 0, 0, 1]);
    jQuery.registerCubicBiezer("sharpCurve",[0.4, 0, 0.6, 1]);
});