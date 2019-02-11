let config = {
	auth: {
		cookie: {
			options: {
				path: "/",
				secure: false
			},
			prefix: "auth"
		},
		localStorage: false,
		redirect: {
			login: "/login",
			logout: "/login",
			home: "/home"
		},
		resetOnError: true,
		strategies: {
			local: {
				endpoints: {
					login: {
						url: "/api/authenticate",
						method: "post",
						propertyName: "token"
					},
					logout: false,
					user: {
						url: "/api/authenticate",
						method: "get",
						propertyName: "user"
					}
				}
			}
		}
	},

	axios: {
		progress: true
	},

	middleware: []
	// socket: 'http://localhost:8000',
}

if (process.env.NODE_ENV == "production") {
	config.auth.cookie.options.secure = true
	config.middleware = ["redirect-ssl"]
	// config.socket = 'https://example-cb-api.herokuapp.com/'
}

module.exports = config
