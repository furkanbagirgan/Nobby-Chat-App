import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import spaces from '../../../styles/spaces';
import radius from '../../../styles/radius';

//Here the basic styles of the User Card component are created.
const basicStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginHorizontal: spaces.margin.small,
  },
  imageWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.secondaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  displayName: {
    fontWeight: 'bold',
    color: colors.primaryText,
    flexShrink: 1,
    textAlign: 'center',
  },
  addWrapper: {
    position: 'absolute',
    bottom: 3,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: radius.soft,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkBackground,
  },
});

//Here the changing styles of the User card component are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: colors.primaryBackground,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: colors.secondaryBackground,
    },
  }),
};

export default styles;
