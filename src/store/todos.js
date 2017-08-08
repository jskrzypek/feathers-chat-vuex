import uuid from 'uuid'
export default {
  namespaced: true,
  state: {
    todos: [],
    done: []
  },
  getters: {
    todos: (state, getters) => state.todos.map(todo => ({ ...todo, tasks: getters['tasks/tasks'].filter(task => task.todoId === todo.id) })),
    done: (state, getters) => state.done.map(todo => ({ ...todo, tasks: getters['tasks/tasks'].filter(task => task.todoId === todo.id) }))
  },
  actions: {
    addTodo ({ state, commit, dispatch, getters }, { todo, tasks }) {
      let id = uuid.v4()
      tasks.forEach(task => dispatch('tasks/addTask', { ...task, todoId: id }))
      commit('addTodo', { ...todo, id })
    },
    finishTodo ({ state, commit, dispatch }, index) {
      commit('finishTodo', index)
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    finishTodo (state, index) {
      state.done.push(state.todos.splice(index, 1))
    }
  }
}
