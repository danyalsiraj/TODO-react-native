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
      username:'',
      password:''
    }
  }
  storeUsername(username){
    this.username=username
  }
  storePassword(password){
    this.password=password
  }
  login(){
    if(!this.authLogin(this)){

    }
    this.props.navigation.navigate('Home')
  }
  authLogin(){
    return true
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
          onPress={this.login.bind(this)}
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
