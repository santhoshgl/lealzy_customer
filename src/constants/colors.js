import { Colors as UIColor } from 'react-native-ui-lib';

const Colors = {
  white: '#fff',
  black: '#000',
  gray300: '#D0D5DD',
  gray500: '#667085',
  gray700: '#344054',
  primary600: '#FF4048',
  primary700: '#CC333A',

}

export default Colors

UIColor.loadSchemes({
  light: {
    ...Colors
  },
  dark: {
    ...Colors
  }
});