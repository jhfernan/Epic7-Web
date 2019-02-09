const express = require('express')
const router = express.Router()

const Hero = require('../../models/hero')

const auth = require('../../middleware/auth')
const util = require('../../middleware/utilities')

const defFilter = { __v: 0 }
const defSort = { sort: { createdAt: 1 }}

// Heroes all and create routes
router.route('/heroes')
.get(util.async(async (req, res, next) => {
	const heroes = await Hero.find({}, defFilter, defSort)
		// .populate('recommended._artifact', defFilter)
		// .populate('recommended._artifactAlt', defFilter)
	res.json(heroes)
}))
.post(auth.checkToken, util.async(async (req, res, next) => {
	const hero = await Hero.create(req.body)
	res.json(hero)
}))

// Hero details, update and delete routes
router.route('/heroes/:id')
.put(auth.checkToken, util.async(async (req, res, next) => {
	const hero = await Hero.findById(req.params.id, defFilter)
	hero.set(req.body)
	hero.save((err, updatedHero) => {
		if (err) {
			next(err)
		}
		res.json(updatedHero)
	})
}))

module.exports = router
