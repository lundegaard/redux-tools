import { toPascalCase, noop, isObject, isString } from 'ramda-extension';
import { keys, concat, toUpper } from 'ramda';
import { withoutOnce } from '@redux-tools/utils';
import invariant from 'invariant';

import createEntries from './createEntries';

const enhanceStore = (prevStore, type, { onEjected = noop, onInjected = noop } = {}) => {
	invariant(
		isObject(prevStore),
		'You must pass a Redux store as the first argument to `enhanceStore()`'
	);

	invariant(
		isString(type),
		'You must pass a string type (e.g. `reducers`) as the second argument to `enhanceStore()`'
	);

	const inject = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
		nextStore.entries[type] = concat(nextStore.entries[type], entries);
		onInjected({ injectables, props, entries });

		nextStore.dispatch({
			type: `@redux-tools/${toUpper(type)}_INJECTED`,
			payload: keys(injectables),
			meta: props,
		});
	};

	const eject = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
		nextStore.entries[type] = withoutOnce(entries, nextStore.entries[type]);
		onEjected({ injectables, props, entries });

		nextStore.dispatch({
			type: `@redux-tools/${toUpper(type)}_EJECTED`,
			payload: keys(injectables),
			meta: props,
		});
	};

	const nextStore = {
		...prevStore,
		[`inject${toPascalCase(type)}`]: inject,
		[`eject${toPascalCase(type)}`]: eject,
		entries: {
			...prevStore.entries,
			[type]: [],
		},
	};

	return nextStore;
};

export default enhanceStore;
