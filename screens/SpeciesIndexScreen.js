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

class SpeciesList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = this._getNextStateWithFilter(
      props,
      ''
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getNextStateWithFilter(nextProps, this.state.filterText));
  }

  _getFilteredDataSource = (species, filterText) => {
    return ds.cloneWithRows(
      species.filter(s =>
        `${s.family} ${s.species}`.toLowerCase()
          .includes(filterText.toLowerCase())
      )
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
        <View style={styles.separator} />
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
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  listTable: {
  },
  listCell: {
    padding: 6,
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

