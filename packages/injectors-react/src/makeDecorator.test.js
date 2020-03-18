import { mount } from 'enzyme';
import { noop } from 'ramda-extension';
import React from 'react';

import { makeStoreInterface } from '@redux-tools/injectors';
import { NamespaceProvider } from '@redux-tools/namespaces-react';

import makeDecorator from './makeDecorator';
import makeHook from './makeHook';

const storeInterface = makeStoreInterface('things');
const useThings = makeHook(storeInterface);
const withThings = makeDecorator(storeInterface, useThings);

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
			<NamespaceProvider store={store} namespace="yolo">
				<Root />
			</NamespaceProvider>
		);

		expect(store.injectThings).toHaveBeenCalledTimes(1);
		expect(store.injectThings.mock.calls[0][0]).toEqual({ foo: noop }, { namespace: 'yolo' });
	});
});
