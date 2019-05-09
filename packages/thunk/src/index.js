import { o } from 'ramda';
import { isFunction } from 'ramda-extension';
import { getNamespaceByAction, attachNamespace } from '@redux-tools/namespaces';

const makeThunkMiddleware = extraArgument => ({ dispatch, getState }) => next => action => {
	if (isFunction(action)) {
		const namespace = getNamespaceByAction(action);

		return action(o(dispatch, attachNamespace(namespace)), getState, extraArgument);
	}

	return next(action);
};

const thunkMiddleware = makeThunkMiddleware();

thunkMiddleware.withExtraArgument = makeThunkMiddleware;

export default thunkMiddleware;
