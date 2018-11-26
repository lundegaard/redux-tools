import attachNamespace from './attachNamespace';

describe('attachNamespace', () => {
	it('adds a namespace to an action', () => {
		expect(attachNamespace('yo', {})).toEqual({ meta: { namespace: 'yo' } });
	});

	it('returns the original action when no namespace is passed', () => {
		const action = {};
		expect(attachNamespace(null, action)).toBe(action);
	});
});
