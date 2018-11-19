import { mount } from 'enzyme';
import React from 'react';
import * as R from 'ramda';

import { InjectorContext } from './contexts';
import withSuffixing from './withSuffixing';
import makeInjector from './makeInjector';

describe('makeInjector', () => {
	const store = {};
	store.inject = jest.fn();
	store.eject = jest.fn();

	// eslint-disable-next-line react/display-name
	const withFooNamespace = Component => props => <Component {...props} namespace="foo" />;
	const injector = makeInjector(R.prop('inject'), R.prop('eject'));
	const Root = () => null;

	beforeEach(() => {
		jest.resetAllMocks();
		withSuffixing.resetCounter();
	});

	it('injects injectables upon mounting', () => {
		const WrappedRoot = injector({ test: R.identity })(Root);
		mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(store.inject).toHaveBeenCalledWith({ 'test@0': R.identity }, 'foo');
	});

	it('ejects injectables upon unmounting', () => {
		const WrappedRoot = injector({ test: R.identity })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		wrapper.unmount();
		expect(store.eject).toHaveBeenCalledWith(['test@0'], 'foo');
	});

	it('does not eject injectables when persist is true', () => {
		const WrappedRoot = injector({ test: R.identity }, { persist: true })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		wrapper.unmount();
		expect(store.eject).not.toHaveBeenCalled();
	});

	it('does not pass namespace if global is passed', () => {
		const WrappedRoot = injector({ test: R.identity }, { global: true })(Root);
		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace, store }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(store.inject).toHaveBeenCalledWith({ 'test@0': R.identity }, null);
		wrapper.unmount();
		expect(store.eject).toHaveBeenCalledWith(['test@0'], null);
	});
});
