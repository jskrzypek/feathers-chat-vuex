import Vue from 'vue'
import Vuex from 'vuex'

import todos from './todos'
import tasks from './tasks'
import chats from './chats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    todos,
    chats
  },
  plugins: [
    // feathersVuex(feathersClient)
    (store) => {
      // store.registerModule('todos/tasks', tasks())
      store.registerModule(['todos', 'tasks'], tasks())
      store.registerModule('todos/otherTasks', tasks())
    }
  ]
})
