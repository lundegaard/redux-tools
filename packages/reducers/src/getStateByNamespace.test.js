import getStateByNamespace from './getStateByNamespace';

const state = {
	namespaces: {
		foo: { value: 'Wassup' },
	},
};

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
