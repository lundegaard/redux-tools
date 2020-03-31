import makeEmptyActionCreator from './makeEmptyActionCreator';
import makePayloadActionCreator from './makePayloadActionCreator';

export { prefixedValueMirror as makeActionTypes } from '@redux-tools/utils';

export { default as configureActionCreator } from './configureActionCreator';
export { default as makePayloadMetaActionCreator } from './makePayloadMetaActionCreator';

export { default as isErrorAction } from './isErrorAction';
export { default as isNotErrorAction } from './isNotErrorAction';

export { makeEmptyActionCreator, makePayloadActionCreator };
export const makeConstantActionCreator = makeEmptyActionCreator;
export const makeSimpleActionCreator = makePayloadActionCreator;
