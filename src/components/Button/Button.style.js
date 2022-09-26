import {StyleSheet} from 'react-native';
import spaces from '../../styles/spaces';
import radius from '../../styles/radius';
import sizes from '../../styles/fontSizes';
import colors from '../../styles/colors';

//Here the basic styles of the button are created.
const basicStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spaces.padding.huge,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.hugeSoft,
  },
  title: {
    fontSize: sizes.medium,
    fontWeight: 'bold',
  },
});

//Here the changing styles of the button are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#FFFC00',
    },
    title: {
      ...basicStyles.title,
      color: '#000',
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#FFFC00',
    },
    title: {
      ...basicStyles.title,
      color: '#FFF',
    },
  }),
  blue: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.plainBlue,
    },
    title: {
      ...basicStyles.title,
      color: '#000',
    },
  })
};

export default styles;
