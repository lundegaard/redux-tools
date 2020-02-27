import getKeysLength from './getKeysLength';

const entry = {
	a: 'foo',
	b: 'bar',
};

describe('getKeysLength', () => {
	it('correctly returns number of object keys', () => {
		expect(getKeysLength(entry)).toEqual(2);
	});
});
