
app.config(function ($materialThemeProvider) {
    
    $materialThemeProvider.register("blueOil", {
        50:   "#e1e7ec",
        100:  "#b5c3d0",
        200:  "#839bb1",
        300:  "#517392",
        400:  "#2C557a",
        500:  "#073763",
        600:  "#06315b",
        700:  "#052a51",
        800:  "#042347",
        900:  "#021635",
        A100: "#6d97ff",
        A200: "#3a73ff",
        A400: "#074fff",
        A700: "#0044ec",
        baseColor: "light"
    });
    
    var black = {
        50:   "#e1e0e0",
        100:  "#b3b3b3",
        200:  "#818080",
        300:  "#4e4d4d",
        400:  "#282626",
        500:  "#020000",
        600:  "#020000",
        700:  "#010000",
        800:  "#010000",
        900:  "#010000",
        A100: "#a6a6a6",
        A200: "#8c8c8c",
        A400: "#737373",
        A700: "#666666",
        baseColor: "light"
    };
});


var processFile = function (file) {
        var reader = new FileReader();

        reader.onloadstart = function ($event) {
            // En Inicio
        };  

        reader.onload = function ($event) {
            // Cargando
        };

        reader.onloadend = function ($event) {
            // Fin de la carga
        };

        reader.onprogress = function ($event) {
            // En progreso
        };

        reader.onerror = function (event) {
            // Error
        };

        reader.onabort = function (event) {
            // Cancelar
        };

        $timeout(function () { reader.readAsDataURL(file); }, 500);

        return reader; // Retornando procesador de Archivo
    };