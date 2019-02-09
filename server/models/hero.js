const mongoose = require('mongoose')

const statsObject = {
	_id: false,
	cp: Number,
	attack: Number,
	health: Number,
	speed: Number,
	defense: Number,
	critChance: Number,
	critDamage: Number,
	dualChance: Number,
	effectiveness: Number,
	effectResist: Number
}

const HeroSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Hero name is required',
		trim: true,
		unique: [true, 'The hero name has already been created']
	},

	stars: {
		type: Number,
		required: 'Number of stars is required'
	},

	class: {
		type: String,
		enum: ['warrior', 'knight', 'thief', 'ranger', 'mage', 'soul weaver']
	},

	element: {
		type: String,
		enum: ['ice', 'fire', 'earth', 'dark', 'light']
	},

	max: statsObject,
	maxAwakened: statsObject,

	score: {
		_id: false,
		arena: Number,
		hunt: Number,
		abyss: Number,
		raid: Number
	},

	recommended: {
		_id: false,
		sets: String,
		_artifact: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Artifact'
		},
		_artifactAlt: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Artifact'
		},
		notes: String
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
})

const Hero = mongoose.model('Hero', HeroSchema)
module.exports = Hero
