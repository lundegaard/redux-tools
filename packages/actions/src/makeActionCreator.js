import { curry, o, applySpec, always, ifElse, is, T } from 'nanoutils';
import { alwaysNull, rejectNil } from 'ramda-extension';

/**
 * Creates an action creator with supplied type and payload & meta getters.
 *
 * @sig String -> (a -> b) -> (a -> c) -> a -> {type: String, payload: b, meta: c}
 *
 * @example
 *
 *    const reset = makeConstantActionCreator("RESET")
 *    const add = makeSimpleActionCreator("ADD");
 *    const fetchItems = makeActionCreator("FETCH_ITEMS", NU.prop("items"), NU.always({ page: 0 }))
 */
const makeActionCreator = curry((type, getPayload, getMeta) =>
	o(
		rejectNil,
		applySpec({
			type: always(type),
			payload: getPayload,
			meta: getMeta,
			error: o(ifElse(is(Error), T, alwaysNull), getPayload),
		})
	)
);

export default makeActionCreator;
