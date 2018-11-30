import { makeActionTypes, makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('@@redux-tools', [
	'REDUCERS_INJECTED',
	'REDUCERS_EJECTED',
]);

export const reducersInjected = makeSimpleActionCreator(ActionTypes.REDUCERS_INJECTED);
export const reducersEjected = makeSimpleActionCreator(ActionTypes.REDUCERS_EJECTED);
