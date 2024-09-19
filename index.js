'use strict'

var application = require('./application');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/parcial1web")
    .then(
        () => {
            console.log("Conexion establecida");
            application.listen(9898, function(){
                console.log("aplicacion iniciada")
            })
        },
        err => {
            console.log("Conexion con DB fallida");
        }
    );
    