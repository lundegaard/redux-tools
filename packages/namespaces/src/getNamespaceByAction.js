import { path } from 'ramda';

/**
 * Returns the namespace of an action.
 *
 * @param {Object} action Redux action
 * @returns {?string} namespace of the action
 */
const getNamespaceByAction = path(['meta', 'namespace']);

export default getNamespaceByAction;
