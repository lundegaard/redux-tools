import React from 'react';
import { mount } from 'enzyme';

import { InjectorContext } from './contexts';
import withInjectorContext from './withInjectorContext';

// eslint-disable-next-line react/display-name
const withFooNamespace = Component => props => <Component {...props} namespace="foo" />;

describe('withInjectorContext', () => {
	it('passes the store as a prop to the wrapped component', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext(Root);

		const wrapper = mount(
			<InjectorContext.Provider value={{ store: { foo: 'bar' } }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('store')).toEqual({ foo: 'bar' });
	});

	it('wraps the component in a `withNamespace` from context', () => {
		const Root = () => null;
		const WrappedRoot = withInjectorContext(Root);

		const wrapper = mount(
			<InjectorContext.Provider value={{ withNamespace: withFooNamespace }}>
				<WrappedRoot />
			</InjectorContext.Provider>
		);

		expect(wrapper.find(Root).prop('namespace')).toEqual('foo');
	});
});
