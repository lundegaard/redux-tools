import { curry } from 'ramda';

import getStateByFeatureAndNamespace from './getStateByFeatureAndNamespace';

/**
 * Returns Redux state by feature and action namespace.
 *
 * @param {string} feature
 * @param {Object} action action with a `meta.namespace` property
 * @param {Object} state
 * @returns {*} state slice
 */
const getStateByFeatureAndAction = curry((feature, action, state) =>
	getStateByFeatureAndNamespace(feature, action?.meta?.namespace, state)
);

export default getStateByFeatureAndAction;
