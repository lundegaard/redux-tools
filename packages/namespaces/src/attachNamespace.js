import { curry, mergeDeepRight, mergeDeepLeft } from 'ramda';
import { isFunction } from 'ramda-extension';

const mergeNamespace = curry((isForced, namespace, action) => {
	if (!namespace) {
		return action;
	}

	if (isFunction(action)) {
		const nextAction = (...args) => action(...args);

		nextAction.meta = { namespace };

		return nextAction;
	}

	if (isForced) {
		return mergeDeepLeft({ meta: { namespace } }, action);
	}

	return mergeDeepRight({ meta: { namespace } }, action);
});

/**
 * Associates an action with a namespace, overwriting any previous namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
export const attachNamespace = mergeNamespace(true);

/**
 * Associates an action with a namespace unless it is already associated with some namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
export const defaultNamespace = mergeNamespace(false);
