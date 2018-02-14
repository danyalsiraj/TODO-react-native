import axios from 'axios'

const domainName='http://192.168.0.21'
function login(email,password){
  return fetch(`${domainName}/login`,{
    method:'POST',
    body: JSON.stringify({
      email: email,
      password:password
    })
}).then(res=>{
    return res
  })
  .catch(err => {
    console.log('Failed login')
    console.log(err)
    return {};
  })
}
module.exports={
  login
}
