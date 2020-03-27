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

const consoleWarningContent = [
	'@redux-tools: This warning happened while injecting the following things: foo.',
	"You're injecting things with no scope!",
	'They will be injected globally. If this is intended, consider passing',
	"'isGlobal: true' to the injector, e.g. 'useThings(things, { isGlobal: true })'.",
];

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

	it('throws warning if useNamespace is provided, but isGlobal flag is not', () => {
		const warn = jest.spyOn(global.console, 'warn');

		mount(
			<NamespaceProvider store={store} useNamespace={always('yolo')}>
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(warn).toHaveBeenCalledWith(...consoleWarningContent);
	});

	it('does not throw warning if isGlobal is not provided', () => {
		const warn = jest.spyOn(global.console, 'warn');

		mount(
			<NamespaceProvider store={store}>
				<Test>{() => useThings({ foo: noop })}</Test>
			</NamespaceProvider>
		);

		expect(warn).toHaveBeenCalledTimes(0);
	});

	it('does throw warning if has isNamespaced flag, no namespace is resolved, and isGlobal is not provided', () => {
		const testRenderer = () => {
			try {
				mount(
					<NamespaceProvider store={store}>
						<Test>{() => useThings({ foo: noop }, { isNamespaced: true })}</Test>
					</NamespaceProvider>
				);
			} catch (error) {
				throw new Error(error);
			}
		};

		expect(testRenderer).toThrowError(
			'Invariant Violation: used hook is marked as namespaced, but no namespace can be resolved. Please make sure that you provided namespace'
		);
	});
});
