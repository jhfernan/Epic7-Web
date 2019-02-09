const express = require('express')
const router = express.Router()

const heroes = require('./heroes')
const users = require('./users')

// Add API routes
router.use(heroes)
router.use(users)

module.exports = router
