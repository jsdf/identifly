import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';

import getWindowDimensions from '../utils/getWindowDimensions';
import ListButton from '../components/ListButton';
import speciesStyles from '../components/speciesStyles';
import AspectRatioImage from '../components/AspectRatioImage';
import firstCap from '../utils/firstCap';
import simpleMemoize from '../utils/simpleMemoize';

import Router from '../navigation/Router';

const allSpecies = require('../content/species.json');
const speciesByColour = require('../content/speciesByColour.json');
const coloursSorted = require('../content/coloursSorted.json');

import assets from '../content/assets';

function getColoursMap() {
  const coloursMap = {};
  coloursSorted.forEach(c => coloursMap[c.id] = c);
  return coloursMap;
}

const getColoursMapMemo = simpleMemoize(getColoursMap);

function getColourLabel(id) {
  const coloursMap = getColoursMapMemo();
  if (coloursMap[id]) {
    return coloursMap[id].label;
  }
  console.warn(`missing colour ${id}`);
  return '';
}

export default class SpeciesMatchesScreen extends React.Component {
  static route = {
    navigationBar: {
      title(params) {
        return `Matching Species (${getColourLabel(params.colour)})`;
      },
    },
  }

  render() {
    return (
      <SpeciesList
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
    this._speciesByColour = speciesByColour;


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
        .sort((a, b) => a.weight < b.weight ? -1 : 1)
        .map(({speciesIndex}) => allSpecies[speciesIndex])
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


        <ListButton
          onPress={this.props.onPress}
        >
          More info 
        </ListButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
       width={getWindowDimensions().width}
     />
  );
};
