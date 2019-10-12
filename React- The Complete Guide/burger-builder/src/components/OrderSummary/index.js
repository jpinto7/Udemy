import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ControlsContext from '../../context/controls-context';

class OrderSummary extends Component {
  static contextType = ControlsContext;

  render() {
    const summary = Object.keys(this.props.ingredients).map(ingKey => (
      <li key={ingKey}><span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {this.props.ingredients[ingKey]}</li>
    ));
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {summary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnStyle="Danger"
          clicked={this.context.purchaseHandler(false)}
        >
          CANCEL
        </Button>
        <Button
          clicked={this.context.purchaseContinue}
        >
          CONTINUE
        </Button>
      </>
    );
  }
};

OrderSummary.propTypes = {
  ingredients: PropTypes.objectOf(
    PropTypes.number,
  ),
  price: PropTypes.number,
}

export default OrderSummary;
