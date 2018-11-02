import makeConstantActionCreator from './makeConstantActionCreator';

describe('makeConstantActionCreator', () => {
	it('handles a call with 0 arguments', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(actionCreator()).toEqual({ type: 'TYPE' });
	});

	it('handles a call with 1 argument', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(actionCreator('yo')).toEqual({ type: 'TYPE' });
	});
});
