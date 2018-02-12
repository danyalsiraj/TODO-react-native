import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskRow from './TaskRow/Component';
// import store from './TodoStore';
import {connect} from 'react-redux'


import {
  Text,
  StyleSheet,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';


function mapStatetoProps(state) {
  return ({
    todos: state.todos
  })
}
function mapDispatchToProps(dispatch){
  return {
    addTodo: (todo)=>{
      dispatch({
        type:'ADD_TODO',
        todo: todo
      })
    },
    deleteTodo: (todo)=>{
      dispatch({
        type:'DELETE_TODO',
        todo:todo
      })
    }
  }
}
const ds =new ListView.DataSource({
  rowHasChanged:(r1,r2)=>r1 !== r2
})
class TaskList extends Component{
  constructor(props,context){
    super(props,context)

    this.dataSource = ds.cloneWithRows(this.props.todos);

  }

  componentWillReceiveProps(nextProps){
    this.dataSource = ds.cloneWithRows(nextProps.todos);
  }
  renderRow(todo){
    return(
      <TaskRow
      todo={todo}
      deleteTask={this.deleteTask.bind(this)}/>
    )
  }

  deleteTask(deleteTask){
    this.props.deleteTodo(deleteTask)

  }

  onAddStarted(){
    this.props.navigation.navigate('TaskForm',{
      addTask: this.addTask.bind(this)
    });
  }


  addTask(newTask){
    //this.state.todos.push({task: newTask})
    //this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.todos)
    //this.setState(this.state)
    // store.dispatch({
    //   type:'ADD_TODO',
    //   task:newTask
    // })
    this.props.addTodo(newTask)
  }

  render(){
    return(
      <View style={styles.container}>
        <ListView
          key={this.props.todos}//this is a fake property
          dataSource={this.dataSource}
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
export default connect(mapStatetoProps,mapDispatchToProps)(TaskList);
//export default TaskList; //we can do this when we create the class
