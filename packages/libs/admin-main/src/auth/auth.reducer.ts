import { createReducer } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import * as localForage from 'localforage';
import * as auth from '@admin/common-ui/auth';


const initialState: auth.AuthStateSlice = {
	isAuthenticated: false,
	isShowingLoginModal: false,
	isProcessingLogin: false,
};

const authReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(auth.showingLoginModalAction, (state) => {
			state.isShowingLoginModal = true;
		})
		.addCase(auth.processLogInAction, (state) => {
			state.isProcessingLogin = true;
		})
		.addCase(auth.fulfillLogInAction, (state, action: {payload: auth.FulfillLogInPayload, }) => {
			const { payload } = action;
			state.authToken = payload.authToken;
			state.loggedInUser = payload.user;
			state.isAuthenticated = true;
			state.isProcessingLogin = false;
			state.isShowingLoginModal = false;
			state.error = null;
		})
		.addCase(auth.rejectLogInAction, (state, action: {payload: auth.RejectLogInPayload, }) => {
			state.error = action.payload.error;
			state.isProcessingLogin = false;
		})
		.addCase(auth.logOutAction, (state) => {
			state.authToken = null;
			state.loggedInUser = null;
			state.isAuthenticated = false;
		});
});

const authPersistConfig: PersistConfig<auth.AuthStateSlice> = {
	key: 'auth',
	storage: localForage,
	whitelist: ['isAuthenticated', 'authToken'],
};
export default persistReducer(authPersistConfig, authReducer);
