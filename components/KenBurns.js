import React from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
  Image,
} from 'react-native';
import Exponent from 'exponent';
import {knuthShuffle} from 'knuth-shuffle';

import speciesStyles from './speciesStyles';


function initState(props) {
  return {
    shuffledImages: knuthShuffle(props.imageAssets),
    imageIndex: 0,
    zoomValue: new Animated.Value(0),
    opacityValue: new Animated.Value(1),
  };
}

function intervalState(state, props) {
  if (state.imageIndex < state.shuffledImages.length - 1) {
    return {
      ...state,
      imageIndex: state.imageIndex + 1,
    };
  }

  return initState(props);
}

export default class KenBurns extends React.Component {
  constructor(props) {
    super(props);

    this.state = initState(props);
    this._zoom();
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState(intervalState, () => 
        this._zoom()
      );
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentDidUpdate() {
    const nextImage = this.state.shuffledImages[this.state.imageIndex + 1];
    if (nextImage != null) {
      Exponent.Asset.fromModule(nextImage).downloadAsync();
    }
  }

  _zoom() {
    this.state.zoomValue.setValue(1);
    // return
    Animated.timing(
      this.state.zoomValue,
      {
        toValue: 1.2,
        duration: 5000,
        easing: Easing.in(Easing.ease),
      },
    ).start();
    this.state.opacityValue.setValue(1);
    // return
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: 0,
        delay: 3000,
        duration: 2000,
        easing: Easing.out(Easing.ease),
      },
    ).start();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageAssets !== this.props.imageAssets) {
      this.setState(initState(nextProps));
      this._zoom();
    }
  }

  render() {
    const imageAsset = this.state.shuffledImages[this.state.imageIndex];
    const imageAssetNext = this.state.shuffledImages[Math.min(this.state.imageIndex, this.state.shuffledImages - 1)];
    const heightForWidth = this.props.aspectHeight / this.props.aspectWidth;

    return (
      <View style={speciesStyles.container}>
        <View style={{
          height: heightForWidth * this.props.width,
          width: this.props.width,
          overflow: 'hidden',
        }}>
          <Image
            source={imageAssetNext}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              resizeMode: 'cover',
              height: heightForWidth * this.props.width,
              width: this.props.width,
            }}
          />
          <Animated.Image
            source={imageAsset}
            style={{
              resizeMode: 'cover',
              height: heightForWidth * this.props.width,
              width: this.props.width,
              transform: [
                {scale: this.state.zoomValue},
              ],
              opacity: this.state.opacityValue,
            }}
          />
        </View>
      </View>
    );
  }
}
