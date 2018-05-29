import Exponent from 'expo';
import React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {NavigationProvider, StackNavigation} from '@expo/ex-navigation';
import {FontAwesome} from '@expo/vector-icons';
import {Sentry} from 'react-native-sentry';

import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import backgroundCache from './utilities/backgroundCache';
import values from './utils/values';

Sentry.config(
  'https://b9a5b32c9b7e429cae32082a9c946aa4:a06d9e13184f4283ad627956eb5db6b5@sentry.io/152097'
).install();

export default class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [],
        fonts: [
          FontAwesome.font,
          {'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')},
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({appIsReady: true});
      setTimeout(() => {
        this._loadDeferredAssetsAsync();
      }, 3000);
    }
  }

  _loadDeferredAssetsAsync() {
    backgroundCache({
      images: values(require('./content/assets')),
    });
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <View style={styles.container}>
          <NavigationProvider router={Router}>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('rootNavigation')}
            />
          </NavigationProvider>

          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && (
            <View style={styles.statusBarUnderlay} />
          )}
        </View>
      );
    } else {
      return <Exponent.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
