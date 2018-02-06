import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskRow from './TaskRow'

import {
  Text,
  StyleSheet,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

export default class TaskList extends Component{
  constructor(props,context){
    super(props,context)
    this.state={
      todos:[
        {
          task:'First todo',
        },
        {
          task:'Second todo',
        },
        {
          task:'Third todo',
        }
      ]
    };
    const ds =new ListView.DataSource({
      rowHasChanged:(r1,r2)=>r1 !== r2
    })
    this.state.dataSource = ds.cloneWithRows(this.state.todos);
  }
  renderRow(todo){
    return(
      <TaskRow todo={todo}/>
    )
  }

  onAddStarted(){
    this.props.navigation.navigate('TaskForm',{
      addTask: this.addTask.bind(this)
    });
  }

  // componentWillRecieveProps(nextProps) {
  //   this.setState({
  //     dataSource,
  //     todos: nextProps.todos
  //   })
  // }
  addTask(newTask){
    this.state.todos.push({task: newTask})
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.todos)

    this.setState(this.state)
  }
  deleyeTask(deleteTask){
    this.state.todos.splice(this.state.todos.indexOf(deleteTask),1)
  }
  render(){
    return(
      <View style={styles.container}>
        <ListView
          key={this.state.todos}//this is a fake property
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <TouchableHighlight
          onPress={this.onAddStarted.bind(this)}
          style={styles.button}>
          <Text style={styles.buttonText}>ADD NEW TASK</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
TaskList.propTypes={
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E9EBF0',
    justifyContent:'flex-start',
    paddingTop:20
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


  }
})
//export default TaskList; //we can do this when we create the class
