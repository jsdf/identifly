import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Text,
} from 'react-native';

import Router from '../navigation/Router';

const allSpecies = require('../content/species.json');
import assets from '../content/assets';

export default class SpeciesIndexScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Species List',
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

function firstMatchIndex(matchPositions) {
  let best = Infinity;
  for (var i = 0; i < matchPositions.length; i++) {
    if (matchPositions[i] !== -1 && matchPositions[i] < best) {
      best = matchPositions[i];
    }
  }
  if (best === Infinity) {
    return -1;
  }
  return best;
}

class SpeciesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this._index = [];
    for (var i = 0; i < this.props.species.length; i++) {
      const s = this.props.species[i];
      this._index.push(
        `${s.family} ${s.species}`.toLowerCase().split(' ')
      );
    }

    this.state = this._getNextStateWithFilter(
      props,
      ''
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getNextStateWithFilter(nextProps, this.state.filterText));
  }

  _getFilteredDataSource = (species, filterText) => {
    const matchText = filterText.toLowerCase();
    const matcher = w => w.indexOf(matchText);

    return ds.cloneWithRows(
      species.map((s, si) => {
        const matchPositions = this._index[si].map(matcher);
        return [
          firstMatchIndex(matchPositions),
          s,
        ];
      })
      .filter(match => match[0] !== -1)
      .sort((a, b) => a[0] < b[0] ? -1 : 1)
      .map(match => match[1])
    );
  };

  _getNextStateWithFilter = (props, filterText) => {
    return {
      filterText,
      dataSource: this._getFilteredDataSource(props.species, filterText),
    };
  };

  render() {
    return (
      <View style={[styles.container, styles.white]}>
        {this._renderHeader()}
        <View style={styles.line} />
        <ListView
          enableEmptySections
          style={styles.listTable}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );
  }

  _renderHeader = () => (
    <TextInput
      style={styles.searchInput}
      onChangeText={this._handleFilterChange}
      value={this.state.text}
      placeholder={'Search'}
    />
  );

  _renderRow = (species) => (
    <TouchableHighlight onPress={() => this._gotoSpecies(species)}>
      <View style={styles.white}>
        <View style={styles.listCell}>
          <Text>{species.family}</Text>
          <Text style={styles.speciesText}>{species.species}</Text>
          </View>
        <View style={styles.line} />
      </View>
    </TouchableHighlight>
  );

  _handleFilterChange = (text) => {
    this.setState(this._getNextStateWithFilter(this.props, text));
  };

  _gotoSpecies = (species) => {
    this.props.navigator.push(Router.getRoute('speciesDetail', {species}));
  };
}

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  searchInput: {
    margin: 10,
    height: 40,
    padding: 10,
    borderBottomColor: '#ccc',
    // borderRadius: 20,
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
  },
  line: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
  },
  listTable: {
  },
  listCell: {
    padding: 8,
    height: 50,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  speciesText: {
    fontStyle: 'italic',
  },
});

