// NOTE: We need to list all exports manually because of potential naming collisions.
export {
	isErrorAction,
	isNotErrorAction,
	configureActionCreator,
	makeActionTypes,
	makeEmptyActionCreator,
	makePayloadActionCreator,
	makeConstantActionCreator,
	makeSimpleActionCreator,
	makePayloadMetaActionCreator,
} from '@redux-tools/actions';

export { makeEnhancer as makeMiddlewareEnhancer } from '@redux-tools/middleware';

export { useMiddleware, withMiddleware } from '@redux-tools/middleware-react';

export {
	attachNamespace,
	defaultNamespace,
	getNamespaceByAction,
	isActionFromNamespace,
	getStateByAction,
	getStateByNamespace,
} from '@redux-tools/namespaces';

export {
	composeReducers,
	makeEnhancer as makeReducersEnhancer,
	makeReducer,
	combineReducers,
} from '@redux-tools/reducers';

export { useReducers, withReducers } from '@redux-tools/reducers-react';

export {
	namespacedConnect,
	useNamespace,
	NamespaceProvider,
	withNamespaceProvider,
} from '@redux-tools/namespaces-react';
