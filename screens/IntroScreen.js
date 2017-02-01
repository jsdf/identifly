import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {IntroContent} from '../pages/PagesContent';
import ExpensiveScene from '../components/ExpensiveScene';
export default class IntroScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Introduction',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
      >
        <ExpensiveScene>
          <View style={styles.sideMargins}>
            <IntroContent />
          </View>
        </ExpensiveScene>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  sideMargins: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
});

