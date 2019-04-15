import { noop, isObject, toScreamingSnakeCase } from 'ramda-extension';
import { keys, concat } from 'ramda';
import { withoutOnce } from '@redux-tools/utils';
import invariant from 'invariant';

import createEntries from './createEntries';

const enhanceStore = (prevStore, config, { onEjected = noop, onInjected = noop } = {}) => {
	invariant(
		isObject(prevStore),
		'You must pass a Redux store as the first argument to `enhanceStore()`'
	);

	invariant(
		isObject(config),
		'You must pass an injector config as the second argument to `enhanceStore()`'
	);

	const { injectMethodName, ejectMethodName, getEntries, setEntries, type } = config;
	const { dispatch = noop } = prevStore;
	const actionType = toScreamingSnakeCase(type);

	const inject = (injectables, props = {}) => {
		const entries = createEntries(injectables, props);
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
			meta: props,
		});
	};

	const nextStore = {
		...prevStore,
		[injectMethodName]: inject,
		[ejectMethodName]: eject,
	};

	setEntries([], nextStore);

	return nextStore;
};

export default enhanceStore;
