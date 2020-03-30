import { curry, compose, o, applySpec, always, ifElse, is, T, reject } from 'ramda';

/**
 * Creates an action creator with supplied type and payload & meta getters.
 *
 * @sig String -> (a -> b) -> (a -> c) -> a -> {type: String, payload: b, meta: c}
 *
 * @example
 *
 *    const reset = makeConstantActionCreator("RESET")
 *    const add = makeSimpleActionCreator("ADD");
 *    const fetchItems = makeActionCreator("FETCH_ITEMS", R.prop("items"), R.always({ page: 0 }))
 */

const isUndefined = value => value === undefined;

const makeActionCreator = curry((type, getPayload, getMeta) =>
	compose(
		reject(isUndefined),
		applySpec({
			type: always(type),
			payload: getPayload,
			meta: getMeta,
			error: o(ifElse(is(Error), T, always(undefined)), getPayload),
		})
	)
);

export default makeActionCreator;
