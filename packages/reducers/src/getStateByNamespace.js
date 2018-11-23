import { curry, path } from 'ramda';

/**
 * Returns Redux state by namespace. Returns undefined if namespace is undefined.
 *
 * @param {?string} namespace optional namespace
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
const getStateByNamespace = curry((namespace, state) => {
	if (!namespace) {
		return undefined;
	}

	return path(['namespaces', namespace], state);
});

export default getStateByNamespace;
