import { curry, assocPath } from 'nanoutils';

/**
 * Associates an action with a namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
const attachNamespace = curry((namespace, action) =>
	namespace ? assocPath(['meta', 'namespace'], namespace, action) : action
);

export default attachNamespace;
