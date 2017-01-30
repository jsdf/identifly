import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EvilIcons } from '@exponent/vector-icons';

const ListButton = props => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.button,
        ]}
      >
        <Text style={styles.buttonText}>
          {props.children}
        </Text>
        <EvilIcons name="chevron-right" size={32} color="black"  style={styles.buttonIcon}/>

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
    alignItems: 'center'
  },
  buttonIcon:  {
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
