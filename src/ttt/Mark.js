import React from 'react'
import SimpleButton from '../components/SimpleButton'
import * as Color from '../utils/Color'

export default class Mark extends React.Component {
  render() {
    return (
      <SimpleButton
        title={this.props.title}
        btnColor={this.props.color}
        outline
        style={{
          margin: 10,
          width: 40,
          height: 40,
        }}
        onPress={()=>{
          if (typeof(this.props.onPress)==='function') {
            this.props.onPress()
          }
        }}
      />
    )
  }
}
