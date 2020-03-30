import invariant from 'invariant';
import { identity, always } from 'ramda';

import makeActionCreator from './makeActionCreator';

const alwaysUndefined = always(undefined);

/**
 * Creates an action creator with supplied type. The resulting action payload is the first arg.
 *
 * @sig String -> a -> {type: String, payload: a}
 */
const makeSimpleActionCreator = type => {
	const actionCreator = makeActionCreator(type, identity, alwaysUndefined);

	return (payload = undefined) => {
		invariant(
			payload !== undefined,
			`You did not pass an argument to an action creator created by "makeSimpleActionCreator(${type})".
		   Did you mean to use "makeConstantActionCreator(${type})"?
	  `
		);

		return actionCreator(payload);
	};
};

export default makeSimpleActionCreator;
