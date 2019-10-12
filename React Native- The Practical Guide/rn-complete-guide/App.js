import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = enteredGoal => {
    setCourseGoals(currentGoals => [...currentGoals, enteredGoal]);
    setIsAddMode(false);
  };

  const deleteGoalHandler = index => {
    setCourseGoals(currentGoals => {
      const goals = [...currentGoals];
      goals.splice(index, 1);
      return goals;
    });
  };

  const cancelModal = () => {
    setIsAddMode(false);
  };

  const addModeHandler = () => {
    setIsAddMode(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Goal" onPress={addModeHandler} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelModal}
      />
      <FlatList
        data={courseGoals}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={({ item, index }) => (
          <GoalItem
            title={item}
            onDelete={deleteGoalHandler.bind(this, index)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
});
