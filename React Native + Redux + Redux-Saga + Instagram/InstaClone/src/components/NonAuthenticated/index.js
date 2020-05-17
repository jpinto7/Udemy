import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Register from './Register';

const nonAuthScreens = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    cardShadowEnabled: false,
  },
);

export default nonAuthScreens;
