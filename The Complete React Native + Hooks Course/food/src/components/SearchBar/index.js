import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.background}>
      <Feather style={styles.searchIcon} name="search" />
      <TextInput autoCapitalize="none" autoCorrect={false} style={styles.textInput} placeholder="Search" value={term} onChangeText={onTermChange} onEndEditing={onTermSubmit} />
    </View>
  );
};

SearchBar.propTypes = {
  term: PropTypes.string.isRequired,
  onTermChange: PropTypes.func.isRequired,
  onTermSubmit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10
  },
  searchIcon: {
    marginHorizontal: 15,
    fontSize: 35,
    alignSelf: 'center'

  },
  textInput: {
    flex: 1,
    fontSize: 18
  }
});

export default SearchBar;
