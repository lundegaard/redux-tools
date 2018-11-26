import { o, inc, dec, defaultTo } from 'ramda';
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
			{ key: 'foo', value: incReducer, namespace: 'ns' },
			{ key: 'bar', value: decReducer, namespace: 'ns' },
		]);

		expect(reducer()).toEqual({
			namespaces: {
				ns: { foo: 1, bar: -1 },
			},
		});

		expect(
			reducer({
				namespaces: {
					ns: { foo: 1, bar: -1 },
				},
			})
		).toEqual({
			namespaces: {
				ns: { foo: 2, bar: -2 },
			},
		});
	});

	it('handles multiple namespaces', () => {
		const reducer = combineReducerEntries([
			{ key: 'foo', value: incReducer, namespace: 'a' },
			{ key: 'bar', value: decReducer, namespace: 'b' },
		]);

		expect(reducer()).toEqual({
			namespaces: {
				a: { foo: 1 },
				b: { bar: -1 },
			},
		});

		expect(
			reducer({
				namespaces: {
					a: { foo: 1 },
					b: { bar: -1 },
				},
			})
		).toEqual({
			namespaces: {
				a: { foo: 2 },
				b: { bar: -2 },
			},
		});
	});
});
