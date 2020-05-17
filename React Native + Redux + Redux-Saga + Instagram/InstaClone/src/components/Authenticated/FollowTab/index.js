import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Follow from '../Follow';

const FollowTab = createMaterialTopTabNavigator({
  Follow: {
    screen: Follow,
  },
  Followers: {
    screen: Follow,
  },
});

export default FollowTab;
