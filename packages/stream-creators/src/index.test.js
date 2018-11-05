import { getStateByNamespace } from '@redux-tools/reducers';
import { of } from 'rxjs';
import { globalAction$, namespacedState$ } from './index';

jest.mock('@redux-tools/reducers');

getStateByNamespace.mockImplementation(namespace => state => `${namespace}/${state}`);

describe('namespacedState$', () => {
	it('returns a namespaced state stream', () => {
		const result = namespacedState$({ state$: of('state'), namespace: 'ns' });

		result.subscribe(namespacedState => {
			expect(namespacedState).toEqual('ns/state');
		});
	});
});

describe('globalAction$', () => {
	it('returns the global action stream', () => {
		expect(globalAction$({ globalAction$: 'yo' })).toBe('yo');
	});
});
