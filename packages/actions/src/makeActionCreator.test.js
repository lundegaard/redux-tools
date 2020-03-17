import { prop, identity } from 'ramda';
import { alwaysNull } from 'ramda-extension';

import makeActionCreator from './makeActionCreator';

describe('makeActionCreator', () => {
	it('correctly applies getPayload and getMeta', () => {
		const actionCreator = makeActionCreator('TYPE', prop('foo'), prop('bar'));
		expect(actionCreator({ foo: 'Foo', bar: 'Bar' })).toEqual({
			type: 'TYPE',
			payload: 'Foo',
			meta: 'Bar',
		});
	});

	it('creates variadic action creator', () => {
		const actionCreator = makeActionCreator(
			'TYPE',
			x => x,
			(_, y) => y
		);

		expect(actionCreator({ foo: 'Foo', bar: 'Bar' }, 'Baz')).toEqual({
			type: 'TYPE',
			payload: { foo: 'Foo', bar: 'Bar' },
			meta: 'Baz',
		});
	});

	it('correctly applies the `error` prop', () => {
		const actionCreator = makeActionCreator('TYPE', identity, alwaysNull);
		const error = new Error();
		expect(actionCreator(error)).toEqual({ type: 'TYPE', error: true, payload: error });
	});
});
