import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/Employees';
import EmployeeDetail from './EmployeeDetail';

const PER_PAGE = 20;

const EmployeesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class EmployeeList extends Component {
  static propTypes = {
    employees: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
    })).isRequired,
  }

  componentWillMount() {
    this.page = 1;
  }

  handleLoadMore = () => {
    Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
    this.page += 1;
  }

  renderEmployees = () => {
    const { employees } = this.props;
    return employees.map(employee => (
      <EmployeeDetail
        key={employee._id}
        employee={employee}
      />
    ));
  }

  render() {
    return (
      <div>
        <EmployeesGrid>
          {this.renderEmployees()}
        </EmployeesGrid>
        <button
          onClick={this.handleLoadMore}
          className="btn btn-primary"
        >
          Load more...
        </button>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('employees', PER_PAGE);
  return {
    employees: Employees.find({}).fetch(),
  };
}, EmployeeList);
