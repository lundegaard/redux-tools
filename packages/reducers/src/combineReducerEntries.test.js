import { o, inc, dec, defaultTo } from 'ramda';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import combineReducerEntries, { deepCombineReducers } from './combineReducerEntries';

const incReducer = o(inc, defaultTo(0));
const decReducer = o(dec, defaultTo(0));

describe('deepCombineReducers', () => {
	it('handles empty objects', () => {
		expect(deepCombineReducers({})()).toEqual({});
		expect(deepCombineReducers({ foo: {} })()).toEqual({ foo: {} });
	});

	it('handles nested structures', () => {
		const reducer = deepCombineReducers({ foo: incReducer, bar: { baz: incReducer } });
		expect(reducer({ bar: { baz: 5 } })).toEqual({ foo: 1, bar: { baz: 6 } });
	});
});

describe('combineReducerEntries', () => {
	it('handles an empty array', () => {
		const reducer = combineReducerEntries([]);
		expect(reducer()).toEqual({});
	});

	it('handles non-namespaced reducers', () => {
		const reducer = combineReducerEntries([
			{ key: 'foo', value: incReducer },
			{ key: 'bar', value: decReducer },
		]);

		expect(reducer()).toEqual({ foo: 1, bar: -1 });
		expect(reducer({ foo: 1, bar: -1 })).toEqual({ foo: 2, bar: -2 });
	});

	it('handles multiple reducers in same namespace', () => {
		const reducer = combineReducerEntries([
			{ key: 'foo', value: incReducer, namespace: 'ns', feature: DEFAULT_FEATURE },
			{ key: 'bar', value: decReducer, namespace: 'ns', feature: DEFAULT_FEATURE },
		]);

		expect(reducer()).toEqual({
			[DEFAULT_FEATURE]: {
				ns: { foo: 1, bar: -1 },
			},
		});

		expect(
			reducer({
				[DEFAULT_FEATURE]: {
					ns: { foo: 1, bar: -1 },
				},
			})
		).toEqual({
			[DEFAULT_FEATURE]: {
				ns: { foo: 2, bar: -2 },
			},
		});
	});

	it('handles multiple namespaces', () => {
		const reducer = combineReducerEntries([
			{ key: 'foo', value: incReducer, namespace: 'a', feature: DEFAULT_FEATURE },
			{ key: 'bar', value: decReducer, namespace: 'b', feature: DEFAULT_FEATURE },
		]);

		expect(reducer()).toEqual({
			[DEFAULT_FEATURE]: {
				a: { foo: 1 },
				b: { bar: -1 },
			},
		});

		expect(
			reducer({
				[DEFAULT_FEATURE]: {
					a: { foo: 1 },
					b: { bar: -1 },
				},
			})
		).toEqual({
			[DEFAULT_FEATURE]: {
				a: { foo: 2 },
				b: { bar: -2 },
			},
		});
	});
});
