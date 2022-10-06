import {StyleSheet,StatusBar} from 'react-native';

import colors from '../../styles/colors';
import radius from '../../styles/radius';
import spaces from '../../styles/spaces';

//Here the basic styles of the Profile screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    paddingHorizontal: spaces.padding.large,
  },
  buttonWrapper: {
    height: 115,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spaces.margin.big,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: spaces.margin.big,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    marginVertical: spaces.margin.xhuge,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.plainText,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  photoIconWrapper: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spaces.padding.tiny,
    borderRadius: radius.mediumSoft,
    backgroundColor: colors.darkBackground
  },
  iconsContainer: {
    width: '60%',
    position: 'absolute',
    bottom: -16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: spaces.margin.medium
  }
});

//Here the changing styles of the Profile screen are created.
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
