import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens/index';

registerScreens(); // this is where you register all of your app's screens

// Start the App with the login screen
Navigation.startSingleScreenApp({
  screen: {
    screen: 'star-wars.LoginScreen', // unique ID registered with Navigation.registerScreen
    title: 'Login' // title of the screen as appears in the nav bar (optional)
  }
});

// Start the search screen
export const startSearchScreen = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'star-wars.SearchScreen', // unique ID registered with Navigation.registerScreen
      title: 'Search' // title of the screen as appears in the nav bar (optional)
    }
  });
};
