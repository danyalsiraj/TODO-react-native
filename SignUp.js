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
    email: state.email,
    password:state.password,
    passwordConfirmation: state.passwordConfirmation
  })
}
function mapDispatchToProps(dispatch){
  return {
    signUp:(email,password)=>{
      dispatch({
        type:'SIGNING_UP',
        email:email,
        password:password
      })
    },
    signUpSuccessful:()=>{
      dispatch({
        type:'SIGNED_UP'
      })
    },
    signUpFailed:(error)=>{
      dispatch({
        type:'SIGN_UP_ERRORS',
        errors:error
      })
    }
}
}
class SignUp extends Component{
  constructor(props,context){
    super(props,context)

  }
  storeEmail(username){
    this.email=username
  }
  storePassword(password){
    this.password=password
  }
  storePasswordConfirmation(passwordConfirmation){
    this.passwordConfirmation=passwordConfirmation
  }
  signUp(){
    this.props.signUp(this.email,this.password)
    if(this.password==this.passwordConfirmation){
      api.signUp(this.email,this.password)
        .then(response=>{
          if(response.status==200){
            this.props.signUpSuccessful()
            this.props.navigation.goBack();
          }else{
            this.props.signUpFailed(['unable to signup'])
          }
        })
    }else{
      this.props.signUpFailed(['Passwords do not match'])
    }
    <Text>SIGNUP happening</Text>
  }

  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='gray'
          onChangeText={this.storeEmail.bind(this)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          placeholderTextColor='gray'
          secureTextEntry={true}
          onChangeText={this.storePassword.bind(this)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password Confirmation'
          placeholderTextColor='gray'
          secureTextEntry={true}
          onChangeText={this.storePasswordConfirmation.bind(this)}
        />
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

export default connect(mapStatetoProps,mapDispatchToProps)(SignUp);
