import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { toPascalCase } from '../../helpers';

const BurgerIngredient = (props) => {
  const { type } = props;
  const ingredientStyle = toPascalCase(type);
  return (
    <div className={styles[ingredientStyle]}>
      {ingredientStyle === 'BreadTop' && (
      <>
        <div className={styles.Seeds1} />
        <div className={styles.Seeds2} />
      </>
      )}
    </div>
  );
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
