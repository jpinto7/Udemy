import React from 'react';
import PropTypes from 'prop-types';
import Burger from '../Burger';
import Button from '../Button';
import styles from './styles.module.css';

const CheckoutSummary = ({ ingredients, onCheckoutCancelled, onCheckoutContinue }) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.BurgerContainer}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnStyle="Danger" clicked={onCheckoutCancelled}>Cancel</Button>
      <Button btnStyle="Success" clicked={onCheckoutContinue}>Continue</Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.objectOf(
    PropTypes.number,
  ).isRequired,
  onCheckoutContinue: PropTypes.func.isRequired,
  onCheckoutCancelled: PropTypes.func.isRequired
};

export default CheckoutSummary;
