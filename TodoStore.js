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
  ],
  fetched:false,
  isFetching:true,
  errors:[]
}
const defaultUserState={
  name:'',
  email:'',
  password:'',
  authToken:'',
  loggedIn:false,
  isFetching:false,
  isSigningUp:false,
  signedUp:false,
  errors:[]
}
const defaultTodo={
  task:'',
  id:'',
  isAdding:false,
  added:false,
  isDeleting:false,
  deleted:false,
  errors:[]
}

function todosReducer(state=defaultState,action){
  switch (action.type) {
    case 'FETCHING_TODOS':
      return {...state,isFetching:true}
    case 'FETCHING_TODOS_ERRORS':
      return {...state,isFetching:false,fetched:false,errors:state.errors.concat(action.errors)}
    case 'FETCHED_TODOS':
      return {...state,isFetching:false,fetched:true,todos:action.todos}
    case 'ADDED_TODO':
      return {...state,todos:state.todos.concat([{id: action.id, task: action.task}])}
    default:
      return state

  }
}
function todoReducer(state=defaultTodo,action){
  switch (action.type) {
  case 'ADDING_TODO':
    return {...state,isAdding:true, task:action.task,added:false}
  case 'ADDED_TODO':
      return {...state, added:true,isAdding:false}
  case 'ADDING_TODO_ERROR':
      return {...state,errors:state.errors.concat(action.errors),isAdding:false,added:false}

  case 'DELETING_TODO':
    return {...state,isDeleting:true,id:action.id,deleted:false}
  case 'DELETED_TODO':
    return {...state,isDeleting:false,deleted:true}
  case 'DELETING_TODO_ERROR':
    return {...state,errors:state.errors.concat(action.errors),isDeleting:false,deleted:false}
  default:
    return state
  }
}
function userReducer(state=defaultUserState,action){
  switch(action.type){
    case 'SIGNING_UP':
      return{...state,isSigningUp:true,email:action.email,password:action.password}
    case 'SIGNED_UP':
      return{...state,isSigningUp:false,signedUp:true}
    case 'SIGN_UP_ERRORS':
      return{...state,errors:state.errors.concat(action.errors),signedUp:false,isSigningUp:false}

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
  todos:todosReducer,
  todo: todoReducer
})
export default createStore(reducer,applyMiddleware(createLogger()))
