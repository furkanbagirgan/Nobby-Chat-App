import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import sizes from '../../styles/fontSizes';

//Here the basic styles of the StoryDetail screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorWrapper: {
    flex: 9,
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
  },
});

//Here the changing styles of the StoryDetail screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.primaryBackground,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.secondaryBackground,
    },
  }),
};

export default styles;
