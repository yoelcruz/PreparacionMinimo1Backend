import { Localization } from '../models/localization';

// Métodos de prueba
function home(req: any, res: any){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS de localizationes'
	});
}

async function getLocalizations(req:any, res:any) {
    console.log('Entramos en getSubjects');
    const localizations = await Localization.find().exec();       
    return res.status(200).send(localizations);
}

// Registro
function saveLocalization(req: any, res: any){
	const params = req.body;
    const localization = new Localization();
    console.log('cuerpo de localizacion', req.body);
    
    localization.densidadPoblacional = params.densidadPoblacional;
	if(params.name && params.estado && params.latitud && params.longitud) {

		localization.name = params.name;
		localization.estado = params.estado;
        localization.latitud = params.latitud;
        localization.longitud = params.longitud;
		// Controlar usuarios duplicados
		Localization.find({ $or: [       
					{name: localization.name.toLowerCase()},
			]}).exec((err: any, localizations: any) => {
				if(err) return res.status(500).send({message: 'Error en la peticion de localizaciones'});

				if(localizations && localizations.length >= 1){
					return res.status(201).send({message: 'La localizacion que intentas registrar ya existe!!'});
				}else{
                    localization.save((err: any, localizationStored: any) => {
                        if(err) return res.status(500).send({message: 'Error al guardar la localizacion'});
                        if(localizationStored){
                            res.status(200).send({localization: localizationStored});
                        }else{
                            res.status(404).send({message: 'No se ha registrado la localizacion'});
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

async function modifyLocalization(req:any, res:any) {
    const localizationName = req.params.name;
    const params = req.body;
    console.log('body:',params);

    console.log('El nombre de la localizacion que vamos a modificar:', localizationName);
    const localizationAActualizar = await Localization.findOne({ name: localizationName }).exec(); 
    if(!localizationAActualizar){
        return res.status(404).send({message: 'La localizacion no existe'});
    }
    console.log('La localizacion a actualizar:', localizationAActualizar);

    localizationAActualizar.densidadPoblacional = params.densidadPoblacional;
    if(params.name && params.estado && params.latitud && params.longitud) {

		localizationAActualizar.name = params.name;
		localizationAActualizar.estado = params.estado;
        localizationAActualizar.latitud = params.latitud;
        localizationAActualizar.longitud = params.longitud;
        console.log('La localizacion actualizada:', localizationAActualizar);

        localizationAActualizar.save((err: any, localizationStored: any) => {
            if(err) return res.status(500).send({message: 'Error al guardar la localizacion'});
            if(localizationStored){
                res.status(200).send({localization: localizationStored});
            }else{
                res.status(404).send({message: 'No se ha registrado la localizacion'});
            }
        });	

	}else{
		res.status(400).send({
			message: 'Envía todos los campos necesarios!!'
		});
	}
 }
 
module.exports = {
    home,
    getLocalizations,
    saveLocalization,
    modifyLocalization
}