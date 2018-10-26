import makeReducer from './makeReducer';

describe('makeReducer', () => {
	it('handles actions with error: true', () => {
		const reducer = makeReducer([['TEST', () => 'ok', () => 'nope']]);
		expect(reducer('something', { type: 'TEST' })).toBe('ok');
		expect(reducer('something', { type: 'TEST', error: true })).toBe('nope');
	});

	it('handles initialState', () => {
		const reducer = makeReducer([['TEST', () => 'ok', () => 'nope']], 'initialState');
		expect(reducer(undefined, { type: 'UNKNOWN' })).toBe('initialState');
		expect(reducer(undefined, { type: 'TEST' })).toBe('ok');
	});

	it('handles multiple types of actions', () => {
		const reducer = makeReducer([
			['FIRST', () => 'first'],
			['SECOND', () => 'second'],
			['THIRD', () => 'third'],
		]);

		expect(reducer(undefined, { type: 'FIRST' })).toBe('first');
		expect(reducer(undefined, { type: 'SECOND' })).toBe('second');
		expect(reducer(undefined, { type: 'THIRD' })).toBe('third');
	});

	it('handles reducers which depend on actions', () => {
		const reducer = makeReducer([['ADD', (state, { payload }) => state + payload]]);
		expect(reducer(5, { type: 'ADD', payload: 3 })).toBe(8);
	});
});
