import { epicsInjected, epicsEjected, ActionTypes } from './actions';

describe('action creators', () => {
	it('have defined types', () => {
		expect(epicsInjected({}).type).toBeDefined();
		expect(epicsInjected({}).type).toBe(ActionTypes.EPICS_INJECTED);
		expect(epicsEjected([]).type).toBeDefined();
		expect(epicsEjected([]).type).toBe(ActionTypes.EPICS_EJECTED);
	});
});
