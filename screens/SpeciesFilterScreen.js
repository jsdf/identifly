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

import assets from '../content/assets';
const coloursSorted = require('../content/coloursSorted.json');

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
      <View style={styles.mainContainer}>
        <View style={[
          speciesStyles.paragraph,
          styles.sideMargins,
        ]}>
          <Text>What is the most prominent colour you can see?</Text>
        </View>
        <ColourList
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

    this.state = {
      dataSource: ds.cloneWithRows(coloursSorted),
    };
  }

  render() {
    return (
      <ListView
        style={[styles.container, styles.white]}
        dataSource={this.state.dataSource}
        renderRow={(row) =>
          <Row {...row} onPress={this._filterByColour} />
        }
      />
    );
  }

  _filterByColour = (colour) => {
    this.props.navigator.push(Router.getRoute('matches', {colour}));
  };
}

class Row extends React.PureComponent {
  render() {
    return (
      <View style={styles.rowClip}>
        <TouchableHighlight
          onPress={this._onPress}
        >
          <View style={styles.white}>
            <View style={styles.listRow}>
              <Colours colours={this.props.colours} />
              <View style={[styles.white, styles.listCell]}>
                <View>
                  <Text>{this.props.label}</Text>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _onPress = () => this.props.onPress(this.props.id);
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
  rowClip: {
    overflow: 'hidden',
  },
  white: {
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    paddingTop: 15,
  },
  container: {
    flex: 1,
  },
  sideMargins: {
    marginLeft: 16,
    marginRight: 16,
  },
  listRow: {
    marginLeft: 16,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listCell: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 0,
  },
});

