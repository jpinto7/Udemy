import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import BuildControl from '../BuildControl';

const controls = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

const BuildControls = props => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.currentPrice.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl key={control.type} {...control} />
      ))}
      <button
        className={styles.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  currentPrice: PropTypes.number,
  purchaseable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
};

export default BuildControls;
