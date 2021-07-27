import React, { ReactElement, FC, createContext, useState, useContext } from 'react';
import { MenuItemDescriptor, PageLayoutComponent } from '../types';


export type LayoutProviderProps = {
	logo: ReactElement,
	pageLayout: PageLayoutComponent,
	menuItems?: MenuItemDescriptor[],
}

export type LayoutContext = LayoutProviderProps & {
	setPageLayout: (layout: PageLayoutComponent) => void,
}

const layoutCtx = createContext<LayoutContext>(null);
layoutCtx.displayName = 'LayoutContext';

export function useLayoutContext(): LayoutContext {
	return useContext(layoutCtx);
}

export const LayoutProvider: FC<LayoutProviderProps> = (props) => {
	const [ pageLayoutState, setPageLayoutState ] = useState<{value: PageLayoutComponent}>({ value: props.pageLayout });
	const ctxValue: LayoutContext = {
		logo: props.logo,
		menuItems: props.menuItems,
		pageLayout: pageLayoutState.value,
		setPageLayout(pageLayout: PageLayoutComponent) {
			setPageLayoutState({
				value: pageLayout,
			});
		},
	};
	return (
		<layoutCtx.Provider value={ctxValue}>
			{props.children}
		</layoutCtx.Provider>
	);
}

export const PageLayoutConsumer: FC = ({children}) => {
	return (
		<layoutCtx.Consumer>
			{({logo, menuItems, pageLayout: Layout}) => (
				<Layout logo={logo} menuItems={menuItems}>
					{children}
				</Layout>
			)}
		</layoutCtx.Consumer>
	);
}