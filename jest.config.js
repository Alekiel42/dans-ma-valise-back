module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.spec.ts'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	setupFilesAfterEnv: ['./tests-config/jest-setup-file.ts'],
	globalSetup: './tests-config/global-setup.ts',
	globalTeardown: './tests-config/globalTeardown.ts',
	setupFiles: ['./tests-config/jest-setup-file.ts'],
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
		'!<rootDir>/src/config.ts',
		'!<rootDir>/src/application/routes/*',
		'!<rootDir>/**/__tests__/**',
	],
};
