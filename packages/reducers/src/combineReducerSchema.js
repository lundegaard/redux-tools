import { map, isEmpty } from 'ramda';

import combineReducers from './combineReducers';
import composeReducers from './composeReducers';
import { ROOT_KEY } from './constants';

const combineReducerSchema = ({ [ROOT_KEY]: rootReducers, ...otherReducers }) => {
	const resolvedRootReducers = rootReducers ?? [];

	if (isEmpty(otherReducers)) {
		return composeReducers(...resolvedRootReducers);
	}

	return composeReducers(
		...resolvedRootReducers,
		combineReducers(map(combineReducerSchema, otherReducers))
	);
};

export default combineReducerSchema;
