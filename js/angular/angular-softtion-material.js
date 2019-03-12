
/*
 Angular Softtion Material v2.0.4
 (c) 2016 - 2019 Softtion Developers
 http://material.softtion.com.co
 License: MIT
 Created: 19/Nov/2016
 Updated: 12/Mar/2019
*/

((factory) => {
    
    if (typeof window.softtion === "object" && typeof window.angular === "object") {
        factory(window.softtion, window.angular);
    } else {
        throw new Error("Softtion Material requiere Softtion y Angular cargado en la Aplicación");
    } // No se ha cargado Softtion y Angular
    
})((softtion, angular) => {
    
    var ngMaterial = angular.
            module("ngSofttionMaterial", ["ngSanitize", "ngSofttionEvents"]).
            filter("filterDictionary", filterDictionary).
            service("$materialFunction", softtionMaterialFunction).
            service("$materialService", softtionMaterialService).
            constant("$materialConstant", softtionMaterialConstant());
    
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

                CheckboxReadonly: Directives.create(Directives.CheckboxReadonly),

                ChipInput: Directives.create(Directives.ChipInput),

                ClockPicker: Directives.create(Directives.ClockPicker),

                ClockPickerDialog: Directives.create(Directives.ClockPickerDialog),

                ClockPickerInput: Directives.create(Directives.ClockPickerInput),
                
                DataTable: Directives.create(Directives.DataTable),

                DatePicker: Directives.create(Directives.DatePicker),

                DatePickerDialog: Directives.create(Directives.DatePickerDialog),

                DatePickerInput: Directives.create(Directives.DatePickerInput),

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

                Gallery: Directives.create(Directives.Gallery),

                Grid: Directives.create(Directives.Grid),

                GridSheet: Directives.create(Directives.GridSheet),

                Img: Directives.create(Directives.Img),

                ImageEditor: Directives.create(Directives.ImageEditor),

                LabelField: Directives.create(Directives.LabelField),
                
                Notification: Directives.create(Directives.Notification),
                
                NotificationFloating: Directives.create(Directives.NotificationFloating),
                
                Pagination: Directives.create(Directives.Pagination),

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

                TextField: Directives.create(Directives.TextField),

                TextFieldMultiline: Directives.create(Directives.TextFieldMultiline),

                TextFieldReadOnly: Directives.create(Directives.TextFieldReadonly),

                Tooltip: Directives.create(Directives.Tooltip),

                VideoYouTube: Directives.create(Directives.VideoYouTube),
                
                View: Directives.create(Directives.View),
                
                ViewsTabs: Directives.create(Directives.ViewsTabs),
                
                YearPicker: Directives.create(Directives.YearPicker),
                
                YearPickerDialog: Directives.create(Directives.YearPickerDialog),
                
                YearPickerInput: Directives.create(Directives.YearPickerInput)
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

                NgBackground: Properties.create(Properties.NgBackground),

                NgColor: Properties.create(Properties.NgColor),

                NgFa: Properties.create(Properties.NgFa),
                
                NgFont: Properties.create(Properties.NgFont),

                NgMaterial: Properties.create(Properties.NgMaterial),

                NgTheme: Properties.create(Properties.NgTheme),

                RatioElement: Properties.create(Properties.RatioElement),

                Sidenav: Properties.create(Properties.Sidenav),

                Visibility: Properties.create(Properties.Visibility)
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
            case (Directives.CheckboxReadonly.NAME): return Directives.CheckboxReadonly;
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
            case (Directives.Gallery.NAME): return Directives.Gallery;
            case (Directives.Grid.NAME): return Directives.Grid;
            case (Directives.GridSheet.NAME): return Directives.GridSheet;
            case (Directives.Img.NAME): return Directives.Img;
            case (Directives.ImageEditor.NAME): return Directives.ImageEditor;
            case (Directives.LabelField.NAME): return Directives.LabelField;
            case (Directives.Notification.NAME): return Directives.Notification;
            case (Directives.NotificationFloating.NAME): return Directives.NotificationFloating;
            case (Directives.Pagination.NAME): return Directives.Pagination;
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
            case (Directives.TextField.NAME): return Directives.TextField;
            case (Directives.TextFieldMultiline.NAME): return Directives.TextFieldMultiline;
            case (Directives.TextFieldReadonly.NAME): return Directives.TextFieldReadonly;
            case (Directives.Tooltip.NAME): return Directives.Tooltip;
            case (Directives.VideoYouTube.NAME): return Directives.VideoYouTube;
            case (Directives.View.NAME): return Directives.View;
            case (Directives.ViewsTabs.NAME): return Directives.ViewsTabs;
            case (Directives.YearPicker.NAME): return Directives.YearPicker;
            case (Directives.YearPickerDialog.NAME): return Directives.YearPickerDialog;
            case (Directives.YearPickerInput.NAME): return Directives.YearPickerInput;
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
    
    Directives.Alert.$inject = ["$timeout"];
    
    function AlertDirective($timeout) {
        return {
            restrict: "C",
            scope: {
                ngDuration: "=?",
                ngOpen: "=?",
                ngClose: "=?",
                ngVisible: "=?"
            },
            link: function ($scope, $element) {
                    // Componentes
                var button = softtion.htmlElement("i");
                
                    // Atributos
                var promise = undefined;
                
                $scope.$watch(() => { return $scope.ngDuration; },
                    (newValue) => {
                        if (isNaN(newValue)) $scope.ngDuration = 4000;
                    });
                
                $scope.$watch(() => { return $scope.ngOpen; },
                    (newValue) => { if (newValue) openAlert(); });
                
                $scope.$watch(() => { return $scope.ngClose; },
                    (newValue) => { if (newValue) closeAlert(); });
                    
                button.html("close"); $element.append(button);
                
                button.click(() => { $scope.$apply(() => { closeAlert(); }); });
                    
                function openAlert() {
                    $element.addClass(Classes.SHOW); $scope.ngVisible = true;
                    $scope.ngOpen = false; cancelPromise();
                    
                    promise = $timeout(() => { hideAlert(); }, $scope.ngDuration);
                }
                
                function closeAlert() {
                    $scope.ngClose = false; cancelPromise(); hideAlert();
                }
                    
                function hideAlert() {
                    $scope.ngVisible = false; $element.removeClass(Classes.SHOW); promise = undefined;
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
                ngFixed: "=?",
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
                    if ($scope.ngFixed) return; // No debe ocultarse
                    
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
                    softtion.html("label").addClass("name").setText("{{ngName}}")
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
                ngAudio: "=?",
                ngSrc: "@",
                ngName: "@",
                ngPlayAutomatic: "=?"
            },
            link: function ($scope, $element, $attrs) {
                $scope.ngAudio = createInstanceAudio();

                $scope.isLoadAudio = false;
                $scope.errorAudio = true;

                $scope.isPlay = false;
                $scope.duration = 0;
                $scope.currentTime = 0;

                $scope.$watch(() => { return $scope.ngAudio; },
                    (newValue, oldValue) => {
                        if (!(newValue instanceof Audio)) {
                            $scope.ngAudio = oldValue;
                        } // No se admite el cambio de objeto
                    });

                $attrs.$observe("ngSrc", () => {
                    if (softtion.isText($scope.ngSrc)) {
                        $scope.errorAudio = false;
                        $scope.isLoadAudio = false;

                        restorePlay(); $scope.duration = 0;

                        if ($scope.ngPlayAutomatic) {
                            $scope.ngAudio.src = $scope.ngSrc;
                            
                            if (!softtion.deviceIs().pc())
                                $scope.ngAudio.play(); // Dispositivo no es un PC
                        } // Reproducción automatica
                    } else {
                        $scope.ngAudio.src = ""; restorePlay(); $scope.duration = 0;
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
                        $scope.ngAudio.pause();
                    } // La canción se esta reproducciendo

                    $scope.ngAudio.currentTime = 0; $scope.currentTime = 0;
                    $scope.isPlay = false; // Detener reproducción
                }

                $scope.play = function () {
                    if (!$scope.isLoadAudio) {
                        $scope.ngAudio.src = $scope.ngSrc; $scope.isLoading = true;

                        if (!softtion.deviceIs().pc()) 
                            $scope.ngAudio.play(); // Dispositivo no es un PC
                    } else {
                        $scope.isPlay = !$scope.isPlay; // Cambiando estado
                        ($scope.isPlay) ? $scope.ngAudio.play() : $scope.ngAudio.pause();
                    } // No se ha cargado audio
                };

                $scope.stop = function () {
                    restorePlay(); // Reiniciando audio
                };

                $scope.muted = function () {
                    $scope.ngAudio.muted = !$scope.ngAudio.muted;
                };

                $scope.getIconPlay = function () {
                    return (!$scope.isPlay) ? "play_circle_outline" : "pause_circle_outline";
                };

                $scope.getIconMute = function () {
                    return (!$scope.ngAudio.muted) ? "volume_up" : "volume_off";
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", 
                    "{active: inputActive, disabled: ngDisabled, focused:" +
                    " inputFocused, \"icon-action\": isIconAction, \"label-inactive\":" +
                    " !isLabel, \"disabled-clear\": isInactiveClear()}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("autocomplete", "off").
                addAttribute("ng-model", "input").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-keydown", "keydownInput($event)").
                addAttribute("ng-keyup", "keyupInput($event)").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("focused-element", "focusedInput").
                addAttribute("placeholder", "{{placeholder}}");

        var lineBordered = softtion.html("div").addClass("line-bordered");
        var lineShadow = softtion.html("div").addClass("line-shadow");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-if", "isLabel").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addClass("truncate").addAttribute("ng-click", "clickLabel()").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}").
                addAttribute("ng-click", "clickLabel()");

        var uniqueSelection = softtion.html("pre").addClass(["unique-selection"]).
                addAttribute("ng-if", "ngUniqueSelection").
                addAttribute("ng-bind-html", "getValueUniqueSelection()");

        var buttonAction = softtion.html("i").addClass([Classes.ACTION]).
                setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                addAttribute("ng-click", "clickAction($event)");

        var buttonClear = softtion.html("i").addClass([Classes.ACTION]).
                setText("close").addAttribute("ng-hide", "isInactiveClear()").
                addAttribute("ng-click", "clearAutocomplet()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");
    
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
        
        var detailOption = softtion.html("div").addClass("detail").
                addChildren(
                    softtion.html("div").addClass("avatars").
                        addAttribute("ng-if", "ngOption.icon").
                        addChildren(
                            softtion.html("div").addClass("avatar").
                                addChildren(
                                    softtion.html("span").addChildren(
                                        softtion.html("i").setText("{{ngOption.icon}}")
                                    )
                                )
                        )
                ).addChildren(
                    softtion.html("div").addClass("content").
                        addChildren(
                            softtion.html("div").addClass("title").setText("{{ngOption.title}}")
                        ).addChildren(
                            softtion.html("div").addClass("subtitle").
                                addAttribute("ng-if", "ngOption.subtitle").
                                setText("{{ngOption.subtitle}}")
                        )
                );

        var list = softtion.html("ul").addAttribute("ng-if", "!ngUniqueSelection").
                addAttribute(
                    "ng-class", "{show: showList, hide: !showList, higher: higher, \"autoselection\": ngAutoselection}"
                ).addChildren(
                    softtion.html("li").addAttribute("tabindex", "-1").
                        addAttribute("ng-repeat", "suggestion in coincidences track by $index").
                        addAttribute("ng-keydown", "keydownSuggestion($event, suggestion)").
                        addAttribute("ng-mousedown", "mousedownSuggestion($event, suggestion)").
                        addChildren(detail)
                ).addChildren(
                    softtion.html("li").addClass(["truncate", "not-found"]).
                        addAttribute("ng-if", "notFoundResult()").
                        setText("{{descriptionNotFoundResult()}}")
                ).addChildren(
                    softtion.html("li").addClass("option").
                        addAttribute("ng-if", "isOptionable").
                        addAttribute("ng-mousedown", "mousedownOption($event)").
                        addChildren(detailOption)
                );

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(input).
            addChildren(lineShadow).addChildren(uniqueSelection).
            addChildren(label).addChildren(buttonAction).
            addChildren(buttonClear).addChildren(spanHelper).addChildren(list);
    
        return content.create(); // Componente
    };
    
    Directives.AutoComplete.$inject = ["$window"];
    
    function AutoCompleteDirective($window) {
        return {
            restrict: "C",
            templateUrl: Directives.AutoComplete.ROUTE,
            scope: {
                ngModel: "=",
                suggestions: "=",
                ngAutostart: "=?",
                ngItemsVisible: "=?",
                label: "@",
                required: "=?",
                optional: "=?",
                key: "@keyDescription",
                iconDescription: "@",
                iconImg: "@",
                iconAction: "@",
                placeholder: "@",
                record: "=?",
                keySubtitle: "@",
                keyImg: "@",
                ngDisabled: "=?",
                ngDisabledClear: "=?",
                disabledFocusclear: "=?",
                helperText: "@",
                helperPermanent: "=?",
                clearModel: "=?",
                searchMode: "=?",
                inputMode: "=?",
                focusedInput: "=?",
                patternMethod: "@",
                patternForce: "=?",
                ngAutoselection: "=?",
                ngUniqueSelection: "=?",
                ngDefineCoincidences: "&",
                ngFormatDescription: "&",
                ngOption: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var box = $element.find(".box");
                
                    // Atributos
                var searchStart = false, selection = false, focusLi = false, clear = false,
                    listener = new Listener($scope, Listener.KEYS.AUTOCOMPLETE);

                $scope.coincidences = []; $scope.old = undefined; $scope.inputActive = false; 
                
                $scope.patternForce = $scope.patternForce || true;
                $scope.patternMethod = $scope.patternMethod || "start";
                
                $scope.$watch(() => { return $scope.suggestions; }, 
                    (newValue) => {
                        $scope.temporal = rebootSuggestions();
                        
                        if (!softtion.isArray(newValue)) {
                            $scope.suggestions = []; return;
                        } // Los items de seleccion no es un Array
                        
                        if ($scope.suggestions.isEmpty()) return;
                        
                        if ($scope.ngAutostart && softtion.isUndefined($scope.ngModel))
                            $scope.ngModel = $scope.suggestions[0];
                    });

                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue, oldValue) => {
                        if (newValue !== oldValue) {
                            if (!$scope.inputActive) $scope.input = "";
                            
                            if (clear) {
                                listener.launch(Listeners.CLEAR);

                                if (!$scope.disabledFocusclear) 
                                    $scope.focusedInput = true;
                                
                                clear = false; return; // Retornando
                            } // Se limpio contenido del elemento

                            if (!$scope.searchMode)
                                listener.launch(Listeners.CHANGED);
                        } // Ocurrio un cambio en el componente 
                    });

                $scope.$watch(() => { return $scope.input; }, 
                    (newValue, oldValue) => {
                        if (newValue !== oldValue && $scope.inputActive)
                            listener.launch(Listeners.CHANGED_TEXT);
                    });

                $scope.$watch(() => { return $scope.clearModel; }, 
                    (newValue) => {
                        if (newValue === true) {
                            $scope.ngModel = undefined; $scope.clearModel = false;
                        } // Se debe limpiar el componente
                    });
                    
                $scope.$watch(() => { return $scope.ngOption; },
                    (newValue) => {
                        $scope.isOptionable = softtion.isDefined(newValue);
                    });
                    
                $scope.$watch(() => { return $scope.ngItemsVisible; }, 
                    (newValue, oldValue) => {
                        if (isNaN(newValue)) {
                            $scope.ngItemsVisible = softtion.isDefined(oldValue) ? oldValue : 6; return;
                        } // No fue definido correctamente el número
                        
                        $element.find("ul").css("max-height", $scope.ngItemsVisible * 42 + "px");
                    });
                    
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return ($scope.inputActive || softtion.isDefined($scope.ngModel)) || softtion.isText($scope.input);
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.helperPermanent;
                };
                
                $scope.isAvatarImg = function (suggestion) {
                    return (softtion.isString(suggestion)) ? false : softtion.isText($scope.keyImg);
                };

                $scope.isInactiveClear = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.ngDisabled || $scope.ngDisabledClear;
                };

                $scope.getTextAvatar = function (suggestion) {
                    return getValueSuggestion(suggestion)[0];
                };
                
                $scope.getTextSubtitle = function (suggestion) {
                    return softtion.isString(suggestion) ? "" :
                        !softtion.isText($scope.keySubtitle) ? "" : suggestion[$scope.keySubtitle];
                };

                $scope.clickLabel = function () { $scope.focusedInput = true; };

                $scope.focusInput = function ($event) {
                    if (softtion.isDefined($scope.ngModel)) 
                        $scope.input = getSuggestion($scope.ngModel);

                    $scope.inputActive = true; $scope.inputFocused = true;
                    
                    if ($scope.isOptionable) $scope.showList = true;

                    listener.launch(Listeners.FOCUS, { $event: $event });
                    openListSuggestions($scope.input); // Buscar sugerencias
                };

                $scope.blurInput = function ($event) { 
                    var isText = softtion.isText($scope.input), // Tiene texto
                        isAssign = $scope.inputMode && isText && !$scope.ngAutoselection;
                        
                    $scope.inputFocused = false; // Input desenfocado
                        
                    if (focusLi) {
                        if (isAssign) $scope.ngModel = $scope.input; // Asignando
                        
                        focusLi = false; return; // Enfocando item de Lista
                    } // Se enfocó item de la lista para seleccionar
                    
                    isAssign = $scope.inputMode && isText && !selection;
                    
                    if ($scope.ngAutoselection) {
                        if (isAssign && $scope.coincidences.isEmpty()) 
                            $scope.ngModel = $scope.input; // Asignando
                    } else {
                        if (isAssign) $scope.ngModel = $scope.input; // Asignando
                    }
                    
                    selection = false; $scope.inputActive = false; 
                    $scope.showList = false; // Ocultando la lista

                    listener.launch(Listeners.BLUR, { $event: $event });
                };

                $scope.keydownInput = function ($event) {
                    switch ($event.originalEvent.which) {
                        case (KeysBoard.ESC): $scope.showList = false; break;

                        case (KeysBoard.ARROW_UP): 
                            if (!$scope.higher) return; // No puede hacia arriba
                            
                            var options = $element.find("ul").find("li");

                            if (options.exists()) { 
                                focusLi = true; options.last().focus(); 
                            } // Seleccionando último elemento
                        break;

                        case (KeysBoard.ARROW_DOWN): 
                            if ($scope.higher) return; // No puede hacia abajo
                            
                            var options = $element.find("ul").find("li");

                            if (options.exists()) { 
                                focusLi = true; options.first().focus(); 
                            } // Seleccionando primer elemento
                        break;
                        
                        case (KeysBoard.ENTER):
                            var isAutoselection = $scope.ngAutoselection && 
                                    !$scope.coincidences.isEmpty();
                            
                            if (isAutoselection) {
                                $scope.ngModel = $scope.coincidences[0]; 
                                $scope.input = getDescriptionSuggestion($scope.ngModel);
                            } // Se debe establecer el nuevo elemento seleccionado
                            
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

                        case (KeysBoard.ESC): $scope.showList = false; break;

                        case (KeysBoard.ARROW_UP):
                            (option.prev().length) ?
                                option.prev().focus() : (!$scope.higher) ?
                                    $scope.focusedInput = true : null;
                        break;

                        case (KeysBoard.ARROW_DOWN):
                            (option.next().length) ?
                                option.next().focus() : ($scope.higher) ?
                                $scope.focusedInput = true : null;
                        break;
                    }
                };
                
                $scope.mousedownSuggestion = function ($event, suggestion) {
                    if ($event.originalEvent.which !== 1) return;
                    
                    $scope.selectSuggestion(suggestion); // Seleccionando
                };
                
                $scope.mousedownOption = function ($event) { 
                    $scope.showList = false; // Ocultando la lista
                    listener.launch(Listeners.OPTION, { $event: $event });
                };

                $scope.selectSuggestion = function (suggestion) {
                    $scope.showList = false; selection = true;
                    $scope.inputActive = false; // Inactivando

                    var pattern = getSuggestion(suggestion);
                    
                    setSuggestions(pattern, $scope.coincidences);
                    
                    $scope.ngModel = (!$scope.searchMode) ? suggestion : undefined;
                    
                    if ($scope.searchMode) {
                        $scope.ngModel = undefined; $scope.input = "";
                        $scope.select = suggestion; $scope.focusedInput = true; 
                        listener.launch(Listeners.SELECT); // Evento selection
                    } else {
                        $scope.ngModel = suggestion; // Asignando
                    }
                };

                $scope.clearAutocomplet = function () {
                    if ($scope.ngDisabled) return; // Componente inactivo
                    
                    $scope.temporal = rebootSuggestions(); clear = true;
                    selection = false; $scope.ngModel = undefined; 
                };

                $scope.renderSuggestion = function (suggestion) {
                    var value = $scope.ngFormatDescription({ $suggestion: suggestion });
                    
                    if (softtion.isUndefined(value)) // No se definió descripción
                        value = getSuggestion(suggestion);
                    
                    // Valor digitado para filtrar
                    var filter = $scope.input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    
                    // Expresión RegExp
                    var expReg = new RegExp("(" + filter + ")", "i");

                    return value.replace(expReg, "<b>$1</b>"); // Valor final
                };

                $scope.notFoundResult = function () {
                    return (!this.coincidences.isEmpty()) ? false :
                        (searchStart && softtion.isText($scope.input) && !$scope.inputMode && !$scope.isOptionable); 
                };

                $scope.descriptionNotFoundResult = function () {
                    return $scope.input + ", no existen resultados.";
                };

                $scope.getValueModel = function () {
                    if ($scope.isHolderActive()) return $scope.placeholder; // Placeholder
                    
                    return (softtion.isDefined($scope.ngModel)) ?
                        getDescriptionSuggestion($scope.ngModel) :
                        (softtion.isText($scope.input)) ? $scope.input : undefined;
                };
                
                $scope.getValueUniqueSelection = function () {
                    if (!softtion.isString($scope.input)) return ""; // No ha digitado
                    
                    if ($scope.coincidences.isEmpty()) return ""; // Sin resultados
                    
                    var suggestion = $scope.coincidences[0]; // Primera opción
                    
                    var value = $scope.ngFormatDescription({ $suggestion: suggestion });
                    
                    if (softtion.isUndefined(value)) // No se definió descripción
                        value = getSuggestion(suggestion);
                    
                    // Valor digitado para filtrar
                    var filter = $scope.input.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    
                    // Expresión RegExp
                    var expReg = new RegExp("(" + filter + ")", "i");
                    
                    return value.replace(expReg, "<b>" + filter + "</b>"); // Valor final
                };

                function getValueSuggestion(suggestion) {
                    return !(softtion.isText($scope.key)) ? 
                        JSON.stringify(suggestion) : 
                        softtion.findKey(suggestion, $scope.key);
                }

                function getDescriptionSuggestion(suggestion) {
                    var value = $scope.ngFormatDescription({ $suggestion: suggestion });
                    
                    return (softtion.isDefined(value)) ? value : getSuggestion(suggestion);
                }

                function getSuggestion(suggestion) {
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
                    
                    $scope.coincidences = getCoincidencesVisible(coincidences);
                
                    setSuggestions(pattern, coincidences, result); $scope.showList = true;
                }
                
                function getCoincidencesVisible(coincidences) {
                    var position = $element.offset(),
                        items = getItemsVisible(),
                        boxHeight = box.height(),
                        height = $window.innerHeight;
                
                    var bottomList = position.top + boxHeight + 8,
                        topList = position.top - 8;
                
                    if ((bottomList + items * 42) < height - 8) {
                        $scope.higher = false;
                    } else if ((topList - items * 42) > 8) {
                        $scope.higher = true;
                    } else {
                        $scope.higher = false;
                    }
                    
                    return softtion.isUndefined(coincidences) ? 
                        $scope.coincidences : coincidences.extract(0, items);
                }
                
                function getItemsVisible() {
                    return (!$scope.isOptionable) ? $scope.ngItemsVisible : ($scope.ngItemsVisible - 1);
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
                
                function getSuggestionsByMethod(pattern) {
                    var temporal = $scope.temporal, 
                        stop = softtion.isUndefined(temporal);
                        
                    while (!stop) {
                        var $pattern = temporal.pattern; // Patrón anterior
                        
                        if (pattern.like($scope.patternMethod, $pattern, $scope.patternForce)) {
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
                    var coincidences = []; // Listado de coincidencias
                    
                    angular.forEach(suggestions, (suggestion) => {
                        if (softtion.isText(suggestion)) {
                            if (suggestion.like($scope.patternMethod, pattern, $scope.patternForce)) 
                                coincidences.push(suggestion); 
                        } else {
                            var value = getValueSuggestion(suggestion);
                            
                            if (value.like($scope.patternMethod, pattern, $scope.patternForce)) 
                                coincidences.push(suggestion); 
                        } // El item es un objeto de tipo JSON, verificando
                    });
                    
                    return coincidences; // Coincidencias encontradas
                }
                
                function setSuggestions(pattern, suggestions, result) {
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
                                softtion.html("i").setText("{{option.icon}}").
                                    addChildren(
                                        softtion.html("span").addClass("badge").
                                            addAttribute("ng-if", "isBadgeActive(option)").
                                            setText("{{option.badge}}")
                                    )
                            ).addChildren(
                                softtion.html("p").setText("{{option.label}}")
                            )
                    )
            );
    
        var ripple = softtion.html("div").addClass("ripple-box").
                addChildren(softtion.html("span").addClass("effect"));

        return content + ripple; // Componente
    };
    
    Directives.BottomNavigation.$inject = ["$body", "$appContent", "$materialTheme"];
    
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
                
                $scope.isBadgeActive = function (option) {
                    return softtion.isDefined(option.badge); // Badge activo
                };
                    
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
    
    Directives.BottomSheet.$inject = ["$bottomSheet"];
    
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
                disabledRipple: "=?",
                tooltip: "@",
                ngDisabled: "=?"
            },
            link: function ($scope, $element) {
                $scope.$watch(() => { return $scope.disabledRipple; },
                    (newValue) => {
                        (newValue) ? $element.addClass("disabled-ripple") :
                            $element.removeClass("disabled-ripple");
                    });
                    
                $scope.$watch(() => { return $scope.ngDisabled; },
                    (newValue) => {
                        if (newValue) {
                            var tooltip = $element.data("tooltip-element");
                            
                            if (!softtion.isText(tooltip)) return;
                            
                            angular.element("#" + tooltip).removeClass(Classes.SHOW);
                        } // Se inactivo el botón
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
    
    Directives.ButtonProgress.$inject = ["$compile"];
    
    function ButtonProgressDirective($compile) {
        return {
            restrict: "E",
            scope: {
                ngProgress: "=?",
                ngDisabled: "=?",
                ngHide: "=?",
                icon: "@",
                tabindex: "@",
                ngClick: "&",
                tooltip: "@"
            },
            link: function ($scope, $element) {
                    // Componentes
                var button = softtion.html("button").addClass(Classes.ACTION).
                        addAttribute("ng-class", "{progress: ngProgress}").
                        addAttribute("tabindex", "{{tabindex}}").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-hide", "ngHide").
                        addAttribute("ng-click", "buttonClick($event)").
                        addAttribute("tooltip", "{{tooltip}}").
                        addChildren(softtion.html("i").setText("{{icon}}")).
                        addChildren(
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
    
    Directives.Carousel.$inject = ["$interval", "$timeout"];
    
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
    
    Directives.Catalog.$inject = ["$window", "$windowResize"];
    
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
    
    // Directiva: CheckboxReadonly
    // Version: 1.0.0
    // Update: 26/Feb/2018
    
    Directives.CheckboxReadonly = CheckboxReadonlyDirective;
    
    Directives.CheckboxReadonly.NAME = "CheckboxReadonly";
    Directives.CheckboxReadonly.VERSION = "1.0.0";
    Directives.CheckboxReadonly.KEY = "checkboxReadonly";
    Directives.CheckboxReadonly.ROUTE = "softtion/template/checkbox-readonly.html",
                    
    Directives.CheckboxReadonly.HTML = function () {
        var label = softtion.html("label").
                addAttribute("ng-class", "{active: ngActive, disabled: ngDisabled}").
                addAttribute("ng-click", "clickLabel($event)");

        return label.create(); // Componente
    };
    
    function CheckboxReadonlyDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.CheckboxReadonly.ROUTE,
            scope: {
                ngDisabled: "=?",
                ngActive: "=?",
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute(
                    "ng-class", "{active: inputActive, disabled: ngDisabled," +
                    " empty: ngModel.isEmpty(), \"label-inactive\": !isLabel}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var chips = softtion.html("div").addClass("chips").
                addAttribute("ng-click", "clickActiveElement($event)").
                addChildren(
                    softtion.html("div").addClass("chip").setText("{{item}}").
                        addAttribute("ng-repeat", "item in ngModel").
                        addAttribute("ng-class", "{disabled: ngDisabled}").
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
                addAttribute("ng-class", "{\"holder-hide\": isHolderHide()}").
                addAttribute("placeholder", "{{placeholder}}").
                addAttribute("focused-element", "focusedInput").
                addAttribute("ng-style", "{width: resizeWidthInput()}");

        var lineBordered = softtion.html("div").addClass("line-bordered");
        var lineShadow = softtion.html("div").addClass("line-shadow");

        var label = softtion.html("label").
                addAttribute("ng-if", "isLabel").
                addAttribute("ng-click", "clickActiveElement($event)").
                addAttribute("ng-class", "{active: isLabelActive()}").
                setText("{{label}}").addClass("truncate");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        box.addChildren(description).addChildren(chips).
            addChildren(input).addChildren(lineBordered).addChildren(lineShadow).
            addChildren(label).addChildren(spanHelper);

        return content.create(); // Componente
    };
    
    function ChipInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.ChipInput.ROUTE,
            scope: {
                ngModel: "=ngModel", 
                label: "@",
                maxCount: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@", 
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var input = $element.find("input"),
                    chips = $element.find(".chips");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CHIP_INPUT);

                $scope.inputActive = false; // Componente Activo
                $scope.ngModel = $scope.ngModel || [];
                
                $scope.$watch(() => { return $scope.ngModel; },
                    (newValue) => {
                        if (!softtion.isArray(newValue)) $scope.ngModel = [];
                    });
                
                $scope.$watch(() => { return $scope.maxCount; },
                    (newValue) => {
                        if (isNaN(newValue)) $scope.maxCount = -1;
                    });
                    
                defineInputField($scope, $element, $attrs, listener);

                $element.click(() => { input.focus(); });

                $scope.isLabelActive = function () {
                    return $scope.inputActive || (!$scope.ngModel.isEmpty());
                };

                $scope.isHelperActive = function () {
                    return $scope.ngModel.isEmpty() || $scope.helperPermanent;
                };
                
                $scope.isHolderHide = function () {
                    return ($scope.isLabel && !$scope.inputActive);
                };

                $scope.resizeWidthInput = function () {
                    var isIcon = ($scope.isIconDescription || $scope.isIconImg);
                    
                    if ($scope.ngModel.isEmpty()) // Sin elementos
                        return (isIcon) ? "calc(100% - 36px)" : "100%";
                    
                    var isCapsule = $element.hasClass("capsule");
                     
                    if (isIcon)
                        return (isCapsule) ? "100%" : "calc(100% - 36px)";
                    
                    var sizeContent = $element.width(), 
                        sizeChips = chips.width();
                
                    if (isCapsule) sizeContent -= 4;
                    
                    return (sizeChips < (sizeContent / 2)) ?
                        ((sizeContent - sizeChips - 12) + "px") : "100%";
                };

                $scope.clickActiveElement = function ($event) {
                    $scope.focusedInput = true; $event.stopPropagation();
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
                        if ($scope.ngModel.has($scope.maxCount)) return;

                         // Texto digitado ya se encuentra en la Lista
                        if ($scope.ngModel.hasItem($scope.input)) return; 

                        $scope.ngModel.push($scope.input); // Item

                        listener.launch(Listeners.ADD, { $event: $event, $item: $scope.input });

                        $scope.input = undefined; // Limpiando
                    } // Se va agregar texto escrito en el componente
                };

                $scope.removeItem = function (index) {
                    if ($scope.ngDisabled) return; // Desactivado
                    
                    $scope.ngModel.remove(index); // Removiendo
                    listener.launch(Listeners.REMOVE, { $item: $scope.ngModel[index] });
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
                ngModel: "=", 
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
            
                $scope.clockValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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

                    if (softtion.isUndefined($scope.ngModel)) $scope.ngModel = new Date();

                    $scope.ngModel.setHours(hour); $scope.ngModel.setMinutes($scope.minute);

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
            addAttribute("ng-persistent", "true").
            addChildren(
                softtion.html("div").addClass("box").addChildren(
                    softtion.html("div").addClass("clockpicker").
                        addAttribute("ng-model", "time").
                        addAttribute("ng-material", "{{ngMaterial}}").
                        addAttribute("ng-listener", "clockListener($model, $listener)")
                )
            );

        return dialog.create(); // Componente
    };
    
    Directives.ClockPickerDialog.$inject = ["$body", "$appContent"];
    
    function ClockPickerDialogDirective($body, $appContent) {
        return {
            restrict: "C",
            templateUrl: Directives.ClockPickerDialog.ROUTE,
            scope: {
                ngModel: "=",
                ngOpen: "=",
                ngMaterial: "@",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CLOCKPICKER);
                
                $element.appendTo($appContent); // Agregando en AppContent

                $scope.$watch(() => { return $scope.ngOpen; }, 
                    (newValue) => {
                        (!newValue) ? 
                            $body.removeClass(Classes.BODY_OVERFLOW_NONE) :
                            $body.addClass(Classes.BODY_OVERFLOW_NONE);
                    });

                $scope.clockListener = function ($model, $listener) {
                    $scope.ngModel = getNewInstanceTime($model);
                    $scope.ngOpen = false; listener.launch($listener);
                };
                
                function getNewInstanceTime($model) {
                    if (!softtion.isDate($model)) return undefined;
                    
                    var newTime = new Date(); // Nuevo time
                    newTime.setHours($model.getHours());
                    newTime.setMinutes($model.getMinutes());
                    
                    return newTime; // Nuevo datos de tiempo
                }
                
                $scope.$on("$destroy", () => { $element.remove(); });
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("tabindex", "0").
                addAttribute("ng-focus", "focusContent()").
                addAttribute("ng-blur", "blurContent()").
                addAttribute("ng-keypress", "keyPressContent($event)").
                addAttribute("focused-element", "focusedInput").
                addAttribute("ng-class", 
                    "{active: contentActive, disabled: ngDisabled, \"label-inactive\": !isLabel}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}").
                addAttribute("ng-click", "showDialog($event)");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-if", "isLabel").
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
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        var dialog = softtion.html("div").addClass("clockpicker-dialog").
                addAttribute("ng-model", "timePicker").
                addAttribute("ng-open", "ngOpen").
                addAttribute("ng-material", "{{ngMaterial}}").
                addAttribute("ng-listener", "clockDialogListener($model, $listener)");

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(label).
            addChildren(buttonClear).addChildren(spanHelper);

        return content + dialog; // Componente
    };
                    
    function ClockPickerInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.ClockPickerInput.ROUTE,
            scope: {
                ngModel: "=",
                label: "@",
                required: "=?",
                optional: "=?",
                ngMaterial: "@",
                format: "@",
                autoStart: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.CLOCKPICKER);
                
                $scope.format = $scope.format || "hz:ii zz";
                $scope.ngOpen = false; // Dialog inicia oculto

                if (softtion.isUndefined($scope.ngModel) && $scope.autoStart) 
                    $scope.ngModel = new Date();  // Tiempo del dispositivo

                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefindo
                        
                        if (!softtion.isDate(newValue)) $scope.ngModel = oldValue;
                    });
                    
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return softtion.isDate($scope.ngModel);
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.helperPermanent;
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.ngModel);
                };
                    
                $scope.focusContent = function () { $scope.contentActive = true; };
                    
                $scope.blurContent = function () { $scope.contentActive = false; };
                
                $scope.keyPressContent = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) 
                        showDialog($event); // Presiono ENTER
                    
                    if ($event.originalEvent.which === KeysBoard.SPACE) 
                        showDialog($event); // Presiono SPACE
                };

                $scope.getValueModel = function () {
                    if ($scope.isHolderActive()) return $scope.placeholder;
                    
                    return (!softtion.isDate($scope.ngModel)) ? 
                        "" : $scope.ngModel.getFormat($scope.format);
                };

                $scope.showDialog = function ($event) { showDialog($event); };
                
                $scope.clockDialogListener = function ($model, $listener) {
                    content.focus(); $scope.ngModel = $model;
                    listener.launch($listener); // Reportando listener
                };

                $scope.clearTime = function () {
                    $scope.ngModel = undefined; listener.launch(Listeners.CLEAR);
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
                softtion.html("div").addClass("yearpicker").
                    addAttribute("ng-class", "{show: selectYearEnabled}").
                    addAttribute("ng-model", "year").
                    addAttribute("min-date", "minDate").
                    addAttribute("max-date", "maxDate").
                    addAttribute("ng-listener", "listenerSelectYear($listener, $model)")
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
    
    Directives.DatePicker.$inject = ["$body"];
                    
    function DatePickerDirective($body) {
        var directive = Directives.DatePicker; // Directiva
        
        return {
            restrict: "C",
            templateUrl: Directives.DatePicker.ROUTE,
            scope: {
                ngModel: "=ngModel",
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
                    listMonths = $elememt.find(".content .months");

                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER),
                    
                    today = new Date().normalize("date"), 
                    dateStart = new Date(), dateCalendar = new Date(),
                    
                    DAYS_OF_MONTHS = MANAGER_DATETIME.DAYS_OF_MONTHS,
                    MONTHS_OF_YEAR = MANAGER_DATETIME.MONTHS_OF_YEAR,
                    
                    fontSize = parseInt($body.css("font-size"));

                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return;
                        
                        if (!softtion.isDate(newValue)) {
                            $scope.ngModel = oldValue; return;
                        } // Valor definido no es una fecha
                        
                        initDatePicker(newValue); // Iniciando componente
                    });

                $scope.$watch(() => { return $scope.minDate; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return;
                        
                        if (!softtion.isDate(newValue)) {
                            $scope.minDate = oldValue; return;
                        } // Valor definido no es una fecha
                        
                        newValue.normalize("date"); // Normalizando fecha
                        
                        if (softtion.isDate($scope.ngModel)) {
                            if (newValue.isBefore($scope.ngModel)) {
                                $scope.ngModel = newValue; $scope.selectDate = newValue;
                            }
                        } else {
                            // Se define nueva fecha de inicio en componente
                            if (newValue.isBefore(dateStart)) initDatePicker(newValue); 
                        }
                    });

                $scope.$watch(() => { return $scope.maxDate; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return;
                        
                        if (!softtion.isDate(newValue)) {
                            $scope.maxDate = oldValue; return;
                        } // Valor definido no es una fecha
                        
                        newValue.normalize("date"); // Normalizando fecha
                        
                        if (softtion.isDate($scope.ngModel)) {
                            if (newValue.isAfter($scope.ngModel)) {
                                $scope.ngModel = newValue; $scope.selectDate = newValue;
                            }
                        } else {
                            // Se define nueva fecha de inicio en componente
                            if (newValue.isAfter(dateStart)) initDatePicker(newValue);
                        }
                    });

                $scope.selectYearEnabled = false; $scope.selectMonthEnabled = false;

                $scope.months = MANAGER_DATETIME.MONTHS;
                    
                if ($scope.autostart && !softtion.isDate($scope.ngModel))
                    $scope.ngModel = today; // Iniciando model
                
                initDatePicker(dateCalendar); // Iniciando calendario

                // FUNCIONES PARA CONTROL DE AÑOS

                $scope.isActiveYear = function (year) {
                    return ($scope.year === year);
                };

                $scope.activeYear = function (enabled) {
                    $scope.selectYearEnabled = enabled;  // Estado

                    if ($scope.selectYearEnabled)
                        $scope.activeMonth(false); // Desactivando selección del mes
                };

                $scope.listenerSelectYear = function ($listener, $model) {
                    switch ($listener) {
                        case (Softtion.LISTENERS.SELECT):
                            if ($scope.year !== $model) {
                                $scope.year = $model; dateStart.setYear($scope.year);
                                var countDaysMonth = DAYS_OF_MONTHS[$scope.month];

                                $scope.daysMonth = directive.createCalendar(
                                    $scope.year, $scope.month, dateStart.getDay(), countDaysMonth
                                );
                            } // Cambio de año en el Componente

                            $scope.activeYear(false); // Desactivando selección de Año
                        break;
                    }
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
                    var date = (softtion.isDate($scope.ngModel)) ? $scope.ngModel : today;

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
                    
                    return (!softtion.isDate($scope.ngModel)) ? false :
                        $scope.ngModel.equalsDate($scope.year, $scope.month, day);
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
                    $scope.ngModel = getDate(); listener.launch(Listeners.SELECT);
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
            addAttribute("ng-persistent", "true").
            addChildren(
                softtion.html("div").addClass("box").
                    addChildren(
                        softtion.html("div").addClass("datepicker").
                            addAttribute("ng-model", "ngModel").
                            addAttribute("autostart", "autostart").
                            addAttribute("ng-material", "{{ngMaterial}}").
                            addAttribute("ng-disabled-date", "ngDisabledDatePicker($date)").
                            addAttribute("ng-listener", "dateListener($model, $listener)").
                            addAttribute("min-date", "minDate").
                            addAttribute("max-date", "maxDate").
                            addAttribute("year-range", "yearRange")
                    )
            );

        return dialog.create(); // Componente
    };
    
    Directives.DatePickerDialog.$inject = ["$body", "$appContent"];
                    
    function DatePickerDialogDirective($body, $appContent) {
        return {
            restrict: "C",
            templateUrl: Directives.DatePickerDialog.ROUTE,
            scope: {
                ngModel: "=",
                autostart: "=?",
                minDate: "=?",
                maxDate: "=?",
                yearRange: "=?",
                ngOpen: "=",
                ngMaterial: "@",
                ngDisabledDate: "&",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER);
                
                $element.appendTo($appContent); // Agregando en AppContent

                $scope.$watch(() => { return $scope.ngOpen; }, 
                    (newValue) => {
                        (!newValue) ? $body.removeClass(Classes.BODY_OVERFLOW_NONE) :
                            $body.addClass(Classes.BODY_OVERFLOW_NONE);
                    });

                $scope.dateListener = function ($model, $listener) {
                    $scope.ngOpen = false; $scope.ngModel = $model; listener.launch($listener);
                };

                $scope.ngDisabledDatePicker = function ($date) {
                    return $scope.ngDisabledDate({$date: $date});
                };
                
                $scope.$on("$destroy", () => { $element.remove(); });
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("tabindex", "0").
                addAttribute("ng-focus", "focusContent()").
                addAttribute("ng-blur", "blurContent()").
                addAttribute("ng-keypress", "keyPressContent($event)").
                addAttribute("focused-element", "focusedInput").
                addAttribute("ng-class", 
                    "{active: contentActive, disabled: ngDisabled, \"label-inactive\": !isLabel}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}").
                addAttribute("ng-click", "showDialog($event)");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-if", "isLabel").
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
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        var dialog = softtion.html("div").addClass("datepicker-dialog").
                addAttribute("ng-model", "ngModel").
                addAttribute("autostart", "autostart").
                addAttribute("ng-open", "ngOpen").
                addAttribute("ng-material", "{{ngMaterial}}").
                addAttribute("ng-listener", "dateDialogListener($model, $listener)").
                addAttribute("min-date", "minDate").
                addAttribute("max-date", "maxDate").
                addAttribute("ng-disabled-date", "ngDisabledDateDialog($date)").
                addAttribute("year-range", "yearRange");

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(label).
            addChildren(buttonClear).addChildren(spanHelper);

        return content + dialog; // Componente
    };
    
    function DatePickerInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.DatePickerInput.ROUTE,
            scope: {
                ngModel: "=",
                autostart: "=?",
                format: "@",
                label: "@",
                ngTheme: "@",
                required: "=?",
                optional: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                minDate: "=?",
                maxDate: "=?",
                yearRange: "=?",
                ngDisabledDate: "&",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.DATEPICKER);
                
                $scope.format = $scope.format || "ww, dd de mn del aa";
                $scope.ngOpen = false; // Dialog inicia oculto

                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefindo
                        
                        if (!softtion.isDate(newValue)) $scope.ngModel = oldValue;
                    });
                    
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return (softtion.isDate($scope.ngModel));
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.helperPermanent;
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.ngModel);
                };
                    
                $scope.focusContent = function () { $scope.contentActive = true; };
                    
                $scope.blurContent = function () { $scope.contentActive = false; };
                
                $scope.keyPressContent = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) 
                        showDialog($event); // Presiono ENTER
                    
                    if ($event.originalEvent.which === KeysBoard.SPACE) 
                        showDialog($event); // Presiono SPACE
                };

                $scope.getValueModel = function () {
                    if ($scope.isHolderActive()) return $scope.placeholder;
                    
                    return (!softtion.isDate($scope.ngModel)) ? 
                        "" : $scope.ngModel.getFormat($scope.format);
                };

                $scope.showDialog = function ($event) { showDialog($event); };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.dateDialogListener = function ($model, $listener) {
                    content.focus(); $scope.ngModel = $model;
                    listener.launch($listener); // Reportando listener
                };

                $scope.ngDisabledDateDialog = function ($date) {
                    return $scope.ngDisabledDate({ $date: $date });
                };

                $scope.clearDate = function () {
                    $scope.ngModel = undefined; listener.launch(Listeners.CLEAR);
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
    
    Directives.Dialog.$inject = ["$dialog"];
    
    function DialogDirective($dialog) {
        return {
            restrict: "C",
            scope: {
                ngPersistent: "=?",
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
                    if (!$scope.ngPersistent) dialog.hide(); 
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
                        var transition = event.originalEvent.propertyName, target = event.originalEvent.target;
                    
                        if (target === box[0] && transition === "transform")
                            listener.launch(($element.hasClass(Classes.SHOW)) ? Listeners.SHOW : Listeners.HIDE);
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
        return softtion.html("button").addClass([Classes.ACTION, "action-expansion"]).
            addChildren(softtion.html("i").setText("expand_more")).create();
    };
                    
    function ExpansionPanelDirective() {
        var directive = Directives.ExpansionPanel; // Directiva
        
        return {
            restrict: "C",
            scope: {
              ngExpand: "=?"  
            },
            link: function ($scope, $element) {
                var header = $element.children(".header"),
                    body = $element.children(".body");
            
                $scope.$watch(() => { return $scope.ngExpand; },
                    (newValue) => {
                        if (newValue) {
                            expandElement(); $element.addClass(Classes.ACTIVE);
                        } else { 
                            body.css("max-height", "0px");
                            $element.removeClass(Classes.ACTIVE);
                        } // Elemento comprimido
                    });

                if (!body.exists()) return; // Componente no tiene contenido
                    
                var content = body.children(".content");
                
                // Agregando botón de expansión
                header.append(angular.element(directive.BUTTON_ACTION())); 

                header.click(() => {
                    $scope.$apply(() => { $scope.ngExpand = !$scope.ngExpand; });
                });

                content.resize(() => { if ($scope.ngExpand) expandElement(); });
                
                function expandElement() {
                    var heightActions = body.children(".actions").innerHeight(),
                        heightContent = content.innerHeight(),

                        heightBody = // Calculando alto del Body
                            ((isNaN(heightContent)) ? 0 : heightContent) + 
                            ((isNaN(heightActions)) ? 0 : heightActions);

                    body.css("max-height", heightBody + "px");
                }
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
    
    Directives.FabDialog.$inject = ["$compile"];
    
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
        var input = softtion.html("input", false).addAttribute("type", "file");

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
                    
    Directives.Filechooser.$inject = ["$timeout", "$sce", "$materialConstant"];
                    
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
        var input = softtion.html("input", false).addAttribute("type", "file");

        var audio = softtion.html("div").addClass("audio").
            addAttribute("ng-src", "{{ngSrc}}").
            addAttribute("ng-name", "{{ngName}}").
            addAttribute("ng-audio", "ngAudio").
            addAttribute("ng-play-automatic", "ngPlayAutomatic");

        var actions = softtion.html("div").addClass("actions").
            addChildren(
                softtion.html("label").addClass("truncate").setText("{{getTextLabel()}}")
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                    addAttribute("ng-disabled", "ngDisabled").
                    addAttribute("ng-click", "saveFile()").
                    addChildren(softtion.html("i").setText("save"))
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-hide", "!isSelectFile()").
                    addAttribute("ng-disabled", "ngDisabled").
                    addAttribute("ng-click", "deleteFile()").
                    addChildren(softtion.html("i").setText("delete"))
            ).addChildren(
                softtion.html("button").addClass(Classes.ACTION).
                    addAttribute("ng-disabled", "ngDisabled").
                    addAttribute("ng-click", "selectFile($event)").
                    addChildren(softtion.html("i").setText("file_upload"))
            );

        return input + audio + actions; // Componente 
    };
    
    Directives.FilechooserAudio.$inject = ["$timeout", "$sce"];
    
    function FilechooserAudioDirective($timeout, $sce) {
        return {
            restrict: "C",
            templateUrl: Directives.FilechooserAudio.ROUTE,
            scope: {
                file: "=ngModel",
                ngSrc: "@",
                ngName: "@",
                ngAudio: "=?",
                ngPlayAutomatic: "=?",

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

                var audiosTypes = ["audio/mp3"];

                function processFile(file) {
                    var reader = new FileReader(); // Procesador de archivo

                    reader.onloadend = function () {
                        $scope.$apply(() => {
                            var src = window.URL.createObjectURL(file);

                            $scope.ngSrc = $sce.trustAsResourceUrl(src);
                            $scope.ngName = file.name; $scope.file = file; 

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
                        (softtion.isText($scope.label)) ? $scope.label : $scope.ngName;
                };

                $scope.isSelectFile = function () {
                    return softtion.isDefined($scope.file);
                };

                $scope.selectFile = function ($event) { 
                    setTimeout(() => { fileInput.click(); }, 125); $event.stopPropagation();
                };

                $scope.deleteFile = function () {
                    fileInput[0].value = ""; $scope.ngSrc = ""; 
                    $scope.file = undefined; $scope.ngName = "";

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
        var input = softtion.html("input", false).addAttribute("type", "file");

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
    
    Directives.FilechooserMultiple.$inject = ["$timeout", "$materialConstant"];
    
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
        var input = softtion.html("input", false).addAttribute("type", "file");

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
                ).addChildren(
                    softtion.html("button").addClass(Classes.ACTION).
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "selectFile($event)").
                        addChildren(softtion.html("i").setText("file_upload"))
                ).addChildren(
                    softtion.html("button").addClass(Classes.ACTION).
                        addAttribute("ng-hide", "!isSelectFile() || !saveEnabled").
                        addAttribute("ng-disabled", "ngDisabled").
                        addAttribute("ng-click", "saveFile()").
                        addChildren(softtion.html("i").setText("save"))
                );

        return input + img + icon + actions; // Componente
    };
    
    Directives.FilechooserPerfil.$inject = ["$timeout"];
                    
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
                    return (softtion.isText($scope.label)) ? $scope.label : $scope.name;
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
    
    Directives.FormNavigation.$inject = ["$formNavigation"];
    
    function FormNavigationDirective($formNavigation) {
        return {
            restrict: "C",
            scope: {
                ngPersistent: "=?",
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

                backdrop.click(() => { if (!$scope.ngPersistent) formNavigation.hide(); });
                    
                $element.transitionend((event) => {
                    $scope.$apply(() => {
                        var transition = event.originalEvent.propertyName, target = event.originalEvent.target;
                    
                        if (target === content[0] && transition === "transform")
                            listener.launch(($element.hasClass(Classes.SHOW)) ? Listeners.SHOW : Listeners.HIDE);
                    });
                });
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
    
    Directives.Img.$inject = ["$materialFunction"];
    
    function ImgDirective($materialFunction) {
        var directive = Directives.Img; // Directiva
        
        return {
            restrict: "E",
            scope: {
                disabledResponsive: "=?",
                density: "@"
            },
            link: function ($scope, $element) {
                var densities = ["width", "height"], // Densidades
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
    
    // Directiva: ImageEditor
    // Version: 1.0.0
    // Update: 05/Oct/2018
    
    Directives.ImageEditor = ImageEditorDirective;
    
    Directives.ImageEditor.NAME = "ImageEditor";
    Directives.ImageEditor.VERSION = "1.0.0";
    Directives.ImageEditor.KEY = "imageEditor";
    Directives.ImageEditor.ROUTE = "softtion/template/image-editor.html";
                    
    Directives.ImageEditor.HTML = function () {
        var box = softtion.html("div").addClass("box"); // Contenedor principal
        
        var panel = softtion.html("div").addClass("panel").
                addAttribute("ng-hide", "!progress.loaded").
                addChildren(
                    softtion.html("div").addClass("image").
                        addAttribute("ng-style", "getStyleImage()").
                        addChildren(
                            softtion.html("div").addClass("selection").
                                addAttribute("ng-style", "getStyleSelection()").
                                addAttribute("ng-pointerdown", "pointerDownSelection($result)").
                                addAttribute("ng-pointerup", "pointerUpSelection()").
                                addAttribute("ng-pointermove", "pointerMoveSelection($result)")
                        ).addChildren(
                            softtion.html("div").addClass(["overlay", "top"]).
                                addAttribute("ng-style", "getStyleOverlay(\"top\")")
                        ).addChildren(
                            softtion.html("div").addClass(["overlay", "left"]).
                                addAttribute("ng-style", "getStyleOverlay(\"left\")")
                        ).addChildren(
                            softtion.html("div").addClass(["overlay", "bottom"]).
                                addAttribute("ng-style", "getStyleOverlay(\"bottom\")")
                        ).addChildren(
                            softtion.html("div").addClass(["overlay", "right"]).
                                addAttribute("ng-style", "getStyleOverlay(\"right\")")
                        ).addChildren(
                            softtion.html("canvas").addAttribute("ng-style", "getStyleImage()")
                        )
                );
        
        var message = softtion.html("div").addClass("message").
                addAttribute("ng-hide", "progress.loaded").
                addChildren(softtion.html("i").setText("image_search")).
                addChildren(softtion.html("p").setText("Cargando imagen a procesar")).
                addChildren(
                    softtion.html("div").addClass("progress-bar").
                        addAttribute("ng-visible", "true").
                        addAttribute("indeterminate", "true")
                );

        var content = softtion.html("div").addClass("content").
                addAttribute("ratio-element", "{{ngRatio}}").
                addAttribute("ng-mouseleave", "mouseLeaveContent()").
                addChildren(panel).addChildren(message);
        
        var actions = softtion.html("div").addClass("actions").
                addChildren(
                    softtion.html("button").addClass(["action", "selector"]).
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "cropImage()").
                        addChildren(
                            softtion.html("i").setText("crop").addAttribute("tooltip", "Seleccionar")
                        )
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "applyRestore()").
                        addChildren(
                            softtion.html("i").setText("restore").addAttribute("tooltip", "Restaurar")
                        )
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "applyBlackAndWhite()").
                        addChildren(
                            softtion.html("i").setText("filter_b_and_w").addAttribute("tooltip", "Blanco/Negro")
                        )
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "applySepia()").
                        addChildren(
                            softtion.html("i").setText("gradient").addAttribute("tooltip", "Sepia")
                        )
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isDisabled()").
                        addAttribute("ng-click", "applyInvert()").
                        addChildren(
                            softtion.html("i").setText("exposure").addAttribute("tooltip", "Invertir")
                        )
                );

        return box.addChildren(content).
            addChildren(
                softtion.html("div").addClass("slider").
                    addAttribute("icon", "photo_size_select_large").
                    addAttribute("ng-model", "ngSelection").
                    addAttribute("ng-disabled", "isDisabled()").
                    addAttribute("min-value", "25").
                    addAttribute("max-value", "100").
                    addAttribute("ng-listener", "sizeSelectionListener($listener)")
            ).addChildren(
                softtion.html("div").addClass("slider").
                    addAttribute("icon", "tonality").
                    addAttribute("ng-model", "ngContrast").
                    addAttribute("ng-disabled", "isDisabled()").
                    addAttribute("min-value", "-255").
                    addAttribute("max-value", "255").
                    addAttribute("ng-listener", "contrastListener($listener, $model)")
            ).addChildren(actions).addChildren(
                softtion.html("canvas").addClass("processor")
            ).create(); // Componente
    };
    
    Directives.ImageEditor.$inject = ["$materialService"];
    
    function ImageEditorDirective($materialService) {
        return {
            restrict: "C",
            templateUrl: Directives.ImageEditor.ROUTE,
            scope: {
                ngSource: "@",
                ngSelection: "=?",
                ngMimeType: "@",
                ngRatio: "@",
                ngWidth: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Elementos
                var IMG = new Image(), // Contenedor real de la Imagen

                    content = $element.find(".content"),
                    image = $element.find(".image"),
                    selection = image.children(".selection"),

                    canvasProcessor = $element.find("canvas.processor"),
                    contextProcessor = canvasProcessor[0].getContext("2d"),

                    canvasContent = image.children("canvas"),
                    contextContent = canvasContent[0].getContext("2d"),

                     // Atributos
                    posX, posY, top, left, originalData, 
                    densityContent, densityImage,
                    attributes = { top: 0, left: 0, active: false };

                $scope.ngMimeType = $scope.ngMimeType || "image/jpeg";
                $scope.ngContrast = 0; $scope.ngSelection || ($scope.ngSelection = 50);
                $scope.progress = { loaded: false }; $scope.start = false;

                $attrs.$observe("ngSource", (value) => {
                    if (!softtion.isText(value)) return; // SRC Indefinido
                    
                    IMG.src = value; $scope.progress.loaded = false;
                });

                content.resize(() => {
                    $scope.$apply(() => {
                        densityContent = ((content.width() / content.height()) >= 1);
                    });
                });

                IMG.onload = function () {
                    $scope.$apply(() => {
                        densityImage = ((IMG.width / IMG.height) >= 1);
                        canvasContent.prop("width", IMG.width); 
                        canvasContent.prop("height", IMG.height); 

                        contextContent.drawImage(IMG, 0, 0, IMG.width, IMG.height);
                        originalData = getImageData(); // Imagen original

                        $scope.progress.loaded = true; // Carga exitosa de imagen
                    });
                };

                $scope.isDisabled = function () {
                    return $scope.ngDisabled || !$scope.progress.loaded;
                };

                $scope.mouseLeaveContent = function () { 
                    attributes.active = false; 
                };

                $scope.pointerDownSelection = function ($result) {
                    if (attributes.active) return; // Ya esta activo

                    posX = $result.offsetX; posY = $result.offsetY;
                    attributes.active = true; // Activando

                    top = attributes.top; left = attributes.left;
                };

                $scope.pointerMoveSelection =  function ($result) {
                    if (!attributes.active) return; // Inactivo

                    var resultX = left + ($result.offsetX - posX),
                        resultY = top + ($result.offsetY - posY);
                
                    if (resultX < 0) { 
                        resultX = 0;
                    } else if ((resultX + selection.width() + 4) > image.width()) {
                        resultX = image.width() - selection.width() - 4;
                    } // Se reajusta la posición X, se desbordó en contenedor
                    
                    if (resultY < 0) { 
                        resultY = 0; 
                    } else if ((resultY + selection.height() + 4) > image.height()) {
                        resultY = image.height() - selection.height() - 4;
                    } // Se reajusta la posición Y, se desbordó en contenedor
                    
                    attributes.top = resultY; attributes.left = resultX;
                };

                $scope.pointerUpSelection = function () { attributes.active = false; };

                $scope.getStyleSelection = function () {
                    return {
                        top: getPositionSelection(false),
                        left: getPositionSelection(true),
                        width: $scope.ngSelection + "%",
                        height: getHeightSelection() + "px"
                    };
                };

                $scope.getStyleOverlay = function (type) {
                    switch (type) {
                        case ("top"):
                            return {
                                bottom: "calc(100% - " + attributes.top + "px)",
                                left: attributes.left,
                                width: $scope.ngSelection + "%"
                            };

                        case ("right"):
                            return {
                                left: "calc(" + $scope.ngSelection + "% + " + attributes.left + "px)"
                            };

                        case ("bottom"):
                            return {
                                top: "calc(" + getHeightSelection() + "px + " + (attributes.top) + "px)",
                                left: attributes.left,
                                width: $scope.ngSelection + "%"
                            };

                        case ("left"):
                            return {
                                right: "calc(100% - " + attributes.left + "px)"
                            };
                    }
                };

                $scope.getStyleImage = function () {
                    return (!densityContent) ? { height: "100%" } : { width: "100%" };
                };
                
                $scope.sizeSelectionListener = function ($listener) {
                    if (!$scope.start) { 
                        $scope.start = true; return;
                    } // Componente no iniciado
                    
                    switch ($listener) {
                        case (Softtion.LISTENERS.CHANGED): adjustPositionOverlay(); break;
                    }
                };

                $scope.cropImage = function () {
                    var props = getPropertiesCrop(), // Propiedades de imagen final

                        widthCanvas = isNaN($scope.ngWidth) ? props.width : $scope.ngWidth,
                        heightCanvas = getValueHeightRatio(widthCanvas);

                    canvasProcessor.prop("width", widthCanvas); 
                    canvasProcessor.prop("height", heightCanvas); 

                    contextProcessor.drawImage(
                        canvasContent[0], 
                        props.left, props.top, 
                        props.width, props.height, 
                        0 , 0, widthCanvas, heightCanvas
                    );

                    canvasProcessor[0].toBlob(
                        (blob) => {
                            $scope.$apply(() => { $scope.ngListener({ $result: blob }); });
                        }, 
                        $scope.ngMimeType, 1 // Quality
                    );
                };

                $scope.applyRestore = function () {
                    if (softtion.isDefined(originalData)) contextContent.putImageData(originalData, 0, 0);
                };

                $scope.applyBlackAndWhite = function () {
                    contextContent.putImageData(setFilterImageData(
                        getImageData(), // Imagen del Canvas
                        (pixels, posR, posG, posB) => {
                            var R = pixels[posR], G = pixels[posG], 
                                B = pixels[posB], GREY = (R + G + B) / 3;

                            pixels[posR] = GREY; pixels[posG] = GREY; pixels[posB] = GREY;
                        }), 0, 0); // Aplicando filtro "Blanco y Negro"
                };

                $scope.applyInvert = function () {
                    contextContent.putImageData(setFilterImageData(
                        getImageData(), // Imagen del Canvas
                        (pixels, posR, posG, posB) => {
                            var R = pixels[posR], G = pixels[posG], B = pixels[posB];

                            pixels[posR] = 255 - R; pixels[posG] = 255 - G; pixels[posB] = 255 - B;
                        }), 0, 0); // Aplicando filtro "Invertir"
                };

                $scope.applySepia = function () {
                    contextContent.putImageData(setFilterImageData(
                        getImageData(), // Imagen del Canvas
                        (pixels, posR, posG, posB) => {
                            var R = pixels[posR], G = pixels[posG], B = pixels[posB];

                            pixels[posR] = (R * 0.393) + (G * 0.769) + (B * 0.189);
                            pixels[posG] = (R * 0.349) + (G * 0.686) + (B * 0.168);
                            pixels[posB] = (R * 0.272) + (G * 0.534) + (B * 0.131);
                        }), 0, 0); // Aplicando filtro "Sepia"
                };

                $scope.contrastListener = function ($listener, $model) {
                    switch ($listener) {
                        case (Softtion.LISTENERS.CHANGED): applyContrast($model); break;
                    }
                };
                
                function getHeightSelection() {
                    return getValueHeightRatio(selection.width());
                }

                function getPositionSelection(isWidth) {
                    var sel = (isWidth) ? selection.width() : selection.height(),
                        img = (isWidth) ? image.width() : image.height(),
                        position = (isWidth) ? attributes.left : attributes.top;

                    return (position < 0) ? 0 : ((position + sel + 4) > img) ?
                        (img - sel - 4) : position; // Posición original
                }
                
                function adjustPositionOverlay() {
                    if ((attributes.left + selection.width() + 4) > image.width()) {
                        attributes.left = image.width() - selection.width() - 4;
                    } // Cambio de tamaño selector, posición X se desbordó en contenedor
                    
                    if ((attributes.top + selection.height() + 4) > image.height()) {
                        attributes.top = image.height() - selection.height() - 4;
                    } // Cambio de tamaño selector, posición Y se desbordó en contenedor
                }

                function getValueHeightRatio(width) {
                    return (width * $materialService.getValueRatio($scope.ngRatio));
                }

                function getImageData() {
                    return contextContent.getImageData(0, 0, canvasContent[0].width, canvasContent[0].height);
                }

                function applyContrast(contrast) {
                    $scope.applyRestore(); // Restaurando la imagen primero

                    contrast || (contrast = 100); // Valor por defecto

                    var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

                    contextContent.putImageData(setFilterImageData(
                        getImageData(), // Imagen del Canvas
                        (pixels, posR, posG, posB) => {
                            var R = pixels[posR], G = pixels[posG], B = pixels[posB];

                            pixels[posR] = factor * (R - 128) + 128;
                            pixels[posG] = factor * (G - 128) + 128;
                            pixels[posB] = factor * (B - 128) + 128;
                        }), 0, 0); // Aplicando filtro "Contraste"
                }

                function getPropertiesCrop() {
                    return {
                        width: softtion.simpleThreeRule(image.width(), IMG.width, selection.width()),
                        top: softtion.simpleThreeRule(image.height(), IMG.height, attributes.top),
                        left: softtion.simpleThreeRule(image.width(), IMG.width, attributes.left),
                        height: softtion.simpleThreeRule(image.height(), IMG.height, selection.height())
                    };
                }

                function setFilterImageData(pixels, fnFilter) {
                    var size = pixels.width * pixels.height;

                    for (var i = 0; i < size; i++) {
                        fnFilter(pixels.data, (i * 4), (i * 4 + 1), (i * 4 + 2));
                    } // Aplicando filtro en la imagen

                    return pixels; // Resultado final del filtro
                }
            }
        };
    }
    
    // Directiva: LabelField
    // Version: 1.0.0
    // Update: 30/Dic/2018
    
    Directives.LabelField = LabelFieldDirective;
    
    Directives.LabelField.NAME = "LabelField";
    Directives.LabelField.VERSION = "1.0.0";
    Directives.LabelField.KEY = "labelfield";
    Directives.LabelField.ROUTE = "softtion/template/labelfield.html";
    
    Directives.LabelField.HTML = function () {
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class",
                "{active: inputActive, \"label-inactive\": !isLabel," +
                " disabled: ngDisabled, \"icon-action\": isIconAction || checkboxActive}"
            ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{ngText}}").
                addAttribute("ng-click", "clickLabel($event)").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-if", "isLabel").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-click", "clickLabel($event)").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(label);

        return content.create(); // Componente
    };
    
    function LabelFieldDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.LabelField.ROUTE,
            scope: {
                ngText: "@",
                label: "@",
                iconDescription: "@",
                iconImg: "@"
            },
            link: function ($scope, $element, $attrs) {
                    
                $attrs.$observe("iconDescription", () => {
                    $scope.isIconDescription = softtion.isText($attrs.iconDescription);
                });

                $attrs.$observe("iconImg", () => {
                    $scope.isIconImg = softtion.isText($attrs.iconImg);
                });

                $attrs.$observe("label", () => {
                    $scope.isLabel = softtion.isText($attrs.label);
                });

                $attrs.$observe("ngText", () => {
                    $scope.inputActive = softtion.isText($scope.ngText);
                });

                $scope.clickIconDescription = function ($event) {
                    //listener.launch(Listeners.ICON, { $event: $event });
                };
                
                $scope.isActiveLabel = function () {
                    return softtion.isText($scope.ngText);
                };
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
    
    Directives.Notification.$inject = ["$appContent"];
    
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
    
    // Directiva: Pagination
    // Version: 1.0.0
    // Update: 06/Ago/2018
    
    Directives.Pagination = PaginationDirective;
    
    Directives.Pagination.NAME = "Pagination";
    Directives.Pagination.VERSION = "1.0.0";
    Directives.Pagination.KEY = "pagination";
    Directives.Pagination.ROUTE = "softtion/template/pagination.html";
    
    Directives.Pagination.HTML = function () {
        var content = softtion.html("div").addClass("content");
        
        var pages = softtion.html("div").addClass("pages").
                addAttribute("ng-hide", "isEmpty()").
                addChildren(
                    softtion.html("div").addClass("page").
                        setText("{{getLabelPage(0)}}").
                        addAttribute("ng-hide", "isHidePage(0)").
                        addAttribute("ng-class", "{active: isActivePage(0)}").
                        addAttribute("ng-click", "clickPage(0)")
                ).addChildren(
                    softtion.html("div").addClass("page").
                        setText("{{getLabelPage(1)}}").
                        addAttribute("ng-hide", "isHidePage(1)").
                        addAttribute("ng-class", "{active: isActivePage(1)}").
                        addAttribute("ng-click", "clickPage(1)")
                ).addChildren(
                    softtion.html("div").addClass("page").
                        setText("{{getLabelPage(2)}}").
                        addAttribute("ng-hide", "isHidePage(2)").
                        addAttribute("ng-class", "{active: isActivePage(2)}").
                        addAttribute("ng-click", "clickPage(2)")
                ).addChildren(
                    softtion.html("div").addClass("page").
                        setText("{{getLabelPage(3)}}").
                        addAttribute("ng-hide", "isHidePage(3)").
                        addAttribute("ng-class", "{active: isActivePage(3)}").
                        addAttribute("ng-click", "clickPage(3)")
                );
        
        var description = softtion.html("div").
                addClass("description").setText("{{getLabelDescription()}}");
        
        var actions = softtion.html("div").addClass("actions").
                addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isFirstPage()").
                        addAttribute("ng-click", "goFirstPage()").
                        addChildren(softtion.html("i").setText("first_page"))
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isFirstPage()").
                        addAttribute("ng-click", "prev()").
                        addChildren(softtion.html("i").setText("chevron_left"))
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isLastPage()").
                        addAttribute("ng-click", "next()").
                        addChildren(softtion.html("i").setText("chevron_right"))
                ).addChildren(
                    softtion.html("button").addClass("action").
                        addAttribute("ng-disabled", "isLastPage()").
                        addAttribute("ng-click", "goLastPage()").
                        addChildren(softtion.html("i").setText("last_page"))
                );
        
        content.addChildren(pages).addChildren(description).addChildren(actions);
        
        return content.create(); // Componente
    };
                    
    Directives.Pagination.$inject = ["$filter"];
    
    function PaginationDirective($filter) {
        return {
            restrict: "C",
            templateUrl: Directives.Pagination.ROUTE,
            scope: {
                ngModel: "=?",
                ngIndex: "=?",
                suggestions: "=",
                ngCount: "=?",
                label: "@",
                ngFilter: "@",
                ngFilterParam: "=?",
                ngListener: "&"
            },
            link: function ($scope) {
                $scope.catalog = []; // Lista de items filtrados
                
                $scope.$watch(() => { return $scope.ngFilterParam; },
                    (newValue) => {
                        $scope.catalog = getCatalog(newValue);
                        
                        var maxIndex = getMaxIndexPages();
                        
                        if ($scope.ngIndex > maxIndex) {
                            $scope.ngIndex = maxIndex; return;
                        } // Se actualiza el index
                        
                        updatePageList($scope.catalog); // Actualizando lista
                    }, true);
                
                $scope.$watch(() => { return $scope.ngIndex; },
                    (newValue, oldValue) => {
                        if (isNaN(newValue)) {
                            $scope.ngIndex = (softtion.isDefined(oldValue)) ? oldValue : 0; return;
                        } else {
                            if (newValue < 0) {
                                $scope.ngIndex = 0; return;
                            } // Menor que la inicial
                            
                            var maxIndex = getMaxIndexPages(); // Páginas disponibles
                            
                            if (newValue > maxIndex) {
                                $scope.ngIndex = maxIndex; return;
                            } // Mayor que la final
                        }
                        
                        updatePageList($scope.catalog); // Actualizando página
                    });
                
                $scope.$watch(() => { return $scope.ngCount; },
                    (newValue, oldValue) => {
                        if (isNaN(newValue)) {
                            $scope.ngCount = (softtion.isDefined(oldValue)) ? oldValue : 5; return;
                        } else {
                            var maxIndex = getMaxIndexPages();
                            
                            if ($scope.ngIndex > maxIndex) {
                                $scope.ngIndex = maxIndex; return;
                            } // Cantidad máxima posible de páginas
                        }
                        
                        updatePageList($scope.catalog); // Actualizando página
                    });
                    
                $scope.$watchCollection(() => { return $scope.suggestions; },
                    (newValue, oldValue) => {
                        if (softtion.isArray(newValue)) {
                            if (newValue.isEmpty()) {
                                $scope.ngModel = []; return;
                            } // Lista de opciones es vacia
                            
                            $scope.catalog = getCatalog($scope.ngFilterParam);
                            
                            updatePageList($scope.catalog); return;
                        } // Se ha definido una lista correctamente
                        
                        $scope.suggestions = softtion.isDefined(oldValue) ? oldValue : [];
                    });
                
                $scope.getLabelPage = function (page) {
                    return (getIndexPage(page) + 1); 
                };
                
                $scope.isEmpty = function () {
                    return (!softtion.isArray($scope.suggestions)) ? 
                        true : $scope.suggestions.isEmpty(); 
                };
                
                $scope.isHidePage = function (page) { 
                    return (page > getMaxIndexPages() || !softtion.isArray($scope.catalog)); 
                };
                
                $scope.isActivePage = function (page) {
                    return (getIndexPage(page) === $scope.ngIndex);
                };
                
                $scope.clickPage = function (page) {
                    $scope.ngIndex = getIndexPage(page);
                };
                
                $scope.getLabelDescription = function () {
                    if (!softtion.isArray($scope.suggestions)) return "Sin datos";
                    
                    var count = $scope.suggestions.length; // Cantidad
                    
                    if (!softtion.isArray($scope.catalog)) 
                        return count + " " + $scope.label;
                    
                    if ($scope.catalog.isEmpty()) return count + " " + $scope.label;
                    
                    var start = ($scope.ngIndex * $scope.ngCount) + 1,
                        size = $scope.catalog.length,
                        end = ($scope.ngIndex + 1) * $scope.ngCount;
                
                    if (end > size) end = size; // No debe superar cantidad
                    
                    return start + " - " + end + " de " + count + " " + $scope.label;
                };
                
                $scope.goFirstPage = function () { $scope.ngIndex = 0; };
                
                $scope.prev = function () { $scope.ngIndex--; };
                
                $scope.isFirstPage = function () { return ($scope.ngIndex === 0); };
                
                $scope.next = function () { $scope.ngIndex++; };
                
                $scope.goLastPage = function () { $scope.ngIndex = getMaxIndexPages(); };
                
                $scope.isLastPage = function () { 
                    return ($scope.ngIndex === getMaxIndexPages()); 
                };
                
                function getMaxIndexPages() {
                    if (!softtion.isArray($scope.catalog)) return 0; // Indefinido
                    
                    if ($scope.catalog.isEmpty()) return 0; // Sin datos
                    
                    var maxIndex = parseInt($scope.catalog.length / $scope.ngCount);
                    
                    if (($scope.catalog.length % $scope.ngCount) > 0) maxIndex++;
                    
                    return (maxIndex - 1); // Retornando index máximo de páginas de lista
                }
                
                function getIndexPage(page) {
                    var maxIndex = getMaxIndexPages(), // Cantidad de páginas
                        maxPages = (maxIndex > 3) ? 3 : maxIndex;
                        
                    return (maxPages < 3 || maxIndex === 3) ?
                        calculateMinIndexPage(page, maxPages, maxIndex) :
                        !((maxPages + $scope.ngIndex) > maxIndex) ? 
                            (page + $scope.ngIndex) :
                            (calculateMaxIndexPage(page, maxPages, maxIndex));
                }
                
                function calculateMinIndexPage(page, maxPages, maxIndex) {
                    var diferencial = (maxPages - (maxIndex - $scope.ngIndex)); // Diferencial
                    
                    return ($scope.ngIndex + maxIndex) - (maxPages - page) - diferencial;
                }
                
                function calculateMaxIndexPage(page, maxPages, maxIndex) {
                    return (maxIndex - (maxPages - page));
                }
                
                function getCatalog(filters) {
                    if (!softtion.isText($scope.ngFilter)) 
                        return $scope.suggestions; // No hay filtro
                    
                    if (softtion.isUndefined(filters)) 
                        return $scope.suggestions; // No hay parametros
                    
                    return $filter($scope.ngFilter)($scope.suggestions, $scope.ngFilterParam);
                }
                
                function updatePageList(list) {
                    if (!softtion.isArray(list)) { $scope.ngModel = []; return; }
                    
                    if (list.isEmpty()) { $scope.ngModel = []; return; }
                    
                    var end = ($scope.ngIndex + 1) * $scope.ngCount,
                        start = $scope.ngIndex * $scope.ngCount;
                                
                    $scope.ngModel = list.extract(start, end); // Página
                }
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
    
    Directives.ProgressBar.$inject = ["$progressBar"];
    
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
    
    Directives.ProgressButtonFloating.$inject = ["$progressFAB"];
    
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
    
    Directives.ProgressCircular.$inject = ["$progressCircular"];
    
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
        var inputBasic = softtion.html("input", false).
            addAttribute("type", "radio").
            addAttribute("ng-if", "!ngAdvanced").
            addAttribute("ng-model", "model").
            addAttribute("value", "{{value}}").
            addAttribute("name", "{{name}}").
            addAttribute("ng-disabled", "ngDisabled");
    
        var inputAdvanced = softtion.html("input", false).
            addAttribute("type", "radio").
            addAttribute("ng-if", "ngAdvanced").
            addAttribute("ng-model", "model").
            addAttribute("value", "{{value}}").
            addAttribute("name", "{{name}}").
            addAttribute("ng-value", "ngValue").
            addAttribute("ng-disabled", "ngDisabled");

        var label = softtion.html("label").setText("{{label}}").
            addAttribute("ng-click", "clickLabel($event)");

        var ripple = softtion.html("div").addClass("ripple-content").
            addChildren(softtion.html("div").addClass("box"));

        return inputBasic + inputAdvanced + label + ripple; // Componente
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
                ngAdvanced: "=?",
                ngValue: "=?",
                ngDisabled: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Componentes
                var input = $element.find("input[type='radio']");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.RADIOBUTTON);

                $scope.clickLabel = function ($event) { 
                    if ($scope.ngDisabled) return; // Desactivado
                    
                    $scope.model = $scope.ngValue || $scope.value; 
                    
                    input.focus(); input.click(); // Activando
                    
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
    
    Directives.Ripple.$inject = ["$materialConstant"];
    
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", 
                    "{active: selectActive, disabled: ngDisabled, \"label-inactive\": !isLabel}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("autocomplete", "off").
                addAttribute("ng-model", "valueInput").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-keydown", "keyDownInput($event)").
                addAttribute("ng-readonly", "true").
                addAttribute("ng-click", "toggleSuggestions()").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("focused-element", "focusedInput");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-if", "isLabel").
                addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]).
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}").
                addAttribute("ng-click", "clickLabel($event)");

        var button = softtion.html("button").addClass(Classes.ACTION).
                addChildren(
                    softtion.html("i").addClass("action-icon").setText("arrow_drop_down").
                        addAttribute("ng-class", "{active: showList}")
                ).
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("tabindex", "-1").
                addAttribute("ng-click", "toggleSuggestions()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        var list = softtion.html("ul").
                addAttribute("ng-class", "{show: showList, hide: !showList, higher: higher}").
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

        box.addChildren(description).addChildren(input).
            addChildren(lineBordered).addChildren(label).
            addChildren(value).addChildren(button).
            addChildren(spanHelper).addChildren(list);

        return content.create(); // Componente
    };  
    
    Directives.Select.$inject = ["$window", "$body"];
    
    function SelectDirective($window, $body) {
        return {
            restrict: "C",
            templateUrl: Directives.Select.ROUTE,
            scope: {
                ngModel: "=", 
                label: "@",
                ngItemsVisible: "=?",
                required: "=?",
                optional: "=?",
                key: "@keyDescription",
                suggestions: "=",
                ngDisabled: "=?",
                disabledAutoclose: "=?",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngAutostart: "=?",
                ngFormatDescription: "&",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var box = $element.find(".box"),
                    label = $element.find("label"), 
                    input = $element.find("input"),
                    button = $element.find("button"), 
                    buttonIcon = button.find("i"), 
                    list = $element.find("ul"),
                    value = $element.find(".value");
                    
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.SELECT),
                    eventID = "click.select-" + softtion.getGUID();
                
                $scope.$watch(() => { return $scope.suggestions; }, 
                    (newValue) => {
                        if (!softtion.isArray(newValue)) {
                            $scope.suggestions = []; return;
                        } // Los items de seleccion no es un Array
                        
                        if ($scope.suggestions.isEmpty()) return;
                        
                        if ($scope.ngAutostart && softtion.isUndefined($scope.ngModel))
                            $scope.ngModel = $scope.suggestions[0];
                    });
                    
                $scope.$watch(() => { return $scope.ngItemsVisible; }, 
                    (newValue, oldValue) => {
                        if (isNaN(newValue)) {
                            $scope.ngItemsVisible = softtion.isDefined(oldValue) ? oldValue : 6; return;
                        } // No fue definido correctamente el número
                        
                        $element.find("ul").css("max-height", $scope.ngItemsVisible * 42 + "px");
                    });

                $scope.showList = false; $scope.selectStart = false;
                $scope.old = undefined; // Seleccion anterior nula
                
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return (softtion.isDefined($scope.ngModel));
                };

                $scope.isActiveSuggestion = function (suggestion) {
                    return (suggestion === $scope.ngModel);
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.helperPermanent;
                };

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

                $scope.clickLabel = function ($event) { 
                    if (!$scope.ngDisabled) showSuggestions(); // Activo

                    $event.stopPropagation(); // Deteniendo propagación
                };

                $scope.focusInput = function ($event) { 
                    $scope.selectActive = true; // Elemento activo
                    listener.launch(Listeners.FOCUS, { $event: $event });
                };

                $scope.blurInput = function ($event) {
                    $scope.selectActive = false; // Elemento inactivo
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

                $scope.setSelection = function (suggestion, $event) {
                    var item = angular.element($event.currentTarget); // Elemento <li>

                    list.animate({ scrollTop: item[0].offsetTop }, 175, "standardCurve"); 

                    $scope.old = $scope.ngModel; $scope.ngModel = suggestion; 

                    hideSuggestions(); listener.launch(Listeners.CHANGED, { $event: $event }); 
                };

                $scope.clearSelection = function () {
                    $scope.ngModel = undefined; hideSuggestions(); listener.launch(Listeners.CLEAR);
                };

                $scope.getValueModel = function () {
                    if ($scope.isHolderActive()) return $scope.placeholder;
                    
                    return (!softtion.isDefined($scope.ngModel)) ? 
                        "" : $scope.describeSuggestion($scope.ngModel);
                };
                
                $scope.hideSuggestions = function () { hideSuggestions(); };

                function isBelongElement(target) {
                    return (label.is(target) || input.is(target) || 
                        value.is(target) || list.is(target)) || 
                        button.is(target) || buttonIcon.is(target) || $element.is(target);
                }

                function hideSuggestions() {
                    if ($scope.showList) listener.launch(Listeners.HIDE);
                    
                    $scope.showList = false; $scope.selectActive = false;
                }

                function showSuggestions() {
                    if (!$scope.selectStart && !$scope.disabledAutoclose)
                        $body.on(eventID, ($event) => {
                            if (!$scope.showList) return; // Lista cerrada
                            
                            $scope.$apply(() => { closeSelect($event); });
                        }); // Cerrado automatico
                    
                    setCoincidencesVisible(); $scope.selectStart = true; $scope.showList = true; 
                    $scope.selectActive = true; listener.launch(Listeners.SHOW);
                }
                
                function setCoincidencesVisible() {
                    var position = $element.offset(),
                        maxVisible = $scope.suggestions.length,
                        boxHeight = box.height(),
                        height = $window.innerHeight;
                
                    var bottomList = position.top + boxHeight + 8,
                        topList = position.top - 8;
                    
                    if (maxVisible > $scope.ngItemsVisible)
                        maxVisible = $scope.ngItemsVisible;
                
                    if ((bottomList + maxVisible * 42) < height - 8) {
                        $scope.higher = false;
                    } else if ((topList - maxVisible * 42) > 8) {
                        $scope.higher = true;
                    } else { $scope.higher = false; }
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("ng-class", 
                    "{active: selectActive, \"label-inactive\": !isLabel," +
                    " disabled: ngDisabled, empty: ngModel.isEmpty()}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("autocomplete", "off").
                addAttribute("ng-model", "valueInput").
                addAttribute("ng-click", "toggleSuggestions()").
                addAttribute("ng-blur", "blurInput($event)").
                addAttribute("ng-keydown", "keyDownInput($event)").
                addAttribute("ng-focus", "focusInput($event)").
                addAttribute("ng-readonly", "true").
                addAttribute("ng-disabled", "ngDisabled").
                addAttribute("ng-class", "{\"holder-hide\": !ngModel.isEmpty() || isLabel}").
                addAttribute("placeholder", "{{placeholder}}").
                addAttribute("focused-element", "focusedInput");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").setText("{{label}}").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-if", "isLabel").
                addAttribute("ng-click", "clickLabel($event)").addClass(["truncate"]).
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                ).addChildren(
                    softtion.html("span").addClass("optional").
                        setText("(opcional)").addAttribute("ng-if", "optional")
                );

        var chips = softtion.html("div").addClass("chips").
                addAttribute("ng-hide", "ngModel.isEmpty()").
                addChildren(
                    softtion.html("div").addClass("content").
                    addChildren(
                        softtion.html("div").addClass("chip").
                            addAttribute("ng-repeat", "item in ngModel").
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
                ).addAttribute("ng-disabled", "ngDisabled").
                addAttribute("ng-click", "toggleSuggestions()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        var list = softtion.html("ul").
                addAttribute("ng-class", "{show: showList, hide: !showList, higher: higher}").
                addChildren(
                    softtion.html("li").addClass(["truncate"]).
                        addAttribute("ng-repeat", "suggestion in suggestions").
                        addAttribute("tabindex", "-1").
                        addAttribute("ng-class", "{active: isItemChecked(suggestion)}").
                        addAttribute("ng-click", "checkedSuggestion(suggestion, $event)").
                        addChildren(
                            softtion.html("div").addClass("checkbox-readonly").
                                addAttribute("ng-active", "isItemChecked(suggestion)").
                                addAttribute("prevent-default", "true")
                        ).
                        addChildren(
                            softtion.html("span").setText("{{describeSuggestion(suggestion)}}")
                        )
                );

        box.addChildren(description).addChildren(input).
            addChildren(lineBordered).addChildren(label).addChildren(chips).
            addChildren(spanHelper).addChildren(button).addChildren(list);

        return content.create(); // Componente
    };
    
    Directives.SelectMultiple.$inject = ["$window", "$body"];
    
    function SelectMultipleDirective($window, $body) {
        return {
            restrict: "C",
            templateUrl: Directives.SelectMultiple.ROUTE,
            scope: {
                ngModel: "=", 
                label: "@",
                ngItemsVisible: "=?",
                required: "=?",
                optional: "=?",
                ngDisabled: "=?",
                key: "@keyDescription",
                suggestions: "=",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",
                ngFormatDescription: "&",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var box = $element.find(".box"), 
                    input = $element.find("input"), 
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

                $scope.ngModel = $scope.ngModel || [];

                $scope.ngModel.forEach((select) => {
                    if ($scope.suggestions.hasItem(select) && !temp.hasItem(select)) 
                        temp.push(select);
                });
                    
                $scope.$watch(() => { return $scope.ngItemsVisible; }, 
                    (newValue, oldValue) => {
                        if (isNaN(newValue)) {
                            $scope.ngItemsVisible = softtion.isDefined(oldValue) ? oldValue : 6; return;
                        } // No fue definido correctamente el número
                        
                        $element.find("ul").css("max-height", $scope.ngItemsVisible * 42 + "px");
                    });
                
                chips.displaceLeft(); // Permite deslizarse en Web

                $scope.showList = false; $scope.selectStart = false;
                $scope.ngModel = temp; // Estableciendo Lista real
                
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return !$scope.ngModel.isEmpty();
                };

                $scope.isHelperActive = function () {
                    return softtion.isArrayEmpty($scope.ngModel) || $scope.helperPermanent;
                };

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

                $scope.clickLabel = function ($event) { 
                    $scope.toggleSuggestions(); $event.stopPropagation();
                };

                $scope.focusInput = function ($event) { 
                    $scope.selectActive = true; // Elemento activo
                    listener.launch(Listeners.FOCUS, { $event: $event });
                };

                $scope.blurInput = function ($event) {
                    $scope.selectActive = false; // Elemento inactivo
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
                        $scope.ngModel.removeObject(suggestion);
                        listener.launch(Listeners.REMOVE, { $event: $event, $item: suggestion });
                    } else {
                        $scope.ngModel.push(suggestion);
                        listener.launch(Listeners.ADD, { $event: $event, $item: suggestion });
                    } // Se debe agregar a la lista de Selecciones

                    $event.stopPropagation(); // Deteniendo propagación
                };
                
                $scope.removeItem = function (suggestion, $event) {
                    $scope.ngModel.removeObject(suggestion);
                    listener.launch(Listeners.REMOVE, { $event: $event, $item: suggestion });

                    $event.stopPropagation(); // Deteniendo propagación
                };

                $scope.isItemChecked = function (suggestion) {
                    return $scope.ngModel.hasItem(suggestion);
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

                    $scope.showList = false; $scope.selectActive = false;
                }

                function showSuggestions() {
                    if ($scope.selectActive) return; // Componente activo
                    
                    if (!$scope.selectStart && !$scope.disabledAutoclose)
                        $body.on(eventID, ($event) => {
                            if (!$scope.showList) return; // Lista cerrada
                            
                            $scope.$apply(() => { closeSelect($event); });
                        }); // Cerrado automatico
                    
                    setCoincidencesVisible(); // Define orientacion visual
                    $scope.selectStart = true; $scope.showList = true; 
                    $scope.selectActive = true; listener.launch(Listeners.SHOW);
                }
                
                function setCoincidencesVisible() {
                    var position = $element.offset(),
                        maxVisible = $scope.suggestions.length,
                        boxHeight = box.height(),
                        height = $window.innerHeight;
                
                    var bottomList = position.top + boxHeight + 8,
                        topList = position.top - 8;
                    
                    if (maxVisible > $scope.ngItemsVisible)
                        maxVisible = $scope.ngItemsVisible;
                
                    if ((bottomList + maxVisible * 42) < height - 8) {
                        $scope.higher = false;
                    } else if ((topList - maxVisible * 42) > 8) {
                        $scope.higher = true;
                    } else { $scope.higher = false; }
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
    
    Directives.Sidenav.$inject = ["$sidenav"];
    
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
    
    SliderDirective.$inject = ["$timeout"];
    
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
                showcase: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) { 
                    // Componentes
                var $content = $element.find(".content"),
                    $trackOff = $content.find(".track"),
                    $thumb = $content.find(".thumb"),
                    $trackOn = $content.find(".track-on");

                    // Atributos
                var initialPosition, initialX, finalX, range, promise,
                    listener = new Listener($scope, Listener.KEYS.SLIDER);

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
                        var between = softtion.isBetween(newValue, $scope.minValue, $scope.maxValue);

                        if (!between) {
                            if (newValue < $scope.minValue) {
                                $scope.value = $scope.minValue; return;
                            } // Valor es menor que el rango definido
                            
                            if (newValue > $scope.maxValue) { 
                                $scope.value = $scope.maxValue; return;
                            } // Valor es mayor que el rango definido
                        }

                        $scope.valueInput = Math.round($scope.value);
                        listener.launch(Listeners.CHANGED); // Notificando cambio
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
    
    function StepperHorizontalDirective() {
        return {
            restrict: "C",
            link: function ($scope, $element) {
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
    
    Directives.Tabs.$inject = ["$timeout"];
    
    function TabsDirective($timeout) {
        return {
            restrict: "C",
            scope: {
                elementScroll: "@",
                ngListener: "&",
                disabledOverflow: "=?",
                positionScroll: "=?",
                disabledPositionStart: "=?"
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

                    var tab = angular.element($event.currentTarget),
                        position = tab.data("position");

                    if (tab.hasClass(Classes.ACTIVE)) return; // Esta activo

                    var attrs = getAttrsTab(tab); $element.addClass(Classes.ACTIVE);
                    
                    if ($element.hasClass(Classes.ALTERNATIVE))
                        attrs.left = attrs.left + 1; // Ajustando posición
                    
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
                    
                    if (position === 0) 
                        $element.animate({ scrollLeft: 0 }, 175, "standardCurve"); // Reubicando
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
    
    // Directiva: TextField
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextField = TextFieldDirective;
    
    Directives.TextField.NAME = "TextField";
    Directives.TextField.VERSION = "1.1.6";
    Directives.TextField.KEY = "textfield";
    Directives.TextField.ROUTE = "softtion/template/textfield.html";
    
    Directives.TextField.HTML = function () {
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class",
                "{active: inputActive, \"label-inactive\": !isLabel," +
                " disabled: ngDisabled, \"icon-action\": isIconAction || checkboxActive}"
            ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

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
                addAttribute("ng-readonly", "ngReadonly").
                addAttribute("ng-trim", "ngTrim").
                addAttribute("focused-element", "focusedInput").
                addAttribute("placeholder", "{{placeholder}}");

        var lineBordered = softtion.html("div").addClass("line-bordered");
        var lineShadow = softtion.html("div").addClass("line-shadow");

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-click", "clickLabel($event)").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
                setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                addAttribute("ng-click", "clickAction($event)");

        var checkBox = softtion.html("div").addClass("checkbox-control").
                addAttribute("ng-if", "checkboxActive").
                addAttribute("ng-model", "checkboxModel").
                addAttribute("ng-listener", "checkboxListener($model)");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-if", "isLabel").
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
                setText("{{helperText}}").addAttribute("ng-hide", "isHideHelper()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
                setText("{{getTextCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(input).
            addChildren(lineShadow).addChildren(iconAction).
            addChildren(checkBox).addChildren(label).addChildren(spanHelper).
            addChildren(spanError).addChildren(spanCounter);

        return content.create(); // Componente
    };
                    
    function TextFieldDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextField.ROUTE,
            scope: {
                ngModel: "=", 
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
                iconImg: "@",
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
    
    // Directiva: TextFieldMultiline
    // Version: 1.1.6
    // Update: 27/Feb/2018
    
    Directives.TextFieldMultiline = TextFieldMultilineDirective;
    
    Directives.TextFieldMultiline.NAME = "TextFieldMultiline";
    Directives.TextFieldMultiline.VERSION = "1.1.6";
    Directives.TextFieldMultiline.KEY = "textfieldMultiline";
    Directives.TextFieldMultiline.ROUTE = "softtion/template/textfield-multiline.html";
    
    Directives.TextFieldMultiline.HTML = function () {
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
            addAttribute("ng-class",
                "{active: areaActive, \"label-inactive\": !isLabel," +
                " disabled: ngDisabled, \"icon-action\": isIconAction || checkboxActive}"
            ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var textArea = softtion.html("textarea").
            addAttribute("ng-model", "area").
            addAttribute("autocomplete", "off").
            addAttribute("ng-click", "clickArea($event)").
            addAttribute("ng-blur", "blurArea($event)").
            addAttribute("ng-focus", "focusArea($event)").
            addAttribute("ng-keydown", "keydownArea($event)").
            addAttribute("ng-keyup", "keyupArea($event)").
            addAttribute("ng-readonly", "ngReadonly").
            addAttribute("ng-disabled", "ngDisabled").
            addAttribute("ng-trim", "ngTrim").
            addAttribute("ng-paste", "pasteArea($event)").
            addAttribute("focused-element", "focusedArea").
            addAttribute("style", "{{heightStyle()}}").
            addAttribute("placeholder", "{{placeholder}}");

        var lineBordered = softtion.html("div").addClass("line-bordered");
        var lineShadow = softtion.html("div").addClass("line-shadow");

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
            addAttribute("ng-click", "clickLabel($event)").
            addAttribute("ng-class", "{\"holder-active\": isHolderActive()}");

        var spanError = softtion.html("span").addClass(["error", "truncate"]).
            setText("{{errorText}}").addAttribute("ng-hide", "!errorActive");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
            setText("{{helperText}}").addAttribute("ng-hide", "hideHelperText()");

        var spanCounter = softtion.html("span").addClass(["counter", "truncate"]).
            setText("{{textCounter()}}").addAttribute("ng-if", "isCounterAllowed()");

        var textHidden = softtion.html("div").
            addClass("textarea-hidden").setText("{{valueHidden}}");

        box.addChildren(description).addChildren(value).
            addChildren(textArea).addChildren(lineBordered).
            addChildren(lineShadow).addChildren(label).
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
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                focusedArea: "=?",
                keyDisabled: "=?",
                clearModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                defineAreaComponent($scope, $element, $attrs);
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
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").addChildren(box).
                addAttribute("ng-class", 
                    "{\"icon-action\": isIconAction, \"label-inactive\": !isLabel}"
                );
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var input = softtion.html("input", false).
                addAttribute("type", "text").
                addAttribute("ng-readonly", "true").
                addAttribute("tabindex", "-1").
                addAttribute("ng-model", "value");

        var iconAction = softtion.html("i").addClass(Classes.ACTION).
                setText("{{iconAction}}").addAttribute("ng-if", "isIconAction").
                addAttribute("ng-click", "clickAction($event)");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").
                addAttribute("ng-class", "{active: isActiveLabel()}").
                addAttribute("ng-if", "isLabel").
                setText("{{label}}").addClass("truncate").
                addChildren(
                    softtion.html("span").setText("*").addAttribute("ng-if", "required")
                );

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        box.addChildren(description).addChildren(input).
            addChildren(iconAction).addChildren(lineBordered).
            addChildren(label).addChildren(spanHelper);

        return content.create(); // Componente
    };
    
    function TextFieldReadonlyDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.TextFieldReadonly.ROUTE,
            scope: {
                value: "=ngModel", 
                model: "@",
                label: "@",
                required: "=?",
                iconDescription: "@",
                iconImg: "@",
                iconAction: "@",
                helperText: "@",
                helperPermanent: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Atributos
                var listener = new Listener($scope, []);
                
                $element.on("click", ($event) => {
                    $scope.$apply(() => { listener.launch(Listeners.CLICK, { $event: $event }); });
                });
                
                defineInputField($scope, $element, $attrs, listener);
                
                $attrs.$observe("model", () => { $scope.value = $attrs.model; });
                
                $scope.isActiveLabel = function () {
                    return softtion.isDefined($scope.value);
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.value) || $scope.helperPermanent;
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
    
    function getPositionTooltip(params) {
        switch (params.position) {
            case ("top"): return getPositionTop(params);
                
            case ("right"): return getPositionRight(params);
                
            case ("left"): return getPositionLeft(params);
                
            default: return getPositionBottom(params);
        }
    }
    
    Directives.Tooltip.$inject = ["$tooltipContainer"];
    
    function TooltipDirective($container) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var tooltip = $container.add($attrs.tooltip),
                    p = tooltip.children("p"); // Insertando
            
                $element.data("tooltip-element", tooltip.getID());
                
                $attrs.$observe("tooltip", () => { p.text($attrs.tooltip); });

                $element.on("mouseover", () => {
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
                                width: $element.innerWidth(), height: $element.innerHeight()   
                            },
                            tooltip: {
                                width: tooltip.innerWidth(), height: tooltip.innerHeight()   
                            }
                        };

                    tooltip.css(getPositionTooltip(params));  // Posición
                });

                $element.on("mouseout", () => { tooltip.removeClass(Classes.SHOW); });
            
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
    
    // Directiva: View
    // Version: 1.0.0
    // Update: 03/Dic/2018
    
    Directives.View = ViewDirective;
    
    Directives.View.NAME = "View";
    Directives.View.VERSION = "1.0.0";
    Directives.View.KEY = "view";
    
    function ViewDirective() {
        return {
            restrict: "C",
            scope: {
                ngActive: "=?",
                ngModel: "=?",
                ngVisible: "=?"
            },
            link: function ($scope, $element) {
                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue) => {
                        if (softtion.isUndefined(newValue)) {
                            $element.removeClass(Classes.ACTIVE); return;
                        } // No se conoce parámetro de activación
                        
                        $scope.ngActive = ($scope.ngModel === $scope.ngVisible);
                    });
                    
                $scope.$watch(() => { return $scope.ngActive; }, 
                    (newValue) => {
                        (newValue) ? $element.addClass(Classes.ACTIVE) :
                            $element.removeClass(Classes.ACTIVE);
                    });
            }
        };
    }
    
    // Directiva: ViewsTabs
    // Version: 1.0.1
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
    
    // Directiva: YearPicker
    // Version: 1.0.0
    // Update: 05/Dic/2018
    
    Directives.YearPicker = YearPickerDirective;
    
    Directives.YearPicker.NAME = "YearPicker";
    Directives.YearPicker.VERSION = "1.0.0";
    Directives.YearPicker.KEY = "yearpicker";
    Directives.YearPicker.ROUTE = "softtion/template/yearpicker.html",
    
    Directives.YearPicker.HTML = function () {
        var list = softtion.html("ul").
                addChildren(softtion.html("li").setText("{{year}}").
                    addAttribute("ng-click", "select(year)").
                    addAttribute("ng-repeat", "year in years").
                    addAttribute("ng-class", "{active : isActive(year), selected: isSelected(year)}")
                );
        
        return list.create(); // Componente
    };
    
    function YearPickerDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.YearPicker.ROUTE,
            scope: {
                ngModel: "=",
                minDate: "=?",
                maxDate: "=?",
                ngRangeYear: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.YEARPICKER),
                    topNow = 0, disabledScroll = false; $scope.years = [];
                
                $scope.ngRangeYear = $scope.ngRangeYear || 5;
                
                $scope.$watch(() => { return $scope.ngModel; },
                    (newValue) => {
                        if (!softtion.isNumber(newValue)) {
                            if ($scope.years.isEmpty()) {
                                disabledScroll = true;  
                                $scope.years = defineYears(new Date().getFullYear()); 
                            }
                                
                            return; // Cargando años de manera predeterminada
                        } 
                        
                        disabledScroll = true; $scope.years = defineYears(newValue);
                    });
                    
                $scope.isActive = function (year) { 
                    return $scope.ngModel === year; // Año esta seleccionado
                };
                    
                $scope.isSelected = function (year) { 
                    return $scope.selected === year; // Año esta definido
                };
                
                $scope.select = function (year) {
                    $scope.ngModel = year; listener.launch(Listeners.SELECT);
                };
                
                $element.scroll(() => {
                    if (disabledScroll) return; // Función scroll inactiva
                    
                    $scope.$apply(() => {
                        var height = $element[0].clientHeight,
                            scrollTop = $element.scrollTop(), 
                            scrollHeight = $element[0].scrollHeight;
                        
                        if (scrollTop === (scrollHeight - height)) {
                            addYearsAfter();
                        } // Se llego al final de la lista
                        else if (scrollTop <= 20) {
                            if (scrollTop < topNow) addYearsBefore();
                        } // Se llego al comienzo de la lista
                        
                        if (scrollTop < 20) {
                            $element.scrollTop(20); topNow = 20;
                        } else {
                            topNow = scrollTop; // Actualizando posición
                        }
                    }); 
                });
                    
                function defineYears(year) {
                    var prevYears = [], nextYears = [],
                        maxYear = ($scope.maxDate) ? $scope.maxDate.getFullYear() : 10000,
                        minYear = ($scope.minDate) ? $scope.minDate.getFullYear() : 0;

                    for (var index = 0; index < $scope.ngRangeYear; index++) {
                        var nextYear = year + (index + 1), // Año siguiente
                            prevYear = year - $scope.ngRangeYear + index;

                        // Año anterior permitido para selección
                        if (prevYear >= minYear) prevYears.push(prevYear); 
                        
                        // Año siguiente permitido para selección
                        if (nextYear <= maxYear) nextYears.push(nextYear);
                    }
                        
                    topNow = ($scope.ngRangeYear - 3) * 40; $scope.selected = year;

                    $element.animate({ scrollTop: topNow }, {
                        duration: 100, complete: () => { disabledScroll = false; }
                    });

                    return prevYears.together([year]).together(nextYears); // Años selección
                }
                
                function addYearsBefore() {
                    var yearLimit = (softtion.isDate($scope.minDate)) ? 
                            $scope.minDate.getFullYear() : 0,

                        newYears = [], year = $scope.years.first(); // Primer año

                    for (var index = 0; index < $scope.ngRangeYear; index++) {
                        if ((year + index - 5) > yearLimit) newYears.push((year + index - 5));
                    } //  Cargando años anteriores del primero actual

                    if (!newYears.isEmpty()) $scope.years = newYears.together($scope.years);
                }
                
                function addYearsAfter() {
                    var yearLimit = (softtion.isDate($scope.maxDate)) ? 
                            $scope.maxDate.getFullYear() : 10000,
                                    
                        newYears = [], year = $scope.years.last(); // Ultimo año

                    for (var index = 1; index <= $scope.ngRangeYear; index++) {
                        if ((year + index) <= yearLimit) newYears.push((year + index));
                    } // Cargando años posteriores del último actual

                    if (!newYears.isEmpty()) $scope.years.together(newYears);
                }
            }
        };
    }
    
    // Directiva: YearPickerDialog
    // Version: 1.0.0
    // Update: 06/Dic/2018
    
    Directives.YearPickerDialog = YearPickerDialogDirective;
    
    Directives.YearPickerDialog.NAME = "YearPickerDialog";
    Directives.YearPickerDialog.VERSION = "1.0.0";
    Directives.YearPickerDialog.KEY = "yearpickerDialog";
    Directives.YearPickerDialog.ROUTE = "softtion/template/yearpicker-dialog.html",
                    
    Directives.YearPickerDialog.HTML = function () {
        var dialog = softtion.html("div").addClass(["dialog", "picker-year"]).
            addAttribute("ng-class", "{show: ngOpen}").
            addAttribute("ng-persistent", "true").
            addChildren(
                softtion.html("div").addClass("box").
                    addChildren(
                        softtion.html("div").addClass("header").
                            addChildren(
                                softtion.html("div").addClass("title").
                                    setText("{{getTitle()}}")
                            ).addChildren(
                                softtion.html("button").addClass("action").
                                    addAttribute("ng-click", "close()").
                                    addChildren(softtion.html("i").setText("close"))
                            )
                    ).
                    addChildren(
                        softtion.html("div").addClass("yearpicker").
                            addAttribute("ng-model", "ngModel").
                            addAttribute("ng-listener", "yearListener($model, $listener)").
                            addAttribute("min-date", "minDate").
                            addAttribute("max-date", "maxDate").
                            addAttribute("ng-range-year", "ngRangeYear")
                    )
            );

        return dialog.create(); // Componente
    };
    
    Directives.YearPickerDialog.$inject = ["$body", "$appContent"];
                    
    function YearPickerDialogDirective($body, $appContent) {
        return {
            restrict: "C",
            templateUrl: Directives.YearPickerDialog.ROUTE,
            scope: {
                ngModel: "=",
                ngOpen: "=",
                minDate: "=?",
                maxDate: "=?",
                ngRangeYear: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element) {
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.YEARPICKER);
                
                $element.appendTo($appContent); // Agregando en AppContent

                $scope.$watch(() => { return $scope.ngOpen; }, 
                    (newValue) => {
                        (!newValue) ? $body.removeClass(Classes.BODY_OVERFLOW_NONE) :
                            $body.addClass(Classes.BODY_OVERFLOW_NONE);
                    });

                $scope.getTitle = function () {
                    return softtion.isNumber($scope.ngModel) ? $scope.ngModel : "????";
                };

                $scope.yearListener = function ($model, $listener) {
                    $scope.ngOpen = false; $scope.ngModel = $model; listener.launch($listener);
                };
                
                $scope.close = function () { $scope.ngOpen = false; };
                
                $scope.$on("$destroy", () => { $element.remove(); });
            }
        };
    }
    
    // Directiva: YearPickerInput
    // Version: 1.0.0
    // Update: 06/Dic/2018
    
    Directives.YearPickerInput = YearPickerInputDirective;
    
    Directives.YearPickerInput.NAME = "YearPickerInput";
    Directives.YearPickerInput.VERSION = "1.0.0";
    Directives.YearPickerInput.KEY = "yearpickerInput";
    Directives.YearPickerInput.ROUTE = "softtion/template/yearpicker-input.html",
                    
    Directives.YearPickerInput.HTML = function () {
        var box = softtion.html("div").addClass("box");
        
        var content = softtion.html("div").addClass("content").
                addAttribute("tabindex", "0").
                addAttribute("ng-focus", "focusContent()").
                addAttribute("ng-blur", "blurContent()").
                addAttribute("ng-keypress", "keyPressContent($event)").
                addAttribute("focused-element", "focusedInput").
                addAttribute("ng-class", 
                    "{active: contentActive, disabled: ngDisabled, \"label-inactive\": !isLabel}"
                ).addChildren(box);
        
        var description = softtion.html("div").addClass("description").
                addAttribute("ng-click", "clickIconDescription($event)").
                addAttribute("ng-if", "isIconDescription || isIconImg").
                addChildren(
                    softtion.html("div").addClass("img-icon").
                        addAttribute("ng-if", "isIconImg").
                        addChildren(
                            softtion.html("img", false).addAttribute("ng-src", "{{iconImg}}")
                        )
                ).addChildren(
                    softtion.html("i").addAttribute("ng-if", "isIconDescription").
                        setText("{{iconDescription}}")
                );

        var value = softtion.html("pre").addClass(["value"]).
                setText("{{getValueModel()}}").
                addAttribute("ng-class", "{\"holder-active\": isHolderActive()}").
                addAttribute("ng-click", "showDialog($event)");

        var lineBordered = softtion.html("div").addClass("line-bordered");

        var label = softtion.html("label").
                setText("{{label}}").addClass("truncate").
                addAttribute("ng-if", "isLabel").
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
                addAttribute("ng-click", "clearYear()");

        var spanHelper = softtion.html("span").addClass(["help", "truncate"]).
                setText("{{helperText}}").addAttribute("ng-hide", "!isHelperActive()");

        var dialog = softtion.html("div").addClass("yearpicker-dialog").
                addAttribute("ng-model", "ngModel").
                addAttribute("ng-open", "ngOpen").
                addAttribute("ng-listener", "yearDialogListener($model, $listener)").
                addAttribute("min-date", "minDate").
                addAttribute("max-date", "maxDate").
                addAttribute("ng-range-year", "ngRangeYear");

        box.addChildren(description).addChildren(value).
            addChildren(lineBordered).addChildren(label).
            addChildren(buttonClear).addChildren(spanHelper);

        return content + dialog; // Componente
    };
    
    function YearPickerInputDirective() {
        return {
            restrict: "C",
            templateUrl: Directives.YearPickerInput.ROUTE,
            scope: {
                ngModel: "=",
                format: "@",
                label: "@",
                required: "=?",
                optional: "=?",
                ngDisabled: "=?",
                iconDescription: "@",
                iconImg: "@",
                placeholder: "@",
                helperText: "@",
                helperPermanent: "=?",
                focusedInput: "=?",

                minDate: "=?",
                maxDate: "=?",
                ngRangeYear: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                    // Componentes
                var content = $element.children(".content");
                
                    // Atributos
                var listener = new Listener($scope, Listener.KEYS.YEARPICKER);
                
                $scope.format = $scope.format || "ww, dd de mn del aa";
                $scope.ngOpen = false; // Dialog inicia oculto

                $scope.$watch(() => { return $scope.ngModel; }, 
                    (newValue, oldValue) => {
                        if (softtion.isUndefined(newValue)) return; // Indefindo
                        
                        if (!softtion.isDate(newValue)) $scope.ngModel = oldValue;
                    });
                    
                defineInputField($scope, $element, $attrs, listener);

                $scope.isActiveLabel = function () {
                    return (softtion.isNumber($scope.ngModel));
                };

                $scope.isHelperActive = function () {
                    return softtion.isUndefined($scope.ngModel) || $scope.helperPermanent;
                };

                $scope.isActiveClear = function () {
                    return !softtion.isDefined($scope.ngModel);
                };
                    
                $scope.focusContent = function () { $scope.contentActive = true; };
                    
                $scope.blurContent = function () { $scope.contentActive = false; };
                
                $scope.keyPressContent = function ($event) {
                    if ($event.originalEvent.which === KeysBoard.ENTER) 
                        showDialog($event); // Presiono ENTER
                    
                    if ($event.originalEvent.which === KeysBoard.SPACE) 
                        showDialog($event); // Presiono SPACE
                };

                $scope.getValueModel = function () {
                    if ($scope.isHolderActive()) return $scope.placeholder;
                    
                    return (!softtion.isNumber($scope.ngModel)) ? "" : $scope.ngModel;
                };

                $scope.showDialog = function ($event) { showDialog($event); };

                $scope.clickIconDescription = function ($event) {
                    listener.launch(Listeners.ICON, { $event: $event });
                };

                $scope.yearDialogListener = function ($model, $listener) {
                    content.focus(); $scope.ngModel = $model;
                    listener.launch($listener); // Reportando listener
                };

                $scope.clearYear = function () {
                    $scope.ngModel = undefined; listener.launch(Listeners.CLEAR);
                };
                
                function showDialog($event) {
                    if ($scope.ngDisabled) return; // Desactivado
                        
                    $scope.ngOpen = true; // Desplegando dialog
                    listener.launch(Listeners.SHOW, { $event: $event });
                }
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
        
        DropdownFactory.$inject = ["$body", "$appBody", "$appContent"];
        
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

                    if (settings.moveScroll) {
                        attrs.top -= parseInt($appContent.css("padding-top"));
                        attrs.top += $appContent.scrollTop(); 
                    }
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
                setFontOverline(fontFamily).setFontFamily(fontFamily);
            
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

        this.$get = ["$rootScope", "$body", fnProvider];

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
            classes = ["progress-bar", Classes.SHOW, Classes.INDETERMINATE];

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
    
    Providers.Snackbar.$inject = ["$materialConstant"];
    
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
                
                hideSnackbar(); $timeout(() => { self.show(text, options); }, 160);
            }
        };

        SnackBar.prototype.setDuration = function (duration) {
            $duration = isNaN(duration) ? $duration : duration; return this; 
        };

        SnackBar.prototype.setRounded = function (rounded) {
            (!rounded) ?
                snackbar.removeClass(Classes.ROUND) :
                snackbar.addClass(Classes.ROUND);
            
            return this; // Retornando interfaz fluida
        };
        
        SnackBar.prototype.setElevation = function (elevation) {
            (!elevation) ?
                snackbar.removeClass(Classes.ELEVATION) :
                snackbar.addClass(Classes.ELEVATION);
            
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

        this.$get = ["$rootScope", "$appBody", "$timeout", fnProvider];
    }
    
    // Proveedor: Toast
    // Version: 1.0.6
    // Update: 28/Feb/2018
    
    Providers.Toast = ToastProvider;
    
    Providers.Toast.NAME = "Toast";
    Providers.Toast.VERSION = "1.0.6";
    Providers.Toast.KEY = "$toast";
    
    Providers.Toast.$inject = ["$materialConstant"];
    
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

        Toast.prototype.setRounded = function (rounded) {
            (!rounded) ?
                toast.removeClass(Classes.ROUND) :
                toast.addClass(Classes.ROUND);
            
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

        this.$get = ["$appBody", "$timeout", fnProvider];
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
            var ID = "tooltip-" + softtion.getGUID(),
                html = softtion.html("div").
                    addAttribute("id", ID).
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

        function fnProvider($body, $windowResize, $window) { 
            var tooltipWR = "wr-tooltip-" + softtion.getGUID();
            
            widthWindow = $window.innerWidth; // Ancho de Window
            
            $windowResize.addListener(tooltipWR, (window) => {
                widthWindow = window.width(); // Nuevo ancho
            });
            
            return (instance = instance || new TooltipContainer($body));
        }       

        this.$get = ["$body", "$windowResize", "$window", fnProvider]; // Proveedor
    }
    
    // Proveedor: MaterialTheme
    // Version: 1.0.1
    // Update: 11/Mar/2019
    
    Providers.MaterialTheme = MaterialThemeProvider;
    
    Providers.MaterialTheme.NAME = "MaterialTheme";
    Providers.MaterialTheme.VERSION = "1.0.1";
    Providers.MaterialTheme.KEY = "$materialTheme";
    
    function MaterialThemeProvider() {
        
            // Atributos del proveedor
        var instance = null, palletes = {}, 
            properties = {
                fonts: {
                    dark: {
                        primary: "rgba(0, 0, 0, 0.87)",
                        secondary: "rgba(0, 0, 0, 0.54)",
                        disabled: "rgba(0, 0, 0, 0.38)"
                    },
                    light: {
                        primary: "rgba(255, 255, 255, 1)",
                        secondary: "rgba(255, 255, 255, 0.7)",
                        disabled: "rgba(255, 255, 255, 0.5)"
                    }
                },
                borders: {
                    dark: "rgba(0, 0, 0, 0.12)",
                    light: "rgba(255, 255, 255, 0.12)"
                },
                ripples: {
                    dark: "rgba(0, 0, 0, 0.38)",
                    light: "rgba(255, 255, 255, 0.5)"
                }
            };

        function MaterialTheme() { }
        
        MaterialTheme.prototype.createPallete = function (color) {
            return createPallete(color);
        };
        
        MaterialTheme.prototype.setPallete = function (key, pallete) { 
            palletes[key] = pallete; return this; 
        };
        
        MaterialTheme.prototype.getPallete = function (key) { return palletes[key]; };

        MaterialTheme.prototype.setTheme = function (theme, color) {
            var pallete = createPallete(color), keys = getKeys(theme);
            
            angular.forEach(pallete, (item, key) => {
                setPropertyStyle(keys.BASE + key, item.color); // Color base
                setPropertyStyle(keys.BORDER + key, item.borders);
                setPropertyStyle(keys.RIPPLE + key, item.ripples);
                
                setPropertyStyle(keys.FONT.PRIMARY + key, item.fonts.primary);
                setPropertyStyle(keys.FONT.SECONDARY + key, item.fonts.secondary);
                setPropertyStyle(keys.FONT.DISABLED + key, item.fonts.disabled);
            });
            
            setPropertyStyle(keys.BORDER_BASE, getHexToRgba(color)); // Color de borde
                        
            setPropertyStyle(keys.RIPPLE_BASE, getHexToRgba(color)); // Color de ripple
        };

        MaterialTheme.prototype.setBase = function (color) {
            this.setTheme("material", color);
        };

        MaterialTheme.prototype.setError = function (color) {
            this.setTheme("material", color);
        };
        
        function createPallete(color) {
            var pallete = {}; // Paleta de colores a generar
            
            var light = new ColorMaterial("#ffffff");
            var theme = new ColorMaterial(color);
            var dark  = ColorMaterial.multiply(theme.toRgb(), theme.toRgb());
            
            pallete["50"]  = getStructColor(light, theme, 12);
            pallete["100"] = getStructColor(light, theme, 24);
            pallete["200"] = getStructColor(light, theme, 56);
            pallete["300"] = getStructColor(light, theme, 75);
            pallete["400"] = getStructColor(light, theme, 87);
            pallete["500"] = getStructColor(light, theme, 100);
            pallete["600"] = getStructColor(dark, theme, 87);
            pallete["700"] = getStructColor(dark, theme, 64);
            pallete["800"] = getStructColor(dark, theme, 38);
            pallete["900"] = getStructColor(dark, theme, 12);
            
            return pallete; // Retornando paleta de colores generada
        }
        
        function getStructColor(base, color, value) {
            var result = ColorMaterial.mix(base._color, color._color, value);
            
            var struct = result.isLight() ? {
                    fonts: properties.fonts.dark,
                    borders: properties.borders.dark,
                    ripples: properties.ripples.dark
                } : {
                    fonts: properties.fonts.light,
                    borders: properties.borders.light,
                    ripples: properties.ripples.light
                };
                
            struct.color = result.toHexString(); return struct; // Resultado
        }
        
        function getKeys(name) {
            return {
                BASE: "--theme-" + name + "-",
                FONT: {
                    PRIMARY: "--theme-" + name + "-font-primary-",
                    SECONDARY: "--theme-" + name + "-font-secondary-",
                    DISABLED: "--theme-" + name + "-font-disabled-"
                },
                BORDER: "--theme-" + name + "-border-",
                BORDER_BASE: "--theme-" + name + "-border",
                RIPPLE: "--theme-" + name + "-ripple-",
                RIPPLE_BASE: "--theme-" + name + "-ripple"
            };
        }
        
        function getHexToRgba(hex, opacity) {
            opacity = opacity || "0.5"; // Opacidad del color
            
            var c = softtion.getHexToRgb(hex); // Rgb
            
            return "rgba("+c.r+", "+c.g+", "+c.b+", "+opacity+")" ;
        }
        
        function getInstance() {
            return (instance = instance || new MaterialTheme());
        }

        this.$get = function () { return getInstance(); };
        
        this.COLORS = getMaterialColors();

        this.setTheme = function (name, color) {
            instance = getInstance(); instance.setTheme(name, color); return this;
        };

        this.setBase = function (color) {
            instance = getInstance(); instance.setBase(color); return this;
        };

        this.setError = function (color) {
            instance = getInstance(); instance.setError(color); return this;
        };
        
        this.generatePallete = function (color) { 
            instance = getInstance(); return instance.createPallete(color); 
        };
        
        this.setPallete = function (key, pallete) { 
            instance = getInstance(); instance.setPallete(key, pallete); return this; 
        };
        
        this.getPallete = function (key) { 
            instance = getInstance(); return instance.getPallete(key); 
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
            case (Properties.NgBackground.NAME): return Properties.NgBackground;
            case (Properties.NgColor.NAME): return Properties.NgColor;
            case (Properties.NgFont.NAME): return Properties.NgFont;
            case (Properties.NgFa.NAME): return Properties.NgFa;
            case (Properties.NgMaterial.NAME): return Properties.NgMaterial;
            case (Properties.NgTheme.NAME): return Properties.NgTheme;
            case (Properties.RatioElement.NAME): return Properties.RatioElement;
            case (Properties.Sidenav.NAME): return Properties.Sidenav;
            case (Properties.Visibility.NAME): return Properties.Visibility;
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
    
    Properties.BottomSheet.$inject = ["$bottomSheet"];
    
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
    
    Properties.Dialog.$inject = ["$dialog"];
    
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
    
    Properties.Dropdown.$inject = ["$dropdown"];
    
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
    
    Properties.FocusedElement.$inject = ["$parse"];
    
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
    
    Properties.FormNavigation.$inject = ["$formNavigation"];
    
    function FormNavigationProperty($formNavigation) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var formNavigation = $formNavigation($attrs.formNavigation);
                
                $element.on("click", () => { formNavigation.show(); });
            }
        };
    }
    
    // Propiedad: NgBackground
    // Version: 1.0.2
    // Update: 12/Mar/2019
    
    Properties.NgBackground = NgBackgroundProperty;
    
    Properties.NgBackground.NAME = "NgBackground";
    Properties.NgBackground.VERSION = "1.0.2";
    Properties.NgBackground.KEY = "ngBackground";
    
    Properties.NgBackground.$inject = ["$materialTheme"];
    
    function NgBackgroundProperty($themes) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("ngBackground", () => {
                    if (!softtion.isText($attrs.ngBackground)) return;
                    
                    var properties = $attrs.ngBackground.split(":");

                    if (!properties.has(2)) return; // Formato incorrecto
                    
                    var pallete = $themes.getPallete(properties[0]);
                    
                    if (softtion.isUndefined(pallete)) {
                        pallete = $themes.createPallete(properties[0]);
                        $themes.setPallete(properties[0], pallete);
                    } // No se encontro la paleta de colores, cargando configuración
                    
                    $element.css("background-color", pallete[properties[1]].color); // Color
                });
            }
        };
    }
    
    // Propiedad: NgColor
    // Version: 1.0.2
    // Update: 12/Mar/2019
    
    Properties.NgColor = NgColorProperty;
    
    Properties.NgColor.NAME = "NgColor";
    Properties.NgColor.VERSION = "1.0.2";
    Properties.NgColor.KEY = "ngColor";
    
    Properties.NgColor.$inject = ["$materialTheme"];
    
    function NgColorProperty($themes) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("ngColor", () => {
                    if (!softtion.isText($attrs.ngColor)) return;
                    
                    var properties = $attrs.ngColor.split(":");

                    if (!properties.has(2)) return; // Formato incorrecto
                    
                    var pallete = $themes.getPallete(properties[0]);
                    
                    if (softtion.isUndefined(pallete)) {
                        pallete = $themes.createPallete(properties[0]);
                        $themes.setPallete(properties[0], pallete);
                    } // No se encontro la paleta de colores, cargando configuración
                    
                    $element.css("color", pallete[properties[1]].color); // Color
                });
            }
        };
    }
    
    // Propiedad: MaterialFont
    // Version: 1.0.2
    // Update: 12/Mar/2019
    
    Properties.NgFont = NgFontProperty;
    
    Properties.NgFont.NAME = "NgFont";
    Properties.NgFont.VERSION = "1.0.0";
    Properties.NgFont.KEY = "ngFont";
    
    function NgFontProperty() {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("ngFont", () => {
                    $element.css("font-family", $attrs.ngFont);
                });
            }
        };
    }
    
    // Propiedad: NgTheme
    // Version: 1.0.4
    // Update: 12/Mar/2019
    
    Properties.NgTheme = NgThemeProperty;
    
    Properties.NgTheme.NAME = "NgTheme";
    Properties.NgTheme.VERSION = "1.0.0";
    Properties.NgTheme.KEY = "ngTheme";
    
    Properties.NgTheme.$inject = ["$materialTheme"];
    
    function NgThemeProperty($themes) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("ngTheme", () => {
                    if (!softtion.isText($attrs.ngTheme)) return;
                    
                    var properties = $attrs.ngTheme.split(":");

                    if (!properties.has(2)) return; // Formato incorrecto
                    
                    var pallete = $themes.getPallete(properties[0]);
                    
                    if (softtion.isUndefined(pallete)) {
                        pallete = $themes.createPallete(properties[0]);
                        $themes.setPallete(properties[0], pallete);
                    } // No se encontro la paleta de colores, cargando configuración
                    
                    var theme = pallete[properties[1]]; // Item resultante
                    
                    $element.css("color", theme.fonts.primary);
                    $element.css("background-color", theme.color);
                });
            }
        };
    }
    
    // Propiedad: NgFa
    // Version: 1.0.0
    // Update: 10/Dic/2018
    
    Properties.NgFa = NgFaProperty;
    
    Properties.NgFa.NAME = "NgFa";
    Properties.NgFa.VERSION = "1.0.0";
    Properties.NgFa.KEY = "ngFa";
    
    function NgFaProperty() {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var icon = undefined; $element.addClass("fa");
                
                $attrs.$observe("ngFa", () => {
                    if (!softtion.isText($attrs.ngFa)) return;
                    
                    if (softtion.isText(icon)) $element.removeClass(icon);
                    
                    icon = "fa-" + $attrs.ngFa; $element.addClass(icon);
                });
            }
        };
    }
    
    // Propiedad: NgMaterial
    // Version: 1.0.0
    // Update: 11/Mar/2019
    
    Properties.NgMaterial = NgMaterialProperty;
    
    Properties.NgMaterial.NAME = "NgMaterial";
    Properties.NgMaterial.VERSION = "1.0.0";
    Properties.NgMaterial.KEY = "ngMaterial";
    
    function NgMaterialProperty() {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                $attrs.$observe("ngMaterial", () => {
                    if (!softtion.isText($attrs.ngMaterial)) return; // Definido
                    
                    $element.addClass("theme-material " + $attrs.ngMaterial);
                });
            }
        };
    }
    
    // Propiedad: RatioElement
    // Version: 1.0.0
    // Update: 22/Sep/2018
    
    Properties.RatioElement = RatioElementProperty;
    
    Properties.RatioElement.NAME = "RatioElement";
    Properties.RatioElement.VERSION = "1.0.0";
    Properties.RatioElement.KEY = "ratioElement";
    
    Properties.RatioElement.$inject = ["$materialService"];
    
    function RatioElementProperty($materialService) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                
                $attrs.$observe("ratioElement", () => { 
                    $element.css("height", getValueHeight()); 
                });
                
                $element.resize(() => {
                    $element.css("height", getValueHeight()); 
                });
                
                function getValueHeight() {
                    return $element.width() * $materialService.getValueRatio($attrs.ratioElement);
                }
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
    
    Properties.Sidenav.$inject = ["$sidenav"];
    
    function SidenavProperty($sidenav) {
        return {
            restrict: "A",
            link: function ($scope, $element, $attrs) {
                var sidenav = $sidenav($attrs.sidenav);
                
                $element.on("click", () => { sidenav.show(); });
            }
        };
    }
    
    // Propiedad: Visibility
    // Version: 1.0.0
    // Update: 19/Nov/2018
    
    Properties.Visibility = VisibilityProperty;
    
    Properties.Visibility.NAME = "Visibility";
    Properties.Visibility.VERSION = "1.0.0";
    Properties.Visibility.KEY = "ngVisibility";
    
    function VisibilityProperty($sidenav) {
        return {
            restrict: "A",
            multiElement: true,
            link: function ($scope, $element, $attrs) {
                console.log("HOLA");
                
                $scope.$watch(() => { 
                    return $attrs.ngVisibility;
                }, (newValue) => {
                    console.log(newValue);
                });
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
    
    function defineInputField($scope, $element, $attrs, listener) {
                    
        $attrs.$observe("iconDescription", () => {
            $scope.isIconDescription = softtion.isText($attrs.iconDescription);
        });
                    
        $attrs.$observe("iconImg", () => {
            $scope.isIconImg = softtion.isText($attrs.iconImg);
        });
                    
        $attrs.$observe("iconAction", () => {
            $scope.isIconAction = softtion.isText($attrs.iconAction);
        });
                    
        $attrs.$observe("label", () => {
            $scope.isLabel = softtion.isText($attrs.label);
        });
        
        $scope.isHolderActive = function () {
            return $scope.inputActive ? false : $scope.isLabel ? 
                false : softtion.isUndefined($scope.ngModel);
        };

        $scope.clickIconDescription = function ($event) {
            if ($scope.ngDisabled) return; // Componente inactivo

            listener.launch(Listeners.ICON, { $event: $event });
        };
                
        $scope.clickAction  = function ($event) {
            if ($scope.ngDisabled) return; // Componente inactivo

            listener.launch(Listeners.ACTION, { $event: $event });
        };
    }
    
    function defineInputComponent($scope, $element, $attrs) {
            // Atributos
        var listener = new Listener($scope, Listener.KEYS.INPUT);

        $scope.$watch(() => { return $scope.clearModel; }, 
            (newValue) => {
                if (newValue === true) {
                    $scope.ngModel = undefined; $scope.input = ""; 
                    $scope.clearModel = false;
                }
            });

        $scope.$watch(() => { return $scope.autocomplete; }, 
            (newValue) => {
                $scope.autocompleteValue = (newValue) ? "on" : "off";
            });
        
        $scope.$watch(() => { return $scope.ngModel; }, 
            (newValue, oldValue) => { 
                if (!$scope.inputStart) return; // Componente iniciado
                
                if (newValue !== oldValue) listener.launch(Listeners.CHANGED);
                
                if ($scope.errorActive) validateValue(newValue);
                
                if (!$scope.inputActive) {
                    if (softtion.isText(newValue)) {
                        $scope.ngModel = ($scope.ngUppercase) ?
                            newValue.toUpperCase() : ($scope.ngLowercase) ?
                            newValue.toLowerCase() : newValue;   
                    } // Se verifica si debe ser UpperCase o LowerCase
                    
                    $scope.input = (softtion.isUndefined(newValue)) ? "" : newValue;
                } else {
                    if (softtion.isUndefined(newValue)) return;
                    
                    if (!(newValue === $scope.input)) $scope.input = newValue;
                } // Verificando si el texto del input es diferente
            });
            
        $scope.$watch(() => { return $scope.input; }, 
            (newValue) => {
                if ($scope.inputStart) return; // Componente iniciado
                
                if (softtion.isUndefined($scope.ngModel) && softtion.isText(newValue)) 
                    $scope.ngModel = newValue; // Asignando nuevo valor
            });
            
        defineInputField($scope, $element, $attrs, listener);

        // Atributos de control
        $scope.minLength = (isNaN($scope.minLength)) ? -1 : $scope.minLength;

        $scope.typeInput = getTypeInput($scope.type || "text"); 
        $scope.input = ""; $scope.errorActive = false; $scope.inputActive = false; 
        $scope.viewPassword = false; $scope.inputStart = false;

        if ($scope.type === "password") {
            $scope.iconAction = "visibility"; $scope.isIconAction = true;
        } // Se debe activar el icono de acción para password
        
        $scope.isActiveLabel = function () {
            return ($scope.inputActive) ? true : isDefinedModel();
        };
        
        $scope.isHolderActive = function () {
            return $scope.inputActive ? false : $scope.isLabel ? false : !isDefinedModel();
        };

        $scope.isCounterAllowed = function () {
            return $scope.counterVisible && (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
        };
        
        $scope.isHideHelper = function () {
            return $scope.errorActive || (isDefinedModel() && !$scope.inputActive);
        };

        $scope.getTextCounter = function () {
            var text = ($scope.inputActive) ? $scope.input : (isDefinedModel()) ? 
                    $scope.ngModel.toString() : $scope.input;
                    
            if (softtion.isUndefined(text)) text = "";

            return text.length + "/" + $scope.maxLength; // Descripción
        };

        $scope.clickLabel = function () { $scope.focusedInput = true; };

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
        
        $scope.checkboxListener = function ($checked) {
            $scope.checkboxModel = $checked; // Estado del checkbox
            listener.launch(Listeners.CHECKBOX, { $checked: $checked });
        };

        $scope.clickInput = function ($event) {
            listener.launch(Listeners.CLICK, { $event: $event });
        };

        $scope.focusInput = function ($event) {
            if (softtion.isDefined($scope.ngModel)) // Model => Input
                $scope.input = $scope.ngModel.toString();
            
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
            if (softtion.isDefined($scope.input)) {
                $scope.input = softtion.getValueString($scope.type, $scope.input);
                
                if (!isNaN($scope.maxLength)) {
                    $scope.input = $scope.input.substr(0, $scope.maxLength);
                } // Reestringiendo nuevo caracter
            } // El valor está definido en el componente
            
            defineModelKeyupInput(); listener.launch(Listeners.KEY_UP, { $event: $event });
        };

        $scope.getValueModel = function () {
            if ($scope.isHolderActive()) return $scope.placeholder; // Placeholder
            
            var value = (softtion.isDefined($scope.ngModel)) ? $scope.ngModel : $scope.input;
            
            if (softtion.isDefined(value)) {
                if (($scope.type === "password") && !$scope.viewPassword) {
                    value = convertToPassword(value.length);
                } else {
                    var format = $scope.ngFormatValue({$model: value, $value: String(value)});

                    if (softtion.isDefined(format)) value = format;
                } // Verificando formato establecido en el componente de texto
            } else { value = ""; } // Valor indefinido 

            return value; // Retornando el valor a mostrar
        };
        
        function defineModelKeyupInput() {
            (validateValue($scope.input, !$scope.errorActive)) ?
                defineModel() : setValueModel(undefined);
        }
        
        function isDefinedModel() {
            switch ($scope.type) {
                case (TextType.INTEGER):
                    return softtion.isDefined($scope.ngModel) && !isNaN($scope.ngModel);
                
                case (TextType.MONEY):
                    return softtion.isDefined($scope.ngModel) && !isNaN($scope.ngModel);
                
                case (TextType.MATH):
                    return softtion.isDefined($scope.ngModel) && !isNaN($scope.ngModel);

                case (TextType.DECIMAL): 
                    return softtion.isDefined($scope.ngModel) && !isNaN($scope.ngModel);

                case (TextType.EMAIL): 
                    return softtion.isText($scope.ngModel) || softtion.isText($scope.input);

                default: 
                    return (softtion.isText($scope.ngModel));
            } // Verificando depediendo del tipo de dato a manipular
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
            $scope.ngModel = value; // Definiendo Model
        }

        function verifyModelBlur() {
            if (validateValue($scope.input)) $scope.input = ""; // Todo correcto
            
            if (softtion.isText($scope.ngModel)) {
                $scope.ngModel = ($scope.ngUppercase) ?
                    $scope.ngModel.toUpperCase() : ($scope.ngLowercase) ?
                    $scope.ngModel.toLowerCase() : $scope.ngModel;   
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
            
            var result = { 
                    success: softtion.getSuccessString($scope.type, value) 
                };
            
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
    
    function defineAreaComponent($scope, $element, $attrs) {
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
        $scope.errorActive = false;
                    
        $attrs.$observe("iconDescription", () => {
            $scope.isIconDescription = softtion.isText($attrs.iconDescription);
        });
                    
        $attrs.$observe("iconImg", () => {
            $scope.isIconImg = softtion.isText($attrs.iconImg);
        });
        
        $attrs.$observe("label", () => {
            $scope.isLabel = softtion.isText($attrs.label);
        });
        
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
                    if (softtion.isUndefined(newValue)) $scope.countEnter = 0;
                    
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

        $scope.isCounterAllowed = function () {
            return $scope.counterVisible && (!isNaN($scope.maxLength)) && ($scope.maxLength > 0);
        };

        $scope.textCounter = function () {
            var text = ($scope.areaActive) ? $scope.area : 
                    (softtion.isText($scope.value)) ? $scope.value.toString() : $scope.area;
                    
            if (softtion.isUndefined(text)) text = "";

            return text.length + "/" + $scope.maxLength; 
        };
        
        $scope.isHolderActive = function () {
            return $scope.areaActive ? false : $scope.isLabel ? 
                false : softtion.isUndefined($scope.ngModel);
        };
        
        $scope.hideHelperText = function () {
            return $scope.errorActive || (softtion.isText($scope.value) && !$scope.areaActive);
        };

        $scope.clickLabel = function () {
            if (!$scope.ngReadonly) area.focus(); // Area enfocable
        };

        $scope.clickIconDescription = function ($event) {
            if ($scope.ngDisabled) return; // Componente inactivo

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
            $scope.areaStart = true; // Inicio de proceso
            
            listener.launch(Listeners.FOCUS, { $event: $event });
        };

        $scope.blurArea = function ($event) {
            $scope.pressEnter = false; $scope.countEnter = 0;
            $scope.real = false; $scope.areaActive = false; 
            
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
        
        $scope.pasteArea = function ($event) {
            listener.launch(Listeners.PASTE, { $event: $event });
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

        function setAreaError(message, disabledError) {
            if (disabledError) return; // No se requiere activación
            
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
            { key: "$model", value: "ngModel" }, { key: "$old", value: "old" }, 
            { key: "$value", value: "input" }, { key: "$select", value: "select" }
        ],
        
        CHECKBOX: [{ key: "$model", value: "checked" }],
        
        CHIP_INPUT: [
            { key: "$model", value: "ngModel" }, { key: "$value", value: "input" }
        ],
        
        CLOCKPICKER: [{ key: "$model", value: "ngModel" }],

        DATEPICKER: [{ key: "$model", value: "ngModel" }],
        
        YEARPICKER: [{ key: "$model", value: "ngModel" }],

        FILECHOOSER: [{ key: "$model", value: "file" }],

        FILECHOOSER_MULTIPLE: [{ key: "$model", value: "files" }],

        INPUT: [
            { key: "$model", value: "ngModel" }, { key: "$value", value: "input" }
        ],

        RADIOBUTTON: [{ key: "$model", value: "model" }],

        RATING: [{ key: "$model", value: "value" }],

        SELECT: [
            { key: "$model", value: "ngModel" }, { key: "$old", value: "old" }
        ],

        SLIDER: [{ key: "$model", value: "value" }],

        SELECT_MULTIPLE: [{ key: "$model", value: "ngModel" }],

        TEXTAREA: [
            { key: "$model", value: "value" }, { key: "$value", value: "area" }
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
    
    softtionMaterialService.$inject = [
        "$window", "$timeout", "$body", "$appContent", "$materialConstant"
    ];
    
    function softtionMaterialService(
            $window, $timeout, $body, $appContent, $constants) {
        
        var service = this, // Objeto del servicio
            oldHeight = 0,
            enabledKeyBoard = false;
        
        service.enabledKeyboardMobileScroll = enabledKeyboardMobileScroll;
        service.getValueRatio = getValueRatio;
        
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
        
        function getValueRatio(ratio) {
            switch (ratio) {
                case ($constants.RATIOS.W1_H1.KEY): 
                    return $constants.RATIOS.W1_H1.VALUE;

                case ($constants.RATIOS.W3_H4.KEY): 
                    return $constants.RATIOS.W3_H4.VALUE;

                case ($constants.RATIOS.W4_H3.KEY): 
                    return $constants.RATIOS.W4_H3.VALUE;

                case ($constants.RATIOS.W3_H2.KEY): 
                    return $constants.RATIOS.W3_H2.VALUE;

                case ($constants.RATIOS.W8_H5.KEY): 
                    return $constants.RATIOS.W8_H5.VALUE;
                    
                case ($constants.RATIOS.W16_H9.KEY): 
                    return $constants.RATIOS.W16_H9.VALUE;

                default: return $constants.RATIOS.W1_H1.VALUE; 
            }
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
            
            RATIOS: {
                W1_H1: { KEY: "1:1", VALUE: 1 },
                W3_H4: { KEY: "3:4", VALUE: 4/3 },
                W4_H3: { KEY: "4:3", VALUE: 3/4 },
                W3_H2: { KEY: "3:2", VALUE: 2/3 },
                W8_H5: { KEY: "8:5", VALUE: 5/8 },
                W16_H9: { KEY: "16:9", VALUE: 9/16 }
            },

            THEMES: {
                RED: "RED",
                PINK: "PINK",
                PURPLE: "PURPLE",
                DEEP_PURPLE: "DEEP_PURPLE",
                INDIGO: "INDIGO",
                BLUE: "BLUE",
                LIGHT_BLUE: "LIGHT_BLUE",
                DARK_BLUE: "DARK_BLUE",
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
                BLACK: "BLACK",
                CRANE_PURPLE: "CRANE_PURPLE",
                CRANE_RED: "CRANE_RED",
                SHRINE_PINK: "SHRINE_PINK",
                RALLY_GREEN: "RALLY_GREEN"
            }
        };
    }
    
    function getMaterialColors() {
        return {
            RED: "#f44336",
            PINK: "#e91e63",
            PURPLE: "#9c27b0", 
            DEEP_PURPLE: "#673ab7",
            INDIGO: "#3f51b5", 
            BLUE: "#2196f3",
            LIGHT_BLUE: "#03a9f4",
            DARK_BLUE: "#0059b7", 
            CYAN: "#00bcd4",
            TEAL: "#009688",
            GREEN: "#4caf50", 
            LIGHT_GREEN: "#8bc34a", 
            LIME: "#cddc39", 
            YELLOW: "#ffeb3b", 
            AMBER: "#ffc107", 
            ORANGE: "#ff9800", 
            DEEP_ORANGE: "#ff5722", 
            BROWN: "#795548", 
            GREY: "#9e9e9e",
            BLUE_GREY: "#607d8b", 
            BLACK: "#00020b", 
            CRANE_PURPLE: "#ab035d",
            CRANE_RED: "#ff2a2a",
            SHRINE_PINK: "#ff814f",
            RALLY_GREEN: "#00ac6a"
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
                if (softtion.isDefined(component.route)) 
                    $templateCache.put(component.route, component.html());
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