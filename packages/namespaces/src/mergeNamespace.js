import { curry, mergeDeepRight, mergeDeepLeft, isNil } from 'ramda';
import { isFunction } from 'ramda-extension';

import getNamespaceByAction from './getNamespaceByAction';

const mergeNamespace = curry((isForced, namespace, action) => {
	if (isNil(namespace)) {
		return action;
	}

	if (isFunction(action)) {
		const nextAction = (...args) => action(...args);

		if (isForced) {
			nextAction.meta = { namespace };
		} else {
			nextAction.meta = { namespace: getNamespaceByAction(action) ?? namespace };
		}

		return nextAction;
	}

	if (isForced) {
		return mergeDeepLeft({ meta: { namespace } }, action);
	}

	return mergeDeepRight({ meta: { namespace } }, action);
});

export default mergeNamespace;
