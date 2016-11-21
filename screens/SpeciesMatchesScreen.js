import React from 'react';
import {
  ListView,
  StyleSheet,
} from 'react-native';
import SpeciesCard from '../components/SpeciesCard';

const allSpecies = require('../content/species.json');
import assets from '../content/assets';

export default class SpeciesMatchesScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Matching Species',
    },
  }

  render() {
    return (
      <SpeciesList species={allSpecies} assets={assets} />
    );
  }

}

class SpeciesList extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.props.species),
    };
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(species) => 
          <SpeciesCard species={species} assets={this.props.assets} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

