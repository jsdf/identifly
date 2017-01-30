import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';

import { EvilIcons } from '@exponent/vector-icons';

import speciesStyles from '../components/speciesStyles';
import AspectRatioImage from '../components/AspectRatioImage';
import firstCap from '../utils/firstCap';

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
    this._speciesByColour0 = {};
    this._speciesByColour1 = {};


    for (var si = 0; si < this.props.species.length; si++) {
      const s = this.props.species[si];
      for (let image of s.images) {
        if (image.colours[0]) {
          const c0 = image.colours[0];
          if (this._speciesByColour0[c0] == null) {
            this._speciesByColour0[c0] = [];
          }
          this._speciesByColour0[c0].push(si);
        }
        if (image.colours[1]) {
          const c1 = image.colours[1];
          if (this._speciesByColour1[c1] == null) {
            this._speciesByColour1[c1] = [];
          }
          this._speciesByColour1[c1].push(si);
        }
      }
    }

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
      Array.from(
        new Set(
          [].concat(
            this._speciesByColour0[props.route.params.colour],
            this._speciesByColour1[props.route.params.colour]
          )
        )
      ).map(si => this.props.species[si])
    );
  }

  render() {
    return (
      <ListView
        style={[styles.container, styles.tan]}
        dataSource={this.state.dataSource}
        renderRow={
          (species) => {
            const onPress = () => this._gotoSpecies(species);

            return (
              <TouchableHighlight onPress={onPress}>
                <View style={styles.tan}>
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
          <Text style={speciesStyles.common}>{firstCap(species.common)}</Text>
          <Text style={speciesStyles.family}>{species.family}</Text>
          <Text style={speciesStyles.species}>{species.species}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={this.props.onPress}
            style={[
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>
              More info 
            </Text>
            <EvilIcons name="chevron-right" size={32} color="black"  style={styles.buttonIcon}/>

          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRow: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  button: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon:  {
    width: 50,
    textAlign: 'right',
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    fontSize: 14,
  },
  white: {
    backgroundColor: 'white',
  },
  tan: {
    backgroundColor: '#E9EBEE',
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
    marginBottom: 8,
    backgroundColor: 'white',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
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
