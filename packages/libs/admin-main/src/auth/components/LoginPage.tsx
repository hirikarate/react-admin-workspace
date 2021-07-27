import { push } from 'connected-react-router';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Paper from '@admin/common-ui/components/Paper';
import * as auth from '@admin/common-ui/auth';

import LoginForm from './LoginForm';
import css from './LoginPage.module.scss';


const useLoginRedirect = () => {
	const isAuthenticated = useSelector(auth.isAuthenticatedSelector);
	const { returnPath } = useParams<any>();
	const dispatch = useDispatch();
	if (isAuthenticated) {
		const decodedPath = returnPath ? decodeURIComponent(returnPath) : '/';
		dispatch(push(decodedPath));
	}
};

const LoginPage: FC = () => {
	useLoginRedirect();
	return (
		<Paper className={css.pageWraper}>
			<LoginForm />
		</Paper>
	);
};

export default LoginPage;
