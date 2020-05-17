import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Author"
        onPress={() => {
          navigation.navigate('Author');
        }}
      />
      <Button
        title="Comments"
        onPress={() => {
          navigation.navigate('Comments');
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

export default Home;
