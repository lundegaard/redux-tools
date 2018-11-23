import getNamespaceByAction from './getNamespaceByAction';

const fooAction = { meta: { namespace: 'foo' } };

describe('getNamespaceByAction', () => {
	it('returns the namespace of an action', () => {
		expect(getNamespaceByAction(fooAction)).toBe('foo');
	});

	it('returns undefined if action does not have meta', () => {
		expect(getNamespaceByAction({})).toBeUndefined();
	});
});
