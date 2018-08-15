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
  CameraRoll,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Picker,
  Switch,
  Modal,
  StatusBar,
  ActivityIndicator,
} from 'react-native'
import About, {INFO} from '../components/About'
import SimpleButton from '../components/SimpleButton'
import SimpleModal from '../components/SimpleModal'
import * as Util from '../utils/Util'
import * as Color from '../utils/Color'

export default class Boilerplate extends React.PureComponent {
  state={}
  componentDidMount() {

  }
  render() {
    return (
      <View style={{margin:0}}>

      </View>
    )
  }
}
