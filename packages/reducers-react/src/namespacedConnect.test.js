import React from 'react';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from '@redux-tools/injectors-react';

import namespacedConnect, {
	wrapMapStateToProps,
	wrapMapDispatchToProps,
} from './namespacedConnect';

const state = {
	namespaces: {
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
		expect(mapStateToProps(state, { feature: 'namespaces', namespace: 'foo' })).toEqual({
			value: 'Foo',
		});
	});

	it('gets correct state slice if feature is set', () => {
		const mapStateToProps = wrapMapStateToProps(R.identity);
		expect(mapStateToProps(state, { feature: 'grids', namespace: 'baz' })).toEqual({
			value: 'Baz',
		});
	});

	it('applies passed mapStateToProps', () => {
		const mapStateToProps = wrapMapStateToProps(R.prop('qux'));
		expect(mapStateToProps(state, { feature: 'namespaces', namespace: 'bar' })).toEqual({
			value: 'Qux',
		});
	});

	it('returns an object when mapStateToProps is undefined', () => {
		const mapStateToProps = wrapMapStateToProps(null);
		expect(mapStateToProps(state, { feature: 'namespaces', namespace: 'foo' })).toEqual({});
	});
});

describe('wrapMapDispatchToProps', () => {
	it('handles an object', () => {
		const mapDispatchToProps = wrapMapDispatchToProps({
			actionCreator: R.always({ type: 'TEST' }),
		});

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			feature: 'namespaces',
			namespace: 'foo',
		});
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { feature: 'namespaces', namespace: 'foo' },
		});
	});

	it('handles a function', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(dispatch => ({
			actionCreator: () => dispatch({ type: 'TEST' }),
		}));

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			feature: 'namespaces',
			namespace: 'foo',
		});
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { feature: 'namespaces', namespace: 'foo' },
		});
	});

	it('handles nil', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(null);
		const dispatch = jest.fn();
		const props = mapDispatchToProps(dispatch, { namespace: 'foo' });
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
			<Provider store={store} namespace="bar">
				<ConnectedRoot />
			</Provider>
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
			<Provider store={store} namespace="bar">
				<ConnectedRoot />
			</Provider>
		);

		wrapper.find(Root).prop('actionCreator')();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { feature: 'namespaces', namespace: 'bar' },
		});
	});
});
