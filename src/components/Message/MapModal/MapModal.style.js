import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';
import sizes from '../../../styles/fontSizes';
import radius from '../../../styles/radius';
import spaces from '../../../styles/spaces';

//Here the basic styles of the Map modal are created.
const basicStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    borderTopLeftRadius: radius.largeSoft,
    borderTopRightRadius: radius.largeSoft,
    paddingTop: 18,
  },
  close: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  header: {
    fontSize: sizes.medium,
    marginBottom: spaces.margin.big,
    alignSelf: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  mapContainer: {
    flex: 1,
  },
});

//Here the changing styles of the Map modal are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.primaryBackground,
    },
    header: {
      ...basicStyles.header,
      color: colors.primaryText,
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.secondaryBackground,
    },
    header: {
      ...basicStyles.header,
      color: colors.secondaryText,
    },
  }),
};

export default styles;
