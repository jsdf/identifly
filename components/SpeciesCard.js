import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Card extends Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;

    return (
      <View style={styles.card}>
        <ImagesCarousel images={species.images} assets={assets} />
        <View style={[styles.paragraph, styles.sideMargins]}>
          <Text style={styles.family}>{species.family}</Text>
          <Text style={styles.species}>{species.species}</Text>
        </View>

        <View style={[styles.paragraph, styles.sideMargins]}>
          <Text>{species.content}</Text>
        </View>
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

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  imageCanvas: {
    resizeMode: 'contain',
    height: 300,
    width: 300,
  },
  rounded: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sideMargins: {
    marginLeft: 32,
    marginRight: 32,
  },
  paragraph: {
    marginBottom: 8,
  },
  family: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
  },
  credit: {
    marginTop: 4,
    fontStyle: 'italic',
  }
});
