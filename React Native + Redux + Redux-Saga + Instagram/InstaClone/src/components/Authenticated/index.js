import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import FollowStack from './FollowStack';
import Add from './Add';
import Profile from './Profile';

const authScreens = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Search: {
      screen: SearchStack,
    },
    Add: {
      screen: Add,
    },
    Follow: {
      screen: FollowStack,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    tabBarPosition: 'top',
  },
);

export default authScreens;
