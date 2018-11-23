import { curry } from 'ramda';

import getNamespaceByAction from './getNamespaceByAction';

/**
 * An action is from a namespace if the passed namespace is nil (it's a global reducer/epic),
 * or if the action's namespace is nil (it's a global action) or if the namespaces match.
 *
 * @param {?string} namespace namespace to match the action with
 * @param {Object} action action with an optionally defined meta.namespace property
 * @returns {boolean} whether the action is from the namespace or not
 */
const isActionFromNamespace = curry((namespace, action) => {
	const actionNamespace = getNamespaceByAction(action);

	if (!namespace || !actionNamespace) {
		return true;
	}

	return namespace === actionNamespace;
});

export default isActionFromNamespace;
