import { InjectorContext } from './contexts';

describe('InjectorContext', () => {
	it('is a React context', () => {
		expect(InjectorContext.Consumer).toBeDefined();
		expect(InjectorContext.Provider).toBeDefined();
	});
});
