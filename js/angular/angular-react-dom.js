
/*
 Angular DOM Vitual v1.0.0
 (c) 2016 - 2019 Softtion Developers
 http://material.softtion.com.co
 License: MIT
 Created: 02/Abr/2019
*/

(function (window, angular, softtion) {
    
    var NgVDCollection = NgVDCollectionDirective;
    
    NgVDCollection.NAME = "NgVDCollection";
    NgVDCollection.VERSION = "1.0.0";
    NgVDCollection.KEY = "ngVdcollection";
    
    function NgVDCollectionDirective() {
        return {
            restrict: "A",
            scope: {
                ngModel: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                var Component; // Clase React.Component de la directiva
                
                $attrs.$observe("ngVdcollection", () => {
                    if (softtion.isUndefined(Component)) start();
                });
                
                $scope.$watchCollection(() => { return $scope.ngModel; }, 
                    (newValue) => { render(newValue); });
                
                function start() {
                    Component = eval($attrs.ngVdcollection);
                }
                
                function render(newValue) {
                    var props = { data: newValue, listener: $scope.ngListener };
                    
                    ReactDOM.render(
                        React.createElement(Component, props, null), $element[0]
                    );
                }
            }
        };
    }
    
    angular.module("ngReactDOM", []).directive(NgVDCollection.KEY, NgVDCollection);
})(window, window.angular, window.softtion);