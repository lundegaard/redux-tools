import attachFeature from './attachFeature';

describe('attachFeature', () => {
	it('adds a feature to an action', () => {
		expect(attachFeature('yo', {})).toEqual({ meta: { feature: 'yo' } });
	});

	it('returns the original action when no feature is passed', () => {
		const action = {};
		expect(attachFeature(null, action)).toBe(action);
	});
});
