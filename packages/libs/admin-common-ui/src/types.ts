import { ComponentType, ReactElement } from 'react';

export * from './auth/auth.type';

export type MenuItemDescriptor = {
	icon: string,
	label: string,
	link: string,
}

export type PageLayoutProps = {
	logo: ReactElement,
	menuItems?: MenuItemDescriptor[],
};

export type PageLayoutComponent = ComponentType<PageLayoutProps>;