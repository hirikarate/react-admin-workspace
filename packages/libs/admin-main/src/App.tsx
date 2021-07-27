import React, { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CssBaseline from '@admin/common-ui/components/CssBaseline';
import { LayoutProvider, SpaciousLayout } from '@admin/common-ui/layout';

import LoginModal from './auth/components/LoginModal';
import { store, routeHistory, persistor } from './setup/reduxStore';
import Routes from './setup/routes';
import logoSvg from './logo.svg';
import './App.css';


function App(): ReactElement {
	return (
		<>
			<CssBaseline />
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<LayoutProvider
						logo={<img src={logoSvg} width="50" height="50" className="App-logo" alt="logo" />}
						pageLayout={SpaciousLayout}
						menuItems={[]}
					>
						<LoginModal />
						<Routes history={routeHistory} />
					</LayoutProvider>
				</PersistGate>
			</ReduxProvider>
		</>
	);
}

export default App;
