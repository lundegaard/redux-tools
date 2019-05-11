import { curry, mergeDeepRight } from 'ramda';
import { isFunction } from 'ramda-extension';

/**
 * Associates an action with a namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
const attachNamespace = curry((namespace, action) => {
	if (!namespace) {
		return action;
	}

	if (isFunction(action)) {
		const nextAction = (...args) => action(...args);

		nextAction.meta = { namespace };

		return nextAction;
	}

	return mergeDeepRight({ meta: { namespace } }, action);
});

export default attachNamespace;
