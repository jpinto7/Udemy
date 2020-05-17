import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import Groups from '../screens/Groups';
import AddGroup from '../screens/AddGroup';
import Chat from '../screens/Chat';

const Stack = createStackNavigator();

const ChatFlow = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator name="chat">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShow: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShow: false }}
        />
        <Stack.Screen
          name="Groups Screen"
          component={SignIn}
          options={{ headerShow: false }}
        />
        <Stack.Screen
          name="Add Group Screen"
          component={SignIn}
          options={{ headerShow: false }}
        />
        <Stack.Screen
          name="Chat Screen"
          component={SignIn}
          options={{ headerShow: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ChatFlow;
