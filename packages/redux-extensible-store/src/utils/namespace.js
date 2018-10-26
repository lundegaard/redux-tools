import { curry, path, useWith, identity } from 'ramda';
import invariant from 'invariant';

export const getNamespaceByAction = path(['meta', 'namespace']);

/**
 * Returns Redux state by namespace. Returns undefined if namespace is undefined.
 * Throws if invalid namespace is passed.
 *
 * @param {?String} namespace optional namespace
 * @param {Object} state redux state
 * @returns {?Object} namespaced redux state
 */
export const getStateByNamespace = curry((namespace, state) => {
	if (!namespace) {
		return undefined;
	}

	const namespacedState = path(['namespaces', namespace], state);
	invariant(namespacedState, `No local Redux state found for namespace ${namespace}.`);

	return namespacedState;
});

/**
 * @see getStateByNamespace
 */
export const getStateByAction = useWith(getStateByNamespace, [getNamespaceByAction, identity]);

/**
 * An action is from a namespace if the passed namespace is nil (it's a global reducer/epic),
 * or if the action's namespace is nil (it's a global action) or if the namespaces match.
 *
 * @param {?String} namespace namespace to match the action with
 * @param {Object} action action with an optionally defined meta.namespace property
 * @returns {Boolean} whether the action is from the namespace or not
 */
export const isActionFromNamespace = curry((namespace, action) => {
	const actionNamespace = getNamespaceByAction(action);

	if (!namespace || !actionNamespace) {
		return true;
	}

	return namespace === actionNamespace;
});
