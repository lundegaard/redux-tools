import { prefixedValueMirror } from '@redux-tools/utils';
import { makeSimpleActionCreator } from '@redux-tools/actions';

export const ActionTypes = prefixedValueMirror(['@@redux-tools'])(['STOP_EPICS']);

export const stopEpics = makeSimpleActionCreator(ActionTypes.STOP_EPICS);
