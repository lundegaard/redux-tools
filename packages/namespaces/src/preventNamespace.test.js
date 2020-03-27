import { NAMESPACE_PREVENTED } from './constants';
import preventNamespace from './preventNamespace';

describe('preventNamespace', () => {
	it('sets default namespace', () => {
		expect(preventNamespace({ meta: { namespace: 'foo' } })).toEqual({
			meta: { namespace: NAMESPACE_PREVENTED },
		});
	});
});
