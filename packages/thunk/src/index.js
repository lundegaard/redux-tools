import { o } from 'ramda';
import { isFunction } from 'ramda-extension';

import {
	getNamespaceByAction,
	defaultNamespace,
	getStateByNamespace,
} from '@redux-tools/namespaces';

const makeThunkMiddleware = dependencies => ({ dispatch, getState }) => next => action => {
	if (isFunction(action)) {
		const namespace = getNamespaceByAction(action);

		return action({
			dispatch: o(dispatch, defaultNamespace(namespace)),
			getState,
			getNamespacedState: feature => getStateByNamespace(feature, namespace, getState()),
			namespace,
			...dependencies,
		});
	}

	return next(action);
};

const thunkMiddleware = makeThunkMiddleware();

thunkMiddleware.withDependencies = makeThunkMiddleware;

export default thunkMiddleware;
