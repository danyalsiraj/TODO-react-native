import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
//   Text,
   StyleSheet
//   View,
//   TouchableHighlight,
//   ListView
 } from 'react-native';

import Render from'./Render';//no need to add .iso or .android. it looks for that based on platform
export default class TaskRow extends Component{
  render(){
    return Render.call(this,styles)
  }
  
}

TaskRow.propTypes={
  deleteTask: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string.isRequired
  }).isRequired
}

const styles=StyleSheet.create({
  container:{
    //backgroundColor:'white',
    borderWidth:1,
    borderColor:'#505e5e',
    padding:15,
    flex:1,
    flexDirection: 'row',
    marginBottom:2,
    marginLeft:2,
    marginRight:2,
    justifyContent:'space-between'
  },
  label:{
    fontSize: 20
  },
  doneButton:{
    borderRadius:5,
    backgroundColor:'#505e5e',
    padding:5

  },
  buttonText:{

  }
})
