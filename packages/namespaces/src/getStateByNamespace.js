import { curry, path } from 'ramda';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

/**
 * Returns Redux state by namespace. Returns undefined if namespace is undefined.
 *
 * @param {?string} feature optional feature name
 * @param {?string} namespace optional namespace
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
const getStateByNamespace = curry((feature, namespace, state) => {
	if (!namespace) {
		return undefined;
	}

	return path([feature || DEFAULT_FEATURE, namespace], state);
});

export default getStateByNamespace;
