import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer, ReducersMapObject } from 'redux';

import authReducer from '../auth/auth.reducer';


export function configureReducers(reducers: ReducersMapObject, history: History): Reducer {
	return combineReducers({
		...reducers,
		auth: authReducer,
		router: connectRouter(history),
	});
}
