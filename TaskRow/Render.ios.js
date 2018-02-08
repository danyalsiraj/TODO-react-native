import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import Swipeout from 'react-native-swipeout'

const localStyle=StyleSheet.create({
  row:{
    marginBottom:0,
    marginLeft:0,
    marginRight:0
  },
  container:{
    marginBottom:20
  }
})
export default function render(baseStyles){
  const buttons=[
    {
      text:'Done',
      backgroundColor:'#505e5e',
      underlayColor:'#273539',
      onPress:this.deleteTask.bind(this)
    }
  ]
  return(
    <View
      style={localStyle.container}
    >
      <Swipeout
        backgroundColor='red'
        right={buttons}
      >
        <View style={[baseStyles.container,localStyle.row]}>
          <Text style={baseStyles.label}>
            {this.props.todo.task}
          </Text>

          // <TouchableHighlight
          // style={styles.doneButton}
          // onPress={this.deleteTask.bind(this)}>
          //   <Text>DONE!</Text>
          // </TouchableHighlight>
        </View>
      </Swipeout>
    </View>
  )
}
