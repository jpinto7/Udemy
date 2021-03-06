import React, { useContext, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Context as BlogContext } from '../../context/BlogContext';

const HomeScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

  useEffect(() => {
    getBlogPosts();
    const unsubscribe = navigation.addListener('focus', () => {
      getBlogPosts();
    });

    return unsubscribe;
  }, []);

  const handleOnPressTrash = (id) => () => {
    deleteBlogPost(id);
  };

  const handleOnPressPost = (id) => () => {
    navigation.navigate('Show', { id });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Create');
          }}
        >
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => `${blogPost.id}`}
        renderItem={({ item: blog }) => {
          return (
            <TouchableOpacity onPress={handleOnPressPost(blog.id)}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {blog.title} - {blog.id}
                </Text>
                <TouchableOpacity onPress={handleOnPressTrash(blog.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default HomeScreen;
