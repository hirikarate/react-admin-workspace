import axios from 'axios';
import * as uuid from 'uuid';


const instance = axios.create({
	headers: {
		'x-correlation-id': uuid.v4(), // To look up the request logs on backend.
	}
});

export const createCancelTokenSource = () => axios.CancelToken.source();

export {
	CancelTokenSource, CancelToken, Cancel,
	AxiosResponse as ApiResponse,
	AxiosRequestConfig as RequestConfig,
} from 'axios';
export default instance;