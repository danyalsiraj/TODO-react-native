import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Animated
} from 'react-native';


export default function render(baseStyles){
  const doneAnimation=new Animated.ValueXY()
  const localStyle=StyleSheet.create({
    doneButton:{
      height:30,
      width:35
    },
    row:{
      transform: doneAnimation.getTranslateTransform()
    }
  })

  function handleDelete(){
    console.log('Deleting')
    Animated.spring(doneAnimation,{
      tension:2,
      friction:3,
      toValue:{
        x:-500,
        y:0
      }
    }).start(result=>{
      if(result.finished){
        this.props.deleteTask(this.props.todo)
      }
    })
  }
  return(
    <Animated.View
      style={[baseStyles.container,localStyle.row]}
    >
      <Text style={baseStyles.label}>
        {this.props.todo.task}
      </Text>

      <TouchableHighlight
        onPress={handleDelete.bind(this)}
        underlayColor='gray'
      >
        <Image
          style={localStyle.doneButton}
          source={require('../Images/done.png')}
        />
      </TouchableHighlight>
    </Animated.View>
  )
}
