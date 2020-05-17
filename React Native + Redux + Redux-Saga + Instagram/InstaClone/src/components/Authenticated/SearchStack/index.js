import { createStackNavigator } from 'react-navigation-stack';
import Search from '../Search';
import Profile from '../Profile';
import Post from '../Post';
import Comments from '../Comments';

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
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
    initialRouteName: 'Search',
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

export default SearchStack;
