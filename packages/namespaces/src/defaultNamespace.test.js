import defaultNamespace from './defaultNamespace';

describe('defaultNamespace', () => {
	it('adds a namespace to an action', () => {
		expect(defaultNamespace('yo', {})).toEqual({ meta: { namespace: 'yo' } });
	});

	it('returns the original action when no namespace is passed', () => {
		const action = {};
		expect(defaultNamespace(null, action)).toBe(action);
	});

	it('adds a namespace to a function', () => {
		const thunk = () => 'YOLO';
		const wrappedThunk = defaultNamespace('yo', thunk);
		expect(wrappedThunk.meta.namespace).toBe('yo');
		expect(wrappedThunk()).toBe('YOLO');
	});

	it('does not overwrite existing namespace', () => {
		expect(defaultNamespace('hi', { meta: { namespace: 'yo' } })).toEqual({
			meta: { namespace: 'yo' },
		});
	});

	it('does not overwrite namespace of a function', () => {
		const thunk = () => 'YOLO';
		thunk.meta = { namespace: 'yo' };
		const wrappedThunk = defaultNamespace('what', thunk);
		expect(wrappedThunk.meta.namespace).toBe('yo');
		expect(wrappedThunk()).toBe('YOLO');
	});
});
