import { noop } from 'ramda-extension';

import createEntries from './createEntries';
import { FUNCTION_KEY } from './constants';

describe('createEntries', () => {
	it('correctly creates an array of entries', () => {
		expect(
			createEntries(
				{
					foo: 'bar',
					bar: 'baz',
				},
				{
					namespace: 'ns',
					version: 1,
					feature: 'grid',
				}
			)
		).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', version: 1, feature: 'grid' },
			{ key: 'bar', value: 'baz', namespace: 'ns', version: 1, feature: 'grid' },
		]);
	});

	it('handles functions', () => {
		expect(
			createEntries(noop, {
				namespace: 'ns',
				version: 1,
				feature: 'grid',
			})
		).toEqual([{ key: FUNCTION_KEY, value: noop, namespace: 'ns', version: 1, feature: 'grid' }]);
	});
});
