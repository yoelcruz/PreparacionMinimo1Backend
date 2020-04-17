import { Subject } from '../models/subject';
import { Student } from '../models/student';

async function getSubjects(req:any, res:any) {
    console.log('Entramos en getSubjects');
    const subjects = await Subject.find().exec();
    //const subjects = await Subject.find().populate('students').exec();        
    return res.status(200).send(subjects);
 }

 async function getSubject(req:any, res:any) {
    const subjectName = req.params.name; //.params es cuando el valor se lo paso en el enlace /name, y .query es escribiendolo en params (en el postman)
    const subject = await Subject.findOne({ name: subjectName }).populate('students').exec();       
    return res.status(200).send(subject);
 }

// Registro
function saveSubject(req: any, res: any){
	const params = req.body;
    const subject = new Subject();
    console.log(req.body);
	if(params.name) {

		subject.name = params.name;
		
		// Controlar usuarios duplicados
		Subject.find({ $or: [{name: subject.name}]})       //findOne no funciona¿?¿?¿?¿?¿?¿?¿? $or ¿?¿?¿?¿?¿?¿?¿?¿?
			.exec((err: any, subjects: any) => {
				if(err) return res.status(500).send({message: 'Error en la peticion de asignaturas'});

				if(subjects && subjects.length >= 1){
					return res.status(201).send({message: 'La asignatura que intentas registrar ya existe!!'});
				}else{
                    subject.save((err: any, subjectStored: any) => {  //subjectStored objeto guardado de db (la confirmacion de que todo ha ido bien)
                        if(err) return res.status(500).send({message: 'Error al guardar la asignatura'});
						//console.log('studentStored', studentStored);
                        if(subjectStored){
                            res.status(200).send({subject: subjectStored});
                        }else{
                            res.status(404).send({message: 'No se ha registrado la asignatura'});
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

async function addStudents(req:any, res:any) {
    
    const subjectName = req.params.name;
    const students = req.body.students;
    const subject = await Subject.findOne({name: subjectName}).exec();
	
    if(!subject){
        return res.status(404).send();  //not found
    }
    console.log(students);
    students.forEach((studentId: string) => {
        console.log(studentId);
        const found = subject.students.find((id: string) =>{
            return id == studentId;
        })
        if(!found){
            subject.students.push(studentId);
        }        
    });
    const result = await subject.save();
    return res.status(200).send(result);
 }

async function deleteSubject(req: any, res: any){
	var subjectName = req.params.name; //id de la asignatura que vamos a eliminar
    console.log('La asignatura que vamos a eliminar', subjectName);
    try {
        const subject = await Subject.findOneAndDelete({ name: subjectName }).exec(); 
        if(!subject){
            return res.status(404).send({message: `La asignatura ${subjectName} no existe`});
        } 
        return res.status(200).send({message: 'La asignatura se ha eliminado'});
    } catch (error) {
        return res.status(500).send({message: 'Error al borrar la asignatura'});
    }
}


module.exports = {
    getSubjects,
    getSubject,
    saveSubject,
    addStudents,
    deleteSubject
}