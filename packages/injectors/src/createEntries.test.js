import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import createEntries from './createEntries';

const foo = () => {};

const bar = () => {};

describe('createEntries', () => {
	it('handles functions', () => {
		expect(createEntries(foo)).toEqual([{ path: [], value: foo }]);
	});

	it('handles arrays', () => {
		expect(createEntries([foo, bar])).toEqual([
			{ path: [], value: foo },
			{ path: [], value: bar },
		]);
	});

	it('handles simple objects', () => {
		expect(createEntries({ foo, bar })).toEqual([
			{ path: ['foo'], value: foo },
			{ path: ['bar'], value: bar },
		]);
	});

	it('handles nested objects', () => {
		expect(createEntries({ a: { foo }, b: { bar } })).toEqual([
			{ path: ['a', 'foo'], value: foo },
			{ path: ['b', 'bar'], value: bar },
		]);
	});

	it('handles complex objects', () => {
		expect(createEntries({ a: { foo }, b: bar, c: [foo, bar] })).toEqual([
			{ path: ['a', 'foo'], value: foo },
			{ path: ['b'], value: bar },
			{ path: ['c'], value: foo },
			{ path: ['c'], value: bar },
		]);
	});

	it('handles complex arrays', () => {
		expect(createEntries([{ a: { foo } }, { b: bar }, { c: [foo, bar] }, foo])).toEqual([
			{ path: ['a', 'foo'], value: foo },
			{ path: ['b'], value: bar },
			{ path: ['c'], value: foo },
			{ path: ['c'], value: bar },
			{ path: [], value: foo },
		]);
	});

	it('supplies additional props to the entries', () => {
		expect(createEntries({ a: { foo, bar } }, { namespace: 'foo', feature: 'bar' })).toEqual([
			{ path: ['a', 'foo'], value: foo, namespace: 'foo', feature: 'bar' },
			{ path: ['a', 'bar'], value: bar, namespace: 'foo', feature: 'bar' },
		]);
	});

	it('supplies the default feature if the namespace is defined', () => {
		expect(createEntries({ a: { foo } }, { namespace: 'foo' })).toEqual([
			{ path: ['a', 'foo'], value: foo, namespace: 'foo', feature: DEFAULT_FEATURE },
		]);
	});
});
