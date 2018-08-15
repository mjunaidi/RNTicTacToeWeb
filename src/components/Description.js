import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Button,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  Switch,
  Modal,
  StatusBar,
  ActivityIndicator,
  Linking,
} from 'react-native'
import * as Util from '../utils/Util'
import * as Color from '../utils/Color'

export default class Description extends React.Component {
  render() {
    const value = this.props.value
    if (typeof(value)==='string') {
      if (value.startsWith('https://')) {
        return (
          <TouchableOpacity onPress={()=>{
            Linking.openURL(value).catch(err=>{
              //console.warn(err);
            })
          }}>
            <Text style={styles.link}>{value}</Text>
          </TouchableOpacity>
        )
      }
      if (Util.isEmail(value)) {
        return (
          <TouchableOpacity onPress={()=>{
            // TODO: currently this is using hardcoded value
            const subject = Util.urlify('Feedback')
            const body = Util.urlify(' ')
            Linking.openURL(`mailto:${value}?subject=${subject}&body=${body}`).catch(err=>{
              //console.warn(err);
            })
          }}>
            <Text style={styles.link}>{'\u2709'} {value}</Text>
          </TouchableOpacity>
        )
      }
      return (
        <Text>{value}</Text>
      )
    }
    if (typeof(value)==='number') {
      return (
        <Text>{value}</Text>
      )
    }
    if (Array.isArray(value)&&value.length>0) {
      return (
        <View>
          {
            value.map((e,i)=>(
              <Description
                key={i}
                value={e}
                keyMap={this.props.keyMap}
                viewMap={this.props.viewMap}
              />
            ))
          }
        </View>
      )
    }
    if (typeof(value)==='object'&&value!==null) {
      const keys = Object.keys(value)
      const viewMap = this.props.viewMap||{}
      const keyMap = this.props.keyMap||{}
      return (
        <View style={{
          padding: this.props.padding||10,
        }}>
          {
            keys.length>0&&
            keys.map((key,i)=>{
              if (viewMap[key]!==false) {
                return (
                  <View key={i}>
                    <Key value={key} keyMap={this.props.keyMap} />
                    <Description
                      value={value[key]}
                      keyMap={this.props.keyMap}
                      viewMap={this.props.viewMap}
                    />
                    <View style={{height:5}}></View>
                  </View>
                )
              }
              return null
            })
          }
        </View>
      )
    }
    return null
  }
}

const Key=(props)=>{
  const keyMap = props.keyMap||{}
  const value = props.value||''
  const displayValue = keyMap[value]||value
  if (displayValue.trim().length>0)
    return (
      <Text style={{fontSize:8}}>{displayValue}</Text>
    )
  return null
}

const styles = StyleSheet.create({
  link: {
    color: Color.BLUE,
  }
})
