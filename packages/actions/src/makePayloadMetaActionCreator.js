import { __, nthArg } from 'ramda';

import configureActionCreator from './configureActionCreator';

/**
 * Creates an action creator with supplied type. The resulting action payload is the first arg.
 *
 * @sig String -> (a, {}) -> {type: String, payload: a, meta: {}}
 */
const makePayloadMetaActionCreator = configureActionCreator(__, nthArg(0), nthArg(1));

export default makePayloadMetaActionCreator;
