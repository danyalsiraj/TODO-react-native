import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';

import {connect} from 'react-redux'
import api from'./api'

function mapStatetoProps(state) {
  return ({
    user: state.user
  })
}
function mapDispatchToProps(dispatch){
  return {
    login: (email,password)=>{
      dispatch({
        type:'FETCHING_USER',
        email: email,
        password:password
      })
    },
    loggedInSuccess:(authToken)=>{
      dispatch({
        type:'FETCHED_USER',
        authToken: authToken
      })
    },
    loginDenied:(errors)=>{
      dispatch({
        type:'FETCHING_USER_ERROR',
        errors:errors
      })
    }
  }
}

class Login extends Component{
  constructor(props,context){
    super(props,context)

  }
  storeUsername(username){
    this.username=username
  }
  storePassword(password){
    this.password=password
  }
  login(){
    this.props.login(this.username,this.password)
    api.login(this.username,this.password)
      .then(response=>{
        if(response.status==200){
          this.props.loggedInSuccess(response.headers['x-auth'])
          this.props.navigation.navigate('Home')
        } else {
          this.props.loginDenied(['Wrong username or password'])
        }
      })
  }
  signUp(){
    this.props.navigation.navigate('SignUp')
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='gray'
          onChangeText={this.storeUsername.bind(this)}
        />
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='gray'
            secureTextEntry={true}
            password={true}
            onChangeText={this.storePassword.bind(this)}
          />
        <TouchableHighlight
          style={styles.button}
          onPress={this.props.user.isFetching ? null : this.login.bind(this)}
          >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={this.signUp.bind(this)}
          >
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    paddingTop:150
  },
  input:{
    borderColor:'black'

  },
  button:{
    height: 60,
    borderColor:'#fafafa',
    borderWidth:2,
    backgroundColor:'#333',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    color:'white',
    fontWeight:'300',
    fontSize:15

  },
  cancelButton:{
    backgroundColor:'red'
  }
})
export default connect(mapStatetoProps,mapDispatchToProps)(Login);
