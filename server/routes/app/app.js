const express = require('express')
const router = express.Router()

const util = require('../../middleware/utilities')

// Home page
router.get('/', util.async(async (req, res, next) => {
	res.send('Epic Seven Community API Home page')
}))

// router.get('/info/:type', util.async(async (req, res, next) => {
// 	res.json(require(`../../public/mock/${req.params.type}.json`))
// }))

module.exports = router
