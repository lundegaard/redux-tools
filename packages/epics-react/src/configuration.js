import { prop } from 'ramda';

export default {
	inject: prop('injectEpics'),
	eject: prop('ejectEpics'),
	getEntries: prop('epicEntries'),
	type: 'epics',
};
