import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger';
import Modal from '../../components/Modal';
import BuildControls from '../../components/BuildControls';
import ControlsContext from '../../context/controls-context';
import OrderSummary from '../../components/OrderSummary';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import {
  burgerBuilder as burgerBuilderActions,
  order as orderActions,
  auth as authActions,
} from '../../store/actions';

export class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
  };

  componentDidMount() {
    const { initIngredients } = this.props;
    initIngredients();
  }

  updatePurchase = ingredients => {
    let totalIngredients = 0;
    for (const key in ingredients) {
      totalIngredients += ingredients[key];
    }
    return totalIngredients > 0;
  };

  purchaseHandler = (mode = false) => () => {
    if (this.props.isAuthenticated) {
      if (mode !== this.state.purchasing) {
        this.setState({
          purchasing: mode,
        });
      }
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseContinue = () => {
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            purchaseable={this.updatePurchase(this.props.ings)}
            currentPrice={this.props.price}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler(true)}
          />
        </>
      );
      orderSummary = (
        <OrderSummary price={this.props.price} ingredients={this.props.ings} />
      );
    }

    return (
      <>
        <ControlsContext.Provider
          value={{
            addIngredient: this.props.addIngredient,
            removeIngredient: this.props.removeIngredient,
            disabledInfo,
            purchaseHandler: this.purchaseHandler,
            purchaseContinue: this.purchaseContinue,
          }}
        >
          <Modal show={this.state.purchasing}>{orderSummary}</Modal>
          {burger}
        </ControlsContext.Provider>
      </>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients: ings, totalPrice: price, error },
  auth: { token },
}) => ({
  ings,
  price,
  error,
  isAuthenticated: token !== null,
});

export default connect(mapStateToProps, {
  ...burgerBuilderActions,
  ...orderActions,
  ...authActions,
})(withErrorHandler(BurgerBuilder, axios));
