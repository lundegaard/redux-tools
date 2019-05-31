import { o } from 'ramda';
import { isFunction } from 'ramda-extension';
import { getNamespaceByAction, attachNamespace } from '@redux-tools/namespaces';
import { getStateByNamespace } from '@redux-tools/reducers';

const makeThunkMiddleware = dependencies => ({ dispatch, getState }) => next => action => {
	if (isFunction(action)) {
		const namespace = getNamespaceByAction(action);

		return action({
			dispatch: o(dispatch, attachNamespace(namespace)),
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
