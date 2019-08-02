import makeStoreInterface from './makeStoreInterface';

describe('makeStoreInterface', () => {
	const storeInterface = makeStoreInterface('things');

	it('creates an object', () => {
		expect(storeInterface).toBeInstanceOf(Object);
	});

	it('passes correct string attributes down', () => {
		expect(storeInterface.type).toBe('things');
		expect(storeInterface.injectionKey).toBe('injectThings');
		expect(storeInterface.ejectionKey).toBe('ejectThings');
	});

	it('passes correct getters down', () => {
		expect(storeInterface.getEntries({ entries: { things: ['foo'] } })).toEqual(['foo']);
		expect(storeInterface.getEntries({})).toEqual([]);
	});

	it('passes correct setters down', () => {
		const storeA = {};
		storeInterface.setEntries(['foo'], storeA);
		expect(storeA.entries.things).toEqual(['foo']);
		const storeB = { entries: { otherThings: ['bar'] } };
		storeInterface.setEntries(['foo'], storeB);
		expect(storeB.entries.things).toEqual(['foo']);
		expect(storeB.entries.otherThings).toEqual(['bar']);
	});
});
