import config from '@admin/common-ui/config';
import api, { CancelToken } from '@admin/common-ui/helpers/apiCaller';

import { LogInParam, LogInResult } from './auth.model';


export function logIn(param: {
	data: LogInParam,
	cancelToken?: CancelToken,
}): Promise<LogInResult> {
	const delayTime = 3_000;
	const result = new LogInResult({
		authToken: 'Hashed auth token',
		user: {
			email: param.data.email,
			roles: ['reporter', 'publisher'],
		},
	});
	const mockRequest = new Promise<LogInResult>((resolve, reject) =>
		setTimeout(() => {
			if (param.data.email?.startsWith('chauvu')) {
				resolve(result);
			}
			else {
				reject(new Error('Invalid credentials'));
			}
		}, delayTime),
	);
	return Promise.race([
		mockRequest,
		param.cancelToken.promise,
	]) as any;
	// return api.post(`${config.idpBaseUrl}/token/create`, param.data, {
	// 	cancelToken: param.cancelToken,
	// });
}
