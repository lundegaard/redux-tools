import { makeSimpleActionCreator } from '@redux-tools/actions';
import { prefixedValueMirror } from '@redux-tools/utils';

export const ActionTypes = prefixedValueMirror(
	'@@redux-tools-extensible-store'
)(['STOP_EPICS', 'REDUCERS_INJECTED', 'REDUCERS_REMOVED']);

export const stopEpics = makeSimpleActionCreator(ActionTypes.STOP_EPICS);
export const reducersInjected = makeSimpleActionCreator(
	ActionTypes.REDUCERS_INJECTED
);
export const reducersRemoved = makeSimpleActionCreator(
	ActionTypes.REDUCERS_REMOVED
);
