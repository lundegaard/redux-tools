import makePayloadMetaActionCreator from './makePayloadMetaActionCreator';

describe('makePayloadMetaActionCreator', () => {
	it('uses the argument as the action payload and meta', () => {
		const actionCreator = makePayloadMetaActionCreator('TYPE');
		expect(actionCreator('yo', {})).toEqual({
			type: 'TYPE',
			payload: 'yo',
			meta: {},
		});
	});
});
