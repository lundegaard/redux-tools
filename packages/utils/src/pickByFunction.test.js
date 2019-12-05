import pickByFunction from './pickByFunction';

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
		expect(pickByFunction(entryA)).toEqual({ a: functionA, b: functionB });
	});
});
