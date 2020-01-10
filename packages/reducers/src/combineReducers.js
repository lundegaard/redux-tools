import { reduce, keys } from 'ramda';
import { pickFunctions } from '@redux-tools/utils';

export default reducers => {
	const finalReducers = pickFunctions(reducers);
	const finalReducerKeys = keys(finalReducers);

	return (state = {}, action) =>
		reduce(
			(previousState, reducerKey) => {
				const reducer = finalReducers[reducerKey];
				const previousStateForKey = previousState[reducerKey];
				const nextStateForKey = reducer(previousStateForKey, action);

				if (nextStateForKey === previousStateForKey) {
					return previousState;
				}

				return {
					...previousState,
					[reducerKey]: nextStateForKey,
				};
			},
			state,
			finalReducerKeys
		);
};
