import {
	prop,
	compose,
	useWith,
	__,
	defaultTo,
	identity,
	cond,
	map,
	append,
	T,
	includes,
} from 'ramda';
import { overHead, isString, isFunction, isArray } from 'ramda-extension';

const createTypeEqualsPredicate = condition => (state, action) => {
	if (isString(condition)) {
		return action.type === condition;
	} else if (isArray(condition)) {
		return includes(action.type, condition);
	} else if (isFunction(condition)) {
		return condition(action);
	}
};

const mergeReducers = ([typePredicate, reducer, errorReducer]) => {
	const newReducer = (state, action) => {
		if (prop('error', action) && errorReducer) {
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
 *    const reducer = makeReducer([
 *      ["ADD", (state, action) => state + action.payload],
 *      ["RESET", always(initialState)],
 *    ], initialState);
 *
 *    reducer(undefined, {}) // 1
 *    reducer(3, { type: "ADD", payload: 2 }) // 5
 *    reducer(3, { type: "RESET" }) // 1
 *    reducer(3, { type: "LOAD_ITEMS" }) // 3
 */
const makeReducer = (tuples, initialState) =>
	compose(
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useWith(__, [defaultTo(initialState), identity]),
		cond,
		map(mergeReducers),
		append([T, identity, identity]),
		map(overHead(createTypeEqualsPredicate))
	)(tuples);

export default makeReducer;
