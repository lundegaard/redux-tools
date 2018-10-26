import {
	getNamespaceByAction,
	getStateByAction,
	getStateByNamespace,
	isActionFromNamespace,
} from './namespace';

const state = {
	namespaces: {
		foo: { value: 'Wassup' },
	},
};

const fooAction = { meta: { namespace: 'foo' } };
const barAction = { meta: { namespace: 'bar' } };
const emptyAction = {};

describe('getNamespaceByAction', () => {
	it('returns the namespace of an action', () => {
		expect(getNamespaceByAction(fooAction)).toBe('foo');
	});

	it('returns undefined if action does not have meta', () => {
		expect(getNamespaceByAction({})).toBeUndefined();
	});
});

describe('getStateByAction', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByAction(fooAction, state)).toEqual({
			value: 'Wassup',
		});
	});

	it('throws when a nonexistent namespace is passed', () => {
		expect(() => getStateByAction(barAction, state)).toThrow();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByAction(emptyAction, state)).toBeUndefined();
	});
});

describe('getStateByNamespace', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByNamespace('foo', state)).toEqual({
			value: 'Wassup',
		});
	});

	it('throws when a nonexistent namespace is passed', () => {
		expect(() => getStateByNamespace('bar', state)).toThrow();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByNamespace(undefined, state)).toBeUndefined();
	});
});

describe('isActionFromNamespace', () => {
	it('returns true when action is global and reducer is global', () => {
		expect(isActionFromNamespace(undefined, {})).toBe(true);
	});

	it('returns true when action is global and reducer is namespaced', () => {
		expect(isActionFromNamespace('foo', {})).toBe(true);
	});

	it('returns true when action is namespaced and reducer is global', () => {
		expect(isActionFromNamespace(undefined, fooAction)).toBe(true);
	});

	it('returns true when namespaces match', () => {
		expect(isActionFromNamespace('foo', fooAction)).toBe(true);
	});

	it('returns false when namespaces do not match', () => {
		expect(isActionFromNamespace('foo', barAction)).toBe(false);
	});
});
