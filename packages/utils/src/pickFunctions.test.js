import pickFunctions from './pickFunctions';

const functionA = () => 'a';
const functionB = () => 'b';

const entryA = {
	a: functionA,
	b: functionB,
	c: 'foo',
	d: 'bar',
};

describe('pickByFunction', () => {
	it('correctly picks functions from source object', () => {
		expect(pickFunctions(entryA)).toEqual({ a: functionA, b: functionB });
	});
});
