import React from 'react';
import { noop } from 'ramda-extension';
import { mount } from 'enzyme';
import withSuffixing from './withSuffixing';

describe('withSuffixing', () => {
	const Root = () => null;
	const WrappedRoot = withSuffixing(Root);

	beforeEach(() => {
		jest.resetAllMocks();
		withSuffixing.resetCounter();
	});

	it('passes a `suffixKeys` prop to the wrapped component', () => {
		const wrapper = mount(<WrappedRoot />);
		const suffixKeys = wrapper.find(Root).prop('suffixKeys');
		expect(suffixKeys({ foo: 'bar' })).toEqual({ 'foo@0': 'bar' });
	});

	it('passes a `suffixKeys` prop which handles nested structures', () => {
		const wrapper = mount(<WrappedRoot />);
		const suffixKeys = wrapper.find(Root).prop('suffixKeys');

		const base = {
			foo: 'bar',
			bar: { baz: 'qux' },
			fn: noop,
		};

		const suffixed = {
			'foo@0': 'bar',
			'bar@0': { 'baz@0': 'qux' },
			'fn@0': noop,
		};

		expect(suffixKeys(base)).toEqual(suffixed);
	});

	it('has a rising counter', () => {
		const wrapper1 = mount(<WrappedRoot />);
		const wrapper2 = mount(<WrappedRoot />);

		expect(wrapper1.find(WrappedRoot).instance().id).toBe(0);
		expect(wrapper2.find(WrappedRoot).instance().id).toBe(1);

		const suffixKeys = wrapper2.find(Root).prop('suffixKeys');

		expect(suffixKeys({ foo: 'bar' })).toEqual({ 'foo@1': 'bar' });
	});
});
