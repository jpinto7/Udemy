import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from './../model/user.model';
import { AuthActions } from '../action-types';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (_, { user }) => {
    return {
      user
    };
  }),
  on(AuthActions.logout, () => {
    return initialAuthState;
  })
);
