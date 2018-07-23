import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { registerScreens } from './src/screens/index';

registerScreens(); // this is where you register all of your app's screens

// Start the login screen
export const startLoginScreen = (loggedOut) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'star-wars.LoginScreen', // unique ID registered with Navigation.registerScreen
      title: 'Sign In', // title of the screen as appears in the nav bar (optional)
      navigatorStyle: {
        navBarTransparent: true, // make the nav bar transparent, works best with drawUnderNavBar:true
        navBarTranslucent: true, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
        drawUnderNavBar: true, // draw the screen content under the nav bar, works best with navBarTranslucent:true
        navBarTextColor: 'white', // change the text color of the title (remembered across pushes)
        navBarTitleTextCentered: true, // default: false. centers the title.
      } // override the navigator style for the screen, see "Styling the navigator" below (optional)
    },
    passProps: {
      loggedOut
    } // simple serializable object that will pass as props to all top screens (optional)
  });
};

// Start the search screen
export const startSearchScreen = (username) => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out', 30)
  ]).then((icons) => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'star-wars.SearchScreen', // unique ID registered with Navigation.registerScreen
        title: 'Search', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {
          navBarTextColor: 'white', // change the text color of the title (remembered across pushes)
          navBarBackgroundColor: 'black', // change the background color of the nav bar (remembered across pushes)
          navBarButtonColor: 'white', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)
          navBarTitleTextCentered: true, // default: false. centers the title.
          navBarTopPadding: 24 // Optional, set navBar top padding in dp. Useful when StatusBar.translucent=true on Android Lollipop and above.
        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {
          rightButtons: [
            {
              title: 'Sign Out', // for a textual button, provide the button title (label)
              id: 'sign-out', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
              icon: icons[0] // for icon button, provide the local image asset name
            }
          ] // buttons for the left side of the nav bar (optional)
        } // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
      },
      passProps: {
        username
      } // simple serializable object that will pass as props to all top screens (optional)
    });
  });
};

// Start the App with the login screen
startLoginScreen(false);
