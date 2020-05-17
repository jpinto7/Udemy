import { createStackNavigator } from 'react-navigation-stack';
import Home from '../Home';
import Profile from '../Profile';
import Post from '../Post';
import Comments from '../Comments';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Author: {
      screen: Profile,
    },
    Post: {
      screen: Post,
    },
    Comments: {
      screen: Comments,
    },
  },
  {
    initialRouteName: 'Home',
    cardShadowEnabled: false,
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = true;
      const { routeName } = navigation.state.routes[navigation.state.index];
      if (routeName === 'Comments') {
        tabBarVisible = false;
      }
      return {
        tabBarVisible,
      };
    },
  },
);

export default HomeStack;
