import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../../store/actions';

export function* purchaseBurger({ payload: { orderData, token }}) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post( '/orders.json?auth=' + token, orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
  } catch(error) {
    yield put(actions.purchaseBurgerFail(error));
  }
};

export function* fetchOrders({ payload: { token, userId }}) {
  yield put(actions.fetchOrdersStart());
  const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
  try {
    const response = yield axios.get( '/orders.json' + queryParams);
    const fetchedOrders = [];
    for (let key in response.data) {
        fetchedOrders.push( {
            ...response.data[key],
            id: key
        } );
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch(err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
