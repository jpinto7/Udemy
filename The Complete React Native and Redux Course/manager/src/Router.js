import React from 'react';
import { connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { logoutUser } from './firebaseHelpers';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const styles = {
  router: {
    paddingTop: 65,
  },
};

const RouterWithRedux = connect()(Router);

const RouterComponent = () => (
  <RouterWithRedux sceneStyle={styles.router}>
    <Scene key="auth">
      <Scene
        key="login"
        component={LoginForm}
        title="Please login"
        initial
      />
    </Scene>
    <Scene key="main">
      <Scene
        onLeft={() => logoutUser()}
        leftTitle="Logout"
        onRight={() => Actions.employeeCreate()}
        rightTitle="Add"
        key="employeeList"
        component={EmployeeList}
        title="Employees"
        initial
      />
      <Scene
        key="employeeCreate"
        component={EmployeeCreate}
        title="Create employee"
      />
      <Scene
        key="employeeEdit"
        component={EmployeeEdit}
        title="Edit employee"
      />
    </Scene>
  </RouterWithRedux>
);

export default RouterComponent;
