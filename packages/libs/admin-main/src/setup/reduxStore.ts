import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store as ReduxStore, ReducersMapObject, Reducer } from 'redux';
import createSagaMiddleware, { SagaMiddleware, Saga } from 'redux-saga';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { AuthStateSlice } from '@admin/common-ui/types';

import { configureReducers } from './reduxReducers';
import { rootSaga } from './reduxSagas';


export const routeHistory = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Source: https://react-redux.js.org/using-react-redux/usage-with-typescript
const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const originalStore = createStore(
	configureReducers({}, routeHistory),
	initialState,
	composeEnhancers(
		applyMiddleware(
			routerMiddleware(routeHistory), // for dispatching history actions
			sagaMiddleware,
		),
	),
);
export const persistor = persistStore(originalStore);

enableLazyReducer(originalStore);
enableLazySaga(originalStore, sagaMiddleware.run);
sagaMiddleware.run(rootSaga);

export type Store = typeof originalStore & {
	lazyReducers: ReducersMapObject,
	injectReducer: (key: string, lazyReducer: Reducer) => void,
	lazySagas: Map<string, Saga>,
	injectSaga: (key: string, saga: Saga) => void,
};
export type RootState = AuthStateSlice & ReturnType<typeof originalStore.getState>;
export type AppDispatch = typeof originalStore.dispatch;

export const store = originalStore as Store;

// Source: https://redux.js.org/usage/code-splitting#defining-an-injectreducer-function
function enableLazyReducer(store: ReduxStore) {
	// Add a dictionary to keep track of the registered async reducers
	store['lazyReducers'] = {};
	store['injectReducer'] = (key: string, lazyReducer: Reducer) => {
		store['lazyReducers'][key] = lazyReducer;
		store.replaceReducer(configureReducers(store['lazyReducers'] as ReducersMapObject, routeHistory));
	};
}

// Source: https://manukyan.dev/posts/2019-04-15-code-splitting-for-redux-and-optional-redux-saga/
function enableLazySaga(store: ReduxStore, runSaga: SagaMiddleware['run']) {
	// Create a dictionary to keep track of injected sagas
	store['lazySagas'] = new Map();

	store['injectSaga'] = (key: string, saga: Saga) => {
		if (store['lazySagas'].has(key)) return;

		// Sagas return task when they executed, which can be used
		// to cancel them
		const task = runSaga(saga);

		// Save the task if we want to cancel it in the future
		store['lazySagas'].set(key, task);
	};
}
