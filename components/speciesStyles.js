import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  imageCanvas: {
    resizeMode: 'contain',
    height: 300,
    width: 300,
  },
  rounded: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sideMargins: {
    marginLeft: 32,
    marginRight: 32,
  },
  sideMarginsMini: {
    marginLeft: 8,
    marginRight: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  family: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  species: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  card: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  credit: {
    marginTop: 4,
    fontStyle: 'italic',
  }
});
