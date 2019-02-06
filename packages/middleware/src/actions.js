import { makeActionTypes, makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('@@redux-tools', [
	'MIDDLEWARE_INJECTED',
	'MIDDLEWARE_EJECTED',
]);

export const middlewareInjected = makeSimpleActionCreator(ActionTypes.MIDDLEWARE_INJECTED);
export const middlewareEjected = makeSimpleActionCreator(ActionTypes.MIDDLEWARE_EJECTED);
