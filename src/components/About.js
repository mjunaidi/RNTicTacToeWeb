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
} from 'react-native'
import Brand from './Brand'
import Description from './Description'
import SimpleButton from './SimpleButton'
import * as Color from '../utils/Color'

export const INFO = {
  name: 'Tic Tac Toe',
  version: '1.0',
  developedBy: {
    name: 'TrendCycle',
    link: 'https://www.techcycle.me',
    email: 'trendcycle@yahoo.com',
  },
  poweredBy: [
    {
      name: 'React Native',
      link: 'https://facebook.github.io/react-native',
    },
  ],
  credits: {
    name: 'Thank you!',
  },
  year: (new Date()).getFullYear(),
}

export const INFO_KEY_MAP = {
  name: ' ', // use space character instead of empty character
  developedBy: 'developed by',
  poweredBy: 'powered by',
}

export const INFO_VIEW_MAP = {
  year: false,
}

export default class About extends React.Component {
  state={}
  render() {
    if (this.props.show!==true) {
      return null
    }
    const info = INFO
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}>
        <View style={{marginTop: 0}}>

          <View>
            <SimpleButton
              title={'\u00D7'}
              btnColor={Color.RED}
              outline
              borderRadius={20}
              style={{
                margin: 10,
                width: 40,
                alignSelf: 'flex-end'
              }}
              onPress={()=>{
                if (typeof(this.props.onClose)==='function') this.props.onClose()
              }}
            />
          </View>

          <ScrollView style={{
            marginBottom: 90,
          }}>
            <Brand />
            <View style={{
              padding:20,
            }}>
              <Description value={info} keyMap={INFO_KEY_MAP} viewMap={INFO_VIEW_MAP} />
            </View>

            <Copyright style={{padding:10}} {...info} />
          </ScrollView>
        </View>
      </Modal>
    )
  }
}

const Copyright=(props)=>{
  return (
    <View style={props.style}>
      <Text style={{
        textAlign: 'center',
      }}>{'\u00a9'} {props.year} {props.developedBy.name}</Text>
    </View>
  )
}

export const styles = StyleSheet.create({
  brand: {
    //fontSize: 21, fontFamily: 'Zapfino',
    fontSize: 32, fontFamily: 'Snell Roundhand',
    textAlign: 'center',
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: 'grey',
  },
})
