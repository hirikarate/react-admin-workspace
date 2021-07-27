import { all } from 'redux-saga/effects';

import { loginSaga } from '../auth/auth.saga';


export function* rootSaga() {
	yield all([
		loginSaga(),
	]);
}
