
// Inicializando aplicación AngularJS
var app = angular.module("myApp", ["ngSofttionMaterial"]);

app.config(function ($themeMaterialProvider, SofttionMaterial) {
    $themeMaterialProvider.setPrimary(SofttionMaterial.Theme.INDIGO);

    $themeMaterialProvider.setSecondary(SofttionMaterial.Theme.PINK);

    $themeMaterialProvider.setError(SofttionMaterial.Theme.LIME);
});

// Inicializando controlador de la aplicación
app.controller("myController", function ($scope, $snackbar, $toast, $progressBar) {
    
    var x = 0;
    
    $scope.openSnackbar = function ($event, value) {
        x += 25;
        $progressBar.set("#x").show();
        $snackbar.show("Soy un snackbar");
        //console.log($scope.file);
    };
    
    $scope.openToast = function ($event, value) {
        $toast.show("Soy un toast");
    };
    
    $scope.removeFiles = function ($event) {
        $scope.xxxx = undefined; $event.stopPropagation();
    };
    
    $scope.showFiles = function () {
        $scope.xxxx = "DANIEL ANDRES CASTILLO PEDROZA";
    };
});