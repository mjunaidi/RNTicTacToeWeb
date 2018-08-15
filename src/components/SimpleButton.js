import React from 'react'
import {
  View,
  Button,
} from 'react-native'
import Description from './Description'
import * as Color from '../utils/Color'
import * as Util from '../utils/Util'

export default class SimpleButton extends React.Component {
  render() {
    const btnColor = this.props.btnColor||Color.BLUE
    const color = this.props.color||this.props.outline?btnColor:'white'
    const borderRadius = typeof(this.props.borderRadius)==='number'&&this.props.borderRadius>0?this.props.borderRadius:5
    return (
      <View style={[
        {
          borderRadius: borderRadius,
        },
        this.props.outline?{
          borderColor: btnColor,
          borderWidth: 1,
        }:{
          backgroundColor: btnColor,
        },
        this.props.style
      ]}>
        <Button
          onPress={()=>{
            if (typeof(this.props.onPress)==='function') {
              this.props.onPress()
            }
          }}
          title={this.props.title}
          color={color}
          accessibilityLabel={this.props.accessibilityLabel}
        />
      </View>
    )
  }
}
