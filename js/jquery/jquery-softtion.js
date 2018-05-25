/*
 jQuery Softtion v1.6.2
 (c) 2016 - 2018 Softtion Developers 
 http://jquery.softtion.com
 License: MIT
 Updated: 01/Abr/2018
 */

((factory) => {
    if (typeof jQuery === "function" && typeof window.softtion === "object") {
        factory(jQuery, window.softtion);
    } else { 
        throw new Error("jQuery Softtion requiere jQuery y Softtion cargado en la Aplicación");
    } // No se ha cargado jQuery y Softtion
})((jQuery, softtion) => {
    
    jQuery.fn.extend({
        tagName: function () { 
            return jQuery(this).prop("tagName"); 
        },
        
        tagIs: function (tagName) {
            return (jQuery(this).tagName() === tagName);
        },
        
        exists: function () { 
            return jQuery(this).length > 0; 
        },
        
        scrollWidth: function () { 
            return jQuery(this).prop("scrollWidth"); 
        },
        
        scrollHeight: function () { 
            return jQuery(this).prop("scrollHeight"); 
        },
        
        isScrollXEnd: function (discount) { 
            discount = isNaN(discount) ? 0 : discount;
            
            var $element = jQuery(this), // Elemento
                scroll = $element.width() + $element.scrollLeft();
            
            return (scroll >= ($element.scrollWidth() - discount)); 
        },
        
        isScrollYEnd: function (discount) { 
            discount = isNaN(discount) ? 0 : discount;
            
            var $element = jQuery(this), // Elemento
                scroll = $element.height() + $element.scrollTop();
            
            return (scroll >= ($element.scrollHeight() - discount)); 
        },
        
        fixed: function () {
            var element = this[0], 
                parent = element.offsetParent,
                top = element.offsetTop,
                left = element.offsetLeft;
            
            while (softtion.isDefined(parent)) {
                top += parent.offsetTop; 
                left += parent.offsetLeft;
                
                parent = parent.offsetParent;
            } // El elemento esta contenido en otro
            
            return { top: top, left: left };
        },
        
        positionParent: function (selector) {
            var element = jQuery(this), 
                left = element.offset().left,
                top = element.offset().top;
            
            if (softtion.isString(selector)) {
                var parent = element.parents(selector);
                
                if (parent.exists()) {
                    left = left - parent.offset().left;
                    top = top - parent.offset().top;
                }
            } // Se ha definido selector del padre
            
            if (softtion.isjQuery(selector)) {
                left = left - selector.offset().left;
                top = top - selector.offset().top;
            } // Se ha definido elemento padre del componente
            
            return { top: top, left: left }; // Posicion en contenido
        },
        
        getCursorPosition: function() {
            var element = jQuery(this).get(0), position = -1;
            
            if ("selectionStart" in element) {
                position = element.selectionStart;
            } else if ("selection" in document) {
                element.focus();
                
                var selection = document.selection.createRange(),
                    length = document.selection.createRange().text.length;
            
                selection.moveStart("character", -element.value.length);
                position = selection.text.length - length;
            }
            
            return position; // Posición del cursor en componente texto
        },
        
        // Eventos
        
        hasEventListener: function (eventName, namespace) {
            var element = jQuery(this), returnValue = false,
                events = jQuery._data(element[0], "events");
                
            if (events) {
                jQuery.each(events, (index, value) => {
                    if (!validateEvents(index, eventName)) return;
                    
                    if (!namespace) {
                        returnValue = true; return false;
                    } // No se definio namespace
                    
                    jQuery.each(value, (index, value) => {
                        if (value.namespace === namespace) {
                            returnValue = true; return false;
                        } // Namespace coincide en el componente
                    });
                });
            } // Tiene eventos el componente
            
            return returnValue; // Verificar si evento esta definido
        },
        
        enter: function (callback) {
            var component = jQuery(this); // Componente
            
            if (component.tagName() === "INPUT" || component.tagName() === "TEXTAREA") {
                component.keyup((event) => {
                    if (event.which !== 13) return; // No Presiono ENTER
                    
                    if (softtion.isFunction(callback)) callback(event, component);
                });
            } // Componente es un INPUT
            
            return component; // Retornando interfaz fluida
        },
        
        mousehold: function (callback, time) {
            time = isNaN(time) ? 1000 : time; // Definiendo tiempo
            
            var component = jQuery(this), timeout = undefined;
                
            component.mousedown((event) => {
                timeout = setTimeout(() => { callback(event); }, time);
            });
            
            component.mouseup(() => { clearTimeout(timeout); });
            
            component.mousemove(() => { clearTimeout(timeout); });
            
            return component; // Retornando para interfaz fluida
        },
        
        touchstart: function (callback) {
            var component = jQuery(this); // Componente para evento
            
            component[0].addEventListener("touchstart", callback, false);
            
            return component; // Retornando para interfaz fluida
        },
        
        touchmove: function (callback) {
            var component = jQuery(this); // Componente para evento
            
            component[0].addEventListener("touchmove", callback, false);
            
            return component; // Retornando para interfaz fluida
        },
        
        touchcancel: function (callback) {
            var component = jQuery(this); // Componente para evento
            
            component[0].addEventListener("touchcancel", callback, false);
            
            return component; // Retornando para interfaz fluida
        },
        
        touchend: function (callback) {
            var component = jQuery(this); // Componente para evento
            
            component[0].addEventListener("touchend", callback, false);
            
            return component; // Retornando para interfaz fluida
        },
        
        touchhold: function (callback, time) {
            time = isNaN(time) ? 1000 : time; // Definiendo tiempo
            
            var component = jQuery(this), timeout = undefined;
                
            component.touchstart((event) => {
                timeout = setTimeout(() => { callback(event); }, time);
            });
            
            component.touchend(() => { clearTimeout(timeout); });
            
            component.touchmove(() => { clearTimeout(timeout); });
            
            return component; // Retornando para interfaz fluida
        },
        
        pointerdown: function (callback) {
            var component = jQuery(this), // Componente para evento
                fn = function (event) { callback(event); };
            
            component.mousedown(fn).touchstart(fn);
            
            return component; // Retornando para interfaz fluida
        },
        
        pointermove: function (callback) {
            var component = jQuery(this), // Componente para evento
                fn = function (event) { callback(event); };
            
            component.mousemove(fn).touchmove(fn);
            
            return component; // Retornando para interfaz fluida
        },
        
        pointerup: function (callback) {
            var component = jQuery(this), // Componente para evento
                fn = function (event) { callback(event); };
            
            component.mouseup(fn).touchend(fn);
            
            return component; // Retornando para interfaz fluida
        },
        
        pointerhold: function (callback, time) {
            var component = jQuery(this), // Componente para evento
                fn = function (event) { callback(event); };
            
            component.mousehold(fn, time).touchhold(fn, time);
            
            return component; // Retornando para interfaz fluida
        },
        
        transition: function (transition) {
            jQuery(this).css({
                WebkitTransition: transition, MozTransition: transition, transition: transition
            });
        },
        
        animation: function (animation) {
            jQuery(this).css({
                WebkitAnimation: animation, MozAnimation: animation, animation: animation
            });
        },
        
        transitionstart: function (callback) {
            var component = jQuery(this), // Componente para evento
                transition = getTransitionWhich(this[0], false);
            
            component.on(transition, (event) => { callback(event); });
            
            return component; // Retornando para interfaz fluida
        },
        
        transitionend: function (callback) {
            var component = jQuery(this), // Componente para evento
                transition = getTransitionWhich(this[0], true);
            
            component.on(transition, (event) => { callback(event); });
            
            return component; // Retornando para interfaz fluida
        },
        
        animationstart: function (callback) {
            var component = jQuery(this), // Componente para evento
                animation = getAnimationWhich(this[0], false);
            
            component.on(animation, (event) => { callback(event); });
            
            return component; // Retornando para interfaz fluida
        },
        
        animationend: function (callback) {
            var component = jQuery(this), // Componente para evento
                animation = getAnimationWhich(this[0], true);
            
            component.on(animation, (event) => { callback(event); });
            
            return component; // Retornando para interfaz fluida
        },
        
        displaceLeft: function (callback) {
            var draggActive = false, positionX = -1,
                component = jQuery(this),
                
                triggerCallback = function (name, event) {
                    if (softtion.isFunction(callback)) callback(name, event);
                };
                                
            component.on("mousedown", (event) => {
                draggActive = true; positionX = event.originalEvent.x;
                triggerCallback("start", event); // Inicio 
            });
            
            component.on("touchstart", (event) => {
                var touches = event.originalEvent.targetTouches;
                
                if (!touches) return; // No hay resultados
                
                draggActive = true; positionX = touches[0].clientX;
                triggerCallback("start", event); // Inicio 
            });

            component.on("mousemove", (event) => {
                if (!draggActive) return; // Arrastre no esta activado
                
                var positionNew = event.originalEvent.x,
                    scrollLeft = component.scrollLeft();

                if (positionX > positionNew) {
                    scrollLeft = scrollLeft + (positionX - positionNew);
                    component.scrollLeft(scrollLeft);
                } else {
                    scrollLeft = scrollLeft - (positionNew - positionX);
                    component.scrollLeft(scrollLeft);
                } // Moviendo scroll

                positionX = positionNew; triggerCallback("displace", event);
            });
            
            component.on("touchmove", (event) => {
                if (!draggActive) return; // Arrastre no esta activado
                
                var touches = event.originalEvent.targetTouches;
                
                if (!touches) return; // No hay resultados
                
                var positionNew = touches[0].clientX,
                    scrollLeft = component.scrollLeft();

                if (positionX > positionNew) {
                    scrollLeft = scrollLeft + (positionX - positionNew);
                    component.scrollLeft(scrollLeft);
                } else {
                    scrollLeft = scrollLeft - (positionNew - positionX);
                    component.scrollLeft(scrollLeft);
                } // Moviendo scroll

                positionX = positionNew; triggerCallback("displace", event);
            });

            component.on("mouseup", (event) => {
                if (draggActive) triggerCallback("end", event); 
                
                draggActive = false; // Finalización de arrastre
            });

            component.on("touchend", (event) => {
                if (draggActive) triggerCallback("end", event); 
                
                draggActive = false; // Finalización de arrastre
            });

            component.on("mouseleave", (event) => { 
                if (draggActive) triggerCallback("leave", event); 
                
                draggActive = false; // Finalización de arrastre 
            });
        },
        
        displaceTop: function (callback) {
            var draggActive = false, positionY = -1,
                component = jQuery(this),
                
                triggerCallback = function (name, event) {
                    if (softtion.isFunction(callback)) callback(name, event);
                };
                                
            component.on("mousedown", (event) => {
                draggActive = true; positionY = event.originalEvent.y;
                triggerCallback("start", event); // Inicio 
            });

            component.on("mousemove", (event) => {
                if (!draggActive) return; // Arrastre no esta activado
                
                var positionNew = event.originalEvent.y,
                    scrollTop = component.scrollTop();

                if (positionY > positionNew) {
                    scrollTop = scrollTop + (positionY - positionNew);
                    component.scrollTop(scrollTop);
                } else {
                    scrollTop = scrollTop - (positionNew - positionY);
                    component.scrollTop(scrollTop);
                } // Moviendo scroll

                positionY = positionNew; triggerCallback("displace", event);
            });

            component.on("mouseup", (event) => {
                if (draggActive) triggerCallback("end", event); 
                
                draggActive = false; // Finalización de arrastre
            });

            component.on("mouseleave", function (event) { 
                if (draggActive) triggerCallback("leave", event); 
                
                draggActive = false; // Finalización de arrastre 
            });
        }
    });
    
    var transitionsStart = {
            estandar: "transitionstart",
            mozilla: "mozTransitionStart",
            WebkitTransition: "webkitTransitionStart"
        },
        transitionsEnd = {
            estandar: "transitionend",
            mozilla: "mozTransitionEnd",
            WebkitTransition: "webkitTransitionEnd"
        },
        animationsStart = {
            estandar: "animationstart",
            mozilla: "mozAnimationStart",
            WebkitTransition: "webkitAnimationStart"
        },
        animationsEnd = {
            estandar: "animationend",
            mozilla: "mozAnimationEnd",
            WebkitTransition: "webkitAnimationEnd"
        };
        
    function validateEvents (event, eventName) {
        return (softtion.isArray(eventName)) ?
            (eventName.indexOf(event) !== -1) : (event === eventName);
    }
        
    function getTransitionWhich(element, transitionEnd) {
        var transitions = (transitionEnd) ? // Nombres de evento
                transitionsEnd : transitionsStart;

        for (var key in transitions) {
            if (element.style[key] !== undefined) return transitions[key];
        }
    }
        
    function getAnimationWhich(element, animationEnd) {
        var animations = (animationEnd) ? // Nombres de evento
                animationsEnd : animationsStart;

        for (var key in animations) {
            if (element.style[key] !== undefined) return animations[key];
        }
    }
    
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
                            C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax]; A[ax] = 1 - C[ax] - B[ax];
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
    jQuery.registerCubicBiezer("standardCurve", [0.4, 0.2, 0, 1]);
    jQuery.registerCubicBiezer("easingOut", [0, 0, 0.2, 1]);
    jQuery.registerCubicBiezer("easingIn", [0.4, 0, 0, 1]);
    jQuery.registerCubicBiezer("sharpCurve", [0.4, 0, 0.6, 1]);
});

