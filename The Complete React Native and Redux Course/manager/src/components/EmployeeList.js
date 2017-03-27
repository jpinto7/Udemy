import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';

import ListItem from './ListItem';
import { employeesFetch, employeesSync } from '../actions';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.actions.employeesFetch();
    this.props.actions.employeesSync();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource = ({ employees }) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow = (employee) => <ListItem employee={employee} />

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: {
    employeesFetch: () => dispatch(employeesFetch()),
    employeesSync: () => dispatch(employeesSync()),
  },
});

const mapStateToProps = (state) => {
  let employees = state.get('employees').toJS();
  employees = Object.keys(employees).map(uid => (
    { uid, ...employees[uid] }
  ));
  return {
    employees,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
