import * as R from 'ramda';
import { overHead } from 'ramda-extension';
import invariant from 'invariant';

const createTypeEqualsPredicate = type =>
	R.compose(
		R.whereEq({ type }),
		R.nthArg(1)
	);

const maybeUseErrorReducer = ([typePredicate, reducer, errorReducer]) => {
	const newReducer = (state, action) => {
		if (R.prop('error', action)) {
			invariant(errorReducer, `You haven't supplied an error reducer for action ${action.type}`);
			return errorReducer(state, action);
		}

		return reducer(state, action);
	};

	return [typePredicate, newReducer];
};

/**
 * Creates a complex reducer from (type, reducer[, errorReducer]) tuples.
 *
 * @sig [[String, Reducer, Reducer]] -> Reducer
 *
 * @example
 *
 *    const initialState = 1
 *    const counter = switchReducer([
 *      ["INCREMENT", (state, action) => state + action.payload],
 *      ["RESET", R.always(initialState)],
 *    ], initialState);
 *
 *    counter(undefined, {}) // 1
 *    counter(3, { type: "INCREMENT", payload: 2 }) // 5
 *    counter(3, { type: "RESET" }) // 1
 *    counter(3, { type: "LOAD_ITEMS" }) // 3
 */
const makeReducer = (pairs, initialState) =>
	R.compose(
		R.useWith(R.__, [R.defaultTo(initialState), R.identity]),
		R.cond,
		R.map(maybeUseErrorReducer),
		R.append([R.T, R.identity, R.identity]),
		R.map(overHead(createTypeEqualsPredicate))
	)(pairs);

export default makeReducer;
