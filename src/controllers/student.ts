
//let Subject1 = require('../models/subject'); //Subject1????????? no me deja poner Subject pq ya está declarado en el controller de subject

import { Student } from '../models/student';

// Métodos de prueba
function home(req: any, res: any){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

function pruebas(req: any, res: any){
	console.log(req.body);
	res.status(200).send({
		message: 'Acción de pruebas en el servidor de NodeJS'
	});
}

// Registro
function saveStudent(req: any, res: any){
	const params = req.body;
    const student = new Student();
	console.log(req.body);
	if(params.name && params.address && params.studies && params.phones) {

		student.name = params.name;
		student.address = params.address;
        student.studies = params.studies;
        student.phones = params.phones;
		// Controlar usuarios duplicados
		Student.find({ $or: [       //findOne no funciona¿?¿?¿?¿?¿?¿?¿?
					{name: student.name.toLowerCase()},
					//{phone: student.phones}
			]}).exec((err: any, students: any) => {
				if(err) return res.status(500).send({message: 'Error en la peticion de estudiantes'});

				if(students && students.length >= 1){
					return res.status(201).send({message: 'El estudiante que intentas registrar ya existe!!'});
				}else{
                    student.save((err: any, studentStored: any) => {
                        if(err) return res.status(500).send({message: 'Error al guardar el estudiante'});
						//console.log('studentStored', studentStored);
                        if(studentStored){
                            res.status(200).send({student: studentStored});
                        }else{
                            res.status(404).send({message: 'No se ha registrado el estudiante'});
                        }
                    });
				}
			});	

	}else{
		res.status(400).send({
			message: 'Envía todos los campos necesarios!!'
		});
	}
}


async function getStudents(req:any, res:any) {
    console.log('req:', req.query);
	let studies = req.query.studies.split(',');  //.query es escribiendolo en Params (en el postman)
	//studies.sort();    ¿?¿?¿?¿?¿?¿?¿       $in
    if(studies.length === 0){
        return res.status(400);  //bad request
    }
    if(studies.length ===1){  //con la funcion $in puede que esta parte no sea necesaria
        studies = studies[0];
    }
    console.log('studies:', studies);
  
	const students = await Student.find({studies}).exec();  //telecos,sistema Ok, ¿¿¿sistema,telecos???  
	//console.log('student', students);
    return res.status(200).send(students);
 }
 /* Student.find({
    'studies': { $in: theStudies.split(',') }
} */



async function deleteStudent(req: any, res: any){
	var studentName = req.params.name; //id del estudiante que vamos a eliminar
    console.log('El estudiante que vamos a eliminar', studentName);
    try {
        const student = await Student.findOneAndDelete({ name: studentName }).exec(); 
        if(!student){
            return res.status(404).send({message: `El estudiante ${studentName} no existe`});
        } 
        return res.status(200).send({message: 'El estudiante se ha eliminado'});
    } catch (error) {
        return res.status(500).send({message: 'Error al borrar el estudiante'});
    }
}

module.exports = {
    home,
    pruebas,
    saveStudent,
	getStudents,
	deleteStudent
}