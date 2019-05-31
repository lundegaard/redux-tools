import { NamespaceContext } from './contexts';

describe('NamespaceContext', () => {
	it('is a React context', () => {
		expect(NamespaceContext.Consumer).toBeDefined();
		expect(NamespaceContext.Provider).toBeDefined();
	});
});
