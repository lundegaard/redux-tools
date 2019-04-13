import configuration from './configuration';

describe('configuration', () => {
	it('has all the keys', () => {
		expect(configuration.inject).toBeInstanceOf(Function);
		expect(configuration.eject).toBeInstanceOf(Function);
		expect(configuration.getEntries).toBeInstanceOf(Function);
		expect(typeof configuration.type).toBe('string');
	});
});
