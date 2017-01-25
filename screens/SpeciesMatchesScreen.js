import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Dimensions,
} from 'react-native';

import speciesStyles from '../components/speciesStyles';
import AspectRatioImage from '../components/AspectRatioImage';
import Button from '../components/Button';

import Router from '../navigation/Router';

const allSpecies = require('../content/species.json');
import assets from '../content/assets';

export default class SpeciesMatchesScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `Matching Species (${params.colour})`;
      },
    },
  }

  render() {
    return (
      <SpeciesList
        species={allSpecies}
        assets={assets}
        route={this.props.route}
        navigator={this.props.navigator}
      />
    );
  }
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SpeciesList extends React.PureComponent {
  constructor(props) {
    super(props);
    this._speciesByColour = {};
    this.props.species.forEach((s) => {
      s.bodycolours.forEach((colour) => {
        if (this._speciesByColour[colour] == null) {
          this._speciesByColour[colour] = [];
        }
        this._speciesByColour[colour].push(s);
      });
    });

    this.state = {
      dataSource: this._getRows(this.props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this._getRows(nextProps),
    });
  }

  _getRows(props) {
    return ds.cloneWithRows(
      this._speciesByColour[props.route.params.colour]
    );
  }

  render() {
    return (
      <ListView
        style={[styles.container, styles.white]}
        dataSource={this.state.dataSource}
        renderRow={
          (species) => {
            const onPress = () => this._gotoSpecies(species);

            return (
              <TouchableHighlight onPress={onPress}>
                <View style={styles.white}>
                  <SpeciesMatchCard
                    species={species}
                    assets={this.props.assets}
                    onPress={onPress}
                  />
                </View>
              </TouchableHighlight>
            );
          }
        }
      />
    );
  }

  _gotoSpecies = (species) => {
    this.props.navigator.push(Router.getRoute('speciesDetail', {species}));
  };
}

class SpeciesMatchCard extends React.Component {
  render() {
    const species = this.props.species;
    const assets = this.props.assets;

    return (
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <ImageCard image={species.images[0]} assets={assets} />
        </View>
        <View style={[styles.textContent, speciesStyles.sideMargins]}>
          <Text style={speciesStyles.family}>{species.family}</Text>
          <Text style={speciesStyles.species}>{species.species}</Text>
        </View>

        <Button onPress={this.props.onPress}>
          More info
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    // paddingTop: 15,
  },
  textContent: {
    marginBottom: 8,
  },
  card: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: 'white',
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  imageWrapper: {
    marginBottom: 8,
  },
});

const ImageCard = props => {
  const imageAsset = props.assets[props.image.filename];

  return (
    <AspectRatioImage
     asset={imageAsset}
     aspectWidth={4}
     aspectHeight={3}
     width={Dimensions.get('window').width}
   />
  );
};
