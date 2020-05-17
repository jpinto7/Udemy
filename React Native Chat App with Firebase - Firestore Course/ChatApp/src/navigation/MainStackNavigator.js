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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Groups Screen"
          component={Groups}
          options={{ title: 'Groups' }}
        />
        <Stack.Screen
          name="Add Group Screen"
          component={AddGroup}
          options={{ title: 'Add Group' }}
        />
        <Stack.Screen
          name="Chat Screen"
          component={Chat}
          options={{ title: 'Chats' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainStackNavigator = () => ChatFlow();

export default MainStackNavigator;
