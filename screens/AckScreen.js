import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {AckContent} from '../pages/PagesContent';
export default class AckScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Acknowledgements',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
      >
        <View style={styles.sideMargins}>
          <AckContent />
        </View>
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
