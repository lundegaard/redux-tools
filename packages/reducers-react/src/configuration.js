import { prop } from 'ramda';

export default {
	inject: prop('injectReducers'),
	eject: prop('ejectReducers'),
	getEntries: prop('reducerEntries'),
	type: 'reducers',
};
