import { NAMESPACE_PREVENTED } from './constants';
import isActionFromNamespace from './isActionFromNamespace';

const fooAction = { meta: { namespace: 'foo' } };
const barAction = { meta: { namespace: 'bar' } };
const defaultNamespaceAction = { meta: { namespace: NAMESPACE_PREVENTED } };

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

	it('returns true when action is namespaced with a default namespace and reducer is namespaced', () => {
		expect(isActionFromNamespace('foo', defaultNamespaceAction)).toBe(true);
	});

	it('returns true when action is namespaced with a default namespace and reducer is global', () => {
		expect(isActionFromNamespace(undefined, defaultNamespaceAction)).toBe(true);
	});
});
