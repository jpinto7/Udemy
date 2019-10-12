import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoalItem = ({ title, onDelete }) => (
  <TouchableOpacity onPress={onDelete}>
    <View style={styles.listItem}>
      <Text>{title}</Text>
    </View>
  </TouchableOpacity>
);

GoalItem.defaultProps = {
  title: '',
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#cccccc',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default GoalItem;
