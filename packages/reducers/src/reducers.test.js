import { defaultTo, identity, o, inc } from 'ramda';

import {
	getReducerPath,
	makeRootReducer,
	getStateByAction,
	getStateByNamespace,
	removeSuffixFromKeys,
} from './reducers';

const state = {
	namespaces: {
		foo: { value: 'Wassup' },
	},
};

describe('getReducerPath', () => {
	it('returns correct path when namespace is defined', () => {
		expect(getReducerPath('reducer', 'namespace')).toEqual(['namespaces', 'namespace', 'reducer']);
	});

	it('returns correct path when namespace is not defined', () => {
		expect(getReducerPath('reducer', undefined)).toEqual(['reducer']);
	});
});

describe('filterReducer', () => {
	const state = { foo: 'bar' };
	const newState = { bar: 'baz' };

	beforeEach(() => jest.resetModules());

	it('calls reducer when namespace matches', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => true) }));
		const { filterReducer } = require('./reducers');
		const reducer = jest.fn(() => newState);

		expect(filterReducer('matchedNamespace')(reducer)(state, {})).toBe(newState);
		expect(reducer).toHaveBeenCalledWith(state, {});
	});

	it('does not call reducer when namespace does not match', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => false) }));
		const { filterReducer } = require('./reducers');
		const reducer = jest.fn(() => newState);

		expect(filterReducer('randomNamespace')(reducer)(state, {})).toBe(state);
		expect(reducer).not.toHaveBeenCalled();
	});
});

describe('removeSuffixFromKeys', () => {
	it('shallowly removes suffixes from all keys', () => {
		expect(removeSuffixFromKeys({ 'foo@12': 'yo' })).toEqual({ foo: 'yo' });
	});

	it('recursively removes suffixes from all keys', () => {
		expect(
			removeSuffixFromKeys({
				'foo@1': { 'bar@2': 'yo' },
				'baz@3': 'yo',
			})
		).toEqual({
			foo: { bar: 'yo' },
			baz: 'yo',
		});
	});

	it('returns original key if no suffix is present', () => {
		expect(removeSuffixFromKeys({ hi: { yo: 'wazzup' } })).toEqual({ hi: { yo: 'wazzup' } });
	});
});

describe('makeRootReducer', () => {
	it('handles empty objects', () => {
		expect(makeRootReducer({})()).toEqual({});
		expect(makeRootReducer({ foo: {} })()).toEqual({ foo: {} });
	});

	it('removes suffixes', () => {
		const reducer = makeRootReducer({
			'foo@12': o(defaultTo(null), identity),
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

describe('getStateByAction', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByAction({ meta: { namespace: 'foo' } }, state)).toEqual({
			value: 'Wassup',
		});
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(getStateByAction({ meta: { namespace: 'bar' } }, state)).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByAction({}, state)).toBeUndefined();
	});
});

describe('getStateByNamespace', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByNamespace('foo', state)).toEqual({
			value: 'Wassup',
		});
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(getStateByNamespace('bar', state)).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByNamespace(undefined, state)).toBeUndefined();
	});
});
