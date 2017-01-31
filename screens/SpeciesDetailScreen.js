import React, { Component } from 'react';
import {
  ListView,
  Text,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from '../components/speciesStyles';
import AspectRatioImage from '../components/AspectRatioImage';
import firstCap from '../utils/firstCap';

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

const SpeciesTextContent = ({species}) => {
  return (
    <View>
      <View style={[styles.paragraph, styles.sideMargins]}>
        <Text style={styles.common}>{firstCap(species.common)}</Text>
        <Text style={styles.family}>{species.family}</Text>
        <Text style={styles.species}>{species.species}</Text>
        <Text style={styles.line}>({species.type})</Text>
      </View>

      <View style={[styles.paragraph, styles.sideMargins]}>
        <Text>{species.content}</Text>
      </View>
    </View>
  );
};

class SpeciesDetailView extends Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;

    const captionHeight = species.images.some(image =>
      image.note
    ) ? 66 : 44;

    const winWidth = Dimensions.get('window').width;
    const numImages = species.images.length;

    const imageWidth = numImages > 1 ? winWidth * 0.9 : winWidth;

    return (
      <ScrollView>
        <View style={{height: imageWidth * (3/4) + captionHeight}}>
          <ImagesCarousel
            images={species.images}
            assets={assets}
            width={imageWidth}
            captionHeight={captionHeight}
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
            captionHeight={this.props.captionHeight}
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
      <View style={{height: props.captionHeight, width: props.width}}>
        <Text style={[styles.credit, styles.sideMarginsMini]}>
          Image credit: {props.image.credit}
          {props.image.note ? '\nNote: ' + props.image.note : ''}
        </Text>
      </View>
    </View>
  );
};
