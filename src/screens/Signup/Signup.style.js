import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import sizes from '../../styles/fontSizes';
import radius from '../../styles/radius';
import spaces from '../../styles/spaces';

//Here the basic styles of the Login screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.tiny,
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spaces.padding.big,
    borderRadius: radius.mediumSoft,
  },
  header: {
    fontSize: sizes.big,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: spaces.margin.huge,
    marginBottom: spaces.margin.medium,
  },
  signupText: {
    marginTop: spaces.margin.xhuge,
    marginBottom: spaces.margin.medium,
    fontWeight: 'bold',
    color: colors.secondaryText,
  },
  errorText: {
    color: colors.primaryPink,
  },
});

//Here the changing styles of the Login screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    wrapper: {
      ...basicStyles.wrapper,
      backgroundColor: 'rgba(255,255,255,0.5)',
    },
    header: {
      ...basicStyles.header,
      color: colors.primaryText,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    wrapper: {
      ...basicStyles.wrapper,
      backgroundColor: 'rgba(34,34,34,0.5)',
    },
    header: {
      ...basicStyles.header,
      color: colors.secondaryText,
    },
  }),
};

export default styles;
