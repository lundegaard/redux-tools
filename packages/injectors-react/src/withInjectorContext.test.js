import React from 'react';
import { mount } from 'enzyme';

import { InjectorContext } from './contexts';
import withInjectorContext from './withInjectorContext';

// eslint-disable-next-line react/display-name
const withFooNamespace = Component => props => <Component namespace="foo" {...props} />;

describe('withInjectorContext', () => {
	it('passes the store as a prop to the wrapped component', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext()(Root);

		const wrapper = mount(
			<InjectorContext.Provider value={{ store: { foo: 'bar' } }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('store')).toEqual({ foo: 'bar' });
	});

	it('wraps the component in a `withNamespace` from context', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext()(Root);

		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('namespace')).toEqual('foo');
	});

	it('reuses the component decorated by `withNamespace` for multiple renders', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext()(Root);

		const element = (
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		const wrapper = mount(element);
		const first = wrapper.find(wrapper.instance().WrappedComponent).instance();
		wrapper.setProps({ value: { withNamespace: withFooNamespace, store: {} } });
		wrapper.update();
		const second = wrapper.find(wrapper.instance().WrappedComponent).instance();
		expect(first).toBe(second);
	});

	it('uses namespace with a higher priority than `withNamespace`', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext()(Root);
		const contextValue = { features: { namespaces: 'bar' }, withNamespace: withFooNamespace };

		const wrapper = mount(
			<InjectorContext.Provider value={contextValue}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('namespace')).toEqual('bar');
	});

	it('uses correct namespace when feature is passed', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext({ feature: 'grids' })(Root);

		const contextValue = {
			features: { namespaces: 'bar', grids: 'first-one' },
			withNamespace: withFooNamespace,
		};

		const wrapper = mount(
			<InjectorContext.Provider value={contextValue}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('namespace')).toEqual('first-one');
	});

	it('passes down correct feature name', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext({ feature: 'grids' })(Root);

		const contextValue = {
			features: { namespaces: 'bar', grids: 'first-one' },
			withNamespace: withFooNamespace,
		};

		const wrapper = mount(
			<InjectorContext.Provider value={contextValue}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('feature')).toEqual('grids');
	});
});
