'use strict'

var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var PeliculasSchema = Schema({
    titulo: String,
    director: String,
    duracionHoras: Number,
    añoLanzamiento: Number,
    productora: String,
    precio: Number
});

module.exports = mongoose.model('peliculas',PeliculasSchema);