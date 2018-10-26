import * as R from 'ramda';
import { alwaysNull } from 'ramda-extension';
import makeActionCreator from './makeActionCreator';

describe('makeActionCreator', () => {
	it('correctly applies getPayload and getMeta', () => {
		const actionCreator = makeActionCreator('TYPE', R.prop('foo'), R.prop('bar'));
		expect(actionCreator({ foo: 'Foo', bar: 'Bar' })).toEqual({
			type: 'TYPE',
			payload: 'Foo',
			meta: 'Bar',
		});
	});

	it('correctly applies the `error` prop', () => {
		const actionCreator = makeActionCreator('TYPE', R.identity, alwaysNull);
		const error = new Error();
		expect(actionCreator(error)).toEqual({ type: 'TYPE', error: true, payload: error });
	});
});
