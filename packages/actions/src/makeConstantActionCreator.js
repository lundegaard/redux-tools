import { o, __, converge } from 'ramda';
import { alwaysNull } from 'ramda-extension';

import makeActionCreator from './makeActionCreator';

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */
const makeConstantActionCreator = o(
	converge(__, [alwaysNull]),
	makeActionCreator(__, alwaysNull, alwaysNull)
);

export default makeConstantActionCreator;
