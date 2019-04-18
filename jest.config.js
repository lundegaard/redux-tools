const ignorePatterns = ['/.history/', '/node_modules/', '/es', '/dist', '/lib', '/rollup'];

module.exports = {
	bail: true,
	verbose: true,
	testPathIgnorePatterns: ignorePatterns,
	coveragePathIgnorePatterns: ignorePatterns,
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/tests/enzymeSetup.js'],
};
