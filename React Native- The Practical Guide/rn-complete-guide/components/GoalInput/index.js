import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Modal } from 'react-native';

const GoalInput = ({ onAddGoal, onCancel, visible }) => {
  const [enteredGoal, setEnteredGoal] = useState('');

  const goalInputHandler = text => {
    setEnteredGoal(text);
  };

  const addGoalHandler = () => {
    if (enteredGoal.length === 0) {
      return;
    }
    onAddGoal(enteredGoal);
    setEnteredGoal('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.innerContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button color="red" title="CANCEL" onPress={onCancel} />
          </View>
          <View style={styles.button}>
            <Button onPress={addGoalHandler} title="ADD" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    width: '40%',
  },
});

export default GoalInput;
