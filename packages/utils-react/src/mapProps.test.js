import { shallow } from 'enzyme';
import { noop } from 'ramda-extension';
import React from 'react';

import mapProps from './mapProps';

describe('mapProps', () => {
	it('accepts a function', () => {
		const Component = mapProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
	});

	it('does not preserve existing props', () => {
		const Component = mapProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" bar="baz" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
		expect(wrapper.find(noop).prop('bar')).not.toBeDefined();
	});
});
