import { applySpec, nth, map, toPairs, compose, merge } from 'ramda';

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {Object} injectables an object with injectables as values
 * @param {Object} props props to store in the entry, e.g. `namespace` or `version`
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, props) => {
	const createEntry = applySpec({
		key: nth(0),
		value: nth(1),
	});

	return compose(
		map(merge(props)),
		map(createEntry),
		toPairs
	)(injectables);
};

export default createEntries;
