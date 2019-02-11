import gravatar from "gravatar"

export default {
	// Helpers
	avatar: (email, size = 70) => {
		return gravatar.url(email, { s: size, r: "x", d: "mm" }, true);
	},
	catchErrors: (err, message, store) => {
		err.response
			? store.dispatch(
					"snack/showSnack",
					`${err.response.data.status}: ${err.response.data.message}`
				)
			: store.dispatch("snack/showSnack", message);
	},

	color: score => {
		if (score >= 9.5) {
			return 'blue--text'
		} else if (score >= 8) {
			return 'green--text'
		} else if (score <= 6) {
			return 'red--text'
		} else {
			return ''
		}
	},

	// Form rules
	rules: {
		confirmPassword: password => {
			return [
				v => !!v || "This is required",
				v => v === password || "Password does not match"
			];
		},
		email: [
			v => !!v || "E-mail is required",
			v => /.+@.+/.test(v) || "E-mail must be valid"
		],
		emailNotRequired: [v => /.+@.+/.test(v) || !v || "E-mail must be valid"],
		max: length => {
			return [
				v =>
					(v && v.length <= length) ||
					!v ||
					`Must be less than ${length} characters`
			];
		},
		mi: [
			v => (v && v.length < 2) || !v || "Middle initial must be one character"
		],
		name: [
			v => !!v || "This is required",
			v => (v && v.length <= 15) || "Name must be 15 characters or less"
		],
		required: [v => !!v || "This is required"],
		selectOne: [
			v => (v && v.length > 0) || "You must select at least one choice"
		],
		usernamePassword: [
			v => !!v || "This is required",
			v =>
				(v && v.length <= 20 && v.length >= 5) ||
				"Must be between 5 and 20 characters"
		]
	}
}
