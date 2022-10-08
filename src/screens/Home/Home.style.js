import {StyleSheet, StatusBar} from 'react-native';

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
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spaces.padding.large,
    marginTop: spaces.margin.medium,
    marginBottom: spaces.margin.huge,
    backgroundColor: 'transparent',
  },
  leftContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  displayName: {
    fontSize: sizes.xlarge,
    fontWeight: 'bold',
    color: colors.primaryText,
    flexShrink: 1,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: sizes.tiny,
  },
  newMessageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: radius.largeSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userWrapper: {
    alignItems: 'center',
    marginLeft: spaces.margin.medium,
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderRadius: radius.largeSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radius.hugeSoft,
  },
  storiesContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: spaces.margin.huge,
  },
  chatContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 110,
  },
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
    headerMessage: {
      color: colors.secondaryText,
    },
    headerText: {
      ...basicStyles.headerText,
      color: colors.secondaryText,
    },
    chatContainer: {
      ...basicStyles.chatContainer,
      backgroundColor: colors.primaryBackground,
    },
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
    headerMessage: {
      color: colors.darkText,
    },
    headerText: {
      ...basicStyles.headerText,
      color: colors.darkText,
    },
    chatContainer: {
      ...basicStyles.chatContainer,
      backgroundColor: colors.secondaryBackground,
    },
  }),
};

export default styles;
