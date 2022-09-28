import {StyleSheet,StatusBar} from 'react-native';

import colors from '../../styles/colors';
import sizes from '../../styles/fontSizes';
import radius from '../../styles/radius';
import spaces from '../../styles/spaces';

//Here the basic styles of the Home screen are created.
const basicStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
  headerContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spaces.padding.medium,
    marginTop: spaces.margin.medium,
    marginBottom: spaces.margin.huge,
    backgroundColor: 'transparent'
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.hugeSoft,
  },
  headerTextWrapper: {
    marginLeft: spaces.margin.medium,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  headerText: {},
  displayName:{
    fontSize: sizes.xlarge,
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  newMessageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  storiesContainer:{
    width: '100%',
    height: 100,
    paddingHorizontal: spaces.padding.medium,
    backgroundColor: 'transparent'
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: spaces.padding.medium,
  }
});

//Here the changing styles of the Home screen are created.
const styles = {
  light: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.primaryBackground,
    },
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: colors.primaryBackground,
    },
    iconWrapper: {
      ...basicStyles.iconWrapper,
      backgroundColor: colors.primaryBackground,
    },
    headerText:{
      ...basicStyles.headerText,
      color: colors.secondaryText
    },
    chatContainer: {
      ...basicStyles.chatContainer,
      backgroundColor: colors.primaryBackground
    }
  }),
  dark: StyleSheet.create({
    ...basicStyles,
    container: {
      ...basicStyles.container,
      backgroundColor: colors.secondaryBackground,
    },
    imageWrapper: {
      ...basicStyles.imageWrapper,
      backgroundColor: colors.secondaryBackground,
    },
    iconWrapper: {
      ...basicStyles.iconWrapper,
      backgroundColor: colors.secondaryBackground,
    },
    headerText:{
      ...basicStyles.headerText,
      color: colors.darkText
    },
    chatContainer: {
      ...basicStyles.chatContainer,
      backgroundColor: colors.secondaryBackground
    }
  }),
};

export default styles;
