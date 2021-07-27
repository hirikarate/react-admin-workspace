const path = require('path');

const { aliasDangerous, aliasJest, configPaths } = require('react-app-rewire-alias/lib/aliasDangerous');


const tsPaths = configPaths('../../../tsconfig.json');

Object.entries(tsPaths).forEach(([key, value]) => {
	tsPaths[key] = path.resolve(__dirname, `../../../${value}`);
});

module.exports = aliasDangerous(tsPaths);
module.exports.jest = (config) => {
	const newConfig = aliasJest(tsPaths)(config);
	return {
		...newConfig,
		transformIgnorePatterns: [
			'(node_modules/(?!(@react-spectrum|@adobe/react-spectrum|tiny-ui|react-sticky-box|history)/))',
		],
		moduleNameMapper: {
			'\\.(css|scss|less)$': 'identity-obj-proxy',
			...newConfig.moduleNameMapper,
		},
	};
};
