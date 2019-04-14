import { applySpec, nth, map, toPairs, compose, merge } from 'ramda';
import { rejectNil } from 'ramda-extension';

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {Object} injectables an object with injectables as values
 * @param {Object} props props to store in the entry, e.g. `namespace` or `feature`
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, props = {}) => {
	const createEntry = applySpec({
		key: nth(0),
		value: nth(1),
	});

	const sanitizedProps = rejectNil(props);

	return compose(
		map(merge(sanitizedProps)),
		map(createEntry),
		toPairs
	)(injectables);
};

export default createEntries;
