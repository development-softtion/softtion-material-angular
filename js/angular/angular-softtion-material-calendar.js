
/*
 Angular Softtion Material Calendar
 (c) 2017 - 2018 Softtion Developers
 http://material.softtion.com
 License: MIT
 Created: 10/Oct/2017
 Updated: 26/Jun/2018
*/

((factory) => {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("Softtion Material requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})((softtion, angular) => {
    
    var ngMaterial = angular.module("ngSofttionMaterial"),
        MANAGER_DATETIME = Softtion.MANAGER_DATETIME;
        
    function GET_INSTANCE_SOFTTION_MATERIAL() {
        return {
            components: {
                Calendar: Directives.create(Directives.Calendar)
            }
        };
    }
    
    function ManagerCalendar() { 
        this.calendar = {}; // Contenedor de eventos
    }
    
    ManagerCalendar.prototype.addEvent = addEvent;
    ManagerCalendar.prototype.removeEvent = removeEvent;
    ManagerCalendar.prototype.moveEvent = moveEvent;
    
    ManagerCalendar.prototype.getEvenstOfYear = getEvenstOfYear;
    ManagerCalendar.prototype.getEvenstOfMonth = getEvenstOfMonth;
    ManagerCalendar.prototype.getEvenstOfDay = getEvenstOfDay;
    
    function addEvent() {
        var self = this; // Instancia de ManagerCalendar

        switch (arguments.length) {
            case (2):
                return addEventWithDate(
                    self, 
                    arguments[0], // Fecha
                    arguments[1]  // Evento
                );

            case (4):
                return addEventWithParameters(
                    self,
                    arguments[0], // Año
                    arguments[1], // Mes
                    arguments[2], // Día
                    arguments[3]  // Evento
                );

            default: return false;
        }
    }
    
    function addEventWithParameters(manager, year, month, day, event) {
        var calendarDay = 
                manager.getEvenstOfDay(year, month, day);
        
        calendarDay.push(event); return true; // Agregado
    }

    function addEventWithDate(manager, date, event) {
        if (softtion.isDate(date)) {
            var year = date.getFullYear(),
                day = date.getDate(),
                month = date.getMonth();

            return addEventWithParameters(manager, year, month, day, event);
        } 

        return false; // No se puede agregar evento
    }

    function removeEvent() {
        var self = this; // Instancia de ManagerCalendar

        switch (arguments.length) {
            case (2):
                return removeEventWithDate(
                    self,
                    arguments[0], // Fecha
                    arguments[1]  // Evento
                );

            case (4):
                return removeEventWithParameters(
                    self,
                    arguments[0], // Año
                    arguments[1], // Mes
                    arguments[2], // Día
                    arguments[3]  // Evento
                );

            default: return false;
        }
    }

    function removeEventWithParameters(manager, year, month, day, event) {
        var calendarYear = manager.calendar[year];
        
        if (softtion.isUndefined(calendarYear)) return false;        

        var calendarMonth = calendarYear[month];

        if (softtion.isUndefined(calendarMonth)) return false;

        var calendarDay = calendarMonth[day];

        if (!softtion.isArray(calendarDay)) return false;

        calendarDay.removeObject(event); return true; // Removido
    }

    function removeEventWithDate(manager, date, event) {
        if (softtion.isDate(date)) {
            var year = date.getFullYear(),
                day = date.getDate(),
                month = date.getMonth();

            return removeEventWithParameters(manager, year, month, day, event);
        }

        return false; // No se puede remover evento
    }

    function moveEvent() {
        var self = this; // Instancia de ManagerCalendar

        switch (arguments.length) {
            case (3):
                return moveEventWithDate(
                    self,
                    arguments[0], // Fecha evento
                    arguments[1], // Fecha nueva
                    arguments[2]  // Evento
                );

            case (7):
                return moveEventWithParameters(
                    self,
                    {
                        year: arguments[0], // Año evento
                        month: arguments[1], // Mes evento
                        day: arguments[2] // Día evento
                    }, 
                    {
                        year: arguments[3], // Año nuevo
                        month: arguments[4], // Mes nuevo
                        day: arguments[5] // Día nuevo
                    },
                    arguments[6]  // Evento
                );

            default: return false;
        }
    }

    function moveEventWithParameters(manager, dateNow, dateNew, event) {
        var year = dateNow.year,    // Año actual
            month = dateNow.month,  // Mes actual
            day = dateNow.day,      // Día actual
            
            remove =  // Resultado de remover evento
                removeEventWithParameters(manager, year, month, day, event);

        if (remove) {
            year = dateNew.year;    // Año nuevo
            month = dateNew.month;  // Mes nuevo
            day = dateNew.day;      // Día nuevo
            
            return addEventWithParameters(manager, year, month, day, event);
        } // se removio, agregando en fecha establecida

        return false; // No se encontro evento para Remover
    }

    function moveEventWithDate(manager, dateNow, dateNew, event) {
        if (softtion.isDate(dateNow) && softtion.isDate(dateNew)) {
            return moveEventWithParameters(
                    manager,
                    {
                        year: dateNow.getFullYear(), // Año evento
                        day: dateNow.getDate(), // Día evento
                        month: dateNow.getMonth() // Mes evento
                    }, 
                    {
                        year: dateNew.getFullYear(), // Año nuevo
                        day: dateNew.getDate(), // Día nuevo
                        month: dateNew.getMonth() // Mes nuevo
                    },
                    event
                );
        }
        
        return false; // NO se puede mover evento
    }
            
    function getEvenstOfYear(year) {
        var calendarYear = undefined; // Eventos del año
        
        if (softtion.isUndefined(this.calendar[year]))
            this.calendar[year] = {}; // Iniciando año
        
        calendarYear = this.calendar[year]; return calendarYear; 
    }
    
    function getEvenstOfMonth(year, month) {
        var calendarYear = this.getEvenstOfYear(year),
            calendarMonth = undefined; // Eventos del mes
        
        if (softtion.isUndefined(calendarYear[month]))
            calendarYear[month] = {}; // Iniciando mes
        
        calendarMonth = calendarYear[month]; return calendarMonth; 
    }
    
    function getEvenstOfDay() {
        var self = this; // Instancia de ManagerCalendar

        switch (arguments.length) {
            case (1):
                return getEvenstOfDayWithDate(
                    self,
                    arguments[0] // Fecha
                );

            case (3):
                return getEvenstOfDayWithParameters(
                    self,
                    arguments[0], // Año
                    arguments[1], // Mes
                    arguments[2]  // Día
                );

            default: return undefined;
        }
    }

    function getEvenstOfDayWithParameters(manager, year, month, day) {
        var calendarMonth = manager.getEvenstOfMonth(year, month),
            calendarDay = undefined; // Eventos del día
        
        if (!softtion.isArray(calendarMonth[day]))
            calendarMonth[day] = []; // Iniciando día
        
        calendarDay = calendarMonth[day]; return calendarDay; 
    }

    function getEvenstOfDayWithDate(manager, date) {
        if (!softtion.isDate(date)) return undefined; // Sin busqueda

        var year = date.getFullYear(),
            day = date.getDate(),
            month = date.getMonth();

        return getEvenstOfDayWithParameters(manager, year, month, day);
    }
        
    function Directives(name) { 
        switch (name) {
            case (Directives.Calendar.NAME): return Directives.Calendar;
        }
    }
    
    Directives.create = function (key) {
        var directive = this(key.NAME); // Directiva a instanciar
        
        return {
            directive: directive,       // Función
            name: directive.KEY,        // Clave
            route: directive.ROUTE,     // Ruta en caché
            html: directive.HTML        // Html en caché
        };
    };
    
    // Directiva: Calendar
    // Version: 1.0.8
    // Updated: 27/Jun/2018
    
    Directives.Calendar = CalendarDirective;
    
    Directives.Calendar.NAME = "Calendar";
    Directives.Calendar.VERSION = "1.0.8";
    Directives.Calendar.KEY = "calendar";
    Directives.Calendar.ROUTE = "softtion/template/calendar.html";
    
    Directives.Calendar.HTML = function () {
        var header = softtion.html("div").addClass("header").
                addChildren(
                    softtion.html("button").addClass(["action", "left"]).
                        addAttribute("ng-click", "prevMonth()").
                        addAttribute("ng-disabled", "isPrevDisabled()").
                        addAttribute("ng-hide", "viewDayEvents").
                        addChildren(
                            softtion.html("i").setText("chevron_left")
                        )
                ).addChildren(
                    softtion.html("button").addClass(["action", "back"]).
                        addAttribute("ng-click", "hideDayEvents()").
                        addAttribute("ng-hide", "!viewDayEvents").
                        addChildren(
                            softtion.html("i").setText("arrow_back")
                        )
                ).addChildren(
                    softtion.html("div").addClass("title").setText("{{getTitle()}}")
                ).addChildren(
                    softtion.html("button").addClass(["action", "right"]).
                        addAttribute("ng-click", "nextMonth()").
                        addAttribute("ng-disabled", "isNextDisabled()").
                        addAttribute("ng-hide", "viewDayEvents").
                        addChildren(
                            softtion.html("i").setText("chevron_right")
                        )
                ).addChildren(
                    softtion.html("div").addClass("actions").
                        addChildren(
                            softtion.html("i").setText("event").
                                addAttribute("ng-hide", "ngDisabledEdit").
                                addAttribute("ng-dragleave", "dragLeaveAction($element)").
                                addAttribute("ng-drop", "dropAction($element, 1)").
                                addAttribute("ng-dragover", "dragOverAction($element, $event)")
                        ).
                        addChildren(
                            softtion.html("i").setText("delete").
                                addAttribute("ng-hide", "ngDisabledRemove").
                                addAttribute("ng-dragleave", "dragLeaveAction($element)").
                                addAttribute("ng-drop", "dropAction($element, 2)").
                                addAttribute("ng-dragover", "dragOverAction($element, $event)")
                        ).addChildren(
                            softtion.html("i").setText("edit").
                                addAttribute("ng-hide", "ngDisabledEdit").
                                addAttribute("ng-dragleave", "dragLeaveAction($element)").
                                addAttribute("ng-drop", "dropAction($element, 3)").
                                addAttribute("ng-dragover", "dragOverAction($element, $event)")
                        )
                );

        var head = softtion.html("div").addClass("head").
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

        var body = softtion.html("div").addClass(["body", "animate", "easing-out"]).
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
                                addAttribute("ng-click", "showDayEvents(day)").
                                addAttribute("ng-class", 
                                    "{ inactive: isDayCalendarInactive(day),"
                                     + " today: isToday(day.number),"
                                     + " disabled: isDayDisabled(day.number) }"
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
                                        addAttribute("ng-dblclick", "selectEvent(event, day.number)").
                                        addChildren(
                                            softtion.html("p").setText("{{getTitleEvent(event, $index)}}")
                                        )
                                )
                        )
                );

        var content = softtion.html("div").addClass("content").
                addAttribute("ng-hide", "viewDayEvents").
                addChildren(
                    softtion.html("div").addClass("table").
                        addChildren(head).addChildren(body)
                );

        var events = softtion.html("div").addClass("list-events").
                addAttribute("ng-hide", "!viewDayEvents").
                addAttribute("ng-class", "{bordered: events.isEmpty()}").
                addChildren(
                    softtion.html("div").addClass("head").setText("{{getTitleDay()}}")
                ).addChildren(
                    softtion.html("ul").
                        addAttribute("ng-hide", "events.isEmpty()").
                        addChildren(
                            softtion.html("li").addClass("item-list").
                                addAttribute("ng-repeat", "event in events").
                                addChildren(
                                    softtion.html("div").addClass("content").
                                        addChildren(
                                            softtion.html("label").addClass("title").
                                                setText("{{getTitleEvent(event, $index)}}")
                                        ).addChildren(
                                            softtion.html("p").addClass("description").
                                                setText("{{getDescriptionEvent(event)}}")
                                        ).addChildren(
                                            softtion.html("div").addClass("actions").
                                                addChildren(
                                                    softtion.html("button").addClass(["action", "left"]).
                                                        addAttribute("ng-click", "showEventAction(event)").
                                                        addAttribute("ng-hide", "ngDisabledRemove").
                                                        addChildren(
                                                            softtion.html("i").setText("visibility")
                                                        )
                                                ).addChildren(
                                                    softtion.html("button").addClass("action").
                                                        addAttribute("ng-click", "deleteEventAction(event)").
                                                        addAttribute("ng-hide", "ngDisabledRemove").
                                                        addChildren(
                                                            softtion.html("i").setText("delete")
                                                        )
                                                ).addChildren(
                                                    softtion.html("button").addClass("action").
                                                        addAttribute("ng-click", "moveEventAction(event)").
                                                        addAttribute("ng-hide", "ngDisabledMove").
                                                        addChildren(
                                                            softtion.html("i").setText("event")
                                                        )
                                                ).addChildren(
                                                    softtion.html("button").addClass("action").
                                                        addAttribute("ng-click", "editEventAction(event)").
                                                        addAttribute("ng-hide", "ngDisabledEdit").
                                                        addChildren(
                                                            softtion.html("i").setText("edit")
                                                        )
                                                )
                                        )
                                )
                        )
                ).addChildren(
                    softtion.html("div").addClass("message").
                        addAttribute("ng-hide", "!events.isEmpty()").
                        addChildren(
                            softtion.html("i").setText("event")
                        ).
                        addChildren(
                            softtion.html("p").setText("No hay eventos registrados")
                        )
                );
        
        var datePicker = softtion.html("div").addClass("datepicker-dialog").
                addAttribute("ng-model", "datePicker").
                addAttribute("ng-open", "showPicker").
                addAttribute("parent", "{{parentDialog}}").
                addAttribute("min-date", "minDate").
                addAttribute("max-date", "maxDate").
                addAttribute("year-range","10").
                addAttribute("ng-disabled-date", "ngDisabledDate($date)").
                addAttribute("ng-listener", "listenerDateDialog($listener, $model)");

        return header + content + events + datePicker; // Componente
    };
    
    function CalendarDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Calendar.ROUTE,
            scope: {
                manager: "=ngModel",
                ngDisabledMove: "=?",
                ngDisabledRemove: "=?",
                ngDisabledEdit: "=?",
                keyTitle: "@",
                ngFormatTitle: "&",
                keyDescription: "@",
                ngFormatDescription: "&",

                minDate: "=?",
                maxDate: "=?",
                parentDialog: "@",
                ngDisabledDate: "&",

                // Eventos
                ngListener: "&"
            }, 
            link: function ($scope, $element) {
                    // Componentes
                var table = $element.find(".body");

                    // Atributos
                var today = new Date(), eventSelect, dayEvent;

                $scope.manager = new ManagerCalendar();

                $scope.ngListener({ 
                    $listener: Softtion.LISTENERS.SHOW, $model: $scope.manager 
                });

                $scope.$watch(() => { return $scope.manager; },
                    (newValue, oldValue) => {
                        if (newValue === oldValue) return; // No hay cambios

                        if (!(newValue instanceof ManagerCalendar)) 
                            $scope.manager = oldValue; // Instancia incorrecta
                    });

                // Atributos de control
                $scope.date = new Date(); $scope.date.setDate(1);

                $scope.year = $scope.date.getFullYear(); 
                $scope.month = $scope.date.getMonth();

                $scope.events = []; $scope.daysWeek = []; // Dias de la semana

                var daysWeekMin = MANAGER_DATETIME.DAYS_OF_WEEK_MIN,
                    daysWeek = MANAGER_DATETIME.DAYS_OF_WEEK;

                for (var i = 0; i < 7; i++) {
                    $scope.daysWeek.push({
                        normal: daysWeek[i], min: daysWeekMin[i]
                    });
                } // Cargando nombre de los dias

                $scope.nameMonths = MANAGER_DATETIME.MONTHS_OF_YEAR;
                $scope.daysMonth = MANAGER_DATETIME.DAYS_OF_MONTHS;

                refreshCalendarMonth(); // Inicializar calendario

                $scope.getTitle = function () {
                    return $scope.year + ", " + $scope.nameMonths[$scope.month];
                };

                $scope.isDayCalendarInactive = function (day) {
                    return softtion.isUndefined(day.number);
                };

                $scope.isDayDisabled = function (day) {
                    if (softtion.isUndefined(day)) return true; // Dia inválido

                    return validateDateEnabled(instanceDate(day));
                };

                $scope.prevMonth = function () {
                    $scope.month--; // Disminuyendo el mes

                    if ($scope.month < 0) {
                        $scope.year--; $scope.month = 11;
                        $scope.date.setFullYear($scope.year);
                    } // Desendio de año

                    $scope.date.setMonth($scope.month);
                    refreshCalendarMonth(); table.addClass("slide-in-left");

                    setTimeout(() => { table.removeClass("slide-in-left"); }, 300);
                };

                $scope.isPrevDisabled = function () {
                    if (!softtion.isDate($scope.minDate)) return false;
                    
                    var month = $scope.month - 1, year = $scope.year;

                    if (month < 0) { 
                        month = 11; year--;
                    } // Se paso para mes del año anterior

                    if (year < $scope.minDate.getFullYear()) {
                        return true;
                    } else if (year === $scope.minDate.getFullYear()) {
                        return (month < $scope.minDate.getMonth());
                    } // El mes anterior esta fuera del rango
                    
                    return false; // Puede regresar al mes anterior
                };

                $scope.nextMonth = function () {
                    $scope.month++; // Aumentando el mes

                    if ($scope.month > 11) {
                        $scope.year++; $scope.month = 0;
                        $scope.date.setFullYear($scope.year);
                    } // Aumento de año

                    $scope.date.setMonth($scope.month);
                    refreshCalendarMonth(); table.addClass("slide-in-right");

                    setTimeout(() => { table.removeClass("slide-in-right"); }, 300);
                };

                $scope.isNextDisabled = function () {
                    if (!softtion.isDate($scope.maxDate)) return false;
                    
                    var month = $scope.month + 1, year = $scope.year;

                    if (month > 12) { 
                        month = 0; year++;
                    } // Sobrepaso mes del año siguiente

                    if (year > $scope.maxDate.getFullYear()) {
                        return true;
                    } else if (year === $scope.maxDate.getFullYear()) {
                        return (month > $scope.maxDate.getMonth());
                    } // El mes siguiente esta fuera del rango

                    return false; // Se puede avanzar de fecha Actual
                };
                
                $scope.getTitleEvent = function (event, $index) {
                    var title = $scope.ngFormatTitle({$event: event, $index: $index});
                    
                    if (softtion.isText(title)) return title;
                    
                    if (softtion.isText(event)) return event;
                    
                    if (softtion.isText($scope.keyTitle)) {
                        title = softtion.findKey(event, $scope.keyTitle);
                        
                        if (softtion.isText(title)) return title;
                    } // Se debe buscar título en el objeto
                    
                    return "Evento " + ($index + 1); // Título por defecto
                };
                
                $scope.getDescriptionEvent = function (event) {
                    var description = $scope.ngFormatDescription({$event: event});
                    
                    if (softtion.isText(description)) return description;
                    
                    if (softtion.isText(event)) return "";
                    
                    if (softtion.isText($scope.keyDescription)) {
                        description = softtion.findKey(event, $scope.keyDescription);
                        
                        if (softtion.isText(description)) return description;
                    } // Se debe buscar descripcion en el objeto
                    
                    return ""; // No se ha definido clave para descripción
                };
                
                $scope.dragOverAction = function ($element, $event) {
                    $element.addClass("dragover"); $event.preventDefault();
                };

                $scope.dragLeaveAction = function ($element) {
                    $element.removeClass("dragover"); // Quitando efecto
                };

                $scope.dropAction = function ($element, action) {
                    $element.removeClass("dragover"); // Quitando efecto
                    
                    var date = instanceDate(dayEvent); // Fecha
                    
                    switch (action) {
                        case (1): // Mover con datepicker
                            $scope.dateSelect = date; $scope.showPicker = true;
                        break;
                        
                        case (2): // Eliminar
                            deleteEvent(date, eventSelect);
                        break;
                        
                        case (3): // Editar evento
                            editEvent(date, eventSelect);
                        break;
                    }
                };
                
                $scope.dragOverDay = function ($element, $event) {
                    if ($scope.ngDisabledMove) return; // Inhabilitado

                    $element.addClass("dragover"); $event.preventDefault();
                };

                $scope.dragLeaveDay = function ($element) {
                    if ($scope.ngDisabledMove) return; // Inhabilitado

                    $element.removeClass("dragover"); // Efecto
                };
                
                $scope.selectEvent = function (event, day) {
                    showEvent(instanceDate(day), event);
                };

                $scope.dragStartEvent = function (event, day, $element) {
                    eventSelect = event; dayEvent = day; 
                    $element.addClass("dragover"); // Inicio de arrastre
                };

                $scope.dragEndEvent = function ($element) {
                    $element.removeClass("dragover"); // Fin de arrastre
                };

                $scope.dropDay = function ($element, dayNew) {
                    if ($scope.ngDisabledMove) return; // Inhabilitado

                    $element.removeClass("dragover"); // Efecto

                    if (dayNew === dayEvent) return; // No hay cambio de día
                    
                    var dateEvent = instanceDate(dayEvent),
                        dateNew = instanceDate(dayNew);
                
                    moveEvent(eventSelect, dateEvent, dateNew); // Cambio
                };
                
                $scope.getTitleDay = function () {
                    return !softtion.isDate($scope.dateSelect) ? 
                        "No hay día seleccionado" :
                        $scope.dateSelect.getFormat("ww, dd de mn del aa");
                };

                $scope.isToday = function (day) {
                    return (!softtion.isDefined(day)) ? false :
                        today.equalsDate($scope.year, $scope.month, day);
                };

                $scope.showDayEvents = function (day) {
                    $scope.viewDayEvents = true; 
                    dayEvent = day.number;
                    $scope.events = day.events;

                    $scope.dateSelect = instanceDate(dayEvent);
                };

                $scope.hideDayEvents = function () { $scope.viewDayEvents = false; };

                $scope.showEventAction = function (event) {
                    showEvent(instanceDate(dayEvent), event);
                };

                $scope.deleteEventAction = function (event) {
                    deleteEvent(instanceDate(dayEvent), event);
                };

                $scope.moveEventAction = function (event) {
                    $scope.showPicker = true; eventSelect = event;
                };

                $scope.editEventAction = function (event) {
                    editEvent(instanceDate(dayEvent), event);
                };

                $scope.listenerDateDialog = function ($listener, $model) {
                    switch ($listener) {
                        case (Softtion.LISTENERS.SELECT):
                            if ($scope.dateSelect.equals($model)) return;
                            
                            moveEvent(eventSelect, $scope.dateSelect, $model); 
                        break;
                    }
                };

                function refreshCalendarMonth() {
                    $scope.calendarMonth = newCalendarMonth();
                    createCalendarMonth(); // Cargando eventos
                }

                function newCalendarMonth() {
                    var calendarMonth = []; // Mes

                    for (var i = 0; i < 6; i++) {
                        var week = []; // Semana nueva

                        for (var j = 0; j < 7; j++) {
                            week.push({});
                        } // Cargando dias en la Semana

                        calendarMonth.push(week);
                    } // Cargando semanas en el Mes

                    return calendarMonth; // Sin eventos
                }

                function createCalendarMonth() {
                    var countDay = 1, firstWeek = $scope.calendarMonth[0],
                        daysMonth = $scope.daysMonth[$scope.month];

                    if ($scope.month === 1 && softtion.isLeapYear($scope.year))
                        daysMonth++; // El mes es Febrero y el año es biciesto

                    for (var i = $scope.date.getDay(); i < 7; i++) {
                        var events = $scope.manager.
                                getEvenstOfDay($scope.year, $scope.month, countDay);

                        firstWeek[i] = { number: countDay, events: events }; countDay++;
                    } // Cargando dias hábiles de la primera Semana

                    var stop = false, weekCount = 1, dayWeek = 0;

                    while (!stop) {
                        var week = $scope.calendarMonth[weekCount],
                            events = $scope.manager.
                                getEvenstOfDay($scope.year, $scope.month, countDay);

                        week[dayWeek] = { number: countDay, events: events }; 
                        countDay++; dayWeek++; // Aumentando

                        if (dayWeek > 6) { weekCount++; dayWeek = 0; } // Siguiente semana

                        stop = (countDay > daysMonth);
                    } // Cargando las otras semanas del Mes
                }
                
                function instanceDate(day) {
                    return new Date($scope.year, $scope.month, day);
                }
    
                function validateDateEnabled(date) {
                    var result = $scope.ngDisabledDate({$date: date});

                    return result || // Validación personalizada
                        // Validación fecha mínima
                        (softtion.isDate($scope.minDate) && 
                        date.getTime() < $scope.minDate.getTime()) ||
                        // Validación fecha máxima
                        (softtion.isDate($scope.maxDate) &&
                        date.getTime() > $scope.maxDate.getTime());
                }
                
                function showEvent(date, event) {
                    $scope.ngListener({
                        $listener: Softtion.LISTENERS.SELECT, 
                        $model: event, $date: { now: date }
                    });
                }
                
                function moveEvent(event, dateEvent, dateNew) {
                    var result = $scope.manager.
                            moveEvent(dateEvent, dateNew, event);
                    
                    if (result) // Evento se cambio correctamente
                        $scope.ngListener({
                            $listener: Softtion.LISTENERS.CHANGED, 
                            $model: eventSelect, 
                            $date: { now: dateEvent, new: dateNew }
                        });
                }
                
                function deleteEvent(date, event) {
                    $scope.manager.removeEvent(date, event);

                    $scope.ngListener({
                        $listener: Softtion.LISTENERS.REMOVE,
                        $model: event, $date: { now: date }
                    });
                }
                
                function editEvent(date, event) {
                    $scope.ngListener({
                        $listener: Softtion.LISTENERS.EDIT, 
                        $model: event, $date: { now: date }
                    });
                }
            }
        };
    }
    
    var Material = GET_INSTANCE_SOFTTION_MATERIAL();
    
    // Rutas virtuales de los componentes SofttionMaterial
    ngMaterial.run(["$templateCache", ($templateCache) => {
            
        angular.forEach(Material.components, (component) => {
            if (softtion.isDefined(component.route)) {
                $templateCache.put(component.route, component.html());
            }
        });
    }]);
    
    // Directivas de Calendar
    angular.forEach(Material.components, (component) => {
        ngMaterial.directive(component.name, component.directive);
    });
});