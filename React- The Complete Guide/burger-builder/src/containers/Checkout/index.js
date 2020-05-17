import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary';
import ContactData from '../ContactData';

const Checkout = ({ history, ings, match, purchased }) => {
  const checkoutCancelledHandler = () => {
    history.goBack();
  };

  const checkoutContinueHandler = () => {
    history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          onCheckoutCancelled={checkoutCancelledHandler}
          onCheckoutContinue={checkoutContinueHandler}
          ingredients={ings}
        />
        <Route path={`${match.path}/contact-data`} component={ContactData} />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = ({
  burgerBuilder: { ingredients: ings },
  order: { purchased },
}) => ({
  ings,
  purchased,
});

export default connect(mapStateToProps)(Checkout);
