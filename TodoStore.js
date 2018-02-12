import {createStore,applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
const defaultState={
  todos:[
    {
      task:'first task'
    },
    {
      task:'second task'
    }
  ]
}

function todoStore(state=defaultState,action){
  switch (action.type) {
    case 'ADD_TODO':
      let newState = {...state, todos: [...state.todos, { task: action.todo }]}
      return newState
    case 'DELETE_TODO':
      return Object.assign({},state,{
        todos: state.todos.filter(todo =>  todo.task !== action.todo.task )
      })
    default:
      return state

  }
}

export default createStore(todoStore,applyMiddleware(createLogger()))
