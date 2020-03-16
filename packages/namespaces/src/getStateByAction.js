import { path, o, defaultTo } from 'ramda';
import { DEFAULT_FEATURE } from './constants';

import getStateByNamespace from './getStateByNamespace';

const getFeature = o(defaultTo(DEFAULT_FEATURE), path(['meta', 'feature']));
const getNamespace = path(['meta', 'namespace']);
/**
 * Returns Redux state by action namespace.
 *
 * @see getStateByNamespace
 *
 * @param {Object} action action with an optionally defined meta.namespace and meta.feature property
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
const getStateByAction = (action, state) =>
	getStateByNamespace(getFeature(action), getNamespace(action), state);

export default getStateByAction;
