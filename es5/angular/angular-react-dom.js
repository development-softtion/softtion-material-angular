
/*
 Angular React DOM Virtual v1.0.0
 (c) 2016 - 2019 Softtion Developers
 https://material.softtion.com.co
 License: MIT
 Created: 02/Abr/2019
 Updated: 22/Abr/2019
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
                ngRender: "=?",
                ngModel: "=?",
                ngProps: "=?",
                ngListener: "&"
            },
            link: function ($scope, $element, $attrs) {
                var Component; // Clase React.Component de la directiva
                
                $attrs.$observe("ngVdcollection", function () {
                    if (softtion.isUndefined(Component)) start();
                });
                
                $scope.$watch(function () { return $scope.ngRender; }, 
                    function (newValue) { 
                        if (newValue) {
                            render($scope.ngModel); $scope.ngRender = false;
                        } // Forzando a repintar componente
                    });
                
                $scope.$watchCollection(function () { return $scope.ngModel; }, 
                    function (newValue) { render(newValue); });
                
                function start() {
                    Component = eval($attrs.ngVdcollection);
                }
                
                function render(newValue) {
                    var props = { data: newValue, attrs: $scope.ngProps, scope: $scope };
                    
                    ReactDOM.render(React.createElement(Component, props, null), $element[0]);
                }
            }
        };
    }
    
    angular.module("ngReactDOM", []).directive(NgVDCollection.KEY, NgVDCollection);
})(window, window.angular, window.softtion);

// Class ComponentVDOM

(function () {
    !function (fnGlb) {        
        var glb = (typeof window !== "undefined") ? window : 
            (typeof global !== "undefined") ? 
                global : typeof self !== "undefined" ? self : undefined;
                
        if (glb) glb.ComponentVDOM = fnGlb(window.softtion); // Se definió
    }(function (softtion) {
        
        Class.Inherits(ComponentVDOM, React.Component);
        
        function ComponentVDOM(props) {
            Class.CallCheck(this, ComponentVDOM);

            Class.ConstructorReturn(
                this, (ComponentVDOM.__proto__ || Object.getPrototypeOf(ComponentVDOM)).call(this, props)
            );
        }

        var functions = [{ key: "callbackListener", value: callbackListener }];

        Class.Create(ComponentVDOM, functions);
        
        function callbackListener($event, $data) {
            var $scope = this.props.scope; // Scope del controlador

            if (softtion.isDefined($scope))
                $scope.$apply(function () { 
                    $scope.ngListener({ $event: $event, $data: $data }); 
                });
        }

        return ComponentVDOM; // Retornando clase ComponentVDOM
    });
})();