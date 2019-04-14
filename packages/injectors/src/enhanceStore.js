import { toPascalCase, noop, isObject, isString } from 'ramda-extension';
import { keys, concat, toUpper } from 'ramda';
import { withoutOnce } from '@redux-tools/utils';
import invariant from 'invariant';

import createEntries from './createEntries';

const enhanceStore = (store, type, { onEjected = noop, onInjected = noop } = {}) => {
	invariant(isObject(store), 'You must pass a store to `enhanceStore()`');
	invariant(isString(type), 'You must pass a string type to `enhanceStore()`');

	if (!store.entries) {
		store.entries = {};
	}

	store.entries[type] = [];

	store[`inject${toPascalCase(type)}`] = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
		store.entries[type] = concat(store.entries[type], entries);
		onInjected({ injectables, props, entries });

		store.dispatch({
			type: `@redux-tools/${toUpper(type)}_INJECTED`,
			[type]: keys(injectables),
			...props,
		});
	};

	store[`eject${toPascalCase(type)}`] = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
		store.entries[type] = withoutOnce(entries, store.entries[type]);
		onEjected({ injectables, props, entries });

		store.dispatch({
			type: `@redux-tools/${toUpper(type)}_EJECTED`,
			[type]: keys(injectables),
			...props,
		});
	};
};

export default enhanceStore;
