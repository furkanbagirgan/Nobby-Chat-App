import {StyleSheet} from 'react-native';
import spaces from '../../styles/spaces';
import radius from '../../styles/radius';
import sizes from '../../styles/fontSizes';
import colors from '../../styles/colors';

//Here the basic styles of the button are created.
const basicStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.padding.huge,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.hugeSoft,
  },
  title: {
    fontSize: sizes.medium,
    fontWeight: 'bold',
  },
});

//Here the changing styles of the button are created.
const styles = {
  green: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.primaryGreen,
    },
    title: {
      ...basicStyles.title,
      color: colors.primaryText,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.plainBackground,
    },
    title: {
      ...basicStyles.title,
      color: colors.secondaryText,
    },
  }),
  blue: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.plainBlue,
    },
    title: {
      ...basicStyles.title,
      color: colors.primaryText,
    },
  }),
};

export default styles;
