import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const Comments = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Comentarios</Text>
      <Button
        title="Autor"
        onPress={() => {
          navigation.navigate('Author');
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

export default Comments;
