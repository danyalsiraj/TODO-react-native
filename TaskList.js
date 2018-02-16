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

import api from'./api'


function mapStatetoProps(state) {
  return ({
    todos: state.todos.todos,
    authToken:state.user.authToken
  })
}
function mapDispatchToProps(dispatch){
  return {
    fetchTodos:()=>{
      dispatch({
        type:'FETCHING_TODOS'
      })
    },
    fetchTodoSuccess:(todos)=>{
      dispatch({
        type:'FETCHED_TODOS',
        todos: todos
      })
    },
    fetchTodosErrors:(errors)=>{
      dispatch({
        type:'FETCHING_TODOS_ERRORS',
        errors: errors
      })
    },
    addTodo: (todo)=>{
      dispatch({
        type:'ADD_TODO',
        todo: todo
      })
    },
    deleteTodo: (todo)=>{
      dispatch({
        type:'DELETING_TODO',
        id :todo.id
      })
    },
    deleteTodoSuccess:()=>{
      dispatch({
        type:'DELETED_TODO'
      })
    },
    deleTodoError: (error)=>{
      dispatch({
        type:'DELETING_TODO_ERROR',
        errors: error
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
    this.getTodos()
    this.dataSource = ds.cloneWithRows(this.props.todos);
  }
  getTodos(){
    if (!this.props.todos.isFetching){
      this.props.fetchTodos()
      api.getTodos(this.props.authToken)
        .then(body=>{
          if(body && body.todos){
            let todos = body.todos.map(todo=>{
              return {id:todo._id, task:todo.text}
            })
            this.props.fetchTodoSuccess(todos)
          }else{
            this.props.fetchTodosErrors(['Unable to get Todos'])
          }
        })
    }
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
    api.deleteTodo(deleteTask.id,this.props.authToken)
      .then(response=>{
        if(response.status==200){
          this.props.deleteTodoSuccess()
          this.getTodos();
        }else{
          this.props.deleTodoError('unable to delete')
        }
      })
  }

  onAddStarted(){
    this.props.navigation.navigate('TaskForm',{
      addTask: this.addTask.bind(this)
    });
  }


  addTask(newTask){
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
