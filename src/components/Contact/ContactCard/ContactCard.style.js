import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import sizes from '../../../styles/fontSizes';
import radius from '../../../styles/radius';
import spaces from '../../../styles/spaces';

//Here the basic styles of the Contact card component are created.
const basicStyles = StyleSheet.create({
  outerContainer: {
    borderRadius: radius.curved,
  },
  container: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.large,
  },
  imageWrapper: {
    width: 54,
    height: 54,
    borderRadius: radius.bigSoft,
    backgroundColor: colors.plainText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.bigSoft,
  },
  displayName: {
    fontSize: sizes.medium,
    marginLeft: spaces.margin.medium,
    maxWidth: '75%',
  },
});

//Here the changing styles of the Contact card component are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    displayName: {
      ...basicStyles.displayName,
      color: colors.primaryText,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    displayName: {
      ...basicStyles.displayName,
      color: colors.secondaryText,
    },
  }),
};

export default styles;