((jQuery) => {
    var attachEvent = document.attachEvent,
            stylesCreated = false;

    var jQuery_resize = jQuery.fn.resize;

    jQuery.fn.resize = function (callback) {
        return this.each(function () {
            (this === window) ?
                jQuery_resize.call(jQuery(this), callback) :
                addResizeListener(this, callback);
        });
    };

    jQuery.fn.removeResize = function (callback) {
        return this.each(function () {
            removeResizeListener(this, callback);
        });
    };

    if (!attachEvent) {
        var requestFrame = (function () {
            var raf = window.requestAnimationFrame || 
                window.mozRequestAnimationFrame || 
                window.webkitRequestAnimationFrame ||
                function (fn) {
                    return window.setTimeout(fn, 20);
                };
                
            return function (fn) { return raf(fn); };
        })();

        var cancelFrame = (function () {
            var cancel = window.cancelAnimationFrame || 
                window.mozCancelAnimationFrame || 
                window.webkitCancelAnimationFrame ||
                window.clearTimeout;
            
            return function (id) { return cancel(id); };
        })();

        function resetTriggers(element) {
            var triggers = element.__resizeTriggers__,
                expand = triggers.firstElementChild,
                contract = triggers.lastElementChild,
                expandChild = expand.firstElementChild;
        
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + 'px';
            expandChild.style.height = expand.offsetHeight + 1 + 'px';
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
        };

        function checkTriggers(element) {
            return element.offsetWidth !== element.__resizeLast__.width ||
                element.offsetHeight !== element.__resizeLast__.height;
        }

        function scrollListener(e) {
            var element = this; resetTriggers(this);
            
            if (this.__resizeRAF__) {
                cancelFrame(this.__resizeRAF__); }
            
            this.__resizeRAF__ = requestFrame(function () {
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function (fn) {
                        fn.call(element, e);
                    });
                }
            });
        };

        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            animationstartevent = 'animationstart',
            domPrefixes = 'Webkit Moz O ms'.split(' '),
            startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
            pfx = '';
        
        {
            var elm = document.createElement('fakeelement');
            
            if (elm.style.animationName !== undefined) { animation = true; }

            if (animation === false) {
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined) {
                        pfx = domPrefixes[ i ];
                        animationstring = pfx + 'Animation';
                        keyframeprefix = '-' + pfx.toLowerCase() + '-';
                        animationstartevent = startEvents[ i ];
                        animation = true; break;
                    }
                }
            }
        }

        var animationName = 'resizeanim';
        var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
        var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
    }

    function createStyles() {
        if (!stylesCreated) {
            //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
            var css = (animationKeyframes ? animationKeyframes : '') +
                    '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
                    '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                    head = document.head || document.getElementsByTagName('head')[0],
                    style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style); stylesCreated = true;
        }
    }

    window.addResizeListener = function (element, fn) {
        if (attachEvent)
            element.attachEvent('onresize', fn);
        else {
            if (!element.__resizeTriggers__) {
                if (getComputedStyle(element).position === 'static')
                    element.style.position = 'relative';
                createStyles();
                element.__resizeLast__ = {};
                element.__resizeListeners__ = [];
                (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
                element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
                        '<div class="contract-trigger"></div>';
                element.appendChild(element.__resizeTriggers__);
                resetTriggers(element);
                element.addEventListener('scroll', scrollListener, true);

                /* Listen for a css animation to detect element display/re-attach */
                animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
                    if (e.animationName === animationName)
                        resetTriggers(element);
                });
            }
            element.__resizeListeners__.push(fn);
        }
    };

    window.removeResizeListener = function (element, fn) {
        if (attachEvent) {
            element.detachEvent('onresize', fn);
        } else {
            element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
            if (!element.__resizeListeners__.length) {
                element.removeEventListener('scroll', scrollListener);
                element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
            }
        }
    };
})(jQuery);