import getDisplayName from './getDisplayName';

describe('getDisplayName', () => {
	it('returns the most appropriate display name', () => {
		expect(getDisplayName({ displayName: 'yo', name: 'hi' })).toBe('yo');
		expect(getDisplayName({ name: 'hi' })).toBe('hi');
		expect(getDisplayName('div')).toBe('div');
		expect(getDisplayName({})).toBe('Component');
	});
});
