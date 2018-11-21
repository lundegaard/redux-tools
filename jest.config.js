module.exports = {
	bail: true,
	verbose: true,
	testPathIgnorePatterns: ['/.history/', '/node_modules/', '/es', '/dist', '/lib', '/rollup'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupTestFrameworkScriptFile: '<rootDir>/tests/enzymeSetup.js',
};
