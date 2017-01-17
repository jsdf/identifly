import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SpeciesFilterScreen from '../screens/SpeciesFilterScreen';
import SpeciesMatchesScreen from '../screens/SpeciesMatchesScreen';
import SpeciesDetailScreen from '../screens/SpeciesDetailScreen';
import SpeciesIndexScreen from '../screens/SpeciesIndexScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  speciesFilter: () => SpeciesFilterScreen,
  matches: () => SpeciesMatchesScreen,
  speciesDetail: () => SpeciesDetailScreen,
  speciesIndex: () => SpeciesIndexScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
