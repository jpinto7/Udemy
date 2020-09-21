import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const handleOnChangeTitle = (title) => {
    setTitle(title);
  };

  const handleOnChangeContent = (content) => {
    setContent(content);
  };

  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={handleOnChangeTitle}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={handleOnChangeContent}
      />
      <Button title="Save Blog Post" onPress={onSubmit(title, content)} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

BlogPostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    content: '',
  },
};

export default BlogPostForm;
