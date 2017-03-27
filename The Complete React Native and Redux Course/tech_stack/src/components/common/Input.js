import React from 'react';
import styled from 'styled-components/native';

const TextInput = styled.TextInput`
  height: 60;
  width: 100;
  color: #000000;
  padding-right: 5;
  padding-left: 5;
  font-size: 18;
  line-height: 23;
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

const Input = ({ label, placeholder, secureTextEntry, value, onChangeText }) => (
  <InputContainer>
    <Label>{label}</Label>
    <TextInput
      placeholder={placeholder}
      autoCorrect={false}
      underlineColorAndroid="transparent"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </InputContainer>
);

export { Input };
