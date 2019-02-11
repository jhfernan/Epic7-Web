
export const state = () => ({
	available: false,
	timeout: 3000,
	text: ''
})

export const mutations = {
	set_true (state, text) {
		state.text = text
		state.available = true
	},
	set_false (state) {
		state.available = false
	},
}

export const actions = {
	showSnack ({ commit, dispatch }, text) {
		commit('set_true', text)
		dispatch('timeOut')
	},

	toggleSnack ({ commit }) {
		commit('set_false')
	},

	timeOut ({ commit }) {
		setTimeout(() => {
			 commit('set_false')
		}, 3000)
	}
}
