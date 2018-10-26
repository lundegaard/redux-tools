import { defaultTo, identity, o, inc } from 'ramda';

import { getAsyncReducerPath, makeRootReducer } from './reducers';
import { SUFFIX_DELIMITER } from '../constants';

describe('getAsyncReducerPath', () => {
	it('returns correct path when namespace is defined', () => {
		expect(getAsyncReducerPath('reducer', 'namespace')).toEqual([
			'namespaces',
			'namespace',
			'reducer',
		]);
	});

	it('returns correct path when namespace is not defined', () => {
		expect(getAsyncReducerPath('reducer', undefined)).toEqual(['reducer']);
	});
});

describe('filterReducer', () => {
	const state = { foo: 'bar' };
	const newState = { bar: 'baz' };

	beforeEach(() => jest.resetModules());

	it('calls reducer when namespace matches', () => {
		jest.doMock('./namespace', () => ({ isActionFromNamespace: jest.fn(() => true) }));
		const { filterReducer } = require('./reducers');
		const reducer = jest.fn(() => newState);

		expect(filterReducer('matchedNamespace', reducer)(state, {})).toBe(newState);
		expect(reducer).toHaveBeenCalledWith(state, {});
	});

	it('does not call reducer when namespace does not match', () => {
		jest.doMock('./namespace', () => ({ isActionFromNamespace: jest.fn(() => false) }));
		const { filterReducer } = require('./reducers');
		const reducer = jest.fn(() => newState);

		expect(filterReducer('randomNamespace', reducer)(state, {})).toBe(state);
		expect(reducer).not.toHaveBeenCalled();
	});
});

describe('makeRootReducer', () => {
	it('handles empty objects', () => {
		expect(makeRootReducer({})()).toEqual({});
		expect(makeRootReducer({ foo: {} })()).toEqual({ foo: {} });
	});

	it('removes suffixes', () => {
		const reducer = makeRootReducer({
			[`foo${SUFFIX_DELIMITER}12`]: o(defaultTo(null), identity),
		});

		expect(reducer({ foo: 'bar' })).toEqual({
			foo: 'bar',
		});
	});

	it('handles nested structures', () => {
		const weirdReducer = o(inc, defaultTo(0));
		const reducer = makeRootReducer({ foo: weirdReducer, bar: { baz: weirdReducer } });
		expect(reducer({ bar: { baz: 5 } })).toEqual({ foo: 1, bar: { baz: 6 } });
	});
});
