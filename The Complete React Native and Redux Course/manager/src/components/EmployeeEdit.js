import React, { Component } from 'react';
import { connect } from 'react-redux';
import { text } from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeSave, employeeDelete, employeeLoad } from '../actions';

class EmployeeEdit extends Component {
  state = {
    showConfirmModal: false
  }

  componentWillMount() {
    const { employee } = this.props;
    this.props.actions.employeeLoad(employee);
  }

  handleOnButtonPress = (mode) => () => {
    switch (mode) {
      case 'save_employee': {
        const { name, phone, shift, uid } = this.props;
        this.props.actions.employeeSave({ name, phone, shift, uid });
        break;
      }
      case 'text_schedule': {
        const { phone, shift } = this.props;
        text(phone, `Your upcoming shift is on ${shift}`);
        break;
      }
      case 'show_confirm': {
        this.setState({
          showConfirmModal: !this.state.showConfirmModal
        });
        break;
      }
      case 'delete': {
        const { uid } = this.props;
        this.props.actions.employeeDelete(uid);
        break;
      }
      default:
        return;
    }
  }

  handleOnConfirmButtonPress = (mode) => {
    switch (mode) {
      case 'accept': {
        const { uid } = this.props;
        this.props.actions.employeeDelete(uid);
        break;
      }
      case 'decline':
        this.setState({
          showConfirmModal: false
        });
        break;
      default:
        return;
    }
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.handleOnButtonPress('save_employee')}>
            Save changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.handleOnButtonPress('text_schedule')}>
            Text schedule
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.handleOnButtonPress('show_confirm')}>
            Fire employee
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showConfirmModal}
          employeeUid={this.props.uid}
          onConfirmButtonPress={this.handleOnConfirmButtonPress}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    employeeLoad: (employeeData) => dispatch(employeeLoad(employeeData)),
    employeeSave: (employeeData) => dispatch(employeeSave(employeeData)),
    employeeDelete: (uid) => dispatch(employeeDelete(uid)),
  },
});

const mapStateToProps = (state) => {
  const { name, phone, shift, uid } = state.get('employeeForm').toJS();
  return {
    name,
    phone,
    shift,
    uid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
