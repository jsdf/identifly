import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import Colors from '../constants/Colors';

const ListButton = props => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity onPress={props.onPress} style={[styles.button]}>
        <Text style={styles.buttonText}>{props.children}</Text>
        <Entypo
          name="chevron-right"
          size={24}
          color={Colors.tabIconDefault}
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  button: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 50,
    textAlign: 'right',
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    fontSize: 14,
  },
});

module.exports = ListButton;
