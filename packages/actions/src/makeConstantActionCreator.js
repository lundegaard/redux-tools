import invariant from 'invariant';
import { o, converge, always, __ } from 'ramda';

import makeActionCreator from './makeActionCreator';

const alwaysUndefined = always(undefined);

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */
const makeConstantActionCreator = type => {
	const actionCreator = o(
		converge(__, [alwaysUndefined]),
		makeActionCreator(__, alwaysUndefined, alwaysUndefined)
	)(type);

	return (payload = undefined) => {
		invariant(
			payload === undefined,
			`You passed an argument to an action creator created by "makeConstantActionCreator(${type})".
			Did you mean to use "makeSimpleActionCreator(${type})?"?
		`
		);

		return actionCreator();
	};
};

export default makeConstantActionCreator;
