import React, { useContext } from 'react';
import { Context as BlogContext } from '../../context/BlogContext';
import BlogPostForm from '../../components/BlogPostForm';

const EditScreen = ({ navigation, route }) => {
  const { state: posts, editBlogPost } = useContext(BlogContext);
  const blogPost = posts.find((post) => post.id === route.params.id);

  const handleOnSubmit = (title, content) => () => {
    const id = route.params.id;
    editBlogPost(id, title, content, () => {
      navigation.pop();
    });
  };

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={handleOnSubmit}
    />
  );
};

export default EditScreen;
