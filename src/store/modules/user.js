import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
// import {
//   resetRouter
// } from '@/router/index'



const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    
    //ServeIp: '172.16.1.191',
    //ServeIp: '172.16.1.181',
    //
    // ServeIp: '10.10.10.77',
    //
    // ServeIp: '10.10.10.31',
    // ServeIp: '127.0.0.1',
        // localStorage.setItem('serip',played.ServeIp)
    // localStorage.setItem('serport',played.ServePort)
    // ServeIp: localStorage.getItem('serip'),
    // ServePort: localStorage.getItem('serport'),
    ServeIp: '222.222.99.133',
    ServePort: '8888',

    // ServeIp: '172.16.21.79',  
    // ServePort: '4444',

    // ServeIp: '192.168.1.10',  
    // ServePort: '8888',

  }


}

const state = getDefaultState()

const mutations = {

  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // state, ServeIp
  SET_ServeIp(state,played)  {
    console.log(played,'playedplayedplayedplayed');
    state.ServeIp=played.ServeIp
    state.ServePort=played.ServePort
    // localStorage.setItem('serip',played.ServeIp)
    // localStorage.setItem('serport',played.ServePort)
    // state.ServeIp = ServeIp
  },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {
          data
        } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {
          name,
          avatar
        } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },


resetServeIp( conxtxt,dandan) {
setTimeout(() => {
  conxtxt.commit('SET_ServeIp',dandan) 
}, 1000);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
