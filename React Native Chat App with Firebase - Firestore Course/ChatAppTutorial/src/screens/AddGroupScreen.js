import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const AddGroupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Group Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddGroupScreen;
