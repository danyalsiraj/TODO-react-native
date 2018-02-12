import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';

export default class Login extends Component{
  constructor(props,context){
    super(props,context)
    this.state={
      email:'',
      password:'',
      passwordConfirmation:''
    }
  }
  storeEmail(username){
    this.username=username
  }
  storePassword(password){
    this.password=password
  }
  storePasswordConfirmation(passwordConfirmation){
    this.passwordConfirmation=passwordConfirmation
  }
  signUp(){
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
