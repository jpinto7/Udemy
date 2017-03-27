import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';

const EmployeeName = styled.Text`
  font-size: 18;
  padding-left: 15;
`;

class ListItem extends Component {
  onRowPress = () => {
    const { employee } = this.props;
    Actions.employeeEdit({
      employee
    });
  }

  render() {
    const { name } = this.props.employee;
    return (
      <TouchableWithoutFeedback
        onPress={this.onRowPress}
      >
        <View>
          <CardSection>
            <EmployeeName>
              {name}
            </EmployeeName>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
