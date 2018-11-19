import { prefixedValueMirror } from '@redux-tools/utils';
import { makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = prefixedValueMirror('@@redux-tools')([
	'REDUCERS_INJECTED',
	'REDUCERS_EJECTED',
]);

export const reducersInjected = makeSimpleActionCreator(ActionTypes.REDUCERS_INJECTED);
export const reducersEjected = makeSimpleActionCreator(ActionTypes.REDUCERS_EJECTED);
