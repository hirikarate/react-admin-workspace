import React, { FC } from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { History as HistoryLib } from 'history';
import loadable from '@loadable/component';
import { withAuthorized } from '@admin/common-ui/auth';
import { PageLayoutConsumer } from '@admin/common-ui/layout';

import LoginPage from '../auth/components/LoginPage';
import { DashboardPage } from '../dashboard/DashboardPage';

import { store } from './reduxStore';


type LazyLoader = () => Promise<{ default: LazyModule, }>;
type LazyComponentProps = RouteComponentProps & { loader: LazyLoader, };


const productLoader: LazyLoader = () => import('@admin/manage/modules/products');
const userLoader: LazyLoader = () => import('@admin/manage/modules/users');
// const reportLoader: LazyLoader = () => import('@admin/report/modules/report');

export const LazyComponent: FC<LazyComponentProps> = ({ loader, ...routeProps }) => {
	const Loading = loadable(async () => {
		await delay(5000);
		const loadedPackage: any = await loader();
		const loadedModule = loadedPackage.default as LazyModule;
		loadedModule.rootReducer && store.injectReducer(loadedModule.name, loadedModule.rootReducer);
		loadedModule.rootSaga && store.injectSaga(loadedModule.name, loadedModule.rootSaga);
		return loadedModule.rootComponent;
	});
	return (
		<Loading fallback={<div>Loading...</div>} {...routeProps} />
	);
};


const ProductPage = (props: RouteComponentProps) => <LazyComponent loader={productLoader} {...props} />;
const ProtectedProductPage = withAuthorized(ProductPage);
const UserPage = (props: RouteComponentProps) => <LazyComponent loader={userLoader} {...props} />;

const Routes: FC<{ history: HistoryLib, }> = (props) => (
	<ConnectedRouter history={props.history}>
		<Switch>
			<Route path="/" exact>
				<Redirect to="/dashboard" />
			</Route>
			<Route path='/login/:returnPath?' exact component={LoginPage} />
			<PageLayoutConsumer>
				<Switch>
					<Route path="/dashboard" exact component={DashboardPage} />
					<Route path="/products" exact component={ProtectedProductPage} />
					<Route path="/users" exact component={UserPage} />
				</Switch>
			</PageLayoutConsumer>
		</Switch>
	</ConnectedRouter>
);

export default Routes;


function delay(timeout: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, timeout));
}
