import { getStateByNamespace } from '@redux-tools/namespaces';
import { of } from 'rxjs';
import { globalAction$, namespacedState$ } from './streamCreators';

jest.mock('@redux-tools/reducers');

getStateByNamespace.mockImplementation((feature, namespace) => state =>
	`${feature}-${namespace}/${state}`
);

describe('namespacedState$', () => {
	it('returns a namespaced state stream', () => {
		const result = namespacedState$({ state$: of('state'), namespace: 'ns', feature: 'f' });

		result.subscribe(namespacedState => {
			expect(namespacedState).toEqual('f-ns/state');
		});
	});
});

describe('globalAction$', () => {
	it('returns the global action stream', () => {
		expect(globalAction$({ globalAction$: 'yo' })).toBe('yo');
	});
});
