module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.test.json',
			},
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testRegex: 'src/.*\\.(spec)\\.(ts|tsx)$',
	testPathIgnorePatterns: ['/dist/', '/node_modules/'],
};
