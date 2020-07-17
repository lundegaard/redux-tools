import { inc, map } from 'ramda';

import combineReducerSchema from './combineReducerSchema';
import { ROOT_KEY } from './constants';

const fooAction = { type: 'FOO' };

describe('combineReducerSchema', () => {
	it('handles a schema with a root key', () => {
		const reducer = combineReducerSchema({ [ROOT_KEY]: [inc] });

		expect(reducer(0, fooAction)).toBe(1);
	});

	it('handles a schema with multiple reducers under the root key', () => {
		const reducer = combineReducerSchema({ [ROOT_KEY]: [inc, inc, inc] });

		expect(reducer(0, fooAction)).toBe(3);
	});

	it('handles a schema without any reducers under the root key', () => {
		const reducer = combineReducerSchema({ [ROOT_KEY]: [] });

		expect(reducer(0, fooAction)).toBe(0);
	});

	it('handles a schema with a reducer under a nested root key', () => {
		const reducer = combineReducerSchema({ foo: { bar: { [ROOT_KEY]: [inc] } } });

		expect(reducer({ foo: { bar: 0 } }, fooAction)).toEqual({ foo: { bar: 1 } });
	});

	it('handles a schema with multiple reducers under a nested root key', () => {
		const reducer = combineReducerSchema({ foo: { bar: { [ROOT_KEY]: [inc, inc] } } });

		expect(reducer({ foo: { bar: 0 } }, fooAction)).toEqual({ foo: { bar: 2 } });
	});

	it('handles a schema without any reducers under a nested root key', () => {
		const reducer = combineReducerSchema({ foo: { bar: { [ROOT_KEY]: [] } } });

		expect(reducer({ foo: { bar: 0 } }, fooAction)).toEqual({ foo: { bar: 0 } });
	});

	it('preserves any additional keys', () => {
		const reducer = combineReducerSchema({ foo: { bar: { [ROOT_KEY]: [inc] } } });
		const initialState = { foo: { bar: 0, baz: 0 }, qux: 0 };
		const expectedState = { foo: { bar: 1, baz: 0 }, qux: 0 };

		expect(reducer(initialState, fooAction)).toEqual(expectedState);
	});

	it('handles a schema with multiple root keys', () => {
		const reducer = combineReducerSchema({
			[ROOT_KEY]: [map(map(inc))],
			foo: {
				[ROOT_KEY]: [map(inc)],
				bar: {
					[ROOT_KEY]: [inc],
				},
			},
		});

		expect(reducer({ foo: { bar: 0 } }, fooAction)).toEqual({ foo: { bar: 3 } });
	});
});
