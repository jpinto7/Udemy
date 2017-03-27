import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';

import { employeeCreate, employeeLoad } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress = () => {
    const { name, phone, shift } = this.props;
    this.props.actions.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.get('employeeForm').toJS();
  return {
    name,
    phone,
    shift,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: {
    employeeLoad: (employeeData) => dispatch(employeeLoad(employeeData)),
    employeeCreate: (employeeData) => dispatch(employeeCreate(employeeData)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
