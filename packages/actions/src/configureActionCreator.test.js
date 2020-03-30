import { prop, identity } from 'ramda';

import alwaysUndefined from './alwaysUndefined';
import configureActionCreator from './configureActionCreator';

describe('configureActionCreator', () => {
	it('correctly applies getPayload and getMeta', () => {
		const actionCreator = configureActionCreator('TYPE', prop('foo'), prop('bar'));
		expect(actionCreator({ foo: 'Foo', bar: 'Bar' })).toEqual({
			type: 'TYPE',
			payload: 'Foo',
			meta: 'Bar',
		});
	});

	it('creates variadic action creator', () => {
		const actionCreator = configureActionCreator(
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
		const actionCreator = configureActionCreator('TYPE', identity, alwaysUndefined);
		const error = new Error();
		expect(actionCreator(error)).toEqual({ type: 'TYPE', error: true, payload: error });
	});
});
