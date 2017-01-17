import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from '../components/speciesStyles';
import SpeciesTextContent from '../components/SpeciesTextContent';
import AspectRatioImage from '../components/AspectRatioImage';


import assets from '../content/assets';

export default class SpeciesMatchesScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return params.species.species;
      },
    },
  }

  render() {
    return (
      <SpeciesDetailView
        species={this.props.route.params.species}
        assets={assets}
      />
    );
  }
}

const captionHeight = 44;

function getImageWidth(numImages) {
  const width = Dimensions.get('window').width;
  return numImages > 1 ? width * 0.9 : width;
}

class SpeciesDetailView extends Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;
    const imageWidth = getImageWidth(species.images.length);

    return (
      <ScrollView>
        <View style={{height: imageWidth * (3/4) + captionHeight}}>
          <ImagesCarousel
            images={species.images}
            assets={assets}
            width={imageWidth}
          />
        </View>
        <SpeciesTextContent species={species} />
      </ScrollView>
    );
  }
}

class ImagesCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.props.images),
    };
  }

  render() {
    return (
      <ListView
        enableEmptySections
        horizontal={true}
        dataSource={this.state.dataSource}
        renderRow={(image) => 
          <ImageCard
            image={image}
            assets={this.props.assets}
            width={this.props.width}
          />
        }
      />
    );
  }
}

const ImageCard = props => {
  const imageAsset = props.assets[props.image.filename];

  return (
    <View style={[styles.paragraph]}>
      <AspectRatioImage
        asset={imageAsset}
        aspectWidth={4}
        aspectHeight={3}
        width={props.width}
      />
      <View style={{height: captionHeight}}>
        <Text style={[styles.credit, styles.sideMarginsMini]}>
          Image credit: {props.image.credit}
          {props.image.note ? '\nNote: ' + props.image.note : ''}
        </Text>
      </View>
    </View>
  );
};
