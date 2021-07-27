import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { PageLayoutConsumer } from '@admin/common-ui/layout';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		contentToolbar: {
			margin: '64px auto 30px',
			padding: 0,
		},
	}),
);

type Props = TextFieldProps & ButtonProps;

export const DashboardPage = (props: Props) => {
	const classes = useStyles();
	return (
		<>
			<Toolbar className={classes.contentToolbar}>
				<ButtonGroup>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SendIcon />}
					> Send </Button>
					<Button
						variant="contained"
						color="default"
						size="large"
						startIcon={<SaveIcon />}
					> Save </Button>
					<Button
						variant="contained"
						color="secondary"
						startIcon={<DeleteIcon />}
					> Delete </Button>
				</ButtonGroup>
			</Toolbar>
			<div className="App">
				<header className="App-header">

					<div>
						Edit <code>src/App.tsx</code> and save to reload.
						<TextField value="abc" />
					</div>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header>
			</div>
		</>
	);
};
