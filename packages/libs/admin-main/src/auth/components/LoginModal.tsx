import React, { FC } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	isShowingLoginModalSelector,
	isAuthenticatedSelector,
} from '@admin/common-ui/auth';
import Avatar from '@admin/common-ui/components/Avatar';
import Container from '@admin/common-ui/components/Container';
import Dialog from '@admin/common-ui/components/Dialog';
import Typography from '@admin/common-ui/components/Typography';

import LoginForm from './LoginForm';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
}));

export type LoginModalProps = {
	isOpen?: boolean,
};

const LoginModal: FC<LoginModalProps & PropsFromState> = (props) => {
	const { isOpen } = props;
	const classes = useStyles();

	return (
		<Dialog
			open={isOpen}
			aria-labelledby="Login popup modal"
			aria-describedby="A popup modal to enter authentication credentials"
		>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
					Sign in
					</Typography>
					<LoginForm />
				</div>
			</Container>
		</Dialog>
	);
};

const mapStateToProps = (state: any) => {
	return {
		isOpen: isShowingLoginModalSelector(state),
		isAuthenticated: isAuthenticatedSelector(state),
	};
};

type PropsFromState = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(LoginModal);
