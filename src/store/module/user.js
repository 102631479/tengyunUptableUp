import {
  login,
  getPermission,
  getUserInfo,
  LogOut
} from '@/api/platform-auth'

export default {
  state: {
    userInfo: {},
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: '',
    access: [],
    hasGetInfo: false,

    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId(state, id) {
      state.userId = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setMessageUnreadList(state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList(state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList(state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore(state, {
      msg_id,
      content
    }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg(state, {
      from,
      to,
      msg_id
    }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin({
      commit
    }, {
      userName,
      password
    }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        commit('setToken', 'asdsdsad')
        resolve()
        return
        login({
          userName,
          password
        }).then(res => {
          commit('setToken', res.data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        LogOut({
          account: state.userInfo.userCode
        }).then(d => {
          console.log('退出登录')

        }).catch(e => {
            this.$Message.error(e.message)
        })
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        // commit('setAvatar', '123')
        // commit('setUserName', '123')
        // commit('setUserId', '123')
        // commit('setHasGetInfo', true)
        // resolve()
        // return 
        getPermission().then(d => {
          // console.log(d);
          // commit('setAccess', d.data.menuCodeList)
        })

        getUserInfo().then(res => {
          // console.log(res);
          const data = {
            avatar: '',
            name: '',
            user_id: '',
            access: []
          }
          commit('setAvatar', data.avatar)
          commit('setUserName', data.name)
          commit('setUserId', data.user_id)
          commit('setHasGetInfo', true)
          resolve(data)
        }).catch(err => {
          reject(err)
        })

      })
    }

  }
}
