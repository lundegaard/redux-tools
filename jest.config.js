module.exports = {
	bail: true,
	verbose: true,
	testPathIgnorePatterns: [
		'/.history/',
		'/node_modules/',
		'/es',
		'/dist',
		'/lib',
		'/rollup',
	],
	setupTestFrameworkScriptFile: '<rootDir>/testsSetup.js',
	projects: ['<rootDir>/packages/*'],
	// transform: {
	// 	'^.+\\.js$': 'babel-jest',
	// },
	snapshotSerializers: ['enzyme-to-json/serializer'],
};
