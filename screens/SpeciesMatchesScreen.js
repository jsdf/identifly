import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import SpeciesMatchCard from '../components/SpeciesMatchCard';

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
        renderRow={(species) => 
          <TouchableHighlight onPress={() => this._gotoSpecies(species)}>
            <View style={styles.white}>
              <SpeciesMatchCard
                species={species}
                assets={this.props.assets}
              />
            </View>
          </TouchableHighlight>
        }
      />
    );
  }

  _gotoSpecies = (species) => {
    this.props.navigator.push(Router.getRoute('speciesDetail', {species}));
  };
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

