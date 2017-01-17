import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import speciesStyles from './speciesStyles';
import AspectRatioImage from './AspectRatioImage';

export default class SpeciesMatchCard extends Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;

    return (
      <View style={cardStyle}>
        <View style={imageWrapper}>
          <ImageCard image={species.images[0]} assets={assets} />
        </View>
        <View style={[speciesStyles.paragraph, speciesStyles.sideMargins]}>
          <Text style={speciesStyles.family}>{species.family}</Text>
          <Text style={speciesStyles.species}>{species.species}</Text>
        </View>
      </View>
    );
  }
}

const cardStyle = {
  flex: 1,
  marginTop: 16,
  marginBottom: 16,
  backgroundColor: 'white',
};

const imageWrapper = {
  marginBottom: 8,
};

const ImageCard = props => {
  const imageAsset = props.assets[props.image.filename];

  return (
    <AspectRatioImage
     asset={imageAsset}
     aspectWidth={4}
     aspectHeight={3}
     width={Dimensions.get('window').width}
   />
   /*
    <View style={[speciesStyles.imageContainer, speciesStyles.paragraph]}>
      <Image
        source={imageAsset}
        style={[speciesStyles.imageCanvas, speciesStyles.rounded]}
      />
    </View>
    */
  );
};
