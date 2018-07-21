import { Navigation } from 'react-native-navigation';

import LoginScreen from './src/screens/Login/Login';

// Registering Screens
Navigation.registerComponent('star-wars.LoginScreen', () => LoginScreen);

// Start the App with the login screen
Navigation.startSingleScreenApp({
  screen: {
    screen: 'star-wars.LoginScreen', // unique ID registered with Navigation.registerScreen
    title: 'Login' // title of the screen as appears in the nav bar (optional)
  }
});
