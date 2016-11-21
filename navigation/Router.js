import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import SpeciesMatchesScreen from '../screens/SpeciesMatchesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => HomeScreen,
  matches: () => SpeciesMatchesScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
