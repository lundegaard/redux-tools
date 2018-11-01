module.exports = {
	bail: true,
	verbose: true,
	testPathIgnorePatterns: ['/.history/', '/node_modules/', '/es', '/dist', '/lib', '/rollup'],
	projects: ['<rootDir>/packages/*'],
};
