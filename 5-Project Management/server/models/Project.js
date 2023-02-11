const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ['Not Started', 'In Progress', 'Completed'],
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
	},
});

module.exports = mongoose.model('Project', ProjectSchema);
