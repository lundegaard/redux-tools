import { noop } from 'ramda-extension';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

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
					feature: 'grid',
				}
			)
		).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', feature: 'grid' },
			{ key: 'bar', value: 'baz', namespace: 'ns', feature: 'grid' },
		]);
	});

	it('handles functions', () => {
		expect(
			createEntries(noop, {
				namespace: 'ns',
				feature: 'grid',
			})
		).toEqual([
			{
				key: FUNCTION_KEY,
				value: noop,
				namespace: 'ns',
				feature: 'grid',
			},
		]);
	});

	it('defaults feature', () => {
		expect(
			createEntries(
				{
					foo: 'bar',
					bar: 'baz',
				},
				{
					namespace: 'ns',
				}
			)
		).toEqual([
			{ key: 'foo', value: 'bar', namespace: 'ns', feature: DEFAULT_FEATURE },
			{ key: 'bar', value: 'baz', namespace: 'ns', feature: DEFAULT_FEATURE },
		]);
	});
});
