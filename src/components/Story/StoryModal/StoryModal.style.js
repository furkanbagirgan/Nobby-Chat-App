import {StyleSheet} from 'react-native';

import colors from '../../../styles/colors';

//Here the basic styles of the Story modal are created.
const basicStyles = StyleSheet.create({
  modal:{
    justifyContent: "flex-end",
    margin:0,
  },
  container: {
    width: "100%",
    height: 355,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer:{
    width: "100%",
    height: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageWrapper:{
    width: '100%',
    height: 300,
  },
  image:{
    resizeMode: 'contain'
  }
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
