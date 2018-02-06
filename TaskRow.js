import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  StyleSheet,
  View,
  ListView
} from 'react-native';

export default class TaskRow extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.todo.task}     ....  .... .. . .</Text>
      </View>
    )
  }
}
TaskRow.propTypes={
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
  }
})
