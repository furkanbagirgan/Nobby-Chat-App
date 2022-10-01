import {StyleSheet} from 'react-native';

import sizes from '../../../styles/fontSizes';

//Here the styles of the Contacts component are created.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: sizes.large,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
