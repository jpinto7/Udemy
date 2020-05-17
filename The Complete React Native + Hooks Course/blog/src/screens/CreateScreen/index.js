import React, { useContext } from 'react';
import { Context as BlogContext } from '../../context/BlogContext';
import BlogPostForm from '../../components/BlogPostForm';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);

  const handleOnSubmit = (title, content) => () => {
    addBlogPost(title, content, () => {
      navigation.navigate('Home');
    });
  };

  return <BlogPostForm onSubmit={handleOnSubmit} />;
};

export default CreateScreen;
