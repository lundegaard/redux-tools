import React from 'react';
import { noop } from 'ramda-extension';
import { shallow } from 'enzyme';

import withProps from './withProps';

describe('withProps', () => {
	it('accepts an object', () => {
		const Component = withProps({ foo: 'bar' }, noop);
		const wrapper = shallow(<Component />);
		expect(wrapper.find(noop).prop('foo')).toBe('bar');
	});

	it('accepts a function', () => {
		const Component = withProps(({ foo }) => ({ foo: foo.toUpperCase() }), noop);
		const wrapper = shallow(<Component foo="bar" />);
		expect(wrapper.find(noop).prop('foo')).toBe('BAR');
	});
});
