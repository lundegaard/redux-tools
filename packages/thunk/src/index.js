import { o } from 'ramda';
import { isFunction } from 'ramda-extension';

import {
	getNamespaceByAction,
	defaultNamespace,
	getStateByFeatureAndNamespace,
	DEFAULT_FEATURE,
} from '@redux-tools/namespaces';

const makeThunkMiddleware = dependencies => ({ dispatch, getState }) => next => action => {
	if (isFunction(action)) {
		const namespace = getNamespaceByAction(action);

		const getNamespacedState = (feature = DEFAULT_FEATURE) =>
			getStateByFeatureAndNamespace(feature, namespace, getState());

		return action({
			dispatch: o(dispatch, defaultNamespace(namespace)),
			getState,
			namespace,
			getNamespacedState,
			...dependencies,
		});
	}

	return next(action);
};

const thunkMiddleware = makeThunkMiddleware();

thunkMiddleware.withDependencies = makeThunkMiddleware;

export default thunkMiddleware;
