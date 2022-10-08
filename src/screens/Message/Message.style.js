import {StyleSheet} from 'react-native';

import colors from '../../styles/colors';
import spaces from '../../styles/spaces';

//Here the basic styles of the Message screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spaces.padding.medium,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.plainText,
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 40,
  },
  bottomContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.large,
    paddingBottom: spaces.padding.large,
  },
  inputWrapper: {
    width: '83%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spaces.padding.large,
    borderRadius: 25,
    shadowColor: colors.darkBackground,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendButton: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.primaryBlue,
    shadowColor: colors.darkBackground,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

//Here the changing styles of the Message screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.primaryBackground,
    },
    inputWrapper: {
      ...basicStyles.inputWrapper,
      backgroundColor: colors.lightBackground,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.secondaryBackground,
    },
    inputWrapper: {
      ...basicStyles.inputWrapper,
      backgroundColor: colors.plainBackground,
    },
  }),
};

export default styles;
