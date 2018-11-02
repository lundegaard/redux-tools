import { prefixedValueMirror } from '@redux-tools/utils';
import { makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = prefixedValueMirror('@@redux-tools')([
	'REDUCERS_INJECTED',
	'REDUCERS_REMOVED',
]);

export const reducersInjected = makeSimpleActionCreator(ActionTypes.REDUCERS_INJECTED);
export const reducersRemoved = makeSimpleActionCreator(ActionTypes.REDUCERS_REMOVED);
