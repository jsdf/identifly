import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {ExponentConfigView} from '@expo/samples';

import {Constants} from 'expo';
export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'exp.json',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
      >
        <Text>deviceYearClass: {Constants.deviceYearClass}</Text>
        {/* Go ahead and delete ExponentConfigView and replace it with your
           * content, we just wanted to give you a quick view of your config */}
        <ExponentConfigView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
