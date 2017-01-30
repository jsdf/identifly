import React from 'react';
import {
  View,
  Image,
} from 'react-native';

export default class AspectRatioImage extends React.Component {
  render() {
    const {props} = this;
    const heightForWidth = props.aspectHeight / props.aspectWidth;
    return (
      <View
        ref={this._setRef}
        style={{
          height: heightForWidth * props.width,
          width: props.width,
        }}
      >
        <Image
          source={props.asset}
          style={{
            resizeMode: 'cover',
            height: heightForWidth * props.width,
            width: props.width,
          }}
        />
      </View>
    );
  }

  setNativeProps(props) {
    if (this._ref) {
      this._ref.setNativeProps(props);
    }
  }

  _setRef = (el) => {
    this._ref = el;
  }
}
