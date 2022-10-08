import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import sizes from '../../styles/fontSizes';
import radius from '../../styles/radius';

//Here the basic styles of the StoryDetail screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  loadingWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBackground,
  },
  imageLoadingWrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: sizes.large,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  deleteWrapper: {
    position: 'absolute',
    top: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    borderRadius: radius.hugeSoft,
    backgroundColor: colors.primaryPink,
  },
});

//Here the changing styles of the StoryDetail screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
    },
  }),
};

export default styles;
