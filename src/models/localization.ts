
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalizationSchema = Schema({
		//_id lo pone de forma automatica
		name: String,
		estado: String,
        densidadPoblacional: String,
        latitud: String,
        longitud: String
});

//module.exports = mongoose.model('Student', StudentSchema);

export const Localization = mongoose.model('Localization', LocalizationSchema);