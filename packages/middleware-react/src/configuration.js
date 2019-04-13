import { prop } from 'ramda';

export default {
	inject: prop('injectMiddleware'),
	eject: prop('ejectMiddleware'),
	getEntries: prop('middlewareEntries'),
	type: 'middleware',
};
