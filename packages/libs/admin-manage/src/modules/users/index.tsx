import { Route, Switch } from 'react-router';

import { UserListPage } from './UserListPage';


const UserRoutes = () => (
	<Switch>
		<Route path="" exact component={UserListPage} />
		<Route>
			404 in users
		</Route>
	</Switch>
);


export default {
	name: 'user',
	rootComponent: UserRoutes,
} as LazyModule;
