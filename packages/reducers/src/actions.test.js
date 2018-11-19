import { reducersInjected, reducersEjected, ActionTypes } from './actions';

describe('action creators', () => {
	it('have defined types', () => {
		expect(reducersInjected({}).type).toBeDefined();
		expect(reducersInjected({}).type).toBe(ActionTypes.REDUCERS_INJECTED);
		expect(reducersEjected([]).type).toBeDefined();
		expect(reducersEjected([]).type).toBe(ActionTypes.REDUCERS_EJECTED);
	});
});
