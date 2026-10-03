module.exports = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jsdom',
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
				useESM: true,
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testRegex: 'src/.*\\.(spec)\\.(ts|tsx)$',
	testPathIgnorePatterns: ['/dist/', '/node_modules/'],
};
