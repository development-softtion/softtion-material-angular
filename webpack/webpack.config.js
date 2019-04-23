
var version = "1.0.0";

// webpack.config.js 
module.exports = {
    entry: {
        "core-softtion": [
            "./softtion/es5/lib/softtion.js",
            "./softtion/es5/lib/softtion-sqlite.js"
        ],
        "jquery-softtion": [
            "./softtion/es5/jquery/jquery-softtion.js"
        ],
        "angular-softtion": [
            "./softtion/es5/angular/angular-softtion.js",
            "./softtion/es5/angular/angular-softtion-events.js",
            "./softtion/es5/angular/angular-softtion-material.js",
            "./softtion/es5/angular/angular-react-dom.js"
        ]
    },
    output: {
        filename: "[name]-" + version + ".min.js",
        path: __dirname + "/build"
    }
};