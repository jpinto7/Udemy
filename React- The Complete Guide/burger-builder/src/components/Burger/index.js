import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from '../BurgerIngredient';
import styles from './styles.module.css';

const Burger = props => {
  let ingredients = Object.keys(props.ingredients).map((ingredient) => [...Array(props.ingredients[ingredient])].map((_, i) => <BurgerIngredient key={ingredient + i} type={ingredient} />)).reduce((arr, el) => arr.concat(el), []);
  if (ingredients.length === 0) {
    ingredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.objectOf(
    PropTypes.number,
  ),
};

export default Burger;
