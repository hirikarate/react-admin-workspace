import { cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import * as auth from '@admin/common-ui/auth';
import { createCancellableCall } from '@admin/common-ui/helpers/sagaHelpers';

import { LogInParam, LogInResult } from './auth.model';
import { logIn } from './auth.service';


function* processLogin(loginPayload: auth.ProcessLogInPayload) {
	const cancellableLogin = createCancellableCall(logIn, new LogInParam(loginPayload));

	try {
		const authResult: LogInResult = yield cancellableLogin.call();
		yield put(auth.fulfillLogInAction(authResult as auth.FulfillLogInPayload));
	}
	catch (err) {
		console.error(err);
		yield put(auth.rejectLogInAction({ error: err.message }));
	}
	finally {
		if (yield cancelled()) {
			cancellableLogin.cancel();
		}
	}
}

export function* loginSaga() {
	while (true) {
		const loginAction: ReturnType<typeof auth.processLogInAction> = yield take(auth.processLogInAction);
		const loginPayload: auth.ProcessLogInPayload = loginAction.payload;
		const task = yield fork(processLogin, loginPayload);
		const action = yield take([auth.logOutAction, auth.rejectLogInAction]);
		if (action.type === auth.logOutAction) {
			yield cancel(task);
		}
	}
}
