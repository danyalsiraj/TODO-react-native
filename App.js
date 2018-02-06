import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';
import {StackNavigator} from 'react-navigation'

import TaskList from './TaskList';
import TaskForm from './TaskForm';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const RootStack = StackNavigator({
  Home: {
    screen: TaskList
  },
  TaskForm: {
    screen: TaskForm
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})
export default class App extends Component<{}> {
  constructor(props,context){
    super(props,context);

  }


  render() {
    return (<RootStack/>);
  }
//   renderScene(route,nav){
//     switch(route.name){
//       case'taskform':
//         return (
//           <Text>Add form comes here!!</Text>
//         )
//       default:
//         return (
//           <TaskList
//             onAddStarted={this.onAddStarted.bind(this)}
//             todos={this.state.todos}
//           />
//         )
//     }
//
//   }
//   render() {
//     return (
//       <NavigationExperimental.Navigator
//         initialRoute={{name:'tasklist',index:0}}
//         ref={((nav) =>{
//           this.nav=nav
//           }
//         )}
//         renderScene={this.renderScene.bind(this)}
//       />
//     );
//   }
 }

const styles = StyleSheet.create({
  container: {
    padding: 40
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
