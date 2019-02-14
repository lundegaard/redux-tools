import attachNamespace from './attachNamespace';

describe('attachNamespace', () => {
	it('adds an namespace and feature to an action', () => {
		expect(attachNamespace('yo', 'no', {})).toEqual({ meta: { namespace: 'no', feature: 'yo' } });
	});

	it('returns the original action when no namespace is passed', () => {
		const action = {};
		expect(attachNamespace('feature', null, action)).toBe(action);
	});

	it('returns the original action when no feature is passed', () => {
		const action = {};
		expect(attachNamespace(null, null, action)).toBe(action);
	});
});
