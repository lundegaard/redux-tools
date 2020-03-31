import invariant from 'invariant';
import { nthArg, isNil } from 'ramda';
import { isPlainObject } from 'ramda-extension';

import configureActionCreator from './configureActionCreator';

/**
 * Creates a new binary action creator which will use the first argument as the payload and the second argument as the meta.
 *
 * @sig String -> (a, {}) -> {type: String, payload: a, meta: {}}
 */
const makePayloadMetaActionCreator = type => {
	const actionCreator = configureActionCreator(type, nthArg(0), nthArg(1));

	return (payload, meta) => {
		invariant(
			!isNil(meta),
			// eslint-disable-next-line prefer-template
			'You did not pass the meta object to an action creator created by makePayloadMetaActionCreator(' +
				type +
				').'
		);

		invariant(
			isPlainObject(meta),
			// eslint-disable-next-line prefer-template
			'Action creator created by makePayloadMetaActionCreator(' +
				type +
				') expects the meta argument to be a plain object. Instead, it received ' +
				meta +
				'.'
		);

		return actionCreator(payload, meta);
	};
};

export default makePayloadMetaActionCreator;
