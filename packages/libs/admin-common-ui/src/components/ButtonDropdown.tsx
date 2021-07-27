import React, { FC, useMemo, ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() =>
	createStyles({
		menuId: {},
	}),
);

export type DropdownMenuItem = {
	key: string | number,
	text?: string,
	render?: () => ReactElement,
	isDivider?: boolean,
};

export type ButtonDropdownProps = {
	items: DropdownMenuItem[],
	onItemClick?(key: string, index: number): void,
	className?: string,
};

const ButtonDropdown: FC<ButtonDropdownProps> = (props) => {
	const { children, items, className, onItemClick } = props;
	const classes = useStyles();
	const [isOpen, setOpen] = React.useState(false);
	const anchorRef = React.useRef<HTMLButtonElement>(null);

	const handleToggle = () => {
		setOpen((isOpenPrev) => !isOpenPrev);
	};

	const handleClose = (evt: React.MouseEvent<EventTarget>) => {
		if (anchorRef.current && anchorRef.current.contains(evt.target as HTMLElement)) {
			return;
		}
		setOpen(false);
	};

	const handleListKeyDown = (evt: React.KeyboardEvent) => {
		if (evt.key === 'Tab') {
			evt.preventDefault();
			setOpen(false);
		}
	};

	const itemClickHandlers = useMemo(() => {
		if (!items) return [];
		return items.map((itm: DropdownMenuItem, index: number) => (evt: React.MouseEvent<EventTarget>) => {
			if (itm.isDivider) return;
			handleClose(evt);
			onItemClick && onItemClick(itm.key, index);
		});
	}, [items]);

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(isOpen);
	React.useEffect(() => {
		if (prevOpen.current === true && isOpen === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = isOpen;
	}, [isOpen]);

	return (
		<>
			<Button
				ref={anchorRef}
				aria-controls={isOpen ? classes.menuId : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				className={className}
			>{children}</Button>
			{ items && (
				<Popper open={isOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={isOpen} id={classes.menuId} onKeyDown={handleListKeyDown}>
										{renderMenuItem(items, itemClickHandlers)}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			)}
		</>
	);
};

export default ButtonDropdown;


function renderMenuItem(items: DropdownMenuItem[], itemClickHandlers: Function[]) {
	return items.map((itm, index) => {
		const { isDivider, render } = itm;
		return (
			isDivider ?
				<Divider key={itm.key} /> :
				render ?
					<MenuItem key={itm.key}>{render()}</MenuItem> :
					<MenuItem onClick={itemClickHandlers[index] as any} key={itm.key}>{itm.text}</MenuItem>
		);
	});
}
