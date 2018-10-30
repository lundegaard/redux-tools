import React from 'react';
import { createStore } from 'redux';
import { identity } from 'ramda';
import { mount } from 'enzyme';

import Provider from './Provider';

describe('Provider', () => {
	it('has a matching snapshot', () => {
		const wrapper = mount(
			<Provider store={createStore(identity)}>
				<div />
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
