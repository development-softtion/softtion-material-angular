
// Inicializando aplicación AngularJS
var app = angular.module("myApp", ["ngSofttionMaterial"]);

app.config(function ($themeMaterialProvider, SofttionMaterial) {
    $themeMaterialProvider.setPrimary(SofttionMaterial.Theme.ORANGE);
    
    $themeMaterialProvider.setSecondary(SofttionMaterial.Theme.TEAL);
    
    $themeMaterialProvider.setError(SofttionMaterial.Theme.BLUE);
});

// Inicializando controlador de la aplicación
app.controller("myController", function ($scope, $snackbar, $toast) {
    
    $scope.openSnackbar = function ($event, value) {
        $snackbar.show("Soy un snackbar");
    };
    
    $scope.openToast = function ($event, value) {
        $toast.show("Soy un toast");
    };
});

