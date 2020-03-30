import makePayloadMetaActionCreator from './makePayloadMetaActionCreator';

describe('makePayloadMetaActionCreator', () => {
	it('throws when a type is empty string', () => {
		expect(() => makePayloadMetaActionCreator('')).toThrow();
	});

	it('throws when a type is empty', () => {
		expect(() => makePayloadMetaActionCreator()).toThrow();
	});

	it('throws when called with 0 arguments', () => {
		const actionCreator = makePayloadMetaActionCreator('TYPE');
		expect(() => actionCreator()).toThrow();
	});

	it('throws when called with wrong meta type', () => {
		const actionCreator = makePayloadMetaActionCreator('TYPE');
		expect(() => actionCreator(undefined, [])).toThrow();
	});

	it('handles a call with 1 argument', () => {
		const actionCreator = makePayloadMetaActionCreator('TYPE');
		expect(actionCreator(undefined, {})).toEqual({
			type: 'TYPE',
			meta: {},
		});
	});

	it('uses the argument as the action payload and meta', () => {
		const actionCreator = makePayloadMetaActionCreator('TYPE');
		expect(actionCreator('yo', {})).toEqual({
			type: 'TYPE',
			payload: 'yo',
			meta: {},
		});
	});
});
