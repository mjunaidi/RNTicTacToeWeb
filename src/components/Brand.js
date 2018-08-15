import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {INFO} from './About'

export default class Brand extends React.PureComponent {
  state={}
  componentDidMount() {

  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View>
          <Text style={{
            fontSize: 32, fontFamily: 'Futura-CondensedMedium',
            //fontSize: 21, fontFamily: 'Gurmukhi MN',
            //fontSize: 21, fontFamily: 'Hoefler Text',
            //fontSize: 21, fontFamily: 'Mishafi',
            //fontSize: 21, fontFamily: 'Noteworthy-Light',
            //fontSize: 21, fontFamily: 'Optima',
            //fontSize: 32, fontFamily: 'Savoye LET',
            //fontSize: 32, fontFamily: 'Snell Roundhand',
            //fontSize: 21, fontFamily: 'Zapfino',
            textAlign: 'center',
          }}>{INFO.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
