// NOTE: We need to list all exports manually because of potential naming collisions.
export {
	isErrorAction,
	isNotErrorAction,
	makeActionCreator,
	makeActionTypes,
	makeConstantActionCreator,
	makeReducer, // TODO: Move to `reducers`.
	makeSimpleActionCreator,
} from '@redux-tools/actions';

export { makeEnhancer as makeMiddlewareEnhancer } from '@redux-tools/middleware';

export { useMiddleware, withMiddleware } from '@redux-tools/middleware-react';

export {
	attachNamespace,
	defaultNamespace,
	getNamespaceByAction,
	isActionFromNamespace,
} from '@redux-tools/namespaces';

export {
	composeReducers,
	getStateByAction, // TODO: Move to `namespaces`.
	getStateByNamespace, // TODO: Move to `namespaces`.
	makeEnhancer as makeReducersEnhancer,
} from '@redux-tools/reducers';

export {
	namespacedConnect, // TODO: Move to `namespaces-react`.
	useNamespace, // TODO: Move to `namespaces-react`.
	useReducers,
	withReducers,
	Provider, // TODO: Move to `namespaces-react`.
} from '@redux-tools/reducers-react';
