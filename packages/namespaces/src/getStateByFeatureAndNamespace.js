import { curry, path } from 'ramda';

/**
 * Returns Redux state by feature and namespace.
 *
 * @param {string} feature
 * @param {string} namespace
 * @param {Object} state
 * @returns {*} state slice
 */
const getStateByFeatureAndNamespace = curry((feature, namespace, state) =>
	path([feature, namespace], state)
);

export default getStateByFeatureAndNamespace;
