import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Context as BlogContext } from '../../context/BlogContext';

const ShowScreen = ({ navigation }) => {
  const { state:posts } = useContext(BlogContext);
  const blogPost = posts.find(post => post.id === navigation.getParam('id'));
  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  const handleOnPressPencil = () => {
    navigation.navigate('Edit', { id: navigation.getParam('id') });
  };

  return {
    headerRight: (
      <TouchableOpacity onPress={handleOnPressPencil}>
        <EvilIcons name="pencil" size={30} />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({

});

export default ShowScreen;
