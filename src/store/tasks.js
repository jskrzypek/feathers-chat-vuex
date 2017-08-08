import uuid from 'uuid'
export default () => ({
  namespaced: true,
  state: {
    tasks: [],
    done: []
  },
  getters: {
    tasks: state => state.tasks,
    done: state => state.done
  },
  actions: {
    addTask ({ state, commit, dispatch }, task) {
      commit('addTask', { ...task, id: uuid.v4() })
    },
    removeTask ({ state, commit, dispatch }, id) {
      commit('removeTask', id)
    },
    finishTask ({ state, commit, dispatch }, id) {
      commit('finishTask', id)
    }
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task)
    },
    removeTask (state, id) {
      state.tasks.splice(id, 1)
    },
    finishTask (state, id) {
      state.tasks.find(task => task.id === id).done = true
    }
  }
})
