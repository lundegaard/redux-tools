import { reducersInjected, reducersRemoved, ActionTypes } from './actions';

describe('action creators', () => {
	it('have defined types', () => {
		expect(reducersInjected({}).type).toBeDefined();
		expect(reducersInjected({}).type).toBe(ActionTypes.REDUCERS_INJECTED);
		expect(reducersRemoved([]).type).toBeDefined();
		expect(reducersRemoved([]).type).toBe(ActionTypes.REDUCERS_REMOVED);
	});
});
