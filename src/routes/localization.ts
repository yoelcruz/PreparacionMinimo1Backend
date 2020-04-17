
var express = require('express'); //var aquí pq si pongo const me da error al no estar dentro de una funcion
var LocalizationController = require('../controllers/localization');

var server = express.Router();

server.get('/home', LocalizationController.home);
server.get('/', LocalizationController.getLocalizations);
server.post('/create', LocalizationController.saveLocalization);
server.put('/:name', LocalizationController.modifyLocalization);


/* server.get('/pruebas', StudentController.pruebas);
server.post('/create', StudentController.saveStudent); //
server.get('/', StudentController.getStudents);  //se le tiene que pasar la titulación en .query
server.delete('/:name/delete', StudentController.deleteStudent);  //comprobar que funcione!!! */


module.exports = server;