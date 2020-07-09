import { mount } from 'enzyme';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import React from 'react';
import { createStore } from 'redux';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import NamespaceProvider from './NamespaceProvider';
import namespacedConnect, {
	wrapMapStateToProps,
	wrapMapDispatchToProps,
	NAMESPACED_CONNECT_PROPS,
} from './namespacedConnect';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'Foo' },
		bar: { qux: { value: 'Qux' } },
	},
	grids: {
		baz: { value: 'Baz' },
	},
};

describe('wrapMapStateToProps', () => {
	it('gets correct state slice', () => {
		const mapStateToProps = wrapMapStateToProps(R.identity);

		expect(
			mapStateToProps(state, {
				[NAMESPACED_CONNECT_PROPS]: { feature: DEFAULT_FEATURE, namespace: 'foo' },
			})
		).toEqual({
			value: 'Foo',
		});
	});

	it('gets correct state slice if feature is set', () => {
		const mapStateToProps = wrapMapStateToProps(R.identity);

		expect(
			mapStateToProps(state, {
				[NAMESPACED_CONNECT_PROPS]: { feature: 'grids', namespace: 'baz' },
			})
		).toEqual({
			value: 'Baz',
		});
	});

	it('applies passed mapStateToProps', () => {
		const mapStateToProps = wrapMapStateToProps(R.prop('qux'));

		expect(
			mapStateToProps(state, {
				[NAMESPACED_CONNECT_PROPS]: { feature: DEFAULT_FEATURE, namespace: 'bar' },
			})
		).toEqual({
			value: 'Qux',
		});
	});

	it('returns an object when mapStateToProps is undefined', () => {
		const mapStateToProps = wrapMapStateToProps(null);

		expect(
			mapStateToProps(state, {
				[NAMESPACED_CONNECT_PROPS]: { feature: DEFAULT_FEATURE, namespace: 'foo' },
			})
		).toEqual({});
	});
});

describe('wrapMapDispatchToProps', () => {
	it('handles an object', () => {
		const mapDispatchToProps = wrapMapDispatchToProps({
			actionCreator: R.always({ type: 'TEST' }),
		});

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			[NAMESPACED_CONNECT_PROPS]: { feature: DEFAULT_FEATURE, namespace: 'foo' },
		});

		actionCreator();

		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'foo' },
		});
	});

	it('handles a function', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(dispatch => ({
			actionCreator: () => dispatch({ type: 'TEST' }),
		}));

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			[NAMESPACED_CONNECT_PROPS]: { feature: DEFAULT_FEATURE, namespace: 'foo' },
		});

		actionCreator();

		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'foo' },
		});
	});

	it('handles nil', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(null);
		const dispatch = jest.fn();

		const props = mapDispatchToProps(dispatch, {
			[NAMESPACED_CONNECT_PROPS]: { namespace: 'foo' },
		});

		expect(props).toEqual({});
	});

	it('throws when an unsupported type is received', () => {
		const mapDispatchToProps = wrapMapDispatchToProps('what am i');
		const dispatch = jest.fn();
		expect(() => mapDispatchToProps(dispatch, { namespace: 'foo' })).toThrow();
	});
});

describe('namespacedConnect', () => {
	it('applies mapStateToProps', () => {
		const connector = namespacedConnect(R.identity);
		const store = createStore(R.always(state));

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<NamespaceProvider store={store} namespace="bar">
				<ConnectedRoot />
			</NamespaceProvider>
		);

		expect(wrapper.find(Root).prop('qux')).toEqual({ value: 'Qux' });
	});

	it('applies mapDispatchToProps', () => {
		const connector = namespacedConnect(undefined, { actionCreator: R.always({ type: 'TEST' }) });

		const store = createStore(R.always(state));
		store.dispatch = jest.fn();

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<NamespaceProvider store={store} namespace="bar">
				<ConnectedRoot />
			</NamespaceProvider>
		);

		wrapper.find(Root).prop('actionCreator')();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'bar' },
		});
	});

	it('does not pass the static options down as props', () => {
		const connector = namespacedConnect(R.identity);
		const store = createStore(R.always(state));

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<NamespaceProvider store={store} namespace="bar">
				<ConnectedRoot />
			</NamespaceProvider>
		);

		expect(wrapper.find(Root).prop(NAMESPACED_CONNECT_PROPS)).toBe(undefined);
	});

	it('does not pass the static namespace down as a prop', () => {
		const Root = R_.noop;
		const ConnectedRoot = namespacedConnect(undefined, undefined, undefined, {
			namespace: 'foo',
		})(Root);

		const store = createStore(R.always(state));
		store.dispatch = jest.fn();

		const wrapper = mount(
			<NamespaceProvider store={store}>
				<ConnectedRoot namespace="bar" />
			</NamespaceProvider>
		);

		expect(wrapper.find(Root).prop('namespace')).toBe('bar');
	});
});
