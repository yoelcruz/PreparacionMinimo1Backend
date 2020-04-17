var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar rutas
var student_routes = require('./routes/student');
var subject_routes = require('./routes/subject');
var localization_routes = require('./routes/localization');


// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Cors

// Rutas
app.use('/students', student_routes);
app.use('/subjects', subject_routes);
app.use('/localizations', localization_routes);


// Exportar
module.exports = app;