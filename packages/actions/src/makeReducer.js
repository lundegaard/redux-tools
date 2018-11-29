import {
	prop,
	compose,
	whereEq,
	nthArg,
	useWith,
	__,
	defaultTo,
	identity,
	cond,
	map,
	append,
	T,
} from 'ramda';
import { overHead } from 'ramda-extension';
import invariant from 'invariant';

const createTypeEqualsPredicate = type =>
	compose(
		whereEq({ type }),
		nthArg(1)
	);

const mergeReducers = ([typePredicate, reducer, errorReducer]) => {
	const newReducer = (state, action) => {
		if (prop('error', action)) {
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
 *      ["RESET", always(initialState)],
 *    ], initialState);
 *
 *    counter(undefined, {}) // 1
 *    counter(3, { type: "INCREMENT", payload: 2 }) // 5
 *    counter(3, { type: "RESET" }) // 1
 *    counter(3, { type: "LOAD_ITEMS" }) // 3
 */
const makeReducer = (tuples, initialState) =>
	compose(
		useWith(__, [defaultTo(initialState), identity]),
		cond,
		map(mergeReducers),
		append([T, identity, identity]),
		map(overHead(createTypeEqualsPredicate))
	)(tuples);

export default makeReducer;
