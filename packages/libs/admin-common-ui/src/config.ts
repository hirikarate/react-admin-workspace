export type AppConfiguration = {
	idpBaseUrl: string,
	manageBaseUrl: string,
}

const config: AppConfiguration = Object.freeze({
	idpBaseUrl: process.env.IDP_BASE_URL,
	manageBaseUrl: process.env.MANAGE_BASE_URL,
});

export default config;
