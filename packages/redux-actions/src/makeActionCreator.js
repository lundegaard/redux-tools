import * as R from 'ramda';
import { alwaysNull, rejectNil } from 'ramda-extension';

/**
 * Creates an action creator with supplied type and payload & meta getters.
 *
 * @sig String -> (a -> b) -> (a -> c) -> a -> {type: String, payload: b, meta: c}
 *
 * @example
 *
 *    const reset = makeConstantActionCreator("RESET")
 *    const increment = makeSimpleActionCreator("INCREMENT");
 *    const fetchItems = makeActionCreator("FETCH_ITEMS", R.prop("items"), R.always({ page: 0 }))
 */
const makeActionCreator = R.curry((type, getPayload, getMeta) =>
	R.o(
		rejectNil,
		R.applySpec({
			type: R.always(type),
			payload: getPayload,
			meta: getMeta,
			error: R.o(R.ifElse(R.is(Error), R.T, alwaysNull), getPayload),
		})
	)
);

export default makeActionCreator;
