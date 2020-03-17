import { DEFAULT_FEATURE } from './constants';
import getStateByAction from './getStateByAction';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'Wassup' },
	},
};

describe('getStateByAction', () => {
	it('retrieves correct state slice when namespace matches', () => {
		expect(
			getStateByAction({ meta: { feature: DEFAULT_FEATURE, namespace: 'foo' } }, state)
		).toEqual({
			value: 'Wassup',
		});
	});

	it('returns undefined when a nonexistent namespace is passed', () => {
		expect(
			getStateByAction({ meta: { feature: DEFAULT_FEATURE, namespace: 'bar' } }, state)
		).toBeUndefined();
	});

	it('returns undefined when no namespace is passed', () => {
		expect(getStateByAction({}, state)).toBeUndefined();
	});
});
