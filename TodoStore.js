import {createStore,applyMiddleware,combineReducers} from 'redux'
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
const defaultUserState={
  name:'',email:'',
  password:'',
  authToken:'',
  loggedIn:false,
  isFetching:false,
  errors:[]
}

function todoReducer(state=defaultState,action){
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
function userReducer(state=defaultUserState,action){
  switch(action.type){
    case 'FETCHING_USER':
      return {...state,isFetching:true, email:action.email, password:action.password}
    case 'FETCHING_USER_ERROR':
      return {...state,isFetching:false,errors: state.errors.concat(action.errors)}
    case 'FETCHED_USER':
    return {...state,authToken:action.authToken,isFetching:false,loggedIn:true,errors:[]}
    case 'LOGOUT':
      return defaultUserState
    default:
      return state
  }
}

const reducer=combineReducers({
  user: userReducer,
  todos:todoReducer
})
export default createStore(reducer,applyMiddleware(createLogger()))
