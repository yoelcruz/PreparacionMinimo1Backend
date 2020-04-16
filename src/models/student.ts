
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = Schema({
		//_id lo pone de forma automatica
		name: String,
		address: String,
		phones: Array,
		//phones: {type: Schema.home, ref: 'Phone'},
		studies: Array
});

//module.exports = mongoose.model('Student', StudentSchema);

export const Student = mongoose.model('Student', StudentSchema);