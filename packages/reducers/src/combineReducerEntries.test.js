import { o, inc, defaultTo } from 'ramda';
import { deepCombineReducers } from './combineReducerEntries';

describe('filterReducer', () => {
	const state = { foo: 'bar' };
	const newState = { bar: 'baz' };

	beforeEach(() => jest.resetModules());

	it('calls reducer when namespace matches', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => true) }));
		const { filterReducer } = require('./combineReducerEntries');
		const reducer = jest.fn(() => newState);

		expect(filterReducer(reducer, 'matchedNamespace')(state, {})).toBe(newState);
		expect(reducer).toHaveBeenCalledWith(state, {});
	});

	it('does not call reducer when namespace does not match', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => false) }));
		const { filterReducer } = require('./combineReducerEntries');
		const reducer = jest.fn(() => newState);

		expect(filterReducer(reducer, 'randomNamespace')(state, {})).toBe(state);
		expect(reducer).not.toHaveBeenCalled();
	});
});

describe('deepCombineReducers', () => {
	it('handles empty objects', () => {
		expect(deepCombineReducers({})()).toEqual({});
		expect(deepCombineReducers({ foo: {} })()).toEqual({ foo: {} });
	});

	it('handles nested structures', () => {
		const incReducer = o(inc, defaultTo(0));
		const reducer = deepCombineReducers({ foo: incReducer, bar: { baz: incReducer } });
		expect(reducer({ bar: { baz: 5 } })).toEqual({ foo: 1, bar: { baz: 6 } });
	});
});

// TODO: Tests for combineReducerEntries
