
var express = require('express');
var SubjectController = require('../controllers/subject');

var server = express.Router();

//crear asignaturas????????????
//que un estudiante pueda matricularse??????
server.get('/', SubjectController.getSubjects);
server.get('/:name', SubjectController.getSubject);
server.post('/create', SubjectController.saveSubject);
server.put('/:name/addStudents', SubjectController.addStudents);
server.delete('/:name/delete', SubjectController.deleteSubject);

module.exports = server;