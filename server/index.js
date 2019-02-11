const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Express Server Settings and Routes
const appConfig = require('./config')
const general = require('./routes/app/index')
const apiV1 = require('./routes/v1/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', general)
app.use('/api/v1', apiV1)

// Establish Mongodb connection with mongoose
mongoose.connect(appConfig.db, { useCreateIndex: true, useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	// require('./seed.js')
	console.log('Successfully connected to mongo db!')
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
	// Init Nuxt.js
	const nuxt = new Nuxt(config)

	const {
		host = process.env.HOST || '127.0.0.1',
		port = process.env.PORT || 3000
	} = nuxt.options.server

	// Build only in dev mode
	if (config.dev) {
		const builder = new Builder(nuxt)
		await builder.build()
	}

	// Give nuxt middleware to express
	app.use(nuxt.render)

	// Listen the server
	app.listen(port, host)
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	})
}

start()
