import { o, chain, map, toPairs, mergeRight } from 'ramda';
import { isArray, rejectNil, isObject } from 'ramda-extension';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

const createRawEntries = injectables => {
	// NOTE: `isFunction` from ramda-extension returns `false` for `jest.fn()`.
	if (typeof injectables === 'function') {
		return [{ path: [], value: injectables }];
	}

	if (isArray(injectables)) {
		return chain(createRawEntries, injectables);
	}

	if (isObject(injectables)) {
		const createRawEntriesFromPair = ([key, injectable]) => {
			const entries = createRawEntries(injectable);

			const prependEntryPath = entry => ({
				...entry,
				path: [key, ...entry.path],
			});

			return map(prependEntryPath, entries);
		};

		return o(chain(createRawEntriesFromPair), toPairs)(injectables);
	}

	return [];
};

/**
 * Converts the input of `store.injectSomething()` or `store.ejectSomething()`
 * to an array of standalone entries.
 *
 * @param {*} injectables injectables to create the entries from
 * @param {Object} props props to store in all entries, i.e. `namespace` and `feature`
 * @returns {Object[]} an array of entries
 */
const createEntries = (injectables, { feature, namespace } = {}) => {
	const sanitizedProps = rejectNil({
		namespace,
		feature: feature ?? (namespace ? DEFAULT_FEATURE : null),
	});

	const rawEntries = createRawEntries(injectables);
	const addPropsToEntries = map(mergeRight(sanitizedProps));

	return addPropsToEntries(rawEntries);
};

export default createEntries;
