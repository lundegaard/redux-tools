import { stopEpics, ActionTypes } from './actions';

describe('stopEpics', () => {
	it('has a defined type', () => {
		expect(stopEpics([]).type).toBeDefined();
		expect(stopEpics([]).type).toBe(ActionTypes.STOP_EPICS);
	});
});
