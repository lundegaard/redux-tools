import makePayloadActionCreator from './makePayloadActionCreator';

describe('makePayloadActionCreator', () => {
	it('throws when a type is empty string', () => {
		expect(() => makePayloadActionCreator('')).toThrow();
	});

	it('throws when a type is empty', () => {
		expect(() => makePayloadActionCreator()).toThrow();
	});

	it('uses the argument as the action payload', () => {
		const actionCreator = makePayloadActionCreator('TYPE');
		expect(actionCreator('yo')).toEqual({ type: 'TYPE', payload: 'yo' });
	});

	it('throws when an undefined payload is received', () => {
		const actionCreator = makePayloadActionCreator('TYPE');
		expect(() => actionCreator()).toThrow();
	});
});
