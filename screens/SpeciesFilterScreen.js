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

import getSpeciesByColour from '../utils/getSpeciesByColour';
import getColours from '../utils/getColours';
import assets from '../content/assets';
const allSpecies = require('../content/species.json');

const COLOURMAP = {
  black: '#110F02',
  blue: '#B6E1F5',
  bronze: '#B7603B',
  brown: '#9E4C2A',
  green: '#A0B055',
  orange: '#FB9332',
  purple: '#7D1637',
  red: '#EE3425',
  yellow: '#FDDB35',
};

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
          styles.sideMargins,
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

    const coloursSorted = getColours(getSpeciesByColour(allSpecies));

    this.state = {
      dataSource: ds.cloneWithRows(coloursSorted),
    };
  }

  render() {
    return (
      <ListView
        style={[styles.container, styles.white]}
        dataSource={this.state.dataSource}
        renderRow={({id, colours, label}) =>
          <TouchableHighlight
            onPress={() => this._filterByColour(id)}
          >
            <View style={styles.listRow}>
              <Colours colours={colours} />
              <View style={styles.white}>
                <View style={styles.listCell}>
                  <Text>{label}</Text>
                </View>
                <View style={styles.separator} />
              </View>
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

const Colours = ({colours}) => (
  <View style={{
    flexDirection: 'row',
    width: 40,
    height: 40,
    overflow: 'hidden',
  }}>
    {
      colours.map(colour =>
        <View
          key={colour}
          style={{
            width: 40 / colours.length,
            height: 40,
            backgroundColor: COLOURMAP[colour] || colour,
          }}
        />
      )
    }
  </View>
);

const styles = StyleSheet.create({
  white: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
  sideMargins: {
    marginLeft: 10,
    marginRight: 10,
  },
  listRow: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listCell: {
    flex: 1,
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

