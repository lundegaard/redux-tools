import withoutOnce from './withoutOnce';

describe('withoutOnce', () => {
	const a = { a: 1 };
	const b = { b: 1 };
	const c = { c: 1 };

	it('removes each item exactly once', () => {
		expect(withoutOnce([a, b, c], [a, b, c, a, b, c, a, b, c])).toEqual([a, b, c, a, b, c]);
	});

	it('removes each item exactly once for multiple occurrences', () => {
		expect(withoutOnce([a, b, c, a, b, c], [a, b, c, a, b, c, a, b, c])).toEqual([a, b, c]);
	});
});
