import { DEFAULT_FEATURE } from './constants';
import getStateByAction from './getStateByAction';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByAction', () => {
	it('retrieves correct state slice when an existing namespace is passed', () => {
		expect(getStateByAction({ meta: { namespace: 'foo' } }, state)).toBe(
			state[DEFAULT_FEATURE].foo
		);
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(getStateByAction({ meta: { namespace: 'bar' } }, state)).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByAction({ meta: { namespace: undefined } }, state)).toBeUndefined();
	});
});
