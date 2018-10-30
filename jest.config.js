module.exports = {
	bail: true,
	verbose: true,
	testPathIgnorePatterns: ['/.history/', '/node_modules/', '/es', '/dist', '/lib', '/rollup'],
	setupTestFrameworkScriptFile: '<rootDir>/testsSetup.js',
	projects: ['<rootDir>/packages/*'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
};
