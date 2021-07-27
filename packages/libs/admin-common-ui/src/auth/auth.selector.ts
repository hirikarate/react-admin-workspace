import { createSelector } from 'reselect';

import { AuthStateSlice } from './auth.type';


export const authStateSelector = (state: any): AuthStateSlice => state.auth;

export const isAuthenticatedSelector = createSelector(authStateSelector, (authState: AuthStateSlice) => {
	return authState.isAuthenticated ?? false;
});

export const isShowingLoginModalSelector = createSelector(authStateSelector, (authState: AuthStateSlice) => {
	return authState.isShowingLoginModal ?? false;
});

export const isProcessingLoginSelector = createSelector(authStateSelector, (authState: AuthStateSlice) => {
	return authState.isProcessingLogin ?? false;
});

export const loginErrorSelector = createSelector(authStateSelector, (authState: AuthStateSlice) => {
	return authState.error;
});
