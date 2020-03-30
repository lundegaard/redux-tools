import { __, nthArg } from 'ramda';

import configureActionCreator from './configureActionCreator';

/**
 * Creates a new binary action creator which will use the first argument as the payload and the second argument as the meta.
 *
 * @sig String -> (a, {}) -> {type: String, payload: a, meta: {}}
 */
const makePayloadMetaActionCreator = configureActionCreator(__, nthArg(0), nthArg(1));

export default makePayloadMetaActionCreator;
