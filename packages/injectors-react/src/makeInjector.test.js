import { mount } from 'enzyme';
import React from 'react';
import { prop, identity } from 'ramda';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { InjectorContext } from './contexts';
import makeInjector from './makeInjector';

describe('makeInjector', () => {
	const store = {};
	store.inject = jest.fn();
	store.eject = jest.fn();

	// eslint-disable-next-line react/display-name
	const withFooNamespace = Component => props => <Component {...props} namespace="foo" />;
	const injector = makeInjector(prop('inject'), prop('eject'));
	const Root = () => null;

	beforeEach(() => {
		jest.resetAllMocks();
		makeInjector.resetCounter();
	});

	it('injects injectables upon mounting', () => {
		const WrappedRoot = injector({ test: identity })(Root);
		mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(store.inject).toHaveBeenCalledWith(
			{ test: identity },
			{ feature: DEFAULT_FEATURE, namespace: 'foo', version: 0 }
		);
	});

	it('ejects injectables upon unmounting', () => {
		const WrappedRoot = injector({ test: identity })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		wrapper.unmount();
		expect(store.eject).toHaveBeenCalledWith(
			{ test: identity },
			{ feature: DEFAULT_FEATURE, namespace: 'foo', version: 0 }
		);
	});

	it('does not eject injectables when persist is true', () => {
		const WrappedRoot = injector({ test: identity }, { persist: true })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		wrapper.unmount();
		expect(store.eject).not.toHaveBeenCalled();
	});

	it('does not pass namespace if global is passed', () => {
		const WrappedRoot = injector({ test: identity }, { global: true })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(store.inject).toHaveBeenCalledWith(
			{ test: identity },
			{ feature: null, namespace: null, version: 0 }
		);
		wrapper.unmount();
		expect(store.eject).toHaveBeenCalledWith(
			{ test: identity },
			{ feature: null, namespace: null, version: 0 }
		);
	});

	it('warns in console when global = false and no namespace is received', () => {
		const WrappedRoot = injector({ test: identity })(Root);
		const consoleWarnSpy = jest.spyOn(global.console, 'warn');
		mount(
			<InjectorContext.Provider value={{ store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(consoleWarnSpy).toHaveBeenCalled();
		expect(consoleWarnSpy.mock.calls[0][0]).toContain('Root');
	});
});
