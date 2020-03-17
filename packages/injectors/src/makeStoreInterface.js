import invariant from 'invariant';
import { curry, o, path } from 'ramda';
import { defaultToEmptyArray, toPascalCase } from 'ramda-extension';

const makeStoreInterface = type => {
	invariant(type, 'The type of the injectables must be defined.');

	return {
		type,
		injectionKey: `inject${toPascalCase(type)}`,
		ejectionKey: `eject${toPascalCase(type)}`,
		getEntries: o(defaultToEmptyArray, path(['entries', type])),
		setEntries: curry((entries, store) => (store.entries = { ...store.entries, [type]: entries })),
	};
};

export default makeStoreInterface;
