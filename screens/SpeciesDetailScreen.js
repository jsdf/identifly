import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
  Image,
} from 'react-native';
import styles from '../components/speciesStyles';
import SpeciesTextContent from '../components/SpeciesTextContent';

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


class SpeciesDetailView extends Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;

    return (
      <View style={styles.card}>
        <ImagesCarousel images={species.images} assets={assets} />
        <SpeciesTextContent species={species} />
      </View>
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
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(image) => 
          <ImageCard image={image} assets={this.props.assets} />
        }
      />
    );
  }
}

const ImageCard = props => {
  const imageAsset = props.assets[props.image.filename];

  return (
    <View style={[styles.imageContainer, styles.paragraph]}>
      <Image
        source={imageAsset}
        style={[styles.imageCanvas, styles.rounded]}
      />
      <Text style={[styles.credit, styles.sideMargins]}>
        Image credit: {props.image.credit}
        {props.image.note ? '\nNote: ' + props.image.note : ''}
      </Text>
    </View>
  );
};
