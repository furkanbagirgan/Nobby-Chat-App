import Toast from 'react-native-root-toast';

import colors from '../styles/colors';

//Displays an error message on the screen.
export const errorMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: false,
    hideOnPress: true,
    backgroundColor: colors.secondaryPink,
    textColor: colors.primaryText,
    containerStyle: {marginTop: 20},
    opacity: 1,
  });
};

//Displays an success message on the screen
export const successMessage = message => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: false,
    hideOnPress: true,
    backgroundColor: colors.secondaryGreen,
    textColor: colors.primaryText,
    containerStyle: {marginTop: 20},
    opacity: 1,
  });
};
