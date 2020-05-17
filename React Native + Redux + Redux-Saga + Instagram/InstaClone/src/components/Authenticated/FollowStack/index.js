import { createStackNavigator } from 'react-navigation-stack';
import FollowTab from '../FollowTab';
import Profile from '../Profile';
import Post from '../Post';
import Comments from '../Comments';

const FollowStack = createStackNavigator(
  {
    FollowTab: {
      screen: FollowTab,
      navigationOptions: {
        headerShown: false,
      },
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
    initialRouteName: 'FollowTab',
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

export default FollowStack;
