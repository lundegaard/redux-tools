import prefixedValueMirror from './prefixedValueMirror';

describe('prefixedValueMirror', () => {
	it('correctly transforms an array', () => {
		expect(prefixedValueMirror('yo', ['HI'])).toEqual({ HI: 'yo/HI' });
	});
});
