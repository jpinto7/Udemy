import React from 'react';
import image from '../../assets/pizza.jpg';
import classes from './styles.module.css';

const PizzaImage = () => (
  <div className={classes.PizzaImage}>
    <img src={image} className={classes.PizzaImg} />
  </div>
);

export default PizzaImage;
