let config = {
	db: 'mongodb://localhost:27017/epic7',
	secret: 'ButByTheGraceOfGGodIAmWhatIAm,AndHisGraceTowardMeWasNotInVain.'
}

if (process.env.NODE_ENV == 'production') {
	config.db = process.env.MONGODB_URI
	config.secret = process.env.SECRET
}

module.exports = config
