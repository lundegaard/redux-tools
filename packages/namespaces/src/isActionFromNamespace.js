import { curry } from 'ramda';

import { NAMESPACE_PREVENTED } from './constants';
import getNamespaceByAction from './getNamespaceByAction';

/**
 * An action is from a namespace if the passed namespace is nil (it's a global reducer/epic),
 * or if the action's namespace is nil (it's a global action) or if the namespaces match
 * or if the action's namespace has been prevented.
 *
 * @param {?string} namespace namespace to match the action with
 * @param {Object} action action with an optionally defined meta.namespace property
 * @returns {boolean} whether the action is from the namespace or not
 */
const isActionFromNamespace = curry((namespace, action) => {
	const actionNamespace = getNamespaceByAction(action);

	if (!namespace || !actionNamespace || actionNamespace === NAMESPACE_PREVENTED) {
		return true;
	}

	return namespace === actionNamespace;
});

export default isActionFromNamespace;
