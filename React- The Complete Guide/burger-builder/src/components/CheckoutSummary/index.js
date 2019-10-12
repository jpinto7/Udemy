import React from 'react';
import Burger from '../Burger';
import Button from '../Button';
import styles from './styles.module.css';

const CheckoutSummary = ({ ingredients }) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '300px', height: '300px', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnStyle="Danger">Cancel</Button>
      <Button btnStyle="Success">Continue</Button>
    </div>
  )
};

export default CheckoutSummary;
