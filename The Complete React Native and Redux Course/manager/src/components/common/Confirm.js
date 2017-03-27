import React, { Component } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const ModalCardSection = styled(CardSection)`
  justify-content: center;
`;

const ModalText = styled.Text`
  flex: 1;
  font-size: 18;
  text-align: center;
  line-height: 40;
`;

const ModalView = styled.View`
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  flex: 1;
  justify-content: center;
`;

class Confirm extends Component {
  handleOnPress = (mode) => () => {
    switch (mode) {
      case 'accept':
      case 'decline': {
        this.props.onConfirmButtonPress(mode);
        break;
      }
      default:
        return;
    }
  }

  render() {
    const { children, visible } = this.props;
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <ModalView>
          <ModalCardSection>
            <ModalText>{children}</ModalText>
          </ModalCardSection>
          <CardSection>
            <Button
              onPress={this.handleOnPress('accept')}
            >
              Yes
            </Button>
            <Button
              onPress={this.handleOnPress('decline')}
            >
              No
            </Button>
          </CardSection>
        </ModalView>
      </Modal>
    );
  }
}

export { Confirm };
