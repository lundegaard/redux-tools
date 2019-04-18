import React from 'react';
import { makeConfig } from '@redux-tools/injectors';
import { noop } from 'ramda-extension';
import { mount } from 'enzyme';

import makeDecorator from './makeDecorator';
import Provider from './Provider';

const config = makeConfig('things');
const withThings = makeDecorator(config);

jest.mock('./constants', () => ({ IS_SERVER: false }));

describe('makeDecorator', () => {
	const store = {
		injectThings: jest.fn(),
		ejectThings: jest.fn(),
		subscribe: jest.fn(),
		getState: jest.fn(),
		dispatch: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls proper store methods when mounted', () => {
		const Root = withThings({ foo: noop })(noop);

		mount(
			<Provider store={store} namespace="yolo">
				<Root />
			</Provider>
		);

		expect(store.injectThings).toHaveBeenCalledTimes(1);
		expect(store.injectThings.mock.calls[0][0]).toEqual({ foo: noop }, { namespace: 'yolo' });
	});
});
