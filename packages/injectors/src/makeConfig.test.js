import { noop } from 'ramda-extension';

import makeConfig from './makeConfig';

describe('makeConfig', () => {
	const config = makeConfig('things');

	it('creates an object', () => {
		expect(config).toBeInstanceOf(Object);
	});

	it('passes correct string attributes down', () => {
		expect(config.type).toBe('things');
		expect(config.injectMethodName).toBe('injectThings');
		expect(config.ejectMethodName).toBe('ejectThings');
	});

	it('passes correct getters down', () => {
		expect(config.getInject({ injectThings: noop })).toBe(noop);
		expect(config.getEject({ ejectThings: noop })).toBe(noop);
		expect(config.getEntries({ entries: { things: ['foo'] } })).toEqual(['foo']);
		expect(config.getEntries({})).toEqual([]);
	});

	it('passes correct setters down', () => {
		const storeA = {};
		config.setEntries(['foo'], storeA);
		expect(storeA.entries.things).toEqual(['foo']);
		const storeB = { entries: { otherThings: ['bar'] } };
		config.setEntries(['foo'], storeB);
		expect(storeB.entries.things).toEqual(['foo']);
		expect(storeB.entries.otherThings).toEqual(['bar']);
	});
});
