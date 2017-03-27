import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Picker, View } from 'react-native';

import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';

const FullPicker = styled.Picker`
  flex: 1;
`;

const PickerLabel = styled.Text`
  font-size: 18;
  padding-left: 20;
`;

const PickerView = styled.View`
  flex-direction: row;
`;

const SUPPORTED_PICKER_ITEMS = [
  {
    label: 'Monday',
    value: 'Monday',
  },
  {
    label: 'Tuesday',
    value: 'Tuesday',
  },
  {
    label: 'Wednesday',
    value: 'Wednesday',
  },
  {
    label: 'Thursday',
    value: 'Thursday',
  },
  {
    label: 'Friday',
    value: 'Friday',
  },
  {
    label: 'Saturday',
    value: 'Saturday',
  },
  {
    label: 'Sunday',
    value: 'Sunday',
  },
];

class EmployeeForm extends Component {
  renderPickerItems = () => (
    SUPPORTED_PICKER_ITEMS.map(({ label, value }) => (
      <Picker.Item key={label} label={label} value={value} />
    ))
  );

  render() {
    const { name, phone, shift } = this.props;
    const { employeeUpdate: update } = this.props.actions;
    return (
      <View>
        <CardSection>
          <Input
            value={name}
            label="Name"
            placeholder="Jane"
            onChangeText={(text) => update('name', text)}
          />
        </CardSection>
        <CardSection>
          <Input
            value={phone}
            label="Phone"
            placeholder="555-555-555"
            onChangeText={(text) => update('phone', text)}
          />
        </CardSection>
        <CardSection flexDirectionColumn>
          <PickerLabel>Shift</PickerLabel>
          <PickerView>
            <FullPicker
              selectedValue={shift}
              onValueChange={(day) => update('shift', day)}
            >
              {this.renderPickerItems()}
            </FullPicker>
          </PickerView>
        </CardSection>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   const { name, phone, shift } = state.get('employeeForm').toJS();
//   return {
//     name,
//     phone,
//     shift,
//   };
// };

const mapDispatchToProps = (dispatch) => ({
  actions: {
    employeeUpdate: (prop, value) => dispatch(employeeUpdate(prop, value)),
  },
});

export default connect(null, mapDispatchToProps)(EmployeeForm);
