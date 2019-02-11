export const state = () => ({
	minivariant: true
})

export const mutations = {
	set_true(state) {
		state.minivariant = true
	},
	set_false(state) {
		state.minivariant = false
	}
}

export const actions = {
	setState({ commit }, bool) {
		bool ? commit("set_true") : commit("set_false")
	}
}
