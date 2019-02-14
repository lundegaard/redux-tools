import getStateByAction from './getStateByAction';

const state = {
	namespaces: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByAction', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByAction({ meta: { feature: 'namespaces', namespace: 'foo' } }, state)).toEqual({
			value: 'Wassup',
		});
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(
			getStateByAction({ meta: { feature: 'namespaces', namespace: 'bar' } }, state)
		).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByAction({}, state)).toBeUndefined();
	});
});
