import { Route, Switch, Redirect } from 'react-router';

import { ProductListPage } from './ProductListPage';


const ProductRoutes = () => (
	<Switch>
		<Route path="" exact component={ProductListPage}/>
		{/* <Route path="/" exact component={ProductListPage} /> */}
		<Route>
			404 in products
		</Route>
	</Switch>
);


export default {
	name: 'product',
	rootComponent: ProductRoutes,
} as LazyModule;
