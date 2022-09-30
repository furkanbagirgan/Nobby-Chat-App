import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import sizes from '../../../styles/fontSizes';
import radius from '../../../styles/radius';
import spaces from '../../../styles/spaces';

const basicStyles = StyleSheet.create({
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
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.bigSoft,
  },
  displayName: {
    fontSize: sizes.medium,
    marginLeft: spaces.margin.medium
  },
});

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
