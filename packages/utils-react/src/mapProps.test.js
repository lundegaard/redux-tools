import { shallow } from 'enzyme';
import { noop } from 'ramda-extension';
import React from 'react';

import mapProps from './mapProps';

describe('mapProps', () => {
	it('accepts an object', () => {
		const Component = mapProps({ foo: 'bar' }, noop);
		const wrapper = shallow(<Component />);
		expect(wrapper.find(noop).prop('foo')).toBe('bar');
	});

	it('accepts a function', () => {
		const Component = mapProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
	});
});
