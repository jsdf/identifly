import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './speciesStyles';

const SpeciesTextContent = ({species}) => {
  return (
    <View>
      <View style={[styles.paragraph, styles.sideMargins]}>
        <Text style={styles.family}>{species.family}</Text>
        <Text style={styles.species}>{species.species}</Text>
      </View>

      <View style={[styles.paragraph, styles.sideMargins]}>
        <Text>{species.content}</Text>
      </View>
    </View>
  );
};

export default SpeciesTextContent;
