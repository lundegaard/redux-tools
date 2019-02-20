import makeConstantActionCreator from './makeConstantActionCreator';

describe('makeConstantActionCreator', () => {
	// TODO: fix it
	it.skip('handles a call with 0 arguments', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(actionCreator()).toEqual({ type: 'TYPE' });
	});

	// TODO: fix it
	it.skip('handles a call with 1 argument', () => {
		const actionCreator = makeConstantActionCreator('TYPE');
		expect(actionCreator('yo')).toEqual({ type: 'TYPE' });
	});
});
