import invariant from 'invariant';

import alwaysUndefined from './alwaysUndefined';
import configureActionCreator from './configureActionCreator';

/**
 * Creates an action creator with supplied type, no payload and no meta.
 *
 * @sig String -> () -> {type: String}
 */
const makeConstantActionCreator = type => {
	const actionCreator = configureActionCreator(type, alwaysUndefined, alwaysUndefined);

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

		return actionCreator(payload);
	};
};

export default makeConstantActionCreator;
