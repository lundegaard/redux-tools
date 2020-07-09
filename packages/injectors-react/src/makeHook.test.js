import { mount } from 'enzyme';
import { always } from 'ramda';
import { noop } from 'ramda-extension';
import React from 'react';

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

	it('warns if useNamespace is provided, but the namespace could not be resolved and isGlobal is not passed', () => {
		const warn = jest.spyOn(global.console, 'warn').mockImplementation(() => {});

		mount(
			<NamespaceProvider store={store} useNamespace={always(undefined)}>
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(warn).toHaveBeenCalledWith(
			'@redux-tools: This warning happened while injecting the following things: foo.',
			"You're injecting things, but the namespace could not be resolved from React context!",
			'They will be injected globally. If this is intended, consider passing',
			"'isGlobal: true' to the injector, e.g. 'useThings(things, { isGlobal: true })'."
		);
	});

	it('does not warn if namespace is missing and isGlobal is not passed', () => {
		const warn = jest.spyOn(global.console, 'warn');

		mount(
			<NamespaceProvider store={store}>
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(warn).toHaveBeenCalledTimes(0);
	});

	it('does not warn if namespace is passed and isGlobal is not passed', () => {
		const warn = jest.spyOn(global.console, 'warn');

		mount(
			<NamespaceProvider store={store} namespace="yolo">
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(warn).toHaveBeenCalledTimes(0);
	});

	it('throws if isNamespaced is passed, but no namespace could be resolved', () => {
		jest.spyOn(global.console, 'error').mockImplementation(() => {});

		expect(() => {
			mount(
				<NamespaceProvider store={store}>
					<Test>{() => useThings({ foo: noop }, { isNamespaced: true })}</Test>
				</NamespaceProvider>
			);
		}).toThrowError(
			"You're injecting things marked as namespaced, but no namespace could be resolved."
		);
	});
});
