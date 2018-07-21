import { Navigation } from 'react-native-navigation';

import LoginScreen from './Login/Login';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('star-wars.LoginScreen', () => LoginScreen);
}
