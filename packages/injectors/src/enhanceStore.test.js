import { noop } from 'ramda-extension';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import enhanceStore from './enhanceStore';
import makeStoreInterface from './makeStoreInterface';

describe('enhanceStore', () => {
	const storeInterface = makeStoreInterface('things');

	it('sets entries based on type', () => {
		const store = enhanceStore({}, storeInterface);
		expect(store.entries.things).toEqual([]);
	});

	it('spreads passed store to new store', () => {
		const store = enhanceStore({ dispatch: noop, getState: noop }, storeInterface);
		expect(store.dispatch).toBe(noop);
		expect(store.getState).toBe(noop);
	});

	it('sets injection methods based on type', () => {
		const store = enhanceStore({}, storeInterface);
		expect(store.injectThings).toBeInstanceOf(Function);
		expect(store.ejectThings).toBeInstanceOf(Function);
	});

	it('updates entries on injection', () => {
		const store = enhanceStore({}, storeInterface);
		store.injectThings({ foo: noop }, { namespace: 'bar' });
		expect(store.entries.things).toEqual([
			{ path: ['foo'], value: noop, namespace: 'bar', feature: DEFAULT_FEATURE },
		]);

		store.ejectThings({ foo: noop }, { namespace: 'bar' });
		expect(store.entries.things).toEqual([]);
	});

	it('dispatches actions on injection', () => {
		const dispatch = jest.fn();
		const store = enhanceStore({ dispatch }, storeInterface);
		store.injectThings({ foo: noop }, { namespace: 'bar' });
		expect(dispatch).toHaveBeenCalledTimes(1);
		const injectedAction = dispatch.mock.calls[0][0];
		expect(injectedAction.type).toBe('@redux-tools/THINGS_INJECTED');
		expect(injectedAction.payload).toEqual([['foo']]);
		expect(injectedAction.meta).toEqual({ namespace: 'bar' });
		jest.clearAllMocks();
		store.ejectThings({ foo: noop }, { namespace: 'bar' });
		expect(dispatch).toHaveBeenCalledTimes(1);
		const ejectedAction = dispatch.mock.calls[0][0];
		expect(ejectedAction.type).toBe('@redux-tools/THINGS_EJECTED');
		expect(ejectedAction.payload).toEqual([['foo']]);
		expect(ejectedAction.meta).toEqual({ namespace: 'bar' });
	});

	it('calls handlers on ejection', () => {
		const onInjected = jest.fn();
		const onEjected = jest.fn();
		const store = enhanceStore({}, storeInterface, { onInjected, onEjected });
		store.injectThings({ foo: noop }, { namespace: 'bar' });
		expect(onInjected).toHaveBeenCalledTimes(1);
		expect(onEjected).not.toHaveBeenCalled();
		jest.clearAllMocks();
		store.ejectThings({ foo: noop }, { namespace: 'bar' });
		expect(onEjected).toHaveBeenCalledTimes(1);
		expect(onInjected).not.toHaveBeenCalled();
	});
});
