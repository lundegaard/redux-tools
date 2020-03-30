import makeBinaryActionCreator from './makeBinaryActionCreator';

describe('makeBinaryActionCreator', () => {
	it('uses the argument as the action payload and meta', () => {
		const actionCreator = makeBinaryActionCreator('TYPE');
		expect(actionCreator('yo', {})).toEqual({
			type: 'TYPE',
			payload: 'yo',
			meta: {},
		});
	});
});
