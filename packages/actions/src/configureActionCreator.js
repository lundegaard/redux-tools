import invariant from 'invariant';
import { curry, compose, o, applySpec, always, ifElse, is, T, reject } from 'ramda';
import { isNilOrEmptyString } from 'ramda-extension';

import alwaysUndefined from './alwaysUndefined';

const isUndefined = value => value === undefined;

/**
 * Creates an action creator with supplied type and payload & meta getters.
 *
 * @sig String -> (a -> b) -> (a -> c) -> a -> {type: String, payload: b, meta: c}
 *
 * @example
 *
 *    const reset = makeConstantActionCreator("RESET")
 *    const add = makePayloadActionCreator("ADD");
 *    const fetchItems = configureActionCreator("FETCH_ITEMS", R.prop("items"), R.always({ page: 0 }))
 */

const configureActionCreator = curry((type, getPayload, getMeta) => {
	invariant(!isNilOrEmptyString(type), 'Type must be a string');

	const actionCreator = compose(
		reject(isUndefined),
		applySpec({
			type: always(type),
			payload: getPayload,
			meta: getMeta,
			error: o(ifElse(is(Error), T, alwaysUndefined), getPayload),
		})
	);

	return (getPayload, getMeta) => actionCreator(getPayload, getMeta);
});

export default configureActionCreator;
