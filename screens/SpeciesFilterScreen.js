import React from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import Router from '../navigation/Router';
import speciesStyles from '../components/speciesStyles';

const allSpecies = require('../content/species.json');
import assets from '../content/assets';

export default class SpeciesFilterScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Find a Species',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[
          speciesStyles.paragraph,
          {
            marginLeft: 10,
            marginRight: 10,
          },
        ]}>
          <Text>What is the most prominent colour you can see?</Text>
        </View>
        <ColourList
          species={allSpecies}
          assets={assets}
          navigator={this.props.navigator}
        />
      </View>
    );
  }
}

class ColourList extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const colours = new Set();
    const addColourToSet = c => colours.add(c);
    this.props.species.forEach(s => s.bodycolours.map(addColourToSet));

    this.state = {
      dataSource: ds.cloneWithRows(Array.from(colours.values())),
    };
  }

  render() {
    return (
      <ListView
        style={[styles.container, styles.white]}
        dataSource={this.state.dataSource}
        renderRow={(colour) =>
          <TouchableHighlight
            onPress={() => this._filterByColour(colour)}
            style={styles.listRow}
          >
            <View style={styles.white}>
              <View style={styles.listCell}>
                <Text>{colour}</Text>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableHighlight>
        }
      />
    );
  }

  _filterByColour = (colour) => {
    this.props.navigator.push(Router.getRoute('matches', {colour}));
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
  listRow: {
    height: 44,
  },
  listCell: {
    justifyContent: 'center',
    height: 43,
    paddingLeft: 10,
    paddingRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 0,
  },
});

