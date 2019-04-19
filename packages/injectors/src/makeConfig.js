import { curry, o, path } from 'ramda';
import { defaultToEmptyArray, toPascalCase } from 'ramda-extension';
import invariant from 'invariant';

const makeConfig = type => {
	invariant(type, 'The config type must be defined.');

	return {
		type,
		injectionKey: `inject${toPascalCase(type)}`,
		ejectionKey: `eject${toPascalCase(type)}`,
		getEntries: o(defaultToEmptyArray, path(['entries', type])),
		setEntries: curry((entries, store) => (store.entries = { ...store.entries, [type]: entries })),
	};
};

export default makeConfig;
