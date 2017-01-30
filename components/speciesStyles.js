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
    marginLeft: 16,
    marginRight: 16,
  },
  sideMarginsMini: {
    marginLeft: 8,
    marginRight: 8,
  },
  paragraph: {
    marginBottom: 8,
  },
  line: {
    lineHeight: 18,
  },
  common: {
    lineHeight: 22,
    fontSize: 24,
    paddingTop: 2,
  },
  family: {
    fontSize: 18,
  },
  species: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  card: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  credit: {
    marginTop: 4,
    fontStyle: 'italic',
  }
});
