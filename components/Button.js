import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

const Button = props => {
  const backgroundColor = props.type === 'primary'
    ? Colors.tintColor
    : Colors.default;

  return (
    <View style={styles.helpContainer}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.link,
          {backgroundColor},
        ]}
      >
        <Text style={styles.linkText}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  helpContainer: {
    // marginTop: 10,
    // marginBottom: 10,
    alignSelf: 'stretch',
  },
  link: {
    alignSelf: 'stretch',
    paddingVertical: 15,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
});

module.exports = Button;
