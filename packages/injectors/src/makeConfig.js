import { prop, o, path, assocPath } from 'ramda';
import { defaultToEmptyArray, toPascalCase } from 'ramda-extension';
import invariant from 'invariant';

const makeConfig = type => {
	invariant(type, 'The config type must be defined.');

	const injectMethodName = `inject${toPascalCase(type)}`;
	const ejectMethodName = `eject${toPascalCase(type)}`;
	const entriesPath = ['entries', type];

	return {
		type,
		getInject: prop(injectMethodName),
		getEject: prop(ejectMethodName),
		injectMethodName,
		ejectMethodName,
		getEntries: o(defaultToEmptyArray, path(entriesPath)),
		// NOTE: We need to mutate the store and handle missing `store.entries` object.
		setEntries: (entries, store) =>
			(store.entries = assocPath(entriesPath, entries, store).entries),
	};
};

export default makeConfig;
