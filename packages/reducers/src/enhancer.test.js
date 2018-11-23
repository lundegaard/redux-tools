import enhancer from './enhancer';

const createStore = jest.fn(() => ({}));

describe('enhancer', () => {
	beforeEach(() => jest.clearAllMocks());

	it('returns a Redux store with defined functions', () => {
		const store = enhancer()(createStore)();
		expect(store.injectReducers).toBeInstanceOf(Function);
		expect(store.ejectReducers).toBeInstanceOf(Function);
	});

	// TODO: Enhancer tests
});
