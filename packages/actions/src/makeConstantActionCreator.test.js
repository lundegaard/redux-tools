import makeConstantActionCreator from './makeConstantActionCreator';

describe('makeConstantActionCreator', () => {
	it('handles a call with 0 arguments', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(actionCreator()).toEqual({ type: 'TYPE' });
	});

	it('throws when a payload is received', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(() => actionCreator('yo')).toThrow();
	});
});
