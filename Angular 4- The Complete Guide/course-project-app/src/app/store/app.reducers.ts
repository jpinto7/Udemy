import { ActionReducerMap, Action } from '@ngrx/store';
import * as Auth from '../auth/store/auth.reducers';
import * as ShoppingList from '../shopping-list/store/shopping-list.reducers';
import { authReducer } from '../auth/store/auth.reducers';
import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducers';

export interface AppState {
  auth: Auth.State;
  shoppingList: ShoppingList.State;
};

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  shoppingList: shoppingListReducer
};
