
/*
 Angular Softtion Material v2.0.0
 (c) 2016 - 2018 Softtion Developers
 http://material.softtion.com
 License: MIT
 Created: 19/Nov/2016
 Updated: 26/Jun/2018
*/

((factory) => {
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("Softtion Material requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
})((softtion, angular) => {
    
    var ngMaterial = angular.
            module("ngSofttionMaterial", [ "ngSanitize", "ngSofttionEvents" ]).
            filter("filterDictionary", filterDictionary).
            service("$materialFunction", softtionMaterialFunction).
            service("$materialService", softtionMaterialService).
            constant("$materialConstant", softtionMaterialConstant()).
            constant("$materialColor", getMaterialColors());
    
        // Atributos del framework
    var MANAGER_DATETIME = Softtion.MANAGER_DATETIME,
        TextType = Softtion.TEXTCONTROL,
        Classes = Softtion.CLASSES,
        Listeners = Softtion.LISTENERS,
        KeysBoard = Softtion.CODES_KEYBOARD, 
        KeysControl = getKeysControl();
    
    function GET_INSTANCE_SOFTTION_MATERIAL() {
        return {
            components: {
                Alert: Directives.create(Directives.Alert),
                
                AppBar: Directives.create(Directives.AppBar),

                Audio: Directives.create(Directives.Audio),

                AutoComplete: Directives.create(Directives.AutoComplete),

                BottomNavigation: Directives.create(Directives.BottomNavigation),

                BottomSheet: Directives.create(Directives.BottomSheet),

                Breadcrumb: Directives.create(Directives.Breadcrumb),

                Button: Directives.create(Directives.Button),
                
                ButtonProgress: Directives.create(Directives.ButtonProgress),

                Carousel: Directives.create(Directives.Carousel),

                Catalog: Directives.create(Directives.Catalog),

                CheckBox: Directives.create(Directives.Checkbox),

                CheckBoxControl: Directives.create(Directives.CheckboxControl),

                CheckBoxSelect: Directives.create(Directives.CheckboxSelect),

                ChipInput: Directives.create(Directives.ChipInput),

                Clockpicker: Directives.create(Directives.ClockPicker),

                ClockpickerDialog: Directives.create(Directives.ClockPickerDialog),

                ClockpickerInput: Directives.create(Directives.ClockPickerInput),
                
                DataTable: Directives.create(Directives.DataTable),

                Datepicker: Directives.create(Directives.DatePicker),

                DatepickerDialog: Directives.create(Directives.DatePickerDialog),

                DatepickerInput: Directives.create(Directives.DatePickerInput),

                Dialog: Directives.create(Directives.Dialog),

                Dictionary: Directives.create(Directives.Dictionary),

                ExpansionPanel: Directives.create(Directives.ExpansionPanel),

                FabDialog: Directives.create(Directives.FabDialog),

                FabMenu: Directives.create(Directives.FabMenu),

                FabSpeedDial: Directives.create(Directives.FabSpeedDial),

                Filechooser: Directives.create(Directives.Filechooser),

                FilechooserAudio: Directives.create(Directives.FilechooserAudio),

                FilechooserMultiple: Directives.create(Directives.FilechooserMultiple),

                FilechooserPerfil: Directives.create(Directives.FilechooserPerfil),

                FlexibleBox: Directives.create(Directives.FlexibleBox),
                
                FormNavigation: Directives.create(Directives.FormNavigation),

                FullwidthField: Directives.create(Directives.FullwidthField),

                Gallery: Directives.create(Directives.Gallery),

                Grid: Directives.create(Directives.Grid),

                GridSheet: Directives.create(Directives.GridSheet),

                Img: Directives.create(Directives.Img),
                
                Notification: Directives.create(Directives.Notification),
                
                NotificationFloating: Directives.create(Directives.NotificationFloating),

                ProgressBar: Directives.create(Directives.ProgressBar),

                ProgressButtonFloating: Directives.create(Directives.ProgressButtonFloating),

                ProgressCircular: Directives.create(Directives.ProgressCircular),

                RadioButton: Directives.create(Directives.RadioButton),

                Rating: Directives.create(Directives.Rating),

                Ripple: Directives.create(Directives.Ripple),
                
                Score: Directives.create(Directives.Score),

                Select: Directives.create(Directives.Select),

                SelectMultiple: Directives.create(Directives.SelectMultiple),

                Sidenav: Directives.create(Directives.Sidenav),

                SidenavItem: Directives.create(Directives.SidenavItem),
                
                Slider: Directives.create(Directives.Slider),

                StepperHorizontal: Directives.create(Directives.StepperHorizontal),

                Switch: Directives.create(Directives.Switch),

                Tabs: Directives.create(Directives.Tabs),

                TextArea: Directives.create(Directives.TextArea),

                TextBox: Directives.create(Directives.TextBox),

                TextBoxMultiline: Directives.create(Directives.TextBoxMultiline),

                TextField: Directives.create(Directives.TextField),

                TextFieldBordered: Directives.create(Directives.TextFieldBordered),

                TextFieldMultiline: Directives.create(Directives.TextFieldMultiline),

                TextFieldReadOnly: Directives.create(Directives.TextFieldReadonly),

                Tooltip: Directives.create(Directives.Tooltip),

                VideoYouTube: Directives.create(Directives.VideoYouTube),

                ViewsTabs: Directives.create(Directives.ViewsTabs)
            },

            providers: {
                AppBody: Providers.create(Providers.AppBody),

                AppContent: Providers.create(Providers.AppContent),

                Body: Providers.create(Providers.Body),

                BottomSheet: Providers.create(Providers.BottomSheet),

                Dialog: Providers.create(Providers.Dialog),

                Document: Providers.create(Providers.Document),

                Dropdown: Providers.create(Providers.Dropdown),

                FormNavigation: Providers.create(Providers.FormNavigation),
                
                MaterialFont: Providers.create(Providers.MaterialFont),

                MaterialTheme: Providers.create(Providers.MaterialTheme),
                
                Modal: Providers.create(Providers.Modal),

                ProgressBar: Providers.create(Providers.ProgressBar),

                ProgressButtonFloating: Providers.create(Providers.ProgressFAB),

                ProgressCircular: Providers.create(Providers.ProgressCircular),

                ProgressPane: Providers.create(Providers.ProgressPane),

                Sidenav: Providers.create(Providers.Sidenav),

                Snackbar: Providers.create(Providers.Snackbar),

                Toast: Providers.create(Providers.Toast),
                
                TooltipContainer: Providers.create(Providers.TooltipContainer),

                WindowResize: Providers.create(Providers.WindowResize)
            },

            properties: {
                BottomSheet: Properties.create(Properties.BottomSheet),

                Dialog: Properties.create(Properties.Dialog),

                Dropdown: Properties.create(Properties.Dropdown),

                FocusedElement: Properties.create(Properties.FocusedElement),

                FormNavigation: Properties.create(Properties.FormNavigation),

                MaterialBackground: Properties.create(Properties.MaterialBackground),

                MaterialFont: Properties.create(Properties.MaterialFont),

                MaterialTheme: Properties.create(Properties.MaterialTheme),

                Sidenav: Properties.create(Properties.Sidenav)
            }
        };
    }
            
    function getKeysControl() {
        return {
            INPUT: [
                KeysBoard.BACKSPACE, 
                KeysBoard.TAB, 
                KeysBoard.SHIFT, 
                KeysBoard.CTRL, 
                KeysBoard.HOME, 
                KeysBoard.ARROW_UP, 
                KeysBoard.ARROW_RIGHT, 
                KeysBoard.ARROW_DOWN, 
                KeysBoard.ARROW_LEFT, 
                KeysBoard.DELETE
            ],
            
            AUTOCOMPLETE: [
                KeysBoard.ENTER,  
                KeysBoard.ESC, 
                KeysBoard.END, 
                KeysBoard.HOME, 
                KeysBoard.ARROW_UP, 
                KeysBoard.ARROW_RIGHT, 
                KeysBoard.ARROW_DOWN, 
                KeysBoard.ARROW_LEFT
            ],
            
            SELECT: [ 
                KeysBoard.ENTER, 
                KeysBoard.SPACE
            ]
        };
    }
    
    // DIRECTIVAS DE SOFTTION MATERIAL
    
    function Directives(name) { 
        switch (name) {
            case (Directives.Alert.NAME): return Directives.Alert;
            case (Directives.AppBar.NAME): return Directives.AppBar;
            case (Directives.Audio.NAME): return Directives.Audio;
            case (Directives.AutoComplete.NAME): return Directives.AutoComplete;
            case (Directives.BottomNavigation.NAME): return Directives.BottomNavigation;
            case (Directives.BottomSheet.NAME): return Directives.BottomSheet;
            case (Directives.Breadcrumb.NAME): return Directives.Breadcrumb;
            case (Directives.Button.NAME): return Directives.Button;
            case (Directives.ButtonProgress.NAME): return Directives.ButtonProgress;
            case (Directives.Carousel.NAME): return Directives.Carousel;
            case (Directives.Catalog.NAME): return Directives.Catalog;
            case (Directives.Checkbox.NAME): return Directives.Checkbox;
            case (Directives.CheckboxControl.NAME): return Directives.CheckboxControl;
            case (Directives.CheckboxSelect.NAME): return Directives.CheckboxSelect;
            case (Directives.ChipInput.NAME): return Directives.ChipInput;
            case (Directives.ClockPicker.NAME): return Directives.ClockPicker;
            case (Directives.ClockPickerDialog.NAME): return Directives.ClockPickerDialog;
            case (Directives.ClockPickerInput.NAME): return Directives.ClockPickerInput;
            case (Directives.DataTable.NAME): return Directives.DataTable;
            case (Directives.DatePicker.NAME): return Directives.DatePicker;
            case (Directives.DatePickerDialog.NAME): return Directives.DatePickerDialog;
            case (Directives.DatePickerInput.NAME): return Directives.DatePickerInput;
            case (Directives.Dialog.NAME): return Directives.Dialog;
            case (Directives.Dictionary.NAME): return Directives.Dictionary;
            case (Directives.ExpansionPanel.NAME): return Directives.ExpansionPanel;
            case (Directives.FabDialog.NAME): return Directives.FabDialog;
            case (Directives.FabMenu.NAME): return Directives.FabMenu;
            case (Directives.FabSpeedDial.NAME): return Directives.FabSpeedDial;
            case (Directives.Filechooser.NAME): return Directives.Filechooser;
            case (Directives.FilechooserAudio.NAME): return Directives.FilechooserAudio;
            case (Directives.FilechooserMultiple.NAME): return Directives.FilechooserMultiple;
            case (Directives.FilechooserPerfil.NAME): return Directives.FilechooserPerfil;
            case (Directives.FlexibleBox.NAME): return Directives.FlexibleBox;
            case (Directives.FormNavigation.NAME): return Directives.FormNavigation;
            case (Directives.FullwidthField.NAME): return Directives.FullwidthField;
            case (Directives.Gallery.NAME): return Directives.Gallery;
            case (Directives.Grid.NAME): return Directives.Grid;
            case (Directives.GridSheet.NAME): return Directives.GridSheet;
            case (Directives.Img.NAME): return Directives.Img;
            case (Directives.Notification.NAME): return Directives.Notification;
            case (Directives.NotificationFloating.NAME): return Directives.NotificationFloating;
            case (Directives.ProgressBar.NAME): return Directives.ProgressBar;
            case (Directives.ProgressButtonFloating.NAME): return Directives.ProgressButtonFloating;
            case (Directives.ProgressCircular.NAME): return Directives.ProgressCircular;
            case (Directives.RadioButton.NAME): return Directives.RadioButton;
            case (Directives.Rating.NAME): return Directives.Rating;
            case (Directives.Ripple.NAME): return Directives.Ripple;
            case (Directives.Score.NAME): return Directives.Score;
            case (Directives.Select.NAME): return Directives.Select;
            case (Directives.SelectMultiple.NAME): return Directives.SelectMultiple;
            case (Directives.Sidenav.NAME): return Directives.Sidenav;
            case (Directives.SidenavItem.NAME): return Directives.SidenavItem;
            case (Directives.Slider.NAME): return Directives.Slider;
            case (Directives.StepperHorizontal.NAME): return Directives.StepperHorizontal;
            case (Directives.Switch.NAME): return Directives.Switch;
            case (Directives.Tabs.NAME): return Directives.Tabs;
            case (Directives.TextArea.NAME): return Directives.TextArea;
            case (Directives.TextBox.NAME): return Directives.TextBox;
            case (Directives.TextBoxMultiline.NAME): return Directives.TextBoxMultiline;
            case (Directives.TextField.NAME): return Directives.TextField;
            case (Directives.TextFieldBordered.NAME): return Directives.TextFieldBordered;
            case (Directives.TextFieldMultiline.NAME): return Directives.TextFieldMultiline;
            case (Directives.TextFieldReadonly.NAME): return Directives.TextFieldReadonly;
            case (Directives.Tooltip.NAME): return Directives.Tooltip;
            case (Directives.VideoYouTube.NAME): return Directives.VideoYouTube;
            case (Directives.ViewsTabs.NAME): return Directives.ViewsTabs;
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
    
    // Directiva: Alert
    // Version: 1.0.0
    // Updated: 16/Mar/2018
    
    Directives.Alert = AlertDirective;
    
    Directives.Alert.NAME = "Alert";
    Directives.Alert.VERSION = "1.0.0";
    Directives.Alert.KEY = "alert";
    
    Directives.Alert.$inject = [ "$timeout" ];
    
    function AlertDirective($timeout) {
        return {
            restrict: "C",
            scope: {
                duration: "=?",
                ngOpen: "=?",
                ngClose: "=?"
            },
            link: function ($scope, $element) {
                    // Componentes
                var button = softtion.htmlElement("i");
                
                    // Atributos
                var promise = undefined;
                
                $scope.$watch(() => { return $scope.duration; },
                    (newValue) => {
                        if (isNaN(newValue)) $scope.duration = 4000;
                    });
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => { if (newValue) openAlert(); });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => { if (newValue) closeAlert(); });
                    
                button.html("close"); $element.append(button);
                
                button.click(() => {
                    $scope.$apply(() => { closeAlert(); });
                });
                    
                function openAlert() {
                    $element.addClass(Classes.SHOW); // Desplegando
                    $scope.ngOpen = false; cancelPromise();
                    
                    promise = $timeout(() => { hideAlert(); }, $scope.duration);
                }
                
                function closeAlert() {
                    $scope.ngClose = false; cancelPromise(); hideAlert();
                }
                    
                function hideAlert() {
                    $element.removeClass(Classes.SHOW); promise = undefined;
                }
                
                function cancelPromise() {
                    if (softtion.isDefined(promise)) $timeout.cancel(promise);
                }
            }
        };
    }
    
    // Directiva: AppBar
    // Version: 1.0.0
    // Updated: 24/Feb/2018
    
    Directives.AppBar = AppBarDirective;
    
    Directives.AppBar.NAME = "AppBar";
    Directives.AppBar.VERSION = "1.0.1";
    Directives.AppBar.KEY = "appBar";
    
    Directives.AppBar.$inject = [ 
        "$window", "$appBody", "$appContent", "$windowResize"  
    ];
    
    Directives.AppBar.setClassWidthElement = function ($element, width) {
        var classes = (width > 960) ? 
            { add: Classes.APPBAR_64, remove: Classes.APPBAR_56 }: 
            { add: Classes.APPBAR_56, remove: Classes.APPBAR_64 };

        $element.removeClass(classes.remove).addClass(classes.add);
    };
    
    function AppBarDirective($window, $appBody, $appContent, $windowResize) {
        var directive = Directives.AppBar; // Directiva
        
        return {
            restrict: "C",
            scope: {
                fixed: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var toolbar = $element.find(".toolbar:first-child"),
                    searchBox = $element.find(".search-box:first-child"),
                    sidenav = $appBody.children(".sidenav"),
                    
                    // Atributos
                    listener = new Listener($scope, []), position = 0, 
                    appBarWR = "wr-appbar-" + softtion.getGUID();

                if (toolbar.exists() || searchBox.exists()) {
                    $element.addClass("element-hidden");
                } // AppBar contiene elemento ocultable primera posición
                            
                var appbarHeight = (!$element.hasClass("floating")) ?
                    $element.innerHeight() : $element.outerHeight(true);

                setDisplaceElement(appbarHeight); 
                directive.setClassWidthElement($element, $window.innerWidth);

                $appContent.scroll(() => {
                    if ($scope.fixed) return; // No debe ocultarse
                    
                    var minHeight = (($window.innerWidth > 960) ? 64 : 56),
                        positionNew = $appContent.scrollTop();

                    if (positionNew === 0) {
                        position = positionNew; toogleAppBar(true); return;
                    } // Se debe desplegar AppBar

                    if ((positionNew > minHeight)) {
                        if (position >= positionNew) {
                            position = positionNew; toogleAppBar(true); return;
                        } // Se debe desplegar AppBar
                        
                        $element.children(".dropdown").removeClass(Classes.SHOW);
                        toogleAppBar(false); // Ocultando AppBar
                    } 

                    position = positionNew; // Nueva posición del scroll
                });
                
                $windowResize.addListener(appBarWR, (window) => {
                    if (!softtion.isInPage($element[0])) {
                        $windowResize.removeListener(appBarWR); return;
                    } // Componente no existe en el documento
                    
                    setPositionWidth(window.width()); // Posición
                    
                    directive.setClassWidthElement($element, window.width());
                });
                
                function toogleAppBar(isShow) {
                    if (isShow) {
                        $element.removeClass(Classes.HIDE); listener.launch(Listeners.SHOW);
                    } else {
                        $element.addClass(Classes.HIDE); listener.launch(Listeners.HIDE);
                    } // Se ocultará Appbar en el documento
                }
                
                function setPositionWidth(width) {
                    var topAppContent = $appContent.css("padding-top"),
                        result = (width > 960) ? 
                            (parseInt(topAppContent) + 8):
                            (parseInt(topAppContent) - 8);
                    
                    if ((width > 960) && !$element.hasClass(Classes.APPBAR_64))
                        setDisplaceElement(result); // Aplicando aumento de posición
                    
                    if ((width <= 960) && !$element.hasClass(Classes.APPBAR_56)) 
                        setDisplaceElement(result); // Aplicando disminución de posición
                }
                
                function setDisplaceElement(value) {
                    sidenav.css("top", value); $appContent.css("padding-top", value);
                }
            }
        };
    }
    
    // Directiva: Audio
    // Version: 1.0.0
    // Updated: 24/Feb/2018
    
    Directives.Audio = AudioDirective;
    
    Directives.Audio.NAME = "Audio";
    Directives.Audio.VERSION = "1.0.0";
    Directives.Audio.KEY = "audio";
    Directives.Audio.ROUTE = "softtion/template/audio.html";
    
    Directives.Audio.HTML = function () {
        var content = softtion.html("div").addClass("content");

        content.addChildren(
            softtion.html("button").addClass([Classes.ACTION, "player"]).
                addAttribute("ng-click", "play()").
                addAttribute("ng-disabled", "errorAudio").
                addChildren(
                    softtion.html("i").setText("{{getIconPlay()}}")
                )
        ).addChildren(
            softtion.html("button").addClass([Classes.ACTION, "stopper"]).
                addAttribute("ng-click", "stop()").
                addAttribute("ng-disabled", "errorAudio").
                addChildren(
                    softtion.html("i").setText("stop")
                )
        ).addChildren(
            softtion.html("div").addClass("box").
                addChildren(
                    softtion.html("div").addClass("progress-audio").
                        addChildren(
                            softtion.html("div").addClass("bar").
                                addAttribute("ng-class", "{stripe: isLoading}").
                                addAttribute("ng-style", "{width: widthProgress}")
                        )
                ).addChildren(
                    softtion.html("label").addClass("name").setText("{{name}}")
                ).addChildren(
                    softtion.html("label").addClass("current-time").
                        setText("{{getCurrentTime()}}")
                ).addChildren(
                    softtion.html("label").addClass("duration").
                        setText("{{getDuration()}}")
                )
        ).addChildren(
            softtion.html("button").addClass([Classes.ACTION, "muted"]).
                addAttribute("ng-click", "muted()").
                addAttribute("ng-disabled", "errorAudio").
                addChildren(
                    softtion.html("i").setText("{{getIconMute()}}")
                )
        );

        return content.create(); // Componente
    };
    
    function AudioDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Audio.ROUTE,
            scope: {
                ngSrc: "@",
                name: "@",
                audio: "=?ngAudio",
                playAutomatic: "=?"
            },
            link: function ($scope, $element, $attrs) {
                $scope.audio = createInstanceAudio();

                $scope.isLoadAudio = false;
                $scope.errorAudio = true;

                $scope.isPlay = false;
                $scope.duration = 0;
                $scope.currentTime = 0;

                $scope.$watch(() => { return $scope.audio; },
                    (newValue, oldValue) => {
                        if (!(newValue instanceof Audio)) {
                            $scope.audio = oldValue;
                        } // No se admite el cambio de objeto
                    });

                $attrs.$observe("ngSrc", () => {
                    if (softtion.isText($scope.ngSrc)) {
                        $scope.errorAudio = false;
                        $scope.isLoadAudio = false;

                        restorePlay(); $scope.duration = 0;

                        if ($scope.playAutomatic) {
                            $scope.audio.src = $scope.ngSrc;
                            
                            if (!softtion.deviceIs().pc())
                                $scope.audio.play(); // Dispositivo no es un PC
                        } // Reproducción automatica
                    } else {
                        $scope.audio.src = ""; restorePlay(); $scope.duration = 0;
                    } // No ha definido correctamente la ruta
                });

                function createInstanceAudio() {
                    var audio = new Audio(); // Objeto Audio

                    audio.onloadeddata = function () {
                        $scope.$apply(() => {
                            $scope.isLoadAudio = true;
                            $scope.isLoading = false;

                            $scope.isPlay = false;
                            $scope.duration = audio.duration;

                            $scope.play(); // Reproduciendo
                        });
                    };

                    audio.onerror = function () {
                        $scope.$apply(() => {
                            $scope.errorAudio = true; $scope.duration = 0;
                            $scope.isPlay = false; $scope.isLoadAudio = false;
                        });
                    };

                    audio.ontimeupdate = function () {
                        $scope.$apply(() => {
                            $scope.currentTime = audio.currentTime;
                            
                            if ($scope.currentTime > 0) {
                                var percentage = $scope.currentTime * 100;
                                percentage = parseInt(percentage / $scope.duration);

                                $scope.widthProgress = percentage + "%";
                            } else {
                                $scope.widthProgress = 0 + "%";
                            } // La canción se ha detenido completamente
                        });
                    };

                    audio.onended = function () {
                        $scope.$apply(() => { restorePlay(true); });
                    };

                    return audio; // Retornando Instancia generada
                }

                function describeTimeAudio(secondsAudio) {
                    var minutes = parseInt(secondsAudio / 60),
                        seconds = parseInt(secondsAudio - (minutes * 60));

                    return softtion.leadingCharBefore(minutes, "0", 2) + 
                        ":" + softtion.leadingCharBefore(seconds, "0", 2);
                }

                function restorePlay(paused) {
                    if ($scope.isPlay && !paused) {
                        $scope.audio.pause();
                    } // La canción se esta reproducciendo

                    $scope.audio.currentTime = 0; $scope.currentTime = 0;
                    $scope.isPlay = false; // Detener reproducción
                }

                $scope.play = function () {
                    if (!$scope.isLoadAudio) {
                        $scope.audio.src = $scope.ngSrc; $scope.isLoading = true;

                        if (!softtion.deviceIs().pc()) 
                            $scope.audio.play(); // Dispositivo no es un PC
                    } else {
                        $scope.isPlay = !$scope.isPlay; // Cambiando estado
                        ($scope.isPlay) ? $scope.audio.play() : $scope.audio.pause();
                    } // No se ha cargado audio
                };

                $scope.stop = function () {
                    restorePlay(); // Reiniciando audio
                };

                $scope.muted = function () {
                    $scope.audio.muted = !$scope.audio.muted;
                };

                $scope.getIconPlay = function () {
                    return (!$scope.isPlay) ? "play_circle_outline" : "pause_circle_outline";
                };

                $scope.getIconMute = function () {
                    return (!$scope.audio.muted) ? "volume_up" : "volume_off";
                };

                $scope.getCurrentTime = function () {
                    return describeTimeAudio($scope.currentTime);
                };

                $scope.getDuration = function () {
                    return describeTimeAudio($scope.duration);
                };
            }
        };
    }
    
    // Directiva: AutoComplete
    // Version: 1.3.4
    // Updated: 26/Jun/2018
    
    Directives.AutoComplete = AutoCompleteDirective;
    
    Directives.AutoComplete.NAME = "AutoComplete";
    Directives.AutoComplete.VERSION = "1.3.4";
    Directives.AutoComplete.KEY = "autocomplete";
    Directives.AutoComplete.ROUTE = "softtion/template/autocomplete.html";
    
    Directives.AutoComplete.HTML = function () {
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
            addAttribute("ng-click", "clickIconDescription($event)").
            addAttribute("ng-if", "isIconDescription()").
            addClass("description").setText("{{iconDescription}}");

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("ng-model", "input").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-keydown", "keydownInput($event)").
                addAttribute("ng-keyup", "keyupInput($event)").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("ng-class",
                    "{hide: !hideValue, holderhide: isHaveSelection(), iconaction: isIconAction()}"
                ).addAttribute("focused-element", "focusedInput").
                addAttribute("placeholder", "{{placeholder}}");

        var lineShadow = softtion.html("div").addClass("line-bordered");
        var lineActive = softtion.html("div").addClass("line-shadow");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addClass("truncate").addAttribute("ng-click", "clickLabel()").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
                addAttribute("ng-class", "{iconaction: isIconAction()}").
                addAttribute("ng-click", "clickLabel()");

        var buttonAction = softtion.html("i").addClass([Classes.ACTION]).
                setText("{{iconAction}}").addAttribute("ng-if", "isIconAction()").
                addAttribute("ng-click", "clickAction($event)").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var buttonClear = softtion.html("i").addClass([Classes.ACTION]).
                setText("close").addAttribute("ng-hide", "isActiveClear()").
                addAttribute("ng-click", "clearAutocomplet()").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");
    
        var detail = softtion.html("div").addClass("detail").
                addAttribute("ng-class", "{record: record}").
                addChildren(
                    softtion.html("div").addClass("avatars").
                        addAttribute("ng-if", "record").
                        addChildren(
                            softtion.html("div").addClass("avatar").
                                addChildren(
                                    softtion.html("span").
                                        addAttribute("ng-if", "!isAvatarImg(suggestion)").
                                        setText("{{getTextAvatar(suggestion)}}")
                                ).
                                addChildren(
                                    softtion.html("img", false).
                                        addAttribute("ng-if", "isAvatarImg(suggestion)").
                                        addAttribute("ng-src", "{{getSrcImg(suggestion)}}")
                                )
                        )
                ).addChildren(
                    softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("title").
                                addAttribute("ng-bind-html", "renderSuggestion(suggestion)")
                        ).addChildren(
                            softtion.html("div").addClass("subtitle").
                                addAttribute("ng-if", "record").
                                setText("{{getTextSubtitle(suggestion)}}")
                        )
                );

        var list = softtion.html("ul").
                addChildren(
                    softtion.html("li").addClass(["truncate"]).
                        addAttribute("tabindex", "-1").
                        addAttribute("ng-repeat", "suggestion in coincidences track by $index").
                        addAttribute("ng-keydown", "keydownSuggestion($event, suggestion)").
                        addAttribute("ng-mousedown", "mousedownSuggestion($event, suggestion)").
                        addChildren(detail)
                ).addChildren(
                    softtion.html("li").addClass(["truncate", "not-found"]).
                        addAttribute("ng-if", "notFoundResult()").
                        setText("{{descriptionNotFoundResult()}}")
                );

        content.addChildren(iconDescription).addChildren(input).
            addChildren(lineShadow).addChildren(lineActive).
            addChildren(label).addChildren(value).
            addChildren(buttonAction).addChildren(buttonClear).
            addChildren(spanHelper).addChildren(list);

        return content.create(); // Componente
    };
                    
    Directives.AutoComplete.$inject = [ "$filter" ];
    
    function AutoCompleteDirective($filter) {
        return {
            restrict: "C",
            templateUrl: Directives.AutoComplete.ROUTE,
            scope: {
                select: "=ngModel",
                suggestions: "=",
                countVisible: "=?",
                label: "@",
                required: "=?",
                optional: "=?",
                key: "@keyDescription",
                iconDescription: "@",
                iconAction: "@",
                placeholder: "@",
                record: "=?",
                keySubtitle: "@",
                keyImg: "@",
                ngDisabled: "=?",
                disabledFocusclear: "=?",
                helperText: "@",
                helperPermanent: "=?",
                disabledOrderby: "=?",
                clearModel: "=?",
                searchMode: "=?",
                inputMode: "=?",
                focusedInput: "=?",
                patternMethod: "@",
                patternForce: "=?",
                ngDefineCoincidences: "&",
                ngFormatDescription: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input"), 
                    list = $element.find("ul");

                    // Atributos
                var $orderBy = $filter("orderBy"), selection = false,
                    focusLi = false, searchStart = false,
                    listener = new Listener($scope, Listener.KEYS.AUTOCOMPLETE);

                $scope.coincidences = []; $scope.old = undefined; 
                $scope.inputActive = false; $scope.instance = false;
                
                $scope.patternMethod = $scope.patternMethod || "start";
                $scope.patternForce = $scope.patternForce || true;
                
                $scope.countVisible = $scope.countVisible || 6;
                
                $scope.$watch(() => { return $scope.suggestions; }, 
                    (newValue) => {
                        $scope.temporal = rebootSuggestions();
                        
                        if (!softtion.isArray(newValue)) {
                            $scope.suggestions = []; return;
                        } // Los items de seleccion no es un Array
                        
                        if (!$scope.instance && !$scope.disabledOrderby) 
                            $scope.suggestions = $orderBy(newValue, $scope.key || "");
                        
                        $scope.instance = !$scope.instance; // Intercalando
                    });

                $scope.$watch(() => { return $scope.select; }, 
                    (newValue) => {
                        if (softtion.isUndefined(newValue)) $scope.input = ""; 
                    });

                $scope.$watch(() => { return $scope.input; }, 
                    (newValue, oldValue) => {
                        if (newValue !== oldValue && $scope.inputActive)
                            listener.launch(Listeners.CHANGED_TEXT);
                    });

                $scope.$watch(() => { return $scope.clearModel; }, 
                    (newValue) => {
                        if (newValue === true) {
                            $scope.select = undefined; // Indefinido
                            $scope.input = ""; $scope.clearModel = false;
                        }
                    });

                $scope.isActiveLabel = function () {
                    return ($scope.inputActive || 
                        softtion.isDefined($scope.select)) ||
                        softtion.isText($scope.input);
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };
                
                $scope.isIconAction = function () {
                    return softtion.isText($scope.iconAction);
                };

                $scope.helperActive = function () {
                    return softtion.isUndefined($scope.select) || $scope.helperPermanent;
                };

                $scope.isHaveSelection = function () {
                    return softtion.isText($scope.input) || softtion.isDefined($scope.select);
                };
                
                $scope.getTextSubtitle = function (suggestion) {
                    return (typeof suggestion === "string") ? "" :
                        !softtion.isText($scope.keySubtitle) ? "" : suggestion[$scope.keySubtitle];
                };
                
                $scope.isAvatarImg = function (suggestion) {
                    return (typeof suggestion === "string") ? false : softtion.isText($scope.keyImg);
                };

                $scope.getTextAvatar = function (suggestion) {
                    return getValueSuggestion(suggestion)[1];
                };

                $scope.clickLabel = function () { input.focus(); };

                $scope.clickIconDescription = function ($event) {
                    if ($scope.ngDisabled) return; // Componente inactivo
                    
                    listener.launch(Listeners.ICON, { $event: $event });
                };
                
                $scope.clickAction  = function ($event) {
                    if ($scope.ngDisabled) return; // Componente inactivo
                    
                    listener.launch(Listeners.ACTION, { $event: $event });
                };

                $scope.focusInput = function ($event) {
                    if (softtion.isDefined($scope.select)) 
                        $scope.input = describeSuggestion($scope.select);

                    $scope.inputActive = true; $element.addClass(Classes.ACTIVE); 

                    listener.launch(Listeners.FOCUS, { $event: $event });
                    openListSuggestions($scope.input); // Buscar sugerencias
                };

                $scope.blurInput = function ($event) { 
                    if (focusLi) {
                        if ($scope.inputMode && softtion.isText($scope.input)) {
                            $scope.select = $scope.input; $scope.input = "";
                        } // Modo input activo, tiene un valor definido el Componente
                        
                        focusLi = false; return; // Se ha enfocado Lista
                    } 
                    
                    if ($scope.inputMode && !selection) {
                        if (softtion.isText($scope.input)) {
                            $scope.select = $scope.input; $scope.input = "";
                        } // Asignando valor digitado
                    } else if ($scope.coincidences.isEmpty())
                        $scope.select = undefined; // No hay opciones
                    
                    $scope.input = ""; selection = false; $element.removeClass(Classes.ACTIVE);
                    $scope.inputActive = false; list.removeClass(Classes.ACTIVE); 

                    listener.launch(Listeners.BLUR, { $event: $event });
                };

                $scope.keydownInput = function ($event) {
                    switch ($event.originalEvent.which) {
                        case (KeysBoard.ESC): list.removeClass(Classes.ACTIVE); break;

                        case (KeysBoard.ARROW_DOWN): 
                            var options = list.find("li"); // Opciones

                            if (options.exists()) { 
                                focusLi = true; options.first().focus(); 
                            } // Seleccionando primer elemento
                        break;
                        
                        case (KeysBoard.ENTER):
                            listener.launch(Listeners.ENTER, { $event: $event });
                        break;
                    }
                };

                $scope.keyupInput = function ($event) {
                    if (KeysControl.AUTOCOMPLETE.hasItem($event.charCode)) return;

                    listener.launch(Listeners.KEY_UP, { $event: $event });

                    openListSuggestions($scope.input); // Buscando sugerencias
                };

                $scope.keydownSuggestion = function ($event, suggestion) {
                    var option = angular.element($event.currentTarget);

                    switch ($event.originalEvent.which) {
                        case (KeysBoard.ENTER): $scope.selectSuggestion(suggestion); break;

                        case (KeysBoard.ESC): list.removeClass(Classes.ACTIVE); break;

                        case (KeysBoard.ARROW_UP):
                            (option.prev().length) ? option.prev().focus() : input.focus();
                        break;

                        case (KeysBoard.ARROW_DOWN):
                            if (option.next().length) option.next().focus();
                        break;
                    }
                };
                
                $scope.mousedownSuggestion = function ($event, suggestion) {
                    if ($event.originalEvent.which !== 1) return;
                    
                    $scope.selectSuggestion(suggestion); // Seleccionando
                };

                $scope.selectSuggestion = function (suggestion) {
                    $scope.old = $scope.select; $scope.inputActive = false;
                    list.removeClass(Classes.ACTIVE); selection = true;

                    $scope.select = suggestion; // Estableciendo Selección
                    var pattern = describeSuggestion($scope.select);
                    
                    setSuggestions(pattern, $scope.coincidences); // Asignando temporales

                    if (!$scope.searchMode) {
                        if ($scope.old !== $scope.select) listener.launch(Listeners.CHANGED);
                    } else {
                        input.focus(); listener.launch(Listeners.SELECT);
                        $scope.select = undefined; // Limpiando selección
                    }
                };

                $scope.renderSuggestion = function (suggestion) {
                    var value = $scope.ngFormatDescription({ $suggestion: suggestion });
                    
                    if (softtion.isUndefined(value)) // No se definió descripción
                        value = describeSuggestion(suggestion);

                    // Valor digitado para filtrar
                    var filter = $scope.input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

                    // Expresión RegExp
                    var expReg = new RegExp("(" + filter.split(" ").join("|") + ")", "gi");

                    return value.replace(expReg, "<b>$1</b>"); // Valor final
                };

                $scope.notFoundResult = function () {
                    return (!this.coincidences.isEmpty()) ? false :
                        (searchStart && softtion.isText($scope.input) && !$scope.inputMode); 
                };

                $scope.descriptionNotFoundResult = function () {
                    return $scope.input + ", no existen resultados.";
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.select);
                };

                $scope.clearAutocomplet = function () {
                    if ($scope.ngDisabled) return; // Componente inactivo
                    
                    $scope.temporal = rebootSuggestions(); selection = false;
                    $element.removeClass(Classes.ACTIVE); 
                    $scope.select = undefined; listener.launch(Listeners.CLEAR);

                    if (!$scope.disabledFocusclear) input.focus(); 
                };

                $scope.getValueModel = function () {
                    return (softtion.isDefined($scope.select)) ?
                        getDescribeSuggestion($scope.select) :
                        (softtion.isText($scope.input)) ? $scope.input : undefined;
                };

                function getValueSuggestion(suggestion) {
                    return !(softtion.isText($scope.key)) ? 
                        JSON.stringify(suggestion) : 
                        softtion.findKey(suggestion, $scope.key);
                }

                function getDescribeSuggestion(suggestion) {
                    var value = $scope.ngFormatDescription({ $suggestion: suggestion });
                    
                    return (softtion.isDefined(value)) ? 
                        value : describeSuggestion(suggestion);
                }

                function describeSuggestion(suggestion) {
                    return (softtion.isText(suggestion)) ? 
                        suggestion : getValueSuggestion(suggestion);
                }

                function openListSuggestions(pattern) {
                    if (!softtion.isText(pattern)) {
                        $scope.temporal = rebootSuggestions(); return;
                    } // No se debe aplicar proceso de filtro

                    var result = getSuggestions(pattern), // Sugerencias
                        
                        suggestions = (result.success) ?
                            result.temporal.suggestions : $scope.suggestions,
                                    
                        coincidences = $scope.ngDefineCoincidences({
                            $suggestions: suggestions, $pattern: pattern
                        });
                    
                    searchStart = true; // Iniciando busqueda

                    if (softtion.isUndefined(coincidences))
                        coincidences = getCoincidences(suggestions, pattern);
                    
                    $scope.coincidences = // Lista de coincidencias
                        softtion.isUndefined(coincidences) ? $scope.coincidences : 
                        coincidences.extract(0, $scope.countVisible); 
                        
                    setSuggestions(pattern, coincidences, result);
                    list.addClass(Classes.ACTIVE); // Desplegando sugerencias
                }
                
                function rebootSuggestions() {
                    return { 
                        pattern: undefined, suggestions: [], before: undefined
                    };
                }
                
                function getSuggestions(pattern) {
                    if (!softtion.isText($scope.temporal.pattern)) 
                        return { success: false }; 
                    
                    return getSuggestionsByMethod(pattern); // Sugerencias
                }
                
                function getSuggestionsByMethod($pattern) {
                    switch ($scope.patternMethod) {
                        case ("start"):
                            return getSuggestionsByStart($pattern);
                        case ("between"):
                            return getSuggestionsByStart($pattern);
                        default:
                            return getSuggestionsByStart($pattern);
                    }
                }
                
                function getSuggestionsByStart(pattern) {
                    var temporal = $scope.temporal, 
                        stop = softtion.isUndefined(temporal);
                        
                    while (!stop) {
                        var $pattern = temporal.pattern; // Patrón anterior
                        
                        if (pattern.like("start", $pattern, $scope.patternForce)) {
                            stop = true;
                        } else {
                            temporal = temporal.before;
                            stop = softtion.isUndefined(temporal);
                        } // Verificando si existe una lista anterior
                    }
                    
                    if (softtion.isDefined(temporal)) {
                        return { success: true, temporal: temporal };
                    } else {
                        $scope.temporal = rebootSuggestions(); return { success: false };
                    } // Se debe reiniciar datos temporales
                }
                
                function getCoincidences(suggestions, pattern) {
                    switch ($scope.patternMethod) {
                        case ("start"):
                            return getCoincidencesByStart(suggestions, pattern);
                        case ("between"):
                            return getCoincidencesByStart(suggestions, pattern);
                        default:
                            return getCoincidencesByStart(suggestions, pattern);
                    }
                }
                
                function getCoincidencesByStart(suggestions, pattern) {
                    var coincidences = []; // Listado de coincidencias
                    
                    angular.forEach(suggestions, (suggestion) => {
                        if (softtion.isText(suggestion)) {
                            if (suggestion.like("start", pattern, $scope.patternForce)) 
                                coincidences.push(suggestion); 
                        } else {
                            var value = getValueSuggestion(suggestion);
                            
                            if (value.like("start", pattern, $scope.patternForce)) 
                                coincidences.push(suggestion); 
                        } // El item es un objeto de tipo JSON, verificando
                    });
                    
                    return coincidences; // Coincidencias encontradas
                }
                
                function setSuggestions($pattern, suggestions, result) {
                    switch ($scope.patternMethod) {
                        case ("start"):
                            setSuggestionsByStart($pattern, suggestions, result);
                        break;
                        case ("between"):
                            setSuggestionsByStart($pattern, suggestions, result);
                        break;
                        default:
                            setSuggestionsByStart($pattern, suggestions, result);
                        break;
                    }
                }
                
                function setSuggestionsByStart(pattern, suggestions, result) {
                    $scope.temporal = {
                        suggestions: suggestions,
                        pattern: pattern,
                        before: softtion.isDefined(result) ?
                            result.temporal : undefined
                    };
                }
            }
        };
    }
    
    // Directiva: BottomNavigation
    // Version: 1.0.4
    // Updated: 07/Mar/2018
    
    Directives.BottomNavigation = BottomNavigationDirective;
    
    Directives.BottomNavigation.NAME = "BottomNavigation";
    Directives.BottomNavigation.VERSION = "1.0.4";
    Directives.BottomNavigation.KEY = "bottomNavigation";
    Directives.BottomNavigation.ROUTE = "softtion/template/bottom-navigation.html";
    
    Directives.BottomNavigation.HTML = function () {
        var content = softtion.html("ul").addClass("{{classCount}}").
            addAttribute("ng-class", "{shifting: shifting}").
            addChildren(
                softtion.html("li").
                    addAttribute("ng-repeat", "option in options").
                    addAttribute("ng-class", "{active: option.active, disabled: option.disabled}").
                    addAttribute("ng-click", "clickOption(option, $index, $event)").
                    addAttribute("tab-inex", "-1").
                    addChildren(
                        softtion.html("div").addClass("content").
                            addChildren(
                                softtion.html("i").setText("{{option.icon}}")
                            ).addChildren(
                                softtion.html("p").setText("{{option.label}}")
                            )
                    )
            );
    
        var ripple = softtion.html("div").addClass("ripple-box").
                addChildren(softtion.html("span").addClass("effect"));

        return content + ripple; // Componente
    };
    
    Directives.BottomNavigation.$inject = [ "$body", "$appContent", "$materialTheme" ];
    
    function BottomNavigationDirective($body, $appContent, $themes) {
        return {
            restrict: "C",
            templateUrl: Directives.BottomNavigation.ROUTE,
            scope: {
                options: "=?",
                views: "@",
                shifting: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var ripple = $element.children(".ripple-box"),
                    effect = ripple.children(".effect"), $views;

                    // Atributos
                var listener = new Listener($scope, []), // Listener
                    $index = -1, position = 0,
                    scrollEvent = "scroll.bottomnav-" + softtion.getGUID();
            
                $body.addClass(Classes.SHOW_BOTTOM_NAV);
                
                ripple.animationend(() => {
                    ripple.removeClass(Classes.ANIMATED).removeClass(Classes.SHOW);
                });
                
                $scope.$watch(() => { return $scope.options; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) {
                            $scope.classCount = ""; return;
                        } // Objeto opciones no es un array
                        
                        switch (newValue.length) {
                            case (3):   
                                $scope.classCount = "three-options"; break;
                            case (4): 
                                $scope.classCount = "four-options"; break;
                            case (5): 
                                $scope.classCount = "five-options"; break;
                            default: 
                                $scope.classCount = ""; break; // Ninguna Clase
                        } 
                        
                        var notActive = true; $index = 0; // Verificar
                        
                        softtion.forEach(newValue, (option, index) => {
                            if (option.active) {
                                $index = index; notActive = false; return true;
                            } // Ya existe una opción activa
                        });
                        
                        if (notActive) newValue[$index].active = true;
                        
                        setBackgroundShifting(newValue[$index]); viewActiveOption(newValue[$index]);
                    });
                    
                $attrs.$observe("views", () => {
                    var views = angular.element($scope.views);  // Vistas
                    $views = (views.exists()) ? views : undefined;
                });
                    
                $scope.clickOption = function (option, $index, $event) {
                    if (option.active) return; // Opción es la activa
                    
                    removeActiveOptions(); option.active = true;
                    
                    effect.css(getPositionRipple($event, $index)); 
                    
                    setBackgroundShifting(option); viewActiveOption(option);
                    
                    ripple.addClass(Classes.SHOW).addClass(Classes.ANIMATED);
                    listener.launch(Listeners.ACTION, { $item: option, $index: $index }); 
                };
                
                function removeActiveOptions() {
                    $scope.options.forEach((option) => { option.active = false; });
                }
                
                function getPositionRipple($event, index) {
                        // Atributos del item
                    var item = angular.element($event.currentTarget),
                        offsetLeft = item.offset().left,
                        width = item.outerWidth(), 
                        
                        // Atributos de posición
                        left = getPositionLeftRipple(width, offsetLeft, index);
                        
                    $index = index; // Actualizando el seleccionado
                
                    return { top: item.height() / 2, left: left };
                }
                
                function getPositionLeftRipple(width, offsetLeft, index) {
                    var leftElement = $element.offset().left, widthReal;
                    
                    switch ($scope.options.length) {
                        case (3): 
                            return offsetLeft + (width / 2) - leftElement;
                            
                        case (4): widthReal = ((width * 37) / 21); break;
                            
                        case (5): widthReal = ((width * 30) / 17.5); break;
                        
                        default: 
                            return offsetLeft + (width / 2) - leftElement;
                    } 
                                                        
                    return (index > $index) ? 
                        offsetLeft + ((widthReal - width) / 4) - leftElement :
                        offsetLeft + (widthReal / 2) - leftElement;
                }
                
                function setBackgroundShifting(option) {
                    if (!$scope.shifting) return; // Color por defecto
                    
                    if (!softtion.isText(option.color)) {
                        $element.addClass(Classes.DEFAULT); return;
                    } // No se definio color en el elemento
                    
                    var color = $themes.getColor(option.color, 600);

                    if (!softtion.isText(color)) {
                        $element.addClass(Classes.DEFAULT);
                    } else {
                        $element.css("background-color", color);
                        $element.removeClass(Classes.DEFAULT);
                    } // Se encontró color establecido en el elemento
                }
                
                function viewActiveOption(option) {
                    if (!softtion.isText(option.view)) return;
                    
                    if (softtion.isUndefined($views)) return;
                    
                    var view = $views.children(option.view);
                    
                    if (!view.exists()) return; // La vista no existe
                    
                    $appContent.scrollTop(0); // Posición inicial scroll
                    $views.children().removeClass(Classes.ACTIVE);
                    view.addClass(Classes.ACTIVE); // Activando vista
                }

                $appContent.on(scrollEvent, scrollBottomEvent);

                function scrollBottomEvent() {
                    if (!softtion.isInPage($element[0])) {
                        $appContent.off(scrollEvent, scrollBottomEvent);
                        $body.removeClass(Classes.SHOW_BOTTOM_NAV); return; 
                    } // Bottom Navigation no esta en documento
                    
                    var element = angular.element(this), 
                        positionNew = element.scrollTop(); // Posicion

                    (position < positionNew) ? 
                        $body.removeClass(Classes.SHOW_BOTTOM_NAV) :
                        $body.addClass(Classes.SHOW_BOTTOM_NAV);

                    position = positionNew; // Posición nueva del scroll
                }
                
                $scope.$on("$destroy", () => {
                    $body.removeClass(Classes.SHOW_BOTTOM_NAV);
                });
            }
        };
    }
    
    // Directiva: BottomSheet
    // Version: 1.0.0
    // Update: 24/Feb/2018
    
    Directives.BottomSheet = BottomSheetDirective;
    
    Directives.BottomSheet.NAME = "BottomSheet";
    Directives.BottomSheet.VERSION = "1.0.0";
    Directives.BottomSheet.KEY = "bottomSheet";
    
    Directives.BottomSheet.$inject = [ "$bottomSheet" ];
    
    function BottomSheetDirective($bottomSheet) {
        return {
            restrict: "C",
            scope: {
                marginTop: "@",
                maxWidth: "@",
                ngOpen: "=?",
                ngClose: "=?",
                ngVisible: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var backdrop = $element.children(".backdrop"),
                    bottomSheet = $bottomSheet($element),
                    content = $element.children(".content");
                    
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => {
                        if (newValue) {
                            bottomSheet.show(); $scope.ngVisible = true; $scope.ngOpen = false;
                        } // Desplegando BottomSheet
                    });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => {
                        if (newValue) {
                            bottomSheet.hide(); $scope.ngVisible = false; $scope.ngClose = false;
                        } // Ocultando BottomSheet
                    });
            
                $attrs.$observe("marginTop", () => {
                    content.css("max-height", "calc(100% - " + $scope.marginTop + ")");
                });
            
                $attrs.$observe("maxWidth", () => {
                    content.css("max-width", $scope.maxWidth);
                });

                if (!backdrop.exists()) {
                    backdrop = softtion.htmlElement("div", "backdrop");
                    
                    $element.append(backdrop); // Agregando Backdrop
                }  // Backdrop no encontrado, se debe crear nuevo y agregarlo

                backdrop.click(() => { bottomSheet.hide(); });
                    
                $element.transitionend((event) => {
                    $scope.$apply(() => {
                        var transition = event.originalEvent.propertyName,
                            target = event.originalEvent.target;
                    
                        if (target === content[0] && transition === "transform")
                            listener.launch(
                                ($element.hasClass(Classes.SHOW)) ? 
                                    Listeners.SHOW : Listeners.HIDE
                            );
                    });
                });
            }
        };
    };
    
    // Directiva: Breadcrumb
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.Breadcrumb = BreadcrumbDirective;
    
    Directives.Breadcrumb.NAME = "Breadcrumb";
    Directives.Breadcrumb.VERSION = "1.0.0";
    Directives.Breadcrumb.KEY = "breadcrumb";
    
    function BreadcrumbDirective() {
        return {
            restrict: "C",
            link: function ($scope, $element) {
                $element.displaceLeft();
            }
        };
    }
    
    // Directiva: Button
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.Button = ButtonDirective;
    
    Directives.Button.NAME = "Button";
    Directives.Button.VERSION = "1.0.0";
    Directives.Button.KEY = "button";
    
    function ButtonDirective() {
        return {
            restrict: "E",
            scope: {
                disabledRipple: "=?"
            },
            link: function ($scope, $element) {
                $scope.$watch(() => { return $scope.disabledRipple; },
                    (newValue) => {
                        (newValue) ? $element.addClass("disabled-ripple") :
                            $element.removeClass("disabled-ripple");
                    });
            }
        };
    }
    
    // Directiva: ButtonProgress
    // Version: 1.0.0
    // Update: 07/Abr/2018
    
    Directives.ButtonProgress = ButtonProgressDirective;
    
    Directives.ButtonProgress.NAME = "ButtonProgress";
    Directives.ButtonProgress.VERSION = "1.0.0";
    Directives.ButtonProgress.KEY = "buttonprogress";
    
    Directives.ButtonProgress.$inject = [ "$compile" ];
    
    function ButtonProgressDirective($compile) {
        return {
            restrict: "E",
            scope: {
                ngProgress: "=?",
                ngDisabled: "=?",
                icon: "@",
                tabindex: "@",
                ngClick: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var button = softtion.html("button").addClass(Classes.ACTION).
                        addAttribute("ng-class", "{progress: ngProgress}").
                        addAttribute("tabindex", "{{tabindex}}").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "buttonClick($event)").
                        addChildren(
                            softtion.html("i").setText("{{icon}}")
                        ).addChildren(
                            softtion.html("div").addClass("progress-circular").
                                addAttribute("indeterminate", "true").
                                addAttribute("ng-visible", "ngProgress")
                        );
            
                $element.replaceWith($compile(button.create())($scope));
                
                $scope.buttonClick = function ($event) {
                    $scope.ngClick({ $event: $event, $element: $element });
                };
                
                $scope.isDisabled = function () {
                    return $scope.ngProgress || $scope.ngDisabled;
                };
            }
        };
    }
    
    // Directiva: Carousel
    // Version: 1.0.1
    // Update: 26/Feb/2018
    
    Directives.Carousel = CarouselDirective;
    
    Directives.Carousel.NAME = "Carousel";
    Directives.Carousel.VERSION = "1.0.1";
    Directives.Carousel.KEY = "carousel";
    Directives.Carousel.ROUTE = "softtion/template/carousel.html",
                    
    Directives.Carousel.HTML = function () {
        var content = softtion.html("div").addClass("slide").
            addAttribute("ng-repeat", "slide in gallery").
            addAttribute(
                "ng-class", "{active: itemActive($index), before:" +
                "itemBefore($index), after: itemAfter($index)}"
            ).
            addChildren(
                softtion.html("img", false).addClass("center").
                    addAttribute("ng-src", "{{slide.src}}")
            );

        var actions = softtion.html("button").addClass("flat").
            addAttribute("ng-repeat", "action in actions").
            addAttribute(
                "ng-click", "clickAction(action.name, slide, $parent.$index)"
            ).setText("{{action.label}}");

        content.addChildren(
            softtion.html("div").addClass(["description", "{{position}}"]).
                addChildren(
                    softtion.html("label").addClass("title").
                        setText("{{slide.title}}")
                ).
                addChildren(
                    softtion.html("label").addClass("subtitle").
                        setText("{{slide.subtitle}}")
                ).
                addChildren(
                    softtion.html("div").addClass("actions").addChildren(actions)
                )
        );

        var buttonPrev = softtion.html("a").addClass(["arrow", "prev", "{{position}}"]).
            addAttribute("ng-click", "prev()").
            addAttribute("ng-class", "{disabled: transitionActive}").
            addAttribute("ng-if", "beforeActive()").
            addChildren(softtion.html("i").setText("chevron_left"));

        var buttonNext = softtion.html("a").addClass(["arrow", "next", "{{position}}"]).
            addAttribute("ng-click", "next()").
            addAttribute("ng-class", "{disabled: transitionActive}").
            addAttribute("ng-if", "afterActive()").
            addChildren(softtion.html("i").setText("chevron_right"));

        return content + buttonPrev + buttonNext; // Componente
    };
    
    Directives.Carousel.$inject = [ "$interval", "$timeout" ];
    
    function CarouselDirective($interval, $timeout) {
        return {
            restrict: "C",
            templateUrl: Directives.Carousel.ROUTE,
            scope: {
                gallery: "=",
                disabledInterval: "=?",
                time: "=?",
                height: "@",
                position: "@positionContent",
                actions: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, []),
                    intervalCarousel = undefined;
                
                $scope.index = 0; $scope.isContainedTwo = false; 
                $scope.containedTwo = "next";
                $scope.time = isNaN($scope.time) ? 4000 : $scope.time;

                $scope.transitionActive = false; // Desactiva cambio

                $element.css("padding-top", $scope.height || "56.6%");

                $scope.$watch(() => { return $scope.gallery; }, 
                    (newValue) => {
                        if (!softtion.isArray(newValue)) {
                            $scope.gallery = []; return;
                        } // No se le asigno un Array en la galeria
                        
                        $scope.index = 0; $interval.cancel(intervalCarousel);
                        $scope.isContainedTwo = ($scope.gallery.has(2));

                        $scope.containedTwo = "next"; // Adelante

                        (!$scope.isContainedTwo) ?  
                            $element.removeClass("two-slide") :
                            $element.addClass("two-slide");

                        $element.addClass("next"); startInterval(); // Interval
                    });

                $scope.itemActive = function (index) {
                    return $scope.index === index;
                };

                $scope.itemBefore = function (index) {
                    var before = ($scope.index - 1);

                    if (before < 0) {
                        before = ($scope.gallery.length - 1);
                    } // Item anterior es el último

                    return before === (index) && this.beforeActive();
                };

                $scope.itemAfter = function (index) {
                    var after = $scope.index + 1;

                    if (after === $scope.gallery.length) {
                        after = 0;
                    } // Item siguiente es el primero

                    return after === (index) && this.afterActive();
                };

                $scope.beforeActive = function () {
                    return (this.gallery.length > 2) || (this.containedTwo === "prev"); 
                };

                $scope.afterActive = function () {
                    return ($scope.gallery.length > 1) && (this.containedTwo === "next"); 
                };

                $scope.prev = function () {
                    $interval.cancel(intervalCarousel); prev(); startInterval();
                };

                $scope.next = function () {
                    $interval.cancel(intervalCarousel); next(); startInterval();
                };

                $scope.clickAction = function (action, item, $index) {
                    listener.launch(Listeners.ACTION, {
                        $item: item, $index: $index, $action: action
                    });
                };

                function prev() {
                    if ($scope.isContainedTwo) $scope.containedTwo = "next";

                    $element.removeClass("next").addClass("prev");
                    $scope.index--; $scope.transitionActive = true;

                    if ($scope.index < 0)  {
                        $scope.index = ($scope.gallery.length - 1);
                    } // Se salio del rango inferior de la lista

                    $timeout(() => { $scope.transitionActive = false; }, 1000);
                }

                function next() {
                    if ($scope.isContainedTwo) $scope.containedTwo = "prev";

                    $element.removeClass("prev").addClass("next");
                    $scope.index++; $scope.transitionActive = true;

                    if ($scope.index === $scope.gallery.length) {
                        $scope.index = 0;
                    } // Se alcanzo la cantidad de items

                    $timeout(() => { $scope.transitionActive = false; }, 1000);
                }

                function interval() {
                    (!$scope.isContainedTwo) ? next() : 
                        ($scope.containedTwo === "next") ? next() : prev();
                }

                function startInterval() {
                    if ($scope.disabledInterval) return; // Desactivado
                    
                    if (softtion.isInPage($element[0])) {
                        intervalCarousel = $interval(interval, $scope.time);
                    } else {
                        $interval.cancel(intervalCarousel);
                    } // Elemento no se encuentra en el documento
                }
            }
        };
    }
    
    // Directiva: Catalog
    // Version: 1.0.1
    // Update: 26/Feb/2018
    
    Directives.Catalog = CatalogDirective;
    
    Directives.Catalog.NAME = "Catalog";
    Directives.Catalog.VERSION = "1.0.1";
    Directives.Catalog.KEY = "catalog";
    Directives.Catalog.ROUTE = "softtion/template/catalog.html",
                    
    Directives.Catalog.HTML = function () {
        var arrowPrev = softtion.html("div").
                addClass(["arrow", "prev"]).
                addAttribute("ng-class", "{hidden : !isActivePrev()}").
                addAttribute("ng-click", "prev()"),

            arrowNext = softtion.html("div").
                addClass(["arrow", "next"]).
                addAttribute("ng-class", "{hidden : !isActiveNext()}").
                addAttribute("ng-click", "next()"),

            detail = softtion.html("div").addClass("description").
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
                                    softtion.html("span").setText("{{photo.subtitle}}")
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

        return container + arrowPrev + arrowNext; // Componente
    };
    
    Directives.Catalog.$inject = [ "$window", "$windowResize" ];
    
    function CatalogDirective($window, $windowResize) {
        return {
            restrict: "C",
            templateUrl: Directives.Catalog.ROUTE,
            scope: {
                gallery: "=",
                views: "=?",
                widthUniqueView: "=?",
                actions: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var container = $element.find(".container"),
                
                    // Atributos
                    listener = new Listener($scope, []),
                    keyCatalog = "wr-catalog-" + softtion.getGUID();

                $scope.index = 0; $scope.width = $window.innerWidth;

                $scope.$watch(() => { return $scope.gallery; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.gallery = [];
                    });

                $scope.$watch(() => { return $scope.actions; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.actions = [];
                    });
                    
                $scope.$watch(() => { return $scope.widthUniqueView; },
                    (newValue) => {
                        $scope.widthUnique = (isNaN(newValue)) ? 360 : newValue; 
                    });

                $scope.styleContent = function () {
                    return !($scope.width > $scope.widthUnique) ?
                        { "flex-basis": "calc(100%)" } : 
                        { "flex-basis": "calc(100% / " + getCountViews() + ")" };
                };

                $scope.isActiveContent = function ($index) {
                    return ($index === $scope.index);
                };

                $scope.isActivePrev = function () {
                    return ($scope.index > 0);
                };

                $scope.isActiveNext = function () {
                    return (!$scope.gallery.isLastIndex($scope.index));
                };

                $scope.prev = function () {
                    if ($scope.index > 0) $scope.index--;
                };

                $scope.next = function () {
                    if (this.isActiveNext()) $scope.index++;
                };

                $scope.select = function (index) {
                    if ($scope.index !== index) $scope.index = index;
                };

                $scope.positionContent = function () {
                    return ($scope.width > $scope.widthUnique) ? 
                        positionContentNormal() : 
                        positionContentUnique();
                };

                $scope.clickAction = function (action, $item, $index) {
                    listener.launch(Listeners.ACTION, {
                        $item: $item, $index: $index, $action: action
                    });
                };

                $windowResize.addListener(keyCatalog, (window) => {
                    if (!softtion.isInPage($element[0])) {
                        $windowResize.removeListener(keyCatalog); return;
                    } // Componente no se encuentra definido

                    $scope.width = window.width(); // Ajustando ancho
                });

                function getCountViews() {
                    return (isNaN($scope.views)) ? 3 : $scope.views;
                }

                function positionContentUnique() {
                    var content = container.find(".content"), 
                        width = (content.exists()) ? content.width() : 0,
                        translate = $scope.index * width * -1;

                    return {
                        "-webkit-transform": "translateX(" + translate + "px)",
                           "-moz-transform": "translateX(" + translate + "px)",
                                "transform": "translateX(" + translate + "px)"
                    };
                }

                function positionContentNormal() {
                    var content = container.find(".content"),
                        countViews = getCountViews(),
                        countActive = Math.trunc(countViews / 2),
                        translate, countItems = $scope.gallery.length,
                        width = (content.exists()) ? content.width() : 0;

                    if ($scope.index < countActive || countItems <= countViews) {
                        translate = 0;
                    } else if (($scope.index + countActive) >= countItems) {
                        translate = width * (countItems - (countActive * 2) - 1) * (-1);
                    } else {
                        translate = width * (countActive - $scope.index);
                    } // Index se encuentra en la Mitad

                    return {
                        "-webkit-transform": "translateX(" + translate + "px)",
                           "-moz-transform": "translateX(" + translate + "px)",
                                "transform": "translateX(" + translate + "px)"
                    };

                }
            }
        };
    }
    
    // Directiva: Checkbox
    // Version: 1.0.2
    // Update: 26/Feb/2018
    
    Directives.Checkbox = CheckboxDirective;
    
    Directives.Checkbox.NAME = "Checkbox";
    Directives.Checkbox.VERSION = "1.0.2";
    Directives.Checkbox.KEY = "checkbox";
    Directives.Checkbox.ROUTE = "softtion/template/checkbox.html",
                    
    Directives.Checkbox.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "checkbox").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-model", "checked");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)");

        var ripple = softtion.html("div").addClass("ripple-content").
            addChildren(softtion.html("div").addClass("box"));

        return input + label + ripple; // Componente
    };
                    
    function CheckboxDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Checkbox.ROUTE,
            scope: {
                checked: "=ngModel",
                label: "@",
                ngDisabled: "=?",
                ngReadonly: "=?",
                stopPropagation: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input[type='checkbox']");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CHECKBOX);

                $scope.clickLabel = function ($event) { 
                    if ($scope.stopPropagation) $event.stopPropagation();
                    
                    if ($scope.ngDisabled) return; // Inactivo
                    
                    if (!$scope.ngReadonly) {
                        $scope.checked = !$scope.checked; input.focus();
                    } // Componente esta habilitado
                    
                    listener.launch(Listeners.CLICK, { $event: $event });
                };
            }
        };
    }
    
    // Directiva: CheckboxControl
    // Version: 1.0.2
    // Update: 26/Feb/2018
    
    Directives.CheckboxControl = CheckboxControlDirective;
    
    Directives.CheckboxControl.NAME = "CheckboxControl";
    Directives.CheckboxControl.VERSION = "1.0.2";
    Directives.CheckboxControl.KEY = "checkboxControl";
    Directives.CheckboxControl.ROUTE = "softtion/template/checkbox-control.html",
                    
    Directives.CheckboxControl.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "checkbox").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-model", "checked");

        var label = softtion.html("label").
            addAttribute("ng-click", "clickLabel($event)");

        return input + label; // Componente
    };
                    
    function CheckboxControlDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.CheckboxControl.ROUTE,
            scope: {
                checked: "=ngModel",
                ngDisabled: "=?",
                ngReadonly: "=?",
                stopPropagation: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input[type='checkbox']");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CHECKBOX);

                $scope.clickLabel = function ($event) { 
                    if ($scope.stopPropagation) $event.stopPropagation();
                    
                    if ($scope.ngReadonly) return; // Solo léctura
                    
                    if ($scope.ngDisabled) return; // Inactivo

                    $scope.checked = !$scope.checked; input.focus();
                    listener.launch(Listeners.CLICK, { $event: $event });
                };
            }
        };
    }
    
    // Directiva: CheckboxSelect
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.CheckboxSelect = CheckboxSelectDirective;
    
    Directives.CheckboxSelect.NAME = "CheckboxSelect";
    Directives.CheckboxSelect.VERSION = "1.0.0";
    Directives.CheckboxSelect.KEY = "checkboxSelect";
    Directives.CheckboxSelect.ROUTE = "softtion/template/checkbox-select.html",
                    
    Directives.CheckboxSelect.HTML = function () {
        var label = softtion.html("label").
            addAttribute("ng-click", "clickLabel($event)");

        return label.create(); // Componente
    };
    
    function CheckboxSelectDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.CheckboxSelect.ROUTE,
            scope: {
                preventDefault: "=?",
                stopPropagation: "=?",
                ngListener: "&"
            },
            link: function ($scope) {
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.clickLabel = function ($event) { 
                    if ($scope.preventDefault) return; // Evento cancelado

                    listener.launch(Listeners.CLICK, { $event: $event });

                    if ($scope.stopPropagation) $event.stopPropagation();
                };
            }
        };
    }
    
    // Directiva: ChipInput
    // Version: 1.0.3
    // Update: 23/May/2018
    
    Directives.ChipInput = ChipInputDirective;
    
    Directives.ChipInput.NAME = "ChipInput";
    Directives.ChipInput.VERSION = "1.0.2";
    Directives.ChipInput.KEY = "chipInput";
    Directives.ChipInput.ROUTE = "softtion/template/chip-input.html",
                    
    Directives.ChipInput.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{active: inputActive}");

        var iconDescription = softtion.html("i").
            addAttribute("ng-click", "clickIconDescription($event)").
            addAttribute("ng-if", "isIconDescription()").
            addClass("description").setText("{{iconDescription}}");

        var box = softtion.html("div").addClass("box").
            addAttribute(
                "ng-class", "{focused: inputActive, disabled: ngDisabled, empty: isEmpty()}"
            );

        var chips = softtion.html("div").addClass("chips").
            addChildren(
                softtion.html("div").addClass("chip").
                    addAttribute("ng-repeat", "item in values").
                    addAttribute("ng-class", "{disabled: ngDisabled}").
                    setText("{{item}}").
                    addChildren(
                        softtion.html("div").addClass(Classes.ACTION).
                            addAttribute("ng-hide", "ngDisabled").
                            addChildren(
                                softtion.html("i").setText("close").
                                    addAttribute("ng-click", "removeItem($index)")
                            )
                    )
        );

        var input = softtion.html("input", false).
            addAttribute("type", "text").
            addAttribute("ng-model", "input").
            addAttribute("ng-click", "clickInput($event)").
            addAttribute("ng-keydown", "keydownInput($event)").
            addAttribute("ng-blur", "blurInput($event)").
            addAttribute("ng-focus", "focusInput($event)").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("placeholder", "{{placeholder}}").
            addAttribute("ng-style", "{width: resizeWidthInput()}");

        var lineShadow = softtion.html("div").addClass("line-bordered");
        var lineActive = softtion.html("div").addClass("line-shadow");

        var label = softtion.html("label").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{active: isLabelActive()}").
            setText("{{label}}").addClass("truncate");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        box.addChildren(chips).addChildren(input);

        content.addChildren(iconDescription).addChildren(box).
            addChildren(lineShadow).addChildren(lineActive).
            addChildren(label).addChildren(spanHelper);

        return content.create(); // Componente
    };
    
    function ChipInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.ChipInput.ROUTE,
            scope: {
                values: "=ngModel", 
                label: "@",
                maxCount: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                placeholder: "@", 
                helperText: "@",
                helperPermanent: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input"),
                    box = $element.find(".box"),
                    chips = $element.find(".chips");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CHIP_INPUT);

                $scope.inputActive = false; // Componente Activo
                $scope.values = $scope.values || [];
                
                $scope.$watch(() => { return $scope.values; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.values = [];
                    });
                
                $scope.$watch(() => { return $scope.maxCount; },
                    (newValue) => {
                        if (isNaN(newValue)) $scope.maxCount = -1;
                    });

                $element.click(() => { input.focus(); });

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
                    return $scope.values.isEmpty();
                };

                $scope.isLabelActive = function () {
                    return $scope.inputActive || (!this.isEmpty());
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.helperActive = function () {
                    return this.isEmpty() || $scope.helperPermanent;
                };

                $scope.clickLabel = function ($event) {
                    input.focus(); $event.stopPropagation();
                };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.clickInput = function ($event) {
                    $event.stopPropagation(); // Deteniendo propagación
                };

                $scope.focusInput = function ($event) { 
                    $scope.inputActive = true; // Activando input
                    listener.launch(Listeners.FOCUS, { $event: $event });
                };

                $scope.blurInput = function ($event) { 
                    $scope.input = undefined; $scope.inputActive = false;
                    listener.launch(Listeners.BLUR, { $event: $event });
                };

                $scope.keydownInput = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) {
                        // No ha escrito nada en el componente
                        if (!softtion.isText($scope.input)) return;

                        // Ha alcanzado cantidad permitida
                        if ($scope.values.has($scope.maxCount)) return;

                         // Texto digitado ya se encuentra en la Lista
                        if ($scope.values.hasItem($scope.input)) return; 

                        $scope.values.push($scope.input); // Item

                        listener.launch(Listeners.ADD, { $event: $event, $item: $scope.input });

                        $scope.input = undefined; // Limpiando
                    } // Se va agregar texto escrito en el componente
                };

                $scope.removeItem = function (index) {
                    if ($scope.ngDisabled) return; // Desactivado
                    
                    $scope.values.remove(index); // Removiendo
                    listener.launch(Listeners.REMOVE, { $item: $scope.values[index] });
                };
            }
        };
    }
    
    // Directiva: ClockPicker
    // Version: 1.1.2
    // Update: 26/Feb/2018
    
    Directives.ClockPicker = ClockPickerDirective;
    
    Directives.ClockPicker.NAME = "ClockPicker";
    Directives.ClockPicker.VERSION = "1.1.2";
    Directives.ClockPicker.KEY = "clockpicker";
    Directives.ClockPicker.ROUTE = "softtion/template/clockpicker.html",
                    
    Directives.ClockPicker.HTML = function () {
        var title = softtion.html("div").addClass("title").
            addChildren(
                softtion.html("div").addClass("time").
                    addChildren(
                        softtion.html("div").addClass("am-pm").
                            addChildren(
                                softtion.html("div").addClass("am").setText("AM").
                                    addAttribute("ng-click", "setZone(false)").
                                    addAttribute("ng-class", "{active: !isPM}")
                            ).
                            addChildren(
                                softtion.html("div").addClass("pm").setText("PM").
                                    addAttribute("ng-click", "setZone(true)").
                                    addAttribute("ng-class", "{active: isPM}")
                            )
                    ).addChildren(
                        softtion.html("div").addClass("minute").
                            addAttribute("ng-click", "setSelection(false)").
                            setText(":{{leadingClock(minute)}}").
                            addAttribute("ng-class", "{active: !isHours}")
                    ).addChildren(
                        softtion.html("div").addClass(["hour"]).setText("{{hour}}").
                            addAttribute("ng-class", "{active: isHours}").
                            addAttribute("ng-click", "setSelection(true)")
                    )
            );

        var content = softtion.html("div").addClass("content").
            addChildren(
                softtion.html("div").addClass("plate").
                    addAttribute("ng-pointerdown", "pointerdownPlate($event)").
                    addAttribute("ng-pointerup", "pointerupPlate($event)").
                    addAttribute("ng-pointermove", "pointermovePlate($event)").
                    addChildren(
                        softtion.html("div").addClass("canvas")
                    ).
                    addChildren(
                        softtion.html("div").addClass(["hours"]).
                            addAttribute("ng-class", "{active: isHours}").
                            addChildren(
                                softtion.html("div").addClass("tick").setText("{{hour}}").
                                    addAttribute("ng-repeat", "hour in clockValues").
                                    addAttribute("ng-style", "getPositionElement(hour)").
                                    addAttribute("ng-class", "{active: hourActive(hour)}")
                            )
                    ).
                    addChildren(
                        softtion.html("div").addClass("minutes").
                            addAttribute("ng-class", "{active: !isHours}").
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
                    addClass(["flat", "ripple"]).setText("Ok").
                    addAttribute("ng-click", "setTime()")
            ).
            addChildren(
                softtion.html("button").
                    addClass(["flat", "ripple"]).setText("Cancelar").
                    addAttribute("ng-click", "cancel()")
            );

        return title + content + footer; // Componente
    };
    
    Directives.ClockPicker.createSvgElement = function (element) {
        return document.createElementNS("http://www.w3.org/2000/svg", element);
    };
                    
    Directives.ClockPicker.paintSelector = function (canvas, attrs) {
        var directive = Directives.ClockPicker; // Directiva
        
        var svg = directive.createSvgElement("svg");
        svg.setAttribute("width", attrs.diameter);
        svg.setAttribute("height", attrs.diameter);

        var g = directive.createSvgElement("g");
        g.setAttribute("transform", "translate(" + attrs.dialRadius + ", " + attrs.dialRadius + ")");

        var bearing = directive.createSvgElement("circle");
        bearing.setAttribute("class", "bearing");
        bearing.setAttribute("cx", 0); bearing.setAttribute("cy", 0);
        bearing.setAttribute("r", 3.0);

        var hand = directive.createSvgElement("line");
        hand.setAttribute("x1", 0); hand.setAttribute("y1", 0);

        var bg = directive.createSvgElement("circle");
        bg.setAttribute("class", "bg"); bg.setAttribute("r", attrs.tickRadius);

        var fg = directive.createSvgElement("circle");
        fg.setAttribute("class", "fg"); fg.setAttribute("r", 3.5);

        g.appendChild(hand); g.appendChild(bg); g.appendChild(fg); 
        g.appendChild(bearing); svg.appendChild(g); canvas.append(svg);

        return {
            hand: hand, g: g, bg: bg, fg: fg, bearing: bearing, svg: svg
        };
    };
                    
    Directives.ClockPicker.setHand = function (x, y, isHours, canvas, attrs) {
        var radian = Math.atan2(-x, y) + Math.PI,
            unit = Math.PI / (isHours ? 6 : 30), value;

        value = Math.round(radian / unit); radian = value * unit;

        if (isHours) {
            if (value === 0) value = 12; // Hora final
            
            canvas.fg.style.visibility = "hidden";
        } else {
            ((value % 5 === 0)) ?
                canvas.fg.style.visibility = "hidden" :
                canvas.fg.style.visibility = "visible";

            if (value === 60) value = 0; // Minuto inicial
        }

        canvas.g.insertBefore(canvas.hand, canvas.bearing);
        canvas.bg.setAttribute("class", "bg");
        canvas.g.insertBefore(canvas.bg, canvas.fg);

        // Set clock hand and others' position
        var x2 = Math.sin(radian) * (attrs.radius - attrs.tickRadius),
            y2 = -Math.cos(radian) * (attrs.radius - attrs.tickRadius),
            cx = Math.sin(radian) * attrs.radius,
            cy = -Math.cos(radian) * attrs.radius;

        canvas.hand.setAttribute("x2", x2); canvas.hand.setAttribute("y2", y2);
        canvas.bg.setAttribute("cx", cx); canvas.bg.setAttribute("cy", cy);
        canvas.fg.setAttribute("cx", cx); canvas.fg.setAttribute("cy", cy);

        return value; // Retornando el valor seleccionado
    };
    
    Directives.ClockPicker.getPosition = function (value, isHours, attrs) {
        var unit = Math.PI / (isHours ? 6 : 30), radian = value * unit;

        return {
            x: Math.sin(radian) * attrs.radius, y: -Math.cos(radian) * attrs.radius
        };
    };
    
    function ClockPickerDirective() {
        var directive = Directives.ClockPicker; // Directiva
        
        return {
            restrict: "C",
            templateUrl: Directives.ClockPicker.ROUTE,
            scope: {
                time: "=ngModel", 
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var content = $element.find(".content"),
                    plate = content.find(".plate"),
                    canvas = plate.find(".canvas");

                    // Atributos
                var time = new Date(), selectionActive = false, 
                    selectionError = false,
                    listener = new Listener($scope, Listener.KEYS.CLOCKPICKER),
                    attributes = {
                        dialRadius: 116, 
                        radius: 96,
                        diameter: 232,
                        duration: 350,
                        tickRadius: 14
                    },
                    component = directive.paintSelector(canvas, attributes);
            
                $scope.clockValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];

                $scope.selection = undefined;
                $scope.hourValue = undefined;
                $scope.minuteValue = undefined;
                $scope.isPM = false; $scope.isHours = true;
                    
                $scope.hour = (time.getHours() === 0) ?
                    12 : (time.getHours() > 12) ? 
                    time.getHours() - 12 : time.getHours();
                    
                $scope.hourValue = $scope.hour;

                $scope.minute = time.getMinutes();
                $scope.minuteValue = $scope.minute;

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
                    $scope.isHours = selection; // Estableciendo tipo de selección

                    var value = ($scope.isHours) ? // Se selecciona hora
                            $scope.hour : $scope.minute,
                        position = directive.getPosition(value, $scope.isHours, attributes);

                    directive.setHand(position.x, position.y, $scope.isHours, component, attributes);
                };
                
                $scope.setZone((time.getHours() > 11)); $scope.setSelection(true);

                $scope.leadingClock = function (value) {
                    return ((value < 10) ? "0" : "") + value;
                };

                $scope.pointerdownPlate = function ($event) {
                    selectionActive = true; movePosition($event);
                };

                $scope.pointermovePlate = function ($event) {
                    if (selectionActive) movePosition($event); // Arrastre
                };

                $scope.pointerupPlate = function () {
                    selectionActive = false; // Deteniendo arrastre
                    
                    if (selectionError) return; // Error

                    if ($scope.isHours) {
                        $scope.hour = $scope.selection;
                        $scope.setSelection(false); // Minutos
                    } else {
                        $scope.minute = $scope.selection;
                    }
                };

                $scope.hourActive = function (hour) {
                    return (hour === $scope.hourValue);
                };

                $scope.minuteActive = function (minute) {
                    return ((minute - 1) * 5 === $scope.minuteValue);
                };

                $scope.setTime = function () {
                    var hour = ($scope.isPM) ?
                        ($scope.hour !== 12) ? ($scope.hour + 12) : $scope.hour :
                        ($scope.hour !== 12) ? ($scope.hour) : 0;

                    if (softtion.isUndefined($scope.time)) $scope.time = new Date();

                    $scope.time.setHours(hour); $scope.time.setMinutes($scope.minute);

                    this.setSelection(true); listener.launch(Listeners.SELECT);
                };

                $scope.cancel = function () {
                    this.setSelection(true); listener.launch(Listeners.CANCEL);
                };

                function movePosition($event) {
                    var result = calculatePosition($event); // Evento

                    if (softtion.isUndefined(result) || !result.isMove) {
                        selectionError = true; return;
                    } // Ocurrio un error al establecer dato en el Reloj
                    
                    $event.preventDefault(); selectionError = false;

                    $scope.selection = directive.setHand(
                        result.positionX, result.positionY, $scope.isHours, component, attributes
                    );

                    ($scope.isHours) ? $scope.hourValue = $scope.selection :
                        $scope.minuteValue = $scope.selection;
                }

                function calculatePosition($event) {
                    var position; // Datos de la posición de arrastre
                    
                    if (softtion.isTouchSupport()) {
                        var touches = $event.originalEvent.touches;
                        
                        if (softtion.isUndefined(touches)) return undefined;
                            
                        position = touches[0]; // Posiciones en Touch
                        
                    } else { position = $event; } // Posiciones con click
                    
                    var data = { isMove: true, positionX: 0, positionY: 0 },
                        offset = plate.offset(), 
                        startX = offset.left + attributes.dialRadius,
                        startY = offset.top + attributes.dialRadius;

                    data.positionX = position.pageX - startX; // Posicion en X
                    data.positionY = position.pageY - startY; // Posicion en Y

                    var circle = Math.sqrt(
                        data.positionX * data.positionX + data.positionY * data.positionY
                    );

                    if ((circle < attributes.radius - attributes.tickRadius) || 
                        (circle > attributes.radius + attributes.tickRadius)) {
                            data.isMove = false;
                    } // No se presiona click sobre el reloj del componente 

                    return data; // Resultado de movel componente
                }
            }
        };
    }
    
    // Directiva: ClockPickerDialog
    // Version: 1.0.1
    // Update: 26/Feb/2018
    
    Directives.ClockPickerDialog = ClockPickerDialogDirective;
    
    Directives.ClockPickerDialog.NAME = "ClockPickerDialog";
    Directives.ClockPickerDialog.VERSION = "1.0.1";
    Directives.ClockPickerDialog.KEY = "clockpickerDialog";
    Directives.ClockPickerDialog.ROUTE = "softtion/template/clockpicker-dialog.html",
                    
    Directives.ClockPickerDialog.HTML = function () {
        var dialog = softtion.html("div").addClass(["dialog", "picker-clock"]).
            addAttribute("ng-class", "{show: ngOpen}").
            addAttribute("persistent", "true").
            addChildren(
                softtion.html("div").addClass("box").addChildren(
                    softtion.html("div").addClass("clockpicker").
                        addAttribute("ng-model", "time").
                        addAttribute("ng-listener", "clockListener($model, $listener)")
                )
            );

        return dialog.create(); // Componente
    };
    
    Directives.ClockPickerDialog.$inject = [ "$body" ];
    
    function ClockPickerDialogDirective($body) {
        return {
            restrict: "C",
            templateUrl: Directives.ClockPickerDialog.ROUTE,
            scope: {
                time: "=ngModel",
                ngOpen: "=",
                parent: "@",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var parent = angular.element($scope.parent); // Padre
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CLOCKPICKER);
                
                if (parent.exists()) $element.appendTo(parent); 

                $scope.$watch(() => { return $scope.ngOpen; }, 
                    (newValue) => {
                        (!newValue) ? 
                            $body.removeClass(Classes.BODY_OVERFLOW_NONE) :
                            $body.addClass(Classes.BODY_OVERFLOW_NONE);
                    });

                $scope.clockListener = function ($model, $listener) {
                    $scope.ngOpen = false; $scope.time = $model; listener.launch($listener);
                };
            }
        };
    }
    
    // Directiva: ClockPickerInput
    // Version: 1.0.3
    // Update: 26/Feb/2018
    
    Directives.ClockPickerInput = ClockPickerInputDirective;
    
    Directives.ClockPickerInput.NAME = "ClockPickerInput";
    Directives.ClockPickerInput.VERSION = "1.0.3";
    Directives.ClockPickerInput.KEY = "clockpickerInput";
    Directives.ClockPickerInput.ROUTE = "softtion/template/clockpicker-input.html",
                    
    Directives.ClockPickerInput.HTML = function () {
        var content = softtion.html("div").addClass("content").
                addAttribute("tabindex", "0").
                addAttribute("ng-focus", "focusContent()").
                addAttribute("ng-blur", "blurContent()").
                addAttribute("ng-keypress", "keyPressContent($event)").
                addAttribute(
                    "ng-class", "{disabled: ngDisabled, active: contentActive}"
                );

        var lineShadow = softtion.html("div").
                addClass("line-bordered").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription()").
                addClass("description").setText("{{iconDescription}}");

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{disabled: ngDisabled}").
                addAttribute("ng-hide", "hideValue").
                addAttribute("ng-click", "showDialog($event)");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-click", "showDialog($event)").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var buttonClear = softtion.html("i").addClass([Classes.ACTION]).
                setText("close").addAttribute("ng-hide", "isActiveClear()").
                addAttribute("ng-click", "clearTime()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        var dialog = softtion.html("div").addClass("clockpicker-dialog").
                addAttribute("ng-model", "timePicker").
                addAttribute("ng-open", "ngOpen").
                addAttribute("ng-listener", "clockDialogListener($model, $listener)").
                addAttribute("parent", "{{parent}}");

        content.addChildren(iconDescription).addChildren(value).
            addChildren(lineShadow).addChildren(label).
            addChildren(buttonClear).addChildren(spanHelper);

        return content + dialog; // Componente
    };
                    
    function ClockPickerInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.ClockPickerInput.ROUTE,
            scope: {
                time: "=ngModel",
                label: "@",
                required: "=?",
                optional: "=?",
                format: "@",
                autoStart: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                helperText: "@",
                helperPermanent: "=?",
                parent: "@",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CLOCKPICKER);
                
                $scope.format = $scope.format || "hz:ii zz";
                $scope.ngOpen = false; // Dialog inicia oculto

                if (softtion.isUndefined($scope.time) && $scope.autoStart) 
                    $scope.time = new Date();  // Tiempo del dispositivo

                $scope.$watch(() => { return $scope.time; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefindo
                        
                        if (!softtion.isDate(newValue)) $scope.time = oldValue;
                    });
                    
                $scope.focusContent = function () {
                    $scope.contentActive = true;
                };
                    
                $scope.blurContent = function () {
                    $scope.contentActive = false;
                };
                
                $scope.keyPressContent = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) 
                        showDialog($event); // Presiono ENTER
                    
                    if ($event.originalEvent.which === KeysBoard.SPACE) 
                        showDialog($event); // Presiono SPACE
                };

                $scope.getValueModel = function () {
                    return (softtion.isDefined($scope.time)) ?
                        $scope.time.getFormat($scope.format) : "";
                };

                $scope.isActiveLabel = function () {
                    return softtion.isDefined($scope.time);
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.helperActive = function () {
                    return softtion.isUndefined($scope.time) || $scope.helperPermanent;
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.time) || $scope.ngDisabled;
                };

                $scope.showDialog = function ($event) { showDialog($event); };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.clockDialogListener = function ($model, $listener) {
                    content.focus(); $scope.time = $model;
                    listener.launch($listener); // Reportando listener
                };

                $scope.clearTime = function () {
                    $scope.time = undefined; listener.launch(Listeners.CLEAR);
                };
                
                function showDialog($event) {
                    if ($scope.ngDisabled) return; // Desactivado
                        
                    $scope.ngOpen = true; // Desplegando dialog
                    listener.launch(Listeners.SHOW, { $event: $event });
                }
            }
        };
    }
    
    // Directiva: DataTable
    // Version: 1.0.0
    // Update: 05/Abr/2018
    
    Directives.DataTable = DataTableDirective;
    
    Directives.DataTable.NAME = "DataTable";
    Directives.DataTable.VERSION = "1.0.0";
    Directives.DataTable.KEY = "datatable";
                    
    function DataTableDirective() {
        return {
            restrict: "C",
            link: function ($scope, $element) {
                    // Elementos
                var thead = $element.find("thead"),
                    tbody = $element.find("tbody");
            
                tbody.resize(() => {
                    var difference = tbody.scrollHeight() - tbody.height();
                                        
                    (difference > 1) ? thead.addClass("scrolling") : 
                        thead.removeClass("scrolling");
                });
            }
        };
    }
    
    // Directiva: DatePicker
    // Version: 1.1.6
    // Update: 26/Feb/2018
    
    Directives.DatePicker = DatePickerDirective;
    
    Directives.DatePicker.NAME = "DatePicker";
    Directives.DatePicker.VERSION = "1.1.6";
    Directives.DatePicker.KEY = "datepicker";
    Directives.DatePicker.ROUTE = "softtion/template/datepicker.html",
                    
    Directives.DatePicker.HTML = function () {
        var title = softtion.html("div").addClass("title").
            addChildren(
                softtion.html("div").addClass("year").
                    setText("{{year}}").
                    addAttribute("ng-class", "{active : selectYearEnabled}").
                    addAttribute("ng-click", "activeYear(true)")
            ).
            addChildren(
                softtion.html("div").addClass("day").
                    setText("{{getDescriptionDaySelect()}}").
                    addAttribute("ng-class", "{active : !selectYearEnabled}").
                    addAttribute("ng-click", "activeDay()")
            );

        var content = softtion.html("div").addClass("content").
            addChildren(
                softtion.html("div").addClass("month").
                    addAttribute("ng-hide", "(selectYearEnabled || selectMonthEnabled)").
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
                    addAttribute("ng-hide", "(selectYearEnabled || selectMonthEnabled)").
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
                                                "{disabled : isDisabledDay(day.value)," +
                                                " today: isToday(day.value)," +
                                                " active: isActiveDay(day.value)," +
                                                " selected: isSelectedDay(day.value)}"
                                            ).addAttribute("ng-click", "selectDay(day.value)").
                                            setText("{{day.value}}")
                                    )
                            )
                    )
            ).
            addChildren(
                softtion.html("div").addClass("months").addAttribute("ng-hide", "!selectMonthEnabled").
                    addChildren(
                        softtion.html("ul").
                            addChildren(
                                softtion.html("li").
                                    addAttribute("ng-repeat", "month in months").
                                    setText("{{month.name}}").
                                    addAttribute("ng-click", "selectMonth(month.value)").
                                    addAttribute("ng-class",
                                        "{active : isActiveMonth(month.value), disabled: monthListEnabled(month.value) }"
                                    )
                            )
                    )
            ).
            addChildren(
                softtion.html("div").addClass("year").addAttribute("ng-hide", "!selectYearEnabled").
                    addChildren(
                        softtion.html("ul").
                            addChildren(
                                softtion.html("li").
                                    addAttribute("ng-repeat", "year in years").
                                    setText("{{year}}").
                                    addAttribute("ng-click", "selectYear(year)").
                                    addAttribute("ng-class", "{active : isActiveYear(year)}")
                            )
                    )
            );

        var actions = softtion.html("div").addClass("actions").
            addChildren(
                softtion.html("button").
                    addClass(["flat", "ripple"]).setText("Ok").
                    addAttribute("ng-click", "setDate()")
            ).
            addChildren(
                softtion.html("button").
                    addClass(["flat", "ripple"]).setText("Cancelar").
                    addAttribute("ng-click", "cancel()")
            );

        return title + content + actions; // Componente
    };
    
    Directives.DatePicker.createCalendar = function (year, month, dayWeekStart, daysMonth) {
        if (month === 1 && softtion.isLeapYear(year)) daysMonth++;

        var calendarMonth = [], firstWeek = [], countDay = 1;

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

            stop = (countDay > daysMonth); // Verificando
        }

        if (!softtion.isArrayEmpty(week)) calendarMonth.push(week);

        return calendarMonth; // Retornando calendario
    };
    
    Directives.DatePicker.createYears = function (year, minDate, maxDate, yearRange) {
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

        years = yearsPrev.together([year]); years = years.together(yearsNext);

        return years; // Retornando años para la selección
    };
    
    Directives.DatePicker.$inject = [ "$body" ];
                    
    function DatePickerDirective($body) {
        var directive = Directives.DatePicker; // Directiva
        
        return {
            restrict: "C",
            templateUrl: Directives.DatePicker.ROUTE,
            scope: {
                date: "=ngModel",
                autostart: "=?",
                minDate: "=?",
                maxDate: "=?",
                yearRange: "=?",
                ngDisabledDate: "&",
                ngListener: "&"
            },
            link: function ($scope, $elememt) {
                    // Componentes
                var table = $elememt.find(".content table.days-month"),
                    listYears = $elememt.find(".content .year"),
                    listMonths = $elememt.find(".content .months");

                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER),
                    
                    today = new Date().normalize("date"), 
                    dateStart = new Date(), dateCalendar = new Date(),
                    
                    yearRange = !isNaN($scope.yearRange) ?
                        parseInt($scope.yearRange) : 10,
                    
                    DAYS_OF_MONTHS = MANAGER_DATETIME.DAYS_OF_MONTHS,
                    MONTHS_OF_YEAR = MANAGER_DATETIME.MONTHS_OF_YEAR,
                    
                    fontSize = parseInt($body.css("font-size"));

                $scope.$watch(() => { return $scope.date; }, 
                    (newValue, oldValue) => {
                        if (softtion.isDate(newValue)) {
                            initDatePicker(newValue); 
                        } else if (softtion.isDefined(newValue)) {
                            $scope.date = oldValue;
                        } // Valor definido no es una fecha
                    });

                $scope.selectYearEnabled = false; $scope.selectMonthEnabled = false;

                $scope.months = MANAGER_DATETIME.MONTHS;
                    
                if ($scope.autostart && !softtion.isDate($scope.date))
                    $scope.date = today; // Iniciando model
                
                if (softtion.isDate($scope.minDate)) {
                    $scope.minDate.normalize("date");
                    
                    if (!$scope.minDate.isBefore(dateStart))
                        dateCalendar = $scope.minDate;
                } // Se ha definido fecha menor en el componente
                
                if (softtion.isDate($scope.maxDate)) {
                    $scope.maxDate.normalize("date");
                    
                    if (!$scope.maxDate.isAfter(dateStart))
                        dateCalendar = $scope.maxDate;
                } // Se ha definido fecha mayor en el componente
                
                initDatePicker(dateCalendar); // Iniciando calendario

                listYears.scroll(() => {
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

                            $scope.years = $scope.years.together(newYears);
                        } else if (scrollTop <= 10) {
                            var year = $scope.years.first(),
                                yearLimit = (softtion.isDefined($scope.minDate)) ? 
                                    $scope.minDate.getFullYear() : 0;

                            for (var i = 0; i < 5; i++) {
                                if ((year + i - 5) > yearLimit) {
                                    newYears.push((year + i - 5));
                                } // No desborda limite inferior
                            } //  Cargando años anteriores de rango

                            $scope.years = newYears.together($scope.years);
                        }
                    }

                    $scope.$apply(updateYears); // Agregando años
                });

                // FUNCIONES PARA CONTROL DE AÑOS

                $scope.isActiveYear = function (year) {
                    return ($scope.year === year);
                };

                $scope.activeYear = function (enabled) {
                    $scope.selectYearEnabled = enabled;  // Estado

                    if ($scope.selectYearEnabled) {
                        $scope.years = directive.createYears(
                            $scope.year, $scope.minDate, $scope.maxDate, yearRange
                        );

                        if ($scope.selectMonthEnabled) {
                            $scope.activeMonth(false);
                        } // Desactivando selección del mes

                        var scroll = (yearRange - 3) * 2.5 * fontSize;
                        listYears.animate({ scrollTop: scroll }, 100);
                    } // Esta desactivado selección de Año
                };

                $scope.selectYear = function (year) {
                    if ($scope.year !== year) {
                        $scope.year = year; dateStart.setYear($scope.year);
                        var countDaysMonth = DAYS_OF_MONTHS[$scope.month];

                        $scope.daysMonth = directive.createCalendar(
                            $scope.year, $scope.month, dateStart.getDay(), countDaysMonth
                        );
                    } // Cambio de año en el Componente

                    $scope.activeYear(false); // Desactivando selección de Año
                };

                // FUNCIONES PARA CONTROL DE MESES

                $scope.isActiveMonth = function (month) {
                    return ($scope.month === month);
                };

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

                $scope.activeMonth = function (enabled) {
                    $scope.selectMonthEnabled = enabled; // Estado

                    if ($scope.selectMonthEnabled) {
                        var scroll = ($scope.month - 2) * 2.5 * fontSize;
                        listMonths.animate({ scrollTop: scroll }, 100);
                    } // Se activo selección de Mes
                };

                $scope.changedMonth = function (event) {
                    var classTransition = undefined; // Transicción
                    
                    if (event) {
                        $scope.month++; classTransition = "slide-in-right";

                        if ($scope.month > 11) {
                            $scope.month = 0; $scope.year++; dateStart.setYear($scope.year);
                        } // Ha superado el año actual
                    } else {
                        $scope.month--; classTransition = "slide-in-left";

                        if ($scope.month < 0) {
                            $scope.month = 11; $scope.year--; dateStart.setYear($scope.year);
                        } // Ha regresado el año actual
                    } // Se decrementa el calendario
                    
                    table.addClass(classTransition); // Agregando transición

                    setTimeout(() => { table.removeClass(classTransition); }, 300);

                    dateStart.setMonth($scope.month); // Mes seleccionado
                    $scope.monthText = MONTHS_OF_YEAR[$scope.month];

                    $scope.daysMonth = directive.createCalendar(
                        $scope.year, $scope.month, dateStart.getDay(), DAYS_OF_MONTHS[$scope.month]
                    );
                };

                $scope.selectMonth = function (month) {
                    if ($scope.month !== month) {
                        $scope.month = month; dateStart.setMonth($scope.month);
                        $scope.monthText = MONTHS_OF_YEAR[$scope.month];
                        var countDaysMonth = DAYS_OF_MONTHS[$scope.month];

                        $scope.daysMonth = directive.createCalendar(
                            $scope.year, $scope.month, dateStart.getDay(), countDaysMonth
                        );
                    } // Cambio de año en el Componente

                    $scope.activeMonth(false); // Desactivando selección del Mes
                };

                // FUNCIONES PARA CONTROL DE DÍAS

                $scope.getDescriptionDaySelect = function () {
                    var date = (softtion.isDate($scope.date)) ? $scope.date : today;

                    return date.getFormat("dw, mx dd del aa"); // Descripción
                };

                $scope.isToday = function (day) {
                    return (softtion.isUndefined(day)) ? false :
                        today.equalsDate($scope.year, $scope.month, day); 
                };

                $scope.isDisabledDay = function (day) {
                    if (softtion.isUndefined(day)) return true; // Día desconocido

                    return validateDateEnabled(new Date($scope.year, $scope.month, day));
                };

                $scope.isActiveDay = function (day) {
                    if (softtion.isUndefined(day)) return false;  // Día desconocido
                                
                    return (!softtion.isDate($scope.selectDate)) ? false :
                        $scope.selectDate.equalsDate($scope.year, $scope.month, day);
                };

                $scope.isSelectedDay = function (day) {
                    if (softtion.isUndefined(day)) return false;  // Día desconocido
                    
                    return (!softtion.isDate($scope.date)) ? false :
                        $scope.date.equalsDate($scope.year, $scope.month, day);
                };

                $scope.activeDay = function () {
                    $scope.activeMonth(false); $scope.activeYear(false);
                };

                $scope.selectDay = function (day) {
                    $scope.selectDate = new Date($scope.year, $scope.month, day);
                    $scope.day = day; // Estableciendo dia seleccionado
                };

                // FUNCIONES PARA CONTROL DE LA FECHA

                $scope.setDate = function () {
                    $scope.date = getDate(); listener.launch(Listeners.SELECT);
                };

                $scope.cancel = function () { listener.launch(Listeners.CANCEL); };

                function initDatePicker(date) {
                    dateStart.setFullYear(date.getFullYear()); 
                    dateStart.setDate(1); 
                    dateStart.setMonth(date.getMonth()); 

                    $scope.year = date.getFullYear();
                    $scope.day = date.getDate();
                    $scope.month = date.getMonth();

                    $scope.monthText = MONTHS_OF_YEAR[$scope.month];

                    $scope.daysMonth = directive.createCalendar(
                        $scope.year, $scope.month, dateStart.getDay(), DAYS_OF_MONTHS[$scope.month]
                    );
                }
                
                function getDate() {
                    return new Date($scope.year, $scope.month, $scope.day);
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
            }
        };
    }
    
    // Directiva: DatePickerDialog
    // Version: 1.0.1
    // Update: 26/Feb/2018
    
    Directives.DatePickerDialog = DatePickerDialogDirective;
    
    Directives.DatePickerDialog.NAME = "DatePickerDialog";
    Directives.DatePickerDialog.VERSION = "1.0.1";
    Directives.DatePickerDialog.KEY = "datepickerDialog";
    Directives.DatePickerDialog.ROUTE = "softtion/template/datepicker-dialog.html",
                    
    Directives.DatePickerDialog.HTML = function () {
        var dialog = softtion.html("div").addClass(["dialog", "picker-date"]).
            addAttribute("ng-class", "{show: ngOpen}").
            addAttribute("persistent", "true").
            addChildren(
                softtion.html("div").addClass("box").
                    addChildren(
                        softtion.html("div").addClass("datepicker").
                            addAttribute("ng-model", "date").
                            addAttribute("autostart", "autostart").
                            addAttribute("ng-disabled-date", "ngDisabledDatePicker($date)").
                            addAttribute("ng-listener", "dateListener($model, $listener)").
                            addAttribute("min-date", "minDate").
                            addAttribute("max-date", "maxDate").
                            addAttribute("year-range", "yearRange")
                    )
            );

        return dialog.create(); // Componente
    };
                    
    function DatePickerDialogDirective($body) {
        return {
            restrict: "C",
            templateUrl: Directives.DatePickerDialog.ROUTE,
            scope: {
                date: "=ngModel",
                autostart: "=?",
                minDate: "=?",
                maxDate: "=?",
                yearRange: "=?",
                ngOpen: "=",
                parent: "@",
                ngDisabledDate: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var parent = angular.element($scope.parent); // Padre
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER);
                
                if (parent.exists()) $element.appendTo(parent); 

                $scope.$watch(() => { return $scope.ngOpen; }, 
                    (newValue) => {
                        (!newValue) ? $body.removeClass(Classes.BODY_OVERFLOW_NONE) :
                            $body.addClass(Classes.BODY_OVERFLOW_NONE);
                    });

                $scope.dateListener = function ($model, $listener) {
                    $scope.ngOpen = false; $scope.date = $model; listener.launch($listener);
                };

                $scope.ngDisabledDatePicker = function ($date) {
                    return $scope.ngDisabledDate({$date: $date});
                };
            }
        };
    }
    
    // Directiva: DatePickerInput
    // Version: 1.0.4
    // Update: 26/Feb/2018
    
    Directives.DatePickerInput = DatePickerInputDirective;
    
    Directives.DatePickerInput.NAME = "DatePickerInput";
    Directives.DatePickerInput.VERSION = "1.0.4";
    Directives.DatePickerInput.KEY = "datepickerInput";
    Directives.DatePickerInput.ROUTE = "softtion/template/datepicker-input.html",
                    
    Directives.DatePickerInput.HTML = function () {
        var content = softtion.html("div").addClass("content").
                addAttribute("tabindex", "0").
                addAttribute("ng-focus", "focusContent()").
                addAttribute("ng-blur", "blurContent()").
                addAttribute("ng-keypress", "keyPressContent($event)").
                addAttribute(
                    "ng-class", "{disabled: ngDisabled, active: contentActive}"
                );

        var lineShadow = softtion.html("div").
                addClass("line-bordered").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription()").
                addClass("description").setText("{{iconDescription}}");

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{disabled: ngDisabled}").
                addAttribute("ng-hide", "hideValue").
                addAttribute("ng-click", "showDialog($event)");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-click", "showDialog($event)").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var buttonClear = softtion.html("i").addClass([Classes.ACTION]).
                setText("close").addAttribute("ng-hide", "isActiveClear()").
                addAttribute("ng-click", "clearDate()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        var dialog = softtion.html("div").addClass("datepicker-dialog").
                addAttribute("ng-model", "date").
                addAttribute("autostart", "autostart").
                addAttribute("ng-open", "ngOpen").
                addAttribute("ng-listener", "dateDialogListener($model, $listener)").
                addAttribute("parent", "{{parent}}").
                addAttribute("min-date", "minDate").
                addAttribute("max-date", "maxDate").
                addAttribute("ng-disabled-date", "ngDisabledDateDialog($date)").
                addAttribute("year-range", "yearRange");

        content.addChildren(iconDescription).addChildren(value).
            addChildren(lineShadow).addChildren(label).
            addChildren(buttonClear).addChildren(spanHelper);

        return content + dialog; // Componente
    };
    
    function DatePickerInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.DatePickerInput.ROUTE,
            scope: {
                date: "=ngModel",
                autostart: "=?",
                format: "@",
                label: "@",
                required: "=?",
                optional: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                helperText: "@",
                helperPermanent: "=?",

                minDate: "=?",
                maxDate: "=?",
                yearRange: "=?",
                parent: "@",
                ngDisabledDate: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER);
                
                $scope.format = $scope.format || "ww, dd de mn del aa";
                $scope.ngOpen = false; // Dialog inicia oculto

                $scope.$watch(() => { return $scope.time; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefindo
                        
                        if (!softtion.isDate(newValue)) $scope.date = oldValue;
                    });
                    
                $scope.focusContent = function () {
                    $scope.contentActive = true;
                };
                    
                $scope.blurContent = function () {
                    $scope.contentActive = false;
                };
                
                $scope.keyPressContent = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) 
                        showDialog($event); // Presiono ENTER
                    
                    if ($event.originalEvent.which === KeysBoard.SPACE) 
                        showDialog($event); // Presiono SPACE
                };

                $scope.getValueModel = function () {
                    return (softtion.isDefined($scope.date)) ?
                        $scope.date.getFormat($scope.format) : "";
                };

                $scope.isActiveLabel = function () {
                    return (softtion.isDefined($scope.date));
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.helperActive = function () {
                    return softtion.isUndefined($scope.date) || $scope.helperPermanent;
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.date) || $scope.ngDisabled;
                };

                $scope.showDialog = function ($event) { showDialog($event); };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.dateDialogListener = function ($model, $listener) {
                    content.focus(); $scope.date = $model;
                    listener.launch($listener); // Reportando listener
                };

                $scope.ngDisabledDateDialog = function ($date) {
                    return $scope.ngDisabledDate({ $date: $date });
                };

                $scope.clearDate = function () {
                    $scope.date = undefined; listener.launch(Listeners.CLEAR);
                };
                
                function showDialog($event) {
                    if ($scope.ngDisabled) return; // Desactivado
                        
                    $scope.ngOpen = true; // Desplegando dialog
                    listener.launch(Listeners.SHOW, { $event: $event });
                }
            }
        };
    }
    
    // Directiva: Dialog
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Directives.Dialog = DialogDirective;
    
    Directives.Dialog.NAME = "Dialog";
    Directives.Dialog.VERSION = "1.0.0";
    Directives.Dialog.KEY = "dialog";
    
    Directives.Dialog.$inject = [ "$dialog" ];
    
    function DialogDirective($dialog) {
        return {
            restrict: "C",
            scope: {
                persistent: "=?",
                ngOpen: "=?",
                ngClose: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var backdrop = $element.children(".backdrop"),
                    dialog = $dialog($element),
                    box = $element.children(".box");
                    
                    // Atributos
                var listener = new Listener($scope, []);

                if (!backdrop.exists()) {
                    backdrop = softtion.htmlElement("div", "backdrop");
                    
                    $element.append(backdrop); // Agregando Backdrop
                }  // Backdrop no encontrado, se debe crear nuevo y agregarlo

                backdrop.click(() => { 
                    if (!$scope.persistent) dialog.hide(); 
                });
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => {
                        if (newValue) {
                            dialog.show(); $scope.ngOpen = false;
                        } // Desplegando Dialog
                    });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => {
                        if (newValue) {
                            dialog.hide(); $scope.ngClose = false;
                        } // Ocultando Dialog
                    });
                    
                $element.transitionend((event) => {
                    $scope.$apply(() => {
                        var transition = event.originalEvent.propertyName,
                            target = event.originalEvent.target;
                    
                        if (target === box[0] && transition === "transform")
                            listener.launch(
                                ($element.hasClass(Classes.SHOW)) ? 
                                    Listeners.SHOW : Listeners.HIDE
                            );
                    });
                });
            }
        };
    }
    
    // Directiva: Dictionary
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.Dictionary = DictionaryDirective;
    
    Directives.Dictionary.NAME = "Dictionary";
    Directives.Dictionary.VERSION = "1.0.0";
    Directives.Dictionary.KEY = "dictionary";
    Directives.Dictionary.ROUTE = "softtion/template/dictionary.html";
                    
    Directives.Dictionary.HTML = function () {
        var content = softtion.html("div").addClass("content");

        var textField = softtion.html("div").addClass("textfield").
            addAttribute("ng-model", "valueInput").
            addAttribute("label", "{{label}}").
            addAttribute("ng-listener", "inputListener($listener, $value)");

        var itemList = softtion.html("div").addClass("content").
            addChildren(
                softtion.html("div").addClass("detail").
                    addChildren(
                        softtion.html("label").addClass("title").setText("{{item}}")
                    )
            );

        var list = softtion.html("ul").
            addClass("list").addChildren(
                softtion.html("li").addClass(["item-list", "actionable"]).
                    addAttribute("ng-click", "clickItem(item)").
                    addAttribute("ng-repeat", "item in list | filterDictionary:filter").
                    addChildren(itemList) // Agregando lista
            );

        content.addChildren(textField).addChildren(list);

        return content.create(); // Componente
    };
    
    function DictionaryDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Dictionary.ROUTE,
            scope: {
                list: "=ngModel",
                label: "@",
                ngListener: "&"
            },
            link: function ($scope) {
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.inputListener = function ($listener, $value) {
                    if ($listener === Listeners.KEY_UP) $scope.filter = $value;
                };

                $scope.clickItem = function ($item) {
                    listener.launch(Listeners.SELECT, { $item: $item });
                };
            }
        };
    }
    
    // Directiva: Expansion Panel
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.ExpansionPanel = ExpansionPanelDirective;
    
    Directives.ExpansionPanel.NAME = "ExpansionPanel";
    Directives.ExpansionPanel.VERSION = "1.0.0";
    Directives.ExpansionPanel.KEY = "expansionPanel";
    
    Directives.ExpansionPanel.BUTTON_ACTION = function () {
        return softtion.html("button").
            addClass([ Classes.ACTION, "action-expansion" ]).
            addChildren(
                softtion.html("i").setText("expand_more")
            );
    };
                    
    function ExpansionPanelDirective() {
        var directive = Directives.ExpansionPanel; // Directiva
        
        return {
            restrict: "C",
            link: function ($scope, $element) {
                var header = $element.children(".header"),
                    body = $element.children(".body");

                if (body.exists()) {
                    var content = body.children(".content"),
                        actions = body.children(".actions"),
                        button = angular.element(directive.BUTTON_ACTION().create());

                    header.append(button); // Botón de expansión

                    header.click(() => {
                        var collapsibles = $element.siblings(".collapsible");

                        collapsibles.removeClass(Classes.ACTIVE); // Desactivando
                        collapsibles.children(".body").css("max-height", "0px");

                        $element.toggleClass(Classes.ACTIVE); // Cambiando estado

                        if ($element.hasClass(Classes.ACTIVE)) {
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
                    
                    content.resize(() => {
                        if ($element.hasClass(Classes.ACTIVE)) {
                            var heightActions = actions.innerHeight(),
                                heightContent = content.innerHeight(),

                                heightBody = // Calculando alto del Body
                                    ((isNaN(heightContent)) ? 0 : heightContent) + 
                                    ((isNaN(heightActions)) ? 0 : heightActions);

                            body.css("max-height", heightBody + "px");
                        } // Elemento activado y cambio de tamaño
                    });
                } // El componente no tiene contenedor
            }
        };
    }
    
    // Directiva: FabDialog
    // Version: 1.0.0
    // Update: 17/Abr/2018
    
    Directives.FabDialog = FabDialogDirective;
    
    Directives.FabDialog.NAME = "FabDialog";
    Directives.FabDialog.VERSION = "1.0.0";
    Directives.FabDialog.KEY = "fabDialog";
    
    Directives.FabDialog.$inject = [ "$compile" ];
    
    function FabDialogDirective($compile) {
        return {
            restrict: "C",
            scope: {
                ngOpen: "=?",
                ngClose: "=?",
                ngVisible: "=?",
                icon: "@",
                ngDisabled: "=?"
            },
            link: function ($scope, $element) {
                    // Componentes
                var backdrop = $element.children(".backdrop"),
                    box = $element.children(".box");
                    
                    // Atributos
                var button = softtion.html("div").addClass("button").
                        addChildren(softtion.html("i").setText("{{icon}}"));
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => {
                        if (!newValue) return;  // No se debe hacer nada
                        
                        if (!$scope.ngDisabled) $element.addClass(Classes.ACTIVE);
                        
                        $scope.ngOpen = false; $scope.ngVisible = true;
                    });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => {
                        if (!newValue) return; // No se debe hacer nada
                        
                        $element.removeClass(Classes.ACTIVE);
                        
                        $scope.ngClose = false; $scope.ngVisible = false;
                    });
                
                $scope.$watch(() => { return $scope.ngDisabled; },
                    (newValue) => {
                        if (newValue) {
                            $element.addClass(Classes.DISABLED);
                            $scope.ngClose = true; // Cerrando componente
                        } else {
                            $element.removeClass(Classes.DISABLED);
                        } // Reactivando componente
                    });

                if (!backdrop.exists()) {
                    backdrop = softtion.htmlElement("div", "backdrop");
                    
                    $element.append(backdrop); // Agregando Backdrop
                }  // Backdrop no encontrado, se debe crear nuevo y agregarlo
                
                box.append($compile(button.create())($scope));
                
                box.on("click", ($event) => {
                    if ($element.hasClass(Classes.ACTIVE)) {
                        if (box.is($event.target))
                            $scope.$apply(() => { $scope.ngClose = true; });
                        
                        return; // Componente se encuentra abierto
                    }
                    
                    $scope.$apply(() => { $scope.ngOpen = true; });
                });
                
                backdrop.on("click", () => {
                    if (!$element.hasClass(Classes.ACTIVE)) return;
                    
                    $scope.$apply(() => { $scope.ngClose = true; });
                });
            }
        };
    }
    
    // Directiva: FabMenu
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.FabMenu = FabMenuDirective;
    
    Directives.FabMenu.NAME = "FabMenu";
    Directives.FabMenu.VERSION = "1.0.0";
    Directives.FabMenu.KEY = "fabMenu";
    Directives.FabMenu.ROUTE = "softtion/template/fab-menu.html";
    
    Directives.FabMenu.HTML = function () {
        var orbit = softtion.html("div").addClass("orbit-content").
            addChildren(
                softtion.html("div").addClass("button").
                    addAttribute("tab-index", "-1").
                    addAttribute("ng-click", "openMenu()").
                    addAttribute("ng-class", "{disabled: ngDisabled}").
                    addChildren(
                        softtion.html("i").setText("{{icon}}")
                    )
            );
        
        var content = softtion.html("div").addClass("content").
            addChildren(
                softtion.html("ul").addClass("menu").
                    addChildren(
                        softtion.html("li").addClass("option").
                            addAttribute("ng-repeat", "item in options").
                            addAttribute("ng-class", "{disabled: item.disabled}").
                            addAttribute("ng-click", "closeMenu(item, $index)").
                            addChildren(
                                softtion.html("i").setText("{{item.icon}}").
                                    addAttribute("ng-if", "isIconDefined(item.icon)")
                            ).
                            addChildren(
                                softtion.html("span").setText("{{item.label}}")
                            )
                    )
            );

        return orbit + content; // Componente
    };
    
    function FabMenuDirective() {
        return {
            restrict: "C", 
            templateUrl: Directives.FabMenu.ROUTE,
            scope: {
                options: "=?",
                icon: "@",
                ngDisabled: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var orbit = $element.children(".orbit-content");
                
                    // Atributos
                var listener = new Listener($scope, []);
                
                $element.animationstart(() => { orbit.css("height", "200px"); });
                
                $element.animationend(() => { orbit.css("height", "0px"); });
                
                $scope.$watch(() => { return $scope.options; },
                    (newValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefinido
                        
                        if (!softtion.isArray(newValue)) $scope.options = [];
                    });
                    
                $scope.isIconDefined = function (icon) {
                    return softtion.isText(icon);
                };
                    
                $scope.openMenu = function () {
                    $element.addClass(Classes.START).addClass(Classes.ACTIVE);
                    listener.launch(Listeners.SHOW); // Desplegando FabMenu
                };
                    
                $scope.closeMenu = function (item, $index) {
                    $element.removeClass(Classes.ACTIVE); // Ocultando FabMenu
                    listener.launch(Listeners.ACTION, { $item: item, $index: $index }); 
                };
            }
        };
    }
    
    // Directiva: FabSpeedDial
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.FabSpeedDial = FabSpeedDialDirective;
    
    Directives.FabSpeedDial.NAME = "FabSpeedDial";
    Directives.FabSpeedDial.VERSION = "1.0.0";
    Directives.FabSpeedDial.KEY = "fabSpeedDial";
    
    function FabSpeedDialDirective() {
        return {
            restrict: "C",
            link: function ($scope, $element) {
                var button = $element.children("button.floating"),
                    icon = button.children("i"),
                    nameIcon = icon.text(); // Icono establecido

                $element.find("button.floating").addClass("static");

                button.on("click.fab-speeddial", () => {
                    button.addClass(Classes.ACTIVE); $element.toggleClass(Classes.ACTIVE);

                    ($element.hasClass(Classes.ACTIVE)) ?
                        icon.text("close") : icon.text(nameIcon);
                });
            }
        };
    }
    
    // Directiva: Filechooser
    // Version: 1.0.4
    // Update: 26/Feb/2018
    
    Directives.Filechooser = FileChooserDirective;
    
    Directives.Filechooser.NAME = "FileChooser";
    Directives.Filechooser.VERSION = "1.0.4";
    Directives.Filechooser.KEY = "filechooser";
    Directives.Filechooser.ROUTE = "softtion/template/filechooser.html",
                    
    Directives.Filechooser.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "file");

        var content = softtion.html("div").addClass("content").
            addChildren(
                softtion.html("div").addClass("select-file").
                    addAttribute("ng-class", "{error: isError}").
                    addAttribute("ng-hide", "isSelectedFile()").
                    addAttribute("ng-click", "selectFile($event)"). 
                    addChildren(
                        softtion.html("i").setText("{{getIconDescription()}}").
                            addAttribute("ng-class", "{disabled: ngDisabled}")
                    ).addChildren(
                        softtion.html("p").setText("{{getTextDescription()}}").
                            addAttribute("ng-class", "{disabled: ngDisabled}")
                    ).addChildren(
                        softtion.html("div").addClass("bar").
                            addAttribute("ng-hide", "!isLoading").
                            addChildren(
                                softtion.html("div").addClass("progress").
                                    addAttribute("ng-style", "{width: progress}")
                            )
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
                                    ).addChildren(
                                        softtion.html("div").addClass("description").
                                            addAttribute("ng-class", "{actionable: isIconAction()}").
                                            addChildren(
                                                softtion.html("div").addClass("avatar").
                                                    addChildren(
                                                        softtion.html("i").setText("{{getIconFile(file.type)}}")
                                                    )
                                            ).addChildren(
                                                softtion.html("label").addClass("name").setText("{{file.name}}")
                                            ).addChildren(
                                                softtion.html("button").addClass(Classes.ACTION).
                                                    addAttribute("ng-click", "clickIconAction($event)").
                                                    addChildren(softtion.html("i").setText("{{iconAction}}"))
                                            )
                                    )
                            )
                    )
            );

        return input + content; // Componente
    };
                    
    Directives.Filechooser.$inject = [ "$timeout", "$sce", "$materialConstant" ];
                    
    function FileChooserDirective($timeout, $sce, $material) {
        return {
            restrict: "C",
            templateUrl: Directives.Filechooser.ROUTE,
            scope: {
                file: "=ngModel",
                ngDisabled: "=?",
                textDescription: "@label",
                iconAction: "@",
                fileTypes: "=?",
                maxSize: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.FILECHOOSER),
                    fileInput = $element.find("input[type=file]"),
                    imagesFormat = $material.File.imagesFormat,
                    viewPreview = $element.find(".view-preview"),
                    heightStart = (viewPreview.height() - 16);

                $scope.file = undefined; // Archivo seleccionado
                $scope.progress = "0%"; // Progreso de carga
                
                $scope.$watch(() => { return $scope.fileTypes; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.fileTypes = [];
                    });

                function processFile(file) {
                    var reader = new FileReader(); // Reader de file

                    reader.onloadstart = function () {
                        $scope.$apply(() => {
                            $scope.isLoading = true; $scope.progress = "0%";
                        });
                    };

                    reader.onprogress = function ($event) {
                        $scope.$apply(() => {
                            $scope.progress = (($event.loaded / $event.total) * 100) + "%";
                        });
                    };

                    reader.onloadend = function () {
                        $scope.$apply(() => {
                            $scope.isLoading = false; $scope.progress = "100%";
                        });
                    };
                    
                    reader.onload = function ($event) {
                        $scope.$apply(() => {
                            var fileResult = $event.target.result; 
                            file["base64"] = fileResult; 
                            $scope.isError = false; $scope.isLoading = false;

                            $scope.file = file; listener.launch(Listeners.CHANGED);
                        });
                    };
                    
                    reader.onerror = function () {
                        $scope.$apply(() => {
                            $scope.isError = true; $scope.isLoading = false;
                        });
                    };

                    $timeout(() => { reader.readAsDataURL(file); }, 250);

                    return reader; // Retornando procesador de Archivo
                }

                fileInput.change(() => {
                    var files = fileInput[0].files; // Archivos seleccionados

                    if (files.length) {
                        if (!$scope.fileTypes.hasItem(files[0].type) &&
                            !$scope.fileTypes.isEmpty()) return;
                    
                        if ($scope.isInvalidSize(files[0].size)) return;
                                    
                        processFile(files[0]); // Se puede procesar seleccionado
                    } // Se cambio archivo al realizar seleccion
                });
                
                $scope.getTextDescription = function () {
                    return ($scope.isError) ?
                        "Ocurrio un error al cargar archivo" : 
                        ($scope.isLoading) ?
                            "Procesando archivo seleccionado" : 
                            softtion.isText($scope.textDescription) ?
                                $scope.textDescription : 
                                "Seleccione archivo a procesar";
                                
                };
                
                $scope.getIconDescription = function () {
                    return $scope.isError ? "error" : "file_upload";
                };
                
                $scope.isInvalidSize = function (size) {
                    return (softtion.isUndefined($scope.maxSize)) ? 
                        false :(isNaN($scope.maxSize)) ? false : (size > $scope.maxSize);
                };

                $scope.isSelectedFile = function () { 
                    return softtion.isDefined($scope.file);
                };

                $scope.selectFile = function ($event) { 
                    if ($scope.isLoading) return; // Ya se esta cargando un archivo
                    
                    setTimeout(() => { fileInput.click(); }, 125); $event.stopPropagation();
                };

                $scope.removeFile = function () {
                    $scope.file = undefined; fileInput[0].value = "";
                };

                $scope.isImageFile = function (typeFile) {
                    return (imagesFormat.indexOf(typeFile) !== -1);
                };

                $scope.getIconFile = function (typeFile) {
                    return $material.File.getIconFile(typeFile);
                };

                $scope.getIconComponent = function (typeFile) {
                    var icon = $material.File.getIconComponent(typeFile),
                        heightPreview = viewPreview.height(),
                        height = (heightPreview > 0) ? 
                            (heightPreview - 16) + "px" : heightStart + "px",

                        style = "height: " + height + "; width: " + height
                            + "; line-height: " + height + "; font-size: " + height;

                    return $sce.trustAsHtml(icon.addAttribute("style", style).create());
                };

                $scope.fileHold = function ($event) {
                    listener.launch(Listeners.HOLD, { $event: $event });
                };

                $scope.fileRight = function ($event) {
                    listener.launch(Listeners.CLICK_RIGHT, { $event: $event });
                };

                $scope.isIconAction = function () {
                    return softtion.isText($scope.iconAction);
                };

                $scope.clickIconAction = function ($event) {
                    listener.launch(Listeners.ACTION, { $event: $event });
                };
            }
        };
    }
    
    // Directiva: FilechooserAudio
    // Version: 1.0.2
    // Update: 26/Feb/2018
    
    Directives.FilechooserAudio = FilechooserAudioDirective;
    
    Directives.FilechooserAudio.NAME = "FilechooserAudio";
    Directives.FilechooserAudio.VERSION = "1.0.4";
    Directives.FilechooserAudio.KEY = "filechooserAudio";
    Directives.FilechooserAudio.ROUTE = "softtion/template/filechooser-audio.html",
                    
    Directives.FilechooserAudio.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "file");

        var audio = softtion.html("div").addClass("audio").
            addAttribute("ng-src", "{{ngSrc}}").
            addAttribute("name", "{{name}}").
            addAttribute("ng-audio", "ngAudio").
            addAttribute("play-automatic", "playAutomatic");

        var actions = softtion.html("div").addClass("actions").
            addChildren(
                softtion.html("label").addClass("truncate").setText("{{getTextLabel()}}")
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                    addAttribute("ng-disabled", "ngDisabled").
                    addChildren(
                        softtion.html("i").setText("save").
                            addAttribute("ng-click", "saveFile()")
                    )
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-hide", "!isSelectFile()").
                    addAttribute("ng-disabled", "ngDisabled").
                    addChildren(
                        softtion.html("i").setText("delete").
                            addAttribute("ng-click", "deleteFile()")
                    )
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-disabled", "ngDisabled").
                    addChildren(
                        softtion.html("i").setText("file_upload").
                            addAttribute("ng-click", "selectFile($event)")
                    )
            );

        return input + audio + actions; // Componente 
    };
    
    Directives.FilechooserAudio.$inject = [ "$timeout", "$sce" ];
    
    function FilechooserAudioDirective($timeout, $sce) {
        return {
            restrict: "C",
            templateUrl: Directives.FilechooserAudio.ROUTE,
            scope: {
                file: "=ngModel",
                ngSrc: "@",
                name: "@",
                ngAudio: "=?",
                playAutomatic: "=?",

                label: "@",
                ngDisabled: "=?",
                saveEnabled: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.FILECHOOSER),
                    fileInput = $element.find("input[type=file]");

                $scope.file = undefined; // Archivos seleccionado

                var audiosTypes = [ "audio/mp3" ];

                function processFile(file) {
                    var reader = new FileReader(); // Procesador de archivo

                    reader.onloadend = function () {
                        $scope.$apply(() => {
                            var src = window.URL.createObjectURL(file);

                            $scope.ngSrc = $sce.trustAsResourceUrl(src);
                            $scope.name = file.name; $scope.file = file; 

                            listener.launch(Listeners.CHANGED); // Cambio de archivo
                        });
                    };

                    $timeout(() => { reader.readAsDataURL(file); }, 500);

                    return reader; // Retornando procesador de Archivo
                };

                fileInput.change(() => {
                    var files = fileInput[0].files; // Archivos

                    if (files.length) {
                        if (audiosTypes.hasItem(files[0].type)) {
                            processFile(files[0]);
                        } // El archivo es una mp3
                    } // Se cambio ha seleccionado un archivo
                });
                
                $scope.getTextLabel = function () {
                    return (softtion.isUndefined($scope.file)) ? "" : 
                        (softtion.isText($scope.label)) ? $scope.label : $scope.name;
                };

                $scope.isSelectFile = function () {
                    return softtion.isDefined($scope.file);
                };

                $scope.selectFile = function ($event) { 
                    setTimeout(() => { fileInput.click(); }, 125); $event.stopPropagation();
                };

                $scope.deleteFile = function () {
                    fileInput[0].value = ""; $scope.ngSrc = ""; 
                    $scope.file = undefined; $scope.name = "";

                    listener.launch(Listeners.REMOVE); // Archivo removido
                };

                $scope.saveFile = function () {
                    if (softtion.isDefined($scope.file)) listener.launch(Listeners.SAVE);
                };
            }
        };
    }
    
    // Directiva: FilechooserMultiple
    // Version: 1.0.1
    // Update: 26/Feb/2018
    
    Directives.FilechooserMultiple = FilechooserMultipleDirective;
    
    Directives.FilechooserMultiple.NAME = "FilechooserMultiple";
    Directives.FilechooserMultiple.VERSION = "1.0.1";
    Directives.FilechooserMultiple.KEY = "filechooserMultiple";
    Directives.FilechooserMultiple.ROUTE = "softtion/template/filechooser-multiple.html",
                    
    Directives.FilechooserMultiple.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "file");

        var actionAdd = softtion.html("div").addClass(["action-add"]).
            addAttribute("ng-click", "selectFile($event)").
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
                                                        addAttribute("ng-click", "removeFile(file, $index)")
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
                                        softtion.html("div").addClass("description").
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

        return input + content + actionAdd; // Componente 
    };
    
    Directives.FilechooserMultiple.$inject = [ "$timeout", "$materialConstant" ];
    
    function FilechooserMultipleDirective($timeout, $material) {
        return {
            restrict: "C",
            templateUrl: Directives.FilechooserMultiple.ROUTE,
            scope: {
                files: "=ngModel",
                iconButton: "@",
                multiple: "=?",
                ngDisabled: "=?",
                textDescription: "@label",
                fileTypes: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.FILECHOOSER_MULTIPLE),
                    fileInput = $element.find("input[type=file]"),
                    imagesFormat = $material.File.imagesFormat;

                $scope.iconButton = $scope.iconButton || "attachment";
                $scope.textDescription = $scope.textDescription || 
                    "Seleccione archivos a procesar";

                $scope.files = []; // Lista de archivos seleccionados

                if ($scope.multiple) fileInput.attr("multiple", "");
                
                $scope.$watch(() => { return $scope.fileTypes; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.fileTypes = [];
                    });

                function processFile(file) {
                    var reader = new FileReader(); // Procesador de archivos

                    reader.onload = function ($event) {
                        $scope.$apply(() => {
                            var fileResult = $event.target.result; 
                            file["base64"] = fileResult; 

                            $scope.files.push(file); // Archivo seleccionado
                        });
                    };

                    $timeout(() => { reader.readAsDataURL(file); }, 250);

                    return reader; // Retornando procesador de Archivo
                };

                fileInput.change(() => {
                    var files = fileInput[0].files; // Archivos

                    if (files.length) // Se cambio archivo a seleccionar
                        angular.forEach(files, (file) => {
                            if (!$scope.fileTypes.hasItem(file.type) &&
                                !$scope.fileTypes.isEmpty()) return;
                                    
                            processFile(file); // Se puede procesar seleccionado
                        });
                });
                
                content.displaceLeft(); // Haciendo componente scrolleable

                $scope.selectFile = function ($event) { 
                    setTimeout(() => { fileInput.click(); }, 125); $event.stopPropagation();
                };

                $scope.removeFile = function (file, $index) {
                    $scope.files.remove($index); fileInput[0].value = "";
                    listener.launch(Listeners.REMOVE, { $index: $index, $file: file });
                };

                $scope.isImageFile = function (typeFile) {
                    return (imagesFormat.hasItem(typeFile));
                };

                $scope.getIconFile = function (typeFile) {
                    return $material.File.getIconFile(typeFile);
                };

                $scope.getIconComponent = function (typeFile) {
                    return $material.File.getIconComponent(typeFile).create();
                };

                $scope.fileHold = function (file, $event, $index) {
                    listener.launch(Listeners.HOLD, { $index: $index, $file: file, $event: $event });
                };

                $scope.fileRight = function (file, $event, $index) {
                    listener.launch(Listeners.CLICK_RIGHT, { $index: $index, $file: file, $event: $event });
                };
            }
        };
    }
    
    // Directiva: FilechooserPerfil
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.FilechooserPerfil = FilechooserPerfilDirective;
    
    Directives.FilechooserPerfil.NAME = "FilechooserPerfil";
    Directives.FilechooserPerfil.VERSION = "1.0.0";
    Directives.FilechooserPerfil.KEY = "filechooserPerfil";
    Directives.FilechooserPerfil.ROUTE = "softtion/template/filechooser-perfil.html",
                    
    Directives.FilechooserPerfil.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "file");

        var icon = softtion.html("i").setText("{{icon}}").
            addAttribute("ng-hide", "isImgDefine()");

        var img = softtion.html("img", false).
            addAttribute("ng-src", "{{ngSrc}}").
            addAttribute("ng-hide", "!isImgDefine()");

        var actions = softtion.html("div").addClass("actions").
            addChildren(
                softtion.html("label").addClass("truncate").setText("{{getTextLabel()}}")
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-disabled", "ngDisabled").
                    addAttribute("ng-hide", "!isSelectFile()").
                    addChildren(
                        softtion.html("i").setText("delete").
                            addAttribute("ng-click", "deleteFile()")
                    )
            ).
            addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-disabled", "ngDisabled").
                    addChildren(
                        softtion.html("i").setText("file_upload").
                            addAttribute("ng-click", "selectFile($event)")
                    )
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                    addAttribute("ng-disabled", "ngDisabled").
                    addChildren(
                        softtion.html("i").setText("save").
                            addAttribute("ng-click", "saveFile()")
                    )
            );

        return input + img + icon + actions; // Componente
    };
    
    Directives.FilechooserPerfil.$inject = [ "$timeout" ];
                    
    function FilechooserPerfilDirective($timeout) {
        return {
            restrict: "C",
            templateUrl: Directives.FilechooserPerfil.ROUTE,
            scope: {
                file: "=ngModel",
                icon: "@",
                label: "@",
                ngDisabled: "=?",
                ngSrc: "=?",
                saveEnabled: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var fileInput = $element.find("input[type=file]"),
                    icon = $element.children("i"); 
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.FILECHOOSER);

                $scope.file = undefined; // Archivos seleccionado
                $scope.icon = $scope.icon || "person";

                var imagesTypes = [
                    "image/jpeg", 
                    "image/jpg", 
                    "image/png", 
                    "image/gif", 
                    "image/svg+xml"
                ];

                function processFile(file) {
                    var reader = new FileReader(); // Procesador de archivo

                    reader.onload = function ($event) {
                        $scope.$apply(() => {
                            var fileResult = $event.target.result; 
                            $scope.ngSrc = fileResult; // IMG
                            file["base64"] = fileResult; 
                            $scope.file = file; $scope.name = file.name;

                            listener.launch(Listeners.CHANGED); // Cambio
                        });
                    };

                    $timeout(() => { reader.readAsDataURL(file); }, 250);

                    return reader; // Retornando procesador de Archivo
                };

                icon.resize(function () {
                    var fontSize = $element.height() - 48; // Tamaño

                    icon.css("font-size", fontSize + "px");
                    icon.css("line-height", fontSize + "px");
                });

                fileInput.change(() => {
                    var files = fileInput[0].files; // Archivos

                    if (files.length && imagesTypes.hasItem(files[0].type)) 
                        processFile(files[0]);
                });
                
                $scope.getTextLabel = function () {
                    return (softtion.isUndefined($scope.file)) ? "" : 
                        (softtion.isText($scope.label)) ? $scope.label : $scope.name;
                };

                $scope.isSelectFile = function () {
                    return softtion.isDefined($scope.file);
                };

                $scope.selectFile = function ($event) { 
                    setTimeout(() => { fileInput.click(); }, 125); $event.stopPropagation();
                };

                $scope.isImgDefine = function () {
                    return softtion.isText($scope.ngSrc);
                };

                $scope.deleteFile = function () {
                    $scope.ngSrc = ""; $scope.file = undefined; 
                    fileInput[0].value = ""; listener.launch(Listeners.REMOVE);
                };

                $scope.saveFile = function () {
                    if (softtion.isDefined($scope.file)) listener.launch(Listeners.SAVE);
                };
            }
        };
    }
    
    // Directiva: FlexibleBox
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.FlexibleBox = FlexibleBoxDirective;
    
    Directives.FlexibleBox.NAME = "FlexibleBox";
    Directives.FlexibleBox.VERSION = "1.0.0";
    Directives.FlexibleBox.KEY = "flexibleBox";
    
    Directives.FlexibleBox.BACKGROUND = function () {
        return softtion.html("div").addClass("background-color");
    };
                    
    function FlexibleBoxDirective() {
        var directive = Directives.FlexibleBox; // Directiva
        
        return {
            restrict: "C",
            link: function ($scope, $element) {
                var banner = $element.children(".banner"),
                    box = $element.children(".box"),
                    toolbar = banner.children(".toolbar"),
                    title = toolbar.children(".title"),
                    detail = toolbar.children(".detail"),

                    background = angular.element(directive.BACKGROUND().create());

                (!toolbar.exists()) ? banner.append(background) :
                    background.insertBefore(toolbar); 
            
                var height = undefined; // Alto inicial de banner

                box.scroll(() => {
                    height = height || banner.height(); // Alto
                    
                    var toolbarHeight = 
                            (window.innerWidth > 960) ? 64 : 56,
                        scroll = box.scrollTop(),
                        opacity = scroll / height, 
                        margin = height - scroll - toolbarHeight,
                        bannerHeight = height - scroll;

                    bannerHeight = (bannerHeight < toolbarHeight) ? 
                        toolbarHeight : bannerHeight;
                
                    margin = (margin < 0) ? 0 : margin;
                    
                    opacity = (bannerHeight === toolbarHeight) ? 
                        1 : (opacity > 1) ? 1 : opacity;

                    var fontSize = 28 - (opacity * 8),
                        fontSizeSubTitle = 14 - (opacity * 2),
                        fontSizeTitle = 24 - (opacity * 6);

                    banner.css("height", bannerHeight); 
                    background.css("opacity", opacity);

                    title.css({ marginTop: margin, fontSize: fontSize }); 

                    detail.css({ marginTop: margin }); // Margin del detail
                    detail.children(".subtitle").css("font-size", fontSizeSubTitle);
                    detail.children(".title").css("font-size", fontSizeTitle);
                });
            }
        };
    }
    
    // Directiva: FormNavigation
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Directives.FormNavigation = FormNavigationDirective;
    
    Directives.FormNavigation.NAME = "FormNavigation";
    Directives.FormNavigation.VERSION = "1.0.0";
    Directives.FormNavigation.KEY = "formNavigation";
    
    Directives.FormNavigation.$inject = [ "$formNavigation" ];
    
    function FormNavigationDirective($formNavigation) {
        return {
            restrict: "C",
            scope: {
                ngOpen: "=?",
                ngClose: "=?",
                ngVisible: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var backdrop = $element.children(".backdrop"),
                    content = $element.children(".content"),
                    formNavigation = $formNavigation($element);
            
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => {
                        if (newValue) {
                            formNavigation.show(); $scope.ngVisible = true; $scope.ngOpen = false;
                        } // Desplegando FormNavigation
                    });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => {
                        if (newValue) {
                            formNavigation.hide(); $scope.ngVisible = false; $scope.ngClose = false;
                        } // Ocultando FormNavigation
                    });

                if (!backdrop.exists()) {
                    backdrop = softtion.htmlElement("div", "backdrop");
                    
                    $element.append(backdrop); // Agregando Backdrop
                }  // Backdrop no encontrado, se debe crear nuevo y agregarlo

                backdrop.click(() => { formNavigation.hide(); });
                    
                $element.transitionend((event) => {
                    $scope.$apply(() => {
                        var transition = event.originalEvent.propertyName,
                            target = event.originalEvent.target;
                    
                        if (target === content[0] && transition === "transform")
                            listener.launch(
                                ($element.hasClass(Classes.SHOW)) ? 
                                    Listeners.SHOW : Listeners.HIDE
                            );
                    });
                });
            }
        };
    }
    
    // Directiva: FullwidthField
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.FullwidthField = FullwidthFieldDirective;
    
    Directives.FullwidthField.NAME = "FullwidthField";
    Directives.FullwidthField.VERSION = "1.0.0";
    Directives.FullwidthField.KEY = "fullwidthField";
    Directives.FullwidthField.ROUTE = "softtion/template/fullwidth-field.html",
                    
    Directives.FullwidthField.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{disabled: ngDisabled}");

        var textArea = softtion.html("textarea").
            addAttribute("ng-model", "area").
            addAttribute("ng-click", "clickArea($event)").
            addAttribute("ng-blur", "blurArea($event)").
            addAttribute("ng-focus", "focusArea($event)").
            addAttribute("ng-keydown", "keydownArea($event)").
            addAttribute("ng-keyup", "keyupArea($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isHaveText()}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedArea").
            addAttribute("style", "{{heightStyle()}}").
            addAttribute("placeholder", "{{placeholder}}");

        var value = softtion.html("p").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var textHidden = softtion.html("div").
            addClass("textarea-hidden").setText("{{valueHidden}}");

        content.addChildren(textArea).
            addChildren(value).addChildren(textHidden);

        return content.create(); // Componente TextArea
    };
    
    function FullwidthFieldDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.FullwidthField.ROUTE,
            scope: {
                value: "=ngModel", 
                required: "=?",
                ngTrim: "=?",
                ngUppercase: "=?",
                ngLowercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                placeholder: "@",
                focusedArea: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                defineAreaComponent($scope, $element);
            }
        };
    }
    
    // Directiva: Gallery
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.Gallery = GalleryDirective;
    
    Directives.Gallery.NAME = "Gallery";
    Directives.Gallery.VERSION = "1.0.0";
    Directives.Gallery.KEY = "gallery";
    Directives.Gallery.ROUTE = "softtion/template/gallery.html",
                    
    Directives.Gallery.HTML = function () {
        var image = softtion.html("div").addClass(["image"]).
            addAttribute("ng-repeat", "image in images").
            addAttribute("ng-touchhold", "imageHold(image, $event, $index)").
            addAttribute("ng-clickright", "imageRight(image, $event, $index)").
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
                        softtion.html("div").addClass("description").
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

        return content.create(); // Componente
    };
    
    function GalleryDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Gallery.ROUTE,
            scope: {
                images: "=",
                disabledRemove: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var content = $element.children(".content");
                        
                    // Atributos
                var listener = new Listener($scope, []);
                
                content.displaceLeft(); // Haciendo componente scrolleable
                
                $scope.removeImage = function ($index) {
                    $scope.images.remove($index); // Eliminando item de la lista
                    listener.launch(Listeners.REMOVE, { $item: $scope.images[$index], $index: $index });
                };

                $scope.imageHold = function (item, $event, $index) {
                    listener.launch(Listeners.HOLD, { $item: item, $index: $index, $event: $event });
                };

                $scope.imageRight = function (item, $event, $index) {
                    listener.launch(Listeners.CLICK_RIGHT, { $item: item, $index: $index, $event: $event });
                };
            }
        };
    }
    
    // Directiva: Grid
    // Version: 1.0.0
    // Update: 17/Abr/2018
    
    Directives.Grid = GridDirective;
    
    Directives.Grid.NAME = "Grid";
    Directives.Grid.VERSION = "1.0.0";
    Directives.Grid.KEY = "grid";
    
    function GridDirective() {
        return {
            restrict: "C",
            scope: {
                columns: "=?"
            },
            link: function ($scope, $element) {
                $scope.$watch(() => { return $scope.columns; },
                    (newValue) => {
                        if (isNaN(newValue)) return; // No es un número
                        
                        var columns = (100 / $scope.columns), css = "";
                        
                        for (var i = 0; i < $scope.columns; i++) {
                            css += columns.toString().substr(0, 6) + "% ";
                        } // Definiendo porcentaje de las columnas
                        
                        $element.css({ gridTemplateColumns: css.trim() });
                    });
            }
        };
    }
    
    // Directiva: GridSheet
    // Version: 1.0.0
    // Update: 17/Abr/2018
    
    Directives.GridSheet = GridSheetDirective;
    
    Directives.GridSheet.NAME = "GridSheet";
    Directives.GridSheet.VERSION = "1.0.0";
    Directives.GridSheet.KEY = "gridSheet";
    
    function GridSheetDirective() {
        return {
            restrict: "C",
            scope: {
                columns: "=?"
            },
            link: function ($scope, $element) {
                $scope.$watch(() => { return $scope.columns; },
                    (newValue) => {
                        if (isNaN(newValue)) return; // No es un número
                        
                        var columns = (100 / $scope.columns), css = "";
                        
                        for (var i = 0; i < $scope.columns; i++) {
                            css += columns.toString().substr(0, 6) + "% ";
                        } // Definiendo porcentaje de las columnas
                        
                        $element.css({ gridTemplateColumns: css.trim() });
                    });
            }
        };
    }
    
    // Directiva: Img
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.Img = ImgDirective;
    
    Directives.Img.NAME = "Img";
    Directives.Img.VERSION = "1.0.0";
    Directives.Img.KEY = "img";

    Directives.Img.defineDensity = function ($materialFunction, $element) {
        var height = $element[0].naturalHeight, // Alto
            width = $element[0].naturalWidth;   // Ancho

        $materialFunction.setDensity($element, width, height); // Densidad
    };
    
    Directives.Img.$inject = [ "$materialFunction" ];
    
    function ImgDirective($materialFunction) {
        var directive = Directives.Img; // Directiva
        
        return {
            restrict: "E",
            scope: {
                disabledResponsive: "=?",
                density: "@"
            },
            link: function ($scope, $element) {
                var densities = [ "width", "height" ], // Densidades
                    density = "density-" + $scope.density;

                if ($scope.disabledResponsive) {
                    $element.addClass(Classes.ACTIVE); return;
                } // No requiere calculo de densidad la Imagen

                (densities.hasItem($scope.density)) ?
                    $element.addClass(density).addClass(Classes.ACTIVE) :
                            
                    (!$element[0].complete) ?
                        $element.on("load", () => { 
                            directive.defineDensity($materialFunction, $element);
                        }) :
                        directive.defineDensity($materialFunction, $element);
            }
        };
    }
    
    // Directiva: Notification
    // Version: 1.0.0
    // Update: 25/May/2018
    
    Directives.Notification = NotificationDirective;
    
    Directives.Notification.NAME = "Notification";
    Directives.Notification.VERSION = "1.0.0";
    Directives.Notification.KEY = "notification";
    
    Directives.Notification.$inject = [ "$appContent" ];
    
    function NotificationDirective($appContent) {
        return {
            restrict: "C",
            scope: {
                ngVisible: "=?"
            },
            link: function ($scope, $element) {
                    
                var height = 0, // Ancho del elemento
                    isAppbarPatent = $element.parent(".app-bar").exists();
                
                $scope.$watch(() => { return $scope.ngVisible; },
                    (newValue) => {
                        if (newValue) {
                            if (!isAppbarPatent) {
                                $element.addClass(Classes.SHOW);
                            } else {
                                addPaddingContent(); // Aumentar AppContent
                            }  // Verificar despligue en Appbar
                        } else {
                            if (isAppbarPatent) // Disminuir AppContent
                                removePaddingContent(); 
                            
                            $element.removeClass(Classes.SHOW); // Ocultando
                        }
                    });
                
                if (isAppbarPatent) // Esta incluido en un Appbar
                    $element.resize(() => {
                        if (!$element.hasClass(Classes.SHOW)) return;

                        if (height !== $element.height()) {
                            resizeAppContent($element.height() - height);
                        } // Ocurrio un cambio en el tamaño del elemento
                        
                        height = $element.height();
                    });
                    
                function addPaddingContent() {
                    if ($element.hasClass(Classes.SHOW)) {
                        return;
                    } else {
                        $element.addClass(Classes.SHOW);
                    } // Desplegando componente notificación
                    
                    height = $element.height(); resizeAppContent(height);
                }
                    
                function removePaddingContent() {
                    resizeAppContent(($element.height() * -1));
                }
                
                function resizeAppContent(value) {
                    var padding = parseInt($appContent.css("padding-top"));
                    
                    $appContent.css("padding-top", padding + value);
                }
            }
        };
    }
    
    // Directiva: NotificationFloating
    // Version: 1.0.0
    // Update: 25/May/2018
    
    Directives.NotificationFloating = NotificationFloatingDirective;
    
    Directives.NotificationFloating.NAME = "NotificationFloating";
    Directives.NotificationFloating.VERSION = "1.0.0";
    Directives.NotificationFloating.KEY = "notificationFloating";
    
    function NotificationFloatingDirective() {
        return {
            restrict: "C",
            scope: {
                ngVisible: "=?"
            },
            link: function ($scope, $element) {
                
                $scope.$watch(() => { return $scope.ngVisible; },
                    (newValue) => {
                        (!newValue) ?
                            $element.removeClass(Classes.SHOW):
                            $element.addClass(Classes.SHOW);
                    });
            }
        };
    }
    
    // Directiva: ProgressBar
    // Version: 1.0.4
    // Update: 26/Feb/2018
    
    Directives.ProgressBar = ProgressBarDirective;
    
    Directives.ProgressBar.NAME = "ProgressBar";
    Directives.ProgressBar.VERSION = "1.0.4";
    Directives.ProgressBar.KEY = "progressBar";
    
    Directives.ProgressBar.$inject = [ "$progressBar" ];
    
    function ProgressBarDirective($progressBar) {
        return {
            restrict: "C",
            scope: {
                ngVisible: "=?",
                determinate: "=?",
                duration: "=?",
                indeterminate: "=?",
                buffering: "=?",
                percentage: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var progressBar = $progressBar($element), // ProgressBar
                    listener = new Listener($scope, []),
                    isBarInsert = false, isBufferInsert = false;
                
                $scope.$watch(() => { return $scope.ngVisible; },
                    (newValue) => {
                        (newValue) ? progressBar.show() : progressBar.hide();
                    });
                
                $scope.$watch(() => { return $scope.determinate; },
                    (newValue) => {
                        if (!newValue) return; // Fin progreso
                        
                        progressBar.determinate($scope.duration, () => {
                            $scope.determinate = false; listener.launch(Listeners.DETERMINATE);
                        });
                    });
                
                $scope.$watch(() => { return $scope.indeterminate; },
                    (newValue) => {
                        if (!newValue) {
                            $element.removeClass(Classes.INDETERMINATE); 
                            
                            if (!isBarInsert) {
                                var bar = softtion.html("div").addClass("bar");
                                $element.append(bar.tojQuery()); isBarInsert = true;
                            } // Se debe agregar Barra
                        } else {
                            $element.addClass(Classes.INDETERMINATE);
                        } // Se definio componente como Indeterminado
                    });
                
                $scope.$watch(() => { return $scope.buffering; },
                    (newValue) => {
                        if (newValue) {
                            $element.addClass(Classes.BUFFERING); 
                            
                            if (!isBufferInsert) {
                                var buffer = softtion.html("div").addClass("buffer");
                                $element.append(buffer.tojQuery()); isBufferInsert = true;
                            } // Se debe agregar Buffer
                        } else {
                            $element.removeClass(Classes.BUFFERING);
                        } // Se definio componente como Buffering
                    });
                
                $scope.$watch(() => { return $scope.percentage; },
                    (newValue) => { progressBar.setPercentage(newValue); });
            }
        };
    }
    
    // Directiva: ProgressButtonFloating
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.ProgressButtonFloating = ProgressButtonFloatingDirective;
    
    Directives.ProgressButtonFloating.NAME = "ProgressButtonFloating";
    Directives.ProgressButtonFloating.VERSION = "1.0.0";
    Directives.ProgressButtonFloating.KEY = "progressButtonFloating";
    Directives.ProgressButtonFloating.ROUTE = "softtion/template/progress-button-floating.html";
    
    Directives.ProgressButtonFloating.HTML = function () {
        var circular = softtion.html("div").addClass("progress-circular").
                addAttribute("ng-class", "{indeterminate: indeterminate}");

        var success = softtion.html("div").addClass("button-result").
                addAttribute("ng-click", "clickSuccess($event)").
                addAttribute("ng-class", "{disabled: ngDisabled, error: ngError}").
                addChildren(softtion.html("i").setText("{{iconFinish}}"));

        var button = softtion.html("button").addAttribute("ng-disabled", "ngDisabled").
                addAttribute("ng-click", "clickButton($event)").
                addChildren(softtion.html("i").setText("{{iconButton}}"));

        return circular + success + button; // Componente
    };
    
    Directives.ProgressButtonFloating.$inject = [ "$progressFAB" ];
    
    function ProgressButtonFloatingDirective($progressFAB) {
        return {
            restrict: "C",
            templateUrl: Directives.ProgressButtonFloating.ROUTE,
            scope: {
                iconButton: "@",
                iconFinish: "@",
                ngDisabled: "=?",
                
                indeterminate: "=?",
                duration: "=?",
                ngStart: "=?",
                ngFinish: "=?",
                ngRestore: "=?",
                ngError: "=?",
                
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var circular = $element.children(".progress-circular"),
                    progressFAB = $progressFAB($element);
                    
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.iconFinish = $scope.iconFinish || "done";
                
                $scope.$watch(() => { return $scope.ngStart; },
                    (newValue) => {
                        if (!newValue) return; // Componente iniciado
                        
                        ($scope.indeterminate) ? progressFAB.show() :
                            progressFAB.determinate($scope.duration); 

                        $scope.ngStart = false; // Restaurando estado
                    });
                
                $scope.$watch(() => { return $scope.ngFinish; },
                    (newValue) => {
                        if (!newValue) return; // Componente finalizado
                        
                        progressFAB.finish(); $scope.ngFinish = false;
                    });
                
                $scope.$watch(() => { return $scope.ngRestore; },
                    (newValue) => {
                        if (!newValue) return; // Componente restaurado
                        
                        progressFAB.restore(); $scope.ngRestore = false;
                    });
                    
                $scope.clickButton = function ($event) {
                    listener.launch(Listeners.ACTION, { $event: $event });
                };
                    
                $scope.clickSuccess = function ($event) {
                    if ($scope.ngDisabled) return; // Componente bloqueado
                    
                    listener.launch(($scope.ngError) ? "error" : "success", { $event: $event });
                };
                
                circular.animationend((event) => {
                    progressFAB.finish(); // Finalizando animación en componente
                    
                    $scope.$apply(() => { 
                        var animate = event.originalEvent.animationName;
                    
                        if (animate === "progressDeterminateDashFab") listener.launch(Listeners.DETERMINATE);
                    });
                });
            }
        };
    }
    
    // Directiva: ProgressCircular
    // Version: 1.0.3
    // Update: 26/Feb/2018
    
    Directives.ProgressCircular = ProgressCircularDirective;
    
    Directives.ProgressCircular.NAME = "ProgressCircular";
    Directives.ProgressCircular.VERSION = "1.0.3";
    Directives.ProgressCircular.KEY = "progressCircular";
    Directives.ProgressCircular.ROUTE = "softtion/template/progress-circular.html";
    
    Directives.ProgressCircular.HTML = function () {
        return softtion.html("svg").addAttribute("viewBox", "0 0 32 32").
            addChildren(softtion.html("circle")).create();
    };
    
    Directives.ProgressCircular.$inject = [ "$progressCircular" ];
    
    function ProgressCircularDirective($progressCircular) {
        return {
            restrict: "C",
            templateUrl: Directives.ProgressCircular.ROUTE,
            scope: {
                ngVisible: "=?",
                determinate: "=?",
                duration: "=?",
                round: "=?",
                indeterminate: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var progress = $progressCircular($element),
                    listener = new Listener($scope, []);
                
                $scope.$watch(() => { return $scope.ngVisible; },
                    (newValue) => {
                        (newValue) ? progress.show() : progress.hide();
                    });
                
                $scope.$watch(() => { return $scope.determinate; },
                    (newValue) => {
                        if (!newValue) return; // Fin progreso
                        
                        progress.determinate($scope.duration, $scope.round,
                            () => {
                                $scope.determinate = false; listener.launch(Listeners.DETERMINATE);
                            });
                    });
                
                $scope.$watch(() => { return $scope.indeterminate; },
                    (newValue) => {
                        (!newValue) ?
                            $element.removeClass(Classes.INDETERMINATE) :
                            $element.addClass(Classes.INDETERMINATE);
                    });
            }
        };
    }
    
    // Directiva: RadioButton
    // Version: 1.0.2
    // Update: 27/Feb/2018
    
    Directives.RadioButton = RadioButtonDirective;
    
    Directives.RadioButton.NAME = "RadioButton";
    Directives.RadioButton.VERSION = "1.0.2";
    Directives.RadioButton.KEY = "radiobutton";
    Directives.RadioButton.ROUTE = "softtion/template/radiobutton.html";
    
    Directives.RadioButton.HTML = function () {
        var input = softtion.html("input", false).
            addAttribute("type", "radio").
            addAttribute("ng-model", "model").
            addAttribute("value", "{{value}}").
            addAttribute("name", "{{name}}").
            addAttribute("ng-click", "clickRadioButton($event)").
            addAttribute("ng-disabled", "ngDisabled");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)");

        var ripple = softtion.html("div").addClass("ripple-content").
            addChildren(softtion.html("div").addClass("box"));

        return input + label + ripple; // Componente
    };
    
    function RadioButtonDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.RadioButton.ROUTE,
            scope: {
                model: "=ngModel",
                value: "@",
                name: "@",
                label: "@",
                ngDisabled: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input[type='radio']");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.RADIOBUTTON);

                $scope.clickRadioButton = function ($event) { 
                    if ($scope.ngDisabled) return; // Desactivado
                    
                    listener.launch(Listeners.CLICK, { $event: $event });
                };

                $scope.clickLabel = function ($event) { 
                    if ($scope.ngDisabled) return; // Desactivado
                    
                    $scope.model = $scope.value; input.focus();
                    listener.launch(Listeners.CLICK, { $event: $event });
                };
            }
        };
    }
    
    // Directiva: Rating
    // Version: 1.0.2
    // Update: 25/Abr/2018
    
    Directives.Rating = RatingDirective;
    
    Directives.Rating.NAME = "Rating";
    Directives.Rating.VERSION = "1.0.1";
    Directives.Rating.KEY = "rating";
    Directives.Rating.ROUTE = "softtion/template/rating.html";
    
    Directives.Rating.HTML = function () {
        var button1 = softtion.html("button").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-click", "setValue(1)").
            addAttribute("material-font", "{{starColor}}").
            addClass(Classes.ACTION).addChildren(
                softtion.html("i").setText("{{getStarValue(1)}}")
            );

        var button2 = softtion.html("button").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-click", "setValue(2)").
            addAttribute("material-font", "{{starColor}}").
            addClass(Classes.ACTION).addChildren(
                softtion.html("i").setText("{{getStarValue(2)}}")
            );

        var button3 = softtion.html("button").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-click", "setValue(3)").
            addAttribute("material-font", "{{starColor}}").
            addClass(Classes.ACTION).addChildren(
                softtion.html("i").setText("{{getStarValue(3)}}")
            );

        var button4 = softtion.html("button").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-click", "setValue(4)").
            addAttribute("material-font", "{{starColor}}").
            addClass(Classes.ACTION).addChildren(
                softtion.html("i").setText("{{getStarValue(4)}}")
            );

        var button5 = softtion.html("button").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-click", "setValue(5)").
            addAttribute("material-font", "{{starColor}}").
            addClass(Classes.ACTION).addChildren(
                softtion.html("i").setText("{{getStarValue(5)}}")
            );

        return button1 + button2 + button3 + button4 + button5;
    };
    
    function RatingDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Rating.ROUTE,
            scope: {
                value: "=ngModel",
                ngDisabled: "=?",
                starColor: "@",
                ngListener: "&"
            },
            link: function ($scope) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.RATING);
                
                $scope.value = isNaN($scope.value) ? 0 : $scope.value;

                $scope.setValue = function (value) {
                    $scope.value = ($scope.value === value) ? 0 : value;
                    listener.launch(Listeners.CHANGED); // Cambiando valor
                };

                $scope.getStarValue = function (value) {
                    return ($scope.value >= value) ? "star" : // Completo
                       ($scope.value >= (value - 0.5)) ? "star_half" : "star_border";
                };
            }
        };
    }
    
    // Directiva: Ripple
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Directives.Ripple = RippleDirective;
    
    Directives.Ripple.NAME = "Ripple";
    Directives.Ripple.VERSION = "1.0.1";
    Directives.Ripple.KEY = "ripple";
    
    Directives.Ripple.$inject = [ "$materialConstant" ];
    
    function RippleDirective($material) {        
        return {
            restrict: "C",
            link: function ($scope, $element) {
                var EFFECT = $material.RIPPLE.EFFECT(),
                    BOX = $material.RIPPLE.BOX();

                BOX.append(EFFECT); $element.append(BOX);
                    
                $material.RIPPLE.DEFINE_EVENT(BOX, EFFECT);
            }
        };
    }
    
    // Directiva: Score
    // Version: 1.0.0
    // Update: 07/May/2018
    
    Directives.Score = ScoreDirective;
    
    Directives.Score.NAME = "Score";
    Directives.Score.VERSION = "1.0.0";
    Directives.Score.KEY = "score";
    Directives.Score.ROUTE = "softtion/template/score.html";
    
    Directives.Score.HTML = function () {
        var content = softtion.html("div").addClass("content");

        var icon = softtion.html("i").setText("star");

        var span = softtion.html("span").setText("{{label}}");

        return content.addChildren(icon).
                addChildren(span).create(); // Componente
    };
    
    function ScoreDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Score.ROUTE,
            scope: {
                label: "@"
            },
            link: function ($scope, $element) { }
        };
    }
    
    // Directiva: Select
    // Version: 1.2.1
    // Update: 27/Feb/2018
    
    Directives.Select = SelectDirective;
    
    Directives.Select.NAME = "Select";
    Directives.Select.VERSION = "1.0.1";
    Directives.Select.KEY = "select";
    Directives.Select.ROUTE = "softtion/template/select.html";
    
    Directives.Select.HTML = function () {
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription()").
                addClass("description").setText("{{iconDescription}}");

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("ng-model", "valueInput").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-keydown", "keyDownInput($event)").
                addAttribute("ng-readonly", "true").
                addAttribute("ng-click", "openSuggestions()").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("focused-element", "focusedInput");

        var lineShadow = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]).
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-click", "clickLabel($event)");

        var button = softtion.html("button").addClass(Classes.ACTION).
                addChildren(
                    softtion.html("i").addClass("action-icon").setText("arrow_drop_down").
                        addAttribute("ng-class", "{active: showList}")
                ).
                addAttribute("ng-hide", "ngDisabled").
                addAttribute("tabindex", "-1").
                addAttribute("ng-click", "openSuggestions()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        var list = softtion.html("ul").
                addAttribute("ng-class", "{show: showList, hide: !showList && startShow, orientation: orientation}").
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
                        addAttribute("ng-class", "{active: isActiveSuggestion(suggestion)}").
                        addAttribute("tabindex", "-1").
                        addAttribute("ng-click", "setSelection(suggestion, $event)").
                        setText("{{describeSuggestion(suggestion)}}")
                );

        content.addChildren(iconDescription).addChildren(input).
            addChildren(lineShadow).addChildren(label).
            addChildren(value).addChildren(button).
            addChildren(spanHelper).addChildren(list);

        return content.create(); // Componente
    };  
    
    Directives.Select.$inject = [ "$window", "$body" ];
    
    function SelectDirective($window, $body) {
        return {
            restrict: "C",
            templateUrl: Directives.Select.ROUTE,
            scope: {
                select: "=ngModel", 
                label: "@",
                required: "=?",
                optional: "=?",
                key: "@keyDescription",
                suggestions: "=",
                ngDisabled: "=?",
                disabledAutoclose: "=?",
                iconDescription: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngFormatDescription: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var label = $element.find("label"), 
                    input = $element.find("input"),
                    button = $element.find("button"), 
                    buttonIcon = button.find("i"), 
                    list = $element.find("ul"),
                    value = $element.find(".value");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.SELECT),
                    eventID = "click.select-" + softtion.getGUID();

                $scope.showList = false; $scope.selectStart = false;
                $scope.old = undefined; // Seleccion anterior nula

                $scope.describeSuggestion = function (suggestion) {
                    var format = $scope. // Cargando formato
                        ngFormatDescription({$suggestion: suggestion});

                    return (softtion.isDefined(format)) ? format :
                        // Verificando si la opción es Cadena
                        (softtion.isText(suggestion)) ? suggestion :
                        // Representando objeto pción
                        (softtion.isText($scope.key)) ?
                            softtion.findKey(suggestion, $scope.key) :
                            JSON.stringify(suggestion);
                };

                $scope.isHaveText = function () {
                    return softtion.isDefined($scope.select);
                };

                $scope.isActiveLabel = function () {
                    return (softtion.isDefined($scope.select));
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.isActiveSuggestion = function (suggestion) {
                    return (suggestion === $scope.select);
                };

                $scope.helperActive = function () {
                    return softtion.isUndefined($scope.select) || $scope.helperPermanent;
                };

                $scope.clickLabel = function ($event) { 
                    if (!$scope.ngDisabled) showSuggestions(); // Activo

                    $event.stopPropagation(); // Deteniendo propagación
                };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.focusInput = function ($event) { 
                    $element.addClass(Classes.ACTIVE); // Activando
                    listener.launch(Listeners.FOCUS, { $event: $event });
                };

                $scope.blurInput = function ($event) {
                    $element.removeClass(Classes.ACTIVE); // Desactivando
                    listener.launch(Listeners.BLUR, { $event: $event });
                };

                $scope.keyDownInput = function ($event) {
                    var charCode = $event.originalEvent.which; // Código de caracter
                    
                    if (KeysControl.SELECT.hasItem(charCode)) showSuggestions();
                };

                $scope.openSuggestions = function () {
                    if (!$scope.ngDisabled) showSuggestions(); // Activo
                };

                $scope.setSelection = function (suggestion, $event) {
                    var item = angular.element($event.currentTarget); // Elemento <li>

                    list.animate({ scrollTop: item[0].offsetTop }, 175, "standardCurve"); 

                    $scope.old = $scope.select; $scope.select = suggestion; 

                    hideSuggestions(); listener.launch(Listeners.CHANGED, { $event: $event }); 
                };

                $scope.clearSelection = function () {
                    $scope.select = undefined; hideSuggestions(); listener.launch(Listeners.CLEAR);
                };

                $scope.getValueModel = function () {
                    return (!softtion.isDefined($scope.select)) ? "" :
                        $scope.describeSuggestion($scope.select);
                };
                
                $scope.hideSuggestions = function () { hideSuggestions(); };

                function isBelongElement(target) {
                    return (label.is(target) || input.is(target) || 
                        value.is(target) || list.is(target)) || 
                        button.is(target) || buttonIcon.is(target) || 
                        $element.is(target);
                }

                function hideSuggestions() {
                    if ($scope.showList) listener.launch(Listeners.HIDE); // Cierre

                    $scope.showList = false; $element.removeClass(Classes.ACTIVE); 
                }

                function showSuggestions() {
                    if (!$scope.selectStart && !$scope.disabledAutoclose)
                        $body.on(eventID, ($event) => {
                            if (!$scope.showList) return; // Lista cerrada
                            
                            $scope.$apply(() => { closeSelect($event); });
                        }); // Cerrado automatico
                    
                    var sizeSuggestions = $scope.suggestions.length; 
                    
                    if (sizeSuggestions > 6) sizeSuggestions = 6; // Max. visibles
                    
                    var position = input.offset().top; // Posición en Window
                        position += (sizeSuggestions * 48) + 24;
                        
                    $scope.orientation = (position > $window.innerHeight); 
                    $scope.selectStart = true; $scope.showList = true; 
                    $element.addClass(Classes.ACTIVE); listener.launch(Listeners.SHOW);
                }

                function closeSelect ($event) {
                    if (!isBelongElement($event.target))
                        hideSuggestions(); // Se debe cerrar lista
                }
                
                $scope.$on("$destroy", () => { $body.off(eventID); });
            }
        };
    }
    
    // Directiva: SelectMultiple
    // Version: 1.2.4
    // Update: 22/May/2018
    
    Directives.SelectMultiple = SelectMultipleDirective;
    
    Directives.SelectMultiple.NAME = "SelectMultiple";
    Directives.SelectMultiple.VERSION = "1.0.1";
    Directives.SelectMultiple.KEY = "selectMultiple";
    Directives.SelectMultiple.ROUTE = "softtion/template/select-multiple.html";
    
    Directives.SelectMultiple.HTML = function () {
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription()").
                addClass("description").setText("{{iconDescription}}");

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("ng-model", "valueInput").
                addAttribute("ng-click", "toggleSuggestions()").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-keydown", "keyDownInput($event)").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-readonly", "true").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("focused-element", "focusedInput");

        var lineShadow = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]).
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var chips = softtion.html("div").addClass("chips").
                addAttribute("ng-hide", "selects.isEmpty()").
                addChildren(
                    softtion.html("div").addClass("content").
                    addChildren(
                        softtion.html("div").addClass("chip").
                            addAttribute("ng-repeat", "item in selects").
                            addAttribute("ng-class", "{disabled: ngDisabled}").
                            setText("{{describeSuggestion(item)}}").
                            addChildren(
                                softtion.html("div").addClass(Classes.ACTION).
                                    addAttribute("ng-hide", "ngDisabled").
                                    addAttribute("ng-click", "removeItem(item, $event)").
                                    addChildren(softtion.html("i").setText("close"))
                            )
                    )    
                );

        var button = softtion.html("button").addClass(Classes.ACTION).
                addChildren(
                    softtion.html("i").addClass("action-icon").setText("arrow_drop_down").
                        addAttribute("ng-class", "{active: showList}")
                ).addAttribute("ng-hide", "ngDisabled").
                addAttribute("ng-click", "toggleSuggestions()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        var list = softtion.html("ul").
                addAttribute("ng-class", "{show: showList, hide: !showList && startShow, orientation: orientation}").
                addChildren(
                    softtion.html("li").addClass(["truncate"]).
                        addAttribute("ng-repeat", "suggestion in suggestions").
                        addAttribute("tabindex", "-1").
                        addAttribute("ng-class", "{active: isItemChecked(suggestion)}").
                        addAttribute("ng-click", "checkedSuggestion(suggestion, $event)").
                        addChildren(
                            softtion.html("div").addClass("checkbox-select").
                                addAttribute("ng-class", "{active: isItemChecked(suggestion)}").
                                addAttribute("prevent-default", "true")
                        ).
                        addChildren(
                            softtion.html("span").setText("{{describeSuggestion(suggestion)}}")
                        )
                );

        content.addChildren(iconDescription).
            addChildren(input).addChildren(lineShadow).
            addChildren(label).addChildren(chips).
            addChildren(spanHelper).addChildren(button).addChildren(list);

        return content.create(); // Componente
    };
    
    Directives.SelectMultiple.$inject = [ "$window", "$body" ];
    
    function SelectMultipleDirective($window, $body) {
        return {
            restrict: "C",
            templateUrl: Directives.SelectMultiple.ROUTE,
            scope: {
                selects: "=ngModel", 
                label: "@",
                required: "=?",
                optional: "=?",
                ngDisabled: "=?",
                key: "@keyDescription",
                suggestions: "=",
                iconDescription: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngFormatDescription: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input"), 
                    label = $element.find("label"),
                    button = $element.find("button"), 
                    buttonIcon = button.find("i"),
                    chips = $element.find(".chips"), 
                    content = chips.children(".content"),
                    list = $element.find("ul");

                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.SELECT_MULTIPLE),
                    temp = [], // Lista temporal de selección
                    eventID = "click.select-multiple-" + softtion.getGUID();

                $scope.selects = $scope.selects || [];

                $scope.selects.forEach((select) => {
                    if ($scope.suggestions.hasItem(select) && !temp.hasItem(select)) 
                        temp.push(select);
                });
                
                chips.displaceLeft(); // Permite deslizarse en Web

                $scope.showList = false; $scope.selectStart = false;
                $scope.selects = temp; // Estableciendo Lista real

                $scope.describeSuggestion = function (suggestion) {
                    var format = $scope.ngFormatDescription({ $suggestion: suggestion });

                    return (softtion.isDefined(format)) ? format :
                        // Verificando si la opción es Cadena
                        (softtion.isText(suggestion)) ? suggestion :
                        // Representando objeto pción
                        (softtion.isText($scope.key)) ?
                            softtion.findKey(suggestion, $scope.key) :
                            JSON.stringify(suggestion); 
                };

                $scope.isHaveText = function () {
                    return !$scope.selects.isEmpty();
                };

                $scope.isActiveLabel = function () {
                    return !$scope.selects.isEmpty();
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.helperActive = function () {
                    return softtion.isArrayEmpty($scope.selects) || $scope.helperPermanent;
                };

                $scope.clickLabel = function ($event) { 
                    $scope.toggleSuggestions(); $event.stopPropagation();
                };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.focusInput = function ($event) { 
                    $element.addClass(Classes.ACTIVE); // Activando
                    listener.launch(Listeners.FOCUS, { $event: $event });
                };

                $scope.blurInput = function ($event) {
                    $element.removeClass(Classes.ACTIVE); // Desactivando
                    listener.launch(Listeners.BLUR, { $event: $event });
                };

                $scope.keyDownInput = function ($event) {
                    var charCode = $event.originalEvent.which; // Código de caracter
                    
                    if (KeysControl.SELECT.hasItem(charCode)) showSuggestions();
                };

                $scope.toggleSuggestions = function () {
                    if (!$scope.ngDisabled) {
                        ($scope.showList) ? hideSuggestions() : showSuggestions();
                    } // No esta desactivado el componente
                };

                $scope.checkedSuggestion = function (suggestion, $event) {
                    if ($scope.isItemChecked(suggestion)) {
                        $scope.selects.removeObject(suggestion);
                        listener.launch(Listeners.REMOVE, { $event: $event, $item: suggestion });
                    } else {
                        $scope.selects.push(suggestion);
                        listener.launch(Listeners.ADD, { $event: $event, $item: suggestion });
                    } // Se debe agregar a la lista de Selecciones

                    $event.stopPropagation(); // Deteniendo propagación
                };
                
                $scope.removeItem = function (suggestion, $event) {
                    $scope.selects.removeObject(suggestion);
                    listener.launch(Listeners.REMOVE, { $event: $event, $item: suggestion });

                    $event.stopPropagation(); // Deteniendo propagación
                };

                $scope.isItemChecked = function (suggestion) {
                    return $scope.selects.hasItem(suggestion);
                };
                
                $scope.hideSuggestions = function () { hideSuggestions(); };

                function isBelongElement(target) {
                    return (label.is(target) || input.is(target) || 
                        chips.is(target) || content.is(target) || list.is(target)) || 
                        button.is(target) || content.children(".chip").is(target) || 
                        buttonIcon.is(target) || $element.is(target);
                }

                function hideSuggestions() {
                    if ($scope.showList) listener.launch(Listeners.HIDE); // Cerrando

                    $scope.showList = false; $element.removeClass(Classes.ACTIVE); 
                }

                function showSuggestions() {
                    if ($element.hasClass(Classes.ACTIVE)) return; // Componente
                    
                    if (!$scope.selectStart && !$scope.disabledAutoclose)
                        $body.on(eventID, ($event) => {
                            if (!$scope.showList) return; // Lista cerrada
                            
                            $scope.$apply(() => { closeSelect($event); });
                        }); // Cerrado automatico
                    
                    var sizeSuggestions = $scope.suggestions.length; 
                    
                    if (sizeSuggestions > 6) sizeSuggestions = 6; // Max. visibles
                    
                    var position = input.offset().top; // Posición en Window
                        position += (sizeSuggestions * 48) + 24;
                        
                    $scope.orientation = (position > $window.innerHeight); 
                    $scope.selectStart = true; $scope.showList = true; 
                    $element.addClass(Classes.ACTIVE); listener.launch(Listeners.SHOW);
                }

                function closeSelect ($event) {
                    if (!isBelongElement($event.target))
                        hideSuggestions(); // Se debe cerrar lista
                }
                
                $scope.$on("$destroy", () => { $body.off(eventID); });
            }
        };
    }
    
    // Directiva: Sidenav
    // Version: 1.0.3
    // Update: 27/Feb/2018
    
    Directives.Sidenav = SidenavDirective;
    
    Directives.Sidenav.NAME = "Sidenav";
    Directives.Sidenav.VERSION = "1.0.3";
    Directives.Sidenav.KEY = "sidenav";
    
    Directives.Sidenav.BUTTON_CLOSE = function () {
        return softtion.html("button").addClass([Classes.ACTION, "close"]).
            addChildren(
                softtion.html("i").setText("chevron_left")
            );
    };
    
    Directives.Sidenav.$inject = [ "$sidenav" ];
    
    function SidenavDirective($sidenav) {
        var directive = Directives.Sidenav; // Directiva
        
        return {
            restrict: "C",
            scope: {
                ngOpen: "=?",
                ngClose: "=?",
                ngVisible: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var button = directive.BUTTON_CLOSE().tojQuery(),
                    sidenav = $sidenav($element),
                    content = $element.children(".content"),
                    backdrop = $element.children(".backdrop");
                    
                    // Atributos
                var listener = new Listener($scope, []);
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => {
                        if (newValue) {
                            sidenav.show(); $scope.ngVisible = true; $scope.ngOpen = false;
                        } // Desplegando Sidenav
                    });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => {
                        if (newValue) {
                            sidenav.hide(); $scope.ngVisible = false; $scope.ngClose = false;
                        } // Ocultando Sidenav
                    });

                if (!backdrop.exists()) {
                    backdrop = softtion.htmlElement("div", "backdrop");
                    
                    $element.append(backdrop); // Agregando Backdrop
                }  // Backdrop no encontrado, se debe crear nuevo y agregarlo

                $element.children(".content").append(button);
                $element.addClass(Classes.START);

                button.click(() => { sidenav.hide(); });
                backdrop.click(() => { sidenav.hide(); });
                    
                $element.transitionend((event) => {
                    $scope.$apply(() => {
                        var transition = event.originalEvent.propertyName,
                            target = event.originalEvent.target;
                    
                        if (target === content[0] && transition === "transform")
                            listener.launch(
                                ($element.hasClass(Classes.SHOW)) ? 
                                    Listeners.SHOW : Listeners.HIDE
                            );
                    });
                });
            }
        };
    }
    
    // Directiva: SidenavItem
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Directives.SidenavItem = SidenavItemDirective;
    
    Directives.SidenavItem.NAME = "SidenavItem";
    Directives.SidenavItem.VERSION = "1.0.1";
    Directives.SidenavItem.KEY = "sidenavItem";
    
    Directives.SidenavItem.BUTTON_ACTION = function () {
        return softtion.html("button").addClass([Classes.ACTION]).
            addChildren(
                softtion.html("i").setText("expand_more")
            );
    };
   
    function SidenavItemDirective() {
        var directive = Directives.SidenavItem; // Directiva
        
        return {
            restrict: "C",
            scope: {
                ngDisabled: "=?" 
            },
            link: function ($scope, $element) {
                var options = $element.children(".options");
                
                $scope.$watch(() => { return $scope.ngDisabled; },
                    (newValue) => {
                        (!newValue) ?
                            $element.removeClass(Classes.DISABLED) :
                            $element.addClass(Classes.DISABLED);
                    });
                
                if (!options.exists()) return; // No tiene opciones
                
                $element.addClass(Classes.OPTIONABLE);
                
                var description = $element.children(".description"),
                    list = options.children("ul");

                description.children("a"). // Agregando BUTTON ACTION
                    append(directive.BUTTON_ACTION().tojQuery()); 

                description.click(() => {
                    $element.toggleClass(Classes.DISPLAYED); // Estado

                    ($element.hasClass(Classes.DISPLAYED)) ?
                        options.css("max-height", list.height() + "px") :
                        options.css("max-height", "0px");
                });
            }
        };
    }
    
    // Directiva: Switch
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Directives.Slider = SliderDirective;
    
    Directives.Slider.NAME = "Slider";
    Directives.Slider.VERSION = "1.0.1";
    Directives.Slider.KEY = "slider";
    Directives.Slider.ROUTE = "softtion/template/slider.html";
    
    Directives.Slider.HTML = function () {
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
                                    softtion.html("span").setText("{{value|number:0}}")
                                )
                        )
                ).addChildren(
                    softtion.html("div").addClass("showcase-input").
                        addAttribute("ng-hide", "!showcase").
                        addChildren(
                            softtion.html("input").addAttribute("type", "number").
                                addAttribute("ng-model", "valueInput").
                                addAttribute("ng-disabled", "ngDisabled").
                                addAttribute("ng-keyup", "keyUpInput()")
                        ).addChildren(
                            softtion.html("div").addClass("line-bordered")
                        )
                );

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-class", "{active: isLabelActive()}");

        return label + content; // Componente 
    };
    
    SliderDirective.$inject = [ "$timeout" ];
    
    function SliderDirective($timeout) {
        return {
            restrict: "C",
            templateUrl: Directives.Slider.ROUTE,
            scope: {
                value: "=ngModel",
                ngDisabled: "=?",
                label: "@",
                icon: "@",
                emptyIcon: "@",
                fullIcon: "@",
                minValue: "=?",
                maxValue: "=?",
                showcase: "=?"
            },
            link: function ($scope, $element) { 
                    // Componentes
                var $content = $element.find(".content"),
                    $trackOff = $content.find(".track"),
                    $thumb = $content.find(".thumb"),
                    $trackOn = $content.find(".track-on");

                    // Atributos
                var initialPosition, initialX, finalX, range, promise;

                $scope.desliceActive = false;
                $scope.slideActive = false; 
                $scope.maxValue = $scope.maxValue || 100;
                $scope.minValue = $scope.minValue || 0;
                range = $scope.maxValue - $scope.minValue;

                $scope.value = isNaN($scope.value) ? $scope.minValue : $scope.value;

                $scope.valueInput = parseInt($scope.value);

                $scope.fullIcon = $scope.fullIcon || $scope.icon;
                $scope.emptyIcon = $scope.emptyIcon || $scope.icon;

                $scope.$watch(() => { return $scope.value; }, 
                    (newValue) => {
                        var between = softtion.isBetween(
                            newValue, $scope.minValue, $scope.maxValue
                        );

                        if (!between) {
                            // Valor es menor que el rango
                            if (newValue < $scope.minValue) $scope.value = $scope.minValue;
                            
                            // Valor es mayor que el rango
                            if (newValue > $scope.maxValue) $scope.value = $scope.maxValue;
                        }

                        $scope.valueInput = Math.round($scope.value);
                    });

                $scope.iconActive = function () {
                    return softtion.isText($scope.icon);
                };

                $scope.isLabelActive = function () {
                    return softtion.isText($scope.label); 
                };

                $scope.getIconValue = function () {
                    return ($scope.value <= $scope.minValue) ?
                        $scope.emptyIcon : ($scope.value >= $scope.maxValue) ?
                            $scope.fullIcon : $scope.icon;
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

                $scope.trackPointerDown = function ($event) {
                    if ($scope.ngDisabled) return; // Componente inactivo

                    var offsetX = startSlide($event),
                        $target = angular.element($event.target);

                    initialPosition = ($target.is($thumb)) ? 
                        $trackOn.width() : offsetX;

                    setValueSlide(initialPosition / $trackOff.width());

                    $scope.slideActive = true; // Inicio de arrastre
                };

                $scope.trackPointerMove = function ($event) {
                    if (!$scope.slideActive) return; // No ha iniciado Slide

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

                    return { width: $scope.percentage + "%" }; // Porcentaje del Valor
                };

                $scope.getPositionThumb = function () {
                    var percentage = ($element.hasClass("discrete")) ?
                            $scope.percentage + "%" : 
                            "calc(" + $scope.percentage + "% - 8px)";

                    return { left: percentage }; // Posicion del Thumb
                };

                $scope.keyUpInput = function () {
                    if (softtion.isDefined(promise)) 
                        $timeout.cancel(promise); // Cancelando función actual

                    promise = $timeout(setValueInput, 500);
                };

                function startSlide($event) {
                    var offsetX, typeEvent = $event.type || $event.originalEvent.type;

                    if (typeEvent === "touchstart") {
                        var position = $event.changedTouches[0];

                        initialX = position.clientX;
                        offsetX = position.clientX - $trackOff.offset().left; 
                    } else {
                        offsetX = $event.offsetX; initialX = $event.clientX;
                    } // No es un evento Touch

                    offsetX = ($element.hasClass("discrete")) ? offsetX + 4 : offsetX;

                    return offsetX; // Posición inicial para arrastre
                }

                function setValueSlide(position) {
                    if (position >= 0 && position <= 1) // Definiendo valor por Posición
                        $scope.value = Math.round(position * range + $scope.minValue);
                }

                function setValueInput() {
                    if (softtion.isUndefined($scope.valueInput)) {
                        $scope.valueInput = $scope.value;
                    } else {
                        $scope.value = $scope.valueInput;
                    } // Se ha definido correctamente valor en Input
                }
            }
        };
    }
    
    // Directiva: StepperHorizontal
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Directives.StepperHorizontal = StepperHorizontalDirective;
    
    Directives.StepperHorizontal.NAME = "StepperHorizontal";
    Directives.StepperHorizontal.VERSION = "1.0.0";
    Directives.StepperHorizontal.KEY = "stepperHorizontal";
    
    Directives.StepperHorizontal.$inject = [ "$materialConstant" ];
    
    function StepperHorizontalDirective($material) {
        return {
            restrict: "C",
            $scope: {
                disabledRipple: "=?"
            },
            link: function ($scope, $element) {
                if ($scope.disabledRipple) return; // No Ripple

                var contents = $element.find("li > .content");

                angular.forEach(contents, (content) => {
                    var element = angular.element(content),
                        BOX = $material.RIPPLE.BOX(),
                        EFFECT = $material.RIPPLE.EFFECT();

                    BOX.append(EFFECT); element.append(BOX);
                    
                    $material.RIPPLE.DEFINE_EVENT(BOX, EFFECT);
                });
            }
        };
    }
    
    // Directiva: Switch
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Directives.Switch = SwitchDirective;
    
    Directives.Switch.NAME = "Switch";
    Directives.Switch.VERSION = "1.0.1";
    Directives.Switch.KEY = "switch";
    Directives.Switch.ROUTE = "softtion/template/switch.html";
    
    Directives.Switch.HTML = function () {
        var input = softtion.html("input", false).
                addAttribute("type", "checkbox").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("ng-model", "checked");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-click", "clickLabel($event)").
                addChildren(softtion.html("span").addClass("track"));              

        return input + label; // Componente
    };
    
    function SwitchDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.Switch.ROUTE,
            scope: {
                checked: "=ngModel",
                ngDisabled: "=?",
                ngReadonly: "=?",
                stopPropagation: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) { 
                    // Componentes
                var input = $element.find("input[type='checkbox']");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CHECKBOX);
                
                $scope.clickLabel = function ($event) { 
                    if ($scope.stopPropagation) $event.stopPropagation();
                    
                    if ($scope.ngDisabled) return; // Inactivo
                    
                    if (!$scope.ngReadonly) {
                        $scope.checked = !$scope.checked; input.focus();
                    } // Componente esta habilitado
                    
                    listener.launch(Listeners.CLICK, { $event: $event });
                };
            }
        };
    }
    
    // Directiva: Tabs
    // Version: 1.0.5
    // Update: 27/Feb/2018
    
    Directives.Tabs = TabsDirective;
    
    Directives.Tabs.NAME = "Tabs";
    Directives.Tabs.VERSION = "1.0.5";
    Directives.Tabs.KEY = "tabs";
    
    Directives.Tabs.$inject = [ "$timeout" ];
    
    function TabsDirective($timeout) {
        return {
            restrict: "C",
            scope: {
                elementScroll: "@",
                disabledPositionStart: "=?",
                disabledOverflow: "=?",
                positionScroll: "=?",
                
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var tabs = $element.find(".tab"), elementScroll,
                    stripe = softtion.htmlElement("div", "stripe");
                    
                    // Atributos
                var clickActive = true, positionStart;

                $element.append(stripe); // Agregando componente
                
                $scope.elementScroll = $scope.elementScroll || ".app-content";
                elementScroll = angular.element($scope.elementScroll);

                init(); // Iniciando componente

                $element.displaceLeft((name, event) => {
                    switch (name) {
                        case ("start"):
                            positionStart = event.originalEvent.pageX;
                        break;

                        case ("displace"): 
                            var position = event.originalEvent.pageX - positionStart,
                                disabledClick = !softtion.isBetween(position, -15, 15);

                            if (disabledClick) clickActive = false;
                        break;

                        case ("end"): 
                            $timeout(() => { clickActive = true; }, 100);
                        break;
                    }
                }); 

                tabs.on("click.tabs", ($event) => {
                    if (!clickActive) { clickActive = true; return; } // Arrastre

                    var tab = angular.element($event.currentTarget);

                    if (tab.hasClass(Classes.ACTIVE)) return; // Esta activo

                    var attrs = getAttrsTab(tab); $element.addClass(Classes.ACTIVE);

                    stripe.css({ width: attrs.width, left: attrs.left });
                    tabs.removeClass(Classes.ACTIVE); tab.addClass(Classes.ACTIVE);

                    if (!$scope.disabledPositionStart) {
                        if (!isNaN($scope.positionScroll) && 
                            ($scope.positionScroll < elementScroll.scrollTop())) {
                            elementScroll.scrollTop($scope.positionScroll); 
                        } // Reposicionando scroll
                    } // No es necesario reposicionar scroll de elemento establecido

                    if (attrs.left < $element.scrollLeft() || (attrs.width + attrs.left) > $element.width())
                        $element.animate({ scrollLeft: attrs.left }, 175, "standardCurve"); // Reubicando
                });
                
                function init() {
                    var position = 0, tab; // Atributos de la directiva
                    
                    angular.forEach(tabs, (element) => {
                        var tabElement = angular.element(element); // Elemento
                        
                        tabElement.data("position", position); position++;
                        
                        if (softtion.isUndefined(tab) && tabElement.hasClass(Classes.ACTIVE)) 
                            tab = tabElement; // Elemento activo
                    });
                    
                    tabs.removeClass(Classes.ACTIVE).attr("tabindex", "-1");

                    if (softtion.isUndefined(tab)) tab = angular.element(tabs[0]);

                    tab.addClass(Classes.ACTIVE); position = tab.data("position");

                    var attrs = getAttrsTab(tab), width = attrs.width - 3,
                        left = attrs.left - (1 + position * 2);
                
                    stripe.css({ width: width, left: left }); // Stripe Inicio
                }
                
                function getAttrsTab(tab) {
                    return {
                        left: tab[0].offsetLeft, width: tab[0].clientWidth
                    };
                }
            }
        };
    }
    
    // Directiva: TextArea
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextArea = TextAreaDirective;
    
    Directives.TextArea.NAME = "TextArea";
    Directives.TextArea.VERSION = "1.1.6";
    Directives.TextArea.KEY = "textarea";
    Directives.TextArea.ROUTE = "softtion/template/textarea.html";
    
    Directives.TextArea.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{focused: areaActive, disabled: ngDisabled}");

        var box = softtion.html("div").addClass("box");

        var textArea = softtion.html("textarea").
            addAttribute("ng-model", "area").
            addAttribute("ng-click", "clickArea($event)").
            addAttribute("ng-blur", "blurArea($event)").
            addAttribute("ng-focus", "focusArea($event)").
            addAttribute("ng-keydown", "keydownArea($event)").
            addAttribute("ng-keyup", "keyupArea($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isHaveText()}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedArea").
            addAttribute("style", "{{heightStyle()}}").
            addAttribute("placeholder", "{{placeholder}}");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var value = softtion.html("p").addClass(["value"]).
            setText("{{getValueModel()}}").
            addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)");

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        var textHidden = softtion.html("div").
            addClass("textarea-hidden").setText("{{valueHidden}}");

        box.addChildren(textArea).addChildren(label).
            addChildren(value).addChildren(textHidden);

        content.addChildren(box).addChildren(spanError).
            addChildren(spanHelper).addChildren(spanCounter);

        return content.create(); // Componente
    };
    
    function TextAreaDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextArea.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                ngUppercase: "=?",
                ngLowercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                placeholder: "@",
                helperText: "@",
                focusedArea: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                defineAreaComponent($scope, $element);
            }
        };
    }
    
    // Directiva: TextBox
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextBox = TextBoxDirective;
    
    Directives.TextBox.NAME = "TextBox";
    Directives.TextBox.VERSION = "1.1.6";
    Directives.TextBox.KEY = "textbox";
    Directives.TextBox.ROUTE = "softtion/template/textbox.html";
    
    Directives.TextBox.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{focused: inputActive, disabled: ngDisabled}");

        var box = softtion.html("div").addClass("box");

        var input = softtion.html("input", false).
            addAttribute("type", "{{typeInput}}").
            addAttribute("autocomplete", "{{autocompleteValue}}").
            addAttribute("ng-model", "input").
            addAttribute("ng-click", "clickInput($event)").
            addAttribute("ng-blur", "blurInput($event)").
            addAttribute("ng-focus", "focusInput($event)").
            addAttribute("ng-keydown", "keydownInput($event)").
            addAttribute("ng-keyup", "keyupInput($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isPlaceholder(), iconaction: isIconAction}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedInput").
            addAttribute("placeholder", "{{placeholder}}");

        var value = softtion.html("pre").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
            setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
            addAttribute("ng-click", "clickAction($event)");

        var label = softtion.html("label").
            setText("{{label}}").addClass("truncate").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addAttribute("ng-click", "clickLabel($event)").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        box.addChildren(input).addChildren(value).
            addChildren(label).addChildren(iconAction);

        content.addChildren(box).addChildren(spanHelper).
            addChildren(spanError).addChildren(spanCounter);

        return content.create(); // Componente
    };
    
    function TextBoxDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextBox.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                type: "@",
                autocomplete: "=?",
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                uppercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                iconAction: "@",
                placeholder: "@",
                helperText: "@",
                focusedInput: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngFormatValue: "&",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                defineInputComponent($scope, $element, $attrs);
            }
        };
    }
    
    // Directiva: TextBoxMultiline
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextBoxMultiline = TextBoxMultilineDirective;
    
    Directives.TextBoxMultiline.NAME = "TextBoxMultiline";
    Directives.TextBoxMultiline.VERSION = "1.1.6";
    Directives.TextBoxMultiline.KEY = "textboxMultiline";
    Directives.TextBoxMultiline.ROUTE = "softtion/template/textbox-multiline.html";
    
    Directives.TextBoxMultiline.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{focused: areaActive, disabled: ngDisabled}");

        var box = softtion.html("div").addClass("box");

        var textArea = softtion.html("textarea").
            addAttribute("ng-model", "area").
            addAttribute("ng-click", "clickArea($event)").
            addAttribute("ng-blur", "blurArea($event)").
            addAttribute("ng-focus", "focusArea($event)").
            addAttribute("ng-keydown", "keydownArea($event)").
            addAttribute("ng-keyup", "keyupArea($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isPlaceholder()}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedArea").
            addAttribute("style", "{{heightStyle()}}").
            addAttribute("placeholder", "{{placeholder}}");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var value = softtion.html("p").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        var textHidden = softtion.html("div").
            addClass("textarea-hidden").setText("{{valueHidden}}");

        box.addChildren(textArea).addChildren(label).
            addChildren(value).addChildren(textHidden);

        content.addChildren(box).addChildren(spanError).
            addChildren(spanHelper).addChildren(spanCounter);

        return content.create(); // Componente
    };
                    
    function TextBoxMultilineDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextBoxMultiline.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                ngUppercase: "=?",
                ngLowercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                placeholder: "@",
                helperText: "@",
                focusedArea: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                defineAreaComponent($scope, $element);
            }
        };
    }
    
    // Directiva: TextField
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextField = TextFieldDirective;
    
    Directives.TextField.NAME = "TextField";
    Directives.TextField.VERSION = "1.1.6";
    Directives.TextField.KEY = "textfield";
    Directives.TextField.ROUTE = "softtion/template/textfield.html";
    
    Directives.TextField.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
            addAttribute("ng-click", "clickIconDescription($event)").
            addAttribute("ng-if", "isIconDescription()").
            addClass("description").setText("{{iconDescription}}");

        var input = softtion.html("input", false).
            addAttribute("type", "{{typeInput}}").
            addAttribute("autocomplete", "{{autocompleteValue}}").
            addAttribute("ng-model", "input").
            addAttribute("ng-click", "clickInput($event)").
            addAttribute("ng-blur", "blurInput($event)").
            addAttribute("ng-focus", "focusInput($event)").
            addAttribute("ng-keydown", "keydownInput($event)").
            addAttribute("ng-keyup", "keyupInput($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", 
                "{holderhide: isPlaceholder(), iconaction: isIconAction || checkboxActive}"
            ).addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedInput").
            addAttribute("placeholder", "{{placeholder}}");

        var lineShadow = softtion.html("div").addClass("line-bordered");
        var lineActive = softtion.html("div").addClass("line-shadow");

        var value = softtion.html("pre").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
            setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
            addAttribute("ng-click", "clickAction($event)");

        var checkBox = softtion.html("div").addClass("checkbox-control").
            addAttribute("ng-if", "checkboxActive").
            addAttribute("ng-model", "checkboxModel").
            addAttribute("ng-listener", "checkboxListener($model)");

        var label = softtion.html("label").
            setText("{{label}}").addClass("truncate").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addAttribute("ng-click", "clickLabel($event)").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        content.addChildren(iconDescription).
            addChildren(input).addChildren(lineShadow).
            addChildren(lineActive).addChildren(value).
            addChildren(iconAction).addChildren(checkBox).
            addChildren(label).addChildren(spanHelper).
            addChildren(spanError).addChildren(spanCounter);

        return content.create(); // Componente
    };
                    
    function TextFieldDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextField.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                type: "@",
                autocomplete: "=?",
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                ngUppercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                iconDescription: "@",
                iconAction: "@",
                placeholder: "@",
                helperText: "@",
                keyDisabled: "=?",
                focusedInput: "=?",
                clearModel: "=?",
                ngFormatValue: "&",
                checkboxModel: "=?ngModelCheckbox",
                checkboxActive: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                defineInputComponent($scope, $element, $attrs);
            }
        };
    }
    
    // Directiva: TextFieldBordered
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextFieldBordered = TextFieldBorderedDirective;
    
    Directives.TextFieldBordered.NAME = "TextFieldBordered";
    Directives.TextFieldBordered.VERSION = "1.1.6";
    Directives.TextFieldBordered.KEY = "textfieldBordered";
    Directives.TextFieldBordered.ROUTE = "softtion/template/textfield-bordered.html";
    
    Directives.TextFieldBordered.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{focused: inputActive, disabled: ngDisabled}");

        var box = softtion.html("div").addClass("box");

        var input = softtion.html("input", false).
            addAttribute("type", "{{typeInput}}").
            addAttribute("autocomplete", "{{autocompleteValue}}").
            addAttribute("ng-model", "input").
            addAttribute("ng-click", "clickInput($event)").
            addAttribute("ng-blur", "blurInput($event)").
            addAttribute("ng-focus", "focusInput($event)").
            addAttribute("ng-keydown", "keydownInput($event)").
            addAttribute("ng-keyup", "keyupInput($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isPlaceholder(), iconaction: isIconAction}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedInput").
            addAttribute("placeholder", "{{placeholder}}");

        var value = softtion.html("pre").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
            setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
            addAttribute("ng-click", "clickAction($event)");

        var label = softtion.html("label").
            setText("{{label}}").addClass("truncate").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addAttribute("ng-click", "clickLabel($event)").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        box.addChildren(input).addChildren(value).
            addChildren(iconAction).addChildren(label);

        content.addChildren(box).addChildren(spanHelper).
            addChildren(spanError).addChildren(spanCounter);

        return content.create(); // Componente
    };
                    
    function TextFieldBorderedDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextFieldBordered.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                type: "@",
                autocomplete: "=?",
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                uppercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                iconDescription: "@",
                iconAction: "@",
                placeholder: "@",
                helperText: "@",
                focusedInput: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngFormatValue: "&",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                defineInputComponent($scope, $element, $attrs);
            }
        };
    }
    
    // Directiva: TextFieldMultiline
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextFieldMultiline = TextFieldMultilineDirective;
    
    Directives.TextFieldMultiline.NAME = "TextFieldMultiline";
    Directives.TextFieldMultiline.VERSION = "1.1.6";
    Directives.TextFieldMultiline.KEY = "textfieldMultiline";
    Directives.TextFieldMultiline.ROUTE = "softtion/template/textfield-multiline.html";
    
    Directives.TextFieldMultiline.HTML = function () {
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class", "{disabled: ngDisabled}");

        var iconDescription = softtion.html("i").
            addAttribute("ng-click", "clickIconDescription($event)").
            addAttribute("ng-if", "isIconDescription()").
            addClass("description").setText("{{iconDescription}}");

        var textArea = softtion.html("textarea").
            addAttribute("ng-model", "area").
            addAttribute("ng-click", "clickArea($event)").
            addAttribute("ng-blur", "blurArea($event)").
            addAttribute("ng-focus", "focusArea($event)").
            addAttribute("ng-keydown", "keydownArea($event)").
            addAttribute("ng-keyup", "keyupArea($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-class", "{holderhide: isPlaceholder()}").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("focused-element", "focusedArea").
            addAttribute("style", "{{heightStyle()}}").
            addAttribute("placeholder", "{{placeholder}}");

        var lineShadow = softtion.html("div").addClass("line-bordered");
        var lineActive = softtion.html("div").addClass("line-shadow");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            ).addChildren(
                softtion.html("span").addClass("optional").
                    setText("(opcional)").addAttribute("ng-if", "optional")
            );

        var value = softtion.html("p").addClass(["value"]).
            setText("{{getValueModel()}}").addAttribute("ng-hide", "hideValue").
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{holderactive: isHolderActive()}");

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        var textHidden = softtion.html("div").
            addClass("textarea-hidden").setText("{{valueHidden}}");

        content.addChildren(iconDescription).addChildren(textArea).
            addChildren(lineShadow).addChildren(lineActive).
            addChildren(label).addChildren(value).
            addChildren(spanError).addChildren(spanHelper).
            addChildren(spanCounter).addChildren(textHidden);

        return content.create(); // Componente
    };
    
    function TextFieldMultilineDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextFieldMultiline.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@", 
                required: "=?",
                optional: "=?",
                ngTrim: "=?",
                ngUppercase: "=?",
                ngLowercase: "=?",
                ngDisabled: "=?",
                ngReadonly: "=?",
                minLength: "=?",
                maxLength: "=?",
                counterVisible: "=?",
                iconDescription: "@",
                placeholder: "@",
                helperText: "@",
                focusedArea: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                defineAreaComponent($scope, $element);
            }
        };
    }
    
    // Directiva: TextFieldReadonly
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Directives.TextFieldReadonly = TextFieldReadonlyDirective;
    
    Directives.TextFieldReadonly.NAME = "TextFieldReadonly";
    Directives.TextFieldReadonly.VERSION = "1.0.1";
    Directives.TextFieldReadonly.KEY = "textfieldReadonly";
    Directives.TextFieldReadonly.ROUTE = "softtion/template/textfield-readonly.html";
    
    Directives.TextFieldReadonly.HTML = function () {
        var content = softtion.html("div").addClass("content");

        var iconDescription = softtion.html("i").
            addAttribute("ng-click", "clickIconDescription($event)").
            addAttribute("ng-if", "isIconDescription()").
            addClass("description").setText("{{iconDescription}}");

        var input = softtion.html("input", false).
            addAttribute("type", "text").
            addAttribute("ng-readonly", "true").
            addAttribute("tabindex", "-1").
            addAttribute("ng-model", "value").
            addAttribute("ng-class", "{iconaction: isIconAction}");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
            setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
            addAttribute("ng-click", "clickAction($event)");

        var lineShadow = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").
            addAttribute("ng-class", "{active: isActiveLabel()}").
            setText("{{label}}").addClass("truncate").
            addChildren(
                softtion.html("span").setText("*").addAttribute("ng-if", "required")
            );

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "!helperActive()");

        content.addChildren(iconDescription).addChildren(input).
            addChildren(iconAction).addChildren(lineShadow).
            addChildren(label).addChildren(spanHelper);

        return content.create(); // Componente
    };
    
    function TextFieldReadonlyDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextFieldReadonly.ROUTE,
            scope: {
                value: "=ngModel", 
                label: "@",
                required: "=?",
                iconDescription: "@",
                iconAction: "@",
                helperText: "@",
                helperPermanent: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, []);
                
                if (softtion.isText($scope.iconAction)) $scope.isIconAction = true;
                
                $element.on("click", ($event) => {
                    $scope.$apply(() => { listener.launch(Listeners.CLICK, { $event: $event }); });
                });
                
                $scope.isActiveLabel = function () {
                    return softtion.isDefined($scope.value);
                };

                $scope.isIconDescription = function () {
                    return softtion.isText($scope.iconDescription);
                };

                $scope.helperActive = function () {
                    return softtion.isUndefined($scope.value) || $scope.helperPermanent;
                };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event }); $event.stopPropagation();
                };
                
                $scope.clickAction = function ($event) {
                    listener.launch(Listeners.ACTION, { $event: $event }); $event.stopPropagation();
                };
            }
        };
    }
    
    // Directiva: Tooltip
    // Version: 1.0.4
    // Update: 27/Feb/2018
    
    Directives.Tooltip = TooltipDirective;
    
    Directives.Tooltip.NAME = "Tooltip";
    Directives.Tooltip.VERSION = "1.0.4";
    Directives.Tooltip.KEY = "tooltip";
    
    function getPositionTopX(params) {
        var element = params.element,   // Elemento
            tooltip = params.tooltip;   // Tooltip
            
        return (element.height/2) - (tooltip.height/2) + params.y;
    }
    
    function getPositionLeftX(params, orientation) {
        var element = params.element,   // Elemento
            tooltip = params.tooltip,   // Tooltip
            
        left = (orientation) ?
            params.x + element.width + params.margin :
            params.x - tooltip.width - params.margin;
        
        return left; // Retornando coordenada tooltip en X
    }
    
    function getPositionLeftY(params) {
        var element = params.element,   // Elemento
            tooltip = params.tooltip,   // Tooltip
            
            left = (element.width/2) - (tooltip.width/2);
            
        left = left + params.x; // Sumando posición X
        
        if ((left + tooltip.width) > params.window) {
            left = params.window - tooltip.width - params.margin;
        } // Tooltip desborda ventana en la derecha
            
        // Tooltip desborda ventana en la iziquierda
        if (left < params.margin) left = params.margin;
        
        return left; // Retornando coordenada tooltip en X
    }
    
    function getPositionTop(params) {
        return { 
            left: getPositionLeftY(params), 
            top: params.y - params.tooltip.height - params.margin 
        };
    }
    
    function getPositionRight(params) {
        return {  
            top: getPositionTopX(params),
            left: getPositionLeftX(params, true)
        };
    }
    
    function getPositionLeft(params) {
        return {  
            top: getPositionTopX(params),
            left: getPositionLeftX(params, false)
        };
    }
    
    function getPositionBottom(params) {
        return { 
            left: getPositionLeftY(params), 
            top: params.y + params.element.height + params.margin 
        };
    }
    
    Directives.Tooltip.getPosition = function (params) {
        switch (params.position) {
            case ("top"): return getPositionTop(params);
                
            case ("right"): return getPositionRight(params);
                
            case ("left"): return getPositionLeft(params);
                
            default: return getPositionBottom(params);
        }
    };
    
    Directives.Tooltip.$inject = [ "$tooltipContainer" ];
    
    function TooltipDirective($container) {
        var directive = Directives.Tooltip; // Directiva
        
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var tooltip = $container.add($attrs.tooltip); 

                $element.on("mouseenter", () => {
                    if (!softtion.isText($attrs.tooltip)) return;
                    
                    tooltip.addClass(Classes.SHOW); // Desplegando
                    
                    var widthWindow = $container.getWidthWindow(),
                        params = {
                            margin: (widthWindow > 640) ? 12 : 8,
                            window: widthWindow,
                            x: $element.offset().left,
                            y: $element.offset().top,
                            position: $attrs.tooltipPosition,
                            element: {
                                width: $element.innerWidth(),
                                height: $element.innerHeight()   
                            },
                            tooltip: {
                                width: tooltip.innerWidth(),
                                height: tooltip.innerHeight()   
                            }
                        };

                    tooltip.css(directive.getPosition(params));  // Posición
                });

                $element.on("mouseout", () => { 
                    tooltip.removeClass(Classes.SHOW); // Ocultando
                });
            
                $scope.$on("$destroy", () => { tooltip.remove(); }); 
            }
        };
    }
    
    // Directiva: VideoYouTube
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Directives.VideoYouTube = VideoYouTubeDirective;
    
    Directives.VideoYouTube.NAME = "VideoYouTube";
    Directives.VideoYouTube.VERSION = "1.0.1";
    Directives.VideoYouTube.KEY = "videoYoutube";
    Directives.VideoYouTube.ROUTE = "softtion/template/video-youtube.html";
    
    Directives.VideoYouTube.HTML = function () {
        return softtion.html("iframe").create(); // Componente
    };
                    
    function VideoYouTubeDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.VideoYouTube.ROUTE,
            scope: {
                allowfullscreen: "=?",
                ngSrc: "=?"
            },
            link: function ($scope, $element) {
                var iframe = $element.children("iframe"); // Componente

                $scope.$watch(() => { return $scope.ngSrc; },
                    (newValue) => {
                        if (softtion.isText(newValue)) {
                            iframe.attr("src", newValue);
                        } // Se ha definido una ruta correctamente
                    });

                iframe.attr("allowfullscreen", $scope.allowfullscreen);
            }
        };
    }
    
    // Directiva: ViewsTabs
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Directives.ViewsTabs = ViewsTabsDirective;
    
    Directives.ViewsTabs.NAME = "ViewsTabs";
    Directives.ViewsTabs.VERSION = "1.0.1";
    Directives.ViewsTabs.KEY = "viewsTab";
    
    function ViewsTabsDirective() {
        return {
            restrict: "C",
            link: function ($scope, $element) {
                var count = $element.find(".view").length;
                $element.css("width", (count * 100) + "%");
            }
        };
    }
    
    // PROVEEDORES DE SOFTTION MATERIAL
    
    function Providers(name) { 
        switch (name) {
            case (Providers.AppBody.NAME): return Providers.AppBody;
            case (Providers.AppContent.NAME): return Providers.AppContent;
            case (Providers.Body.NAME): return Providers.Body;
            case (Providers.BottomSheet.NAME): return Providers.BottomSheet;
            case (Providers.Modal.NAME): return Providers.Modal;
            case (Providers.Dialog.NAME): return Providers.Dialog;
            case (Providers.Document.NAME): return Providers.Document;
            case (Providers.Dropdown.NAME): return Providers.Dropdown;
            case (Providers.FormNavigation.NAME): return Providers.FormNavigation;
            case (Providers.MaterialFont.NAME): return Providers.MaterialFont;
            case (Providers.MaterialTheme.NAME): return Providers.MaterialTheme;
            case (Providers.Modal.NAME): return Providers.Modal;
            case (Providers.ProgressBar.NAME): return Providers.ProgressBar;
            case (Providers.ProgressCircular.NAME): return Providers.ProgressCircular;
            case (Providers.ProgressFAB.NAME): return Providers.ProgressFAB;
            case (Providers.ProgressPane.NAME): return Providers.ProgressPane;
            case (Providers.Sidenav.NAME): return Providers.Sidenav;
            case (Providers.Snackbar.NAME): return Providers.Snackbar;
            case (Providers.Toast.NAME): return Providers.Toast;
            case (Providers.TooltipContainer.NAME): return Providers.TooltipContainer;
            case (Providers.WindowResize.NAME): return Providers.WindowResize;
        }
    }
    
    Providers.create = function (key) {
        var provider = this(key.NAME); // Proveedor a instanciar
        
        return {
            method: provider,          // Función
            name: provider.KEY         // Clave
        };
    };
    
    // Proveedor: AppBody
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Providers.AppBody = AppBodyProvider;
    
    Providers.AppBody.NAME = "AppBody";
    Providers.AppBody.VERSION = "1.0.0";
    Providers.AppBody.KEY = "$appBody";
    
    function AppBodyProvider() {
        
        var appBody = undefined; // Componente AppBody

        this.$get = function () { 
            return (appBody = appBody || angular.element(".app-body"));
        };
    }
    
    // Proveedor: AppContent
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Providers.AppContent = AppContentProvider;
    
    Providers.AppContent.NAME = "AppContent";
    Providers.AppContent.VERSION = "1.0.0";
    Providers.AppContent.KEY = "$appContent";
    
    function AppContentProvider() {
        
        var appContent = undefined; // Componente AppContent

        this.$get = function () { 
            return (appContent = appContent || angular.element(".app-content"));
        };
    }
    
    // Proveedor: Body
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Providers.Body = BodyProvider;
    
    Providers.Body.NAME = "Body";
    Providers.Body.VERSION = "1.0.0";
    Providers.Body.KEY = "$body";
    
    function BodyProvider() {
        
        var body = undefined; // Componente Body

        this.$get = function () { 
            return (body = body || angular.element(document.body));
        };
    }
    
    // Proveedor: BottomSheet
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Providers.BottomSheet = BottomSheetProvider;
    
    Providers.BottomSheet.NAME = "BottomSheet";
    Providers.BottomSheet.VERSION = "1.0.0";
    Providers.BottomSheet.KEY = "$bottomSheet";

    function BottomSheetProvider() {
        
        var $body, $appContent; // Atributos del proveedor

        function BottomSheet(element) {
            this.element = element; // BottomSheet
            
            this.isNotBody = $appContent.find(element).exists();
        }

        BottomSheet.prototype.show = function () {
            var self = this; // Clase BottomSheet

            executeIfExists(self.element, () => {
                if (self.element.hasClass(Classes.SHOW)) return;
                    
                (self.isNotBody) ? 
                    $appContent.addClass(Classes.OVERFLOW_NONE) : 
                    $body.addClass(Classes.BODY_OVERFLOW_NONE);

                self.element.addClass(Classes.SHOW); // Desplegando
            });
        };

        BottomSheet.prototype.hide = function () {
            var self = this; // Clase BottomSheet

            executeIfExists(self.element, () => {
                if (!self.element.hasClass(Classes.SHOW)) return;
                
                (self.isNotBody) ? 
                    $appContent.removeClass(Classes.OVERFLOW_NONE) :
                    $body.removeClass(Classes.BODY_OVERFLOW_NONE); 
                
                self.element.removeClass(Classes.SHOW); // Ocultando
            });
        };

        function BottomSheetProvider(element) {
            return new BottomSheet(instanceElement(element, "bottom-sheet"));
        }

        function fnProvider(body, appContent) {
            $body = body; $appContent = appContent; 
            
            return BottomSheetProvider;  // Proveedor
        }

        this.$get = ["$body", "$appContent", fnProvider]; // Proveedor
    }
    
    // Proveedor: Dialog
    // Version: 1.0.4
    // Update: 28/Feb/2018
    
    Providers.Dialog = DialogProvider;
    
    Providers.Dialog.NAME = "Dialog";
    Providers.Dialog.VERSION = "1.0.4";
    Providers.Dialog.KEY = "$dialog";

    function DialogProvider() {
        
        var $body = undefined; // Atributos del proveedor

        function Dialog(element) {
            this.element = element; // Dialog
        }

        Dialog.prototype.show = function () {
            var dialog = this.element; // Dialog

            executeIfExists(dialog, () => {
                if (dialog.hasClass(Classes.SHOW)) return;

                $body.addClass(Classes.BODY_OVERFLOW_NONE); 
                dialog.addClass(Classes.SHOW); // Desplegando
            });
        };

        Dialog.prototype.hide = function () {
            var dialog = this.element; // Dialog

            executeIfExists(dialog, () => {
                if (!dialog.hasClass(Classes.SHOW)) return;

                $body.removeClass(Classes.BODY_OVERFLOW_NONE); 
                dialog.removeClass(Classes.SHOW); // Ocultando
            });
        };

        function DialogProvider(element) {
            return new Dialog(instanceElement(element, "dialog"));
        }

        function fnProvider(body) {
            $body = body; return DialogProvider; 
        }

        this.$get = ["$body", fnProvider]; // Proveedor
    }
    
    // Proveedor: Document
    // Version: 1.0.0
    // Update: 27/Feb/2018
    
    Providers.Document = DocumentProvider;
    
    Providers.Document.NAME = "Document";
    Providers.Document.VERSION = "1.0.0";
    Providers.Document.KEY = "$document";
    
    function DocumentProvider() {
        
        var $document = undefined; // Componente Body

        this.$get = function () { 
            return ($document = $document || angular.element(document));
        };
    }
    
    // Proveedor: Dropdown
    // Version: 1.1.4
    // Update: 09/Mar/2018
    
    Providers.Dropdown = DropdownProvider;
    
    Providers.Dropdown.NAME = "Dropdown";
    Providers.Dropdown.VERSION = "1.1.4";
    Providers.Dropdown.KEY = "$dropdown";
    
    function DropdownProvider() {

        this.$get = DropdownFactory;  // Proveedor Dropdown
        
        DropdownFactory.$inject = [ "$body", "$appBody", "$appContent" ];
        
        function DropdownFactory($body, $appBody, $appContent) {
            
            var eventID = "click.dropdown-" + softtion.getGUID();

            function Dropdown(element) { 
                this.element = element; // Dropdown            
                var self = this; // Instancia

                $body.on(eventID, ($event) => {
                    if (!self.autoclose) return; // Cerrado automatico

                    $event.stopPropagation(); self.hide();
                });
            }

            Dropdown.prototype.setBelowOrigin = function (below) {
                this.belowOrigin = below; return this;
            };

            Dropdown.prototype.show = function (originElement, autoclose) {
                var self = this; // Instancia del proveedor

                executeIfExists(self.element, () => {
                    self.autoclose = autoclose; show(self, originElement);
                });
            };

            Dropdown.prototype.showEvent = function (event, autoclose) {
                this.show(angular.element(event.currentTarget), autoclose); 
            };

            Dropdown.prototype.showXY = function (left, top, autoclose) {
                var self = this; // Instancia del proveedor

                executeIfExists(self.element, () => {
                    self.autoclose = autoclose; showXY(self, left, top);
                });
            };

            Dropdown.prototype.hide = function () {
                this.element.removeClass(Classes.SHOW);
            };

            function show(provider, origin) {
                var settings = getSettingsDropdown(provider, origin),
                    attrs = getAttributesDropdown(settings, provider, origin);

                if (settings.moveContent) // Desplazando elemento
                    attrs.left -= parseInt($appContent.css("left"));

                if (settings.moveLeft) {
                    attrs.left -= parseInt($appBody.css("left")); 
                    provider.element.removeClass(Classes.FIXED);

                    if (settings.moveScroll) attrs.top += $appContent.scrollTop(); 
                } else {
                    provider.element.addClass(Classes.FIXED);
                } // Componente debe moverse con scroll de AppContent

                provider.element.css({ 
                    top: attrs.top, left: attrs.left, 
                    MozTransformOrigin: attrs.effect,
                    transformOrigin: attrs.effect,
                    WebkitTransformOrigin: attrs.effect
                 }); 

                provider.element.addClass(Classes.SHOW); // Activado dropdown
            }

            function showXY(provider, left, top) {
                var attrs = getAttributesDropdownXY(left, top, provider);

                provider.element.css({ 
                    left: attrs.left, top: attrs.top,
                    MozTransformOrigin: attrs.effect,
                    transformOrigin: attrs.effect,
                    WebkitTransformOrigin: attrs.effect
                 }); 

                provider.element.addClass(Classes.SHOW); // Activando dropdown
            }

            function getSettingsDropdown(provider, origin) {
                var settings = {
                    top: 0, left: 0, 
                    moveContent: false,
                    moveLeft: true,
                    moveScroll: false,
                    width: window.innerWidth, 
                    height: window.innerHeight
                }; 

                if (softtion.isDefined(origin) && origin.exists()) {
                    var formNavigation = origin.parents(".form-navigation");

                    if (formNavigation.exists()) 
                        return getSettingsElement(formNavigation, provider, origin);

                    var bottomSheet = origin.parents(".bottom-sheet");

                    if (bottomSheet.exists()) 
                        return getSettingsElement(bottomSheet, provider, origin);

                    var appBar = origin.parents(".app-bar");

                    if (appBar.exists()) {
                        provider.element.appendTo(appBar); settings.moveScroll = false;
                    } // Elemento está contenido en un AppBar

                    if (origin.parents(".app-content").exists()) settings.moveContent = true;

                    if (provider.element.parents(".app-content").exists()) settings.moveScroll = true;

                    return angular.extend(settings, origin.offset()); 
                } // Se definío elemento que disparó despliegue del dropdown

                return settings; // Configuración por defecto
            }

            function getSettingsElement(element, provider, origin) {
                var settings = {
                        top: 0, left: 0,
                        moveContent: false,
                        moveLeft: false,
                        width: window.innerWidth, 
                        height: window.innerHeight
                    },

                    flexibleBox = origin.parents(".flexible-box"),
                    content = element.children(".content"), 
                    position = origin.positionParent(content);

                if (flexibleBox.exists()) {
                    if (origin.parents(".flexible-box > .banner").exists()) {
                        provider.element.appendTo(flexibleBox);

                        settings.width = content.width();
                        settings.height = content.height();
                    } else {
                        var box = flexibleBox.children(".box"), 
                            contentFlexible = box.children(".content");

                        provider.element.appendTo(contentFlexible); 
                        position.top += box.scrollTop();

                        settings.width = contentFlexible.width();
                        settings.height = contentFlexible.height();
                    }
                } else {
                    position.top += content.scrollTop();
                    provider.element.appendTo(content); 

                    settings.width = content.width();
                    settings.height = content.height();
                }

                return angular.extend(settings, position); // Configuración
            }

            function getAttributesDropdown(settings, provider, origin) {
                var dropdown = {
                        h: provider.element.innerHeight(),
                        w: provider.element.innerWidth()
                    },

                    element = {
                        w: (origin) ? origin.innerWidth() : 0,
                        h: (origin) ? origin.innerHeight() : 0, 
                        y: settings.top, x: settings.left
                    },

                    // Atributos del Dropdown
                    left, top, effect, transform = 0; 

                // Definiendo posicion de Dropdown en Eje X
                if ((element.x + dropdown.w) <= (settings.width)) {
                    left = element.x; transform += 1;
                } else if ((element.x + element.w - dropdown.w) > 0) {
                    left = element.x + element.w - dropdown.w - 10; transform += 3;
                } else { 
                    left = settings.width - dropdown.w - 10; transform += 1; 
                } 

                // Definiendo posicion de Dropdown en Eje Y
                if (provider.belowOrigin) { 
                    if ((element.y + dropdown.h) <= (settings.height)) {
                        top = element.y; transform += 4;
                    } else if ((element.y + element.h - dropdown.h) > 0) {
                        top = element.y + element.h - dropdown.h; transform += 7;
                    } else { 
                        top = settings.height - dropdown.h - 10; transform += 4;
                    }
                } else { 
                    if ((element.y + element.h + dropdown.h) <= settings.height) {
                        top = element.y + element.h; transform += 4;
                    } else if ((element.y - dropdown.h) > 0) {
                        top = element.y - dropdown.h; transform += 7;
                    } else { 
                        top = settings.height - dropdown.h - 10; transform += 4; 
                    }
                } 

                switch (transform) {
                    case (7): effect = "100% 0"; break;
                    case (8): effect = "0 100%"; break;
                    case (10): effect = "100% 100%"; break;
                    default: effect = "0 0"; break;
                } // Definiendo inicio de efecto del Dropdown

                return { top: top, left: left, effect: effect };
            }

            function getAttributesDropdownXY(left, top, provider) {
                var dropdown = {
                        h: provider.element.innerHeight(),
                        w: provider.element.innerWidth()
                    },

                    transform = 0, effect; // Atributos del dropdown

                // Definiendo posicion de Dropdown en Eje X
                if ((left + dropdown.w) <= (window.innerWidth)) {
                    transform += 1;
                } else if ((left - dropdown.w) > 0) {
                    left = left - dropdown.w - 10; transform += 3; 
                } else { 
                    left = window.innerWidth - dropdown.w - 10; transform += 1; 
                }

                // Definiendo posicion de Dropdown en Eje Y
                if (provider.belowOrigin) { 
                    if ((top + dropdown.h) <= (window.innerHeight)) {
                        transform += 4;
                    } else if ((top - dropdown.h) > 0) {
                        top = top - dropdown.h; transform += 7;
                    } else { 
                        top = window.innerHeight - dropdown.h - 10; transform += 4; 
                    }
                } else { 
                    if ((top + dropdown.h) <= window.innerHeight) {
                        transform += 4;
                    } else if ((top - dropdown.h) > 0) {
                        top = top - dropdown.h; transform += 7;
                    } else { 
                        top = window.innerHeight - dropdown.h - 10; transform += 4;
                    }
                }

                switch (transform) {
                    case (7): effect = "100% 0"; break;
                    case (8): effect = "0 100%"; break;
                    case (10): effect = "100% 100%"; break;
                    default: effect = "0 0"; break;
                } // Definiendo inicio de efecto del Dropdown

                return { top: top, left: left, effect: effect };
            }
            
            return function (element) {
                return new Dropdown(instanceElement(element, "dropdown"));
            };
        }
    }
    
    // Proveedor: FormNavigation
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Providers.FormNavigation = FormNavigationProvider;
    
    Providers.FormNavigation.NAME = "FormNavigation";
    Providers.FormNavigation.VERSION = "1.0.1";
    Providers.FormNavigation.KEY = "$formNavigation";

    function FormNavigationProvider() {
        
        var $body = undefined; // Atributos del proveedor

        function FormNavigation(element) {
            this.element = element; // FormNavigation
        }

        FormNavigation.prototype.show = function () {
            var formNavigation = this.element; // FormNavigation

            executeIfExists(formNavigation, () => {
                if (formNavigation.hasClass(Classes.SHOW)) return;

                $body.addClass(Classes.BODY_OVERFLOW_NONE); 
                formNavigation.addClass(Classes.SHOW); // Desplegando
            });
        };

        FormNavigation.prototype.hide = function () {
            var formNavigation = this.element; // FormNavigation

            executeIfExists(formNavigation, () => {
                if (!formNavigation.hasClass(Classes.SHOW)) return;

                $body.removeClass(Classes.BODY_OVERFLOW_NONE); 
                formNavigation.removeClass(Classes.SHOW); // Ocultando
            });
        };

        function FormNavigationProvider(element) {
            return new FormNavigation(instanceElement(element, "form-navigation"));
        }

        function fnProvider(body) {
            $body = body; return FormNavigationProvider; 
        }

        this.$get = ["$body", fnProvider]; // Proveedor
    }
    
    // Proveedor: MaterialFont
    // Version: 1.0.0
    // Update: 26/Jun/2018
    
    Providers.MaterialFont = MaterialFontProvider;
    
    Providers.MaterialFont.NAME = "MaterialFont";
    Providers.MaterialFont.VERSION = "1.0.0";
    Providers.MaterialFont.KEY = "$materialFont";

    function MaterialFontProvider() {
        
        this.$get = function () { 
            return {};
        };
        
        this.setFontSize = function (fontSize) {
            setPropertyStyle("--font-size-base", fontSize); return this;
        };
        
        this.setFontFamily = function (fontFamily) {
            setPropertyStyle("--font-family-base", fontFamily); return this;
        };
        
        this.setFontHeadline1 = function (fontFamily) {
            setPropertyStyle("--headline-1-font", fontFamily); return this;
        };
        
        this.setFontHeadline2 = function (fontFamily) {
            setPropertyStyle("--headline-2-font", fontFamily); return this;
        };
        
        this.setFontHeadline3 = function (fontFamily) {
            setPropertyStyle("--headline-3-font", fontFamily); return this;
        };
        
        this.setFontHeadline4 = function (fontFamily) {
            setPropertyStyle("--headline-4-font", fontFamily); return this;
        };
        
        this.setFontHeadline5 = function (fontFamily) {
            setPropertyStyle("--headline-5-font", fontFamily); return this;
        };
        
        this.setFontHeadline6 = function (fontFamily) {
            setPropertyStyle("--headline-6-font", fontFamily); return this;
        };
        
        this.setFontSubtitle1 = function (fontFamily) {
            setPropertyStyle("--subtitle-1-font", fontFamily); return this;
        };
        
        this.setFontSubtitle2 = function (fontFamily) {
            setPropertyStyle("--subtitle-2-font", fontFamily); return this;
        };
        
        this.setFontBody1 = function (fontFamily) {
            setPropertyStyle("--body-1-font", fontFamily); return this;
        };
        
        this.setFontBody2 = function (fontFamily) {
            setPropertyStyle("--body-2-font", fontFamily); return this;
        };
        
        this.setFontButton = function (fontFamily) {
            setPropertyStyle("--button-font", fontFamily); return this;
        };
        
        this.setFontCaption = function (fontFamily) {
            setPropertyStyle("--caption-font", fontFamily); return this;
        };
        
        this.setFontOverline = function (fontFamily) {
            setPropertyStyle("--overline-font", fontFamily); return this;
        };
        
        this.setFontComponents = function (fontFamily) {
            this.setFontHeadline1(fontFamily).setFontHeadline2(fontFamily).
                setFontHeadline3(fontFamily).setFontHeadline4(fontFamily).
                setFontHeadline5(fontFamily).setFontHeadline6(fontFamily).
                setFontSubtitle1(fontFamily).setFontSubtitle2(fontFamily).
                setFontBody1(fontFamily).setFontBody2(fontFamily).
                setFontButton(fontFamily).setFontCaption(fontFamily).
                setFontOverline(fontFamily);
            
            return this; // Retornando interfaz fluida, Servicio Font
        };
    }
    
    // Proveedor: Modal
    // Version: 1.0.4
    // Update: 28/Feb/2018
    
    Providers.Modal = ModalProvider;
    
    Providers.Modal.NAME = "Modal";
    Providers.Modal.VERSION = "1.0.4";
    Providers.Modal.KEY = "$modal";
    
    function ModalProvider() {
            
        var dialog, backdrop, $title, $content,
            btnPositive, btnNegative, // Elementos

            $body, $scope, provider, persistent = false;

        function Modal() {
            instanceModal();
        }

        Modal.prototype.setPersistent = function (enabled) {
            persistent = enabled; return this;
        };

        Modal.prototype.setTitle = function (title) {
            if (softtion.isText(title)) {
                $title.html(title); $title.removeClass(Classes.HIDDEN);
            } else {
                $title.addClass(Classes.HIDDEN);
            } // Titulo definido no es una cadena

            return this; // Retornando interfaz fluida
        };

        Modal.prototype.setContent = function (content) {
            $content.html(content); return this;
        };

        Modal.prototype.setPositiveLabel = function (label) {
            btnPositive.html(label); return this;
        };

        Modal.prototype.setPositiveFunction = function (fnPositive) {
            this.fnPositive = fnPositive; return this;
        };

        Modal.prototype.setNegativeLabel = function (label) {
            btnNegative.html(label); return this;
        };

        Modal.prototype.setNegativeEnabled = function (enabled) {
            (enabled) ?
                btnNegative.removeClass(Classes.HIDDEN) :
                btnNegative.addClass(Classes.HIDDEN);
            
            return this; // Retornando interfaz fluida
        };

        Modal.prototype.setNegativeFunction = function (fnNegative) {
            this.fnNegative = fnNegative; return this;
        };

        Modal.prototype.config = function (params) {
            var defaults = {
                persistent: false,
                title: undefined, 
                content: "",
                positiveLabel: "Aceptar",
                positiveFunction: undefined,
                negativeLabel: "Cancelar",
                negativeFunction: undefined,
                negativeEnabled: true
            };

            angular.extend(defaults, params); 

            this.setPersistent(defaults.persistent);
            this.setTitle(defaults.title);
            this.setContent(defaults.content);
            this.setPositiveLabel(defaults.positiveLabel);
            this.setPositiveFunction(defaults.positiveFunction);
            this.setNegativeLabel(defaults.negativeLabel);
            this.setNegativeFunction(defaults.negativeFunction);
            this.setNegativeEnabled(defaults.negativeEnabled);

            return this; // Retornando interfaz fluida
        };

        Modal.prototype.show = function () {
            if (dialog.hasClass(Classes.SHOW)) return;
            
            $body.addClass(Classes.BODY_OVERFLOW_NONE);
            dialog.addClass(Classes.SHOW); // Desplegando
        };

        Modal.prototype.hide = function () {
            if (!dialog.hasClass(Classes.SHOW)) return;
            
            $body.removeClass(Classes.BODY_OVERFLOW_NONE);
            dialog.removeClass(Classes.SHOW); // Ocultando
        };

        function createModal() {
            dialog = softtion.htmlElement("div", ["dialog", "modal"]);
            backdrop = softtion.htmlElement("div", "backdrop");
            var box = softtion.htmlElement("div", "box");
            $title = softtion.htmlElement("div", "title");
            $content = softtion.htmlElement("div", "content");
            var actions = softtion.htmlElement("div", "actions");

            btnPositive = softtion.htmlElement("button", ["flat", "positive"]);
            btnNegative = softtion.htmlElement("button", ["flat", "negative"]);

            actions.append(btnPositive); actions.append(btnNegative);
            box.append($title); box.append($content); box.append(actions);
            dialog.append(backdrop); dialog.append(box); $body.append(dialog);
            
            backdrop.on("click", () => { if (persistent) provider.hide(); });

            btnPositive.on("click", () => { 
                if (softtion.isFunction(provider.fnPositive))
                    $scope.$apply(() => { provider.fnPositive(); });
                
                provider.hide(); // Ocultado Dialog del Modal
            });

            btnNegative.on("click", () => { 
                if (softtion.isFunction(provider.fnNegative))
                    $scope.$apply(() => { provider.fnNegative();  });
                
                provider.hide(); // Ocultado Dialog del Modal
            });
        }

        function instanceModal() {
            (softtion.isUndefined(dialog)) ? createModal() : 
                (!softtion.isInPage(dialog[0])) ? createModal() : null;
        }

        var fnProvider = function (rootScope, body) { 
            $body = body; $scope = rootScope; 

            return (provider = provider || new Modal());
        };

        this.$get = [ "$rootScope", "$body", fnProvider ];

        this.setPersistent = function (enabled) {
            provider = provider || new Modal(); return provider.setPersistent(enabled);
        };

        this.setTitle = function (title) {
            provider = provider || new Modal(); return provider.setTitle(title);
        };

        this.setContent = function (content) {
            provider = provider || new Modal(); return provider.setContent(content);
        };

        this.setPositiveLabel = function (label) {
            provider = provider || new Modal(); return provider.setPositiveLabel(label);
        };

        this.setPositiveFunction = function (fnPositive) {
            provider = provider || new Modal(); return provider.setPositiveFunction(fnPositive);
        };

        this.setNegativeLabel = function (label) {
            provider = provider || new Modal(); return provider.setNegativeLabel(label);
        };

        this.setNegativeEnabled = function (enabled) {
            provider = provider || new Modal(); return provider.setNegativeEnabled(enabled);
        };

        this.setNegativeFunction = function (fnNegative) {
            provider = provider || new Modal(); return provider.setNegativeFunction(fnNegative);
        };

        this.config = function (params) {
            provider = provider || new Modal(); return provider.config(params);
        };

        this.show = function () {
            provider = provider || new Modal(); provider.show();
        };

        this.hide = function () {
            provider = provider || new Modal(); provider.hide();
        };
    }
    
    // Proveedor: ProgressBar
    // Version: 1.1.4
    // Update: 27/Feb/2018
    
    Providers.ProgressBar = ProgressBarProvider;
    
    Providers.ProgressBar.NAME = "ProgressBar";
    Providers.ProgressBar.VERSION = "1.1.4";
    Providers.ProgressBar.KEY = "$progressBar";
    
    function ProgressBarProvider() {
        
        var $scope = undefined; // Atributos de Proveedor

        function ProgressBar(element) {
            this.element = element; // ProgressBar

            this.bar = undefined; this.buffer = undefined;
            this.start = false; this.fn = undefined;
        }

        ProgressBar.prototype.show = function () {
            var element = this.element; // ProgressBar

            executeIfExists(element, 
                () => { element.addClass(Classes.SHOW); }
            );

            return this; // Retornando como interfaz fluida
        };

        ProgressBar.prototype.hide = function () {
            var element = this.element; // ProgressBar

            executeIfExists(element, 
                () => { element.removeClass(Classes.SHOW); }
            );

            return this; // Retornando como interfaz fluida
        };

        ProgressBar.prototype.determinate = function (duration, fn) {
            var self = this; // Instancia de Clase

            executeIfExists(self.element, () => { 
                if (self.element.hasClass(Classes.INDETERMINATE)) return;

                duration = isNaN(duration) ? 4000 : duration; 

                self.show(); self.fn = fn; // Asignando función

                self.bar = getInstanceElement(self, self.bar, ".bar"); 

                self.bar.css("animation-duration", (duration + "ms"));
                self.bar.css("-webkit-animation-duration", (duration + "ms"));
                self.bar.css("-moz-animation-duration", (duration + "ms"));

                if (!self.start) {
                    self.start = true; // Estableciendo iniciación

                    self.bar.animationend(() => { 
                        self.hide(); // Ocultando ProgressBar

                        if (softtion.isFunction(self.fn)) 
                            $scope.$apply(() => { self.fn(); });
                    });
                } // No se iniciado evento Determinado en ProgressBar
            });

            return self; // Retornando como interfaz fluida
        };

        ProgressBar.prototype.setPercentage = function (percentage) {
            var self = this.element; // ProgressBar

            executeIfExists(self.element, () => { 
                if (self.element.hasClass(Classes.INDETERMINATE)) return;

                if (isNaN(percentage)) return; // Porcentaje debe ser númerico

                if (percentage < 0) percentage = 0; // No debe ser menor a 0%

                if (percentage > 100) percentage = 100; // No debe exceder 100%

                self.show(); // Visualizando Componente

                if (self.element.hasClass(Classes.BUFFERING)) {
                    setPercentageBuffering(self, percentage);
                } else {
                    self.bar = getInstanceElement(self, self.bar, ".bar"); 
                    self.bar.css("width", percentage + "%");
                } // ProgressBar no es de tipo Buffering
            });

            return this; // Retornando como interfaz fluida
        };

        function getInstanceElement(progressBar, element, classElement) {
            return (softtion.isDefined(element)) ? 
                element : progressBar.element.children(classElement);
        }

        function setPercentageBuffering(self, percentage) {
            self.bar = getInstanceElement(self, self.bar, ".bar"); 
            self.buffer = getInstanceElement(self, self.buffer, ".buffer"); 

            var buffer = percentage + 15; // Definiendo buffer

            if (buffer > 100) buffer = 100; // No debe exceder 100%

            self.bar.css("width", percentage + "%");    // Barra
            self.buffer.css("width", buffer + "%");     // Buffer
        };

        function ProgressBarProvider(element) {
            return new ProgressBar(instanceElement(element, "progress-bar"));
        }

        function fnProvider($rootScope) {
            $scope = $rootScope; return ProgressBarProvider; 
        }

        this.$get = ["$rootScope", fnProvider]; // Proveedor
    }
    
    // Proveedor: ProgressCircular
    // Version: 1.0.8
    // Update: 27/Feb/2018
    
    Providers.ProgressCircular = ProgressCircularProvider;
    
    Providers.ProgressCircular.NAME = "ProgressCircular";
    Providers.ProgressCircular.VERSION = "1.0.8";
    Providers.ProgressCircular.KEY = "$progressCircular";
    
    function ProgressCircularProvider() {
        
        var $scope, appContent, refresh; // Atributos del proveedor

        function ProgressCircular(element) {
            this.element = element; // ProgressBar

            this.bar = undefined; this.buffer = undefined;
            this.start = false; this.fn = undefined;
        }

        ProgressCircular.prototype.show = function () {
            var element = this.element; // ProgressBar

            executeIfExists(element, 
                () => { element.addClass(Classes.SHOW); }
            );

            return this; // Retornando como interfaz fluida
        };

        ProgressCircular.prototype.hide = function () {
            var element = this.element; // ProgressBar

            executeIfExists(element, 
                () => { element.removeClass(Classes.SHOW); }
            );

            return this; // Retornando como interfaz fluida
        };

        ProgressCircular.prototype.determinate = function (duration, round, fn) {
            var self = this; // Instancia de Clase

            executeIfExists(self.element, () => {
                if (self.element.hasClass(Classes.INDETERMINATE)) return;

                duration = isNaN(duration) ? 4000 : duration;
                round = isNaN(round) ? 3 : round;

                setPropertyStyle("--time-progress-circular", duration + "ms"); 
                setPropertyStyle("--round-progress-circular", (round * 360 - 90) + "deg"); 

                self.show(); self.fn = fn; // Asignando función

                if (!self.start) {
                    self.start = true; // Estableciendo iniciación

                    self.element.animationend(() => { 
                        self.hide(); // Ocultando ProgressCircular

                        if (softtion.isFunction(self.fn)) 
                            $scope.$apply(() => { self.fn(); });
                    });
                }
            });
        };

        function ProgressCircularProvider(element) {
            return new ProgressCircular(instanceElement(element, "progress-circular"));
        }

        ProgressCircularProvider.refresh = {
            show: function () {
                if (softtion.isUndefined(refresh)) {
                    var classes = ["progress-circular", "indeterminate"],
                        svg = softtion.html("svg").
                            addAttribute("viewBox", "0 0 32 32").
                            addChildren(softtion.html("circle"));

                    refresh = angular.element(
                        softtion.html("div").addClass("refresh-progress-circular").
                            addChildren(
                                softtion.html("div").addClass(classes).addChildren(svg)
                            ).create()
                    );

                    var appBar = angular.element(".app-bar"); // AppBar

                    (appBar.exists()) ? appBar.append(refresh) :
                        angular.element(".app-content").append(refresh);
                } // No se encuentra instanciado en el documento

                executeIfExists(refresh, () => { refresh.addClass(Classes.SHOW); });
            },

            hide: function () {
                executeIfExists(refresh, () => { refresh.removeClass(Classes.SHOW); });
            }
        };

        function fnProvider($rootScope, $appContent) {
            $scope = $rootScope; appContent = $appContent;

            return ProgressCircularProvider; // Proveedor
        }

        this.$get = ["$rootScope", "$appContent", fnProvider];
    }
    
    // Proveedor: ProgressFAB
    // Version: 1.0.2
    // Update: 05/Mar/2018
    
    Providers.ProgressFAB = ProgressFABProvider;
    
    Providers.ProgressFAB.NAME = "ProgressButtonFloating";
    Providers.ProgressFAB.VERSION = "1.0.2";
    Providers.ProgressFAB.KEY = "$progressFAB";
    
    function ProgressFABProvider() {

        function ProgressFAB(element) {
            this.element = element; // ProgressFAB
        }
        
        ProgressFAB.prototype.show = function() {
            var element = this.element; // Progress FAB

            executeIfExists(element, () => { 
                if (element.hasClass(Classes.FINISH)) return;
                
                element.addClass(Classes.SHOW); // Iniciando
            });

            return this; // Retornando como interfaz fluida
        };
        
        ProgressFAB.prototype.finish = function() {
            var element = this.element; // Progress FAB

            executeIfExists(element, () => { 
                if (element.hasClass(Classes.FINISH)) return;
                
                element.removeClass(Classes.SHOW).
                    removeClass(Classes.START).addClass(Classes.FINISH);
            });

            return this; // Retornando como interfaz fluida
        };

        ProgressFAB.prototype.determinate = function (duration) {
            var element = this.element; // Progress FAB

            executeIfExists(element, () => { 
                if (element.hasClass(Classes.FINISH)) return;
                
                duration = isNaN(duration) ? 4000 : duration;
                var round = Math.round(duration / 2000);
                
                setPropertyStyle("--time-fab-progress-circular", duration + "ms"); 
                setPropertyStyle("--round-fab-progress-circular", (round * 360 - 90) + "deg"); 

                element.addClass(Classes.START); // Iniciando animación
            });

            return this; // Retornando como interfaz fluida
        };

        ProgressFAB.prototype.restore = function () {
            var element = this.element; // Progress FAB

            executeIfExists(element, () => { 
                element.removeClass(Classes.FINISH); 
            });

            return this; // Retornando como interfaz fluida
        };
        
        function ProgressFABProvider(element) {
            return new ProgressFAB(instanceElement(element, "progress-button-floating"));
        }

        this.$get = function () { return ProgressFABProvider; };
    }
    
    // Proveedor: ProgressPane
    // Version: 1.0.1
    // Update: 28/Feb/2018
    
    Providers.ProgressPane = ProgressPaneProvider;
    
    Providers.ProgressPane.NAME = "ProgressPane";
    Providers.ProgressPane.VERSION = "1.0.1";
    Providers.ProgressPane.KEY = "$progressPane";
    
    function ProgressPaneProvider() {
        
        var instance, $body, progressPane, label, progressBar, // Atributos
            classes = [ "progress-bar", Classes.SHOW, Classes.INDETERMINATE ];

        function ProgressPane () {
            progressBar = softtion.htmlElement("div", classes);
        
            label = softtion.htmlElement("label"); // Etiqueta de Texto

            var content = softtion.htmlElement("div", "content");
            
            progressPane = softtion.htmlElement("div", "progress-pane");
            
            content.append(label).append(progressBar);
            progressPane.append(content); $body.append(progressPane);
        }

        ProgressPane.prototype.show = function (text) {
            label.html(text); // Estableciendo texto en etiqueta

            if (progressPane.hasClass(Classes.SHOW)) return;
            
            $body.addClass(Classes.BODY_OVERFLOW_NONE); 
            progressPane.addClass(Classes.SHOW); // Desplegando
        };

        ProgressPane.prototype.hide = function () {
            if (!progressPane.hasClass(Classes.SHOW)) return;
            
            $body.removeClass(Classes.BODY_OVERFLOW_NONE); 
            progressPane.removeClass(Classes.SHOW); // Ocultando
        };
        
        function fnProvider(body) {
            $body = body; // Estableciendo proveedor $body
            
            return (instance = instance || new ProgressPane());
        }

        this.$get = ["$body", fnProvider]; // Proveedor
    }
    
    // Proveedor: Sidenav
    // Version: 1.0.6
    // Update: 27/Feb/2018
    
    Providers.Sidenav = SidenavProvider;
    
    Providers.Sidenav.NAME = "Sidenav";
    Providers.Sidenav.VERSION = "1.0.6";
    Providers.Sidenav.KEY = "$sidenav";
    
    function SidenavProvider() {
        var $body = undefined; // Atributos del proveedor

        function Sidenav(element) {
            this.element = element; // Sidenav
        }

        Sidenav.prototype.show = function () {
            var sidenav = this.element; // Sidenav

            executeIfExists(sidenav, () => {
                if (sidenav.hasClass(Classes.SHOW)) return;

                $body.addClass(Classes.BODY_OVERFLOW_NONE_NAV); 
                sidenav.addClass(Classes.SHOW); // Desplegando
            });
        };

        Sidenav.prototype.hide = function () {
            var sidenav = this.element; // Sidenav

            executeIfExists(sidenav, () => {
                if (sidenav.hasClass(Classes.START)) 
                    sidenav.removeClass(Classes.START); // Iniciado
                
                if (!sidenav.hasClass(Classes.SHOW)) return;

                $body.removeClass(Classes.BODY_OVERFLOW_NONE_NAV); 
                sidenav.removeClass(Classes.SHOW); // Ocultando
            });
        };

        function SidenavProvider(element) {
            return new Sidenav(instanceElement(element, "sidenav"));
        }

        function fnProvider(body) {
            $body = body; return SidenavProvider; 
        }

        this.$get = ["$body", fnProvider]; // Proveedor
    }
    
    // Proveedor: Snackbar
    // Version: 1.1.2
    // Update: 28/Feb/2018
    
    Providers.Snackbar = SnackbarProvider;
    
    Providers.Snackbar.NAME = "Snackbar";
    Providers.Snackbar.VERSION = "1.1.2";
    Providers.Snackbar.KEY = "$snackbar";
    
    Providers.Snackbar.$inject = [ "$materialConstant" ];
    
    function SnackbarProvider($material) {
        
        var $appBody, $scope, $timeout, provider, // Atributos
            snackbar, body, action, span,
            promise = undefined, $duration = 3500;

        function SnackBar() { 
            instanceSnackbar(this); // Instanciando
        }

        SnackBar.prototype.show = function (text, options) {
            var self = this; instanceSnackbar(self); 
            action.addClass(Classes.HIDE); // Ocultando acción

            if (!snackbar.hasClass(Classes.SHOW)) {
                var width = "100%", right = "0px";
                
                body.html(text); snackbar.addClass(Classes.SHOW);
                
                (parseInt(body.height()) <= 20) ?  
                    body.removeClass(Classes.TWO_LINE) :
                    body.addClass(Classes.TWO_LINE); 
            
                displaceButtons(true, snackbar.innerHeight()); // Botones

                if (softtion.isDefined(options)) {
                    action.removeClass(Classes.HIDE);
                    span.html(options.label); right = "24px";
                    
                    var widthSpan = span.width() + 30;
                    width = "calc(100% - " + widthSpan + "px)";

                    action.css("height", snackbar.height());
                    self.functionAction = options.action;
                } // Se ha definido acción para disparar en componente
                
                body.css("width", width); body.css("padding-right", right);

                promise = $timeout(() => { hideSnackbar(); }, $duration);
            } else {
                if (softtion.isDefined(promise)) $timeout.cancel(promise); 
                
                hideSnackbar(); // Ocultando componente
                
                $timeout(() => { self.show(text, options); }, 160);
            }
        };

        SnackBar.prototype.setDuration = function (duration) {
            $duration = isNaN(duration) ? $duration : duration; 
            return this; // Retornando interfaz fluida
        };

        function createSnackbar() {
            snackbar = softtion.htmlElement("div", "snackbar");
            body = softtion.htmlElement("p", "body");
            action = softtion.htmlElement("div", Classes.ACTION);
            span = softtion.htmlElement("span");
            
            action.click(() => {
                if (!softtion.isFunction(provider.functionAction)) return;
                
                $scope.$apply(() => { provider.functionAction(); });
                
                if (softtion.isDefined(promise)) $timeout.cancel(promise); 
                
                hideSnackbar(); // Ocultando componente Snackbar
            });

            action.append(span); snackbar.append(body); 
            snackbar.append(action); $appBody.append(snackbar); 
        }

        function instanceSnackbar() {
            (softtion.isUndefined(snackbar)) ? 
                createSnackbar() : (!softtion.isInPage(snackbar[0])) ? 
                    createSnackbar() : null;
        }
    
        function displaceButtons(show, height) {
            var buttons = angular.element($material.SELECTORS.FAB);

            if (buttons.exists() && (window.innerWidth <= 640)) {
                var margin = (show) ? (height) + "px" : "0px";
                buttons.css("margin-bottom", margin); // Desplazando
            }
        }
        
        function hideSnackbar() {
            promise = undefined; displaceButtons(false); 
            snackbar.removeClass(Classes.SHOW); // Ocultando
        }

        var fnProvider = function (scope, appBody, timeout) { 
            $scope = scope; $appBody = appBody; $timeout = timeout; 
            
            return (provider = provider || new SnackBar());
        };

        this.$get = [ "$rootScope", "$appBody", "$timeout", fnProvider ];
    }
    
    // Proveedor: Toast
    // Version: 1.0.6
    // Update: 28/Feb/2018
    
    Providers.Toast = ToastProvider;
    
    Providers.Toast.NAME = "Toast";
    Providers.Toast.VERSION = "1.0.6";
    Providers.Toast.KEY = "$toast";
    
    Providers.Toast.$inject = [ "$materialConstant" ];
    
    function ToastProvider($material) {
        
        var $appBody, $timeout, provider, // Atributos
            body, toast, $duration = 3500, promise;

        function Toast() { 
            instanceToast(); // Instanciando
        }

        Toast.prototype.show = function (text) {
            instanceToast(); // Verificando instancia de Toast

            if (!toast.hasClass(Classes.SHOW)) {
                body.html(text); toast.addClass(Classes.SHOW); 
                displaceButtons(true, toast.innerHeight()); // Botones

                promise = $timeout(() => { hideToast(); }, $duration);
            } else {
                if (softtion.isDefined(promise)) $timeout.cancel(promise);

                var self = this; hideToast(); 
                
                $timeout(() => { self.show(text); }, 160); // Reactivando
            }
        };

        Toast.prototype.setDuration = function (duration) {
            $duration = isNaN(duration) ? $duration : duration;
            return this; // Retornando interfaz fluida
        };

        function createToast() {
            toast = softtion.htmlElement("div", "toast");
            body = softtion.htmlElement("p", "body");
            
            toast.append(body); $appBody.append(toast);
        }

        function instanceToast() {
            (softtion.isUndefined(toast)) ? createToast() :
                (!softtion.isInPage(toast[0])) ? createToast() : null;
        }
    
        function displaceButtons(show, height) {
            var buttons = angular.element($material.SELECTORS.FAB);

            if (buttons.exists() && (window.innerWidth <= 640)) {
                var margin = (show) ? (height - 16) + "px" : "0px";
                buttons.css("margin-bottom", margin); // Desplazando
            }
        }
        
        function hideToast() {
            promise = undefined; displaceButtons(false); 
            toast.removeClass(Classes.SHOW); // Ocultando
        }

        var fnProvider = function (appBody, timeout) { 
            $appBody = appBody; $timeout = timeout; 
            
            return (provider = provider || new Toast());
        };

        this.$get = [ "$appBody", "$timeout", fnProvider ];
    }
    
    // Proveedor: TooltipContainer
    // Version: 1.0.1
    // Update: 27/Feb/2018
    
    Providers.TooltipContainer = TooltipContainerProvider;
    
    Providers.TooltipContainer.NAME = "TooltipContainer";
    Providers.TooltipContainer.VERSION = "1.0.1";
    Providers.TooltipContainer.KEY = "$tooltipContainer";
    
    function TooltipContainerProvider() {
        
        var widthWindow, instance; // Instancia TooltipContainer        
        
        function TooltipContainer($body) {
            widthWindow = $body.width(); // Ancho de Window
            
            this.element = $body.find(".tooltip-container");
            
            if (!this.element.exists()) {
                this.element = angular.element(
                    softtion.html("div").
                        addClass("tooltip-container").create()
                );

                $body.append(this.element); // Agregando contenedor
            } // Contenedor tooltip no se encuentra creado en el documento
        }
        
        TooltipContainer.prototype.add = function (text) {
            var html = softtion.html("div").
                    addClass("tooltip-element").
                    addChildren(
                        softtion.html("p").setText(text)
                    ),
                    
                tooltip = angular.element(html.create());
        
            this.element.append(tooltip); return tooltip; // Tooltip
        };
        
        TooltipContainer.prototype.getWidthWindow = function () {
            return widthWindow; // Ancho actual de la ventana
        };

        function fnProvider($body, $windowResize) { 
            var tooltipWR = "wr-tooltip-" + softtion.getGUID();
            
            $windowResize.addListener(tooltipWR, (window) => {
                widthWindow = window.width(); // Nuevo ancho
            });
            
            return (instance = instance || new TooltipContainer($body));
        }       

        this.$get = ["$body", "$windowResize", fnProvider]; // Proveedor
    }
    
    // Proveedor: MaterialTheme
    // Version: 1.0.1
    // Update: 28/Feb/2018
    
    Providers.MaterialTheme = MaterialThemeProvider;
    
    Providers.MaterialTheme.NAME = "MaterialTheme";
    Providers.MaterialTheme.VERSION = "1.0.1";
    Providers.MaterialTheme.KEY = "$materialTheme";
    
    Providers.MaterialTheme.$inject = [ "$materialColor" ];
    
    function MaterialThemeProvider($materialColor) {
        
            // Atributos del proveedor
        var instance = null, themes = $materialColor.THEMES, // Colores de Temas
            KEYS = {
                THEMES: {
                    PRIMARY: {
                        BASE: "--theme-primary-",
                        FONT: {
                            PRIMARY: "--theme-primary-font-primary-",
                            SECONDARY: "--theme-primary-font-secondary-",
                            DISABLED: "--theme-primary-font-disabled-"
                        },
                        BORDER: "--theme-primary-border-",
                        BORDER_BASE: "--theme-primary-border",
                        RIPPLE: "--theme-primary-ripple-",
                        RIPPLE_BASE: "--theme-primary-ripple"
                    },
                    SECONDARY: {
                        BASE: "--theme-secondary-",
                        FONT: {
                            PRIMARY: "--theme-secondary-font-primary-",
                            SECONDARY: "--theme-secondary-font-secondary-",
                            DISABLED: "--theme-secondary-font-disabled-"
                        },
                        BORDER: "--theme-secondary-border-",
                        BORDER_BASE: "--theme-secondary-border",
                        RIPPLE: "--theme-secondary-ripple-",
                        RIPPLE_BASE: "--theme-secondary-ripple"
                    }
                },
                
                INDEXS: [ 
                    "50", "100", "200", "300", "400", "500", "600", "700", "800", "900"
                ]
            };

        function MaterialTheme() { }

        MaterialTheme.prototype.setPrimary = function (theme) {
            var $theme = themes[theme]; // Tema primario

            if (softtion.isUndefined($theme)) return; // No existe Tema
           
            var borders = $materialColor.BORDERS, // Borders
                fonts = $materialColor.FONTS, // Fuente
                ripples = $materialColor.RIPPLES; // Ripples
                
            KEYS.INDEXS.forEach((key) => {
                setPropertyStyle(KEYS.THEMES.PRIMARY.BASE + key, $theme[key]); // Paleta
                
                setPropertyStyle( // Color de fuente Primario
                    KEYS.THEMES.PRIMARY.FONT.PRIMARY + key, fonts[$theme.FONTS[key]].PRIMARY
                );
                
                setPropertyStyle( // Color de fuente Secundario
                    KEYS.THEMES.PRIMARY.FONT.SECONDARY + key, fonts[$theme.FONTS[key]].SECONDARY
                );
                
                setPropertyStyle( // Color de fuente Inactivo
                    KEYS.THEMES.PRIMARY.FONT.DISABLED + key, fonts[$theme.FONTS[key]].DISABLED
                );
                
                setPropertyStyle( // Border
                    KEYS.THEMES.PRIMARY.BORDER + key, borders[$theme.FONTS[key]]
                );
                
                setPropertyStyle( // Ripple
                    KEYS.THEMES.PRIMARY.RIPPLE + key, ripples[$theme.FONTS[key]]
                );
            });

            // Color de borde
            setPropertyStyle(KEYS.THEMES.PRIMARY.BORDER_BASE, getHexToRgba($theme[500]));
                        
            // Color de ripple
            setPropertyStyle(KEYS.THEMES.PRIMARY.RIPPLE_BASE, getHexToRgba($theme[600]));
        };

        MaterialTheme.prototype.setError = function (theme) {
            var $theme = themes[theme], fonts = $materialColor.FONTS;

            if (softtion.isUndefined($theme)) return; // No existe Tema
            
            setPropertyStyle("--theme-error-500", $theme[500]);
            setPropertyStyle("--theme-error-font-primary-500", fonts[$theme.fonts[500]].PRIMARY);
            setPropertyStyle("--theme-error-font-secondary-500", fonts[$theme.fonts[500]].SECONDARY);
            setPropertyStyle("--theme-error-font-disabled-500", fonts[$theme.fonts[500]].DISABLED);
            
            setPropertyStyle("--theme-error-100", $theme[100]);
            setPropertyStyle("--theme-error-font-primary-100", fonts[$theme.fonts[100]].PRIMARY);
            setPropertyStyle("--theme-error-font-secondary-100", fonts[$theme.fonts[100]].SECONDARY);
            setPropertyStyle("--theme-error-font-disabled-100", fonts[$theme.fonts[100]].DISABLED);
        };

        MaterialTheme.prototype.setSecondary = function (theme) {
            var $theme = themes[theme]; // Tema primario

            if (softtion.isUndefined($theme)) return; // No existe Tema
            
            var borders = $materialColor.BORDERS, // Borders
                fonts = $materialColor.FONTS, // Fuente
                ripples = $materialColor.RIPPLES; // Ripples
                
            KEYS.INDEXS.forEach((key) => {
                setPropertyStyle(KEYS.THEMES.SECONDARY.BASE + key, $theme[key]);
                
                setPropertyStyle( // Color de fuente Primario
                    KEYS.THEMES.SECONDARY.FONT.PRIMARY + key, fonts[$theme.FONTS[key]].PRIMARY
                );
                
                setPropertyStyle( // Color de fuente Secundario
                    KEYS.THEMES.SECONDARY.FONT.SECONDARY + key, fonts[$theme.FONTS[key]].SECONDARY
                );
                
                setPropertyStyle( // Color de fuente Inactivo
                    KEYS.THEMES.SECONDARY.FONT.DISABLED + key, fonts[$theme.FONTS[key]].DISABLED
                );
                
                setPropertyStyle( // Color de fuente Inactivo
                    KEYS.THEMES.SECONDARY.FONT.DISABLED + key, fonts[$theme.FONTS[key]].DISABLED
                );
                
                setPropertyStyle( // Border
                    KEYS.THEMES.SECONDARY.BORDER + key, borders[$theme.FONTS[key]]
                );
                
                setPropertyStyle( // Ripple
                    KEYS.THEMES.SECONDARY.RIPPLE + key, ripples[$theme.FONTS[key]]
                );
            });

            // Color de borde
            setPropertyStyle(KEYS.THEMES.SECONDARY.BORDER_BASE, getHexToRgba($theme[500]));
                        
            // Color de ripple
            setPropertyStyle(KEYS.THEMES.SECONDARY.RIPPLE_BASE, getHexToRgba($theme[600]));
        };

        MaterialTheme.prototype.register = function (name, theme) {
            var result = softtion.required(theme, KEYS.INDEXS);

            if (result.success) themes[name] = theme; // Tema correcto
            
            return this; // Retornando interfaz fluida
        };
        
        MaterialTheme.prototype.get = function () { return themes; };
        
        MaterialTheme.prototype.getPallete = function (pallette) {
            return themes[pallette.toUpperCase()];
        };
        
        MaterialTheme.prototype.getColor = function (pallette, base) {
            return themes[pallette.toUpperCase()][base];
        };
        
        function getHexToRgba(hex, opacity) {
            opacity = opacity || "0.5"; // Opacidad del color
            
            var c = softtion.getHexToRgb(hex); // Rgb
            
            return "rgba("+c.r+", "+c.g+", "+c.b+", "+opacity+")" ;
        }

        this.$get = function () { 
            return (instance = instance || new MaterialTheme());
        };

        this.setPrimary = function (theme) {
            instance = instance || new MaterialTheme();
            instance.setPrimary(theme); return this;
        };

        this.setError = function (theme) {
            instance = instance || new MaterialTheme();
            instance.setError(theme); return this;
        };

        this.setSecondary = function (theme) {
            instance = instance || new MaterialTheme();
            instance.setSecondary(theme); return this;
        };

        this.register = function (name, theme) {
            instance = instance || new MaterialTheme();
            instance.register(name, theme); return this;
        };
    }
    
    // Proveedor: WindowResize
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Providers.WindowResize = WindowResizeProvider;
    
    Providers.WindowResize.NAME = "WindowResize";
    Providers.WindowResize.VERSION = "1.0.0";
    Providers.WindowResize.KEY = "$windowResize";
    
    function WindowResizeProvider() {

        var listeners = {}; // Atributos
    
        function WindowResize() { }

        WindowResize.prototype.addListener = function (key, listener) {
            if (softtion.isFunction(listener)) listeners[key] = listener;
        };

        WindowResize.prototype.removeListener = function (key) {
            softtion.removeKey(listeners, key);
        };

        var windowResize = new WindowResize();

        var fnProvider = function ($scope, $window) { 
            var window = angular.element($window);

            window.resize((event) => {
                $scope.$apply(() => {
                    angular.forEach(listeners, (fn) => { fn(window, event, $window); });
                });
            });

            return windowResize; // Retornando manejador de Listener
        };

        this.$get = ["$rootScope", "$window", fnProvider];
    }
    
    // PROPIEDADES DE SOFTTION MATERIAL
    
    function Properties(name) { 
        switch (name) {
            case (Properties.BottomSheet.NAME): return Properties.BottomSheet;
            case (Properties.Dialog.NAME): return Properties.Dialog;
            case (Properties.Dropdown.NAME): return Properties.Dropdown;
            case (Properties.FocusedElement.NAME): return Properties.FocusedElement;
            case (Properties.FormNavigation.NAME): return Properties.FormNavigation;
            case (Properties.MaterialBackground.NAME): return Properties.MaterialBackground;
            case (Properties.MaterialFont.NAME): return Properties.MaterialFont;
            case (Properties.MaterialTheme.NAME): return Properties.MaterialTheme;
            case (Properties.Sidenav.NAME): return Properties.Sidenav;
        }
    }
    
    Properties.create = function (key) {
        var property = this(key.NAME); // Propiedad a instanciar
        
        return {
            directive: property,       // Función
            name: property.KEY         // Clave
        };
    };
    
    // Propiedad: BottomSheet
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Properties.BottomSheet = BottomSheetProperty;
    
    Properties.BottomSheet.NAME = "BottomSheet";
    Properties.BottomSheet.VERSION = "1.0.0";
    Properties.BottomSheet.KEY = "bottomSheet";
    
    Properties.BottomSheet.$inject = [ "$bottomSheet" ];
    
    function BottomSheetProperty($bottomSheet) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var bottomSheet = $bottomSheet($attrs.bottomSheet);
                
                $element.on("click", () => { bottomSheet.show(); });
            }
        };
    }
    
    // Propiedad: Dialog
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Properties.Dialog = DialogProperty;
    
    Properties.Dialog.NAME = "Dialog";
    Properties.Dialog.VERSION = "1.0.0";
    Properties.Dialog.KEY = "dialog";
    
    Properties.Dialog.$inject = [ "$dialog" ];
    
    function DialogProperty($dialog) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var dialog = $dialog($attrs.dialog);
                
                $element.on("click", () => { dialog.show(); });
            }
        };
    }
    
    // Propiedad: Dropdown
    // Version: 1.0.0
    // Update: 09/Mar/2018
    
    Properties.Dropdown = DropdownProperty;
    
    Properties.Dropdown.NAME = "Dropdown";
    Properties.Dropdown.VERSION = "1.0.0";
    Properties.Dropdown.KEY = "dropdown";
    
    Properties.Dropdown.$inject = [ "$dropdown" ];
    
    function DropdownProperty($dropdown) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var dropdown = $dropdown($attrs.dropdown),
                    belowDropdown = $scope.$eval($attrs.belowDropdown),
                    autoclose = $scope.$eval($attrs.autoclose);
            
                dropdown.setBelowOrigin(belowDropdown);

                $element.on("click", (event) => {
                    if (autoclose) event.stopPropagation(); 
                    
                    dropdown.show($element, autoclose);
                });
            }
        };
    }
    
    // Propiedad: FocusedElement
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Properties.FocusedElement = FocusedElementProperty;
    
    Properties.FocusedElement.NAME = "FocusedElement";
    Properties.FocusedElement.VERSION = "1.0.0";
    Properties.FocusedElement.KEY = "focusedElement";
    
    Properties.FocusedElement.$inject = [ "$parse" ];
    
    function FocusedElementProperty($parse) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var $focusedElement = $parse($attrs.focusedElement);
                
                $scope.$watch($focusedElement, (value) => {
                    if (value === true) { 
                        $element.focus(); $focusedElement.assign($scope, false);
                    } // Se debe enfocar componente establecido
                });
            }
        };
    }
    
    // Propiedad: FormNavigation
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Properties.FormNavigation = FormNavigationProperty;
    
    Properties.FormNavigation.NAME = "FormNavigation";
    Properties.FormNavigation.VERSION = "1.0.0";
    Properties.FormNavigation.KEY = "formNavigation";
    
    Properties.FormNavigation.$inject = [ "$formNavigation" ];
    
    function FormNavigationProperty($formNavigation) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var formNavigation = $formNavigation($attrs.formNavigation);
                
                $element.on("click", () => { formNavigation.show(); });
            }
        };
    }
    
    // Propiedad: MaterialBackground
    // Version: 1.0.2
    // Update: 28/Feb/2018
    
    Properties.MaterialBackground = MaterialBackgroundProperty;
    
    Properties.MaterialBackground.NAME = "MaterialBackground";
    Properties.MaterialBackground.VERSION = "1.0.2";
    Properties.MaterialBackground.KEY = "materialBackground";
    
    Properties.MaterialBackground.$inject = [ "$materialTheme" ];
    
    function MaterialBackgroundProperty($themes) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("materialBackground", () => {
                    var background = $attrs.materialBackground;

                    if (!softtion.isText(background)) return;
                    
                    var properties = background.split(":");

                    if (!properties.has(2)) return;
                    
                    var color = $themes.getColor(properties[0], properties[1]);

                    if (softtion.isText(color)) // Color correcto
                        $element.css("background-color", color);
                });
            }
        };
    }
    
    // Propiedad: MaterialFont
    // Version: 1.0.2
    // Update: 28/Feb/2018
    
    Properties.MaterialFont = MaterialFontProperty;
    
    Properties.MaterialFont.NAME = "MaterialFont";
    Properties.MaterialFont.VERSION = "1.0.2";
    Properties.MaterialFont.KEY = "materialFont";
    
    Properties.MaterialFont.$inject = [ "$materialTheme" ];
    
    function MaterialFontProperty($themes) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("materialFont", () => {
                    var fontColor = $attrs.materialFont;

                    if (!softtion.isText(fontColor)) return;
                    
                    var properties = fontColor.split(":");

                    if (!properties.has(2)) return;
                    
                    var color = $themes.getColor(properties[0], properties[1]);

                    if (softtion.isText(color)) // Color correcto
                        $element.css("color", color);
                });
            }
        };
    }
    
    // Propiedad: MaterialTheme
    // Version: 1.0.0
    // Update: 02/Jun/2018
    
    Properties.MaterialTheme = MaterialThemeProperty;
    
    Properties.MaterialTheme.NAME = "MaterialTheme";
    Properties.MaterialTheme.VERSION = "1.0.0";
    Properties.MaterialTheme.KEY = "materialTheme";
    
    Properties.MaterialTheme.$inject = [ "$materialTheme", "$materialColor" ];
    
    function MaterialThemeProperty($themes, $colors) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("materialTheme", () => {
                    var themeColor = $attrs.materialTheme;
                    
                    if (!softtion.isText(themeColor)) return;
                    
                    var properties = themeColor.split(":");

                    if (!properties.has(2)) return;
                    
                    var pallete = $themes.getPallete(properties[0]);
                    
                    if (softtion.isDefined(pallete)) {
                        $element.css("background-color", pallete[properties[1]]);
                        
                        var font = pallete.FONTS[properties[1]];
                        $element.css("color", $colors.FONTS[font].PRIMARY);
                    } // Se encontro la paleta de colores, cargando configuración
                });
            }
        };
    }
    
    // Propiedad: Sidenav
    // Version: 1.0.0
    // Update: 28/Feb/2018
    
    Properties.Sidenav = SidenavProperty;
    
    Properties.Sidenav.NAME = "Sidenav";
    Properties.Sidenav.VERSION = "1.0.0";
    Properties.Sidenav.KEY = "sidenav";
    
    Properties.Sidenav.$inject = [ "$sidenav" ];
    
    function SidenavProperty($sidenav) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var sidenav = $sidenav($attrs.sidenav);
                
                $element.on("click", () => { sidenav.show(); });
            }
        };
    }
    
    // FUNCIONES DE SOFTTION MATERIAL
                    
    function setPropertyStyle (key, value) {
        document.documentElement.style.setProperty(key, value);
    };
    
    function instanceElement (object, hasClass) {
        var element = undefined; // Iniciando elemento
        
        if (softtion.isText(object)) 
            element = angular.element(object); // Selector de elemento
        
        else if (softtion.isjQuery(object)) 
            element = object; // Instancia de elemento jquery
        
        if (softtion.isUndefined(element)) return undefined;
                
        if (softtion.isText(hasClass) && !element.hasClass(hasClass))
            element = undefined; // Elemento no contiene la clase establecida
        
        return element; // Retornando elemento generado
    }
    
    function executeIfExists (object, callback) {
        return (softtion.isDefined(object)) ? callback() : undefined;
    }
    
    function getTypeInput(typeInput) {
        switch (typeInput) {
            case (TextType.NUMBER): return "number";
            case (TextType.MATH): return "number";
            case (TextType.MONEY): return "number";
            case (TextType.PASSWORD): return "password";
            default: return "text";
        }
    }
    
    function defineInputComponent($scope, $element, $attrs) {
            // Componentes
        var input = $element.find("input");
        
            // Atributos
        var listener = new Listener($scope, Listener.KEYS.INPUT);

        $scope.$watch(() => { return $scope.clearModel; }, 
            (newValue) => {
                if (newValue === true) {
                    $scope.value = undefined; $scope.input = ""; 
                    $scope.clearModel = false;
                }
            });

        $scope.$watch(() => { return $scope.autocomplete; }, 
            (newValue) => {
                $scope.autocompleteValue = (newValue) ? "on" : "off";
            });
        
        $scope.$watch(() => { return $scope.value; }, 
            (newValue, oldValue) => { 
                if (!$scope.inputStart) return; // Componente iniciado
                
                if (newValue !== oldValue) listener.launch(Listeners.CHANGED);
                
                if ($scope.errorActive) validateValue(newValue);
                
                if (!$scope.inputActive) {
                    if (softtion.isText(newValue)) {
                        $scope.value = ($scope.ngUppercase) ?
                            newValue.toUpperCase() : ($scope.ngLowercase) ?
                            newValue.toLowerCase() : newValue;   
                    } // Se verifica si debe ser UpperCase o LowerCase
                    
                    $scope.input = (softtion.isUndefined(newValue)) ? "" : newValue;
                } else {
                    if (!(newValue === $scope.input)) $scope.input = newValue;
                } // Verificando si el texto del input es diferente
            });
            
        $attrs.$observe("iconAction", (value) => {
            $scope.isIconAction = softtion.isText(value);
        });

        // Atributos de control
        $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

        $scope.typeInput = getTypeInput($scope.type || "text");
        $scope.input = ""; $scope.isIconAction = false;
        $scope.errorActive = false; $scope.inputActive = false; 
        $scope.viewPassword = false; $scope.inputStart = false;

        if ($scope.type === "password") {
            $scope.iconAction = "visibility"; $scope.isIconAction = true;
        } // Se debe activar el icono de acción para password

        $scope.isActiveLabel = function () {
            if ($scope.inputActive) return true; // Input enfocado
            
            switch ($scope.type) {
                case (TextType.INTEGER):
                    return softtion.isDefined($scope.value);
                
                case (TextType.MONEY):
                    return softtion.isDefined($scope.value);
                
                case (TextType.MATH):
                    return softtion.isDefined($scope.value);

                case (TextType.DECIMAL): 
                    return softtion.isDefined($scope.value);

                case (TextType.EMAIL): 
                    return softtion.isText($scope.value) || softtion.isText($scope.input);

                default: 
                    return (softtion.isText($scope.value));
            } // Verificando depediendo del tipo de dato a manipular
        };

        $scope.isIconDescription = function () {
            return softtion.isText($scope.iconDescription);
        };

        $scope.isCounterAllowed = function () {
            return $scope.counterVisible && (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
        };

        $scope.textCounter = function () {
            var text = ($scope.inputActive) ? $scope.input : 
                (softtion.isDefined($scope.value)) ? 
                    $scope.value.toString() : $scope.input;

            return text.length + "/" + $scope.maxLength; 
        };

        $scope.isHaveText = function () {
            return softtion.isText($scope.input) || softtion.isDefined($scope.value);
        };

        $scope.isPlaceholder = function () {
            return ($scope.inputActive) ? 
                softtion.isText($scope.input) : softtion.isDefined($scope.value);
        };
        
        $scope.isHolderActive = function () {
            return $scope.inputActive ? false : softtion.isText($scope.label) ? 
                false : softtion.isUndefined($scope.value);
        };
        
        $scope.hideHelperText = function () {
            return $scope.errorActive || (softtion.isDefined($scope.value) && !$scope.inputActive);
        };

        $scope.clickLabel = function () { input.focus(); };

        $scope.clickAction = function ($event) {
            if ($scope.ngDisabled) return; // Componente esta desactivado

            if ($scope.type === "password") {
                $scope.viewPassword = !$scope.viewPassword; // Definiendo visibilidad

                $scope.typeInput = $scope.viewPassword ? "text" : "password";
                $scope.iconAction = $scope.viewPassword ? "visibility_off" : "visibility";
            } else {
                listener.launch(Listeners.ACTION, { $event: $event });
            } // Disparando evento de cualquier acción
        };

        $scope.clickIconDescription = function ($event) {
            listener.launch(Listeners.ICON, { $event: $event });
        };
        
        $scope.checkboxListener = function ($checked) {
            $scope.checkboxModel = $checked; // Estado del checkbox
            listener.launch(Listeners.CHECKBOX, { $checked: $checked });
        };

        $scope.clickInput = function ($event) {
            listener.launch(Listeners.CLICK, { $event: $event });
        };

        $scope.focusInput = function ($event) {
            if (softtion.isDefined($scope.value)) // Model => Input
                $scope.input = $scope.value.toString();
            
            $scope.inputStart = true; // Iniciando componente
            $element.addClass(Classes.ACTIVE); $scope.inputActive = true; 

            listener.launch(Listeners.FOCUS, { $event: $event });
        };

        $scope.blurInput = function ($event) {
            $scope.inputActive = false; $element.removeClass(Classes.ACTIVE);
            verifyModelBlur(); listener.launch(Listeners.BLUR, { $event: $event });
        };
        
        $scope.keydownInput = function ($event) {
            ($event.originalEvent.which === KeysBoard.ENTER) ?
                listener.launch(Listeners.ENTER, { $event: $event }) :
                listener.launch(Listeners.KEY_DOWN, { $event: $event });
        };

        $scope.keyupInput = function ($event) {
            $scope.input = softtion.getValueString($scope.type, $scope.input);
            
            if (!isNaN($scope.maxLength)) {
                $scope.input = $scope.input.substr(0, $scope.maxLength);
            } // Reestringiendo nuevo caracter
            
            defineModelKeyupInput(); listener.launch(Listeners.KEY_UP, { $event: $event });
        };

        $scope.getValueModel = function () {
            if ($scope.isHolderActive()) return $scope.placeholder; // Placeholder
            
            var value = (softtion.isDefined($scope.value)) ? $scope.value : $scope.input;
            
            if (($scope.type === "password") && !$scope.viewPassword) {
                value = convertToPassword(value.length);
            } else if (softtion.isDefined(value)) {
                var format = $scope.ngFormatValue({$model: value, $value: String(value)});
                
                if (softtion.isDefined(format)) value = format;
            } // Se establecio formato para el componente de texto

            return value; // Retornando el valor a mostrar
        };
        
        function defineModelKeyupInput() {
            (validateValue($scope.input, !$scope.errorActive)) ?
                defineModel() : setValueModel(undefined);
        }

        function defineModel() {
            switch ($scope.type) {
                case (TextType.INTEGER):
                    setValueModel(parseInt($scope.input));
                break;
                
                case (TextType.MONEY):
                    setValueModel(parseFloat($scope.input));
                break;
                
                case (TextType.MATH):
                    setValueModel(parseFloat($scope.input));
                break;

                case (TextType.DECIMAL): 
                    setValueModel(parseFloat($scope.input)); 
                break;

                default: setValueModel($scope.input); break;
            } // Definiendo tipo de dato del modelo
        }

        function setValueModel(value) {
            $scope.value = value; // Definiendo Model
        }

        function verifyModelBlur() {
            if (validateValue($scope.input)) $scope.input = ""; // Todo correcto
            
            if (softtion.isText($scope.value)) {
                $scope.value = ($scope.ngUppercase) ?
                    $scope.value.toUpperCase() : ($scope.ngLowercase) ?
                    $scope.value.toLowerCase() : $scope.value;   
            } // Se verifica si debe ser UpperCase o LowerCase
        }

        function setInputError(message, disabledError) {
            if (disabledError) return; // No se requiere activación
            
            $scope.errorActive = true; $scope.errorText = message; 
            $element.addClass("error"); // Agregando error en componente
        }
        
        function removeInputError() {
            $scope.errorActive = false; $element.removeClass("error"); 
        }
        
        function validateValue(value, disabledError) {
            if (softtion.isUndefined(value))
                if ($scope.required) {
                    setInputError("Este campo es requerido", disabledError); return false;
                } // El valor establecido es indefinido
            
            if (softtion.isDefined(value)) {
                if (!softtion.isText(value.toString()) && $scope.required) {
                    setInputError("Este campo es requerido", disabledError); return false;
                }// No ha establecido caracteres en el componente de Texto

                if (value.toString().length < $scope.minLength) {
                    var message = "Este campo requiere minimo " + $scope.minLength + " caracteres";
                    setInputError(message, disabledError); return false;
                } // No ha establecido caracteres mínimos requeridos

                var result = validateTypeText(value.toString()); // Validando texto

                if (!result.success) {
                    setInputError(result.message, disabledError); return false; 
                } // El texto no pasa verificación de tipo de texto
            } // El valor establecido es definido
            
            removeInputError(); return true;  // Valor cumple con los requisitos
        }
        
        function validateTypeText(value) {
            if (!softtion.isText(value)) return { success: true };
            
            var result = { success: softtion.getSuccessString($scope.type, value) };
            
            if (!result.success) {
                switch ($scope.type) {
                    case (TextType.EMAIL):
                        result.message = "Texto digitado no es un email";
                    break;
                    case (TextType.MONEY):
                        result.message = "Texto digitado no es un dato monetario";
                    break;
                    case (TextType.MATH):
                        result.message = "Texto digitado no es un dato matemático";
                    break;
                    case (TextType.DECIMAL):
                        result.message = "Texto digitado no es un número decimal";
                    break;
                }
            } // No paso el control de validación
            
            return result; // Retornando resultado de control de texto
        }
        
        function convertToPassword(length) {
            var password = ""; // Cadena formato de contraseña

            for (var i = 0; i < length; i++) { 
                password += String.fromCharCode(8226); 
            } // Estableciendo caracter password '•'
            
            return password; // Retornando cadena de Password
        }
    }
    
    function defineAreaComponent($scope, $element) {
            // Componentes
        var hidden = $element.find(".textarea-hidden"),
            area = $element.find("textarea");
    
            // Atributos
        var listener = new Listener($scope, Listener.KEYS.TEXTAREA);

        hidden.resize(() => { area.css("height", hidden.height() + "px"); });

        // Atributos de control
        $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

        $scope.area = ""; $scope.real = false;
        $scope.areaActive = false; $scope.valueHidden = "";
        $scope.areaStart = false; $scope.heightEnd = 0;
        
        $scope.pressEnter = false; $scope.countEnter = 0;

        if (softtion.isText($scope.value)) $element.addClass(Classes.ACTIVE); 

        $scope.$watch(() => { return $scope.clearModel; }, 
            (newValue) => {
                if (newValue === true) {
                    $scope.valueHidden = ""; $scope.value = undefined; 
                    $scope.area = ""; $scope.clearModel = false;
                }
            });
        
        $scope.$watch(() => { return $scope.value; }, 
            (newValue, oldValue) => { 
                if (!$scope.areaStart) return; // Componente iniciado
                
                if (newValue !== oldValue) listener.launch(Listeners.CHANGED);
                
                if ($scope.errorActive) validateValue(newValue);
                
                if (!$scope.areaActive) {
                    if (softtion.isText(newValue)) {
                        $scope.value = ($scope.ngUppercase) ?
                            newValue.toUpperCase() : ($scope.ngLowercase) ?
                            newValue.toLowerCase() : newValue;   
                    } // Se verifica si debe ser UpperCase o LowerCase
                    
                    if (softtion.isUndefined(newValue)) {
                        $scope.countEnter = 0; $scope.area = "";
                    } else {
                        $scope.area = newValue; // Nuevo valor
                    }
                }  else {
                    if (!(newValue === $scope.area)) $scope.area = newValue;
                } // Verificando si el texto del input es diferente
            });

        $scope.heightStyle = function () {
            $scope.valueHidden = ($scope.real) ? $scope.area : $scope.value;
            
            var heightEnter = $scope.countEnter * 18,
                heightArea = 0; // Alto del area
            
            if (hidden.height() > 0) {
                $scope.heightEnd = hidden.height(); heightArea = hidden.height();
            } else if (softtion.isText($scope.valueHidden)) {
                heightArea = $scope.heightEnd; 
            } // El componente tiene texto definido
                
            return ($scope.pressEnter) ?
                "height: " + (heightArea + heightEnter) + "px;" :
                "height: " + heightArea + "px;";
        };

        $scope.isActiveLabel = function () {
            return ($scope.areaActive  || softtion.isText($scope.area)) || 
                (softtion.isDefined($scope.value) && softtion.isText($scope.value));
        };

        $scope.isIconDescription = function () {
            return softtion.isText($scope.iconDescription);
        };

        $scope.isCounterAllowed = function () {
            return $scope.counterVisible && (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
        };

        $scope.textCounter = function () {
            var text = ($scope.areaActive) ? $scope.area : 
                (softtion.isDefined($scope.value)) ? 
                    $scope.value.toString() : $scope.area;

            return text.length + "/" + $scope.maxLength; 
        };

        $scope.isHaveText = function () {
            return softtion.isText($scope.area) || softtion.isDefined($scope.value);
        };

        $scope.isPlaceholder = function () {
            return ($scope.areaActive) ? 
                softtion.isText($scope.area) : softtion.isDefined($scope.value);
        };
        
        $scope.isHolderActive = function () {
            return $scope.areaActive ? false : softtion.isText($scope.label) ? 
                false : !softtion.isText($scope.value);
        };
        
        $scope.hideHelperText = function () {
            return $scope.errorActive || (softtion.isText($scope.value) && !$scope.areaActive);
        };

        $scope.clickLabel = function () {
            if (!$scope.ngReadonly) area.focus(); // Area enfocable
        };

        $scope.clickIconDescription = function ($event) {
            listener.launch(Listeners.ICON, { $event: $event });
        };

        $scope.clickArea = function ($event) {
            if (!$scope.ngReadonly) $event.preventDefault();
            
            listener.launch(Listeners.CLICK, { $event: $event });
        };

        $scope.focusArea = function ($event) {            
            if (softtion.isDefined($scope.value)) // Model => Area
                $scope.area = $scope.value.toString();

            $scope.areaActive = true; $scope.real = true; 
            $element.addClass(Classes.ACTIVE); $scope.areaStart = true;
            
            listener.launch(Listeners.FOCUS, { $event: $event });
        };

        $scope.blurArea = function ($event) {
            $element.removeClass(Classes.ACTIVE); // Inactivando Componente

            $scope.real = false; $scope.areaActive = false; 
            $scope.pressEnter = false; $scope.countEnter = 0;
            
            verifyModelBlur(); listener.launch(Listeners.BLUR, { $event: $event });
        };

        $scope.keydownArea = function ($event) {
            $scope.pressEnter = false; // Inactivando tecla Enter

            if ($event.originalEvent.which === KeysBoard.ENTER) {
                var cursorPosition = area.getCursorPosition(); // Posición
                
                if (cursorPosition === 0) $event.preventDefault();
                
                if ($scope.area.length <= cursorPosition) {
                    $scope.pressEnter = true; $scope.countEnter++;
                } // No se encuentra al final de Elemento
            
                listener.launch(Listeners.ENTER, { $event: $event });
            } else {
                $scope.countEnter = 0; // Se reinicia el contador
                listener.launch(Listeners.KEY_DOWN, { $event: $event });
            } // Se establece nuevo caracter para agregar en TextArea
        };

        $scope.keyupArea = function ($event) {
            defineModelKeyupArea(); listener.launch(Listeners.KEY_UP, { $event: $event });
        };

        $scope.getValueModel = function () {
            return ($scope.isHolderActive()) ? $scope.placeholder :
                (softtion.isDefined($scope.value)) ? $scope.value : $scope.area;
        };
        
        function defineModelKeyupArea() {
            (validateValue($scope.area, !$scope.errorActive)) ?
                defineModel() : setValueModel(undefined);
        }

        function defineModel() {
            setValueModel($scope.area); // Asignando valor
        }

        function setValueModel(value) {
            $scope.value = value; // Definiendo Model
        }

        function verifyModelBlur() {
            if (validateValue($scope.area)) $scope.area = ""; // Todo correcto
            
            if (softtion.isText($scope.value)) {
                $scope.value = ($scope.ngUppercase) ?
                    $scope.value.toUpperCase() : ($scope.ngLowercase) ?
                    $scope.value.toLowerCase() : $scope.value;   
            } // Se verifica si debe ser UpperCase o LowerCase
        }
        
        function removeAreaError() {
            $scope.errorActive = false; $element.removeClass("error"); 
        }

        function setAreaError(message) {
            $scope.errorActive = true; $element.addClass("error"); 
            $scope.errorText = message; // Agregando error en componente
        }
        
        function validateValue(value, disabledError) {
            if (softtion.isUndefined(value))
                if ($scope.required) {
                    setAreaError("Este campo es requerido", disabledError); return false;
                } // El valor establecido es indefinido
            
            if (softtion.isDefined(value)) {
                if (!softtion.isText(value.toString()) && $scope.required) {
                    setAreaError("Este campo es requerido", disabledError); return false;
                }// No ha establecido caracteres en el componente de Texto
            
                if (value.toString().length < $scope.minLength) {
                    var message = "Este campo requiere minimo " + $scope.minLength + " caracteres";
                    setAreaError(message, disabledError); return false;
                } // No ha establecido caracteres mínimos requeridos
            } // El valor establecido es definido
            
            removeAreaError(); return true;  // Valor cumple con los requisitos
        }
    }
    
    function filterDictionary() {
        return function (array, pattern) {
            var result = []; // Lista de array a generar
            
            if (!softtion.isText(pattern)) { return array; } 
                               
            angular.forEach(array, (item) => {
                if (~item.toLowerCase().indexOf(pattern)) 
                    result.push(item); // Agregando item encontrado
            });
            
            return result; // Retornando array filtrado
        };
    }
    
    function Listener($scope, keys) {
        this.scope = $scope; this.keys = keys;
    }
    
    Listener.prototype.launch = function (name, datas) {
        var self = this, result = { $listener: name }; // Iniciando
        
        if (softtion.isArray(self.keys)) 
            self.keys.forEach((item) => {
                result[item.key] = self.scope[item.value];
            });
            
        self.scope.ngListener(angular.extend(result, datas));
    };
    
    Listener.KEYS = {
        AUTOCOMPLETE: [
            { key: "$model", value:"select" }, 
            { key: "$old", value:"old" }, 
            { key: "$value", value:"input" }
        ],
        
        CHECKBOX: [
            { key: "$model", value: "checked" }
        ],
        
        CHIP_INPUT: [
            { key: "$model", value: "values" },
            { key: "$value", value: "input" }
        ],
        
        CLOCKPICKER: [
            { key: "$model", value: "time" }
        ],

        DATEPICKER: [
            { key: "$model", value: "date" }
        ],

        FILECHOOSER: [
            { key: "$model", value: "file" }
        ],

        FILECHOOSER_MULTIPLE: [
            { key: "$model", value: "files" }
        ],

        INPUT: [
            { key: "$model", value: "value" }, 
            { key: "$value", value: "input" }
        ],

        RADIOBUTTON: [
            { key: "$model", value: "model" }
        ],

        RATING: [
            { key: "model", value: "value" }
        ],

        SELECT: [
            { key: "$model", value:"select" }, 
            { key: "$old", value:"old" }
        ],

        SELECT_MULTIPLE: [
            { key: "$model", value:"selects" }
        ],

        TEXTAREA: [
            { key: "$model", value: "value" }, 
            { key: "$value", value: "area" }
        ]
    };
    
    // Servicio: $materialFunction
    
    function softtionMaterialFunction() {
        return {
            setDensity: function (image, width, height) {
                var density = height / width; // Calculando

                (density > 1) ?
                    image.addClass("density-height") :
                    image.addClass("density-width");

                image.addClass(Classes.ACTIVE); // Activando imagen
            }
        };
    }
    
    // Servicio: $materialService
    
    softtionMaterialService.$inject = [ "$window", "$timeout", "$body", "$appContent" ];
    
    function softtionMaterialService($window, $timeout, $body, $appContent) {
        
        var service = this, // Objeto del servicio
            oldHeight = 0,
            enabledKeyBoard = false;
        
        service.enabledKeyboardMobileScroll = enabledKeyboardMobileScroll;
        
        function enabledKeyboardMobileScroll() {
            if (enabledKeyBoard) return; // Ya se activo el evento
            
            oldHeight = $window.innerHeight;
            
            $window.addEventListener("resize", () => {
                var newHeight = $window.innerHeight;
                    
                if (oldHeight < newHeight) {
                    $body.removeClass(Classes.SHOW_KEYBOARD);
                    oldHeight = newHeight; return;
                } // No debe realizar cálculo de posición
                
                oldHeight = newHeight; // Nueva dimensión
                
                var element = jQuery(document.activeElement);
                 
                if (element.tagIs("INPUT") || element.tagIs("TEXTAREA")) {
                    $timeout(() => {
                        $body.addClass(Classes.SHOW_KEYBOARD); // Desplegando teclado
                        
                        var screen = $appContent.scrollTop() + newHeight,
                            positionY = element.offset().top,
                            positionElement = positionY + element.height() + 64;
                            
                        if (positionElement < screen) return; // No debe moverse
                        
                        $appContent.scrollTop(positionY + element.height() + 16);
                    }, 25);
                } // Se debe realizar calculo de posición, teclado emerge
            });
        }
}
    
    // Constante: $materialConstant
    
    function softtionMaterialConstant() {
        return {
            VERSION: "2.0.0",

            SELECTORS: {
                FAB: "button.floating:not(.static), .fab-speed-dial," 
                    + " .fab-menu, .progress-button-floating, .fab-dialog"
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

            RIPPLE: {
                ELEMENT: function () {
                    return softtion.htmlElement("div", "ripple");
                },
                
                BOX: function () {
                    return softtion.htmlElement("div", "ripple-box");
                },
                
                EFFECT: function () {
                    return softtion.htmlElement("span", "effect");
                },
                
                DEFINE_EVENT: function (box, effect) {
                    box.click(($event) => {
                        if (box.parent().is(":disabled")) return;

                        if (box.hasClass(Classes.ANIMATED)) box.removeClass(Classes.ANIMATED);

                        effect.css({ 
                            top: $event.pageY - box.offset().top, 
                            left: $event.pageX - box.offset().left 
                        }); 

                        box.addClass(Classes.ANIMATED); // Animando
                    });
                }
            },

            THEMES: {
                RED: "RED",
                PINK: "PINK",
                PURPLE: "PURPLE",
                DEEP_PURPLE: "DEEP_PURPLE",
                INDIGO: "INDIGO",
                BLUE: "BLUE",
                LIGHT_BLUE: "LIGHT_BLUE",
                CYAN: "CYAN",
                TEAL: "TEAL",
                GREEN: "GREEN",
                LIGHT_GREEN: "LIGHT_GREEN",
                LIME: "LIME",
                YELLOW: "YELLOW",
                AMBER: "AMBER",
                ORANGE: "ORANGE",
                DEEP_ORANGE: "DEEP_ORANGE",
                BROWN: "BROWN",
                GREY: "GREY",
                BLUE_GREY: "BLUE_GREY",
                CRANE_PURPLE: "CRANE_PURPLE",
                CRANE_RED: "CRANE_RED",
                SHRINE_PINK: "SHRINE_PINK",
                RALLY_GREEN: "RALLY_GREEN"
            }
        };
    }
    
    function getMaterialColors() {
        return {
            THEMES: {
                RED: {
                    "50" : "#ffebee", "100": "#ffcdd2", 
                    "200": "#ef9a9a", "300": "#e57373", 
                    "400": "#ef5350", "500": "#f44336", 
                    "600": "#e53935", "700": "#d32f2f",
                    "800": "#c62828", "900": "#b71c1c",
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#ff8a80", "A200": "#ff5252", 
                    "A400": "#ff1744", "A700": "#d50000"
                },

                PINK: {
                    "50" : "#fce4ec", "100": "#f8bbd0",
                    "200": "#f48fb1", "300": "#f06292",
                    "400": "#ec407a", "500": "#e91e63",
                    "600": "#d81b60", "700": "#c2185b", 
                    "800": "#ad1457", "900": "#880e4f",
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#ff80ab", "A200": "#ff4081", 
                    "A400": "#f50057", "A700": "#c51162"
                },

                PURPLE: {
                    "50" : "#f3e5f5", "100": "#e1bee7",
                    "200": "#ce93d8", "300": "#ba68c8",
                    "400": "#ab47bc", "500": "#9c27b0", 
                    "600": "#8e24aa", "700": "#7b1fa2",
                    "800": "#6a1b9a", "900": "#4a148c",
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "LIGHT",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#ea80fc", "A200": "#e040fb", 
                    "A400": "#d500f9", "A700": "#aa00ff"
                },

                DEEP_PURPLE: {
                    "50" : "#ede7f6", "100": "#d1c4e9", 
                    "200": "#b39ddb", "300": "#9575cd", 
                    "400": "#7e57c2", "500": "#673ab7", 
                    "600": "#5e35b1", "700": "#512da8", 
                    "800": "#4527a0", "900": "#311b92", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "LIGHT",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#b388ff", "A200": "#7c4dff", 
                    "A400": "#651fff", "A700": "#6200ae"
                },

                INDIGO: {
                    "50" : "#e8eaf6", "100": "#c5cae9", 
                    "200": "#9fa8da", "300": "#7986cb", 
                    "400": "#5c6bc0", "500": "#3f51b5", 
                    "600": "#3949ab", "700": "#303f9f", 
                    "800": "#283593", "900": "#1a237e", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "LIGHT",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#8c9eff", "A200": "#536dfe", 
                    "A400": "#3d5afe", "A700": "#304ffe"
                },

                BLUE: {
                    "50" : "#e3f2fd", "100": "#bbdefb", 
                    "200": "#90caf9", "300": "#64b5f6", 
                    "400": "#42a5f5", "500": "#2196f3", 
                    "600": "#1e88e5", "700": "#1976d2", 
                    "800": "#1565c0", "900": "#0d47a1", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#82b1ff", "A200": "#448aff", 
                    "A400": "#2979ff", "A700": "#2962ff"
                },

                LIGHT_BLUE: {
                    "50" : "#e1f5fe", "100": "#b3e5fc", 
                    "200": "#81d4fa", "300": "#4fc3f7", 
                    "400": "#29b6f6", "500": "#03a9f4", 
                    "600": "#039be5", "700": "#0288d1", 
                    "800": "#0277bd", "900": "#01579b", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "DARK",  "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#80d8ff", "A200": "#40c4ff", 
                    "A400": "#00b0ff", "A700": "#0091ea"
                },

                CYAN: {
                    "50" : "#e0f7fa", "100": "#b2ebf2", 
                    "200": "#80deea", "300": "#4dd0e1", 
                    "400": "#26c6da", "500": "#00bcd4", 
                    "600": "#00acc1", "700": "#0097a7", 
                    "800": "#00838f", "900": "#006064", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "DARK",  "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#84ffff", "A200": "#18ffff", 
                    "A400": "#00e5ff", "A700": "#00b8d4"
                },

                TEAL: {
                    "50" : "#e0f2f1", "100": "#b2dfdb", 
                    "200": "#80cbc4", "300": "#4db6ac", 
                    "400": "#26a69a", "500": "#009688", 
                    "600": "#00897b", "700": "#00796b", 
                    "800": "#00695c", "900": "#004d40", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#a7ffeb", "A200": "#64ffda", 
                    "A400": "#1de9b6", "A700": "#00bfa5"
                },

                GREEN: {
                    "50" : "#e8f5e9", "100": "#c8e6c9", 
                    "200": "#a5d6a7", "300": "#81c784", 
                    "400": "#66bb6a", "500": "#4caf50", 
                    "600": "#43a047", "700": "#388e3c", 
                    "800": "#2e7d32", "900": "#1b5e20", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#b9f6ca", "A200": "#69f0ae", 
                    "A400": "#00e676", "A700": "#00c853"
                },

                LIGHT_GREEN: {
                    "50" : "#f1f8e9", "100": "#dcedc8", 
                    "200": "#c5e1a5", "300": "#aed581", 
                    "400": "#9ccc65", "500": "#8bc34a", 
                    "600": "#7cb342", "700": "#689f38", 
                    "800": "#558b2f", "900": "#33691e", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "DARK",  "700": "DARK",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#ccff90", "A200": "#b2ff59", 
                    "A400": "#76ff03", "A700": "#64dd17"
                },

                LIME: {
                    "50" : "#f9fbe7", "100": "#f0f4c3", 
                    "200": "#e6ee9c", "300": "#dce775", 
                    "400": "#d4e157", "500": "#cddc39", 
                    "600": "#c0ca33", "700": "#afb42b", 
                    "800": "#9e9d24", "900": "#827717", 
                    
                    FONTS: {
                        "50" : "DARK", "100": "DARK",
                        "200": "DARK", "300": "DARK",
                        "400": "DARK", "500": "DARK",
                        "600": "DARK", "700": "DARK",
                        "800": "DARK", "900": "LIGHT"
                    },
                    
                    "A100": "#f4ff81", "A200": "#eeff41", 
                    "A400": "#c6ff00", "A700": "#aeea00"
                },

                YELLOW: {
                    "50" : "#fffde7", "100": "#fff9c4", 
                    "200": "#fff59d", "300": "#fff176", 
                    "400": "#ffee58", "500": "#ffeb3b", 
                    "600": "#fdd835", "700": "#fbc02d", 
                    "800": "#f9a825", "900": "#f57f17", 
                    
                    FONTS: {
                        "50" : "DARK", "100": "DARK",
                        "200": "DARK", "300": "DARK",
                        "400": "DARK", "500": "DARK",
                        "600": "DARK", "700": "DARK",
                        "800": "DARK", "900": "DARK"
                    },
                    
                    "A100": "#ffff8d", "A200": "#ffff00", 
                    "A400": "#ffea00", "A700": "#ffd600"
                },

                AMBER: {
                    "50" : "#fff8e1", "100": "#ffecb3", 
                    "200": "#ffe082", "300": "#ffd54f", 
                    "400": "#ffca28", "500": "#ffc107", 
                    "600": "#ffb300", "700": "#ffa000", 
                    "800": "#ff8f00", "900": "#ff6f00", 
                    
                    FONTS: {
                        "50" : "DARK", "100": "DARK",
                        "200": "DARK", "300": "DARK",
                        "400": "DARK", "500": "DARK",
                        "600": "DARK", "700": "DARK",
                        "800": "DARK", "900": "DARK"
                    },
                    
                    "A100": "#ffe57f", "A200": "#ffd740",
                    "A400": "#ffc400", "A700": "#ffab00"
                },

                ORANGE: {
                    "50" : "#fff3e0", "100": "#ffe0b2", 
                    "200": "#ffcc80", "300": "#ffb74d", 
                    "400": "#ffa726", "500": "#ff9800", 
                    "600": "#fb8c00", "700": "#f57c00", 
                    "800": "#ef6c00", "900": "#e65100", 
                    
                    FONTS: {
                        "50" : "DARK", "100": "DARK",
                        "200": "DARK", "300": "DARK",
                        "400": "DARK", "500": "DARK",
                        "600": "DARK", "700": "DARK",
                        "800": "DARK", "900": "LIGHT"
                    },
                    
                    "A100": "#ffd180", "A200": "#ffab40",
                    "A400": "#ffab40", "A700": "#ff6d00"
                },

                DEEP_ORANGE: {
                    "50" : "#fbe9e7", "100": "#ffccbc", 
                    "200": "#ffab91", "300": "#ff8a65", 
                    "400": "#ff7043", "500": "#ff5722", 
                    "600": "#f4511e", "700": "#e64a19", 
                    "800": "#d84315", "900": "#bf360c", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    },
                    
                    "A100": "#ff9e80", "A200": "#ff6e40", 
                    "A400": "#ff3d00", "A700": "#dd2c00"
                },

                BROWN: {
                    "50" : "#efebe9", "100": "#d7ccc8", 
                    "200": "#bcaaa4", "300": "#a1887f", 
                    "400": "#8d6e63", "500": "#795548", 
                    "600": "#6d4c41", "700": "#5d4037", 
                    "800": "#4e342e", "900": "#3e2723", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "LIGHT",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                GREY: {
                    "50" : "#fafafa", "100": "#f5f5f5", 
                    "200": "#eeeeee", "300": "#e0e0e0", 
                    "400": "#bdbdbd", "500": "#9e9e9e", 
                    "600": "#757575", "700": "#616161", 
                    "800": "#424242", "900": "#212121", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                BLUE_GREY: {
                    "50" : "#eceff1", "100": "#cfd8dc", 
                    "200": "#b0bec5", "300": "#90a4ae", 
                    "400": "#78909c", "500": "#607d8b", 
                    "600": "#546e7a", "700": "#455a64", 
                    "800": "#37474f", "900": "#263238", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                CRANE_PURPLE: {
                    "50" : "#f2e0ea", "100": "#e0b2cc", 
                    "200": "#ce82ab", "300": "#be538b", 
                    "400": "#b33174", "500": "#ab035d", 
                    "600": "#9c0858", "700": "#870b51", 
                    "800": "#720c49", "900": "#4e0d3a", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                CRANE_RED: {
                    "50" : "#ffeaee", "100": "#ffcbd1", 
                    "200": "#f99697", "300": "#f36b6f", 
                    "400": "#fe4449", "500": "#ff2a2a", 
                    "600": "#f51b2b", "700": "#e30425", 
                    "800": "#d6001e", "900": "#c8000e", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "LIGHT", "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                SHRINE_PINK: {
                    "50" : "#f9efee", "100": "#fedbd0", 
                    "200": "#ffc2ae", "300": "#ffa988", 
                    "400": "#ff9369", "500": "#ff814f", 
                    "600": "#ff7a4a", "700": "#ff7244", 
                    "800": "#f46b40", "900": "#db5e37", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "DARK",
                        "600": "DARK",  "700": "DARK",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                },

                RALLY_GREEN: {
                    "50" : "#e3f5ec", "100": "#bae6d1", 
                    "200": "#8dd5b3", "300": "#58c596", 
                    "400": "#1eb980", "500": "#00ac6a", 
                    "600": "#009d5f", "700": "#008b52", 
                    "800": "#007a46", "900": "#005b30", 
                    
                    FONTS: {
                        "50" : "DARK",  "100": "DARK",
                        "200": "DARK",  "300": "DARK",
                        "400": "DARK",  "500": "LIGHT",
                        "600": "LIGHT", "700": "LIGHT",
                        "800": "LIGHT", "900": "LIGHT"
                    }
                }
            }, 

            FONTS: {
                LIGHT: {
                    PRIMARY: "rgba(255, 255, 255, 1)",
                    SECONDARY: "rgba(255, 255, 255, 0.7)",
                    DISABLED: "rgba(255, 255, 255, 0.5)"
                },

                DARK: {
                    PRIMARY: "rgba(0, 0, 0, 0.87)",
                    SECONDARY: "rgba(0, 0, 0, 0.54)",
                    DISABLED: "rgba(0, 0, 0, 0.38)"
                }
            },

            BORDERS: {
                LIGHT: "rgba(255, 255, 255, 0.12)",
                DARK: "rgba(0, 0, 0, 0.12)"
            },

            RIPPLES: {
                LIGHT: "rgba(255, 255, 255, 0.5)",
                DARK: "rgba(0, 0, 0, 0.38)"
            }
        };
    }
    
    var Material = GET_INSTANCE_SOFTTION_MATERIAL();
    
    // Rutas virtuales de los componentes SofttionMaterial
    ngMaterial.run(["$templateCache", "$appContent",
        ($templateCache, $appContent) => {
            if (!("ontouchstart" in window)) {
                angular.element("body").addClass("not-touch");
            } // No soporta eventos Touch

            angular.forEach(Material.components, (component) => {
                if (softtion.isDefined(component.route)) {
                    $templateCache.put(component.route, component.html());
                }
            });

            $appContent.attr("tabindex", "-1"); // Haciendo enfocable
            setTimeout(() => { $appContent.focus(); }, 325);
        }
    ]);
    
    // Directivas de SofttionMaterial
    angular.forEach(Material.components, (component) => {
        ngMaterial.directive(component.name, component.directive);
    });
    
    // Provedores de SofttionMaterial
    angular.forEach(Material.providers, (provider) => {
        ngMaterial.provider(provider.name, provider.method);
    });
    
    // Propiedades de SofttionMaterial
    angular.forEach(Material.properties, (property) => {
        ngMaterial.directive(property.name, property.directive);
    });
});