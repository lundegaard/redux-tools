import { NAMESPACE_PREVENTED } from './constants';
import isActionFromNamespace from './isActionFromNamespace';

const fooAction = { meta: { namespace: 'foo' } };
const barAction = { meta: { namespace: 'bar' } };
const actionWithPreventedNamespace = { meta: { namespace: NAMESPACE_PREVENTED } };

describe('isActionFromNamespace', () => {
	it('returns true when action is global and reducer is global', () => {
		expect(isActionFromNamespace(undefined, {})).toBe(true);
	});

	it('returns true when action is global and reducer is namespaced', () => {
		expect(isActionFromNamespace('foo', {})).toBe(true);
	});

	it('returns true when action is namespaced and reducer is global', () => {
		expect(isActionFromNamespace(undefined, fooAction)).toBe(true);
	});

	it('returns true when namespaces match', () => {
		expect(isActionFromNamespace('foo', fooAction)).toBe(true);
	});

	it('returns false when namespaces do not match', () => {
		expect(isActionFromNamespace('foo', barAction)).toBe(false);
	});

	it('returns true when action had its namespace prevented and reducer is namespaced', () => {
		expect(isActionFromNamespace('foo', actionWithPreventedNamespace)).toBe(true);
	});

	it('returns true when action had its namespace prevented and reducer is global', () => {
		expect(isActionFromNamespace(undefined, actionWithPreventedNamespace)).toBe(true);
	});
});
