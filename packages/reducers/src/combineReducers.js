import { length, forEachObjIndexed, keys } from 'ramda';
import { pickByFunction, getKeysLength } from '@redux-tools/utils';

export default reducers => {
	const finalReducers = pickByFunction(reducers);
	const finalReducerKeys = keys(finalReducers);

	return (state = {}, action) => {
		let hasChanged = false;
		const nextState = { ...state };

		forEachObjIndexed(key => {
			const reducer = finalReducers[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey, action);
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}, finalReducerKeys);

		hasChanged = hasChanged || length(finalReducerKeys) !== getKeysLength(state);
		return hasChanged ? nextState : state;
	};
};
