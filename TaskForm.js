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
    todo: state.todo,
    authToken:state.user.authToken
  })
}
function mapDispatchToProps(dispatch){
  return {
    addTodo:(task)=>{
      dispatch({
        type:'ADDING_TODO',
        task:task
      })
    },
    addTodoSuccess:(task)=>{
      dispatch({
        type:'ADDED_TODO',
        task:task.text,
        id:task._id
      })
    },
    addingTodoErrors:(errors)=>{
      dispatch({
        type:'ADDING_TODO_ERRORS',
        errors: errors
      })
    },
  }
}

class TaskForm extends Component{
  constructor(props,context){
    super(props,context)
    // this.state={
    //   todo:''
    // }
  }
  storeTask(newTask){
    this.todo = newTask
  }
  addTask(){
    this.props.addTodo(this.todo)
    api.addTodo(this.todo,this.props.authToken)
      .then(body=>{
        if(body && body.todo){
          this.props.addTodoSuccess(body.todo)
          this.props.navigation.goBack();
        }else{
          this.props.addingTodoErrors('unable to add todo');
        }
      })
    //this.props.navigation.state.params.addTask(this.todo)
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

export default connect(mapStatetoProps,mapDispatchToProps)(TaskForm);
