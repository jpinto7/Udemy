import React, { Component } from 'react';
import axios from '../../axios-orders';
import Burger from '../../components/Burger';
import Modal from '../../components/Modal';
import BuildControls from '../../components/BuildControls';
import ControlsContext from '../../context/controls-context';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  updatePurchase = (ingredients) => () => {
    let totalIngredients = 0;
    for (const key in ingredients) {
      totalIngredients += ingredients[key];
    }
    this.setState({
      purchaseable: totalIngredients > 0,
    });
  }

  addIngredient = (type) => () => {
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] + 1,
    };
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type],
    }, this.updatePurchase(updatedIngredients));
  }

  removeIngredient = (type) => () => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedIngredients = {
      ...this.state.ingredients,
      [type]: this.state.ingredients[type] - 1,
    };
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
    }, this.updatePurchase(updatedIngredients));
  }

  purchaseHandler = (mode = false) => () => {
    if (mode !== this.state.purchasing) {
      this.setState({
        purchasing: mode,
      });
    }
  }

  purchaseContinue = () => {
    // alert('You continue');
    this.setState({
      loading: true,
    });
    axios.post('/orders.json', {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Mon Perriñon',
        address: {
          street: '1st North 955 NY',
          zipCode: '0010',
          country: 'US',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            purchaseable={this.state.purchaseable}
            currentPrice={this.state.totalPrice}
            ordered={this.purchaseHandler(true)}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <ControlsContext.Provider
          value={{
            addIngredient: this.addIngredient,
            removeIngredient: this.removeIngredient,
            disabledInfo,
            purchaseHandler: this.purchaseHandler,
            purchaseContinue: this.purchaseContinue,
          }}
        >
          <Modal show={this.state.purchasing}>
            {orderSummary}
          </Modal>
          {burger}
        </ControlsContext.Provider>
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
