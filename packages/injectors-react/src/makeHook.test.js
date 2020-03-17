import React from 'react';
import { noop } from 'ramda-extension';
import { mount } from 'enzyme';

import { makeStoreInterface } from '@redux-tools/injectors';
import { NamespaceProvider } from '@redux-tools/namespaces-react';

import makeHook from './makeHook';

const storeInterface = makeStoreInterface('things');
const useThings = makeHook(storeInterface);

jest.mock('./constants', () => ({ IS_SERVER: false }));

const Test = ({ children }) => {
	children();

	return null;
};

describe('makeHook', () => {
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

	it('calls proper store methods', () => {
		mount(
			<NamespaceProvider store={store} namespace="yolo">
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(store.injectThings).toHaveBeenCalledTimes(1);
		expect(store.injectThings.mock.calls[0][0]).toEqual({ foo: noop }, { namespace: 'yolo' });
	});
});
