describe('filterReducer', () => {
	const state = { foo: 'bar' };
	const newState = { bar: 'baz' };

	beforeEach(() => jest.resetModules());

	it('calls reducer when namespace matches', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => true) }));
		const { default: filterReducer } = require('./filterReducer');
		const reducer = jest.fn(() => newState);

		expect(filterReducer(reducer, 'matchedNamespace')(state, {})).toBe(newState);
		expect(reducer).toHaveBeenCalledWith(state, {});
	});

	it('does not call reducer when namespace does not match', () => {
		jest.doMock('@redux-tools/namespaces', () => ({ isActionFromNamespace: jest.fn(() => false) }));
		const { default: filterReducer } = require('./filterReducer');
		const reducer = jest.fn(() => newState);

		expect(filterReducer(reducer, 'randomNamespace')(state, {})).toBe(state);
		expect(reducer).not.toHaveBeenCalled();
	});
});
