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
		invariant(!isNil(meta) && isPlainObject(meta), 'Meta must be an object.');

		return actionCreator(payload, meta);
	};
};

export default makePayloadMetaActionCreator;
