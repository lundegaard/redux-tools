import React from 'react';
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

	it('has a rising counter', () => {
		const wrapper1 = mount(<WrappedRoot />);
		const wrapper2 = mount(<WrappedRoot />);

		expect(wrapper1.find(WrappedRoot).instance().id).toBe(0);
		expect(wrapper2.find(WrappedRoot).instance().id).toBe(1);

		const suffixKeys = wrapper2.find(Root).prop('suffixKeys');

		expect(suffixKeys({ foo: 'bar' })).toEqual({ 'foo@1': 'bar' });
	});
});
