import { __, nthArg } from 'ramda';

import makeActionCreator from './makeActionCreator';

/**
 * Creates a new binary action creator which will use the first argument as the payload and the second argument as the meta.
 *
 * @sig String -> (a, {}) -> {type: String, payload: a, meta: {}}
 */
const makeBinaryActionCreator = makeActionCreator(__, nthArg(0), nthArg(1));

export default makeBinaryActionCreator;
