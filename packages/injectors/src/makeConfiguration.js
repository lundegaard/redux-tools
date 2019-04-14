import { prop, o, path } from 'ramda';
import { toPascalCase, defaultToEmptyArray } from 'ramda-extension';
import invariant from 'invariant';

const makeConfiguration = type => {
	invariant(type, 'The configuration type must be defined.');

	return {
		inject: prop(`inject${toPascalCase(type)}`),
		eject: prop(`eject${toPascalCase(type)}`),
		getEntries: o(defaultToEmptyArray, path(['entries', type])),
		type,
	};
};

export default makeConfiguration;
