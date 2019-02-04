import { __, identity } from 'nanoutils';
import { alwaysNull } from 'ramda-extension';
import makeActionCreator from './makeActionCreator';

/**
 * Creates an action creator with supplied type. The resulting action payload is the first arg.
 *
 * @sig String -> a -> {type: String, payload: a}
 */
const makeSimpleActionCreator = makeActionCreator(__, identity, alwaysNull);

export default makeSimpleActionCreator;
