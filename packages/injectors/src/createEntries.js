import { applySpec, nth, map, toPairs, compose, merge, ifElse } from 'ramda';
import { isFunction } from 'ramda-extension';

import { FUNCTION_KEY } from './constants';

const createEntry = applySpec({
	key: nth(0),
	value: nth(1),
});

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {Object} injectables an object with injectables as values
 * @param {Object} props props to store in the entry, e.g. `namespace` or `version`
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, props) => {
	const createEntriesFromObject = compose(
		map(merge(props)),
		map(createEntry),
		toPairs
	);

	const createEntriesFromFunction = injectable => [
		{
			key: FUNCTION_KEY,
			value: injectable,
			...props,
		},
	];

	return ifElse(isFunction, createEntriesFromFunction, createEntriesFromObject)(injectables);
};

export default createEntries;
