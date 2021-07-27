import React, { ComponentType, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showingLoginModalAction } from './auth.action';
import { isAuthenticatedSelector } from './auth.selector';
import { WithAuthorizedProps } from './auth.type';


export function withAuthorized<TProps extends PropsWithChildren<any> >(
	ProtectedComponent: ComponentType<TProps>,
): ComponentType<WithAuthorizedProps<TProps>> {
	const AuthorizedComp: ComponentType<WithAuthorizedProps<TProps>> = (props) => {
		const dispatch = useDispatch();
		const isAuthenticated: boolean = useSelector(isAuthenticatedSelector);
		if (!isAuthenticated) {
			setImmediate(() => dispatch(showingLoginModalAction()));
		}
		return /* props.isAuthenticated && */ (
			<ProtectedComponent {...props} />
		);
	};
	return AuthorizedComp;
}
