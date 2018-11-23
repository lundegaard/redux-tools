import { prefixedValueMirror } from '@redux-tools/utils';
import { makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = prefixedValueMirror('@@redux-tools')([
	'EPICS_INJECTED',
	'EPICS_EJECTED',
]);

export const epicsInjected = makeSimpleActionCreator(ActionTypes.EPICS_INJECTED);
export const epicsEjected = makeSimpleActionCreator(ActionTypes.EPICS_EJECTED);
