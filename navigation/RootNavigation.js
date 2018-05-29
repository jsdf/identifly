import React from 'react';
import {StyleSheet} from 'react-native';
import {Notifications} from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import {Entypo} from '@expo/vector-icons';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        navigatorUID="mainTabset"
        initialTab="home"
      >
        <TabNavigationItem
          id="home"
          title="Home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}
        >
          <StackNavigation navigatorUID="homeStack" initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="speciesFilter"
          title="Identify"
          renderIcon={isSelected =>
            this._renderIcon('magnifying-glass', isSelected)
          }
        >
          <StackNavigation
            navigatorUID="speciesFilterStack"
            initialRoute="speciesFilter"
          />
        </TabNavigationItem>

        <TabNavigationItem
          id="speciesIndex"
          title="Index"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}
        >
          <StackNavigation
            navigatorUID="speciesIndexStack"
            initialRoute="speciesIndex"
          />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <Entypo
        name={name}
        size={30}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
        style={{marginBottom: -2}}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    // registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({origin, data}) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}
