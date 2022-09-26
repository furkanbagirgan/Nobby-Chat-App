import {StyleSheet} from 'react-native';
import spaces from '../../styles/spaces';
import radius from '../../styles/radius';

//Here the basic styles of the input are created.
const basicStyles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    borderRadius: radius.hugeSoft,
    paddingHorizontal: spaces.padding.large,
    marginVertical: spaces.margin.medium,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    marginLeft: spaces.margin.tiny,
    flex: 1,
    color: '#333',
  },
});

//Here the changing styles of the Login screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#F4F7F2',
    },
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: '#555',
    },
  }),
};

export default styles;
