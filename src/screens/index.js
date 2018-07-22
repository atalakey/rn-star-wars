import { Navigation } from 'react-native-navigation';

import LoginScreen from './Login/Login';
import SearchScreen from './Search/Search';
import DetailsScreen from './Details/Details';

// register all screens of the app (including internal ones)
export const registerScreens = () => {
  Navigation.registerComponent('star-wars.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('star-wars.SearchScreen', () => SearchScreen);
  Navigation.registerComponent('star-wars.DetailsScreen', () => DetailsScreen);
}
