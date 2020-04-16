
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = Schema({
		//_id lo pone de forma automatica
		name: String,
		students: [{ type: Schema.ObjectId, ref: 'Student' }]
});

//module.exports = mongoose.model('Subject', SubjectSchema);

export const Subject = mongoose.model('Subject', SubjectSchema);