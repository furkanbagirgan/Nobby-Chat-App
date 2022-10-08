import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import spaces from '../../../styles/spaces';

//Here the styles of the Chats component are created.
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    paddingTop: spaces.padding.micro,
    paddingBottom: spaces.padding.big,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.plainText,
  },
});

export default styles;
