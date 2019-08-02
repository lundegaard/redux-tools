import { attachNamespace, defaultNamespace } from './attachNamespace';

describe('attachNamespace', () => {
	it('adds a namespace to an action', () => {
		expect(attachNamespace('yo', {})).toEqual({ meta: { namespace: 'yo' } });
	});

	it('returns the original action when no namespace is passed', () => {
		const action = {};
		expect(attachNamespace(null, action)).toBe(action);
	});

	it('adds a namespace to a function', () => {
		const thunk = () => 'YOLO';
		const wrappedThunk = attachNamespace('yo', thunk);
		expect(wrappedThunk.meta.namespace).toBe('yo');
		expect(wrappedThunk()).toBe('YOLO');
	});

	it('overwrites existing namespace', () => {
		expect(attachNamespace('hi', { meta: { namespace: 'yo' } })).toEqual({
			meta: { namespace: 'hi' },
		});
	});
});

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
});
