import React, { Component, PropTypes } from 'react';
import {
  LayoutAnimation,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { selectLibrary } from '../actions';

import { CardSection } from './common';

const TechTitle = styled.Text`
  font-size: 18;
  padding-left: 15;
`;

class ListItem extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription = () => {
    const { description, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text>{description}</Text>
        </CardSection>
      );
    }
  }

  render() {
    const { id, title } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.actions.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <TechTitle>{title}</TechTitle>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    selectLibrary: (id) => dispatch(selectLibrary(id)),
  },
});

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.id;
  return {
    expanded,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
