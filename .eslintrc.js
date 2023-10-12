module.exports = {
	extends: ['plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'prettier'],
	root: true,
	env: {
		commonjs: true,
	},
	rules: {
		'@typescript-eslint/no-var-requires': 0,
	},
};
