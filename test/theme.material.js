
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