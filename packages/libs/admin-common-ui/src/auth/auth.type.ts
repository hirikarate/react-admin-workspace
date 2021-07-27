
export type WithAuthorizedProps<TProps> = TProps & {
	isAuthenticated: boolean,
	authenticate: () => void,
};

export type AuthStateSlice = {
	authToken?: string,
	error?: string,
	isAuthenticated: boolean,
	isShowingLoginModal: boolean,
	isProcessingLogin: boolean,
	loggedInUser?: any,
};
