import { curry, mergeDeepRight } from 'ramda';

/**
 * Associates an action with a namespace.
 *
 * @param {?string} feature feature to attach
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
const attachNamespace = curry((feature, namespace, action) =>
	namespace && feature ? mergeDeepRight({ meta: { namespace, feature } }, action) : action
);

export default attachNamespace;
