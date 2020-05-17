import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Follow = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Follow</Text>
      <Button
        title="Author"
        onPress={() => {
          navigation.navigate('Author');
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

export default Follow;
