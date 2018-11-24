import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  loading: {
    progress: {
      status: false,
    },
    notify: {
      status: false,
      icon: '',
      message: null
    }
  },
  token: localStorage.getItem('token') || '', // debe ser dinamico
  auth: {
    isLoggedIn: !!localStorage.getItem("token")
  },
  user: {},
  messageLine: [],
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  isLoggedIn: (state, payload) => {
    state.auth.isLoggedIn = true
    state.token = localStorage.setItem('token', payload)
  },
  logout: (state, payload) => {
    state.token = []
    if (state.auth.isLoggedIn) {
      state.auth.isLoggedIn = false
      localStorage.removeItem('token')
      location.reload();
    }
  },
  setLoading: (state, payload) => {
    if (payload['progress']) {
      state.loading['progress']['status'] = payload['progress']['status'];
    } else if (payload['notify']) {
      state.loading['notify']['status'] = payload['notify']['status'];
      state.loading['notify']['icon'] = payload['notify']['icon'];
      state.loading['notify']['message'] = payload['notify']['message'];
    }
  },
  setUser: (state, payload) => {
    localStorage.removeItem('user');
    if (payload['user'] != null) {
      localStorage.setItem('user', JSON.stringify(payload['user']));
    }
    if (payload['lang'] != null) {
      state.user['lang'] = payload['lang'];
      localStorage.setItem('user', JSON.stringify(state.user));
    }
    state.user = JSON.parse(localStorage.getItem('user')); // modulo usuario
  },
  setToken: (state, payload) => {
    state.token = [];
    localStorage.removeItem('token');
    if (payload['success']) {
      state.token = payload['result']['token'];
      localStorage.setItem('token', JSON.stringify(payload['result']['token']));
    } else {
      this.logout();
    }
  },
  push(state, payload) {
    return state.messageLine.push(payload);
  },
  shift(state) {
    return state.messageLine.shift();
  },  
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  isSetRoles: ({ commit }) => commit('isSetRoles'),
  signIn: ({ commit }, payload) => {
    // save
    // localStorage.setItem('token', payload);
    commit('isLoggedIn', payload);
  },
  setLoading: ({ commit }, payload) => commit('setLoading', payload),
  setUser: ({ commit, getters }, payload) =>  commit('setUser', payload),
  logout: ({ commit }) => commit('logout'),
  setToken: ({ commit }) => {
    let url = `${process.env.API_URL}/auth/refresh`;
    return axios(url, {
      method: "get",
      withCredentials: true
    })
      .then(resp => commit('setToken', resp.data))
      .catch(err => commit('setToken', err.response.data));
  },
}

// getters are functions
const getters = {
  isLoggedIn: (state) => state.auth.isLoggedIn,
  getLoading: (state) => state.loading.progress.status,
  getNotify: (state) => state.loading.notify,
  token: (state) => state.token,
  getUser: (state) => state.user,
  getBtnLoading: (state) => state.btnLoading,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})