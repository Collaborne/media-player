import createCollaborneConfig from 'eslint-config-collaborne';
import jest from 'eslint-plugin-jest';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
	...createCollaborneConfig({
		tsconfigRootDir: import.meta.dirname,
		project: ['./tsconfig.json', './tsconfig.test.json'],
	}),
	{
		ignores: ['!.storybook/**'],
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		plugins: {
			'react-hooks': reactHooks,
		},
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'function',
					format: ['PascalCase', 'camelCase'],
				},
			],
		},
	},
	{
		files: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
		...jest.configs['flat/recommended'],
	},
	{
		ignores: [
			'build/**',
			'dist/**',
			'gh-pages-dist/**',
			'node_modules/**',
			'.snapshots/**',
			'**/*.min.js',
			'.storybook/locales/**',
		],
	},
];
