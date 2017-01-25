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


/*
Orchestration:

img1 load
img1 wait 5000, img2 load
img1 fadeOut
img1 remove, img2 wait 5000, img3 load
img2 fadeOut
img2 remove, img3 wait 5000, img4 load
img3 fadeOut
img3 remove, img4 wait 5000, img5 load
etc.

*/

function wrap(val, max) {
  return val <= max ? val : val - max;
}

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function initState(props) {
  return {
    shuffledImages: knuthShuffle(props.imageAssets),
    images: [
      {index: 0, prepare: true, show: true},
    ],
  };
}

function imageIndex(index, props) {
  return wrap(index, props.imageAssets.length - 1);
}

export default class KenBurns extends React.Component {
  constructor(props) {
    super(props);
    this.state = initState(props); 
  }

  componentWillReceiveProps(nextProps) {
    // reset if images change
    if (nextProps.imageAssets !== this.props.imageAssets) {
      this.setState(initState(nextProps));
    }
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const heightForWidth = this.props.aspectHeight / this.props.aspectWidth;
    const height = heightForWidth * this.props.width;
    const width = this.props.width;

    const images = this.state.images.map(({index, prepare, show}) => {
      const imageAsset = this.state.shuffledImages[index];
      return (
        <KenBurnsImage
          key={index}
          index={index}
          image={imageAsset}
          height={height}
          width={width}
          prepare={prepare}
          show={show}
          onHideStart={this._onImageHideStart}
          onHideEnd={this._onImageHideEnd}
        />
      );
    });

    images.reverse();

    return (
      <View style={speciesStyles.container}>
        <View style={{
          height,
          width,
          overflow: 'hidden',
        }}>
          {images}
        </View>
      </View>
    );
  }

  _onImageHideStart = (hidingIndex) => {
    if (this._unmounted) return;
    const nowPreparingIndex = imageIndex(hidingIndex + 1, this.props);
    this.setState({
      images: [
        {index: hidingIndex, prepare: true, show: true},
        {index: nowPreparingIndex, prepare: true, show: false},
      ],
    });
  };

  _onImageHideEnd = (justHiddenIndex) => {
    if (this._unmounted) return;
    const nowShowingIndex = imageIndex(justHiddenIndex + 1, this.props);
    const nowLoadingIndex = imageIndex(justHiddenIndex + 2, this.props);
    this.setState({
      images: [
        {index: nowShowingIndex, prepare: true, show: true},
        {index: nowLoadingIndex, prepare: false, show: false},
      ],
    });
  };
}

class KenBurnsImage extends React.Component {
  state = {
    zoomValue: new Animated.Value(1),
    opacityValue: new Animated.Value(1),
  };

  componentWillUnmount() {
    this._unmounted = true;
  }

  componentDidMount() {
    this._handleChange({
      show: false,
      prepare: false,
    });
  }

  componentDidUpdate(prevProps) {
    this._handleChange(prevProps);
  }

  _handleChange(prevProps) {
    if (!prevProps.prepare && this.props.prepare) {
      this._prepare();
    }
    if (!prevProps.show && this.props.show) {
      this._show();
    }
  }

  async _show() {
    await wait(5000);
    this._hide();
  }

  async _prepare() {
    const zoom = Animated.timing(
      this.state.zoomValue,
      {
        toValue: 1.2,
        duration: 8000,
        easing: Easing.in(Easing.ease),
      },
    );
    zoom.start();
  }

  async _hide() {
    const fadeOut = Animated.timing(
      this.state.opacityValue,
      {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
      },
    );

    this.props.onHideStart(this.props.index);
    await new Promise(resolve => fadeOut.start(resolve));
    this.props.onHideEnd(this.props.index);
  }

  render() {
    const {
      width,
      height,
      image,
    } = this.props;

    return (
      <Animated.Image
        source={image}
        style={{
          resizeMode: 'cover',
          height,
          width,
          position: 'absolute',
          top: 0,
          left: 0,
          transform: [
            {scale: this.state.zoomValue},
          ],
          opacity: this.state.opacityValue,
        }}
      />
    );
  }
}