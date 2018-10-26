import { makeSimpleActionCreator } from '@lnd/redux-actions';
import { prefixedValueMirror } from '@lnd/utils';

export const ActionTypes = prefixedValueMirror('@@lnd-cardif-extensible-store')([
	'STOP_EPICS',
	'REDUCERS_INJECTED',
	'REDUCERS_REMOVED',
]);

export const stopEpics = makeSimpleActionCreator(ActionTypes.STOP_EPICS);
export const reducersInjected = makeSimpleActionCreator(ActionTypes.REDUCERS_INJECTED);
export const reducersRemoved = makeSimpleActionCreator(ActionTypes.REDUCERS_REMOVED);
