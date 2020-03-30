import invariant from 'invariant';
import { o, converge, __ } from 'ramda';

import alwaysUndefined from './alwaysUndefined';
import makeActionCreator from './makeActionCreator';

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
			// eslint-disable-next-line prefer-template
			'You passed an argument to an action creator created by makeConstantActionCreator(' +
				type +
				'.Did you mean to use makeSimpleActionCreator(' +
				type +
				')?'
		);

		return actionCreator();
	};
};

export default makeConstantActionCreator;
