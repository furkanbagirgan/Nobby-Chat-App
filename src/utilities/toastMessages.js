import Toast from 'react-native-root-toast';

import colors from '../styles/colors';

export const errorMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: false,
    hideOnPress: true,
    backgroundColor: colors.secondaryPink,
    textColor: colors.primaryText,
  });
};

export const successMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: false,
    hideOnPress: true,
    backgroundColor: colors.secondaryGreen,
    textColor: colors.primaryText,
  });
};
