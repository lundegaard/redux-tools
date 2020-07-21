import getStateByFeatureAndNamespace from './getStateByFeatureAndNamespace';

const state = {
	someFeature: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByFeatureAndNamespace', () => {
	it('retrieves correct state slice an existing namespace is passed', () => {
		expect(getStateByFeatureAndNamespace('someFeature', 'foo', state)).toBe(state.someFeature.foo);
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(getStateByFeatureAndNamespace('someFeature', 'bar', state)).toBeUndefined();
	});

	it('returns undefined when a nonexistent feature is passed', () => {
		expect(getStateByFeatureAndNamespace('randomFeature', 'foo', state)).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByFeatureAndNamespace('someFeature', undefined, state)).toBeUndefined();
	});
});
