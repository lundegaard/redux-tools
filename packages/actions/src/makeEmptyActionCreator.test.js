import makeEmptyActionCreator from './makeEmptyActionCreator';

describe('makeEmptyActionCreator', () => {
	it('throws when a type is empty string', () => {
		expect(() => makeEmptyActionCreator('')).toThrow();
	});

	it('throws when a type is empty', () => {
		expect(() => makeEmptyActionCreator()).toThrow();
	});

	it('handles a call with 0 arguments', () => {
		const actionCreator = makeEmptyActionCreator('TYPE');
		expect(actionCreator()).toEqual({ type: 'TYPE' });
	});

	it('throws when a payload is received', () => {
		const actionCreator = makeEmptyActionCreator('TYPE');
		expect(() => actionCreator('yo')).toThrow();
	});
});
