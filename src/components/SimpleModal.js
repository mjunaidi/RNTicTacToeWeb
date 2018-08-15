import React from 'react'
import {
  View,
  Modal,
} from 'react-native'
import CloseButton from './CloseButton'

export default class SimpleModal extends React.PureComponent {
  state={}
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={this.props.transparent||false}
        visible={this.props.visible||true}
        onRequestClose={()=>{
          if (typeof(this.props.onClose)==='function') {
            this.props.onClose()
          }
        }}>
        <View style={{marginTop: 0}}>
          <View style={{zIndex:9999}}>
            <CloseButton {...this.props}
              onPress={()=>{
                if (typeof(this.props.onClose)==='function') {
                  this.props.onClose()
                }
              }}
            />
          </View>
          <View>
            {this.props.children}
          </View>
        </View>
      </Modal>
    )
  }
}
