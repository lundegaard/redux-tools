import { prop, o, path } from 'ramda';
import { defaultToEmptyArray } from 'ramda-extension';
import invariant from 'invariant';

import { getEjectMethodName, getInjectMethodName } from './enhanceStore';

const makeConfiguration = type => {
	invariant(type, 'The configuration type must be defined.');
	const ejectMethodName = getEjectMethodName(type);
	const injectMethodName = getInjectMethodName(type);

	return {
		getInject: prop(injectMethodName),
		getEject: prop(ejectMethodName),
		getEntries: o(defaultToEmptyArray, path(['entries', type])),
		ejectMethodName,
		injectMethodName,
		type,
	};
};

export default makeConfiguration;
