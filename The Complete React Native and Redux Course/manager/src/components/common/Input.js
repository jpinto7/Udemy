import React, { PropTypes } from 'react';
import styled from 'styled-components/native';

const TextInput = styled.TextInput`
  height: 40;
  width: 100;
  color: #000000;
  padding-right: 5;
  padding-left: 5;
  font-size: 18;
  line-height: 43;
  flex: 2;
`;

const Label = styled.Text`
  font-size: 18;
  padding-left: 20;
  flex: 1;
`;

const InputContainer = styled.View`
  height: 40;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Input = ({ autoCapitalize, label, onChangeText, placeholder, secureTextEntry, value }) => (
  <InputContainer>
    <Label>{label}</Label>
    <TextInput
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </InputContainer>
);

Input.propTypes = {
  autoCapitalize: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  autoCapitalize: 'none',
};

export { Input };
