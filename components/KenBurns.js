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
img1 fadeIn,
img2 load, wait 5000
img2 fadeIn
img1 remove, img3 load, wait 5000
img3 fadeIn
img2 remove, img4 load, wait 5000
img4 fadeIn
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
      imageState(0, props),
    ],
  };
}

function imageState(index, props) {
  return {
    index: wrap(index, props.imageAssets.length - 1),
  };
}

function updateOnImageShow(prevIndex, state, props) {
  const images = [
    imageState(prevIndex, props),
    imageState(prevIndex + 1, props),
  ];

  return {
    ...state,
    images,
  };
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

    const images = this.state.images.map(({index}) => {
      const imageAsset = this.state.shuffledImages[index];
      const first = !this._firstImageShown && index === 0;
      return (
        <KenBurnsImage
          key={index}
          index={index}
          image={imageAsset}
          height={height}
          width={width}
          delay={first ? 0 : 5000}
          onShow={this._onImageShow}
        />
      );
    });

    return (
      <View style={speciesStyles.container}>
        <View style={{
          height,
          width,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {images}
        </View>
      </View>
    );
  }

  _onImageShow = (index) => {
    if (this._unmounted) return;
    this._firstImageShown = true;
    this.setState((state, props) => {
      return updateOnImageShow(index, state, props);
    });
  };
}

class KenBurnsImage extends React.Component {
  state = {
    index: 0,
    zoomValue: new Animated.Value(1),
    opacityValue: new Animated.Value(0),
  };

  componentDidMount() {
    this._run();
  }


  async _run() {
    await Promise.all([
      Exponent.Asset.fromModule(this.props.image).downloadAsync(),
      wait(this.props.delay),
    ]);
    await this._show(this.state);
    this.props.onShow(this.props.index);
  }

  async _show(state) {
    const zoom = Animated.timing(
      state.zoomValue,
      {
        toValue: 1.2,
        duration: 7000,
        easing: Easing.in(Easing.ease),
      },
    );

    const fadeIn = Animated.timing(
      state.opacityValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
      },
    );

    await new Promise(resolve => {
      fadeIn.start(resolve);
      zoom.start();
    });
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