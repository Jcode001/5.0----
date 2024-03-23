import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,

  },
  plugins: [
    // veux持久化配置
    createPersistedState({
      key: 'rabbitstore-client',
      paths: ['user.ServeIp','user.ServePort']
    })
  ],

  getters
})
export default store
