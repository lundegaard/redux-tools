import invariant from 'invariant';
import { identity } from 'ramda';

import alwaysUndefined from './alwaysUndefined';
import configureActionCreator from './configureActionCreator';

/**
 * Creates an action creator with supplied type. The resulting action payload is the first arg.
 *
 * @sig String -> a -> {type: String, payload: a}
 */
const makePayloadActionCreator = type => {
	const actionCreator = configureActionCreator(type, identity, alwaysUndefined);

	return function(payload) {
		invariant(
			arguments.length !== 0,
			'You did not pass an argument to an action creator created by makePayloadActionCreator(' +
				type +
				'). Did you mean to use makeEmptyActionCreator(' +
				type +
				')?'
		);

		invariant(
			arguments.length <= 1,
			'You passed more than one argument to an action creator created by makePayloadActionCreator(' +
				type +
				').'
		);

		return actionCreator(payload);
	};
};

export default makePayloadActionCreator;
