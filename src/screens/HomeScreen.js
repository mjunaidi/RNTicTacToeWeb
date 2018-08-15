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
import Brand from '../components/Brand'
import About from '../components/About'
import SimpleButton from '../components/SimpleButton'
import * as Color from '../utils/Color'
import Board from '../ttt/Board'

export default class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    const {width, height} = Dimensions.get('window')
    this.state = {
      width: width,
      height: height,
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <View>
        <StatusBar hidden={true} />
        <View>
          <SimpleButton
            title="i"
            btnColor={Color.TEAL_BLUE}
            borderRadius={20}
            outline
            style={{
              margin: 10,
              width: 40,
              alignSelf: 'flex-end',
            }}
            onPress={()=>{
              this.setState({showAbout:true})
            }}
          />
        </View>
        <ScrollView>
          <Brand
            onPress={()=>{
              this.setState({showAbout:true})
            }}
          />
          <Board />
          <View style={{height:100}} />
        </ScrollView>
        <About show={this.state.showAbout}
          onClose={()=>this.setState({showAbout:false})}
        />
      </View>
    )
  }
}
