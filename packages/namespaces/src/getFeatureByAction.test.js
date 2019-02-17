import getFeatureByAction from './getFeatureByAction';

const fooAction = { meta: { feature: 'foo' } };

describe('getFeatureByAction', () => {
	it('returns the feature of an action', () => {
		expect(getFeatureByAction(fooAction)).toBe('foo');
	});

	it('returns undefined if action does not have meta', () => {
		expect(getFeatureByAction({})).toBeUndefined();
	});
});
