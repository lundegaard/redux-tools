import { noop, isObject, toScreamingSnakeCase } from 'ramda-extension';
import { keys, concat, forEach, length, o } from 'ramda';
import { withoutOnce } from '@redux-tools/utils';
import invariant from 'invariant';

import createEntries from './createEntries';

const enhanceStore = (prevStore, storeInterface, { onEjected = noop, onInjected = noop } = {}) => {
	invariant(
		isObject(prevStore),
		'You must pass a Redux store as the first argument to `enhanceStore()`'
	);

	invariant(
		isObject(storeInterface),
		'You must pass a store interface as the second argument to `enhanceStore()`'
	);

	const { injectionKey, ejectionKey, getEntries, setEntries, type } = storeInterface;
	const { dispatch = noop } = prevStore;
	const actionType = toScreamingSnakeCase(type);

	const inject = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);

		forEach(
			entry =>
				invariant(
					// NOTE: `isFunction` from ramda-extension returns `false` for `jest.fn()`.
					typeof entry.value === 'function',
					`Injecting ${type}, but the value of ${JSON.stringify(entry)} is not a function.`
				),
			entries
		);

		const nextEntries = concat(getEntries(nextStore), entries);
		setEntries(nextEntries, nextStore);
		onInjected({ injectables, props, entries });

		dispatch({
			type: `@redux-tools/${actionType}_INJECTED`,
			payload: keys(injectables),
			meta: props,
		});
	};

	const eject = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
		const nextEntries = withoutOnce(entries, getEntries(nextStore));
		setEntries(nextEntries, nextStore);
		onEjected({ injectables, props, entries });

		dispatch({
			type: `@redux-tools/${actionType}_EJECTED`,
			payload: keys(injectables),
			meta: {
				...props,
				isFunctionReducer: o(length, keys)(injectables) === 0 && length(entries) > 0,
			},
		});
	};

	const nextStore = {
		...prevStore,
		[injectionKey]: inject,
		[ejectionKey]: eject,
	};

	setEntries([], nextStore);

	return nextStore;
};

export default enhanceStore;
