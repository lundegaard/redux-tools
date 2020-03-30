import makeSimpleActionCreator from './makeSimpleActionCreator';

describe('makeSimpleActionCreator', () => {
	it('throws when a type is empty string', () => {
		expect(() => makeSimpleActionCreator('')).toThrow();
	});

	it('throws when a type is empty', () => {
		expect(() => makeSimpleActionCreator()).toThrow();
	});

	it('uses the argument as the action payload', () => {
		const actionCreator = makeSimpleActionCreator('TYPE');
		expect(actionCreator('yo')).toEqual({ type: 'TYPE', payload: 'yo' });
	});

	it('throws when an undefined payload is received', () => {
		const actionCreator = makeSimpleActionCreator('TYPE');
		expect(() => actionCreator()).toThrow();
	});
});
