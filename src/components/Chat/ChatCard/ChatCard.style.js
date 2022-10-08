import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import sizes from '../../../styles/fontSizes';
import radius from '../../../styles/radius';
import spaces from '../../../styles/spaces';

//Here the basic styles of the Chat card component are created.
const basicStyles = StyleSheet.create({
  outerContainer: {
    borderRadius: radius.curved,
  },
  container: {
    width: '100%',
    height: 70,
    borderRadius: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.large,
    marginTop: spaces.margin.small,
  },
  userWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
  messageWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: spaces.margin.medium,
    maxWidth: '77%',
  },
  displayName: {
    fontWeight: '600',
    fontSize: sizes.medium,
  },
  message: {
    fontSize: sizes.tiny,
    marginTop: spaces.margin.tiny,
  },
  detailWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  countWrapper: {
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.soft,
    backgroundColor: colors.primaryBlue,
    marginTop: spaces.margin.tiny,
  },
  count: {
    fontSize: sizes.small,
    fontWeight: '600',
    color: colors.primaryText,
  },
});

//Here the changing styles of the Chat card component are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    displayName: {
      ...basicStyles.displayName,
      color: colors.primaryText,
    },
    message: {
      ...basicStyles.message,
      color: colors.primaryText,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    displayName: {
      ...basicStyles.displayName,
      color: colors.secondaryText,
    },
    message: {
      ...basicStyles.message,
      color: colors.secondaryText,
    },
  }),
};

export default styles;
