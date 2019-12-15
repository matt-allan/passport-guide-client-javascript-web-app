export const state = () => {
  return {
    auth: null,
    user: null
  }
}
export const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },

  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  async fetchUser({ commit, state }) {
    if (state.user) {
      return Promise.resolve(state.user)
    }

    const user = await this.$axios.$get(`${process.env.PASSPORT_URL}/api/user`)
    commit('setUser', user)
  }
}
