import { applySpec, nth, always, o, map, toPairs } from 'nanoutils';

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {Object} injectables an object with injectables as values
 * @param {?string} namespace namespace of all the entries
 * @param {?number} version version of all the entries
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, namespace, version) => {
	const createEntry = applySpec({
		key: nth(0),
		value: nth(1),
		namespace: always(namespace),
		version: always(version),
	});

	return o(map(createEntry), toPairs)(injectables);
};

export default createEntries;
