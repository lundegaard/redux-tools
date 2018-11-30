import { makeActionTypes, makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('@@redux-tools', ['EPICS_INJECTED', 'EPICS_EJECTED']);

export const epicsInjected = makeSimpleActionCreator(ActionTypes.EPICS_INJECTED);
export const epicsEjected = makeSimpleActionCreator(ActionTypes.EPICS_EJECTED);
