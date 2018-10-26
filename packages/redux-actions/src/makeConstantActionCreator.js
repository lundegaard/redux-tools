import * as R from 'ramda';
import { alwaysNull } from 'ramda-extension';
import makeActionCreator from './makeActionCreator';

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */
const makeConstantActionCreator = R.o(
	actionCreator => () => actionCreator(null),
	makeActionCreator(R.__, alwaysNull, alwaysNull)
);

export default makeConstantActionCreator;
