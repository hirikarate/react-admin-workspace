import { createAction } from '@reduxjs/toolkit';


export type ProcessLogInPayload = {
	email: string,
	password: string,
};

export type FulfillLogInPayload = {
	authToken: string,
	tokenExpiresAt: number,
	user: any,
};

export type RejectLogInPayload = {
	error: any,
};

export const showingLoginModalAction = createAction('auth/logIn/showModal');
export const processLogInAction = createAction<ProcessLogInPayload>('auth/logIn/process');
export const fulfillLogInAction = createAction<FulfillLogInPayload>('auth/logIn/fulfill');
export const rejectLogInAction = createAction<RejectLogInPayload>('auth/logIn/reject');

export const logOutAction = createAction('auth/logOut');
