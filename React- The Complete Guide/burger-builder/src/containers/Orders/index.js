import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order';
import Spinner from '../../components/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import { order as orderActions } from '../../store/actions';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = ({
  order: { orders, loading },
  auth: { token, userId },
}) => ({
  orders,
  loading,
  token,
  userId,
});

export default connect(
  mapStateToProps,
  orderActions,
)(withErrorHandler(Orders, axios));
