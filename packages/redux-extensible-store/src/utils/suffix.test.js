import { noop } from 'ramda-extension';
import { suffixKeys, removeSuffixFromKeys } from './suffix';
import { SUFFIX_DELIMITER } from '../constants';

const shallow = {
	foo: noop,
	bar: noop,
};

const shallowSuffixed = {
	[`foo${SUFFIX_DELIMITER}12`]: noop,
	[`bar${SUFFIX_DELIMITER}12`]: noop,
};

const nested = {
	foo: noop,
	bar: { baz: noop },
};

const nestedSuffixed = {
	[`foo${SUFFIX_DELIMITER}12`]: noop,
	[`bar${SUFFIX_DELIMITER}12`]: { [`baz${SUFFIX_DELIMITER}12`]: noop },
};

describe('suffixKeys', () => {
	it('shallowly suffixes all keys', () => {
		expect(suffixKeys(12, shallow)).toEqual(shallowSuffixed);
	});

	it('recursively suffixes all keys', () => {
		expect(suffixKeys(12, nested)).toEqual(nestedSuffixed);
	});
});

describe('removeSuffixFromKeys', () => {
	it('shallowly removes suffixes from all keys', () => {
		expect(removeSuffixFromKeys(shallowSuffixed)).toEqual(shallow);
	});

	it('recursively removes suffixes from all keys', () => {
		expect(removeSuffixFromKeys(nestedSuffixed)).toEqual(nested);
	});

	it('returns original key if no suffix is present', () => {
		expect(removeSuffixFromKeys({ hi: { yo: noop } })).toEqual({ hi: { yo: noop } });
	});
});
