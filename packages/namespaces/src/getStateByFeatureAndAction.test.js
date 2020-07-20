import getStateByFeatureAndAction from './getStateByFeatureAndAction';

const state = {
	someFeature: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByFeatureAndAction', () => {
	it('retrieves correct state slice when an existing namespace is passed', () => {
		expect(getStateByFeatureAndAction('someFeature', { meta: { namespace: 'foo' } }, state)).toBe(
			state.someFeature.foo
		);
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(
			getStateByFeatureAndAction('someFeature', { meta: { namespace: 'bar' } }, state)
		).toBeUndefined();
	});

	it('returns undefined when a nonexistent feature is passed', () => {
		expect(
			getStateByFeatureAndAction('randomFeature', { meta: { namespace: 'foo' } }, state)
		).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(
			getStateByFeatureAndAction('someFeature', { meta: { namespace: undefined } }, state)
		).toBeUndefined();
	});
});
