import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Search = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
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

export default Search;
