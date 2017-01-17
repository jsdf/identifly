import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

import KenBurns from '../components/KenBurns';
import Colors from '../constants/Colors';
import assets from '../content/assets';

const allSpecies = require('../content/species.json');
const imageAssets = allSpecies.map(species =>
  assets[species.images[0].filename]
);

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
          aspectWidth={16}
          aspectHeight={9}
          width={Dimensions.get('window').width}
        />
        <View style={styles.welcomeContainer}>
          <Text style={styles.largeText}>
            Identifly
          </Text>
          <Text style={styles.developmentModeText}>
            Dragonflies and Damselflies of the Top End
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={this._handleFilterPress} style={styles.link}>
            <Text style={styles.linkText}>
              Find a Species
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleFilterPress = () => {
    this.props.navigator.push('speciesFilter');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
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
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  largeText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  link: {
    alignSelf: 'stretch',
    paddingVertical: 15,
    backgroundColor: Colors.tabIconSelected,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
});
