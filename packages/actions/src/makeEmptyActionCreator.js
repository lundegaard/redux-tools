import invariant from 'invariant';

import alwaysUndefined from './alwaysUndefined';
import configureActionCreator from './configureActionCreator';

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */
const makeEmptyActionCreator = type => {
	const actionCreator = configureActionCreator(type, alwaysUndefined, alwaysUndefined);

	// NOTE: Regular function so we can use `arguments` without entering any parameters.
	// An arrow function allows us to do `...args`, but that hurts autocompletion.
	return function() {
		invariant(
			arguments.length === 0,
			'You passed an argument to an action creator created by makeEmptyActionCreator(' +
				type +
				'). Did you mean to use makePayloadActionCreator(' +
				type +
				')?'
		);

		return actionCreator(undefined);
	};
};

export default makeEmptyActionCreator;
