import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';

//Here the basic styles of the Signup screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//Here the changing styles of the Signup screen are created.
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