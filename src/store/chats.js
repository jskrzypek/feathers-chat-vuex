export default {
  namespaced: true,
  state: {
    chats: {},
    currentName: null
  },
  getters: {
    chats: state => state.chats,
    currentName: state => state.currentName,
    names: (state, getters) => Object.keys(getters.chats),
    current: (state, getters) => getters.currentName ? getters.chats[getters.currentName] : {},
    currentMessages: (state, getters) => ({ messages: getters.current.messageIds ? getters.current.messageIds.map(messageId => getters['messages/get'](messageId)) : [] }),
    currentUsers: (state, getters) => ({ users: getters.current.userIds ? getters.current.userIds.map(userId => getters['users/get'](userId)) : [] }),
    currentChat: (state, getters) => ({
      ...getters.current,
      ...getters.currentMessages,
      ...getters.currentUsers
    })
  },
  actions: {
    addChat ({ state, commit, dispatch }, name) {
      commit('addChat', name)
    },
    removeChat ({ state, commit, dispatch }, name) {
      commit('removeChat', name)
    },
    addMessageToChat ({ state, commit, dispatch }, payload) {
      commit('addMessageToChat', payload)
    },
    addUserToChat ({ state, commit, dispatch }, payload) {
      commit('addMessageToChat', payload)
    }
  },
  mutations: {
    addChat (state, name) {
      state.chats[name] = {
        messageIds: [],
        userIds: []
      }
    },
    removeChat (state, name) {
      delete state.chats[name]
    },
    addMessageToChat (state, payload) {
      state.chats[payload.name].userIds.push(payload.message._id)
    },
    addUserToChat (state, payload) {
      state.chats[payload.name].messageIds.push(payload.user._id)
    }
  }
}
