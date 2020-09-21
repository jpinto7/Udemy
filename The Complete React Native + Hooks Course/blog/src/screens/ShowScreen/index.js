import React, { useContext, useLayoutEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Context as BlogContext } from '../../context/BlogContext';

const ShowScreen = ({ navigation, route }) => {
  const { state: posts } = useContext(BlogContext);
  const blogPost = posts.find((post) => post.id === route.params.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Edit', { id: route.params.id });
          }}
        >
          <EvilIcons name="pencil" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
