import { call, CallEffect } from 'redux-saga/effects';

import { CancelTokenSource, createCancelTokenSource } from './apiCaller';


export type CancellableCall = {
	call(): CallEffect<unknown>,
	cancel(): void,
};

export function createCancellableCall(fn: CancellableInvocation, param: unknown): CancellableCall {
	const cancelTokenSource: CancelTokenSource = createCancelTokenSource();
	return {
		call() {
			return call(fn, {
				data: param,
				cancelToken: cancelTokenSource.token,
			});
		},
		cancel: () => cancelTokenSource.cancel(),
	};
}
