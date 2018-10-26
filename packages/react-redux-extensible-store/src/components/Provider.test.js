import { mount } from 'enzyme';
import React from 'react';
import { createStore } from 'redux';
import { identity } from 'ramda';

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
