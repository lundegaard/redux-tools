import makeReducer from './makeReducer';

describe('makeReducer', () => {
	// TODO: fix it
	it.skip('handles actions with error: true', () => {
		const reducer = makeReducer([['TEST', () => 'ok', () => 'nope']]);
		expect(reducer('something', { type: 'TEST' })).toBe('ok');
		expect(reducer('something', { type: 'TEST', error: true })).toBe('nope');
	});

	// TODO: fix it
	it.skip('handles initialState', () => {
		const reducer = makeReducer([['TEST', () => 'ok', () => 'nope']], 'initialState');
		expect(reducer(undefined, { type: 'UNKNOWN' })).toBe('initialState');
		expect(reducer(undefined, { type: 'TEST' })).toBe('ok');
	});

	// TODO: fix it
	it.skip('handles multiple types of actions', () => {
		const reducer = makeReducer([
			['FIRST', () => 'first'],
			['SECOND', () => 'second'],
			['THIRD', () => 'third'],
		]);

		expect(reducer(undefined, { type: 'FIRST' })).toBe('first');
		expect(reducer(undefined, { type: 'SECOND' })).toBe('second');
		expect(reducer(undefined, { type: 'THIRD' })).toBe('third');
	});

	// TODO: fix it
	it.skip('handles reducers which depend on actions', () => {
		const reducer = makeReducer([['ADD', (state, { payload }) => state + payload]]);
		expect(reducer(5, { type: 'ADD', payload: 3 })).toBe(8);
	});
});
