import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Post"
        onPress={() => {
          navigation.navigate('Post');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default Profile;
