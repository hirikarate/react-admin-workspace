import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core/styles';
import {
	isProcessingLoginSelector,
	loginErrorSelector,
	processLogInAction,
	ProcessLogInPayload,
} from '@admin/common-ui/auth';
import Button from '@admin/common-ui/components/Button';
import Checkbox from '@admin/common-ui/components/Checkbox';
import FormControlLabel from '@admin/common-ui/components/FormControlLabel';
import Grid from '@admin/common-ui/components/Grid';
import Link from '@admin/common-ui/components/Link';
import TextField from '@admin/common-ui/components/TextField';

import { LogInParam } from '../auth.model';


const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	errorSection: {
		width: '100%',
		color: theme.palette.error.light,
	},
}));

export type LoginFormProps = {
	onSuccess?(): void,
};

const LoginForm: FC<LoginFormProps & PropsFromState & PropsFromDispatch> = (props) => {
	const { processLogIn, isProcessingLogin, loginError } = props;
	const classes = useStyles();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LogInParam.modelRule),
	});

	return (
		<form
			onSubmit={handleSubmit(processLogIn)}
			noValidate
		>
			{loginError && (
				<div className={classes.errorSection}>
					{loginError}
				</div>
			)}
			<TextField
				error={Boolean(errors.email)}
				helperText={errors.email?.message}
				variant="outlined"
				margin="normal"
				fullWidth
				id="loginEmail"
				label="Email Address"
				autoComplete="email"
				autoFocus
				{...register('email')}
			/>
			<TextField
				error={Boolean(errors.password)}
				helperText={errors.password?.message}
				variant="outlined"
				margin="normal"
				fullWidth
				label="Password"
				type="password"
				id="loginPassword"
				autoComplete="current-password"
				{...register('password')}
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				disabled={isProcessingLogin}
				className={classes.submit}
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
			>
				Sign In
			</Button>
			<Grid container>
				<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
				</Grid>
				<Grid item>
					<Link href="#" variant="body2">
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			</Grid>
		</form>
	);
};

const mapStateToProps = (state: any) => {
	return {
		isProcessingLogin: isProcessingLoginSelector(state),
		loginError: loginErrorSelector(state),
	};
};

type PropsFromState = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = (dispatch: Function) => ({
	processLogIn: (payload: ProcessLogInPayload) => dispatch(processLogInAction(payload)),
});

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
