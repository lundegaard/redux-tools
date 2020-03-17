import { applySpec, nth, map, toPairs, compose, merge, ifElse } from 'ramda';
import { isFunction, rejectNil } from 'ramda-extension';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { FUNCTION_KEY } from './constants';

const createEntry = applySpec({
	key: nth(0),
	value: nth(1),
});

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {Object|Function} injectables an object or function with injectables as values
 * @param {Object} props props to store in the entry, e.g. `namespace` or `feature`
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, { feature, ...otherProps } = {}) => {
	const sanitizedProps = rejectNil({
		...otherProps,
		feature: feature || DEFAULT_FEATURE,
	});

	const createEntriesFromObject = compose(map(merge(sanitizedProps)), map(createEntry), toPairs);

	const createEntriesFromFunction = injectable => [
		{
			key: FUNCTION_KEY,
			value: injectable,
			...sanitizedProps,
		},
	];

	return ifElse(isFunction, createEntriesFromFunction, createEntriesFromObject)(injectables);
};

export default createEntries;
