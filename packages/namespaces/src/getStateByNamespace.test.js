import { DEFAULT_FEATURE } from './constants';

import getStateByNamespace from './getStateByNamespace';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByNamespace', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(getStateByNamespace(DEFAULT_FEATURE, 'foo', state)).toEqual({
			value: 'Wassup',
		});
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(getStateByNamespace(DEFAULT_FEATURE, 'bar', state)).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByNamespace(DEFAULT_FEATURE, undefined, state)).toBeUndefined();
	});
});
