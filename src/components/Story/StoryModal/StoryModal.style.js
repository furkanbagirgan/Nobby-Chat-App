import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import radius from '../../../styles/radius';
import spaces from '../../../styles/spaces';

//Here the basic styles of the Story modal are created.
const basicStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    width: '100%',
    height: 400,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: radius.largeSoft,
    borderTopRightRadius: radius.largeSoft,
    paddingTop: spaces.padding.big,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.small,
    paddingBottom: spaces.padding.medium,
  },
  imageWrapper: {
    width: '100%',
    height: 300,
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
});

//Here the changing styles of the Story modal are created.
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
