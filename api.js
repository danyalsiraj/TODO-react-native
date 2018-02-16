import axios from 'axios'

const domainName='https://quiet-atoll-28125.herokuapp.com'
function login(email,password){
  console.log(`making request with ${email} ${password}`)
  return fetch(`${domainName}/login`
  ,{
    method:'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password:password
    })
}
).then(res=>{
    console.log(res);
    return res
  })
  .catch(err => {
    console.log('Failed login')
    console.log(err)
    return {};
  })
}
function getTodos(authToken){
  console.log(`making request with authToken ${authToken}`)

  return fetch(`${domainName}/todos`
  ,{
    method:'GET',
    headers: {
      'x-auth':authToken
    },
}
).then(res=>{
    return res.json()
  })
  .catch(err => {
    console.log('Failed to get Todos')
    console.log(err)
    return {};
  })
}
function addTodo(todo,authToken){
  return fetch(`${domainName}/todos`
  ,{
    method:'POST',
    headers: {
      'Content-Type' : 'application/json',
      'x-auth':authToken
    },
    body: JSON.stringify({
      text: todo,
    })
}
).then(res=>{
    console.log(res);
    return res.json()
  })
  .catch(err => {
    console.log('Failed to add todo')
    console.log(err)
    return {};
  })
}
function deleteTodo(id,authToken){
  return fetch(`${domainName}/todos/${id}`
  ,{
    method:'DELETE',
    headers: {
      'x-auth':authToken
    }
}
).then(res=>{
    console.log(res);
    return res
  })
  .catch(err => {
    console.log('Failed to delete todo')
    console.log(err)
    return {};
  })
}
module.exports={
  login,
  getTodos,
  addTodo,
  deleteTodo
}
