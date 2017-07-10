

// Inicializando aplicación AngularJS
var app = angular.module("myApp", ["ngSofttionMaterial"]);

app.config(function ($themeMaterialProvider, SofttionMaterial) {
    $themeMaterialProvider.setPrimary(SofttionMaterial.Theme.DEEP_ORANGE);

    $themeMaterialProvider.setSecondary(SofttionMaterial.Theme.INDIGO);

    $themeMaterialProvider.setError(SofttionMaterial.Theme.LIME);
});

// Inicializando controlador de la aplicación
app.controller("myController", function ($scope, $snackbar, $toast, $progressCircular, $progressFAB) {
    
    $scope.maxDate = new Date(2017,6,15);
    var xc = false; $progressCircular.refreshInstance();
    
    
    $scope.libros = [
        { id: 1, nombre:"Programación Java", detail: "Es un framework basado en la construcción", precio: 5000 },
        { id: 2, nombre:"Programación PHP", detail: "Es un framework basado en la construcción", precio: 3000, active: true },
        { id: 3, nombre:"Softtion Material", detail: "Es un framework basado en la construcción", precio: 1000 }
    ];
    
    $scope.testFunction = function ($selection) {
        console.log($selection);
    };
    
    $scope.testBlur = function ($value) {
        console.log($value);
    };
    
    $scope.openSnackbar = function ($event, value) {
        $snackbar.show("Soy un snackbar"); 
    };
    
    $scope.openToast = function ($event, value) {
        $toast.show("Soy un toast"); 
    };
    
    $scope.removeFiles = function ($event) {
    };
    
    $scope.showFiles = function () {
        $scope.events.addEvent($scope.dateEvent, {
            description: $scope.detailEvent
        });
    };
});