import {createRouter} from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SpeciesFilterScreen from '../screens/SpeciesFilterScreen';
import SpeciesMatchesScreen from '../screens/SpeciesMatchesScreen';
import SpeciesDetailScreen from '../screens/SpeciesDetailScreen';
import SpeciesIndexScreen from '../screens/SpeciesIndexScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IntroScreen from '../screens/IntroScreen';
import AckScreen from '../screens/AckScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  speciesFilter: () => SpeciesFilterScreen,
  matches: () => SpeciesMatchesScreen,
  speciesDetail: () => SpeciesDetailScreen,
  speciesIndex: () => SpeciesIndexScreen,
  settings: () => SettingsScreen,
  intro: () => IntroScreen,
  ack: () => AckScreen,
  rootNavigation: () => RootNavigation,
}));
