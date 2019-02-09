const mongoose = require('mongoose')

const statsObject = {
	_id: false,
	attack: Number,
	health: Number
}

const ArtifactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Artifact name is required',
		trim: true,
		unique: [true, 'The artifact name has already been created']
	},

	stars: {
		type: Number,
		required: 'Number of stars is required'
	},

	description: String,

	descriptionBase: String,
	descriptionMax: String,

	exclusiveType: {
		type: String,
		enum: ['warrior', 'knight', 'thief', 'ranger', 'mage', 'soul weaver', 'none']
	},

	base: statsObject,
	max: statsObject,

	recommended: {
		_id: false,
		pve: String,
		pvp: String,
		notes: String
	}
})

const Artifact = mongoose.model('Artifact', ArtifactSchema)
module.exports = Artifact
