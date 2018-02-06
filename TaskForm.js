import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';

export default class TaskRow extends Component{
  constructor(props,context){
    super(props,context)
    this.state={
      task:''
    }
  }
  storeTask(newTask){
    this.task = newTask
  }
  addTask(){
    this.props.navigation.state.params.addTask(this.task)
    this.props.navigation.goBack();
  }
  render(){
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.storeTask.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.addTask.bind(this)}
          >
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button,styles.cancelButton]}
          onPress={()=>this.props.navigation.goBack()}
          >
          <Text style={styles.buttonText}>CANCEL</Text>

        </TouchableHighlight>

      </View>
    )
  }
}

const styles=StyleSheet.create({
  container:{

  },
  input:{

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
