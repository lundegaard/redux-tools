import { inc, o, defaultTo, map, multiply } from 'ramda';

import combineReducerEntries from './combineReducerEntries';

const globalAction = { type: 'ACTION' };
const actionA = { type: 'ACTION', meta: { namespace: 'a' } };
const actionB = { type: 'ACTION', meta: { namespace: 'b' } };

const incOrZero = o(defaultTo(0), inc);
const mapIncOrZero = map(incOrZero);

const globalEntry = { path: [], value: mapIncOrZero };

const fooEntry = { path: ['foo'], value: incOrZero };
const barEntry = { path: ['bar'], value: incOrZero };

const namespacedEntryA = { path: [], value: mapIncOrZero, namespace: 'a', feature: 'grids' };
const namespacedEntryB = { path: [], value: mapIncOrZero, namespace: 'b', feature: 'grids' };

const namespacedFooEntryA = { path: ['foo'], value: incOrZero, namespace: 'a', feature: 'grids' };
const namespacedBarEntryA = { path: ['bar'], value: incOrZero, namespace: 'a', feature: 'grids' };

const namespacedFooEntryB = { path: ['foo'], value: incOrZero, namespace: 'b', feature: 'grids' };
const namespacedBarEntryB = { path: ['bar'], value: incOrZero, namespace: 'b', feature: 'grids' };

describe('combineReducerEntries', () => {
	it('handles no entries', () => {
		const reducer = combineReducerEntries([]);

		expect(reducer(null, globalAction)).toBe(null);
	});

	it('handles named entries', () => {
		const reducer = combineReducerEntries([fooEntry, barEntry]);

		expect(reducer({ foo: 0, bar: 0 }, globalAction)).toEqual({ foo: 1, bar: 1 });
	});

	it('handles named entries with additional keys already in state', () => {
		const reducer = combineReducerEntries([fooEntry, barEntry]);

		expect(reducer({ foo: 0, bar: 0, baz: 0 }, globalAction)).toEqual({ foo: 1, bar: 1, baz: 0 });
	});

	it('handles named entries with missing keys in state', () => {
		const reducer = combineReducerEntries([fooEntry, barEntry]);

		expect(reducer({ foo: 0 }, globalAction)).toEqual({ foo: 1, bar: 0 });
	});

	it('handles global entries', () => {
		const reducer = combineReducerEntries([globalEntry]);

		expect(reducer({ foo: 0, bar: 0, baz: 0 }, globalAction)).toEqual({ foo: 1, bar: 1, baz: 1 });
	});

	it('handles global entries alongside named entries', () => {
		const reducer = combineReducerEntries([globalEntry, fooEntry]);

		expect(reducer({ foo: 0, bar: 0, baz: 0 }, globalAction)).toEqual({ foo: 2, bar: 1, baz: 1 });
	});

	it('applies global entries after named entries', () => {
		const reducer = combineReducerEntries([globalEntry, { path: ['foo'], value: multiply(2) }]);

		// NOTE: `foo: 6` for the reverse order: (2 + 1) * 2 = 6
		// NOTE: `foo: 5` for the current order: (2 * 2) + 1 = 5
		expect(reducer({ foo: 2, bar: 1 }, globalAction)).toEqual({ foo: 5, bar: 2 });
	});

	it('handles namespaced entries with the same namespace', () => {
		const reducer = combineReducerEntries([namespacedFooEntryA, namespacedBarEntryA]);

		expect(reducer({ grids: { a: { foo: 1, bar: 2 } } }, globalAction)).toEqual({
			grids: { a: { foo: 2, bar: 3 } },
		});
	});

	it('handles namespaced entries with different namespaces', () => {
		const reducer = combineReducerEntries([namespacedFooEntryA, namespacedBarEntryB]);

		expect(reducer({ grids: { a: { foo: 1 }, b: { bar: 2 } } }, globalAction)).toEqual({
			grids: { a: { foo: 2 }, b: { bar: 3 } },
		});
	});

	it('handles namespaced entries operating over the entire slice', () => {
		const reducer = combineReducerEntries([namespacedEntryA, namespacedEntryB]);

		expect(reducer({ grids: { a: { qux: 1 }, b: { quux: 2 } } }, globalAction)).toEqual({
			grids: { a: { qux: 2 }, b: { quux: 3 } },
		});
	});

	it('filters named entries based on namespace', () => {
		const reducer = combineReducerEntries([namespacedFooEntryA, namespacedBarEntryB]);

		expect(reducer({ grids: { a: { foo: 1 }, b: { bar: 2 } } }, actionA)).toEqual({
			grids: { a: { foo: 2 }, b: { bar: 2 } },
		});
	});

	it('filters unnamed entries based on namespace', () => {
		const reducer = combineReducerEntries([namespacedEntryA, namespacedEntryB]);

		expect(reducer({ grids: { a: { qux: 0 }, b: { qux: 0 } } }, actionB)).toEqual({
			grids: { a: { qux: 0 }, b: { qux: 1 } },
		});
	});

	it('handles mixed entries', () => {
		const reducer = combineReducerEntries([
			fooEntry,
			barEntry,
			namespacedEntryA,
			namespacedEntryB,
			namespacedFooEntryA,
			namespacedBarEntryA,
			namespacedFooEntryB,
			namespacedBarEntryB,
		]);

		expect(
			reducer(
				{
					foo: 0,
					bar: 1,
					grids: {
						a: { foo: 2, bar: 3, qux: 4 },
						b: { foo: 5, bar: 6, qux: 7 },
					},
				},
				globalAction
			)
		).toEqual({
			foo: 1,
			bar: 2,
			grids: {
				a: { foo: 4, bar: 5, qux: 5 },
				b: { foo: 7, bar: 8, qux: 8 },
			},
		});
	});
});
