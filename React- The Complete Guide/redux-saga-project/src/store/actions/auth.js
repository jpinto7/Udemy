import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => ({
    type: actionTypes.AUTH_INITIATE_LOGOUT
});

export const logoutSuccess = () => ({
    type: actionTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = expirationTime => ({
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    payload: expirationTime
});

export const auth = (email, password, isSignup) => ({
    type: actionTypes.AUTH_USER,
    payload: {
        email,
        password,
        isSignup
    }
});

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
});

export const authCheckState = () => ({
    type: actionTypes.AUTH_CHECK_STATE
});
