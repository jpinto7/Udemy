import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerStart = state => updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, payload) => {
  const newOrder = updateObject(payload.orderData, { id: payload.id });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFailed = state => updateObject(state, { loading: false });

const fetchOrdersStart = state => updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, payload) =>
  updateObject(state, { orders: payload, loading: false });

const fetchOrdersFailed = state => updateObject(state, { loading: false });

const purchaseInit = state => updateObject(state, { purchased: false });

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, payload);
    case actionTypes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFailed(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, payload);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFailed(state);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    default:
      return state;
  }
};

export default reducer;
