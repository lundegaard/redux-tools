import { shallow } from 'enzyme';
import { noop } from 'ramda-extension';
import React from 'react';

import withProps from './withProps';

describe('withProps', () => {
	it('accepts an object', () => {
		const Component = withProps({ foo: 'bar' }, noop);
		const wrapper = shallow(<Component />);
		expect(wrapper.find(noop).prop('foo')).toBe('bar');
	});

	it('preserves existing props when an object is passed', () => {
		const Component = withProps({ foo: 'bar' }, noop);
		const wrapper = shallow(<Component bar="baz" />);
		expect(wrapper.find(noop).prop('foo')).toBe('bar');
		expect(wrapper.find(noop).prop('bar')).toBe('baz');
	});

	it('accepts a function', () => {
		const Component = withProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
	});

	it('preserves existing props when a function is passed', () => {
		const Component = withProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" bar="baz" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
		expect(wrapper.find(noop).prop('bar')).toBe('baz');
	});
});
