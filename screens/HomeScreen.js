import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import {
  withNavigation,
} from '@exponent/ex-navigation';
import KenBurns from '../components/KenBurns';
import Button from '../components/Button';
import ListButton from '../components/ListButton';
import assets from '../content/assets';
import Router from '../navigation/Router';

const allSpecies = require('../content/species.json');
const imageAssets = allSpecies.map(species =>
  assets[species.images[0].filename]
);

@withNavigation
export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={[styles.container, styles.contentContainer]}>
        <KenBurns
          imageAssets={imageAssets}
          aspectWidth={4}
          aspectHeight={3}
          width={Dimensions.get('window').width}
        />
        <View style={styles.welcomeContainer}>
          <Text style={[styles.title]}>
            Identifly
          </Text>
          <Text style={[styles.lightText, styles.subtitle]}>
            Dragonflies and Damselflies
          </Text>
          <Text style={[styles.lightText, styles.subtitle]}>
            of the Top End
          </Text>
        </View>

        <View style={styles.mainButton}>
          <Button onPress={this._handleFilterPress} type="primary">
            Find a Species
          </Button>
        </View>

        <View style={styles.buttonList}>
          <ListButton onPress={this._goToIntro}>
            Introduction
          </ListButton>
          <ListButton onPress={this._goToAck}>
            Acknowledgements
          </ListButton>
        </View>
      </View>
    );
  }

  _goToIntro = () => {
    this.props.navigator.push(Router.getRoute('intro'));
  };

  _goToAck = () => {
    this.props.navigator.push(Router.getRoute('ack'));
  };

  _handleFilterPress = () => {
    this.props.navigation.performAction(({ tabs }) => {
      tabs('mainTabset').jumpToTab('speciesFilter');
    });

    // defeat batching which runs action before stack nav created
    setTimeout(() => {
      this.props.navigation.performAction(({ stacks }) => {
        stacks('speciesFilterStack').popToTop();
      });
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonList: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  mainButton: {
    marginBottom: 16,
  },
  lightText: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 15,
  },
  contentContainer: {
    paddingTop: 44,
  },
  welcomeContainer: {
    margin: 16,
  },
  welcomeImage: {
    width: 200,
    height: 34.5,
    marginTop: 3,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  largeText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  title: {
    lineHeight: 22,
    fontSize: 24,
    paddingTop: 2,
  },
  subtitle: {
    fontSize: 18,
  },
});
