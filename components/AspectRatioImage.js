import React from 'react';
import {
  View,
  Image,
} from 'react-native';

const AspectRatioImage = props => {
  const heightForWidth = props.aspectHeight / props.aspectWidth;
  return (
    <View style={{
      height: heightForWidth * props.width,
      width: props.width,
    }}>
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
};

export default AspectRatioImage;
