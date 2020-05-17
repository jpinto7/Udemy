import React from 'react';
import styles from './styles.module.css';

const Order = ({ ingredients, price }) => {
  const ingredientsList = [];
  for (let ingredientName in ingredients) {
    ingredientsList.push({ name: ingredientName, amount: ingredients[ingredientName] });
  }
  const ingredientsOutput = ingredientsList.map(ig => (
    <span style={{ textTransform: 'capitalize', display: 'inline-block', margin: '0 8px', border: '1px solid #cccccc', padding: '5px' }} key={ig.name}>{ig.name} ({ig.amount})</span>
  ));
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
