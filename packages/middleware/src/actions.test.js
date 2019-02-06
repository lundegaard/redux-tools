import { middlewareInjected, middlewareEjected, ActionTypes } from './actions';

describe('action creators', () => {
	it('have defined types', () => {
		expect(middlewareInjected({}).type).toBeDefined();
		expect(middlewareInjected({}).type).toBe(ActionTypes.MIDDLEWARE_INJECTED);
		expect(middlewareEjected([]).type).toBeDefined();
		expect(middlewareEjected([]).type).toBe(ActionTypes.MIDDLEWARE_EJECTED);
	});
});
