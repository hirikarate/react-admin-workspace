import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { push } from 'connected-react-router';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { isAuthenticatedSelector, logOutAction } from '../auth';
import AppBar from '../components/AppBar';
import Button from '../components/Button';
import ButtonDropdown from '../components/ButtonDropdown';
import CssBaseline from '../components/CssBaseline';
import Divider from '../components/Divider';
import Drawer from '../components/Drawer';
import Toolbar from '../components/Toolbar';
import List from '../components/List';
import ListItem from '../components/ListItem';
import ListItemIcon from '../components/ListItemIcon';
import ListItemText from '../components/ListItemText';
import Typography from '../components/Typography';
import { createStyles, Theme, makeStyles } from '../components/styles';
import { PageLayoutProps } from '../types';


const drawerWidth = 240;

const useLayoutStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		appTitle: {
			flexGrow: 1,
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerContainer: {
			overflow: 'auto',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		contentToolbar: {
			margin: '64px auto 30px',
			padding: 0,
		},
	}),
);

export const SpaciousLayout: FC<PageLayoutProps> = ({ children, logo }) => {
	const classes = useLayoutStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar >
					{logo}
					<Typography variant="h6" noWrap className={classes.appTitle}>
						React Admin
					</Typography>
					<LogInStatus />
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<List>
						<ListItem button>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<Link to="/">
								<ListItemText primary="Dashboard" />
							</Link>
						</ListItem>
						<ListItem button>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<Link to="/products">
								<ListItemText primary="Products" />
							</Link>
						</ListItem>
						<ListItem button>
							<ListItemIcon><InboxIcon /></ListItemIcon>
							<Link to="/users">
								<ListItemText primary="Users" />
							</Link>
						</ListItem>
						{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{['All mail', 'Trash', 'Spam'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>
			<main className={classes.content}>
				{children}
			</main>
		</div>
	);
};


const useLogInStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			color: theme.palette.primary.contrastText,
		},
	}),
);


function LogInStatus() {
	const classes = useLogInStyles();
	const isAuthenticated = useSelector(isAuthenticatedSelector);
	const curLocation = useLocation();
	const returnPath = encodeURIComponent(curLocation.pathname);
	const dispatch = useDispatch();
	const onItemClick = (key: string) => {
		if (key === '/logout') {
			return dispatch(logOutAction());
		}
		dispatch(push(key));
	};

	return isAuthenticated ? (
		<ButtonDropdown
			className={classes.root}
			onItemClick={onItemClick}
			items={[
				{ text: 'Profile', key: '/profile' },
				{ text: 'Logout', key: '/logout' },
			]}
		>
			Hello!
		</ButtonDropdown>
	) : (
		<Button
			className={classes.root}
			onClick={() => dispatch(push(`/login/${returnPath}`))}
		>Log In</Button>
	);
}
