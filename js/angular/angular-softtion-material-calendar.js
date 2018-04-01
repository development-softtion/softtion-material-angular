/*
 Angular Softtion Material Calendar v0.6.5
 (c) 2017 Softtion Developers
 http://material.softtion.com
 License: MIT
 Updated: 04/Nov/2017
*/
(function (factory) {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("AngularSofttion requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})(function (softtion, angular) {
    
    var ngMaterial = angular.module("ngSofttionMaterial");
    
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
    
    var Calendar = {
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
                    templateUrl: Calendar.route,
                    scope: {
                        managerCalendar: "=ngModel",
                        disabledMove: "=?",
                        disabledDelete: "=?",
                        disabledEdit: "=?",

                        minDate: "=?",
                        maxDate: "=?",
                        parentDialog: "@",
                        disabledDate: "&",
                        startComponent: "&",

                        // Eventos
                        moveEvent: "&",
                        removeEvent: "&",
                        editEvent: "&"
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
                                    $scope.removeEvent({$eventCalendar: event});
                                }
                            }, 

                            moveEvent: function (success, year, month, event) {
                                if (!success) { return; } // Función no se ejecuto

                                if (year === $scope.year && month === $scope.month) {
                                    refreshCalendarMonth();
                                } // Se movío evento en el mes activo

                                if (moveActive) {
                                    moveActive = false; // Desactivando
                                    $scope.moveEvent({$eventCalendar: event});
                                }
                            }
                        };

                        $scope.managerCalendar = 
                            ManagerCalendar.instance(EventsCalendar);
                    
                        $scope.startComponent({$calendar: $scope.managerCalendar});

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
                            $scope.editEvent({$event: event});
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
                            $scope.editEvent({$event: eventSelect});
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
        };
    
    // Rutas virtuales de los componentes SofttionMaterial
    ngMaterial.run(["$templateCache", function ($templateCache) {
        $templateCache.put(Calendar.route, Calendar.html());
    }]);
    
    // Directivas de SofttionMaterial
    ngMaterial.directive(Calendar.name, Calendar.directive);
});