import {StyleSheet, Dimensions, StatusBar} from 'react-native';

import colors from '../../styles/colors';

//Here the basic styles of the Login screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingHorizontal: 5,
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
  },
  header: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  signupText: {
    marginTop: 25,
    marginBottom: 10,
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
