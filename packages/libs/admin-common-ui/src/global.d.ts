declare module '*.module.scss';

declare module 'uuid/v4' {
	declare const uuidV4: () => string;
	export default uuidV4;
}

declare type CancellableInvocation<TParam=any, TReturn=any> = (input: {
	data: TParam,
	cancelToken: import('./helpers/apiCaller').CancelToken,
}) => Promise<TReturn>;

declare type LazyModule = {
	name: string,
	rootComponent: import('react').ComponentType,
	rootReducer?: import('redux').Reducer,
	rootSaga?: import('redux-saga').Saga,
};
