import React from 'react';
import PropTypes from 'prop-types';
import { View, Button, Text, StyleSheet } from 'react-native';

const Post = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Post</Text>
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

Post.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Post;
